$(document).ready(function(){

    //   startscreen animations
    $('#srchBut').click(function(){
        $('#srchBut').remove();

        $('h1').remove();
            $('#getRqst').css('display', 'inline')
                         .animate({top: '45px',
                                   width: '75px',
                                   height: '75px',
                                   letterSpacing: '15px',
                                   fontSize: '1.39em',
                                   paddingLeft: '15px'
                                  }, '1500');

            $('#rndmBut').animate({top: '45px',
                           width: '75px',
                           height: '75px',
                           letterSpacing: '15px',
                           fontSize: '1.39em',
                           paddingLeft: '15px'
                          }, '1500');

            $('#rqst').css('display', 'inline')
                      .animate({top: '24px',
                                height: '75px',
                                fontSize: '2.518em',
                                width: '300px'}, '1500');
    });

  $('#getRqst').click(function(){
    var q = $('#rqst').val();

    $.ajax({
      // The URL for the request
      url: "https://en.wikipedia.org/w/api.php?gsrsearch=" + q + "&exintro&explaintext",

      // The data to send (will be converted to a query string)
      data: {action: "query",
             generator: "search",
             gsrnamespace: "0",
             gsrlimit: "10",
             prop: "extracts",
             pilimit: "max",
             exsentences: "3",
             format: "json",
             exlimit: "max",
             origin: "*"
            },
      headers: { 'Api-User-Agent': 'Example/1.0' },

      // Whether this is a POST or GET request
      type: "GET",

      // The type of data we expect back
      dataType : "jsonp"

    })

    // Code to run if the request succeeds (is done);
    // The response is passed to the function
    .done(function( json ) {
      var result = "";

      $('h3').html('The top ten wiki-results for <strong id="search">"' + q + '"</strong>:');

      $.each(json.query.pages, function(i) {
                   result += '<div id="rslt"><a href=" https://en.wikipedia.org?curid=' + json.query.pages[i].pageid + '" target="_blank">' +
                             '<div class="title">' + json.query.pages[i].title + '</div>' +
                             '<div class="extract">' + json.query.pages[i].extract + '</div>' +
                             '</a></div>';
      });

      $('.results').html(result);
    })
    // Code to run if the request fails; the raw request and
    // status codes are passed to the function
    .fail(function( xhr, status, errorThrown ) {
      alert( "Sorry, there was a problem!" );
      console.log( "Error: " + errorThrown );
      console.log( "Status: " + status );
      console.dir( xhr );
    });
    // Code to run regardless of success or failure;
    //  .always(function( xhr, status ) {
    //    alert( "The request is complete!" );
    //  });
  });
});
