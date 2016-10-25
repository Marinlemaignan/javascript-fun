var Design = {

  parallax: {

		data: {
      range: [ 20, 50, 30, 60, 40, 25, 65, 35, 45, 55 ],
  		indexScroll: 0,
  		courseCompletion: 0,
      url: "",

  	},

		didScroll: false,

		init: function(selector) {
      $window = $(window);
      $body = $("body");

      $window.on("scroll", function(e) {
        Design.parallax.data.indexScroll = $window.scrollTop();
        Design.parallax.data.courseCompletion = ( Design.parallax.data.indexScroll / $window.height() ) * 100
      });


			var letters = selector.html().split( "" );
			selector.empty();

			if ( letters.length > 0 ) {
				var innerSelector = Design.parallax.createElements( selector, letters );

				if ( innerSelector &&
					Design.parallax.data.indexScroll < $window.height() &&
					selector.parent()[0].className == "i_love_that_header" ){
					Design.parallax.setInPlace( innerSelector );

					if ( Design.parallax.didScroll == false ) {
						elements = Design.parallax.setElements( innerSelector );
						Design.parallax.doTheScrollStuff(elements);
					}
				}
			}
		},

		createElements: function( selector, letters ) {
			$('<div class="letters_inner_container"></div>').appendTo( selector );

			var innerSelector = selector.find( ".letters_inner_container" );
			var width = Math.min((letters.length * 40), $(window).width())

			selector.css( "width", width );
			innerSelector.css( "width", width );

			for ( var i = 0, len = letters.length; i < len; i++ ) {
				$('<div class="letter">' +
				  '<a href="#">' +
				   letters[i] +
				  '</a>' +
				  '</div>'
				).appendTo( innerSelector );
			}
			return innerSelector;
		},

		setInPlace: function( innerSelector ) {
			var elements = innerSelector.find( ".letter" );

			for ( var i = 0, len = elements.length; i < len; i++ ) {
				$(elements[i]).css( "top", Design.parallax.data.range[ ( i % 10 ) ] + "%" );
			}
		},

		setElements: function( innerSelector ) {
			var elements = [];
			var letters = innerSelector.find(".letter");

			for (var i = 0, len = letters.length; i < len; i++) {
				elements.push($(letters[i]));
			}
			return elements;
		},

		doTheScrollStuff: function( elements ) {
			$window.scroll( function (event) {
				clearTimeout( parallaxTimer );

				var parallaxTimer = setTimeout(function(){
					var scroll = Design.parallax.data.indexScroll;
					var courseCompletion = Design.parallax.data.courseCompletion;
					var courseLength = $window.height();
					var didScroll = Design.parallax.didScroll;

					if ( scroll < courseLength && didScroll == false ) {
						Design.parallax.moveElements( elements, courseCompletion );
					} else if ( scroll > courseLength && didScroll == false ) {
						Design.parallax.lockElements( elements );
					}
				}, 45);
			});
		},

		moveElements: function( elements, courseCompletion ) {
			for ( var i = 0, len = elements.length; i < len; i++ ) {
				var elementHeight = Design.parallax.data.range[( i % 10 )];
				elements[i].css("top", ( elementHeight - ( elementHeight * courseCompletion ) / 100 ) + "%" );
			}
			$(".i_love_that_header h1 .letters_inner_container").css(
				"height",
				( $window.height() - ( $window.height() * courseCompletion ) / 100 )
			);
		},

		lockElements: function( elements ) {
			Design.parallax.didScroll = true
			for ( var i = 0, len = elements.length; i < len; i++ ) {
				elements[i].css( "top", 0 + "%" );
				$(".i_love_that_header h1 .letters_inner_container").css( "height", "auto" );
			}
		}
	}
};
