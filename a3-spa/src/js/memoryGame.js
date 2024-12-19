import App from './app.js'

/**
 * Represents a Memory Game application.
 */
export default class MemoryGame extends App {
  constructor (parentDiv) {
  /**
   * Create a Memory Game app.
   * @param {HTMLElement} parentDiv - The parent div.
   */
    super(parentDiv, 'Memory Game')
    this.rows = null
    this.columns = null

    this.createHTMLStructure()

    this.startTime = null
    this.updateInterval = null
    this.cardValues = [
      { name: '0', image: 'img/0.png' },
      { name: '1', image: 'img/1.png' },
      { name: '2', image: 'img/2.png' },
      { name: '3', image: 'img/3.png' },
      { name: '4', image: 'img/4.png' },
      { name: '5', image: 'img/5.png' },
      { name: '6', image: 'img/6.png' },
      { name: '7', image: 'img/7.png' }
    ]
    this.cards = []
    this.firstCard = null
    this.secondCard = null
    this.focusCard = null
    this.attemptsNumber = 0

    this.gameRunning = false
    // this.startBtn.addEventListener("click", this.startGame.bind(this));
    this.restartBtn.addEventListener('click', this.restart.bind(this))
    this.endBtn.addEventListener('click', this.endGame.bind(this))

    this.twoTwoBtn.addEventListener('click', this.createtwoTwo.bind(this))
    this.fourTwoBtn.addEventListener('click', this.createfourTwo.bind(this))
    this.fourFourBtn.addEventListener('click', this.createFourFour.bind(this))

    this.readKey()

    super.dragApp(this.parentDiv) // Enable dragging for the game container
  }

  /**
   * Creates the HTML elements of the Memory Game application.
   */
  createHTMLStructure () {
    // memory-game
    this.memoryG = document.createElement('div')
    this.memoryG.classList.add('memory-game')

    this.parentDiv.appendChild(this.memoryG)

    this.buttonsDiv = document.createElement('div')
    this.buttonsDiv.classList.add('buttons-div')
    this.memoryG.appendChild(this.buttonsDiv)

    // Create an image element
    this.welcomeImg = document.createElement('img')
    this.welcomeImg.src = 'img/memoryStart.png'
    this.welcomeImg.alt = 'Welcome'
    this.welcomeImg.style.objectFit = 'cover'
    this.welcomeImg.style.width = '100%'
    this.welcomeImg.style.height = '100%'

    this.buttonsDiv.appendChild(this.welcomeImg)

    // Create a paragraph element
    this.paragraphWelcome = document.createElement('p')
    this.paragraphWelcome.textContent = 'Please choose size:'
    this.paragraphWelcome.classList.add('p')
    this.buttonsDiv.appendChild(this.paragraphWelcome)

    // twoTwoBtn Button
    this.twoTwoBtn = document.createElement('button')
    this.twoTwoBtn.id = 'twoTwoBtn'
    this.twoTwoBtn.textContent = '2x2'
    this.twoTwoBtn.classList.add('buttonSize')
    this.buttonsDiv.appendChild(this.twoTwoBtn)

    //  fourTwoBtn Button
    this.fourTwoBtn = document.createElement('button')
    this.fourTwoBtn.id = 'fourTwoBtn'
    this.fourTwoBtn.textContent = '4x2'
    this.fourTwoBtn.classList.add('buttonSize')
    this.buttonsDiv.appendChild(this.fourTwoBtn)

    // fourFour Button
    this.fourFourBtn = document.createElement('button')
    this.fourFourBtn.id = 'fourFourBtn'
    this.fourFourBtn.textContent = '4x4'
    this.fourFourBtn.classList.add('buttonSize')
    this.buttonsDiv.appendChild(this.fourFourBtn)

    // Result
    this.result = document.createElement('div')
    this.result.id = 'result'
    this.memoryG.appendChild(this.result)

    // game-container
    this.gameContainer = document.createElement('div')
    this.gameContainer.classList.add('game-container')
    this.memoryG.appendChild(this.gameContainer)

    // game-container
    this.content = document.createElement('div')
    this.content.classList.add('content')
    this.memoryG.appendChild(this.content)

    // Attempts
    this.attempts = document.createElement('div')
    this.attempts.id = 'attempts'
    this.content.appendChild(this.attempts)

    // Time
    this.time = document.createElement('div')
    this.time.id = 'time'
    this.content.appendChild(this.time)

    this.endBtn = document.createElement('button')
    this.endBtn.id = 'endBtn'
    this.endBtn.textContent = 'End'
    this.endBtn.classList.add('hide')
    this.memoryG.appendChild(this.endBtn)

    this.restartBtn = document.createElement('button')
    this.restartBtn.id = 'restartBtn'
    this.restartBtn.textContent = 'Restart'
    this.restartBtn.classList.add('hide')
    this.memoryG.appendChild(this.restartBtn)
  }

