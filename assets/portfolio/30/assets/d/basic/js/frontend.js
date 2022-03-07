var offset = 110;
// Function to handle affix width and classes in affix menu on page loading, scrolling or resizing
function affix() {

    // Fit affix width to its parent's width
    var $affixElement = $('div[data-spy="affix"]');
    $affixElement.width($affixElement.parent().width() - 40);

    // Position of vertical scrollbar
    var position = $(window).scrollTop();
    if (position >= offset) {
        $('.wrapper .section').each(function(i) {
            // Current content block's position less body padding
            var current = $(this).offset().top - offset - 1;

            // Add active class to corresponding affix menu while removing the same from siblings as per position) of current block
            if (current <= position) {
                $('a', $affixElement).eq(i).addClass('active').siblings().removeClass('active');
            }
        });
    } else {
        $('a', $affixElement).find('.active').removeClass('active').end().find(":first").addClass('active');
    }
};

String.prototype.isEmpty = function() {
  return !!(this == null || this == undefined || this.length == 0);
};

String.prototype.IsJsonString = function() {
  try {
    JSON.parse(this);
  } catch (e) {
    return false;
  }
  return true;
};

var frontendCommon = {
  getAjaxLoader: function(size) {
    var width = 48;
    var height = 48;
    var breakLine = '<br/>';
    
    if ( ! $.trim(size).isEmpty() && size === 'small' ) {
      width = 16;
      height = 16;
      breakLine = '';
    }

    return breakLine + '<p class="text-center"><img src="/img/loader-ring.gif" alt="Loading..." width="' + width + '" height="' + height + '" /></p>';
  },
  
  loading: function(text) {
    var msg = ( ! $.trim(text).isEmpty() ) ? text : 'Fetching data...';
    return frontendCommon.getAjaxLoader() + '<br/><p class="text-center">' + msg + '</p>';
  },

  isNotEmpty: function(variable) {
    return ( typeof variable === 'undefined' || $.trim(variable).isEmpty() ) ? false : true;
  },

  isResponseSuccessful: function(response) {
    if ( typeof response === 'undefined' ) {
      return false;
    }

    return ( typeof response.isSuccess !== 'undefined' && (response.isSuccess === 1 || response.isSuccess === '1') ) ? true : false;
  },
  
  getResponseMessage: function(response) {
    if ( typeof response === 'undefined' || typeof response.message === 'undefined' || $.trim(response.message).isEmpty() ) {
      return '';
    }

    return jQuery.isArray(response.message) ? response.message.join('<br/>') : response.message;
  },

  submitForm: function(form, callback, dataType) {
    if ( ! this.isNotEmpty(form) ) return;
    
    var ajaxDataType = ( typeof dataType !== 'undefined' ) ? dataType : 'json';
    var defaultResponse = ( ajaxDataType === 'json' ) ? {} : '';

    $.ajax({
      method: 'POST',
      url: form.attr('action'),
      data: form.serialize(),
      cache: false,
      dataType: ajaxDataType,
      xhrFields: { withCredentials: true },
      success: function(response) {
        if(typeof callback === "function"){               
          callback(response);
        }
      },
      error: function(err) {
        var errorMsg = ( typeof err.responseText !== 'undefined' ) ? err.responseText : '';
        console.log('Submit form failed', errorMsg);

        if(typeof callback === "function"){
          callback(defaultResponse);
        }
      }
    });

    return false;
  },
  
  submitFormByElementObject: function(obj, callback, dataType) {
    if ( ! this.isNotEmpty(obj) ) return;

    var $obj = obj;
    var $form = $obj.closest('form');
    var ajaxDataType = ( typeof dataType !== 'undefined' ) ? dataType : 'json';

    frontendCommon.submitForm($form, function(response) {
      if ( typeof callback === 'function' ) {
        callback(response);
      }
    }, ajaxDataType);
  },

  ajaxCall: function(params, callback) {
    if ( ! this.isNotEmpty(params) ) return;

    var ajaxMethod = 'GET';
    var ajaxDataType = 'json';
    var url = '';

    if ( this.isNotEmpty(params.method) ) {
      ajaxMethod = params.method;
      delete params.method;
    }
    
    if ( this.isNotEmpty(params.dataType) ) {
      ajaxDataType = params.dataType;
      delete params.dataType;
    }
    
    if ( this.isNotEmpty(params.url) ) {
      url = params.url;
      delete params.url;
    }
    
    if ( ajaxMethod === 'POST' && typeof params._csrf === 'undefined' ) {
      params._csrf = $('meta[name="csrf-token"]').attr("content");
    }

    if ( $.trim(url).isEmpty() ) return;
    
    var defaultResponse = ( ajaxDataType === 'json' ) ? {} : '';

    $.ajax({
      method: ajaxMethod,
      url: url,
      data: params,
      cache: false,
      dataType: ajaxDataType,
      xhrFields: { withCredentials: true },
      success: function(response) {
        if(typeof callback === "function") {
          callback(response);
        }
      },
      error: function(err) {
        var errorMsg = ( typeof err.responseText !== 'undefined' ) ? err.responseText : '';
        console.log('Submit form failed', errorMsg);

        if(typeof callback === "function") {
          callback(defaultResponse);
        }
      }
    });
  },
  
  errorAlert: function(text, timeout) {
    if ( typeof fastjobsToast === 'undefined' ) {
      return;
    }

    var msg = ( ! $.trim(text).isEmpty() ) ? text : 'Oops! Something went wrong.<br/>Please reload the page and try again.';
    var msgTimeout = timeout || 3000;
    fastjobsToast.error({
      title: '&nbsp;',
      message: msg,
      timeout: msgTimeout,
      position: 'topRight'
    });
  },
  
  successAlert: function(text, timeout) {
    if ( typeof fastjobsToast === 'undefined' ) {
      return;
    }

    var msg = ( ! $.trim(text).isEmpty() ) ? text : 'Your request was processed successfully.';
    var msgTimeout = timeout || 3000;
    fastjobsToast.success({
      title: '&nbsp;',
      message: msg,
      timeout: msgTimeout,
      position: 'topRight'
    });
  },
  
  showLoadingToast: function(text) {
    if ( typeof fastjobsToast !== 'undefined' ) {
      var msg = ( ! $.trim(text).isEmpty() ) ? text : 'Please wait while we are processing your request...';
      var loadingMsg = frontendCommon.getAjaxLoader() + '<p class="text-center">' + msg + '</p>';

      fastjobsToast.show({
        id: 'loadingToast',
        close: false,
        theme: 'light',
        title: '&nbsp;',
        message: loadingMsg,
        timeout: false,
        position: 'center',
        transitionIn: 'bounceInUp',
        zindex: 1062
      });
    } else if ( $('#modalLoader').length > 1 ) {
      $('#modalLoader').modal('show');
    }
  },

  hideLoadingToast: function() {
    if ( typeof fastjobsToast !== 'undefined' ) {
      fastjobsToast.destroy();
    } else if ( $('#modalLoader').length > 1 ) {
      $('#modalLoader').modal('hide');
    }
  },
  
  loginByFacebook: function(statusResponse) {
    if ( $('#fb-root').length <= 0 ) {
      return;
    }

    var $fbroot = $('#fb-root');
    var fbloginurl = $fbroot.data('fbloginurl');
    var fbsignupurl = $fbroot.data('fbsignupurl');
    var signupurl = $fbroot.data('signupurl');
    var fbstate = $fbroot.data('fbstate');

    if ( fbstate === 'fbsignup' || fbstate === 'signup' || fbstate === 'login' ) {
      frontendCommon.showLoadingToast('Please wait while we are verifying your facebook info...');
      $('#btnSignupJobseeker').attr('disabled', 'disabled').addClass('disabled');
    }

    if (statusResponse.status === 'connected') {
      FB.api('/me?fields=id,name,email', function(graphResponse) {
        var fbtoken = statusResponse.authResponse.accessToken;
        var fbemail = ( typeof graphResponse.email !== 'undefined' ) ? graphResponse.email : '';
        fbsignupurl += '?fid=' + graphResponse.id + '&ftk=' + fbtoken;
        frontendCommon.ajaxCall({
            method: 'POST', 
            url: fbloginurl, 
            fbtoken: fbtoken,
            fbid: graphResponse.id,
            fullm: graphResponse.name,
            eml: fbemail
          }, function(response) {
            if ( frontendCommon.isResponseSuccessful(response) && fbstate === 'login' ) {
                if ( typeof response.isuser !== 'undefined' && ( response.isuser === '1' || response.isuser === 1 ) ) {
                    // will auto login
                } else {
                    window.location.replace(fbsignupurl);
                }
            } else if ( frontendCommon.isResponseSuccessful(response) && ( fbstate === 'fbsignup' || fbstate === 'signup' ) ) {
                if ( typeof response.isuser !== 'undefined' && ( response.isuser === '1' || response.isuser === 1 ) ) {
                    // existing fb user
                } else if ( fbstate === 'fbsignup' ) {
                    frontendCommon.hideLoadingToast();
                    $('#signupFbId').val(graphResponse.id);
                    $('#signupFbToken').val(fbtoken);
                    $('#signupFullm').val(graphResponse.name);
                    $('#signupEml').val(fbemail);
                    $('#btnSignupJobseeker').removeAttr('disabled').removeClass('disabled');
                } else {
                    window.location.replace(fbsignupurl);
                }
            } else {
                frontendCommon.hideLoadingToast();
            }
        });
      });
    } else {
      if ( fbstate === 'fbsignup' ) {
        window.location.replace(signupurl);
      }
    }
  }
};

