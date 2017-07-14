var inquirer = require("inquirer");

var basicCard = require("./basicCard.js");
var clozeCard = require("./clozeCard.js");
var questions = require("./questions.js").questions;

var holdQuestions = [];

for( var i = 0; i < questions.length; i++){
    var quest = new clozeCard(questions[i].full, questions[i].cloze);
    holdQuestions.push(quest);
}
console.log(holdQuestions);
var current = 0;
var correct = 0;
var wrong = 0;

ask();

function ask(){
    inquirer.prompt([
        {
            type: "input",
            message: holdQuestions[current].partial + "\nAnswer: ",
            name: "guess"
        }
    ]).then(function(inquirerResponse){
        console.log("\n");
        
        if(inquirerResponse.guess.toLowerCase == holdQuestions[current].cloze.toLowerCase){
            console.log("CORRECT!");
            correct++;
        }else{
            console.log("Incorrect.");
            wrong++;
        }
        
        console.log( holdQuestions[current].text );
        
        if(current < holdQuestions.length - 1){
            current++;
            ask();
        }else{
            console.log("Good study session!");
            console.log("Correct: " + correct);
            console.log("Inorrect: " + wrong);
            
            
            inquirer.prompt([
                {
                    type: "confirm",
                    message: "Would you like to do another study session",
                    name: "confirm"
                }
            ]).then(function(inqResponse){
                if(inqResponse.confirm){
                    current = 0;
                    correct = 0;
                    wrong = 0;
                    ask();
                }else{
                    console.log("Good Luck on your exam!");
                }
            })
        }
    })
}