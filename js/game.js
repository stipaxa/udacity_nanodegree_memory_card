let game_board = new Array (1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8);
let previous_index = -1;
let click_counter = 0;
$("#moves").text(0);
$("#rating").text(3);

let interval_id;
let hour = 0;
let min = 0;
let sec = 0;

let modal = $("#modal_w");
let pause_b = $("#pause_b");

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

let hour_text = $("#hour");
let min_text  = $("#minute");
let sec_text  = $("#sec");

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

$("#start_b").on("click", function(event) {
    shuffle(game_board);
    $("div.main > div.board_grid").empty();
    for (let i = 0; i < game_board.length; i++) {
        $("div.main > div.board_grid").append("<div class='card back'>"+ game_board[i] + "</div>");
    }

    previous_index = -1;
    click_counter = 0;

    sec = 0;
    min = 0;
    hour = 0;
    printTime(hour, min, sec);
    window.clearInterval(interval_id);
    $("#timerI_container").addClass("pause");
    toggleTimer();
    
    pause_b.off();
    pause_b.on("click", function(event) {
        toggleTimer();
        modal.css("display", "block");
        event.preventDefault(); 
    });

    $(".pause_close").off();
    $(".pause_close").on("click", function(event) {
        console.log("blaaaa");
        toggleTimer();
        modal.css("display", "none");
        event.preventDefault(); 
    });
    
    event.preventDefault(); 
});

$(".board_grid").on("click", ".card.back", function(event) {
    let current_card = Number($(this).text());   // data of selected element (convert to number for if)
    let current_index = $(this).index(); // index of selected element
    let previous_card = -1;
    if (previous_index != -1) {
        previous_card = game_board[previous_index];
    }
    $(this).removeClass("back");
    click_counter += 1;

    let color = "yellow";
    $(this).css("background-color", color);
    if (current_card === previous_card) {
        $("div.board_grid").children().eq(previous_index).css("background-color", color);
        previous_index = -1;
        let moves = click_counter/2;
        $(".moves").text(moves);
        $(".rating").text(getStarRating(moves));
        if (!$(".board_grid").children().hasClass("back")) {
                // timer
                toggleTimer();
                pause_b.off();
                alert("all cards open");
        }
        return;        
    } else if (previous_index != -1) {
        // switch to back
        $(this).addClass("back");
        $("div.board_grid").children().eq(previous_index).addClass("back");
        $(this).css("background-color", "burlywood");
        $("div.board_grid").children().eq(previous_index).css("background-color", "burlywood");
        previous_index = -1;
        let moves = click_counter/2;
        $(".moves").text(moves);
        $(".rating").text(getStarRating(moves));
        return;
    }

    previous_index = current_index;
    // event.preventDefault();
});

