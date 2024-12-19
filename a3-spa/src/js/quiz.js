import App from './app.js'

/**
 * Represents a Quiz application.
 */
export default class Quiz extends App {
  /**
   * Create a Quiz app.
   * @param {HTMLElement} parentDiv - The parent element.
   */
  constructor (parentDiv) {
    super(parentDiv, 'QUIZ')
    this.createHTMLStructure()
    super.dragApp(this.parentDiv)

    this.unorderedQuestions = []
    this.currentQuestionIndex = 0
    this.score = 0
  }

  /**
   * Creates the HTML elements of the Quiz.
   */
  createHTMLStructure () {
    this.quizContainer = document.createElement('div')
    this.quizContainer.classList.add('quiz-div')
    this.parentDiv.appendChild(this.quizContainer)

    this.buttonsDiv = document.createElement('div')
    this.buttonsDiv.className = 'buttonsDiv'
    this.quizContainer.appendChild(this.buttonsDiv)

    this.startButton = document.createElement('button')
    this.startButton.textContent = 'START'
    this.buttonsDiv.appendChild(this.startButton)
    this.startButton.className = 'quizButton'
    this.startButton.addEventListener('click', () => this.startQuiz())

    this.procentImg = document.createElement('img')
    this.procentImg.src = 'img/QUIZbackground.jpeg'
    this.procentImg.alt = 'quiz'
    this.procentImg.style.objectFit = 'cover'
    this.procentImg.style.width = '100%'
    this.procentImg.style.height = '300px'

    this.quizContainer.appendChild(this.procentImg)

    // Create question container element
    this.questionContainerElement = document.createElement('div')
    this.quizContainer.appendChild(this.questionContainerElement)

    // Create the question  element
    this.questionElement = document.createElement('div')
    this.quizContainer.appendChild(this.questionElement)

    // Create answer buttons element
    this.answerButtonsElement = document.createElement('div')
    this.answerButtonsElement.className = 'choices'
    this.quizContainer.appendChild(this.answerButtonsElement)

    this.congratsMessage = document.createElement('div')
    this.congratsMessage.className = 'win hide'
    this.quizContainer.appendChild(this.congratsMessage)
  }

  /**
   * Start the Quiz application.
   */
  startQuiz () {
    console.log('STARTED')
    this.procentImg.classList.add('hide')
    this.startButton.classList.add('hide')
    this.questionContainerElement.classList.remove('hide')
    // this.endButton.classList.remove('hide');
    this.unorderedQuestions = this.questions.sort(() => Math.random() - 0.5)
    this.currentQuestionIndex = 0
    this.next()
  }

  /**
   * End the Quiz application.
   */
  endQuiz () {
    console.log('Ended')
    this.startButton.classList.remove('hide')
  }

  /**
   * Move to next quastion.
   */
  next () {
    this.resetState()
    this.showQuestion(this.unorderedQuestions[this.currentQuestionIndex])
  }

  /**
   * Creates a button element.
   * @param {string} id - The id of it.
   * @returns {HTMLElement} The created button.
   */
  createButton (id) {
    const button = document.createElement('button')
    button.classList = 'choiceBtn'
    button.id = id
    return button
  }

  /**
   * Show the question.
   * @param {object} question - The question object.
   */
  showQuestion (question) {
    this.questionElement.innerText = question.question

    question.choices.forEach(answer => {
      const button = this.createButton('choiceButton')
      button.textContent = answer.alt
      button.addEventListener('click', () => this.selectAnswer(answer.correct, button))
      this.answerButtonsElement.appendChild(button)
    })

    if (question.img) {
      const imgItem = document.createElement('img')
      imgItem.src = question.img
      imgItem.className = 'imgChoice'
      this.answerButtonsElement.appendChild(imgItem)
    }
  }

  /**
   * Reset the state of the quiz.
   */
  resetState () {
    this.clearStatusClass(this.parentDiv)
    while (this.answerButtonsElement.firstChild) {
      this.answerButtonsElement.removeChild(this.answerButtonsElement.firstChild)
    }
  }

  /**
   * Handles the selecting answer.
   * @param {boolean} correct - Indicates if it is correct.
   * @param {HTMLElement} button - The button element representing the answer.
   */
  selectAnswer (correct, button) {
    this.setStatusClass(button, correct)
    if (correct) {
      this.score += 1
      console.log(this.score)
    }
    if (this.unorderedQuestions.length > this.currentQuestionIndex + 1) {
      this.currentQuestionIndex++
      setTimeout(() => {
        this.next()
      }, 1000)
    } else {
      this.showScore()
    }
  }

  /**
   * Set the status class of the question.
   * @param {HTMLElement} element - The element to set the status.
   * @param {boolean} correct - Indicates if the answer is correct.
   */
  setStatusClass (element, correct) {
    this.clearStatusClass(element)
    if (correct) {
      element.classList.add('correct')
    } else {
      element.classList.add('wrong')
    }
  }

  /**
   * Clears the status.
   * @param {HTMLElement} element - The element to clear.
   */
  clearStatusClass (element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
  }

  /**
   * Shows the final score of the quiz.
   */
  showScore () {
    this.resetState()
    this.questionElement.innerText = `Your score: ${this.score} out of ${this.questions.length}`
    this.procentuellScore()
  }

  /**
   * Shows the final precentage score of the quiz.
   */
  procentuellScore () {
    const procent = (this.score / this.questions.length) * 100

    const procentDiv = document.createElement('div')
    procentDiv.innerHTML = `<span>${Math.round(procent)} </span>`
    procentDiv.className = 'inside'

    this.procentImg = document.createElement('img')
    this.procentImg.src = 'img/procent.jpeg'
    this.procentImg.alt = 'quiz'
    this.procentImg.style.objectFit = 'cover'
    this.procentImg.style.width = '100%'
    this.procentImg.style.height = '200px'
    this.procentImg.style.position = 'relative'
    // this.procentImg.style.opacity = "70%";

    this.quizContainer.appendChild(procentDiv)

    this.quizContainer.appendChild(this.procentImg)
  }

  questions = [
    {
      question: 'What is the capital city of Sweden?',
      choices: [
        { alt: 'Stockholm', correct: true },
        { alt: 'Paris', correct: false },
        { alt: 'Berlin', correct: false }

      ]
    },
    {
      question: 'In JavaScript, which keyword is used to declare a variable?',
      choices: [
        { alt: 'var', correct: true },
        { alt: 'let', correct: false },
        { alt: 'cont', correct: false },
        { alt: 'function', correct: false }
      ]
    },
    {
      question: ' Which app has the most total users?',
      choices: [
        { alt: 'Snapchat', correct: false },
        { alt: 'Instagram', correct: true },
        { alt: 'TikTok', correct: false },
        { alt: 'Whatsapp', correct: false }

      ]

    },

    {
      question: 'What is Molecule? ',
      choices: [
        { alt: 'Oxygen', correct: false },
        { alt: 'Water', correct: true },
        { alt: 'Hydrogen', correct: false },
        { alt: 'Ethanol', correct: false }
      ],
      img: 'img/h2o.png'
    },

    {
      question: 'which country\'s flag is it',
      choices: [
        { alt: 'USA', correct: false },
        { alt: 'Sweden', correct: false },
        { alt: 'Canada', correct: true }
      ],
      img: 'img/kanada.png'
    }
  ]
}
