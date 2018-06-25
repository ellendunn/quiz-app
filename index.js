'use strict';

let questionNumber = 0;
let score = 0;
// const question = QUIZ[questionNumber];


//start quiz!
function startQuiz() {
  //user clicks start button to go to the first question.
  $('.container').on('click', '.js-start-button', event => {
    $('.container').hide();
     renderQuestion()
  }); 
} 

function renderQuestion(){
$('.questionContainer').show();
$('.questionContainer').html(questionTemplate());
updateQuestionTracking(questionNumber+1);
}

function questionTemplate(){
  // score, question, questionTracking
  //this function will load the question page with the question, all options, and a select button
if (questionNumber === 10){
  renderFinalResults()
  }
else {
  $('.questionContainer').addClass('activeQuestion');
  return(`<div class = 'questionTitle'>
     <h1>${QUIZ[questionNumber].text}</h1>
  </div>
  <form class='questionForm'>
    <fieldset name='answer-options'>
    <legend></legend>
    <input type='radio' name='option' id='option-1' value='${QUIZ[questionNumber].ans1}' required>
    <label for='option-1'>${QUIZ[questionNumber].ans1}</label><br>  
    <input type='radio' name='option' id='option-2' value='${QUIZ[questionNumber].ans2}' required>
    <label for='option-2'>${QUIZ[questionNumber].ans2}</label><br>
    <input type='radio' name='option' id='option-3' value='${QUIZ[questionNumber].ans3}' required>
    <label for='option-3'>${QUIZ[questionNumber].ans3}</label><br>
    <input type='radio' name='option' id='option-4' value='${QUIZ[questionNumber].ans4}' required>
    <label for='option-4'>${QUIZ[questionNumber].ans4}</label><br> 
  </fieldset>
  <button type='submit' class = 'submitAnswer' >Submit</button>
  </form>`)
}
}


function handleNextButton(){
  //listens for event on results page that will load the next question and go back to renderQuestion function. 
  $('.questionContainer').on('click', '.js-next-button', event => {
    questionNumber++;
    renderQuestion();
  }
  )}


function updateScore(){
  score ++;
  $('.score').closest('span').text(score);
}

function updateQuestionTracking(q){
  $('.questionTracking').closest('span').text(q);
}

function handleSubmitButton(){
  //listen for an event after selecting an option and then clicking submit button that will lead to results of the question
  $('.questionContainer').on('click', '.submitAnswer', event => {
    event.preventDefault();
    renderResults();
  }); 
}
  

function renderResults(){
  //load results to tell user if they selected the correct answer or the wrong answer. This will also update the quiz tracking and score.
    
    let selected = $('input:checked');
    let selectedAnswer = selected.val();
    let correctAnswer=`${QUIZ[questionNumber].correctAnswer}`;

    if (selectedAnswer === correctAnswer){
      $('form').hide();
      $('.questionTitle').hide()
      $('.questionContainer').append(
        `<h1>You got it right!</h1>
		      <img class='resultsGif' src="https://78.media.tumblr.com/b641e5f3475c9cbd871d4f4f4498cac7/tumblr_npahsmfo4l1sxn2y0o7_500.gif" alt="Wayne Brady saying 'Yaaaay!' and dancing"><br>
    	    <button type="button" class="js-next-button">Yes, and...</button>`);
        updateScore();
      }
    else{
      $('form').hide();
      $('.questionTitle').hide()
      $('.questionContainer').append(
        `<h1>Nope! I think you meant to pick '${QUIZ[questionNumber].correctAnswer}'</h1>
	      	<img class='resultsGif' src="http://i0.kym-cdn.com/photos/images/original/000/510/114/f14.gif" alt="Colin Mochrie making a silly face"><br>
        	<button type="button" class="js-next-button">Yes, and...</button>`
      )}
  }

function renderFinalResults(){
  //after all questions have been answered, this will accumulate results and display how the user should proceed in their improv career.

$('.questionContainer').addClass('finalResultsContainer');

if (score >= 8){
  $('.heading').hide();
  $('.questionContainer').html(`
  <h1>You got ${score} questions correct!</h1><h2>Try your shot on stage! Lorne Michaels might be watching!</h2>
    <img class = 'resultsGif' src = "https://78.media.tumblr.com/d104454b2ec3d885f369a90ca80d6e55/tumblr_n7agy0O7Fk1tplkyfo1_400.gif" alt="Wayne Brady gif saying 'When it comes to improv on the tops we sits'"><br>
    <button type="button" class="js-restart-button">Restart Quiz!</button>`)
}
else if (score <8 && score >=5){
    $('.heading').hide();
    $('.questionContainer').html(`<h1>You got ${score} questions correct!</h1><h2>Have you been taking classes? You may have a nack for this stuff!</h2>
		<img class = 'resultsGif' src="https://i.gifer.com/W3If.gif" alt="Wayne Brady gif saying 'you all get it'"><br>
    <button type="button" class="js-restart-button">Restart Quiz!</button>`)
}
else {
    $('.heading').hide();
    $('.questionContainer').html(`<h1>You got ${score} questions correct!</h1><h2>You may want to start with the basics. Try some improv classes at your nearest theater!</h2>
  		<img class = 'resultsGif' src='http://31.media.tumblr.com/d5a54fcf6460728f38b397226b628289/tumblr_mmd9ltjQs11r6xbv8o1_250.gif' alt="Colin Mochrie gif saying 'That was horrible!'"><br>
    <button type="button" class="js-restart-button">Restart Quiz!</button>`)
}
}

function handleRestartButton(){
  $('.questionContainer').on('click', '.js-restart-button', event => {
    // location.reload();
    questionNumber = 0;
    score = 0;
    $('.container').show();
    $('.questionContainer').hide();
    // startQUIZ();
  });
}


function runQuiz(){
  startQuiz();
  handleSubmitButton ();
  handleNextButton();
  handleRestartButton();
}

$(runQuiz())


