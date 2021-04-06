
//<![CDATA[
$(window).on('load', function() { // CHARGEMENT DU SITE GLOBAL
	"use strict";
	$('#status').delay(50).fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(550).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(550).css({'overflow':'visible'});
});
//]]>


(function($) {
    "use strict";

	/* FORMULAIRE DE TÉLÉCHARGEMENT */
    $("#DownloadForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // INVALIDE...
            formDError();
            submitDMSG(false, "Check if all fields are filled in!");
        } else {
            // CORRECT!
            event.preventDefault();
            submitDForm();
        }
    });

    function submitDForm() {
        // INNITIALISATION DES VARIABLES POUR LE FORMULAIRE
        var dfirstname = $("#dfirstname").val();
        var dlastname = $("#dlastname").val();
        var dphone = $("#dphone").val();
        var demail = $("#demail").val();

        $.ajax({
            type: "POST",
            url: "php/downloadform-process.php",
            data: "firstname=" + dfirstname + "&lastname=" + dlastname + "&phone=" + dphone + "&email=" + demail,
            success: function(text) {
                if (text == "success") {
                    formDSuccess();
                } else {
                    formDError();
                    submitDMSG(false, text);
                }
            }
        });
    }

    function formDSuccess() {
        $("#DownloadForm")[0].reset();
        submitDMSG(true, "Message Submitted!")
    }

    function formDError() {
        $("#DownloadForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function submitDMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#dmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }


	/* FORMULAIRE DE CONTACT*/
    $("#ContactForm").validator().on("submit", function(event) {
        if (event.isDefaultPrevented()) {
            // INVALIDE.
            formCError();
            submitCMSG(false, "Check if all fields are filled in!");
        } else {
            // CORRECT!
            event.preventDefault();
            submitCForm();
        }
    });

    function submitCForm() {
        // INNITIALISATION DES VARIABLES
        var cfirstname = $("#cfirstname").val();
        var clastname = $("#clastname").val();
        var cemail = $("#cemail").val();
		var cmessage = $("#cmessage").val();

        $.ajax({
            type: "POST",
            url: "php/contactform-process.php",
            data: "firstname=" + cfirstname + "&lastname=" + clastname + "&email=" + cemail + "&message=" + cmessage,
            success: function(text) {
                if (text == "success") {
                    formCSuccess();
                } else {
                    formCError();
                    submitCMSG(false, text);
                }
            }
        });
    }

    function formCSuccess() {
        $("#ContactForm")[0].reset();
        submitCMSG(true, "Message Submitted!")
    }

    function formCError() {
        $("#ContactForm").removeClass().addClass('shake animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
            $(this).removeClass();
        });
    }

    function submitCMSG(valid, msg) {
        if (valid) {
            var msgClasses = "h3 text-center tada animated text-success";
        } else {
            var msgClasses = "h3 text-center text-danger";
        }
        $("#cmsgSubmit").removeClass().addClass(msgClasses).text(msg);
    }






    setCarouselHeight('#carousel-example-generic');

    function setCarouselHeight(id) {
        var slideHeight = [];
        $(id + ' .item').each(function() {
            // SLIDES
            slideHeight.push($(this).height());
        });

        // TROUVER LE PLUS GROS FICHIER
        var max = Math.max.apply(null, slideHeight);

        // POIDS DU SLIDE
        $(id + ' .carousel-content').each(function() {
            $(this).css('height', max + 'px');
        });
    }


	/* BOUTON RETOUR */
    // CREATION DU BOUTON RETOUR
    $('body').prepend('<a href="#header" class="back-to-top scrolling">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* SCROLLING DE LA PAGE */
		$('a.scrolling').on('click', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: ($($anchor.attr('href')).offset().top - 50)
			}, 1250, 'easeInOutExpo');
			event.preventDefault();
		});

    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });
    // FERMER LA NARRE DE NAVIGATION
    $('.navbar-collapse ul li a').on('click', function(){
            $('.navbar-toggle:visible').click();
	});
    // OFFSET LA BARRE DE NAV
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })

})(jQuery);
