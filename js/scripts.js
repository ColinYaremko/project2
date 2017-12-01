$(() => {
  'use strict';

  $('select').on('change', function () {
    event.preventDefault();

    $('.logoPre').addClass('logoPost');

    // Loader

    $('.hidden').empty();
    $('.loadCircle').show();

    let section = $('#section').val(); //Get value from html selection

    //use url with section selection to get results from NYT via Ajax GET
    let url = "https://api.nytimes.com/svc/topstories/v2/" + section + ".json?api-key=e0b2aa4bac19467da180df0979f2aa85";
    $.ajax({
        url: url,
        method: 'GET',
      })
      .done((result) => { //removed function to es6

        if (status.num_results === 0) { //if num_results is 0, display message.
          $('.hidden').append('<p class= "error"> Nothing found. No news isn\'t always good news.  Please try again.</p>');
        } else {

          let nytData = result.results.filter((item) => { //filter for pic *removed function

              if (item.multimedia.length !== 0) {

                return item.multimedia.length;
              }

            })
            .slice(0, 12).forEach((key, index) => { //slice past 12 *removed function
              console.log(key, index) //shows only 12 stories
              //add new div and populate from chosen 12
              $('#hidden').append('<a class="hiddena all-articles article-' + index + '" href="' + key.url + '"><div ><div class="jump text-' + index + '<div class="text"> ' + key.abstract + ' </div></div></div></a>');

              let img = key.multimedia[key.multimedia.length - 1];


              $('.article-' + index).css({
                'background-image': 'url(' + img.url + ')',
                'background-size': 'cover'
              });
            });

        }

      })
      .always(() => { //removed function
        $('.loadCircle').hide();
      });
  });
});