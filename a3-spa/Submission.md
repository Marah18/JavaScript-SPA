
### F1:
I created Memory Game, to use it as an application to drag and move it. And for making the application focused I used a z-index, so the clicked applications bar should be the focused application with highest z-index. I added a close button, and when clicking on it everything related to the application will be removed from DOM. And to open a new application you choose from the options available on the bottom bar, and each time you open a new one, a new div is created for it inside main.js, with specific left and top changes each time a new application is created. 

### F2:
I began working on the assignment but I was late with handling it, so I left it for a period, which needed me to study my code again and check what it needed.  I commented in the first with the missing comments for things I saw were not important or easy to understand at that time, so I added them later. I think I focused and invested a lot in designing because I found it attractive to learn and explore.

### F3:
I began by researching how memory games functioned, breaking down the concepts into smaller levels. And I made it extended a parent class called "App.js", so this parent class has the same features for all apps, MemoryGame, Chat, and Quiz. My memory game gives the user the ability to choose different board sizes 2x2, 4x2, or 4x4. The user can end the game anytime wanted and choose another one if wanted. In game shows the timer for the game and the number of attempts the user made. I improved it, so the users can navigate using keyboard arrows, which I found was challenging.  

### F4:
For my Chat app, I created a user class, so the user can provide the username by storing it in the browser's sessionStorage. And next time the user opens the chat he can keep the same user name or change it.  Chat app listens to specific channels. After creating a WebSocket server, the user can get and send messages without needing to refresh the page.  In addition to that it has a history of old messages for each channel, saved in messageHistory array.

### F5:
My additional window application is `Quiz` class, that also extends APP. It gives several questions with multiple-choice answers that the user can choose between by clicking on them. The quiz has a variety of questions, some of which include images. After selecting an answer, the application indicates whether the choice was correct or incorrect by visually highlighting the button red if wrong and green if right. When all questions are answered the percentual score gonna be shown over an image with shadow. And after it finishes the user can restart it.

### F6:
I added to Chat app:
*   the ability to select different channels for communication so the user can use multiple conversations simultaneously.

* caching message history so the user can access previous messages even after refreshing the page. The messages (History Array) are stored locally and retrieved when needed.

* support for emojis added to conversations, so the user can choose from emojis that are shown.  

* the ability to change usernames, and even to open different chat widows with different usernames simultaneously.

* the ability to use an encryption channel to exchange messages securely, by using Caesar encryption algorithm, it finds first the index of the current letter in the message depending on an array I use called lettersArray, and then I shift its index 5 stegs before sending, and then when received it shifted back 5 stegs. It is a simple way to encrypt.

* the ability to see the time for sent and retrieved messages.

### F7:
Desktop:
* The ability to change the desktop background by adding a dropdown with 4 options for changing.

* The ability to see the current time, that changes without needing to refresh.

Memory game:
* Added a timer to track the time taken by the player to complete the memory game.
* Showing the number of attempts of the cards in the game.

App:
* I added functionality to maximize and normalize window size by adding a minimize button to the window. In the app class, I added toggleMinimize() method to toggle the minimized state of the window, creating an icon depending on the app type -with a smaller size than basic apps- in the footer when minimized and restoring the window with its status when clicked. And using z-index of the window is updated to ensure it appears above other windows when clicked, and it also gets focused using .focus, which was little hard for me.


## F8:
The Desktop class manages the overall desktop environment, while the App class handles apps' windows' functionality and design.
app.js: 
    - Parent class for creating all application windows, that inherit it.
    - Added methods for making the application window draggable, and can be opened, closed, focused, and minimized. 
 -  It has a title bar for the application window that will include and display the app name.
Desktop.js class:
- works as a virtual desktop, and allows the users to change the background image, display the current time and date and can open other applications from its footer. The current time is updated every 6 seconds

In main initializes a desktop environment (DOMContentLoaded) and sets up event listeners for opening apps memory game, chat, and quiz.  The createAppContainer is the method responsible for creating a container for the app's window. It dynamically calculates the position of the container to prevent overlapping with existing windows on the desktop, so using counter and counterTop variables controls the positioning of the containers.

