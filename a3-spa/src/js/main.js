/* eslint-disable no-new */
import MemoryGame from './memoryGame.js'
import Desktop from './desktop.js'
import Chat from './chat.js'
import Quiz from './quiz.js'

document.addEventListener('DOMContentLoaded', () => {
  /**
   * Initializes the desktop and event listeners for opening apps (chat, quiz and memory game).
   */
  new Desktop()

  const myGameIcon = document.getElementById('openMemoryGame')
  const myChatIcon = document.getElementById('openChat')
  const myQuiz = document.getElementById('openQuiz')

  let counter = 2
  let counterTop = 2

  myGameIcon.addEventListener('click', () => {
    const parentDiv = createAppContainer()
    new MemoryGame(parentDiv)
  })

  myChatIcon.addEventListener('click', () => {
    const parentDiv = createAppContainer()
    new Chat(parentDiv)
  })

  myQuiz.addEventListener('click', () => {
    const parentDiv = createAppContainer()
    new Quiz(parentDiv)
  })

  /**
   *  @returns  {string} created app container
   */
  function createAppContainer () {
    const parentDiv = document.createElement('div')
    parentDiv.classList.add('app-container')
    parentDiv.classList.remove('hide')
    counter += 3
    counterTop += 3

    if (counter > 40) {
      counterTop = 2
      counter = 2
    }

    parentDiv.style.left = `${counter}%`
    parentDiv.style.top = `${counterTop}%`
    document.body.appendChild(parentDiv)

    console.log('OPENED!!')
    return parentDiv
  }
})
