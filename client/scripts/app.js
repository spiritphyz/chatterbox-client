
  var app = {};

  app.init = function() {
    setInterval(function() {
      app.fetch();
    }, 1000);
  };

  app.send = function(messageObj) {
    var message = messageObj;
    // message.username
    // message.text
    // message.roomname

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
      contentType: 'application/json',
      success: function (data) {
        var messages = data.results;
        displayAll(messages);
      },
      error: function () {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to fetch message');
      }
    });
  };

  var displayAll = function(messages) {
    for (var i = 0; i < messages.length; i++) {
      displayMsg(messages[i]);
    }
  };
    /*
   var results = $.ajax({
    url:'https://api.parse.com/1/classes/chats?order=createdAt',
    type: 'GET',
    success: finished(messages_array)
   }); */

    // var fetch = function(finished) {
    //    var messages_array = [];
    //    var test = $.ajax({url:'https://api.parse.com/1/classes/messages',type:'get'});
    //   $.when(test).then(function() {
    //      var translated = JSON.parse(test.responseText).results;
    //        for (var i=0; i<translated.length; i++) {
    //           messages_array.push(translated[i].text);
    //       } 
    //   });
    //   finished(messages_array);
    //   /*
    //  var results = $.ajax({
    //   url:'https://api.parse.com/1/classes/chats?order=createdAt',
    //   type: 'GET',
    //   success: finished(messages_array)
    //  }); */
    // }
     // console.log('inside $when: ', messageArr);
    // return arr;
    // finished(arr[0]);
   
    // var messageList = JSON.parse(messsages.responseText);
    // var $messageList = $('<div></div>');
    // var curr;
    // for (var i = 0; i < 10; i += 1) {
    //   curr = messageList.results[i];
    //   // add user
    //   $ele = $('<span></span>');
    //   $ele.text(curr.text);
    //   $ele.addClass('chat');
    //   $('#chats').append($ele);

    //   // add user's message
    //   $ele = $('<div></div>');
    //   $ele.text(curr.text);
    //   $ele.addClass('chat');
    //   $('#chats').append($ele);
    // }

  // $('button').on('click', function() {
  //   fetch();
  // });
  var printObj = function(arr) {
    return arr;
  };
  var displayMsg = function(msgObj) {
    console.log(msgObj);
    var $newMessage = $('<li></li>');
    $newMessage.text(msgObj.username + ': ' + msgObj.text);
    $('ul').append($newMessage);
  };

  $('button').on('click', function() {
    var messageObj = {};
    messageObj.text = $('.chatSubmit').val();
    messageObj.username = location.search.split('username=')[1];
    console.log('sent a message!');
    app.send(messageObj);
  });

  $(document).ready(function() {
    app.init();
  });
/*
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
*/