var employer = {
    signup: function(form, callback) {
        var $form = form;
        var data = $form.serialize();
        var url = $form.attr('action');

        $.ajax({
            url: url,
            type: 'POST',
            data: data,
            dataType: 'json',
            success: function(response) {
                if(typeof callback === "function"){
                    callback(response);
                }
            },
            error: function(response) {
                if(typeof callback === "function"){
                    callback(response);
                }
            }
        });
    }
};

$(function(){
    var $body = $('body');
    
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
                'scrollTop': $target.offset().top
        }, 900, 'swing');
    });

    $body.on('click', '#submit-inq', function(e){
        e.preventDefault();
        
        var $form = $('#inq-form');

        $('#inq-progress').slideDown();
        $('#submit-inq').slideUp();

        employer.signup($form, function(response){
            $('#alertdiv').html('');
            $('#alertdiv').css('display', 'none');

            var messages = response.message;

            if ( response.isSuccess === 1 || response.isSuccess === '1' ) {
                ga('send', 'event', 'EmpEnquiry', 'RequestAccount', 'Request Account Success', 1);

                $form.trigger('reset');
                $('.company-size-area').show();
                $('#alertdiv').removeClass().addClass('alert alert-success');
                $('#alertdiv').html( '' + messages[0].trim() ).css('display', 'block');
                $form[0].reset();
            } else {
                $('#alertdiv').html('<h5><span class="glyphicon glyphicon-warning-sign"></span>&nbsp; Please correct the following errors:</h5>');
                $.each(messages, function(i) {
                    if ( i !== 0 ) {
                        $('#alertdiv').append( '<br />' );
                    }
                    $('#alertdiv').append( "* &nbsp; " + messages[i].trim() );
                });
                $('#alertdiv').removeClass().addClass('alert alert-danger');
                $('#alertdiv').css('display', 'block');
            }
    
            $('html, body').stop().animate({
                'scrollTop': $('#signup').offset().top
            }, 900, 'swing');

            $('#inq-progress').slideUp();
            $('#submit-inq').slideDown();
        });

        return false;
    });

    $body.on('click', '#isstartup', function(e){
        if ( $(this).is(':checked') ) {
            $('#companysize option').removeAttr('selected');
            $('.company-size-area').hide();
        }
        else {
            $('.company-size-area').show();
        }
    });
});