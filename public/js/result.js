var id = -1;
var curCoupon;

var fav = function() {
  $.post('/items/' + curCoupon._id + '/fav', function(result) {
  	console.log(result)
    // callback
  });
};

var localFav = function () {
  var starred = JSON.parse(localStorage.getItem('starred'));

    if (starred != null) {
      starred.push(curCoupon);
      localStorage.setItem('starred', JSON.stringify(starred));
    } else {
      localStorage.setItem('starred', JSON.stringify([curCoupon]));
    }
}

var unfav = function() {
  $.post('/items/' + curCoupon._id + '/unfav', function(result) {
    console.log(result)
    // callback
  });
};

var localUnfav = function() {
    var starred = JSON.parse(localStorage.getItem('starred'));

    if (starred != null) {
      $.each(starred, function(i, v) {
            if (v.name == curCoupon.name) {
                starred.splice(i, 1);
                return;
            }
        });
      localStorage.setItem('starred', JSON.stringify(starred));
    } else {
      console.log('unstarred error');
    }
}

var del = function() {
  $.post('/items/' + curCoupon._id + '/del', function(result) {
    console.log(result)
    // callback
  });
};

var showStarred = function() {
    $('.img_star').hide();
    $('.img_starred').show();
}

var hideStarred = function() {
  $('.img_starred').hide();
  $('.img_star').show();
}

window.onload = function() { 
  curCoupon = '';

  hideStarred();

  getIdeas();

  $('.img_star').on('click', function() {
  	fav();
    localFav();

    showStarred();

  });

  $('.img_starred').on('click', function() { 
    unfav();
    localUnfav();

    hideStarred();

  });

  $('.ctrl_share').on('click', function() {
    $('.share').show();
    $('.share').animate({
        opacity:1
      }, 'fast');

  });

  $('.share_cancel').on('click', function() {
    $('.share').animate({
        opacity:0
      }, 'fast');
    $('.share').hide();

  });


  $('.ctrl_del').on('click', function() {
    del();

    window.location = "/";
  })


  $('.ctrl_fav').on('click', function() {
    window.location = "fav_list.html";
  })
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

function getIdeas() {
	id = getQueryString('id');
  $.get('/items/' + id, function(item) {
    var isStarred = JSON.parse(localStorage.getItem('starred'));

    if (findObj(item, isStarred)) {
      showStarred();
    }
    
    $('.tray').append('<h3>' + item.name + '</h3>');
    $('.tray').append('<h4>' + item.description+ '</h4>');
    $('.tray').append('<h4><a href=\"' + item.url + '\" target=\"_blank\">查看来源</a></h4>');

    $('.i_tray').append('<img src=\"' + item.image + '\"/>');

    curCoupon = item;
  });
}

function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
}