var fbPixel = {
  config: {
    employer_guest_post: {
      type: 'event',
      action: 'Lead'
    },
    employer_guest_post_completed: {
      type: 'event',
      action: 'CompleteRegistration',
      fb_custom_action: 'Employers Sign Up Successful - Lead'
    }
  },

  tagActionClick: function(name, dynamicParams) {
    if ( typeof fbq === 'undefined' || ! name || typeof fbPixel.config[name] === 'undefined') {
      return;
    }

    var params = fbPixel.config[name];

    if ( typeof params.action === 'undefined' ) {
      return;
    }

    var ct = $('#btnSubmitPostJobGuest').attr('data-ct');
    var ct_curr = "";
    if (ct == "MY") {
      ct_curr = "MYR";
    } else if (ct == "PH") {
      ct_curr = "PHP";
    }
    var parameters = ( typeof dynamicParams !== 'undefined' && typeof dynamicParams === 'object' ) ? dynamicParams : {currency: ct_curr, value: 1};

    fbq('track', params.action, parameters);

    if ( typeof params.fb_custom_action !== 'undefined' ) { 
      fbq('trackCustom', params.fb_custom_action); 
    }

  }
};

var ganalytics = {
  tagActionClick: function(name, dynamicLabel, dynamicUrl) {
    if ( ! name || typeof employerTagging.config[name] === 'undefined') {
      return;
    }

    var params = employerTagging.config[name];
    if ( typeof params.type === 'undefined' ) {
      return;
    }

    if ( params.type === 'virtual_page' ) {
      var pageUrl = ( typeof dynamicUrl !== 'undefined' && dynamicUrl.trim() !== '' ) ? dynamicUrl : params.url;
      this.trackVirtualPage(params.name, pageUrl);
    } 

    if ( params.type === 'event' ) {
      this.trackEvent(params, dynamicLabel);
    }

    if ( typeof employerTagging.goalConfig[name] !== 'undefined' ) {
      var goalParams = employerTagging.goalConfig[name];
      this.trackEvent(goalParams, dynamicLabel);
    }
  },

  trackEvent: function(params, dynamicLabel) {
    if ( typeof ga === 'undefined' || ! params.category || ! params.action ) {
      return;
    }

    if ( ! params.label ) params.label = '';

    params.action = params.action.replace(/[&@\*$!\[\]]/g, '');

    var eventLabel = params.label;
    if ( typeof dynamicLabel !== 'undefined' ) {
      eventLabel = eventLabel.replace('%s', dynamicLabel);
    }

    var eventValue = ( typeof params.value !== 'undefined' ) ? params.value : '';
    ga('send', 'event', params.category, params.action, eventLabel, eventValue );
  },

  trackPage: function() {
    if ( typeof ga === 'undefined' ) {
      return;
    }

    ga('send', 'pageview');
  },

  trackVirtualPage: function(title, page) {
    if ( typeof ga === 'undefined' || ! title ) {
      return;
    }

    ga('send', {hitType: 'pageview', title: title, page: page});
  }
};

var employerTagging = {
  config: {
    employer_guest_post_step1: {
      type: 'virtual_page',
      name: 'Post a Job - Mode of Applications | FastJobs',
      url: '/jobs/free-post/step-2'
    },
    employer_guest_post_step1_error: {
      type: 'event',
      category: 'FreePost',
      action: 'Step1_Error',
      label: 'Step1',
      value: 1
    },
    employer_guest_post_coyexist_error: {
      type: 'event',
      category: 'FreePost',
      action: 'Step1_Error',
      label: 'Company_Exist',
      value: 1
    },
    employer_guest_post_step2: {
      type: 'virtual_page',
      name: 'Post a Job - Company Details | FastJobs',
      url: '/jobs/free-post/step-3'
    },
    employer_guest_post_step2_error: {
      type: 'event',
      category: 'FreePost',
      action: 'Step2_Error',
      label: 'Step2',
      value: 1
    },
    employer_guest_post_step3_error: {
      type: 'event',
      category: 'FreePost',
      action: 'Step3_Error',
      label: 'Step3',
      value: 1
    },
    employer_guest_post_error: {
      type: 'event',
      category: 'FreePost',
      action: 'Error',
      label: 'Error',
      value: 1
    },
    employer_guest_post_failed: {
      type: 'event',
      category: 'FreePost',
      action: 'Error',
      label: 'Failed',
      value: 1
    },
    employer_guest_post_completed: {
      type: 'virtual_page',
      name: 'Job Submitted | FastJobs',
      url: '/jobs/free-post/success'
    },
    employer_support_request: {
      type: 'event',
      category: 'Employer_Support',
      action: 'Request',
      label: 'Contact Support',
      value: 0
    },
    employer_support_request_send: {
      type: 'event',
      category: 'Employer_Support',
      action: 'Request_Send',
      label: 'Contact Support',
      value: 0
    },
    employer_jobapp_filter: {
      type: 'event',
      category: 'Jobapp_Filter',
      action: 'Jobapp_Filter',
      label: '%s',
      value: 1
    }
  },

  goalConfig: {
    employer_guest_post_step1: {
      type: 'event',
      category: 'FreePost',
      action: 'Step1_Next',
      label: 'Job Type',
      value: 1
    },
    employer_guest_post_step2: {
      type: 'event',
      category: 'FreePost',
      action: 'Step2_Next',
      label: 'Job Company',
      value: 1
    },
    employer_guest_post_completed: {
      type: 'event',
      category: 'FreePost',
      action: 'Step3_Submit',
      label: 'Job Submitted',
      value: 1
    }
  },

  tagEvent: function(params) {
    if ( ! params || typeof params.name === 'undefined' ) {
      return;
    }

    var name = params.name;
    var label = ( typeof params.label !== 'undefined' && (params.label).trim() !== '' ) ? params.label : '';
    var url = ( typeof params.url !== 'undefined' && (params.url).trim() !== '' ) ? params.url : '';

    ganalytics.tagActionClick(name, label, url);
    fbPixel.tagActionClick(name);
  }
};