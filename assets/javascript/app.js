$(function () {

	var wrong = 0;
	var correct = 0;
	var index = -1;
    var result = false;
    var results = "";
    var countdown = 10;
	var showTrivia = "";
    var timer;

//  CREATE QUESTIONS & choices - STORE IN ARRAY
    var questions = [
        { 
            question: "Who is Harry's nemesis?",
            choices: ["Professor Snape", "Lord Voldermort", "Professor Dumbledore", "Draco Malfoy"],
            answer: "Lord Voldermort",
            image: "assets/images/voldermort.jpg"
        },

     {
            question: "What is Harry's patronus?",
            choices: ["Doe", "Stag", "Wolf", "Horse"],
            answer: "Stag",
            image: "assets/images/stag.jpg"
        },

     {
            question: "What potion did Harry take to get Slughorn's memories?",
            choices: ["Felix Felicis", "Polyjuice Potion", "Alihotsy Draught", "Essense of Dittany"],
            answer: "Felix Felicis",
            image: "assets/images/felix-felicis.jpg"
        },

         {
            question: "What did Dumbledore leave for Hermonie in is will?",
            choices: ["The Luminator", "The Sword of Griffendor", "The Snitch", "The Tales of Beedle the Bard"],
            answer: "The Tales of Beedle the Bard",
            image: "assets/images/book.jpg"
        },
    
         {
            question: "How many kids are in the Weasley family?",
            choices: ["6", "7", "8", "9"],
            answer: "7",
            image: "assets/images/kids.png"
        },

         {
            question: "What color are the flames that came out of the Goblet of Fire?",
            choices: ["Yellow", "Orange", "Blue", "Green"],
            answer: "Blue",
            image: "assets/images/goblet-fire.jpg"
        }]

    // Create on-clicks
    $("#btnStart").on("click", function(){
        loadQuestion();
    });

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
		countdown = 10;	
        console.log(countdown);

		// Only play if there is another question available
		if(index < questions.length){
			// Clear values
			clearInterval(showTrivia);
			clearInterval(timer);
			clearContent();

			// Update html elements
			$("#time").html("<p>Time remaining: " + countdown + " seconds.</p>");
			$("#question").html("<p>" + questions[index].question + "</p>");
			createBtns();

			// Set intervals
			// showAnswer = setInterval(loadAnswer, countdown * 1000);
			timer = setInterval(countdownTimer, 1000);
		}
		else {
			endGame();
		}
    }

    // Function to show results
    function showResults() {
        countdown = 5;
        clearInterval(timer);
            clearContent();
    }

    // Function updates HTML with the answer
	function loadAnswer() {
		
		// Set result if user didn't answer and time ran out
		if (result === false){
			results = "No answer chosen."
		}
		// Clear values
		clearInterval(showAnswer);
		clearInterval(timer);
		$("#time").empty();

		//Update html elements
		$("#time").html("<p>Time remaining: " + countdown + " seconds.</p>");
		$("#question").html("<p>" + results + "</p>");

		// reset result in case timer ran out
		result = false;

		// Set intervals
		timer = setInterval(countdownTimer, 1000);
	}

	// Function creates and places the buttons for multiple choice onto HTML
	function createBtns() {
        console.log("hi");
		for(var i = 0; i < 4; i++) {
            var btn = $("<button>");
			btn.addClass("btn btn-warning");
			btn.addClass("choice");
			btn.attr("type", "button");
			btn.val(i);
			btn.text(questions[index].choices[i]);
            console.log("btn");
			$("#choices").append(btn);
		}
	}

	// Function determines if user guessed correct answer	
	function checkAnswer(obj) {

		// Determine if correct answer
		if(obj.text() === questions[index].answer){
            correct++;
        var resultsDiv = $("<div class='resultClass'>");
        var results = $("<p>Correct!</p>");
        console.log(questions[index].image)
        var resultsImage = $("<img alt='image' class='results-image' src = " +questions[index].image +">");
        resultsDiv.append(results).append(resultsImage);
        console.log(resultsDiv);
        $("#choices").html(resultsDiv);
		}
		else {
			wrong++;
            results = "Incorrect! The correct answer is " + questions[index].answer;
        $("#choices").html(results);
        }
    }

    // Function that shows the timer
    function countdownTimer() {
        if (countdown > 0) 	{
        countdown = countdown-1;
        $("#time").html("<p>Time remaining: " + countdown + " seconds.</p>");      
        }
        else {loadQuestion() 
        };
    }

    // Function to view end game results
    function endGame() {

        // Stop intervals
        clearInterval(showTrivia);
        // clearInterval(showAnswer);
        clearInterval(timer);	
        
        // Set variables
        let unanswered = questions.length - (correct + wrong);
        let stats = "<p>Correct: " + correct + "</p> <br>" +
                    "<p>Incorrect: " + wrong + "</p>  <br>" +
                    "<p>Unanswered: " + unanswered + "</p>  <br>"
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
})
