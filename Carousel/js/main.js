(function($){

    var images = [
        {
            src: "images/furniture_1.jpg",
            cls: "carousel-image",
            category: "furniture"
        },{
            src: "images/furniture_2.jpg",
            cls: "carousel-image",
            category: "furniture"
        },{
            src: "images/furniture_3.jpg",
            cls: "carousel-image",
            category: "furniture"
        }, {
            src: "images/furniture_4.jpg",
            cls: "carousel-image",
            category: "furniture"
        },
        {
            src: "images/car_1.jpg",
            cls: "carousel-image",
            category: "cars"
        },{
            src: "images/car_2.jpg",
            cls: "carousel-image",
            category: "cars"
        },{
            src: "images/car_3.jpg",
            cls: "carousel-image",
            category: "cars"
        },{
            src: "images/car_4.jpg",
            cls: "carousel-image",
            category: "cars"
        },{
            src: "images/game_1.jpg",
            cls: "carousel-image",
            category: "games"
        },{
            src: "images/game_2.jpg",
            cls: "carousel-image",
            category: "games"
        },{
            src: "images/game_3.jpg",
            cls: "carousel-image",
            category: "games"
        },{
            src: "images/game_4.jpg",
            cls: "carousel-image",
            category: "games"
        }
    ];

    var inAnimation = false;
    var timeIntervalMs = 5000;
    var chosenFilters = [];
    var defaults = {
        waitTime : 1000
    };

    function carouselSlides(element, settings) {
        this.options = {};
        this.element = element;
        $.extend(this.options, defaults, settings);

        this.carouselOuter = this.element;

        this.autoSlide = this.options.autoSlide;

        this.carouselInner = $(this.options.carouselInner);

        this.imageWrapper = $(this.options.imageWrapper);

        this.leftSideElement = $(this.options.leftSideElement);

        this.rightSideElement = $(this.options.rightSideElement);

        this.customHeight = this.options.customHeight;
        this.carouseImage = this.options.carouseImage;

        this.imageWidth = this.carouselOuter.width() -
        (this.leftSideElement.width() +
        this.rightSideElement.width());

        this.jumpButtonsContainer = $(this.options.jumpButtonsContainer);

        this.scrollButtonClass = this.options.scrollButtonClass;

        this.imageContainer = $(this.options.imageContainer);

        this.overlay = $(this.options.overlay);

        this.closeButton = $(this.options.closeButton);

        this.filterCategory = $(this.options.filterCategory);

        this.init();

        this.addFilters();
    }


    carouselSlides.prototype.addFilters = function() {

        var parent = this;

        parent.filterCategory.on('click', function( e, el ){

            var chosenFilter = $(this).children().eq(0).attr('data-categoryLabel');


            var chosenFilterIndex = chosenFilters.indexOf(chosenFilter);


            if (chosenFilterIndex > -1 )
            {
                chosenFilters.splice(chosenFilterIndex, 1);
                $(this).children().eq(0).removeClass('active-filter');
            }
            else
            {
                chosenFilters.push( chosenFilter );
                $(this).children().eq(0).addClass('active-filter');
            }

            parent.imageWrapper.html('');


            if (chosenFilters.length == 0)
            {
                for (var i = 0; i < images.length; i++) {
                    var image = images[i];

                   //call render img
                    parent.renderImg(parent, image);
                }
            }

            else
            {
                for (var i = 0; i < images.length; i++) {
                    var image = images[i];
                    for (var j = 0; j < chosenFilters.length; j++) {

                        var filter = chosenFilters[j];

                        if (image.category == filter )
                        {
                            //call render img
                            parent.renderImg(parent, image);

                            break;
                        }
                    }
                }
            }

            var totalNumberOfImages = $(parent.carouseImage).length;

            $(parent.carouseImage).width(parent.imageWidth);
            parent.imageWrapper.width(totalNumberOfImages * parent.imageWidth);

            //
            //parent.createSlidingLinks();
            //
            //$(parent.carouseImage).on('click', function(e) {
            //    // Event for expand Image
            //    parent.expandImage(e);
            //});
            //
            //$(parent.closeButton).on('click', function(e) {
            //   // Event for closing expand Image and restart Auto Scrolling
            //    parent.closeExpandedImage();
            //    parent.restartAutoScroll();
            //});
            //
            //parent.restartAutoScroll();
        });

    };

    // Rendering images
    carouselSlides.prototype.renderImg = function(parent, arg) {

        parent.imageWrapper.append('<img src="' +
            arg.src + '" class="' +
            arg.cls + '" data-category="' +
            arg.category + '"  />'
        );
    };

    // Shuffle images every time when the user open the page.
    carouselSlides.prototype.shuffleImgs = function shuffle(o){

            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
    };


    carouselSlides.prototype.init = function()
    {
        var parent = this;

        images = parent.shuffleImgs(images);

        for (var i = 0; i < images.length; i++) {
            //call render img
            parent.renderImg(parent, images[i]);
        }

        var totalNumberOfImages = $(parent.carouseImage).length;

        $(parent.carouseImage).width(parent.imageWidth);
        parent.imageWrapper.width(totalNumberOfImages * parent.imageWidth);

        parent.carouselInner.height(parent.customHeight).width(parent.imageWidth);
        parent.leftSideElement.height(parent.customHeight);
        parent.rightSideElement.height(parent.customHeight);
        $(parent.carouseImage).height(parent.customHeight);

        $(parent.carouseImage).eq($(parent.carouseImage).length - 1).
            insertBefore($(parent.carouseImage).eq(0));

        var mainWaitTime = parent.waitTime;

        parent.waitTime = 0;
        parent.slideLeft();
        parent.waitTime = mainWaitTime;

        parent.createSlidingLinks();

        parent.jumpButtonsContainer.find("li").first().addClass("activeLink");

        parent.jumpButtonsContainer.
            css({"left" : (parent.carouselInner.width() -
            parent.jumpButtonsContainer.width())/2});

        if(parent.autoSlide == true)
        {
            parent.setUpAutoScroll();
        }

        //attach click event on the current image to expand it
        $(parent.carouseImage).on('click', function(e) {
            parent.expandImage(e);
        });

        //attach click event on the closeButton to close Expanded image
        $(parent.closeButton).on('click', function(e) {
            parent.closeExpandedImage();
        });
    };

    carouselSlides.prototype.slideLeft = function(numberOfSlides)
    {
        var parent = this;

        if((parseInt(parent.imageWrapper.css("left").replace("px",""))) <= -(parent.imageWidth))
        {
            console.log("---------")
            $(parent.carouseImage).first().
                insertAfter($(parent.carouseImage).last());

            //slide right once when we reached end
            var originalWaitTime = parent.waitTime;
            parent.waitTime = 0;
            parent.imageWrapper.animate({"left" : "+=" + parent.imageWidth + "px"}, parent.waitTime);
            parent.waitTime = originalWaitTime;
        }

        //adjust active link classes
        var currentActiveLink = parent.jumpButtonsContainer.find(".activeLink");
        var nextActiveLink = currentActiveLink.next();
        if(nextActiveLink.length == 0)
        {
            nextActiveLink = parent.jumpButtonsContainer.children().first();
        }
        currentActiveLink.removeClass("activeLink");
        nextActiveLink.addClass("activeLink");

        parent.imageWrapper.animate({"left" : "-="+parent.imageWidth+"px"}, parent.waitTime, function(){
            var originalWaitTime;

            originalWaitTime = parent.waitTime;
            parent.waitTime = 100;

            if(numberOfSlides > 1)
            {
                parent.slideLeft(--numberOfSlides);
            }

            parent.waitTime = originalWaitTime;
        });
    };

    carouselSlides.prototype.slideRight = function(numberOfSlides)
    {
        var parent = this;
        if((parseInt(parent.imageWrapper.css("left").replace("px",""))) <= -(parent.imageWidth))
        {
            $(parent.carouseImage).last().
                insertBefore($(parent.carouseImage).first());

            //slide left once when we reach end
            var originalWaitTime = parent.waitTime;
            parent.waitTime = 0;
            parent.imageWrapper.animate({"left" : "-=" + parent.imageWidth + "px"}, parent.waitTime);
            parent.waitTime = originalWaitTime;
        }

        //adjust active link classes
        var currentActiveLink = parent.jumpButtonsContainer.find(".activeLink");
        var nextActiveLink = currentActiveLink.prev();
        if(nextActiveLink.length == 0)
        {
            nextActiveLink = parent.jumpButtonsContainer.children().last();
        }
        currentActiveLink.removeClass("activeLink");
        nextActiveLink.addClass("activeLink");

        parent.imageWrapper.animate({"left" : "+=" + parent.imageWidth + "px"}, parent.waitTime, function(){
            var originalWaitTime;

            originalWaitTime = parent.waitTime;
            parent.waitTime = 100 ;

            if(numberOfSlides > 1)
            {
                parent.slideRight(--numberOfSlides);
            }

            parent.waitTime = originalWaitTime;

        });

    };

    carouselSlides.prototype.createSlidingLinks = function()
    {
        var parent = this;

        parent.jumpButtonsContainer.html('');

        $(parent.carouseImage).each(function(){

            var newLink = $("<li>", { class: parent.scrollButtonClass.replace(".","")});

            newLink.on("click", function(){

                //restart the timer
                parent.restartAutoScroll();

                var numberOfSlides;
                var currentActiveLink = parent.jumpButtonsContainer.find(".activeLink");
                var indexOfActiveLink = parent.jumpButtonsContainer.find("li").index(currentActiveLink);
                var indexOfClickedLink = parent.jumpButtonsContainer.find("li").index($(this));

                if(indexOfActiveLink < indexOfClickedLink)
                {
                    //slide to the right
                    numberOfSlides = indexOfClickedLink - indexOfActiveLink;

                    parent.slideLeft(numberOfSlides);
                }

                if(indexOfActiveLink > indexOfClickedLink)
                {
                    //slide to the left
                    numberOfSlides = indexOfActiveLink - indexOfClickedLink;

                    parent.slideRight(numberOfSlides);
                }
            });
            parent.jumpButtonsContainer.append(newLink);

        });
    };

    carouselSlides.prototype.setUpAutoScroll = function() {
        var parent = this;

        //set up auto Scrolling with interval: 5000ms
        rval = setTimeout(function(){
            parent.slideLeft();
            parent.setUpAutoScroll.call(parent);
        }, timeIntervalMs );
    };

    carouselSlides.prototype.restartAutoScroll = function() {
        this.stopAutoScroll();
        this.setUpAutoScroll();
    };

    carouselSlides.prototype.stopAutoScroll = function() {
        clearInterval(this.sliderInterval);
    };


    carouselSlides.prototype.expandImage = function(e) {
        //Expand selected image and stop Auto Scroll
        this.stopAutoScroll();
        var currentImage = e.currentTarget;
        var imageSrc = $(currentImage).attr('src');

        this.imageContainer.html('');
        this.imageContainer.append('<img src="' + imageSrc + '" />');

        this.overlay.css("display", "block");

    };

    carouselSlides.prototype.closeExpandedImage = function() {
        // Close expanded image
        this.overlay.css("display", "none");
    };


    $.fn.carousel = function(settings){
        var $this = this;
        new carouselSlides($this, settings);

        return $this;
    };

})(jQuery);