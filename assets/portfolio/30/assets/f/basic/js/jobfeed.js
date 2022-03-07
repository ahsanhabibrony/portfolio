var search = {
    filter: function() {

        var searchUrl = $('#fj-navbar').attr('data-search-url');
        var q = $("input[name='q']").val();
        var loc = $("input[name='loc']").val();
        var city = $("input[name='city']").val();
        var locText = $("input[name='loc-text']").val();
        
        q = this.encodeHTML(q);

        var jt = [];
        var jtTexts = [];
        $.each($("input[name='jt']:checked"), function(){
            jt.push($(this).val());
            
            var jtInputId = $(this).attr('id');
            var jobType = $('label[for="'+jtInputId+'"]').text();
            if ( jobType !== '' ) {
                jobType = jobType.replace(/[^a-zA-Z0-9- \.]+/g, '');
                jobType = jobType.replace(/\s+/g, '-').toLowerCase();
                jtTexts.push(jobType);
            }
        });

        var jf = [];
        var jfTexts = [];
        var isAllJobFunctions = false;
        $.each($("input[name='jf']:checked"), function(){
            if ($(this).val() === 0 || $(this).val() === '0') {
                isAllJobFunctions = true;
            } else {
                jf.push($(this).val());

                var jfInputId = $(this).attr('id');
                var jobFunc = $('label[for="'+jfInputId+'"]').text();
                if ( jobFunc !== '' ) {
                    jobFunc = jobFunc.replace(/[^a-zA-Z0-9- \.]+/g, '');
                    jobFunc = jobFunc.replace(/\s+/g, '-').toLowerCase();
                    jfTexts.push(jobFunc);
                }
            }
        });
        
        var form = searchUrl;

        if ( locText !== '' ) {
            form += locText + '/';
        }
        
        if ( isAllJobFunctions === false && jfTexts.length > 0 && jfTexts.length < $("input[name='jf']").length ) {
            form += jfTexts.join('--') + '-jobs/';
        }
        
        if ( jtTexts.length > 0 && jtTexts.length < $("input[name='jt']").length ) {
            form += jtTexts.join('--') + '-jobs/';
        }

        if ( q !== '' ) {
            form += q.replace(/\s+/g, '-') + '-jobs-search';
        }

        $(location).attr('href', form);

        return false;
    },
    
    removeKeyword: function() {
        $("input[name='q']").val('');
        
        ga('send', 'event', 'Filter', 'Keyword', 'Remove Keyword');

        search.filter();
    },
    
    all: function(params) {
        if ( ! params ) return;

        var $container = $(params.container);
        var currPage = params.currPage;
        var totalPages = params.totalPages;
        var joblistUrl = params.joblistUrl;
        var page = 2;
        var perpage = $container.data('per-page');

        $container.masonry({ itemSelector: '.adbox', isFitWidth: false });
        $container.infinitescroll({
                //set the correct path for next page
                path: function generatePageUrl(currentPageNumber){
                    return joblistUrl + 'next-' + (currPage * perpage);
                },            
                loading: {
                    img: '/img/basic/pixel.gif',
                    msgText: ' ',
                    finishedMsg: ' '
                },
                extraScrollPx: 0,
                maxPage : totalPages,
                prefill: true,
                navSelector  : 'a.next-page:last',    // selector for the paged navigation
                nextSelector : 'a.next-page:last',  // selector for the NEXT link (to page 2)
                itemSelector : '.adbox'     // selector for all items you'll retrieve
            },
            // trigger Masonry as a callback
            function( newElements ) {
                var $newElems = $( newElements );
                $container.masonry( 'appended', $newElems );
                var pageTitle = $(document).attr('title');
                pageTitle = pageTitle.replace('| FastJobs', '');
                pageTitle = pageTitle.replace(/Page [0-9]/gi, '');
                
                pageTitle = pageTitle + '| Page ' + page + ' | FastJobs';
                var pageUrl = joblistUrl + 'page-' + page;

                ga('send', {
                     'hitType': 'pageview',
                     'title': pageTitle,
                     'location': pageUrl,
                     'page': pageUrl
                });

                page++;
                currPage++;

                $(".img-coylogo").unveil(300);
                
                
            }
        );
    },
    
    encodeHTML: function(s) {
        return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }
};

