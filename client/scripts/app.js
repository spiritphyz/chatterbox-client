var app = {};

app.init = function() {

};

app.send = function(messageObj) {
  var message = messageObj;
  console.log('message is: ', message);
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

var fetch = function() {
  console.log('triggered a fetch');
  var messages = $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    // data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message fetched');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message', data);
    }
  });
  var messageList = JSON.parse(messsages.responseText);
  var $messageList =$('<div></div>');
  var curr;
  for (var i = 0; i < 10; i += 1) {
    curr = messageList.results[i];
    // add user
    $ele = $('<span></span>');
    $ele.text(curr.text);
    $ele.addClass('chat');
    $('#chats').append($ele);

    // add user's message
    $ele = $('<div></div>');
    $ele.text(curr.text);
    $ele.addClass('chat');
    $('#chats').append($ele);
  }
  // return messages;
};

$('button').on('click', function() {
  fetch();
});

// $(document).ready(function() {
  var app = {};
  app.init = function() {
  };

  app.send = function() {
    var message = $('input').val();
    console.log('message is: ', message);
    $('submit').on('click', function(e) {
      e.preventDefault();
      console.log('input value is: ', message);
      $.ajax({
        // This is the url you should use to communicate with the parse API server.
        url: 'https://api.parse.com/1/classes/messages',
        type: 'POST',
        data: JSON.stringify(message),
        contentType: 'application/json',
        success: function (data) {
          console.log('chatterbox: Message sent');
        },
        error: function (data) {
          // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
          console.error('chatterbox: Failed to send message', data);
        }
      });
    });
  };
// });
