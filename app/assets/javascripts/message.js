function messageBuildHTML(message) {

  var image = (message.image !== null) ? `<p class="messages__message__text">
                    <img src=${message.image} alt="image" width="200" height="200">
                    </p>` : ``;

  var messagehtml = `<div class="messages__message">
                  <div class = "messages__message-info">
                  <p class="messages__message-info__talker">
                   ${message.nickname}
                  </p>
                  <p class="messages__message-info__date">
                    ${message.time}
                  </p>
                  </div>
                  <p class="messages__message__text">
                    ${message.body}
                  </p>
                  ${image}
                  </div>
                  `
  return messagehtml;
}

function ScrollDown() {
   $('.messages').delay(30).animate({
     scrollTop: $('.messages__scroll').height()
   }, 600);
 };

$(document).on('turbolinks:load', function() {
  $('.input').on('submit', function(e) {
    e.preventDefault();
    var formData = new FormData ($(this).get(0));
    $.ajax({
      type: 'POST',
      url: './messages',
      data: formData,
      processData: false,
      contentType: false,
      dataType: 'json'
    })
    .done(function(data) {
      ScrollDown()
      $('.input')[0].reset();
      var html = messageBuildHTML(data);
      $('.messages__scroll').append(html);
    })
    .fail(function() {
      alert('error');
    });
    return false;
  });
});