$(function(){
    // Call to function on DOM ready
    affix();

    // Call on scroll or resize
    $(window).on('scroll resize', function() {
        affix();
    });

    $('a.scrollTo').on('click',function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        $('html, body').stop().animate({
           'scrollTop': $target.offset().top
      }, 900, 'swing');
    });
    
    var modalCounter = 0;
    $('.modal').on('shown.bs.modal', function () {
      modalCounter++;
      if (modalCounter) {
        $('body').removeClass('modal-open').addClass('modal-open');
      } else{
        $('body').removeClass('modal-open');
      }
    });
    $('.modal').on('hidden.bs.modal', function () {
      modalCounter--;
      if (modalCounter) {
        $('body').addClass('modal-open');
      } else {
        $('body').removeClass('modal-open');
      }
    });
    
    $('#formSignupJobseeker').on('click', '.mob-countryc-option', function() {
      var mobCountryC = $(this).attr('data-mobile-cd');
      $('#signupCd').val(mobCountryC);
      $('#btnMobileCountryOption-text').text(mobCountryC);
      $('#btnMobileCountryOption').closest('.input-group-btn').removeClass('open');
      return false;
    });

    $( '#btnSignupJobseeker' ).on('click', function() { 
        var ct       = $('#btnSignupJobseeker').attr('data-ct');
        var _csrf    = $('input[name="_csrf"]').val();
        var cd       = $('input[name="cd"]').val();
        var fullm    = $('input[name="fullm"]').val();
        var eml      = $('input[name="eml"]').val();
        var phone    = $('input[name="phone"]').val();
        var pass     = $('input[name="pass"]').val();
        var coupon   = $('input[name="coupon"]').val();
        var share    = $('input[name="share"]').prop("checked") ? 1 : 0;

        var ct_curr  = "";
        if (ct == "MY") {
          ct_curr = "MYR";
        } else if (ct == "PH") {
          ct_curr = "PHP";
        }

        frontendCommon.showLoadingToast();
        $.post("signup", {
            _csrf         : _csrf,
            cd            : cd,
            request_from  : 'web',
            fullm         : fullm,
            eml           : eml,
            phone         : phone,
            pass          : pass,
            coupon        : coupon,
            share         : share
        }).done(function(response){ 
            response = JSON.parse(response);
            console.log("Response", response);
            if ( frontendCommon.isResponseSuccessful(response) ) {
                fbq('trackCustom', 'Jobseekers Sign Up Successful');
                window.location.replace(`auto-login?usrn=${response._usrn}&pass=${response._pass}`);
            } else {
                frontendCommon.hideLoadingToast();
                var errorMessage = '';
                if ( typeof response.message === 'undefined' || $.trim(response.message).isEmpty() ) { } else {
                    if ( jQuery.isArray(response.message) ) {
                        response.message.forEach(function(item) {
                            errorMessage += `<li>${item}</li>`;
                        });
                        errorMessage = `<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign"></span>&nbsp;&nbsp;&nbsp;<span>Please correct the following errors:</span><ul class="list-error-message">${errorMessage}</ul></div>`;
                    } else {
                        errorMessage = response.message;
                    }
                }
                $( "#errMsg" ).html(errorMessage);
                $(window).scrollTop(0);
            }
        }).fail(function(xhr, status) {
            frontendCommon.hideLoadingToast();
            frontendCommon.errorAlert();
        });
    });

});

