var fastjobsToast = {
  success: function(options) {
    if ( ! options || ! options.message ) {
      return;
    }

    var title = options.title || 'OK';
    var message = options.message || '';

    if ( typeof iziToast !== "undefined" ) {
      this._simpleiziToast('success', options);
    } else if ( typeof bootbox !== "undefined" ) {
      
    } else {
      alert(message);
    }
  },
  error: function(options) {
    if ( ! options || ! options.message ) {
      return;
    }

    var title = options.title || 'Error';
    var message = options.message || '';

    if ( typeof iziToast !== "undefined" ) {
      this._simpleiziToast('error', options);
    } else if ( typeof bootbox !== "undefined" ) {
      
    } else {
      alert(message);
    }
  },
  info: function(options) {
    if ( ! options || ! options.message ) {
      return;
    }

    var title = options.title || 'Info';
    var message = options.message || '';

    if ( typeof iziToast !== "undefined" ) {
      this._simpleiziToast('info', options);
    } else if ( typeof bootbox !== "undefined" ) {
      
    } else {
      alert(message);
    }
  },
  warning: function(options) {
    if ( ! options || ! options.message ) {
      return;
    }

    var title = options.title || 'Warning';
    var message = options.message || '';

    if ( typeof iziToast !== "undefined" ) {
      this._simpleiziToast('warning', options);
    } else if ( typeof bootbox !== "undefined" ) {
      
    } else {
      alert(message);
    }
  },
  show: function(options) {
    if ( ! options || ! options.message ) {
      return;
    }

    var title = options.title || '';
    var message = options.message || '';

    if ( typeof iziToast !== "undefined" ) {
      var toastSettings = {
        title: title,
        titleColor: options.titleColor || '',
        titleSize: options.titleSize || '',
        titleLineHeight: options.titleLineHeight || '',
        message: message,
        messageColor: options.messageColor || '',
        messageSize: options.messageSize || '',
        messageLineHeight : options.messageLineHeight  || '',
        position: options.position || 'topRight',
        layout: options.layout || 1,
        theme: options.theme || 'dark',
        backgroundColor: options.backgroundColor || '',
        close: options.close || false,
        overlay: options.overlay || false,
        zindex: options.zindex || 1062,
        color: options.color || '',
        icon: options.icon || '',
        iconColor: options.iconColor || '',
        target: options.target || '',
        balloon: ( typeof options.balloon !== "undefined") ? options.balloon : false,
        timeout: ( typeof options.timeout !== "undefined") ? options.timeout : 3000,
        progressBarColor: options.progressBarColor || '',
        drag: ( typeof options.drag !== "undefined") ? options.drag : true,
        inputs: options.inputs || {},
        buttons: options.buttons || {},
        transitionIn: options.transitionIn || 'bounceInLeft',
        transitionOut: options.transitionOut || 'fadeOut'
      };

      this._iziToastShow(toastSettings);
    } else if ( typeof bootbox !== "undefined" ) {
      
    } else {
      alert(message);
    }
  },
  destroy: function() {
    if ( typeof iziToast !== "undefined" ) {
      iziToast.destroy();
    }
  },
  question: function(options) {
    if ( ! options || ! options.message ) {
      return;
    }

    var title = options.title || '';
    var message = options.message || '';

    if ( typeof iziToast !== "undefined" ) {
      var toastSettings = {
        id: options.id || 'toastQuestion',
        close: options.close || false,
        overlay: options.overlay || true,
        toastOnce: options.toastOnce || true,
        zindex: options.zindex || 1062,
        title: title,
        titleColor: options.titleColor || '',
        titleSize: options.titleSize || '16px',
        titleLineHeight: options.titleLineHeight || '24px',
        message: message,
        messageColor: options.messageColor || '',
        messageSize: options.messageSize || '',
        messageLineHeight : options.messageLineHeight  || '',
        position: options.position || 'center',
        layout: options.layout || 3,
        theme: options.theme || 'light',
        backgroundColor: options.backgroundColor || '',
        color: options.color || '',
        icon: options.icon || '',
        iconColor: options.iconColor || '',
        target: options.target || '',
        balloon: ( typeof options.balloon !== "undefined") ? options.balloon : false,
        timeout: ( typeof options.timeout !== "undefined") ? options.timeout : false,
        progressBarColor: options.progressBarColor || '',
        drag: ( typeof options.drag !== "undefined") ? options.drag : true,
        inputs: options.inputs || {},
        buttons: options.buttons || {},
        transitionIn: options.transitionIn || 'bounceInUp',
        transitionOut: options.transitionOut || 'fadeOutDown'
      };

      iziToast.question(toastSettings);
    } else if ( typeof bootbox !== "undefined" ) {
      
    } else {
      alert(message);
    }
  },
  _simpleiziToast: function(type, options) {
    if ( ! options || ! options.message || typeof iziToast === "undefined" ) {
      return;
    }

    var title = options.title || 'OK';
    var message = options.message || '';
    var position = options.position || 'topRight';
    var timeout = options.timeout || 3000;
    
    var toastType = type || 'info';
    var color;
    var icon;
    switch(toastType) {
      case 'success':
        color = "green";
        icon = "fa fa-check-circle";
        break;
      case 'error':
        color = "red";
        icon = "fa fa-times-circle";
        break;
      case 'warning':
        color = "yellow";
        icon = "ico-warning";
        break;
      case 'info':
      default:
        color = "blue";
        icon = "ico-info";
        break;
    }

    this._iziToastShow({
      title: title,
      message: message,
      position: position,
      color: color,
      icon: icon,
      timeout: timeout,
      close: options.close || false,
      overlay: options.overlay || false,
      balloon: ( typeof options.balloon !== "undefined") ? options.balloon : false,
      transitionIn: options.transitionIn || 'bounceInLeft',
      transitionOut: options.transitionOut || 'fadeOut'
    });
  },
  _iziToastShow: function(options) {
    if ( ! options || ! options.message || typeof iziToast === "undefined" ) {
      return;
    }

    iziToast.show(options);
  }
};