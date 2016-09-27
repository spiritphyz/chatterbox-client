
  var app = {};

  app.counter = 2;
  app.objectId;
  app.friends = [];

  app.init = function() {
    setInterval(function() {
      app.fetch();
    }, 1000);
  };

  app.send = function(message) {

    console.log('message send is: ', message);
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

  app.server = 'https://api.parse.com/1/classes/messages?order=updatedAt';
  app.fetch = function() {
    // console.log('triggered a fetch');
    $.ajax({
      url: 'https://api.parse.com/1/classes/messages?order=updatedAt',
      type: 'get',
      // data: JSON.stringify(message),
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        var messages = data.results;
        if (messages[0].objectId !== app.objectId) {
          app.objectId = messages[0].objectId;
          displayAll(messages);
        }
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message');
      }
    });
  };

  app.clearMessages = function() {
    var $container = $('#chats');
    $container.empty();
  };

  var displayAll = function(messages) {
    for (var i = messages.length - 1; i >= 0; i--) {
      app.renderMessage(messages[i]);
    }
  };

  app.renderRoom = function(roomName) {
    $('#roomSelect').append($('<option>', {
      value: app.counter,
      text: roomName
    }));
    app.counter++;
  };


  app.addRoom = function() {
    $('.newRoom').show();
  };

  app.renderMessage = function(msgObj) {
    var $newMessage = $('<li></li>');
    var $username = $('<a></a>');
    $username.attr({
      'href': '#',
      'class': 'username',
      'user': msgObj.username
    });
    $username.text(msgObj.username);
    $newMessage.text(': ' + msgObj.text);
    $newMessage.prepend($username);
    $('#chats').prepend($newMessage);
  };

  $('#roomSelect').on('change', function() {
    if (this.value === '1') {
      app.addRoom();
    }
  });


  $('#chats').on('click', '.username', function() {
    var friend = $(this).attr('user');
    var $newFriend = $('a[user=' + '"' + friend + '"' + ']');
    $newFriend.each(function() {
      if (!app.friends.includes(friend)) {
        $(this).text('💝 ' + $(this).text());
        console.log('yay!');
      }
    });
    app.friends.push(friend);
  });




  $('.newMessageButton').on('click', function() {
    var messageObj = {};
    messageObj.text = $('.chatSubmit').val();
    messageObj.username = location.search.split('username=')[1];
    messageObj.roomname = $('#roomSelect option:selected').text();
    console.log('sent a message!');
    app.send(messageObj);
    $('.chatSubmit').val('');
  });


  $('.clearButton').on('click', function() {
    app.clearMessages();
  });

  $('.addRoom').on('click', function() {
    var newRoom = $('.newRoomName').val();
    app.renderRoom(newRoom);
    $('.newRoom').hide();
  });



  $(document).ready(function() {
    app.init();
  });
