/**
 * The User object.
 */
export default class user {
  constructor (parentDiv) {
  /**
   * Creates a User object.
   * @param {HTMLElement} parentDiv - The parent element where to be appended.
   */
    this.parentDiv = parentDiv
  }

  /**
   * Sets the username in sessionStorage.
   * @param {string} newUserName - The new username to be set.
   */
  setUserName (newUserName) {
    sessionStorage.setItem('username', newUserName)
  }

  /**
   * Get the username from sessionStorage.
   * @returns {string|null} The username if available, otherwise null.
   */
  getUserName () {
    const name = sessionStorage.getItem('username')
    return name
  }

  /**
   * Allows the user to enter their username.
   * @returns {Promise<string>} A promise that resolves with the entered username or rejects if unavailable.
   */
  enterUserName () {
    return new Promise((resolve, reject) => {
      this.usernameInputDiv = document.createElement('div')
      this.usernameInputDiv.className = 'inputDiv'
      this.parentDiv.appendChild(this.usernameInputDiv)

      this.usernameInput = document.createElement('input')

      this.usernameInput.type = 'text'
      this.usernameInput.id = 'username-input'
      this.usernameInput.placeholder = 'Enter your username'
      // this.usernameInput.setAttribute('autofocus',  '');
      this.usernameInputDiv.appendChild(this.usernameInput)

      const changeUsernameBtn = document.createElement('button')
      changeUsernameBtn.classList.add('changeNameBtn')
      changeUsernameBtn.innerText = 'Change user name'
      this.usernameInputDiv.appendChild(changeUsernameBtn)

      const getUsernameBtn = document.createElement('button')
      getUsernameBtn.classList.add('changeNameBtn')
      const username = this.getUserName()
      if (username) {
        getUsernameBtn.innerText = `Use current username: ${username}`
        this.usernameInputDiv.appendChild(getUsernameBtn)
      }

      changeUsernameBtn.addEventListener('click', () => {
        const enteredUsername = this.usernameInput.value
        if (enteredUsername.trim() !== '') {
          this.setUserName(enteredUsername)
          this.usernameInput.value = ''
          this.parentDiv.removeChild(this.usernameInputDiv)
          // resolve the Promise when username is successfully set.
          resolve()
        }
      })

      this.usernameInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          changeUsernameBtn.click()
        }
      })

      getUsernameBtn.addEventListener('click', () => {
        const username = this.getUserName()
        if (username) {
          // resolve with retrieved username.
          this.parentDiv.removeChild(this.usernameInputDiv)
          resolve(username)
        } else {
          // reject  if username is unavailable.
          reject(new Error('Username not available'))
        }
      })
    })
  }
}