function signupValidateCoupon(coupon, fbInfo) {
  frontendCommon.showLoadingToast('Please wait while we are verifying your referral code...');
  $.post("https://feed-dev.fastjobs.ph/referral/validatecoupon?skip_key=1", {
      coupon: coupon
  }).done(function(response){ 
      response = JSON.parse(response);
      if ( frontendCommon.isResponseSuccessful(response) ) {
          $( "#errMsg" ).html('');
          frontendCommon.hideLoadingToast();
          frontendCommon.loginByFacebook(fbInfo);
      } else {
          frontendCommon.hideLoadingToast();
          var errorMessage = '';
          if ( typeof response.message === 'undefined' || $.trim(response.message).isEmpty() ) { } else {
              if ( jQuery.isArray(response.message) ) {
                  response.message.forEach(function(item) {
                      errorMessage += `<li>${item}</li>`;
                  });
                  errorMessage = `<div class="alert alert-danger" role="alert"><span class="glyphicon glyphicon-exclamation-sign"></span>&nbsp;&nbsp;&nbsp;<span>Please correct the following errors:</span><ul class="list-error-message">${errorMessage}</ul></div>`;
              } else {
                  errorMessage = response.message;
              }
          }
          $( "#errMsg" ).html(errorMessage);
          $(window).scrollTop(0);
      }
  }).fail(function(xhr, status) {
    frontendCommon.hideLoadingToast();
    frontendCommon.errorAlert();
  });
}