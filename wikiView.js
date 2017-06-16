$(document).ready(function(){

    //   startscreen animations
    $('#srchBut').click(function(){
    $('#srchBut').animate({top: '25px',
                           left: '+=150px',
                           width: '75px',
                           height: '75px',
                           letterSpacing: '15px',
                           fontSize: '1.39em',
                           paddingLeft: '15px'
                          }, 'slow');
    $('#rndmBut').animate({top: '25px',
                           right: '+=150px',
                           width: '75px',
                           height: '75px',
                           letterSpacing: '15px',
                           fontSize: '1.39em',
                           paddingLeft: '15px'
                          }, 'slow');
    $('#rqst').css('display', 'inline')
        .animate({height: '45px',
                  fontSize: '1.618em',
                  maxWidth: 'auto'}, 'slow');
    $('#srchBut').prop('id', 'getRqst');
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
      xhrFields: { withCredentials: true },
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
        result += '<p><a href=" https://en.wikipedia.org?curid=' + json.query.pages[i].pageid + '" target="_blank">' +
                             '<div class="title">' + json.query.pages[i].title + '</div>' +
                             '<div class="extract">' + json.query.pages[i].extract + '</div>' +
                             '</a></p>';
      });
        $('.results').html(result);
       //$( "<div class=\"results\">").html( json.query ).appendTo( "body" );

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
