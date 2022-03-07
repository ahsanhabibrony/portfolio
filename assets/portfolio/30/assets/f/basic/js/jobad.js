var jobad = {
  viewEmail: function(obj) {
    if ( ! obj ) return;

    var $obj = obj;
    $obj.closest('.job-email-info-holder').text($obj.attr('data-info'));
    jobad.sendClickTag({
     'ga': {
         'category': 'Ad_Detail',
         'label': 'View_Email'
     }
    });
  },

  viewPhone: function(obj) {
    if ( ! obj ) return;

    var $obj = obj;
    $obj.closest('.job-phone-info-holder').text($obj.attr('data-info'));
    jobad.sendClickTag({
     'ga': {
         'category': 'Ad_Detail',
         'label': 'View_Phone'
     }
    });
  },

  sendClickTag: function(params) {
    if ( ! params ) return;

    var $jobad = $('#jobad');
    var jobid = $jobad.attr('data-job-id');
    var jobtitle = $('#jobad .job-title').html();

    if ( params.ga ) {
        ga('send', 'event', params.ga.category, params.ga.label, jobid + ' - ' + jobtitle.replace(/[&@\*$!\[\]]/g, '') );
    }

    return false;
  },
    
  checkMaxOutletsAllowed: function(obj, isMobile) {
    if ( typeof obj === 'undefined' ) { return; }

    var isOnMobile = ( typeof isMobile !== 'undefined' ) ? isMobile : false;
    var chkOutletClass = isOnMobile ? '.chk-mob-outlet' : '.chk-outlet';
    var maxOutletsId = '#maxOutletsAllowed';
    var outletsErrorId = isOnMobile ? '#mobileOutletsError' : '#outletOptionsError';
    var totalSelected = $(chkOutletClass).filter(':checked').length;
    var maxOutletsAllowed = 0;
    if ( $(maxOutletsId).length ) {
      maxOutletsAllowed = parseInt($(maxOutletsId).text());
    }

    if ( maxOutletsAllowed > 0 && totalSelected > maxOutletsAllowed ) {
      obj.attr('checked',false);
      obj.prop('checked',false);

      $(outletsErrorId).html('You can only select up to ' + maxOutletsAllowed + ' outlets.').addClass('alert alert-danger').slideDown();

      setTimeout(function(){
        $(outletsErrorId).slideUp().html('').removeClass();
      }, 3000);

      return false;
    }
  }
};

