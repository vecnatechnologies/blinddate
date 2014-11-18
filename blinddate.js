/**
 * Requires pickadate (http://amsul.ca/pickadate.js/)
 * Requires momentjs (http://momentjs.com/)
 *
 * Usage:
 * $('.datepicker').blinddate({
 *   format: 'mmmm dd, yyyy',
 *   formatDisplay: 'LL',
 *   formatSubmit: 'mm/dd/yyyy',
 *   selectYears: 100,
 *   selectMonths: true,
 *   min: new Date(1900, 0, 1),
 *   max: new Date(),
 *   today: false,
 *   clear: false,
 *   parser: 'moment'
 * });
 *
 * formatDisplay will override the internal formatting for the input field and instead use moment to format the input field date (format is ignored if formatDisplay is set).
 * If neither formatDisplay nor format are specified then 'LL' is used as the default format using moment.
 *
 * @param {object} pickadateOptions (see: http://amsul.ca/pickadate.js/date.htm#options)
 * @return {jQuery object} Pass through jQuery object
 *
 * @author Justin Paul Silva <justin.silva@vecna.com>
 */

;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function ($) {
  $.fn.extend({
    blinddate: function(_pickadateOptions) {
      var pickadateOptions = _pickadateOptions || {},
          parse;

      // Automatically select parser, if one isn't specified.
      if (typeof pickadateOptions.parser === 'undefined') {
        // Automatically detect parser
        if (typeof Date.create === 'function') {
          pickadateOptions.parser = 'sugar';
        } else if (typeof window.moment === 'function') {
          pickadateOptions.parser = 'moment';
        } else {
          pickadateOptions.parser = 'native';
        }
      }

      /**
       * Parse input with predefined parser and set date picker to correct date
       * @param {String}           value  String to convert to Date
       * @param {Pickadate Object} picker Object returned by $.fn.pickadate('picker')
       */
      parse = function(value, picker) {
        var parsedDate;

        if (pickadateOptions.parser == 'moment') {
          parsedDate = value.length ? moment(new Date(value)) : '';
          if (parsedDate) {
            picker.set('select', [parsedDate.year(), parsedDate.month(), parsedDate.date()]);
          }
        } else if (pickadateOptions.parser == 'sugar') {
          parsedDate = value.length ? Date.create(value) : '';
          if (parsedDate) {
            picker.set('select', [parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()]);
          }
        } else {
          // Native JS
          parsedDate = value.length ? new Date(value) : '';
          if (parsedDate) {
            picker.set('select', [parsedDate.getFullYear(), parsedDate.getMonth(), parsedDate.getDate()]);
          }
        }
      };

      // Set format to formatDisplay when using native JS
      if (typeof pickadateOptions.formatDisplay !== 'undefined' && pickadateOptions.parser === 'native') {
        pickadateOptions.format = pickadateOptions.formatDisplay;
      }

      // Apply plugin to each element individually
      this.each(function() {
        var $this = $(this),
            $inputText = $('<input type="text" class="datepicker-textinput">'),
            $toggle = $('<label for="' + $this.attr('id') + '" class="button datepicker-toggle"><span class="blinddate-icon-calendar"></span></label>'),
            picker;

        $this
          .pickadate(pickadateOptions)  // Apply original pickadate plugin
          .attr('tabindex', '-1')       // Remove element from tab flow
          .before($inputText)           // Insert text input field
          .after($toggle);              // Insert button to toggle date picker

        picker = $this.pickadate('picker');

        // On text input, update date picker
        $inputText.on({
          change: function() {
            parse($inputText.val(), picker);
          }
        });

        // On date picking, update text field
        picker.on({
          set: function() {
            var value = this.get('value');

            if (value && (pickadateOptions.formatDisplay || !pickadateOptions.format)) {
              if (pickadateOptions.parser == 'moment') {
                value = moment(new Date(value)).format(pickadateOptions.formatDisplay || 'LL');
              } else if (pickadateOptions.parser == 'sugar') {
                value = Date.create(value).format(pickadateOptions.formatDisplay || 'short');
              }
            }

            $inputText.val(value);
          }
        });

        // On load, manually set the datepicker value to its current value to display any prepopulated date values
        if (picker.get() !== '') {
          parse(picker.get(), picker);
        }
      });

      // Pass through original jQuery object
      return this;
    }
  });
}));
