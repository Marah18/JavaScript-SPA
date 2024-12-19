/**
 * Show a desktop application.
 */
export default class Desktop {
  constructor () {
  /**
   * Create an instance of Desktop.
   */
    this.desktopDiv = document.createElement('div')
    this.desktopDiv.classList.add('title-div')
    document.body.appendChild(this.desktopDiv)

    const backgroundOptions = [
      { value: 'img/desktop.jpeg', label: 'Mountain ' },
      { value: 'img/desktop2.jpeg', label: 'Green Nature' },
      { value: 'img/background2.png', label: 'Colors ' },
      { value: 'img/desktop4.webp', label: 'Animation ' }
    ]

    this.createDropdownButton('Change Background', backgroundOptions)

    this.currentTime()
    setInterval(() => this.currentTime(), 6000)
  }

  /**
   * Create a dropdown with options for changing background.
   * @param {string} buttonText - The name of the background.
   * @param {Array} backgroundOptions - Array of background options.
   */
  createDropdownButton (buttonText, backgroundOptions) {
    const changeBackGrBtn = document.createElement('div')

    const button = document.createElement('button')
    button.className = ' settingBtn'
    button.innerText = buttonText

    const dropdownMenu = document.createElement('div')
    dropdownMenu.className = 'dropdown-menu'

    backgroundOptions.forEach((option) => {
      const dropdownItem = document.createElement('a')
      dropdownItem.className = 'dropdown-item'
      dropdownItem.innerText = option.label

      // listener to change background
      dropdownItem.addEventListener('click', () => {
        this.changeBackgroundImage(option.value)
      })

      dropdownMenu.appendChild(dropdownItem)
    })

    // append elements tp the div
    changeBackGrBtn.appendChild(button)
    changeBackGrBtn.appendChild(dropdownMenu)

    // listene to visibility
    button.addEventListener('click', function () {
      dropdownMenu.classList.toggle('show')
    })

    document.addEventListener('click', function (event) {
      if (!changeBackGrBtn.contains(event.target)) {
        dropdownMenu.classList.remove('show')
      }
    })

    this.desktopDiv.appendChild(changeBackGrBtn)
  }

  /**
   * Changes the background image of the desktop.
   * @param {string} newImagePath - The path to the new background img.
   */
  changeBackgroundImage (newImagePath) {
    document.body.style.backgroundImage = `url('${newImagePath}')`
  }

  /**
   * Updates the current time on the desktop.
   */
  currentTime () {
    const now = new Date()
    const dayArray = [
      'Sön',
      'Mån',
      'Tis',
      'Ons',
      'Tors',
      'Fre',
      'Lör'
    ]
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    const day = now.getDay()
    const month = now.getMonth()
    const dag = now.getDate()
    const hours = now.getHours().toString().padStart(2, '0')
    const min = now.getMinutes().toString().padStart(2, '0')
    const time = `${dayArray[day]} ${dag} ${monthArray[month]}  ${hours}:${min}`

    const clock = document.querySelector('.clockDiv')
    if (clock) {
      clock.innerText = time
    } else {
      const newClock = document.createElement('div')
      newClock.className = 'clockDiv'
      this.desktopDiv.appendChild(newClock)
      newClock.innerText = time
    }
  }
}
