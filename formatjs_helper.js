var formatJSHelper = {
  /**
   * Initialize this helper on a set of data
   * Must be called before any other method
   * @param {Object} data, ICU Message Format {locales: '<locale string>', messages: {...}}
   */
  initialize(data) {
    this.data = data;

    return this;
  },

  /**
   * Get the locale string
   * @returns {String}
   */
  getLocale: function() {
    if (this.data && this.data.locales) {
      return this.data.locales;
    } else {
      return '';
    }
  },

  /**
   * Get the language string only from the locale
   * if locale is en, returns en
   * if locale is en-US, returns en
   * @returns {String}
   */
  getLocaleLanguage: function() {
    var locale = this.getLocale();
    if (locale.indexOf('-') !== -1) {
      return locale.substr(0, locale.indexOf('-'));
    } else {
      return locale;
    }
  },

  /**
   * Get a specific string at the given location if it exists, else empty string
   * @params {String} any number of keys to the location of the message
   * @returns {String}
   */
  get: function() {
    if (!this.data || !this.data.messages) {
      return '';
    }

    var obj = this.data.messages;
    var value;

    for (var i = 0; i < arguments.length; i++) {
      value = obj[arguments[i]];

      if (!value) {
        return '';
      } else {
        obj = value;
      }
    }

    return value;
  },

  /**
   * Gets intl data formatted for direct use in Formatjs
   * Could be used with Formatjs like this:
   *
   *   myTemplate({}, formatjsHelper.getOptions());
   *
   * @returns {Object}
   */
  getOptions: function() {
    return {
      data: this.getData()
    };
  },

  /**
   * Gets the intl data formatted to be used as the data option in Formatjs
   * Could be used with Formatjs like this:
   *
   *   myTemplate({}, {
   *     imanoption: true,
   *     data: formatjsHelper.getData()
   *   });
   *
   * @returns {Object}
   */
  getData: function() {
    return {
      intl: this.getIntl()
    };
  },

  /**
   * Gets the full internationalization object
   * Could be used with Formatjs like this:
   *
   *  myTemplate({}, {
   *    imanoption: true,
   *    data: {
   *      words: 'lalala',
   *      intl: formatjsHelper.getIntl()
   *    }
   *  });
   *
   * @returns {Object}
   */
  getIntl: function() {
    return this.data;
  }
};

module.exports = formatJSHelper;
