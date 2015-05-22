var start, jumpToDecode, lastTime, lastAcc, isStarted = false;
var id = -1;
var myShakeEvent = new Shake({
  threshold: 15
});

start = function() {
  myShakeEvent.stop(); 
  $('.loading').show();
  $('.sprite').hide(); 
  $('.ctrl_fav').hide();

  $.get('/jump', function(item) {
    id = item._id; 
  });

  // $.getJSON('data/data.json', function(data) {

  //   // Make sure the coupon has not shown before
  //   var js_starred = JSON.parse(localStorage.getItem('starred'));
  //   var js_deleted = JSON.parse(localStorage.getItem('deleted'));

  //   while (id = Math.floor(Math.random() * (data.length))) {
  //     console.log('id: ', id);
  //     if (!findObj(data[id], js_starred) && !findObj(data[id], js_deleted)) {
  //       break;
  //     }
  //   }
  // });

  setTimeout(jumpToDecode, 2000);
};

jumpToDecode = function() {
  window.location = "result.html?id=" + id;
};

function findObj(item, js) {
  if (js == null) return false;
  for(var i = 0; i < js.length; ++i) {
      if(item.name == js[i].name) {
        return true;
      }
  }
  return false;
}

window.onload = function() { 
  $('.loading').hide();
  myShakeEvent.start();
  window.addEventListener('shake', start, false);
  $('.sprite').on('click', start);

};
