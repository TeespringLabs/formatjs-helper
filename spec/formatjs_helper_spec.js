var formatJSHelper = require('../formatjs_helper');

console.log('sup', formatJSHelper);

describe('formatJSHelper', function() {
  var data;

  beforeEach(function() {
    data = {
      locales: 'en-US',
      messages: {
        homeTemplate: {
          title: 'Home'
        }
      }
    };
  });

  describe('getLocale', function() {
    it('returns the locale in the data', function() {
      formatJSHelper.initialize(data);

      expect(formatJSHelper.getLocale()).toBe('en-US');
    });

    it('returns an empty string if no locale in data', function() {
      data.locales = undefined;

      formatJSHelper.initialize(data);

      expect(formatJSHelper.getLocale()).toBe('');
    });
  });

  describe('getLocaleLanguage', function() {
    it('returns only the language from a full locale string', function() {
      formatJSHelper.initialize(data);

      expect(formatJSHelper.getLocaleLanguage()).toBe('en');
    });

    it('returns only the language from a locale string with only a lanuguage', function() {
      data.locales = 'en';

      formatJSHelper.initialize(data);

      expect(formatJSHelper.getLocaleLanguage()).toBe('en');
    });

    it('returns an empty string if no locale in data', function() {
      data.locales = undefined;

      formatJSHelper.initialize(data);

      expect(formatJSHelper.getLocaleLanguage()).toBe('');
    });
  });

  describe('get', function() {
    it('returns the correct language string in a typical use case', function() {
      formatJSHelper.initialize(data);

      expect(formatJSHelper.get('homeTemplate', 'title')).toBe('Home');
    });

    it('returns the correct language string at many depths', function() {
      var key = 'imakey';
      var value = 'imaval';
      formatJSHelper.initialize(data);
      var obj = data.messages;
      var args = [key];

      for (var i = 0; i < 10; i++) {
        obj[key] = value;

        expect(formatJSHelper.get.apply(formatJSHelper, args)).toBe(value);

        obj[key] = {};
        obj = obj[key];
        args.push(key);
      }
    });
  });

  describe('getIntl', function() {
    it('returns the full intl data object', function() {
      formatJSHelper.initialize(data);

      expect(formatJSHelper.getIntl()).toBe(data);
    });
  });

  describe('getData', function() {
    it('returns the intl data under the intl key', function() {
      formatJSHelper.initialize(data);

      expect(formatJSHelper.getData()).toEqual({intl: data});
    });
  });

  describe('getOptions', function() {
    it('returns the intl data under the intl key under the data key', function() {
      formatJSHelper.initialize(data);

      expect(formatJSHelper.getOptions()).toEqual({ data: {intl: data}});
    });
  });
});