$(function(){
    $(".img-coylogo").unveil(300);

    var $container = $('.main-content');

    $container.on('click', '.call-phone', function() {
        jobad.sendClickTag({
         'ga': {
             'category': 'Ad_Detail',
             'label': 'Call_Phone'
         }
        });
    });
    
    $container.on('click', '.view-phone', function() {
        jobad.viewPhone($(this));
        return false;
    });
    
    $container.on('click', '.view-email', function() {
        jobad.viewEmail($(this));
        return false;
    });

    $container.on('click', '.send-email', function() {
        jobad.sendClickTag({
         'ga': {
             'category': 'Ad_Detail',
             'label': 'Send_Email'
         }
        });
    });
    
    $container.on('click', '.btn-apply-job', function(e){
        e.preventDefault();

        jobad.sendClickTag({
         'ga': {
             'category': 'Ad_Detail',
             'label': 'Apply_Now'
         }
        });
       
        var modalDivId = $(this).attr('data-target');
        $(modalDivId).modal('show');
    });
    
    $container.on('click', '.btn-apply-option', function(){
       var applyType = $(this).attr('data-apptype');
       jobad.sendClickTag({
         'ga': {
             'category': 'Apply',
             'label': applyType
         }
       });

       $('.modal').modal('hide');
       $(location).attr('href', $(this).attr('data-info'));
    });
    
    $container.on('click', '.cancel-apply', function(){
        jobad.sendClickTag({
         'ga': {
             'category': 'Apply',
             'label': 'Cancel'
         }
       });
    });
    
    $container.on('click', '.btn-save', function(e){
      e.preventDefault();
      var actionType = $(this).attr('data-action');
      var className = ( actionType == 'save' ) ? 'alert-success' : 'alert-info';
      var mobileText = ( actionType == 'save' ) ? '<span class="glyphicon glyphicon-star"></span>&nbsp; Saved' : '<span class="glyphicon glyphicon-trash"></span>&nbsp; Unsaved';
      var tagEventName = ( actionType == 'save' ) ? 'jobdetail_save' : 'jobdetail_unsave';

      frontendCommon.submitFormByElementObject($(this), function(response) {
        if ( frontendCommon.isResponseSuccessful(response) ) {
          var message = frontendCommon.getResponseMessage(response);
          frontendCommon.successAlert(message);

          frontendTagging.tagEvent({name: tagEventName});

          $('#savejobHolder').removeClass().addClass('alert ' + className).html('<h5>' + message + '</h5>');
          $('#savejobHolderMobile').html('<button class="btn btn-default btn-block disabled no-border" disabled>' + mobileText + '</button>');
        } else {
          frontendCommon.errorAlert(frontendCommon.getResponseMessage(response));
        }
      });
    });
    
    $container.on('click', '.btn-close-modal', function(e) {
      e.preventDefault();
      $('.modal').modal('hide');

      return false;
    });
    
    $container.on('click', '#btnOutletNextMobile', function(e) {
      e.preventDefault();

      if ( $('#modalOutletsOption').find('input.chk-mob-outlet:checked').length <= 0 ) {
        $('#mobileOutletsError').html('Please select at least 1 outlet.').addClass('alert alert-danger').slideDown();

        setTimeout(function(){
            $('#mobileOutletsError').slideUp().html('').removeClass();
        }, 3000);

      } else {
        var outletids = [];
        $.each($('input.chk-mob-outlet:checked'), function(){            
            outletids.push($(this).val());
        });
        $('#mobOutletids').val(outletids.join(','));

        $('#modalOutletsOption').modal('hide');
        $('#modalApplyMobileOptions').modal('show');
      }
    });
    
    $('#modalOutletsOption').on('change', '.chk-mob-outlet', function(e){
      jobad.checkMaxOutletsAllowed($(this), true);
    });

    $('#modalApplyConfirm').on('change', '.chk-outlet', function(e){
      jobad.checkMaxOutletsAllowed($(this), false);
    });
    
    $container.on('click', '.btn-mobile-reapply', function(e){
      e.preventDefault();
      
      var href = $(this).attr('href');
      var appType = $(this).attr('data-apptype');
      
      frontendCommon.showLoadingToast('Please wait while we are sending your job application.');

      $('#appTypeMobileReapply').val(appType);

      frontendCommon.submitFormByElementObject($(this), function(response) {

        frontendCommon.hideLoadingToast();
        
        if ( frontendCommon.isResponseSuccessful(response) ) {

          // tag event
          var applyType = (appType === "call") ? "Call" : "SMS";
          frontendTagging.tagEvent({name: 'jobdetail_apply', label: applyType});

          // redirect to speficied href
          if ( appType !== 'email' ) {
            setTimeout(function(){
              $(location).attr('href', href);
            }, 1000);
          }
        } else {
          frontendCommon.errorAlert(frontendCommon.getResponseMessage(response));
        }
      });
    });
    
    $container.on('click', '.btn-apply', function(e){
      e.preventDefault();
      var href = $(this).attr('href');
      var appType = $(this).attr('data-apptype');
      var isOutletJob = $(this).attr('data-isoutlet');
      var $parentModal = $(this).closest('.modal');

      if ( isOutletJob === '1' ) {
        var outletIds = 'input[name="outletids[]"]:checked';
        if ( $('input[name="outletids[]"]:checked').length <= 0 ) {
          $('#outletOptionsError').html('Please select at least one outlet.').addClass('alert alert-danger').slideDown();
          setTimeout(function(){
            $('#outletOptionsError').slideUp().html('').removeClass();
          }, 3000);
          return false;
        }
      }

      if ( $parentModal.length > 0 ) {
        $parentModal.modal('hide');
      }

      $('#jobActionsMobile').removeClass().hide();
      $('#btnApplyNow').attr('disabled', 'disabled').addClass('disabled');

      frontendCommon.showLoadingToast('Please wait while we are sending your job application.');

      $('#appTypeMobile').val(appType);

      frontendCommon.submitFormByElementObject($(this), function(response) {

        frontendCommon.hideLoadingToast();

        $('#btnApplyNow').removeAttr('disabled').removeClass('disabled');

        if ( frontendCommon.isResponseSuccessful(response) ) {

          // tag event
          var applyType = "Email";
          if (appType === "call"){
            applyType = "Call";
          } else if (appType === "sms"){
            applyType = "SMS";
          }
          frontendTagging.tagEvent({name: 'jobdetail_apply', label: applyType});

          // Will only work in production because of whitelisting
          if (typeof fbq !== "undefined")
              fbq('trackCustom', 'Jobseekers Apply Job_Successful');

          $('#modalAppliedSuccess').modal('show');

          // redirect user to external url
          if ( appType === "email" && 
               typeof response.redirecturl !== 'undefined' && 
               ! $.trim(response.redirecturl).isEmpty() ) {

            setTimeout(function(){
              $(location).attr('href', response.redirecturl);
            }, 1000 );

          }

          // redirect to speficied href
          if ( appType !== 'email' ) {
            setTimeout(function(){
              $(location).attr('href', href);
            }, 1000);
          }

        } else if ( typeof response.isVerifiedErr !== 'undefined' && 
                    ( response.isVerifiedErr === 1 || response.isVerifiedErr === '1') ) {

          // user haven't verified his/her mobile number
          $('#modalRequestVerifyMobile').modal('show');

        } else if ( typeof response.profileError !== 'undefined' && response.profileError) {

          var errorMessage = '<h3 class="text-center">' + response.message + '</h3><br/>';

          if ( ! jQuery.isEmptyObject(response.response_message) ) {
            var errorMessageArr = [];
            $.each(response.response_message, function(key, value) {
                errorMessageArr.push('<li>' + value + '</li>');
            });

            errorMessage += '<ul>';
            errorMessage += errorMessageArr.join('');
            errorMessage += '</ul>';
          } else {
            errorMessage += response.response_message;
          }

          var profileUrl = ( $('#navProfile').length ) ? $('#navProfile').attr('href') : '/p/profile/index';
          errorMessage += '<br/><p class="text-center"><a href="' + profileUrl + '" class="btn btn-primary btn-block">Update Profile</a></p>';

          $('#modalAppliedErrorMsg').html(errorMessage);
          $('#modalAppliedErrorDownloadApp').hide();
          $('#modalAppliedError').modal('show');
        } else {
          frontendCommon.errorAlert(frontendCommon.getResponseMessage(response));

          var errorMessage = '<h2 class="text-center">Invalid application</h2>';
          errorMessage += (response.message);
          $('#modalAppliedErrorMsg').html(errorMessage);
          $('#modalAppliedErrorDownloadApp').show();
          $('#modalAppliedError').modal('show');
        }
      });
    });

    $('#modalApplyViaApp').on('show.bs.modal', function () {
      var url = ( typeof($(location).attr('href')) !== 'undefined' ) ? $(location).attr('href') : '';
      frontendTagging.tagEvent({name: 'jobdetail_apply_via_app', url: url});
    });
});