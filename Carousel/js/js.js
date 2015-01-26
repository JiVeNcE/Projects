(function($){

    $(document).ready(function(){

        $(".carousel-outer").carousel({

            waitTime : 2000,
            carouselInner : ".carousel-inner",
            imageWrapper : ".image-wrapper",
            leftSideElement : ".left-side",
            rightSideElement : ".right-side",
            carouseImage : ".carousel-image",
            customHeight : 400,
            jumpButtonsContainer : ".jump-buttons",
            scrollButtonClass : ".scroll-button",
            overlay : ".overlay",
            imageContainer : "#image-container",
            closeButton : "#close-button",
            filterCategory : ".filters-category",
            autoSlide : true
        })
    });

})(jQuery)