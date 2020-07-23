import React, { useState, useEffect } from 'react';
// import { useSpeechSynthesis } from 'react-speech-kit';
import '../../App.scss';
import './Questions.scss';
import socketIOClient from 'socket.io-client';

const ENDPOINT = 'http://127.0.0.1:3009';
const socket = socketIOClient(ENDPOINT);
let questionServed = false
let player1, player2 = ''
let theQuestions = []
let currentQuestion = {}
let question = ""
let choice1, choice2, choice3, choice4 = ""
let correctAnswer = ""
let allAnswers = []

export default function Questions(clientId) {
  // let [allChoices, setAllChoices] = useState([])

  // const [text, setText] = useState('Question 1... ');
  // const onEnd = () => {
  //   return (
  //     <Link to="/questions2" component={Questions}/>
  //   )
  // };
  // const { speak, voices } = useSpeechSynthesis({onEnd});
  // const voice = voices[51];

  // const fadeOut = (item) => {
  //   const fadeTarget = document.querySelector(item)
  //   fadeTarget.classList.add("fade-out");
  //   fadeTarget.style.opacity = '0'
  // }

  const getQuestions = () => {
    if (theQuestions.length === 0) {
      console.log("theQuestions is null, asking for questions")
      socket.emit('sendQuestions', theQuestions) //ask server for questions
    } 
    else if (theQuestions.length !== 0 && questionServed === false) {
      questionServed = true;
      console.log("Serving questions")
      serveQuestions();
    }
  }

  useEffect(() => {
    // asking server for questions
    socket.on("advanceToQuestions", () => {if (theQuestions.length === 0) {getQuestions()}})
    
    //listen for move to next question
    socket.on("nextQuestion", () => {
      serveQuestions()
      document.querySelector(".question__wrapper").style.display = "flex"
      document.querySelector("#answer1").style.display = "flex"
      document.querySelector("#answer2").style.display = "flex"
      document.querySelector("#answer3").style.display = "flex"
      document.querySelector("#answer4").style.display = "flex"
    })

    //listen for questions from server
    socket.on("filteredQuestions", (data) => {
      theQuestions = data
      console.log("theQuestions", theQuestions)
      serveQuestions();
    }) 
    
    socket.on("name1broadcast", data1 => {player1 = data1})
    socket.on("name2broadcast", data2 => {player2 = data2})

    socket.on('removeWrongAnswer', (thisAnswer) => {
      console.log(thisAnswer)
      for (const p of document.querySelectorAll("p")) {
        if (p.textContent.includes(thisAnswer)) {
          p.parentElement.style.display = "none"
        }
      }
      
    })
  }, [])

  const shuffleAnswers = (currentQuestion) => {
    console.log("correct answer is: ", currentQuestion.correct_answer)
    allAnswers = []
    allAnswers.push(currentQuestion.correct_answer)
    allAnswers.push(currentQuestion.incorrect_answers[0])
    allAnswers.push(currentQuestion.incorrect_answers[1])
    allAnswers.push(currentQuestion.incorrect_answers[2])
    shuffle(allAnswers)
  }

  // Fisher-Yates shuffle algorithm
  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
      }
    return array;
  };

  let serveQuestions = () => {
    currentQuestion = theQuestions.pop()
    question = currentQuestion.question
    correctAnswer = currentQuestion.correct_answer
    shuffleAnswers(currentQuestion)
    choice1 = allAnswers[0]
    choice2 = allAnswers[1]
    choice3 = allAnswers[2]
    choice4 = allAnswers[3]
    console.log("Questions remaining: ", theQuestions)
  
  return (
    document.querySelector(".question").innerHTML = question,
    document.querySelector(".question__answer1").innerHTML = choice1,
    document.querySelector(".question__answer2").innerHTML = choice2,
    document.querySelector(".question__answer3").innerHTML = choice3,
    document.querySelector(".question__answer4").innerHTML = choice4
  )
}

  // Modal
  // const submitCorrect = () => {
  //   document.getElementById("answerModal").style.display = "block";
  //   document.getElementById("answer1");

  //   document.querySelector(".question__wrapper").style.display = "none"
  //   document.querySelector(".modal-text").innerHTML = "Correct! You get 100 points!"
  //   socket.emit('100Player', clientId);
    
  //   setTimeout(() => {
  //     document.getElementById("answerModal").style.display = "none"
  //     socket.emit('nextQuestion'); //move to next question
  //   }, 2000)
  // }

  // const submitIncorrect1 = () => {
  //   document.getElementById("answerModal").style.display = 'block';
  //   document.querySelector(".wrong-answer1");

  //   document.querySelector(".modal-text").innerHTML = "Incorrect! You lose 75 points!"
  //   socket.emit('minus75Player', clientId);

  //   setTimeout(() => {
  //     document.getElementById("answerModal").style.display = "none"
  //     socket.emit('removeWrongAnswer1')
  //   }, 2000)
  // }

  // const submitIncorrect2 = () => {
  //   document.getElementById("answerModal").style.display = 'block';
  //   document.querySelector(".wrong-answer2");

  //   document.querySelector(".modal-text").innerHTML = "Incorrect! You lose 75 points!"
  //   socket.emit('minus75Player', clientId);

  //   setTimeout(() => {
  //     document.getElementById("answerModal").style.display = "none"
  //     socket.emit('removeWrongAnswer2')
  //   }, 2000)
  // }

  // const submitIncorrect3 = () => {
  //   document.getElementById("answerModal").style.display = 'block';
  //   document.querySelector(".wrong-answer3");

  //   document.querySelector(".modal-text").innerHTML = "Incorrect! You lose 75 points!"
  //   socket.emit('minus75Player', clientId);

  //   setTimeout(() => {
  //     document.getElementById("answerModal").style.display = "none"
  //     socket.emit('removeWrongAnswer3')
  //   }, 2000)
  // }

  const submitAnswer = (arg) => {
    const thisAnswer = document.querySelector(".question__" + arg).innerHTML 
    document.getElementById("answerModal").style.display = "block";
    // document.getElementById(`#${arg}`);

    if (document.querySelector(".question__" + arg).innerHTML === correctAnswer ) {
      document.querySelector(".question__wrapper").style.display = "none"
      document.querySelector(".modal-text").innerHTML = "Correct! You get 100 points!"
      socket.emit('100Player', clientId);

        setTimeout(() => {
          document.getElementById("answerModal").style.display = "none"
          socket.emit('nextQuestion'); //move to next question
        }, 2000)

      } else if (document.querySelector(".question__" + arg).innerHTML !== correctAnswer) {
        document.querySelector(".modal-text").innerHTML = "Incorrect! You lose 75 points!"
        socket.emit('minus75Player', clientId);

        setTimeout(() => {
          document.getElementById("answerModal").style.display = "none"
          socket.emit('removeWrongAnswer', thisAnswer)
        }, 2000)
      }

    // console.log("Current id with correct answer: ", clientId)
    // socket.emit('100Player', clientId);
    
    // setTimeout(() => {
    //   document.getElementById("answerModal").style.display = "none"
    //   socket.emit('nextQuestion'); //move to next question
    // }, 2000)
  }
    
  return (
    <div id="question-wrapper" className="App">
      
      <div id="answerModal" className="modal">
        <div className="modal-content">
          <p className="modal-text"></p>
        </div>
      </div>
      
      <div className="question__wrapper">
          <div className="question"></div>
          <div className="question__answer">
            <button className="question__answer-wrapper" id="answer1" onClick={() => {submitAnswer("answer1")}}>
              <div className="question__letter">A:</div>
              <p className="question__answer1"></p>
            </button>
            <button className="question__answer-wrapper" id="answer2" onClick={() => {submitAnswer("answer2")}}>
              <div className="question__letter">B:</div>
              <p className="question__answer2"></p>
            </button>
            <button className="question__answer-wrapper" id="answer3" onClick={() => {submitAnswer("answer3")}}>
              <div className="question__letter">C:</div>
              <p className="question__answer3"></p>
            </button>
            <button className="question__answer-wrapper" id="answer4" onClick={() => {submitAnswer("answer4")}}>
              <div className="question__letter">D:</div>
              <p className="question__answer4"></p>
            </button>
          </div>
        </div>
    </div>  
  )
}