var fastjobsJobPixel = {
  sendImpression: function(jid, coyid, page, pos, callback) {
    var jobpixel = $('#jobslist').attr('data-jobpixel');

    if ( typeof jid === 'undefined' || 
         typeof coyid === 'undefined' || 
         typeof page === 'undefined' || 
         typeof pos === 'undefined' || 
         typeof jobpixel === 'undefined' || 
         $.trim(jobpixel).isEmpty() ) {
      return false;
    }
    
    var csrfToken = '';
    if ( $('meta[name="csrf-token"]').length > 0 ) {
      csrfToken = $('meta[name="csrf-token"]').attr("content");
    }

    var q = $("input[name='q']").val();
    q = search.encodeHTML(q);

    var loc = $("input[name='loc']").val();
    var st = $("input[name='st']:checked").val();
    var jc = $("input[name='jc']:checked").val();
    var jt = [];
    $.each($("input[name='jt']:checked"), function() {
      jt.push($(this).val());
    });

    var jf = [];
    $.each($("input[name='jf']:checked"), function() {
      var val = parseInt($(this).val());
      if ( val !== 0 ) {
        jf.push(val);
      }
    });

    $.ajax({
      method: 'POST',
      url: jobpixel,
      cache: false,
      data: {
        _csrf: csrfToken, 
        jid: jid, 
        coyid: coyid, 
        page: page, 
        pos: pos,
        q: q,
        st: st,
        loc: loc,
        jc: jc,
        jt: jt,
        jf: jf
      },
      dataType: 'json',
      xhrFields: { withCredentials: true },
      success: function(data) {
        var response = (typeof data.isSuccess !== 'undefined' && ( data.isSuccess === '1' || data.isSuccess === 1 ) );

        if ( typeof callback === 'function' ) {
          callback(response)
        }

        return response;
      },
      error: function() {
        return false;
      }
    });
  },
  
  isScrolledIntoView: function(elem) {
    var $elem = $(elem);
    var $window = $(window);

    var docViewTop = $window.scrollTop();
    var docViewBottom = docViewTop + $window.height();

    var elemTop = $elem.offset().top;
    var elemBottom = elemTop + $elem.height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }
};


/* Hide navbar search on scroll down */
var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('#navbar-search').outerHeight();

function hasScrolled() {
    var st = $(this).scrollTop();

    if(Math.abs(lastScrollTop - st) <= delta) {
        return;
    }

    if (st > lastScrollTop && st > navbarHeight){
        $('#navbar-search').removeClass('nav-down').addClass('nav-up');
    } else {
        if(st + $(window).height() < $(document).height()) {
            $('#navbar-search').removeClass('nav-up').addClass('nav-down');
        }
    }
    lastScrollTop = st;
}