  /**
   * Starts the Memory Game.
   */
  startGame () {
    clearInterval(this.updateInterval)

    this.attemptsNumber = 0
    this.welcomeImg.classList.add('hide')
    this.startTime = new Date()
    this.endBtn.classList.remove('hide')
    this.rightCardsN = 0
    this.shuffleItem(this.cardValues)
    this.attemptsHandlar()
    this.timeHandler()
    this.content.classList.remove('hide')
  }

  /**
   * Creates a Memory Game with a 2x2 grid.
   */
  createtwoTwo () {
    this.rows = 2
    this.columns = 2
    this.startGame()
    this.gameboardSize(this.cardValues, this.columns, this.rows)
  }

  /**
   * Creates a Memory Game with a 4x2 grid.
   */
  createfourTwo () {
    this.rows = 2
    this.columns = 4
    this.startGame()
    this.gameboardSize(this.cardValues, this.columns, this.rows)
  }

  /**
   * Creates a Memory Game with a 4x4 grid.
   */
  createFourFour () {
    this.rows = 4
    this.columns = 4
    this.startGame()
    this.gameboardSize(this.cardValues, this.columns, this.rows)
  }

  /**
   * End game.
   */
  endGame () {
    this.gameContainer.innerHTML = ''
    this.content.classList.add('hide')
    this.welcomeImg.classList.remove('hide')
    this.endBtn.classList.add('hide')
    clearInterval(this.updateInterval)
  }

  /**
   * Handles winning of teh Memory Game.
   */
  winGame () {
    this.endGame()
    this.buttonsDiv.classList.add('hide')
    const winImage = document.createElement('img')
    winImage.src = 'img/congrats.gif'
    this.result.innerHTML = '<h2> Congratulations !</h2>'
    winImage.alt = 'You won!'
    this.result.appendChild(winImage)
    this.result.classList.remove('hide')
    this.endBtn.classList.add('hide')
    this.restartBtn.classList.remove('hide')
    this.content.classList.remove('hide')
  }

  /**
   * Handles restarting the Memory Game.
   */
  restart () {
    this.buttonsDiv.classList.remove('hide')
    this.content.classList.add('hide')
    this.welcomeImg.classList.remove('hide')
    this.endBtn.classList.add('hide')
    this.result.classList.add('hide')
    this.restartBtn.classList.add('hide')
  }

  /**
   * Handles keys reading of the Memory Game.
   */
  readKey () {
    document.addEventListener('keydown', (event) => {
      console.log(event.key)
      switch (
        event.key
      ) {
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
          if (this.focusCard) {
            this.changeFocusCardId(event.key)
          }
          break
        case 13:
          this.cardClick()
          break
        default:
          break
      }
    })
  }

  /**
   * Changes the focus card's ID based on arrow key inputs.
   * @param {string} direction - The direction of arrow key input.
   */
  changeFocusCardId (direction) {
    const [currentX, currentY] = this.focusCard.id.split(',').map(Number)
    let newX = currentX
    let newY = currentY
    switch (direction) {
      case 'ArrowLeft':
        newX = Math.max(1, currentX - 1)
        console.log(newX)
        break
      case 'ArrowUp':
        newY = Math.max(1, currentY - 1)
        console.log(newY)
        break
      case 'ArrowRight':
        newX = Math.min(this.columns, currentX + 1)
        console.log(newX)

        break
      case 'ArrowDown':
        newY = Math.min(this.rows, currentY + 1)
        console.log(newY)
        break
      default:
        break
    }

    const newFocusCard = document.getElementById(`${newX},${newY}`)
    if (newFocusCard) {
      this.focusCard = newFocusCard
      this.focusCard.focus()
    }
  }

