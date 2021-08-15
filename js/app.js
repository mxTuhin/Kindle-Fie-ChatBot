var userName;
var counter =0;
var indexNum;
var userEmail;

var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});


function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
    $('<div class="checkmark-sent-delivered">&check;</div>').appendTo($('.message:last'));
    $('<div class="checkmark-read">&check;</div>').appendTo($('.message:last'));
  }
}

function insertMessage(msg) {
  if(counter==0){
    tempMsg = msg;
    userName=tempMsg.toLowerCase().replace('my name is', '').replace('i am','').replace('my name','').replace('my self').trim();
    userName=userName[0].toUpperCase()+userName.slice(1);
    console.log(userName);
    
  }  
  else if(counter==2){
    indexNum=msg;
  }
  else if(counter==3){
    userEmail=msg;
  }
  counter++;


  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100 + (Math.random() * 2) * 100);
}

$('.message-submit').click(function() {
  msg = $('.message-input').val();
  insertMessage(msg);
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    msg = $('.message-input').val();
    insertMessage(msg);
    return false;
  }
})

var books=[
  'BookNameMeow | IndexNo: <b>1</b>',
  'BookNameRandom | IndexNo: <b>2</b>',
  'BookNameHalum | IndexNo: <b>3</b>',
]



function fakeMessage() {
  var Fake = [
    'Hey ! <br>I Am KindleBot. Your chat Assistant.<br><br><b>Tell Me Your Name</b>',
    'Hellow <b>'+userName+'</b><br>I am happy to see you here.<br><br><b>Do you have any book names in your mind?</b>',

    
  ]
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="images/dp.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    if(counter<=1){
      $('<div class="message new"><figure class="avatar"><img src="images/dp.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    }
    else if(counter==2){
      for(i=0; i<books.length; ++i){
        $('<div class="message new"><figure class="avatar"><img src="images/dp.jpg" /></figure>' + books[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
      }
      $('<div class="message new"><figure class="avatar"><img src="images/dp.jpg" /></figure>' + "Here's Some Suggestions from the List !<br><br><b>Please Enter the Book Index from the List</b>" + '</div>').appendTo($('.mCSB_container')).addClass('new');      
    }
    else if(counter==3){
      $('<div class="message new"><figure class="avatar"><img src="images/dp.jpg" /></figure>' + "You Have Selected "+books[indexNum-1]+"<br><br><b>Please Type in your email address below to confirm order</b>" + '</div>').appendTo($('.mCSB_container')).addClass('new');      
    }else if(counter==4){
      $('<div class="message new"><figure class="avatar"><img src="images/dp.jpg" /></figure>' + "Your Order has been Confirmed and ebook has been sent to your email address <b>"+userEmail+"</b>. Please Check Email.<br>Thanks for shopping with us.<br><br><b>You may write us any feedback now if you want</b>" + '</div>').appendTo($('.mCSB_container')).addClass('new');      
    }else{
      $('<div class="message new"><figure class="avatar"><img src="images/dp.jpg" /></figure>' + "Your Feedback has been received. Thanks Again !" + '</div>').appendTo($('.mCSB_container')).addClass('new');
      document.getElementById("chat-input-box").style.display="none";
    }
    
    setDate();
    updateScrollbar();
    i++;
  }, 100 + (Math.random() * 20) * 100);

}

$('.button').click(function(){
  $('.menu .items span').toggleClass('active');
   $('.menu .button').toggleClass('active');
});

function hideChatBox(){
  document.getElementById("chat-box").style.display="none";
  document.getElementById("box-opener").style.display="block";
}

function showChatBox(){
  document.getElementById("chat-box").style.display="block";
  document.getElementById("box-opener").style.display="none";
  updateScrollbar();
}
