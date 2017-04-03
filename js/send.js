$(document).ready(function () {

    /*======================  Vars  ======================*/
    var $body = $('body');
    var $learnMoreLink = $('.learn-more-link');

    var $learnMorePopup = $('.js-learn-more');
    var $thankYouPopup = $('.js-thank-you');
    var $closePopup = $('.js-close-popup');

    var $formQuery = $('.query');
    var $jsInputNoregexp = $('.js-input-noregexp');
    var $titleField = $('.js-title');
    var $fnameField = $('.js-fname');
    var $phoneField = $('.js-phone');
    var $emailField = $('.js-email');
    var $selectField = $('.js-select');
    var $btnJq = $('.btn-jq');
    var regExpEmail = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;

    /*======================  Auto Complete Mails  ======================*/
    var emailTags = [
        'alextest@gmail.com',
        'peter.test@itncorp.com',
        'daniel.test@itncorp.com',
        'bruce.test@itncorp.com',
        'bondar.test@dyninno.com',
        'svetlana.example@dyninno.com',
        'abbas.example@itncorp.com',
        'marina.example@itncorp.com',
        'jeffrey.example@itncorp.com'
    ];

    /*======================  Action with Form  ======================*/
    $jsInputNoregexp.on('focusout', function (e) {
        e.preventDefault();
        var self = $(this);
        if (self.val() == '') {
            self.addClass('error').val('Error');
        } else {
            self.removeClass('error');
        }
    });

    $jsInputNoregexp.on('click', function (e) {
        e.preventDefault();
        var self = $(this);
        if (self.hasClass('error')) {
            self.removeClass('error').val('');
        }
    });

    $emailField.on('focusout', function (e) {
        e.preventDefault();
        if (regExpEmail.test($emailField.val())) {
            $emailField.removeClass('error');
        } else {
            $emailField.addClass('error');
        }
    });

    $emailField.on('click', function (e) {
        e.preventDefault();
        if ($emailField.hasClass('error')) {
            $emailField.removeClass('error');
        }
    });

    $selectField.on('click', function (e) {
        e.preventDefault();
        if ($selectField.hasClass('error')) {
            $selectField.removeClass('error');
        }
    });

    $btnJq.on('click', function (e) {
        e.preventDefault();
        errorCount = 0;
        checkFields();
        if ( errorCount == 0) {
            formInfoPrint();
            $formQuery[0].reset();
            $thankYouPopup.show();
        }
    });

    /*===================  Check Fields on click btn Send Query  ===============*/
    var errorCount = 0;
    function checkFields () {
        if (($titleField.val() == '') ||
            ($titleField.val() == 'Error')) {
            errorCount++;
            $titleField.addClass('error').val('Error');
        }

        if (($fnameField.val() == '') ||
            ($fnameField.val() == 'Error')) {
            errorCount++;
            $fnameField.addClass('error').val('Error');
        }

        if (($phoneField.val() == '') ||
            ($phoneField.val() == 'Error')) {
            errorCount++;
            $phoneField.addClass('error').val('Error');
        }

        if (regExpEmail.test($emailField.val())) {
        } else {
            errorCount++;
            $emailField.addClass('error');
        }

        if ($selectField.val() == null) {
            errorCount++;
            $selectField.addClass('error');
        }
    }

    /*======================  Auto Complete  ======================*/
    $emailField.autocomplete ( {
        minLength: 2,
        source: emailTags
    });

    /*======================  Ajax dropdown  =====================*/
    $.ajax ( {
        method: 'GET',
        url: '/api/countries',
        success: function (list) {
            for (var i = 0; i < list.response.data.length; i++) {
                $selectField.append('<option>' + list.response.data[i] + '</option>');
            }
        }
    });

    /*======================  Console  =====================*/
    function formInfoPrint() {
        var infoFromFields = {
            'title': $titleField.val(),
            'name': $fnameField.val(),
            'phone': $phoneField.val(),
            'email': $emailField.val(),
            'country': $selectField.val()
        };
        console.log(infoFromFields);
    }

    /*======================  Popup  =====================*/
    $learnMoreLink.on('click', function (e) {
        e.preventDefault();
        $learnMorePopup.show();
    });

    $closePopup.on('click', function (e) {
        e.preventDefault();
        $learnMorePopup.hide();
        $thankYouPopup.hide()
    });

    /*======================  Scroll  ======================*/
    $('.js-scroll-send').on('click', function(e) {
        var aTag = $("section[class='" + 'send' + "']");

        e.preventDefault();
        $body.animate( {scrollTop: aTag.offset().top} , 'slow');
    });

});