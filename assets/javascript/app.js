$(function () {

    const TRIVIA_TIME = 30;
	const ANSWER_TIME = 7;

	let wrong = 0;
	let correct = 0;
	let index = -1;
	let result = false;
	let countdown;

	// setInterval variables
	let showTrivia;
	let showAnswer;
    let timer;

//  CREATE QUESTIONS & choices - STORE IN ARRAY
    var questions = [];

    questions[0] = {
            question: "Who is Harry's nemesis?",
            choices: ["Professor Snape", "Lord Voldermort", "Professor Dumbledore", "Draco Malfoy"],
            answer: "Lord Voldermort",
            image: "assets/images/voldermort.jpg"
        },

    questions[1]  = {
            question: "What is Harry's patronus?",
            choices: ["Doe", "Stag", "Wolf", "Horse"],
            answer: "Stag",
            image: "assets/images/stag.jpg"
        },

    questions[2] = {
            question: "What potion did Harry take to get Slughorn's memories?",
            choices: ["Felix Felicis", "Polyjuice Potion", "Alihotsy Draught", "Essense of Dittany"],
            answer: "Felix Felicis",
            image: "assets/images/felix-felicis.jpg"
        }

        questions[3] = {
            question: "What did Dumbledore leave for Hermonie in is will?",
            choices: ["The Luminator", "The Sword of Griffendor", "The Snitch", "The Tales of Beedle the Bard"],
            answer: "The Tales of Beelde the Bard",
            image: "assets/images/book.jpg"
        }
    
        questions[4] = {
            question: "How many kids are in the Weasley family?",
            choices: ["6", "7", "8", "9"],
            answer: "7",
            image: "assets/images/kids.png"
        }

        questions[5] = {
            question: "What color are the flames that came out of the Goblet of Fire?",
            choices: ["Yellow", "Orange", "Blue", "Green"],
            answer: "Blue",
            image: "assets/images/goblet-fire.jpg"
        }

    // Create on-clicks
    $("#btnStart").click(loadQuestion);

    // Create onclick to handle dynamically added buttons
    $("#main-content").on("click", "button", function () {
        if ($(this).text() === "Play Again") {
            resetGame();
        } else {
            checkAnswer($(this));
        }
    });

    // Function that loads the current question to the DOM
    function loadQuestion() {
        index++;	
		countdown = TRIVIA_TIME;	

		// Only play if there is another question available
		if(index < questions.length){
			// Clear values
			clearInterval(showTrivia);
			clearInterval(timer);
			clearContent();

			// Update html elements
			$("#time").html("<p>Time remaining: " + countdown + " seconds.</p>");
			$("#question").html("<p>" + questions[index].question + "</p>");
			createBtns(questions[index].choices);

			// Set intervals
			showAnswer = setInterval(loadAnswer, countdown * 1000);
			timer = setInterval(countdownTimer, 1000);
		}
		else {
			endGame();
		}
    }
    // Function updates HTML with the answer
	function loadAnswer() {
		
		countdown = ANSWER_TIME;

		// Set result if user didn't answer and time ran out
		if (result === false){
			result = "No answer chosen."
		}
		// Clear values
		clearInterval(showAnswer);
		clearInterval(timer);
		$("#time").empty();

		//Update html elements
		$("#time").html("<p>Time remaining: " + countdown + " seconds.</p>");
		$("#question").html("<p>" + result + "</p>");
		$("#choices").html("<b>" + questions[index].answer + "</b> - " + questions[index].fact);

		// reset result in case timer ran out
		result = false;

		// Set intervals
		timer = setInterval(countdownTimer, 1000);
		showTrivia = setInterval(loadQuestion, countdown * 1000);
	}

	// Function creates and places the buttons for multiple choice onto HTML
	function createBtns(questions) {
		for(var i = 0; i < questions.length; i++) {
			var btn = $("<button>");
			btn.addClass("btn btn-warning");
			btn.addClass("choice");
			btn.attr("type", "button");
			btn.val(i);
			btn.html(questions[index].choices[i]);
			$("#choices").append(btn);
		}
	}

	// Function determines if user guessed correct answer	
	function checkAnswer(obj) {
		
		// Determine if correct answer
		if(obj.text() === questions[index].answer){
			correct++;
			result = "Correct!";
		}
		else {
			wrong++;
			result = "Incorrect!";
		}
		loadAnswer();
    }
})

    // Function that shows the timer
    function countdownTimer() {
        countdown--;	
        $("#time").html("<p>Time remaining: " + countdown + " seconds.</p>");
    }

    // Function to view end game results
    function endGame() {

        // Stop intervals
        clearInterval(showTrivia);
        clearInterval(showAnswer);
        clearInterval(timer);	
        
        // Set variables
        let unanswered = questions.length - (correct + wrong);
        let stats = "<p>Correct: " + correct + "</p>" +
                    "<p>Incorrect: " + wrong + "</p>" +
                    "<p>Unanswered: " + unanswered + "</p>"
        ;
        let btn = "<button class='btn btn-danger' type='button' id='btnRestart'>Play Again</button>"

        // Update HTML
        clearContent();
        $("#time").html("<u><h3>Final Score</h3></u>");
        $("#question").html(stats);
        $("#choices").html(btn);
    }

    // Function that resets variables for game replay
    function resetGame() {
        
        // reset varaibles
        wrong = 0;
        correct = 0;
        index = -1;
        
        // Update HTML
        clearContent();

        // Restart game
        loadQuestion();
    }

    // Function that clears the main-content id of HTML
    function clearContent() {
        $("#time").empty();
        $("#question").empty();
        $("#choices").empty();
    }