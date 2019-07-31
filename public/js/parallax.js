class Parallax {
  constructor(selector) {
    this.selector = selector
    this.init();



// dirty needs cleanups
    if ( this.letters.length > 0 ) {
      var createdElements = this.createElements();

      if ( createdElements && this.data.indexScroll < this.window.height() ){
        this.moveToZero();

        if ( this.didScroll == false ) {
          this.elements = this.setElements( createdElements );
          console.log(this.elements, "this.registerScrollEvent();");
          this.registerScrollEvent();
        }
      }
    }
  }

  init() {
    this.window = $(window);
    this.letters = this.selector.html().split( "" );
    this.selector.empty();

    this.data = {
      range: [Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
              Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1)],
      indexScroll: 0,
      courseCompletion: 0,
      url: "",
      elements: [],
      letters: [],
      selector: null,
      innerSelector: null,
      parallaxTimer: null
    };

    this.didScroll = false;

    this.window.on("scroll", function(e) {
      this.data.indexScroll = this.window.scrollTop();
      this.data.courseCompletion = ( this.data.indexScroll / this.window.height() ) * 100
    }.bind(this));
  }

    createElements( ) {
      if (this.letters.length > 0){
        $('<div class="letters_inner_container"></div>').appendTo( this.selector );
// debugger;
        this.innerSelector = this.selector.find( ".letters_inner_container" );
        // var width = Math.min(((letters.length * 40) * 40), $(window).width())
        //
        // console.log(((letters.length *35) * 40), $(window).width())
        // //
        // selector.css( "width", width );
        // innerSelector.css( "width", width );

        for ( var i = 0, len = this.letters.length; i < len; i++ ) {
          $('<div class="letter" style="position:relative ;">' +
            '<a href="">' +
             this.letters[i] +
            '</a>' +
            '</div>'
          ).appendTo( this.innerSelector );
        }
        return $(this.innerSelector);
      }
    }

    moveToZero( ) {
      this.elements = this.innerSelector.find( ".letter" );
      for ( var i = 0, len = this.elements.length; i < len; i++ ) {


        var randomnumber = Math.floor(Math.random() * (20 - 0 + 1)) + 0;


        $(this.elements[i]).css( "top", this.data.range[ randomnumber ] + "%" );
      }
      this.moveElements(this.elements, 1);
    }

    setElements() {
      var _elements = [];
      var letters = this.innerSelector.find(".letter");

      for (var i = 0, len = this.letters.length; i < len; i++) {
        _elements.push($(letters[i]));
      }
      return _elements;
    }

    registerScrollEvent( ) {
      this.window.scroll( function (event) {
        event.stopPropagation();
        // var _this = this;
        // clearTimeout( this.parallaxTimer );
        //
        // this.parallaxTimer = setTimeout(function(){
        // 	// var scroll = this.data.indexScroll;
        // 	// var courseCompletion = this.data.courseCompletion;
        // 	// var courseLength = this.window.height();
        // 	// var didScroll = this.didScroll;
        //
        // 	// if ( didScroll == false ) {
        //   console.log('this.selector');
        // 	// if ( didScroll == false ) {
          console.log(this.selector);
            this.moveElements( );
          // }
          //  else if ( courseCompletion > 100 && didScroll == false ) {
          // 	this.lockElements( elements );
          // }
          // if ( scroll < courseLength && didScroll == false ) {
          // 	this.moveElements( elements, courseCompletion );
          // } else if ( scroll > courseLength && didScroll == false ) {
          // 	this.lockElements( elements );
          // }
        // }.bind(this), 5);
      }.bind(this));
    }

    //Actually doesn't move elements but resizes the container around
    //and everything else is relative (ie. %) to that
    moveElements() {
      // for ( var i = 0, len = elements.length; i < len; i++ ) {
      // 	var elementHeight = this.data.range[( i % 20 )];
      // 	$(elements[i]).css("top", ( elementHeight - ( elementHeight * courseCompletion ) / 100 ) + "%" );
      // }
      var tmpHeight = ( this.window.height() - ( this.window.height() * this.data.courseCompletion ) / 100 );
      console.log('moooove');
      this.innerSelector.css(
        "height",
        tmpHeight
      );
    }

    lockElements( elements ) {
      this.didScroll = true
      for ( var i = 0, len = elements.length; i < len; i++ ) {
        elements[i].css( "top", 0 + "%" );
        $(".i_love_that_header .letters_inner_container").css( "height", "auto" );
      }
    }
}
//
//
// var Design = {
//
//   parallax: {
//
// 		data: {
//       range: [Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1),
//               Math.floor((Math.random() * 100 + 1)) * ( Math.round(Math.random()) * 2 - 1)],
//   		indexScroll: 0,
//   		courseCompletion: 0,
//       url: "",
//       elements: [],
//       letters: [],
//       selector: null,
//       innerSelector: null,
//       parallaxTimer: null
//   	},
//
// 		didScroll: false,
//
// 		init: function() {
//       this.window = $(window);
//       $body = $("body");
//
//       this.window.on("scroll", function(e) {
//         this.data.indexScroll = this.window.scrollTop();
//         this.data.courseCompletion = ( this.data.indexScroll / this.window.height() ) * 100
//       }.bind(this));
//
//
// 			this.letters = this.selector.html().split( "" );
// 			this.selector.empty();
//
//       // dirty needs cleanups
// 			if ( this.letters.length > 0 ) {
// 				var createdElements = this.createElements();
//
// 				if ( createdElements && this.data.indexScroll < this.window.height() ){
// 					this.moveToZero();
//
// 					if ( this.didScroll == false ) {
// 						this.elements = this.setElements( createdElements );
//             console.log(this.elements, "this.registerScrollEvent();");
// 						this.registerScrollEvent();
// 					}
// 				}
// 			}
//       // console.log(this);
// 		},
//
// 		createElements: function( ) {
//       if (this.letters.length > 0){
//   			$('<div class="letters_inner_container"></div>').appendTo( this.selector );
// // debugger;
//   			this.innerSelector = this.selector.find( ".letters_inner_container" );
//   			// var width = Math.min(((letters.length * 40) * 40), $(window).width())
//         //
//         // console.log(((letters.length *35) * 40), $(window).width())
//         // //
//   			// selector.css( "width", width );
//   			// innerSelector.css( "width", width );
//
//   			for ( var i = 0, len = this.letters.length; i < len; i++ ) {
//   				$('<div class="letter" style="position:relative ;">' +
//   				  '<a href="">' +
//   				   this.letters[i] +
//   				  '</a>' +
//   				  '</div>'
//   				).appendTo( this.innerSelector );
//   			}
//   			return $(this.innerSelector);
//       }
// 		},
//
// 		moveToZero: function( ) {
// 			this.elements = this.innerSelector.find( ".letter" );
// 			for ( var i = 0, len = this.elements.length; i < len; i++ ) {
//
//
//         var randomnumber = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
//
//
// 				$(this.elements[i]).css( "top", this.data.range[ randomnumber ] + "%" );
// 			}
//       this.moveElements(this.elements, 1);
// 		},
//
// 		setElements: function() {
// 			var _elements = [];
// 			var letters = this.innerSelector.find(".letter");
//
// 			for (var i = 0, len = this.letters.length; i < len; i++) {
// 				_elements.push($(letters[i]));
// 			}
// 			return _elements;
// 		},
//
// 		registerScrollEvent: function( ) {
// 			this.window.scroll( function (event) {
//         // var _this = this;
// 				// clearTimeout( this.parallaxTimer );
//         //
// 				// this.parallaxTimer = setTimeout(function(){
// 				// 	// var scroll = this.data.indexScroll;
// 				// 	// var courseCompletion = this.data.courseCompletion;
// 				// 	// var courseLength = this.window.height();
// 				// 	// var didScroll = this.didScroll;
//         //
// 				// 	// if ( didScroll == false ) {
//         //   console.log('this.selector');
// 				// 	// if ( didScroll == false ) {
//           console.log(this.selector);
// 						this.moveElements(this );
// 					// }
//           //  else if ( courseCompletion > 100 && didScroll == false ) {
// 					// 	this.lockElements( elements );
// 					// }
// 					// if ( scroll < courseLength && didScroll == false ) {
// 					// 	this.moveElements( elements, courseCompletion );
// 					// } else if ( scroll > courseLength && didScroll == false ) {
// 					// 	this.lockElements( elements );
// 					// }
// 				// }.bind(this), 5);
// 			}.bind(this));
// 		},
//
//     //Actually doesn't move elements but resizes the container around
//     //and everything else is relative (ie. %) to that
// 		moveElements: function() {
// 			// for ( var i = 0, len = elements.length; i < len; i++ ) {
// 			// 	var elementHeight = this.data.range[( i % 20 )];
// 			// 	$(elements[i]).css("top", ( elementHeight - ( elementHeight * courseCompletion ) / 100 ) + "%" );
// 			// }
//       var tmpHeight = ( this.window.height() - ( this.window.height() * this.data.courseCompletion ) / 100 );
// console.log('moooove');
//       this.innerSelector.css(
// 				"height",
//         tmpHeight
// 			);
// 		},
//
// 		lockElements: function( elements ) {
// 			this.didScroll = true
// 			for ( var i = 0, len = elements.length; i < len; i++ ) {
// 				elements[i].css( "top", 0 + "%" );
// 				$(".i_love_that_header .letters_inner_container").css( "height", "auto" );
// 			}
// 		}
// 	}
// };
//
//
// Design.parallax.init($(".ha .header"));
//
// Design.parallax.init($(".hb .header"));
//
// Design.parallax.init($(".hc .header"));
//
// Design.parallax.init($(".hd .header"));
new Parallax($(".ha .header"));
new Parallax($(".hb .header"));
new Parallax($(".hc .header"));
new Parallax($(".hd .header"));
