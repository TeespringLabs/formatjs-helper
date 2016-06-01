# FormatJSHelper

FormatJSHelper is a simple wrapper for your localization message data that makes working with data in the formats needed by FormatJS easy.

## Usage

To start, initialize the object with your message data (formatted according to [ICU Message Syntax](http://userguide.icu-project.org/formatparse/messages)) as the single parameter:

    formatJSHelper.initialize({
      locales: 'en-US',
      messages: {...}
    });

Then you're ready to use FormatJSHelper.  A simple usage is getting a string from your messages:

    formatJSHelper.get('path', 'to', 'your', 'message');

If you want to format that message using FormatJS's [IntlMessageFormat](https://github.com/yahoo/intl-messageformat), this is what you would do:

    var message = new IntlMessageFormat(formatJSHelper.get('path', 'to', 'your', 'message'), formatJSHelper.getLocale());
    message.format();

If you're using FormatJS with templates, the format that the localization data is required in is slightly different, but you can easily fetch what you need in this format like this:


      myHandlebarsTemplate({
        ...
      }, formatJSHelper.getOptions());

To see all methods available for FormatJSHelper, check out the well-documented source!

## Tests

Tests are located in the `spec/` folder.  You can run them with the command:

    npm test

## License

This project is licensed under the Apache License v2.0.  See LICENSE.md.
