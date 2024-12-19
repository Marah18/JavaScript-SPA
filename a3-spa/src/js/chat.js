import App from './app.js'
import User from './user.js'

/**
 * Class for the chat application window.
 */
export default class Chat extends App {
  constructor (parentDiv, appName) {
  /**
   * Create an instance of Chat.
   * @param {HTMLElement} parentDiv - The parent div.
   */
    super(parentDiv, 'Chat')

    super.dragApp(this.parentDiv)
    this.websocket = new WebSocket('wss://courselab.lnu.se/message-app/socket')
    this.channel = 'Channel1'
    this.messagesNumber = 0

    this.chatDiv = document.createElement('div')
    this.chatDiv.classList.add('chat-container')
    this.parentDiv.appendChild(this.chatDiv)
    this.user = new User(this.chatDiv)

    this.messageHistory = {}
    this.startChat()
  }

  /**
   * Starts the chat app.
   */
  async startChat () {
    await (this.user.enterUserName())
    this.userName = this.user.getUserName()
    this.createHTMLStructure()
    this.websocketHandlar()
  }

  /**
   * create html elements for the chat application.
   */
  createHTMLStructure () {
    this.channelSelectDiv = document.createElement('div')
    this.channelSelectDiv.className = 'changeSelectedDiv'

    const channelLabel = document.createElement('label')
    channelLabel.innerText = 'Current Channel: '

    this.channelSelect = document.createElement('select')
    this.channelSelect.className = ('selectChannel')

    const channels = ['Channel1', 'Marah', 'LNU', 'Class', 'Encrypted channel']
    channels.forEach(channel => {
      const option = document.createElement('option')
      option.value = channel
      option.text = channel
      this.channelSelect.appendChild(option)
    })

    this.channelSelectDiv.appendChild(channelLabel)
    this.channelSelectDiv.appendChild(this.channelSelect)
    this.chatDiv.appendChild(this.channelSelectDiv)

    //  listener to change channel
    this.channelSelect.addEventListener('change', () => {
      const newChannel = this.channelSelect.value
      if (newChannel !== this.channel) {
        this.changeChannel(newChannel)
      }
    })

    this.chats = document.createElement('div')
    this.chats.className = 'chat-container2'
    this.chatDiv.appendChild(this.chats)

    const messageInputDiv = document.createElement('div')
    messageInputDiv.className = ('messageInputDiv')
    this.chatDiv.appendChild(messageInputDiv)

    this.allEmojisDiv = document.createElement('div')
    this.allEmojisDiv.className = 'allEmojisDiv'

    const emojiCodes = [
      '&#128512;', '&#128516;', '&#128525;', '&#128151;',
      '&#128511;', '&#128512;', '&#128513;', '&#128514;',
      '&#128515;', '&#128516;', '&#128517;'
    ]

    messageInputDiv.appendChild(this.allEmojisDiv)

    this.inputMessage = document.createElement('textarea')
    this.inputMessage.className = ('message-input')
    this.inputMessage.placeholder = 'Enter your message'
    messageInputDiv.appendChild(this.inputMessage)

    this.sendBtn = document.createElement('button')
    this.sendBtn.classList.add('sendButton')
    this.sendBtn.innerText = 'Send'
    messageInputDiv.appendChild(this.sendBtn)

    this.sendBtn.addEventListener('click', () => {
      if (this.inputMessage.value.length > 0) {
        this.sendMessage(this.inputMessage.value)
      }
      this.inputMessage.value = ''
    })

    this.inputMessage.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.sendBtn.click()
      }
    })

    emojiCodes.forEach(emojiCode => {
      const emojiButton = document.createElement('button')
      emojiButton.innerHTML = emojiCode
      emojiButton.addEventListener('click', () => {
        this.insertEmojiToMess(emojiButton.innerHTML)
      })
      this.allEmojisDiv.appendChild(emojiButton)
    })
  }

  /**
   * Inserts emoji into the message input.
   * @param {string} emojiCode - The HTML code of the emoji.
   */
  insertEmojiToMess (emojiCode) {
    this.inputMessage.value += emojiCode
  }

  /**
   * change username.
   * @param {string} newUsername - the new username
   */
  changeUsername (newUsername) {
    this.userName = newUsername
  }

  /**
   * change channel.
   * @param {string} newChannel - the new channel.
   */
  changeChannel (newChannel) {
    this.channel = newChannel
    console.log(`Channel changed to: ${newChannel}`)
    this.chats.innerHTML = ''
    this.displayCachedMessages(this.channel)
  }

  /**
   * Handles WebSocket events.
   */
  websocketHandlar () {
    this.websocket.onopen = () => {
      console.log('Server is open')
      this.serverMessageHandlar('Server is open')
    }

    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error.message)
    }

    this.websocket.onclose = () => {
      console.log('The websocket is closed.')
      console.log(this.websocket)
      this.serverMessageHandlar('The websocket is closed.')
    }

    this.websocket.onmessage = (event) => {
      const data = JSON.parse(event.data)
      if (data.type === 'heartbeat') {
        console.log(' Ignoring.\n The web socket server sent a "heartbeat" message to keep the connection open.')
        return
      }
      if (data.channel === this.channel) {
        this.messageHandlar(data)
      }
    }
  }

  /**
   * Sends a message via WebSocket.
   * @param {string} message - The message to send.
   */
  sendMessage (message) {
    console.log(`Message before cryption is ${message}`)

    if (this.channel === 'Encrypted channel') {
      message = this.encryptionHandlar(message, true)
      console.log(`Message after cryption is ${message}`)
    }

    if (!this.websocket || this.websocket.readyState === 3) {
      console.log('The websocket is not connected to the server.')
    } else {
      console.log('WebSocket connection state:', this.websocket.readyState)
      this.websocket.send(JSON.stringify({
        type: 'message',
        data: message,
        username: this.userName,
        channel: this.channel,
        key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
      }))
    }
  }

  /**
   * Handels a message via WebSocket.
   * @param {string} message - The message to handle.
   */
  serverMessageHandlar (message) {
    const now = new Date()
    const timestamp = now.toLocaleTimeString()
    this.chats.innerHTML += ` ${message} ${timestamp} <br>`
    this.chats.scrollTop = this.chats.scrollHeight
  }

  /**
   * Creates a message element.
   * @param {object} data - The message data.
   * @returns {HTMLElement|null} The created message element.
   */
  createMessageElement (data) {
    const now = new Date()
    const timestamp = now.toLocaleTimeString()
    if (data.data === '') {
      console.log('EMPTY Message')
      return null
    }
    const message = document.createElement('p')

    if (data.channel === 'Encrypted channel') {
      message.innerHTML =
                ` <div class="messagestamp"> <strong> ${data.username}
            </strong>: <br> ${this.encryptionHandlar(data.data, false)} <span class="timestamp">${timestamp}</span> </div>`
    } else {
      message.innerHTML =
                ` <div class="messagestamp"> <strong> ${data.username} 
        </strong>: <br> ${data.data}  <span class="timestamp"> ${timestamp}</span> </div>`
    }
    this.messagesNumber += 1
    this.saveToMessageHistory(this.channel, message)
    return message
  }

  /**
   * Save to the history array.
   * @param {string} channel - The channel.
   * @param {HTMLElement} message - The message element.
   */
  saveToMessageHistory (channel, message) {
    // create for the channel if not created before
    if (!this.messageHistory[channel]) {
      this.messageHistory[channel] = []
    }

    // add to the specific channel
    this.messageHistory[channel].push(message)

    if (this.messageHistory[channel].length > 25) {
      const removedMessage = this.messageHistory[channel].shift()
      this.chats.removeChild(removedMessage)
      this.messagesNumber -= 1
    }
  }

  /**
   * Handles incoming messages.
   * @param {object} data - The incoming message data.
   */
  messageHandlar (data) {
    const message = this.createMessageElement(data)
    this.chats.appendChild(message)
    this.displayCachedMessages(this.channel)
  }

  /**
   * Displays cached messages for a special channel.
   * @param {string} channel - The channel to get cached messages from.
   */
  displayCachedMessages (channel) {
    const channelMessages = this.messageHistory[channel] || []
    channelMessages.forEach((cachedMessage) => {
      console.log(cachedMessage)
      this.chats.appendChild(cachedMessage)
    })
    this.chats.scrollTop = this.chats.scrollHeight
  }

  /**
   * Create like Caesar Cipher for encryption
   * @param {string} message - The message to encrypt or decrypt.
   * @param {boolean} toProtect - status of the message.
   * @returns {string} The message.
   */
  encryptionHandlar (message, toProtect) {
    const encryptionMessage = []
    const lettersArray = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ÅÄÖåäö'
    if (toProtect) {
      for (const letter of message) {
        const encryptedLetter = lettersArray[(lettersArray.indexOf(letter) + 5) % lettersArray.length]
        encryptionMessage.push(encryptedLetter)
      }
    } else {
      for (const letter of message) {
        const decryptedLetter = lettersArray[(lettersArray.indexOf(letter) - 5) % lettersArray.length]
        encryptionMessage.push(decryptedLetter)
      }
    }
    return encryptionMessage.join('')
  }
}
