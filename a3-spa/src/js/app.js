/**
 * create a parent application window.
 */
export default class App {
  /**
   * Creates an instance of App.
   * @param {HTMLElement} parentDiv - The parent div where the app widow will be opened.
   * @param {string} appName - The name.
   */
  constructor (parentDiv, appName) {
    this.parentDiv = parentDiv
    this.appName = appName
    this.setLabel()
    this.setZIndex() // Call method to set z-index
    this.closeBtn.addEventListener('click', this.close.bind(this))
    this.minimizeBtn.addEventListener('click', this.toggleMinimize.bind(this))
    this.minimized = false
  }

  /**
   * Sets the z-index.
   */
  setZIndex () {
    let highestZ = 0
    document.querySelectorAll('*').forEach(function (element) {
      const zIndex = parseFloat(window.getComputedStyle(element).zIndex)
      if (!isNaN(zIndex) && zIndex > highestZ) {
        highestZ = zIndex
      }
    })
    // make z-index higher than the highest z-index with 1
    this.parentDiv.style.zIndex = highestZ + 1
  }

  /**
   * set label for the app
   */
  setLabel () {
    this.labelDiv = document.createElement('div')
    this.labelDiv.id = 'label-div'
    this.parentDiv.appendChild(this.labelDiv)

    this.appNameDiv = document.createElement('p')
    this.appNameDiv.className = 'appName'
    this.appNameDiv.setAttribute('tabindex', '0')
    this.appNameDiv.appendChild(document.createTextNode(this.appName))

    this.minimizeBtn = document.createElement('button')
    this.minimizeBtn.id = 'minimizeBtn'
    this.minimizeBtn.textContent = '-'

    this.closeBtn = document.createElement('button')
    this.closeBtn.id = 'closeBtn'
    this.closeBtn.textContent = 'x'
    this.appNameDiv.appendChild(this.closeBtn)
    this.appNameDiv.appendChild(this.minimizeBtn)
    this.labelDiv.appendChild(this.appNameDiv)

    this.appNameDiv.addEventListener('mousedown', () => {
      this.appNameDiv.focus()
    })

    document.body.addEventListener('mousedown', (event) => {
      const clickedElement = event.target
      if (!this.appNameDiv.contains(clickedElement)) {
        console.log('Clicked outside')
      }
    })
  }

  /**
   * Toggles the minimize state.
   */
  toggleMinimize () {
    this.minimized = !this.minimized
    this.appContainer = document.createElement('div')
    this.appContainer.classList.add('app')
    const appIcon = document.createElement('img')

    this.parentDiv.classList.add('minimized')
    switch (this.appName) {
      case 'Chat':
        appIcon.src = 'img/iconchat.png'
        appIcon.alt = 'Chat'
        break
      case 'Memory Game':
        appIcon.src = 'img/memorygameicon.png'
        appIcon.alt = 'MemoryGame'
        break
      case 'QUIZ':
        appIcon.src = 'img/quizicon.png'
        appIcon.alt = 'QUIZ'
        break
    }
    appIcon.classList.add('common-image-app-min')
    this.appContainer.appendChild(appIcon)
    this.footer = document.querySelector('footer')
    this.footer.appendChild(this.appContainer)

    this.appContainer.addEventListener('click', () => {
      this.parentDiv.classList.remove('minimized')
      if (this.footer.contains(this.appContainer)) {
        this.footer.removeChild(this.appContainer)
      }
    })
  }

  // Source code I get help from: https://www.w3schools.com/howto/howto_js_draggable.asp
  /**
   * Enables dragging functionality.
   * @param {HTMLElement} app - this app will be dragged.
   */
  dragApp (app) {
    let pos1 = 0; let pos2 = 0; let pos3 = 0; let pos4 = 0
    if (this.labelDiv) {
      this.labelDiv.onmousedown = dragMouseDown
    } else {
      app.onmousedown = dragMouseDown
    }

    /**
     *
     * @param {MouseEvent} e for draging the app using mouse
     */
    function dragMouseDown (e) {
      e = e || window.event
      e.preventDefault()
      let highestZIndex = 0
      document.querySelectorAll('*').forEach(function (element) {
        const zIndex = parseFloat(window.getComputedStyle(element).zIndex)
        if (!isNaN(zIndex) && zIndex > highestZIndex) {
          highestZIndex = zIndex
        }
      })
      app.style.zIndex = highestZIndex + 1

      pos3 = e.clientX
      pos4 = e.clientY
      document.onmouseup = closeDragElement
      document.onmousemove = elementDrag
    }

    /**
     *
     * @param {MouseEvent} e for the mouse event
     */
    function elementDrag (e) {
      e = e || window.event
      e.preventDefault()
      pos1 = pos3 - e.clientX
      pos2 = pos4 - e.clientY
      pos3 = e.clientX
      pos4 = e.clientY
      app.style.top = (app.offsetTop - pos2) + 'px'
      app.style.left = (app.offsetLeft - pos1) + 'px'
    }

    /**
     * close the drag  operation
     */
    function closeDragElement () {
      document.onmouseup = null
      document.onmousemove = null
    }
  }

  /**
   * close the app
   */
  close () {
    this.parentDiv.innerHTML = ''
  }
}
