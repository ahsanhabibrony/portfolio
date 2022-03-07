var fbPixel = {
  tagActionClick: function(fbeventName, fbeventLabel, fbeventProp, fbeventCustom) {
    if ( typeof fbeventName === 'undefined' || typeof fbPixelEvents === 'undefined' ) {
      return;
    }

    if ( typeof fbeventCustom !== 'undefined' ) { 
      fbq('trackCustom', fbeventCustom); 
    }
    
    var fbAdditonalEventName = ( typeof fbeventLabel !== 'undefined' && ! $.trim(fbeventLabel).isEmpty() ) ? '_' + fbeventLabel.toLowerCase() : '';
    var fbEventTagName = fbeventName + fbAdditonalEventName;

    if ( ! fbPixelEvents.hasOwnProperty(fbEventTagName) ) {
      return;
    }

    var fbEvent = fbPixelEvents[fbEventTagName];
    var trackType = ( typeof fbEvent.type !== 'undefined' ) ? fbEvent.type : 'trackCustom';
    var action = ( typeof fbEvent.name !== 'undefined' ) ? fbEvent.name : '';
    var properties = ( typeof fbEvent.properties !== 'undefined' ) ? fbEvent.properties : {};
    
    var fbAdditonalEventProperties = ( typeof fbeventProp === 'object' ) ? fbeventProp : {};    
    var fbEventTagProperties = {}
    jQuery.extend(fbEventTagProperties, properties, fbAdditonalEventProperties);

    this.trackEvent(trackType, action, fbEventTagProperties);
  },

  trackEvent: function(trackType, action, properties) {
    if ( typeof fbq === 'undefined' || typeof action === 'undefined' || $.trim(action).isEmpty() ) {
      return;
    }

    var trackEventType = ( typeof trackType !== 'undefined' && ! $.trim(trackType).isEmpty() ) ? trackType : 'trackCustom';
    var finalProperties = {};
    var defaultFBProperties = ( typeof defaultFBProp === 'object' ) ? defaultFBProp : {};
    var jobFBProperties = ( typeof jobadFBProp === 'object' ) ? jobadFBProp : {};
    var eventProperties = ( typeof properties === 'object' ) ? properties : {};
    
    jQuery.extend(finalProperties, jobFBProperties, defaultFBProperties, eventProperties);

    if ( jQuery.isEmptyObject(finalProperties) ) {
      fbq(trackEventType, action);
    } else {
      fbq(trackEventType, action, finalProperties);
    }
  }
};

