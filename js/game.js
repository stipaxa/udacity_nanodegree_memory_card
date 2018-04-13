let game_board = new Array (1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8);
let click_counter = 0;

let previous_card_element = null;

let interval_id;
let hour = 0;
let min = 0;
let sec = 0;
let moves = 0;

// modal window (pause of the game)
let modal_pause = $("#modal_pause");
// close modal window (end of the game)
let modal_game_results = $("#modal_game_results");
// call modal window (pause of the game)
let pause_control = $("#pause_control");
// print hours
let hour_text = $("#hour");
// print minuts
let min_text  = $("#minute");
// print secs
let sec_text  = $("#sec");
// print counts of moves
let moves_text = $("#moves");
// game board
let board_grid = $(".board_grid");

let clickable = true;

newGame();

function shuffle(arr) {
    for (let i = arr.length -1; i > 0; i--) {
        let k = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[k]] = [arr[k], arr[i]];
    }
}

// count moves and convert the number to picture
function getStarRating(moves) {
    if (moves > 14) {
        $(".sell:nth-child(1)").find("img").attr("src", "imgs/star_off1.png");
    } else if (moves > 20) {
        $(".sell:nth-child(2)").find("img").attr("src", "imgs/star_off1.png");
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

// Generate a new game board
function newGame() {
        shuffle(game_board);
        $(".main > .board_grid").empty();

        let board_grid = $("div.main > div.board_grid");
        for (let i = 0; i < game_board.length; i++) {
            board_grid.append("<div class='card hidden' " + "id='card_" + game_board[i] + "'" + ">" + 
            "<img class='face' src='imgs/" + game_board[i] + "_.png'>" + 
            "<img class='back' src='imgs/back.png'>" +
            "</div>");
        }

        $(".sell:nth-child(1)").find("img").attr("src", "imgs/star_on1.png");
        $(".sell:nth-child(2)").find("img").attr("src", "imgs/star_on1.png");
        $(".sell:nth-child(3)").find("img").attr("src", "imgs/star_on1.png");
    
        // Initial values
        clickable = true;
        click_counter = 0;
        sec = 0;
        min = 0;
        hour = 0;
        moves = 0;
        previous_card_element = null;
        printTime(hour, min, sec);
        moves_text.text("0 move(s)");
    
        window.clearInterval(interval_id);
        $("#timerI_container").addClass("pause");
        toggleTimer();
        
        pause_control.off();
        pause_control.on("click", function(event) {
            toggleTimer();
            modal_pause.css("display", "block");
        });
    
        $("#pause_close").off();
        $("#pause_close").on("click", function(event) {
            toggleTimer();
            modal_pause.css("display", "none");
        });
}

$("#start_control").on("click", function(event) {
    newGame();
});

$("#modal_new_game_control").on("click", function(event) {
    $("#modal_game_results").css("display", "none");
    newGame();
});

function matchCards(current_card_element) {
    moves = click_counter/2;
    moves_text.text(moves+" move(s)");
    getStarRating(moves);
    let current_card = getCardStarNumber(current_card_element);
    let previous_card = getCardStarNumber(previous_card_element);
    if (current_card === previous_card) {
        if (!$(".board_grid").children().hasClass("hidden")) {
            toggleTimer();
            pause_control.off();
            $("#time_end").text("time: " + hour + ":" + min + ":" + sec);
            $("#moves_end").text("moves: " + moves);
            modal_game_results.css("display", "block");
            $("#end_game_close").off();
            $("#end_game_close").on("click", function(event) {
                $("#modal_game_results").css("display", "none");
            });
        }
        clickable = true;
        previous_card_element = null;
    } else {
        // switch to back
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

