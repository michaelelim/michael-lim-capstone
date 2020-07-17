$(function() {
  const FADE_TIME = 150; // ms
  const TYPING_TIMER_LENGTH = 400; // ms
  const COLORS = ['#e21400', '#91580f', '#f8a700', '#f78b00', '#58dc00', '#287b00', '#a8f07a', '#4ae8c4', '#3b88eb', '#3824aa', '#a700ff', '#d300e7'];

  // Initialize variables
  var $window = $(window);
  var $usernameInput = $('.usernameInput'); // Input for username
  var $messages = $('.messages'); // Messages area
  var $inputMessage = $('.inputMessage'); // Input message input box
  
  var $loginPage = $('.login.page'); // The login page
  var $chatPage = $('.chat.page'); // The chatroom page
  var $gamePage = $('.game-page'); // NEW - game page

  // Prompt for setting a username
  let username;
  var connected = false;
  var typing = false;
  var lastTypingTime;
  var $currentInput = $usernameInput.focus();

  var socket = io();

  const addParticipantsMessage = (data) => {
    var message = '';
    if (data.numUsers === 1) { message += "There's 1 participant" } 
    else { message += "there are " + data.numUsers + " participants" }
    log(message);
  }

  // Sets the client's username
  const setUsername = () => {
    username = cleanInput($usernameInput.val().trim());

    // If the username is valid
    if (username) {
      $loginPage.fadeOut();  // fade out login
      $chatPage.show(); // show chat
      $loginPage.off('click');
      $currentInput = $inputMessage.focus();

      socket.emit('add user', username); // Tell the server your username
    }
  }

  // Sends a chat message
  const sendMessage = () => {
    var message = $inputMessage.val();
    message = cleanInput(message); // Prevent markup from being injected into the message
    if (message && connected) { // if there is a non-empty message and a socket connection
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message
      });
      socket.emit('new message', message); // tell server to execute 'new message' and send along one parameter
    }
  }

  // Log a message
    const log = (message, options) => {
    var $el = $('<li>').addClass('log').text(message);
    addMessageElement($el, options);
  }

  // Adds the visual chat message to the message list
  const addChatMessage = (data, options) => {
    // Don't fade the message in if there is an 'X was typing'
    var $typingMessages = getTypingMessages(data);
    options = options || {};
    if ($typingMessages.length !== 0) {
      options.fade = false;
      $typingMessages.remove();
    }

    var $usernameDiv = $('<span class="username"/>')
      .text(data.username)
      .css('color', getUsernameColor(data.username));
    var $messageBodyDiv = $('<span class="messageBody">')
      .text(data.message);

    var typingClass = data.typing ? 'typing' : '';
    var $messageDiv = $('<li class="message"/>')
      .data('username', data.username)
      .addClass(typingClass)
      .append($usernameDiv, $messageBodyDiv);

    addMessageElement($messageDiv, options);
  }

  // Adds the visual chat typing message
  const addChatTyping = (data) => {
    data.typing = true;
    data.message = 'is typing';
    addChatMessage(data);
  }

  // Removes the visual chat typing message
  const removeChatTyping = (data) => {
    getTypingMessages(data).fadeOut(function () {
      $(this).remove();
    });
  }

  // Adds a message element to the messages and scrolls to the bottom
  // el - The element to add as a message
  // options.fade - If the element should fade-in (default = true)
  // options.prepend - If the element should prepend
  //   all other messages (default = false)
  const addMessageElement = (el, options) => {
    var $el = $(el);

    // Setup default options
    if (!options) { options = {} }
    if (typeof options.fade === 'undefined') { options.fade = true }
    if (typeof options.prepend === 'undefined') { options.prepend = false }

    // Apply options
    if (options.fade) { $el.hide().fadeIn(FADE_TIME) }
    if (options.prepend) { $messages.prepend($el) } 
    else { $messages.append($el) }
    $messages[0].scrollTop = $messages[0].scrollHeight;
  }

  const cleanInput = (input) => { return $('<div/>').text(input).html() } // Prevents input from having injected markup

  // Updates the typing event
  const updateTyping = () => {
    if (connected) {
      if (!typing) {
        typing = true;
        socket.emit('typing');
      }
      lastTypingTime = (new Date()).getTime();

      setTimeout(() => {
        var typingTimer = (new Date()).getTime();
        var timeDiff = typingTimer - lastTypingTime;
        if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
          socket.emit('stop typing');
          typing = false;
        }
      }, TYPING_TIMER_LENGTH);
    }
  }

  // Gets the 'X is typing' messages of a user
  const getTypingMessages = (data) => {
    return $('.typing.message').filter(function (i) {
      return $(this).data('username') === data.username;
    });
  }

  // Gets the color of a username through our hash function
  const getUsernameColor = (username) => {
    // Compute hash code
    var hash = 7;
    for (var i = 0; i < username.length; i++) { hash = username.charCodeAt(i) + (hash << 5) - hash }
    // Calculate color
    var index = Math.abs(hash % COLORS.length);
    return COLORS[index];
  }

  // Keyboard events

  $window.keydown(event => {
    if (!(event.ctrlKey || event.metaKey || event.altKey)) {     // Auto-focus the current input when a key is typed
      $currentInput.focus();
    }
    if (event.which === 13) { // When the client hits ENTER on their keyboard
      if (username) {
        sendMessage();
        socket.emit('stop typing');
        typing = false;
      } else {
        setUsername();
      }
    }
  });

  $inputMessage.on('input', () => { updateTyping() });

  //== Click events ==

  $loginPage.click(() => { $currentInput.focus() }); // Focus input when clicking anywhere on login page
  $inputMessage.click(() => { $inputMessage.focus() }); // Focus input when clicking on the message input's border

  //== Socket events ==
  
  socket.on('login', (data) => { // Whenever the server emits 'login', log the login message
    connected = true;
    const message = "Welcome to You Don't Know Diddly Squat Chat!"; // Display the welcome message
    log(message, { prepend: true });
    addParticipantsMessage(data);
  });
  socket.on('new message', (data) => { addChatMessage(data) }); // Whenever the server emits 'new message', update the chat body
  socket.on('User joined', (data) => { // Whenever the server emits 'user joined', log it in the chat body
    log(data.username + ' joined');
    addParticipantsMessage(data);
  });
  socket.on('user left', (data) => { // Whenever the server emits 'user left', log it in the chat body
    log(data.username + ' left');
    addParticipantsMessage(data);
    removeChatTyping(data);
  });
  socket.on('typing', (data) => { addChatTyping(data) }); // Whenever the server emits 'typing', show the typing message
  socket.on('stop typing', (data) => { removeChatTyping(data) }); // Whenever the server emits 'stop typing', kill the typing message
  socket.on('disconnect', () => { log('You have been disconnected') });
  socket.on('reconnect', () => {
    log('You have been reconnected');
    if (username) { socket.emit('add user', username) }
  });
  socket.on('reconnect_error', () => { log('attempt to reconnect has failed') });

});