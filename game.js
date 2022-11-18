

const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
 {
    question:'------ is not the component of data structure.',
    choice1:'Operations',
    choice2:'Storage Structure',
    choice3:'Algorithms',
    choice4:'None of above',
    answer:4,
 },
 {
    question:'Which of the following is not the internal Sort?',
    choice1:'Insertion Sort',
    choice2:'Bubble Sort',
    choice3:'Merge Sort',
    choice4:'Heap Sort',
    answer:3,
 },
 {
  question:'When new data are to be inserted into a data structure, but there is not available space; this situation is usually called....',
  choice1:'Underflow',
  choice2:'Overflow',
  choice3:'Houseful',
  choice4:'Saturated',
  answer:2,
 },
 {
  question:'Which of the following data structures are indexed structure?',
  choice1:'Linear arrays',
  choice2:'Linked lists',
  choice3:'Queue',
  choice4:'Stack',
  answer:1,
 },
 {
  question:'Which of the following are the operations applicable an primitive data structures?',
  choice1:'Create',
  choice2:'Destroy',
  choice3:'Update',
  choice4:'All of the above',
  answer:4 ,
 },
]

const SCORE_POINTS =100
const MAX_QUESTIONS =5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {

  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
      localStorage.setItem('mostRecentScore', score)

      return window.location.assign('/end.html')
  }

  questionCounter++
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`


  const questionIndex = Math.floor(Math.random() * availableQuestions.length)
  currentQuestion = availableQuestions[questionIndex]
  question.innerText = currentQuestion.question

  choices.forEach(choice =>{
    const number = choice.dataset['number']
    choice.innerText = currentQuestion['choice' + number]
  })

  availableQuestions.splice(questionIndex,1)

  acceptingAnswers = true
}

choices.forEach(choice => {
  choice.addEventListener('click', e =>{
  if(!acceptingAnswers) return
  
  acceptingAnswers = false
  const selectedChoice = e.target
  const selectedAnswer = selectedChoice.dataset['number']

  let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' :'incorrect'

  if(classToApply ==='correct'){
    incrementScore(SCORE_POINTS)
  }

  selectedChoice.parentElement.classList.add(classToApply)

  setTimeout(() => {
    selectedChoice.parentElement.classList.remove(classToApply)
    getNewQuestion()
  }, 1000)

  })
})


incrementScore = num => {
  score +=num
  scoreText.innerText = score
}
startGame()