  /**
   * Handles attempts in the Memory Game.
   */
  attemptsHandlar () {
    this.attempts.innerHTML = ` Attempts: ${this.attemptsNumber}`
  }

  /**
   * Handles the time in the Memory Game.
   */
  timeHandler () {
    const updateTime = () => {
      const currentTime = new Date()
      const elapsedTime = (currentTime - this.startTime) / 1000
      const avrundedTime = Math.round(elapsedTime)

      if (avrundedTime >= 60) {
        const minutes = Math.floor(avrundedTime / 60)
        const seconds = avrundedTime % 60
        this.time.innerHTML = `Time: ${minutes} minutes ${seconds} seconds`
      } else {
        this.time.innerHTML = `Time: ${avrundedTime} seconds`
      }
    }
    this.updateInterval = setInterval(updateTime, 1000)
  }

  /**
   * Creates a card element.
   * @param {object} cardValue - The value of it.
   * @returns {HTMLElement} The created card.
   */
  createCardElement (cardValue) {
    const cardElement = document.createElement('div')
    cardElement.classList.add('card-container')
    cardElement.dataset.cardValue = cardValue.name
    cardElement.tabIndex = 0

    cardElement.innerHTML = `
        <div class="card-before"> ? </div>
        <div class="card-after">
          <img src="${cardValue.image}" class="card-image"/>
        </div>
      `
    return cardElement
  }

  /**
   * Shuffles items in an array.
   * @param {Array} array - The array to be shuffled.
   * @returns {Array} The shuffled array.
   */
  shuffleItem (array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  /**
   * Generating a gameboard with a specified size.
   * @param {Array} cardValues - Values for the cards.
   * @param {number} columns - Number of columns in the gameboard.
   * @param {number} rows - Number of rows.
   */
  gameboardSize (cardValues, columns, rows) {
    this.gameContainer.innerHTML = ''
    const cardsNum = columns * rows
    const cardsShuffle = [...cardValues.slice(0, cardsNum / 2), ...cardValues.slice(0, cardsNum / 2)].sort(() => Math.random() - 0.5)

    this.cards = cardsShuffle.map((cardValue, index) => {
      const cardElement = this.createCardElement(cardValue)
      // x and y coordinates based on the gameboardSize, (columns, and rows)
      const x = (index % columns) + 1
      const y = (Math.floor(index / columns)) + 1
      // card id based on its coordinates
      cardElement.id = `${x},${y}`

      cardElement.addEventListener('click', e => this.cardClick(cardElement, e))
      cardElement.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          cardElement.focus()
          this.cardClick(cardElement)
        }
      })

      return cardElement
    })

    this.gameContainer.append(...this.cards)
    this.gameContainer.style.gridTemplateColumns = `repeat(${columns}, auto)`
    this.gameContainer.style.gridTemplateRows = `repeat(${rows}, auto)`
  }

  /**
   * Handles card clicks in the Memory Game.
   * @param {HTMLElement} card - The card element clicked.
   */
  cardClick (card) {
    this.focusCard = card
    if (!card.classList.contains('sameCard') && card !== this.firstCard) {
      card.classList.add('render')
      if (!this.firstCard) {
        this.firstCard = card
        this.firstCardValue = card.dataset.cardValue
      } else {
        this.attemptsNumber += 1
        this.attemptsHandlar()
        this.secondCard = card
        const secondCardValue = card.dataset.cardValue
        this.compareCards(this.firstCardValue, secondCardValue)
      }
    }
  }

  /**
   * Compares two cards in the Memory Game.
   * @param {string} firstCardValue - The value of the first card.
   * @param {string} secondCardValue - The value of the second card.
   */
  compareCards (firstCardValue, secondCardValue) {
    if (firstCardValue === secondCardValue) {
      this.firstCard.classList.add('sameCard')
      this.secondCard.classList.add('sameCard')
      this.firstCard = null
      this.rightCardsN += 1
      console.log(this.rightCardsN)
      if (this.rightCardsN === Math.floor(this.cards.length / 2)) {
        this.winGame()
      }
    } else {
      const [tempFirst, tempSecond] = [this.firstCard, this.secondCard]
      this.firstCard = null
      this.secondCard = null

      setTimeout(() => {
        tempFirst.classList.remove('render')
        tempSecond.classList.remove('render')
      }, 500)
    }
  }
}
