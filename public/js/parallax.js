class Parallax {
  constructor(selector) {
    this.selector = selector

    this.initAttrs();

    if ( this.letters.length > 0 ) {
      var createdElements = this.createElements();

      if ( createdElements && this.data.indexScroll < this.window.height() ){
        this.elements = this.setElements( createdElements );
        this.registerScrollEvent();
        this.moveToZero();
      }
    }
  }

  initAttrs() {
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
      this.data.courseCompletion = ( this.data.indexScroll / this.window.height() ) * 100 / 2
    }.bind(this));
  }

    createElements( ) {
      if (this.letters.length > 0){
        $('<div class="letters_inner_container"></div>').appendTo( this.selector );
        this.innerSelector = this.selector.find( ".letters_inner_container" );

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
      for ( var i = 0, len = this.elements.length; i < len; i++ ) {
        var randomnumber = Math.floor(Math.random() * (20 - 0 + 1)) + 0;
        $(this.elements[i]).css( "top", (this.data.range[ randomnumber ]*2) + "%" );
      }
      this.moveElements();
    }

    setElements() {
      var _elements = [];
      this.letters = this.innerSelector.find(".letter");

      for (var i = 0, len = this.letters.length; i < len; i++) {
        var _letter = $(this.letters[i]);
        $(_letter.find("a")).on("click", function(event){
          event.preventDefault();
          $('html,body').animate({scrollTop: 1000},"fast");
        }.bind(this));
        _elements.push(_letter);
      }
      return _elements;
    }

    registerScrollEvent( ) {
      this.window.scroll( function (event) {
        event.stopPropagation();
        clearTimeout( this.parallaxTimer );

        this.parallaxTimer = setTimeout(function(){
          if ( this.data.courseCompletion < 99) {
          	this.moveElements( );
          } else if ( this.data.courseCompletion > 100) {
          	this.lockElements( );
          }
        }.bind(this), 2);
      }.bind(this));
    }

    moveElements() {
      var tmpHeight = ( this.window.height() - ( this.window.height() * this.data.courseCompletion ) / 100 );

      if (this.window.scrollTop() == 0) {
        this.data.courseCompletion = 1
      }

      var _fontsize;
      if ( this.data.courseCompletion > 50) {
        _fontsize = ( 1+1*(1/(this.data.courseCompletion/100)) + "em")
      } else {

        _fontsize = ( 2+1*(1*(this.data.courseCompletion/100)) + "em")
      }

      this.innerSelector.css({
        fontSize: _fontsize,
        height: tmpHeight
      });
    }

    lockElements( elements ) {
      this.didScroll = true
      this.innerSelector.css( "height", "auto" );
    }
}
