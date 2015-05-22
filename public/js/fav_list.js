var toHTML = function(starred) {
  if (starred == null) {
    return '<ul> <li style="text-align: center"> <h2>Empty :(</h2> </li> </ul>';
  }
  var res = '<ul>';
  starred.forEach(function(item) {
    res += '<li style="background-image:url(' + item.image + ')">';
    res += '<div class = "list_title"> <h2>' + item.name + '</h2> </div>';
    res += '</li>';
  });

  res += '</ul>';

  return res;
};


window.onload = function() { 

  var starred = JSON.parse(localStorage.getItem('starred'));

  $('.coupon_list').append(toHTML(starred));

  $('.ctrl_shake').on('click', function() {
    window.location = "index.html";
  })
};

