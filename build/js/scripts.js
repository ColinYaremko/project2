//var hello = console.log('hi there Colin.  You really rock!!');

//hello();
$(function () {
  
  $('select').on('change', function () {
      event.preventDefault();

      $('.logoPre').addClass('logoPost'); 
    
       // Loader
      
       $('.hidden').empty();
       $('.loadCircle').show();

      var section = $('#section').val();
      
      //use url with section selection to get results from NYT via Ajax GET
      var url = "https://api.nytimes.com/svc/topstories/v2/"+section+".json?api-key=e0b2aa4bac19467da180df0979f2aa85";
        $.ajax({
          url: url,
          method: 'GET',
        }).done(function(result) {
       
          if (status.num_results === 0) {//if num_results is 0, display message.
          $('.hidden').append('<p class= "error"> Nothing found. No news isn\'t always good news.  Please try again.</p>');
          } 

          else { 
           var nytData = result.results.filter(function (item) {
          if (item.multimedia.length === 0){
            return item}
            return }).slice(0, 12).forEach(function (key, index) {
            console.log(key, index)
            //add new div and populate from chosen 12
            $('.hidden').append('<div><a class= "hiddena" href="' + key.url + '"><div class="all-articles article-' + index + '"><div class="text-' + index + '<a href="' + key.url + '" class="text"> ' + key.abstract + ' </a></div></div></a></div>');
      
            var img = key.multimedia[key.multimedia.length - 1];
            $('.article-' + index).css({'background-image': 'url(' + img.url + ')', 'background-size': 'cover'});
            });
          }  
        }).always(function () {
        $('.loadCircle').hide();
        });
    
  });
});




