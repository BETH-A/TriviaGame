//  CREATE QUESTIONS & ANSWERS - STORE IN ARRAY

var questions = [
    {
        question: "Who is Harry's nemesis?", 
        index: 0,
        answers: ["Professor Snape","Lord Voldermort","Dumbledore","Joffery"],
        correctAnswer: "Lord Voldermort",
        image: "assets/images/xxx.gif"
    },

    {
        question: "2nd question",
        index: 1,
        answers:["a","b","c","d"],
        correctAnswer: "c",
        image: "assets/images/question2.gif"
    },

    {
        question: "3rd question",
        index: 1,
        answers:["a","b","c","d"],
        correctAnswer: "c",
        image: "assets/images/question3.gif"
    }
]

// Create count-down timer
var count=30;

var counter=setInterval(timer, 1000); 

function timer()
{
  count=count-1;
  if (count <= 0)
  {
     clearInterval(counter);
     //counter ended, do something here
     return;
  }
}
// Create on-click button to start the game

