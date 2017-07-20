var inquirer = require("inquirer");

var basicCard = require("./basicCard.js");
var clozeCard = require("./clozeCard.js");
var clozeQuestions = require("./questions.js").cloze;
var basicQuestions = require("./questions.js").basic;

var clozeQuest = [];
var basicQuest = [];

for( var i = 0; i < clozeQuestions.length; i++){
    var questC = new clozeCard(clozeQuestions[i].full, clozeQuestions[i].cloze);
    clozeQuest.push(questC);
}
for( var i = 0; i < basicQuestions.length; i++){
    var questB = new basicCard(basicQuestions[i].front, basicQuestions[i].back);
    basicQuest.push(questB);
}

var current = 0;
var correct = 0;
var wrong = 0;

ask();

function ask(){
    inquirer.prompt([
        {
            type: "list",
            message: "Do you want cloze questions or basic questions?",
            choices: ["cloze", "basic", "Add Cloze", "Add Basic"],
            name: "question"
        }
    ]).then(function(inquirerResponse){
        if(inquirerResponse.question === "cloze"){
            clozeAsk();
        }else{
            basicAsk();
        }
    })
}
function clozeAsk(){
    inquirer.prompt([
        {
            type: "input",
            message: clozeQuest[current].partial + "\nAnswer: ",
            name: "guess"
        }
    ]).then(function(inquirerResponse){
        console.log("\n");
        console.log("---------");
        
        if(inquirerResponse.guess.toLowerCase() === clozeQuest[current].cloze.toLowerCase()){
            console.log("CORRECT!");
            correct++;
        }else{
            console.log("Incorrect.");
            wrong++;
        }
        
        console.log("---------");
        console.log( clozeQuest[current].text );
        console.log("---------");
        console.log("---------");
        
        if(current < clozeQuest.length - 1){
            current++;
            clozeAsk();
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

function basicAsk(){
    inquirer.prompt([
        {
            type: "input",
            message: basicQuest[current].front + "\nAnswer: ",
            name: "guess"
        }
    ]).then(function(inquirerResponse){
        console.log("\n");
        console.log("---------");
        
        if(inquirerResponse.guess.toLowerCase() === basicQuest[current].back.toLowerCase()){
            console.log("CORRECT!");
            correct++;
        }else{
            console.log("Incorrect.");
            wrong++;
        }
        var holdFront = basicQuest[current].front;
        var holdBack = basicQuest[current].back;
        console.log("---------");
        console.log("Question: " + holdFront);
        console.log("Answer: " + holdBack);
        console.log("---------");
        console.log("---------");
        
        if(current < basicQuest.length - 1){
            current++;
            basicAsk();
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
                    console.log("---------");
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