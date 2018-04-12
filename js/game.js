let game_board = new Array (1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8);
let click_counter = 0;

let previous_card_element = null;

let interval_id;
let hour = 0;
let min = 0;
let sec = 0;
let moves = 0;

let modal_pause = $("#modal_pause");
let modal_end_game = $("#modal_end_game");
let pause_b = $("#pause_b");
let hour_text = $("#hour");
let min_text  = $("#minute");
let sec_text  = $("#sec");
let moves_text = $("#moves");
let rating_text = $("#rating");
let board_grid = $(".board_grid");

let clickable = true;

function shuffle(arr) {
    for (let i = arr.length -1; i > 0; i--) {
        let k = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[k]] = [arr[k], arr[i]];
    }
}

function getStarRating(moves) {
    if (moves <= 9) {
        return 3;
    } else if (moves <= 12) {
        return 2;
    } else {
        return 1;
    }
}

function printTime(hour, min, sec) {
    hour_text.html(hour + ":");
    min_text.html(min + ":");
    sec_text.html(sec);
}

function toggleTimer() {
    $("#timerI_container").toggleClass("pause");
    if($("#timerI_container").hasClass("pause")) {
        window.clearInterval(interval_id);
    } else {
        interval_id = setInterval(function() {
            sec++;
            if(sec === 60) {
                min++;
                if(min === 60) {
                    hour++;
                    min = 0;
                    sec = 0;
                }
                sec = 0;
            }
            printTime(hour, min, sec);
        }, 1000);
    }
}

function newGame() {
        // Generate a new game board
        shuffle(game_board);
        $(".main > .board_grid").empty();

        let board_grid = $("div.main > div.board_grid");
        for (let i = 0; i < game_board.length; i++) {
            board_grid.append("<div class='card hidden' " + "id='card_" + game_board[i] + "'" + ">" + 
            "<img class='face' src='imgs/" + game_board[i] + 
            "_star.png'>" + 
            "<img class='back' src='imgs/blank.png'>" +
            "</div>");
        }
    
        // Initial values
        clickable = true;
        click_counter = 0;
        sec = 0;
        min = 0;
        hour = 0;
        moves = 0;
        previous_card_element = null;
        printTime(hour, min, sec);
        rating_text.text("3");
        moves_text.text("0");
    
        window.clearInterval(interval_id);
        $("#timerI_container").addClass("pause");
        toggleTimer();
        
        pause_b.off();
        pause_b.on("click", function(event) {
            toggleTimer();
            modal_pause.css("display", "block");
            // event.preventDefault(); 
        });
    
        $("#pause_close").off();
        $("#pause_close").on("click", function(event) {
            toggleTimer();
            modal_pause.css("display", "none");
            // event.preventDefault(); 
        });
        
        event.preventDefault(); 
}

$("#start_b").on("click", function(event) {
    newGame();
});

$("#modal_new_game_b").on("click", function(event) {
    $("#modal_end_game").css("display", "none");
    newGame();
});

// for testing
function getListClasses(el) {
    let classes = el.attr("class");
    let classes_arr  = classes.split(" ");
    console.log("classes: " + JSON.stringify(classes_arr));
}

function matchCards(current_card_element) {
    moves = click_counter/2;
    console.log("click_count ");
    moves_text.text(moves);
    rating_text.text(getStarRating(moves));
    let current_card = getCardStarNumber(current_card_element);
    let previous_card = getCardStarNumber(previous_card_element);
    if (current_card === previous_card) {
        console.log("blaaa1");
        if (!$(".board_grid").children().hasClass("hidden")) {
            toggleTimer();
            pause_b.off();
            $("#time_end").text("hour: " + hour + " minutes: " + min + " sec: " + sec);
            $("#moves_end").text(moves + " moves")
            modal_end_game.css("display", "block");
            $("#end_game_close").off();
            $("#end_game_close").on("click", function(event) {
                $("#modal_end_game").css("display", "none");
            });
        }
        clickable = true;
        previous_card_element = null;
    } else {
        // switch to back
        console.log("blaaa2   ", current_card, previous_card);
        animateFlip(current_card_element);
        animateFlip(previous_card_element, function() {
            current_card_element.addClass("hidden");
            previous_card_element.addClass("hidden");
            clickable = true;
            previous_card_element = null;
        });
    }
}

function animateFlip(el, endAnimation) {
    el.find(".face").toggleClass("flip");
    el.find(".back").toggleClass("flip");
    el.find(".back").toggleClass("fade");
    el.find(".back").one("transitionend", endAnimation);
}

function getCardStarNumber(card_element) {
    return Number(card_element.attr('id').split('_')[1]);
}

board_grid.on("click", ".card.hidden", function(event) {
    if (!clickable) {
        return;
    }

    current_card_element = $(this);
    click_counter += 1;
    if (previous_card_element) {
        clickable = false;
        animateFlip($(this), function() {
            matchCards(current_card_element);
        });
    } else {
        animateFlip($(this));
        previous_card_element = current_card_element;
    }
    
    $(this).removeClass("hidden");

    event.preventDefault();
});