$(function(){
  $(window).scroll(function(){
    didScroll = true;

    $('.ad-detail-link').each(function(){
      if(fastjobsJobPixel.isScrolledIntoView($(this))){
        var $elm = $(this);
        var jid = $elm.attr('data-job-id');
        var coyid = $elm.attr('data-coyid');
        var page = $elm.attr('data-page');
        var pos = $elm.attr('data-pos');
        if ( typeof jid !== 'undefined' && ! $.trim(jid).isEmpty() && ! $elm.hasClass('visible') && ! $elm.hasClass('jobimpress') ) {
          $elm.addClass('jobimpress');
          fastjobsJobPixel.sendImpression(jid, coyid, page, pos, function(response) {
            if ( response ) {
              $elm.addClass('visible');
            } else {
              $elm.removeClass('visible jobimpress');
            }
          });
        }
      }
    });
  });

    $('.icheck').iCheck({
      checkboxClass: 'icheckbox_minimal',
      radioClass: 'iradio_minimal',
      increaseArea: '20%' // optional
    });
    
    $(".img-coylogo").unveil(300);

    setInterval(function() {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 250);
    
    $("#remove-q").on('click', function(e){
        e.preventDefault();

        search.removeKeyword();
    });

      $("input[name='q']").on('keyup', function(e){
        e.preventDefault();

        if(e.keyCode === 13) {
            search.filter();
            return false;
        }
      });

      $("#location-option").on('change', function(){
          $("input[name='loc']").val($(this).val());
          $("input[name='city']").val('');
          $("input[name='loc-text']").val('');
          
          var loc = $(this).find("option:selected").text();
          if ( loc !== '' ) {
            ga('send', 'event', 'Filter', 'Location', loc);
          }
          
          option = $(this).find('option:selected');
          if ( option.attr('data-locid') ) {
              $("input[name='loc']").val(option.attr('data-locid'));
              $("input[name='city']").val($(this).val());
          }
          
          $("input[name='loc-text']").val($(this).find('option:selected').attr('data-loctext'));

          search.filter();
      });
      
      $("#location-state-option").on('change', function(){
          var loc = $(this).find("option:selected").text();

          $("input[name='loc_ste']").val($(this).val());
          $("input[id='loc-ste-text']").val(loc);

          if ( loc !== '' ) {
            ga('send', 'event', 'Filter', 'Location State', loc);
          }

          search.filter();
      });

      $("input[name='q']").on('blur', function(e){
        e.preventDefault();

        search.filter();
        return false;
      });

      $('input[name="jt"]').on('ifChanged', function(e){
        e.preventDefault();
        
        var jobTyp = ( $('label[for="jt-'+$(this).val()+'"]').text() !== '' ) ? $('label[for="jt-'+$(this).val()+'"]').text() : '';
        var jobTypAction = ( $(this).is(':checked') ) ? 'Include ' : 'Exclude '; 
        if ( jobTyp !== '' ) {
            ga('send', 'event', 'Filter', 'Job Type', jobTypAction + jobTyp);
        }

        search.filter();
        return false;
      });

      $('#jf-0').on('ifChanged', function(){  
        if ( $('#jf-0').is(':checked') ) {
            $(".input-jf").iCheck('uncheck');
        }

        search.filter();
      });

      $('.input-jf').on('ifChanged', function(){
        if ( $('#jf-0').is(':checked') ) {
            $('#jf-0').iCheck('uncheck');
        }

        var jobFunc = ( $('label[for="jf-'+$(this).val()+'"]').text() !== '' ) ? $('label[for="jf-'+$(this).val()+'"]').text() : '';
        var jobFuncAction = ( $(this).is(':checked') ) ? 'Include ' : 'Exclude '; 

        if ( jobFunc !== '' ) {
            ga('send', 'event', 'Filter', 'Job Function', jobFuncAction + jobFunc);
        }

        search.filter();
      });

      /* mobile */
      $("#q-mobile").on('keyup', function(e){
        e.preventDefault();

        if(e.keyCode === 13) {
            $("input[name='q']").val($(this).val());

            search.filter();
        }
      });

      $('#q-mobile').on('blur', function(e){
          e.preventDefault();
          $("input[name='q']").val($(this).val());

          search.filter();
      });

      $('.mobile-location-filter').on('click', function(e){
          e.preventDefault();
          
          var city = 0;
          var loc = $(this).attr('data-value');
          var loctype = $(this).attr('data-loctype');
          var loctext = $(this).attr('data-loctext');
          
          if ( loctype == 'city' ) {
              city = $(this).attr('data-value');
              loc  = $(this).attr('data-locid');
          }
          
          loctype = ( typeof loctype !== 'undefined' ) ? loctype : 'loc';

          $("input[name='loc']").val('');
          $("input[name='city']").val('');
          $("input[name='loc-text']").val('');

          if ( loc === 0 && loc === '0' ) {
              search.filter();
              return false;
          }

          // remove this once we support the filter by cities
          $("input[name='loc']").val(loc);
          $("input[name='city']").val(city);
          $("input[name='loc-text']").val(loctext);

          search.filter();
          return false;
      });
      
      $('body').on('click', '#cancel-filter-location-states', function(e){
        e.preventDefault();
         
        var $statesModal = $('#modal-mobile-filter-location-states');

        if ( $statesModal.length ) {
            $statesModal.modal('hide');
            $('#modal-mobile-filter-location').modal('show');
            $statesModal.on('hidden.bs.modal', function () {
               $statesModal.remove();
            });
        }
      });
      
      $('body').on('click', '.mobile-location-state-filter', function(e){
          e.preventDefault();
          
          var dataValue = $(this).attr('data-value');

          if ( typeof(dataValue) !== 'undefined' ) {
            $("input[name='loc']").val($(this).attr('data-loc'));
            $("input[name='loc_ste']").val($(this).attr('data-value'));
            $("input[id='loc-ste-text']").val($(this).text());
          } else {
            $("input[name='loc']").val($(this).attr('data-loc'));
            $("input[name='loc_ste']").val('');
            $("input[id='loc-ste-text']").val('');
          }

          search.filter();
      });

      $('.input-mb-jf').on('ifChanged', function(e){
        if ( $('#mb-jf-0').is(':checked') ) {
            $('#mb-jf-0').iCheck('uncheck');
        }
      });

      $('#done-mobile-filter-jfunction').on('click', function(e){
         e.preventDefault(); 

        if ( $('#mb-jf-0').is(':checked') ) {
            $('#jf-0').iCheck('check');
        } else {
            $.each($(".input-mb-jf"), function(){
                if ( $(this).prop('checked') ) {
                    $('#jf-' + $(this).val()).iCheck('check');
                } else {
                    $('#jf-' + $(this).val()).iCheck('uncheck');
                }
            });
        }

        search.filter();
      });

      $('#done-mobile-filter-options').on('click', function(e){
         e.preventDefault();

        $.each($("input[name='mb_jt']"), function(){
            if ( $(this).prop('checked') ) {
                $('#jt-' + $(this).val()).iCheck('check');
            } else {
                $('#jt-' + $(this).val()).iCheck('uncheck');
            }
        });

        var s0 = $('#mobile-min-salary').val();
        var sp = $('#mobile-salary-period').val();

        $("input[name='s0']").val(s0);
        $("input[name='sp']").val(sp);

        search.filter();
      });

      $('.mobile-salary-period').click(function(){
          $('#mobile-salary-period').val($(this).val());
          $('#mobile-salary-period-text').text($(this).html());
      });

      $('#mobile-filter-location').on('click', function(){
          $('#modal-mobile-filter-location').modal('show');
      });

      $('#mobile-filter-jfunction').on('click', function(){
          $('#modal-mobile-filter-jfunction').modal('show');
      });

      $('#mobile-filter-options').on('click', function(){
          $('#modal-mobile-filter-options').modal('show');
      });
});