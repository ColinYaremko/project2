//var hello = console.log('hi there Colin.  You really rock!!');

//hello();




$('#get-news').on('click', function (e) {
  
  e.preventDefault();
  
  var section = sections;

  $.ajax({
    method: 'GET',
    url: 'http://api.nytimes.com/svc/topstories/v2/technologyjson?api-key=e0b2aa4bac19467da180df0979f2aa85'
  })
  .done(function(data){
    
    var iconUrl = 'http://openweathermap.org/img/w/',
        icon = data.weather[0].icon,
        iconFullUrl = iconUrl + icon + '.png';
        output = '';
   
    output += '<h1>' + data.weather[0].main + '</h1>';
    output += '<img src="' + iconFullUrl + '">';
    
    $('.results').empty().css('display','none');
    $('.results').append(output);
    
    $('.results').fadeIn();
    
    
  })
  .fail(function(){
    alert('sorry something terrible happened');
  });
  
  
  
});

//http://api.nytimes.com/svc/topstories/v2/{section}.{response-format}?//api-key=e0b2aa4bac19467da180df0979f2aa85

//'http://api.nytimes.com/svc/topstories/v2/'+ section + 'json?//api-key=e0b2aa4bac19467da180df0979f2aa85'