var ganalytics = {
  tagActionClick: function(name, dynamicLabel, dynamicUrl) {
    if ( ! name || typeof frontendTagging.config[name] === 'undefined') {
      return;
    }

    var params = frontendTagging.config[name];
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

    if ( typeof frontendTagging.goalConfig[name] !== 'undefined' ) {
      var goalParams = frontendTagging.goalConfig[name];
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

    ga('send', 'event', params.category, params.action, eventLabel );
  },

  trackPage: function() {
    if ( typeof ga === 'undefined' ) {
      return;
    }

    ga('send', 'pageview');
  },

  trackVirtualPage: function(title, page) {
    if ( typeof ga === 'undefined' || ! title || ! page ) {
      return;
    }

    ga('send', {'hitType': 'pageview', 'title': title, 'page': page});
  }
};

var gtagmanager = {
  tagActionClick: function(name, dynamicLabel) {
    if ( ! name || typeof frontendTagging.config[name] === 'undefined') {
      return;
    }

    var params = frontendTagging.config[name];
    if ( params.type === 'event' ) {
      this.trackEvent(params, dynamicLabel);
    }

    if ( typeof frontendTagging.goalConfig[name] !== 'undefined' ) {
      var goalParams = frontendTagging.goalConfig[name];
      this.trackEvent(goalParams, dynamicLabel);
    }
  },

  trackEvent: function(params, dynamicLabel) {
    if ( typeof dataLayer === 'undefined' || ! params.category || ! params.action ) {
      return;
    }

    if ( ! params.label ) params.label = '';

    params.action = params.action.replace(/[&@\*$!\[\]]/g, '');

    var eventLabel = params.label;
    if ( typeof dynamicLabel !== 'undefined' ) {
      eventLabel = eventLabel.replace('%s', dynamicLabel);
    }
    
    dataLayer.push({
      "event": "custom_event",
      "eventCategory": params.category,
      "eventAction": params.action,
      "eventLabel": eventLabel
    });
  }
};

var cleverTapPixel = {
  tagActionClick: function(eventName, eventProp) {
    if ( typeof eventName === 'undefined' || typeof cleverTapEvents === 'undefined' ) {
      return;
    }

    if ( ! cleverTapEvents.hasOwnProperty(eventName) ) {
      return;
    }

    var ctEvent = cleverTapEvents[eventName];
    if ( typeof ctEvent.name === 'undefined' ) {
      return;
    }

    var action = ctEvent.name;
    var properties = ( typeof ctEvent.properties !== 'undefined' ) ? ctEvent.properties : {};

    var additonalEventProperties = ( typeof eventProp === 'object' ) ? eventProp : {};    
    var eventTagProperties = {}
    jQuery.extend(eventTagProperties, properties, additonalEventProperties);

    this.trackEvent(action, eventTagProperties);
  },

  trackEvent: function(action, properties) {
    if ( typeof clevertap === 'undefined' || typeof action === 'undefined' || $.trim(action).isEmpty() ) {
      return;
    }

    var finalProperties = {};
    var eventProperties = ( typeof properties === 'object' ) ? properties : {};
    var callbackType = ( eventProperties.hasOwnProperty('callback') ) ? eventProperties.callback : '';
    var callbackProperties = this.callbackProperties(callbackType);
    jQuery.extend(finalProperties, eventProperties, callbackProperties);

    delete finalProperties.callback;

    if ( jQuery.isEmptyObject(finalProperties) ) {
      clevertap.event.push(action);
    } else {
      clevertap.event.push(action, finalProperties);
    }
  },
  
  callbackProperties: function(cType) {
    if ( typeof cType === 'undefined' || $.trim(cType).isEmpty() ) {
      return {};
    }
    
    if ( cType === 'getJobAdEventProperties' ) {
      return ( typeof cleverTapJobadProp !== 'undefined' ) ? cleverTapJobadProp : {};
    }
    
    return {};
  },
  
  showNotificationPriming: function() {
    if ( typeof eventName === 'undefined' ) {
      return;
    }

    clevertap.notifications.push({
      "titleText": 'Would you like to receive Push Notifications?',
      "bodyText": 'We promise to only send you relevant content and give you updates on your transactions',
      "okButtonText": 'Yes!',
      "rejectButtonText": 'No thanks',
      "okButtonColor": '#ff3e97',
      "askAgainTimeInSeconds": 5,
      "serviceWorkerPath": "/sw.js"
   });
  }
};

var frontendTagging = {
  config: {
    signup: {
      type: 'virtual_page',
      name: 'Registration',
      url: '/jobseeker/signup'
    },
    signup_success: {
      type: 'virtual_page',
      name: 'Registration Successful',
      url: '/jobseeker/signup-success'
    },
    signup_error: {
      type: 'virtual_page',
      name: 'Registration Error',
      url: '/jobseeker/signup'
    },
    login: {
      type: 'virtual_page',
      name: 'Jobseeker Login',
      url: '/jobseeker/login'
    },
    home_search_jobs: {
        type: 'event',
        category: 'Home',
        action: 'Search',
        label: 'Find Jobs'
    },
    home_search_add_keywords: {
        type: 'event',
        category: 'Home',
        action: 'Filter_Keywords',
        label: '%s'
    },
    home_search_clear_keywords: {
        type: 'event',
        category: 'Home',
        action: 'Filter_Keywords',
        label: 'Remove Keywords'
    },
    home_search_category: {
        type: 'event',
        category: 'Home',
        action: 'Filter_Category',
        label: '%s'
    },
    home_search_location: {
        type: 'event',
        category: 'Home',
        action: 'Filter_Location',
        label: '%s'
    },
    findjobs_top: {
      type: 'event',
      category: 'Find_Jobs',
      action: 'Back_to_Top',
      label: 'Back to top'
    },
    findjobs_remove_keyword: {
      type: 'event',
      category: 'Find_Jobs',
      action: 'Filter',
      label: 'Remove Keyword'
    },
    findjobs_search_keyword: {
      type: 'event',
      category: 'Find_Jobs',
      action: 'Filter',
      label: 'Keyword - %s'
    },
    findjobs_search_keyword_mobile: {
      type: 'event',
      category: 'Find_Jobs',
      action: 'Mobile_Filter',
      label: 'Keyword - %s'
    },
    findjobs_search_location: {
      type: 'event',
      category: 'Find_Jobs',
      action: 'Filter',
      label: 'Location - %s'
    },
    findjobs_search_location_mobile: {
      type: 'event',
      category: 'Find_Jobs',
      action: 'Mobile_Filter',
      label: 'Location - %s'
    },
    findjobs_search_jobtype: {
      type: 'event',
      category: 'Filter',
      action: 'Filter',
      label: 'Job Type'
    },
    findjobs_search_jobtype_mobile: {
      type: 'event',
      category: 'Find_Jobs',
      action: 'Mobile_Filter',
      label: 'Job Type'
    },
    findjobs_search_jobfunc: {
      type: 'event',
      category: 'Find_Jobs',
      action: 'Filter',
      label: 'Job Function - %s'
    },
    findjobs_search_jobfunc_mobile: {
      type: 'event',
      category: 'Find_Jobs',
      action: 'Mobile_Filter',
      label: 'Job Function'
    },
    findjobs_search_section_category: {
      type: 'event',
      category: 'Find_Jobs',
      action: 'Filter',
      label: 'Language_Category'
    },
    findjobs_search_language_section_mobile: {
      type: 'event',
      category: 'Find_Jobs',
      action: 'Mobile_Filter',
      label: 'Language_Section - %s'
    },
    jobdetail_share: {
      type: 'event',
      category: 'Ad_Detail',
      action: 'Share',
      label: '%s'
    },
    jobdetail_apply: {
      type: 'event',
      category: 'Ad_Detail',
      action: 'Apply',
      label: '%s',
      fb_custom_action: 'Jobseekers Apply Job_Successful'
    },
    jobdetail_applied: {
      type: 'virtual_page',
      name: 'Applied via %s',
      url: ''
    },
    jobdetail_apply_via_app: {
      type: 'virtual_page',
      name: 'Applied via App',
      url: ''
    },
    jobdetail_save: {
      type: 'event',
      category: 'Ad_Detail',
      action: 'Save',
      label: 'Save'
    },
    jobdetail_unsave: {
      type: 'event',
      category: 'Ad_Detail',
      action: 'Unsave',
      label: 'Unsave'
    },
    jobdetail_view_email: {
      type: 'event',
      category: 'Ad_Detail',
      action: 'View_Email',
      label: '%s'
    },
    jobdetail_view_phone: {
      type: 'event',
      category: 'Ad_Detail',
      action: 'View_Phone',
      label: '%s'
    },
    build_profile: {
      type: 'virtual_page',
      name: 'Build Profile',
      url: '/profile/showstrengthenprofile'
    },
    build_empstatus: {
      type: 'event',
      category: 'Profile',
      action: 'Build_Profile',
      label: 'Employment Status'
    },
    build_workexp: {
      type: 'event',
      category: 'Profile',
      action: 'Build_Profile',
      label: 'Work Experience'
    },
    build_education: {
      type: 'event',
      category: 'Profile',
      action: 'Build_Profile',
      label: 'Education'
    },
    profile_add_workexp: {
      type: 'event',
      category: 'Profile',
      action: 'Edit_Profile',
      label: 'Add Work Experience'
    },
    profile_add_workexp_success: {
      type: 'event',
      category: 'Profile',
      action: 'Edit_Profile',
      label: 'Added Work Experience'
    },
    profile_remove_workexp_success: {
      type: 'event',
      category: 'Profile',
      action: 'Edit_Profile',
      label: 'Removed Work Experience'
    },
    profile_add_educ: {
      type: 'event',
      category: 'Profile',
      action: 'Edit_Profile',
      label: 'Add Education'
    },
    profile_add_educ_success: {
      type: 'event',
      category: 'Profile',
      action: 'Edit_Profile',
      label: 'Added Education'
    },
    profile_remove_educ_success: {
      type: 'event',
      category: 'Profile',
      action: 'Edit_Profile',
      label: 'Removed Education'
    },
    profile_update_language: {
      type: 'event',
      category: 'Profile',
      action: 'Edit_Profile',
      label: 'Update Language'
    },
    profile_update_language_success: {
      type: 'event',
      category: 'Profile',
      action: 'Edit_Profile',
      label: 'Updated Language'
    },
    profile_update_skills_success: {
      type: 'event',
      category: 'Profile',
      action: 'Edit_Profile',
      label: 'Updated Skills'
    },
    profile_upload_resume: {
      type: 'event',
      category: 'Profile',
      action: 'Edit_Profile',
      label: 'Upload Resume'
    },
    profile_generate_resume: {
      type: 'event',
      category: 'Profile',
      action: 'Edit_Profile',
      label: 'Generate Resume'
    },
    employer_download_app: {
      type: 'event',
      category: 'EmployerApp',
      action: 'Download',
      label: 'Send to SMS'
    },
    employer_download_app_link_sent: {
      type: 'event',
      category: 'EmployerApp',
      action: 'Dwonload_Link_Sent',
      label: 'SMS Sent'
    },
    employer_request_account_success: {
      type: 'event',
      category: 'Employer_Enquiry',
      action: 'RequestAccount',
      label: 'Request Account Success'
    },
    employer_request_account_failed: {
      type: 'event',
      category: 'Employer_Enquiry',
      action: 'RequestAccount',
      label: 'Request Account Failed'
    },
    employer_jobview_chart_impression: {
        type: 'event',
        category: 'chart',
        action: 'manageapp',
        label: 'Impression'
    },
    employer_jobview_chart_jobview: {
        type: 'event',
        category: 'chart',
        action: 'manageapp',
        label: 'Impression'
    },
    employer_jobview_chart_application: {
        type: 'event',
        category: 'chart',
        action: 'manageapp',
        label: 'Impression'
    },
    employer_jobview_chart_shortlisted: {
        type: 'event',
        category: 'chart',
        action: 'manageapp',
        label: 'Impression'
    },
    employer_jobview_chart_hired: {
        type: 'event',
        category: 'chart',
        action: 'manageapp',
        label: 'Impression'
    }
  },
  
  goalConfig: {
    jobdetail_apply: {
      type: 'event',
      category: 'Apply for Job',
      action: 'Click',
      label: 'Apply for Job'
    }
  },
  
  tagEvent: function(params) {
    if ( ! params || typeof params.name === 'undefined' ) {
      return;
    }

    var name = params.name;
    var label = ( typeof params.label !== 'undefined' && (params.label).trim() !== '' ) ? params.label : '';
    var url = ( typeof params.url !== 'undefined' && (params.url).trim() !== '' ) ? params.url : '';
    var fbCustomEvents = ( typeof params.fb_custom_action !== 'undefined' && (params.fb_custom_action).trim() !== '' ) ? params.fb_custom_action : '';

    /*gtagmanager.tagActionClick(name, label);*/
    ganalytics.tagActionClick(name, label, url);
    fbPixel.tagActionClick(name, label, '', fbCustomEvents);

    // clevertap
    var dynamicProperties = ( typeof params.tagProperties === 'object' ) ? params.tagProperties : {};
    var ctName = name;
    if ( name === 'jobdetail_apply' && ! $.trim(label).isEmpty() ) {
      ctName = name + '_' + label.toLowerCase();
    }
    cleverTapPixel.tagActionClick(ctName, dynamicProperties);
  }
};

$(function() {
  $('body').on('click', '.fj-eventtag', function() {
    var fbeventName = $(this).attr('data-fb-event-name');
    if ( typeof fbeventName !== 'undefined' ) {
      fbPixel.tagActionClick(fbeventName);
    }
    
    var ctEventName = $(this).attr('data-clevertap-event-name');
    if ( typeof ctEventName !== 'undefined' ) {
      cleverTapPixel.tagActionClick(ctEventName);
    }
  });
});