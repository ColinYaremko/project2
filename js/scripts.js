//var hello = console.log('hi there Colin.  You really rock!!');

//hello();
$(function () {
  
  $('select').on('change', function () {
      event.preventDefault();

      

       // Loader
       //$('.hidden').hide();
       $('.hidden').empty();
       $('.loadCircle').show();

     var section = $('#section').val();
     //var section = 'movies'
     var storyresult = '';
       var url = "https://api.nytimes.com/svc/topstories/v2/"+section+".json?api-key=e0b2aa4bac19467da180df0979f2aa85";
       $.ajax({
         url: url,
         method: 'GET',
       }).done(function(result) {
       
       if (status.num_results === 0) {  //if num_results is 0, display message.
        $('.hidden').append('<p>Nothing found. No news isn\'t always good news.</p> <p>Please try again.</p>');
       }

    else { 
  var nytData = result.results.filter(function (item) {
      if (item.multimedia.length !== 0){
        return item
      }
      return 
     
  }).slice(0, 12).forEach(function (key, index) { console.log(key, index)
      $('.hidden').append('<a href="' + key.url + '"> <div class="all-articles article-' + index + '"><div class="text-' + index + '" style="display:flex;"><a href="' + key.url + '" class="text"> ' + key.abstract + ' </a></div></div></a>');
      
      var img = key.multimedia[key.multimedia.length - 1];
      $('.article-' + index).css('background-image', 'url(' + img.url + ')');

      //$('.text-' + index).hide();
      //$('.article-' + index).hover(function () {
          //$('.text-' + index).slideToggle('slow', function () {});
      });
  //});
}
}).always(function () {
$('.loadCircle').hide();

    });
    
  });
});








 /* if (data.results.length === 0) {
    $('.hidden').append('<p>Sorry, nothing found. Please try another section.</p>');
}).fail(function(err) {
  throw err;
});    */


/* 

 $(".box").on(change, function() { 
    $(this).toggleClass("hidden");
 });   Going to need the toggle for hiding and opening the results on the grids.



$('#get-news').on('click', function (e) {
  
  e.preventDefault();
  
  var section = sections;

  $.ajax({
    method: 'GET',
    url: 'http://api.nytimes.com/svc/topstories/v2/technology.json?api-key=e0b2aa4bac19467da180df0979f2aa85'
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
  
  
  
});*/




