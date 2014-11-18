# blinddate.js

## About
Blinddate was created as an accessible extension to [pickadate.js](http://amsul.ca/pickadate.js/).
It was largely inspired by [this mashup of pickadate.js and date.js](http://codepen.io/sixsided/pen/Eldsq).
We decided to use [Moment.js](http://momentjs.com/) for our projects, and so created this plugin to use
moment instead of date.js.

## Requirements
- [jQuery](http://jquery.com/)
- [pickadate.js](http://amsul.ca/pickadate.js/)

Pickadate's picker.js and picker.date.js must be included before using blinddate.

## Optional Dependencies
- [Sugar](http://sugarjs.com/)
- [Moment.js](http://momentjs.com/)

Blinddate will automatically use Sugar or Moment when available. If both are available, blinddate will
use Sugar, since it allows more user-friendly date input. If neither are available, blinddate will
fallback to plain, old Javascript <code>new Date()</code>.

*Note: Blinddate will look for Moment on the global <code>window</code> object since it's not possible to
test the existence of AMD or Node modules.*

## Usage
Blinddate usage is identical to pickadate.
```javascript
$('.datepicker-simple').blinddate();

$('.datepicker-advanced').blinddate({
  format: 'mmmm dd, yyyy',
  formatDisplay: 'LL',
  formatSubmit: 'mm/dd/yyyy',
  selectYears: 100,
  selectMonths: true,
  min: new Date(1900, 0, 1),
  max: new Date(),
  today: false,
  clear: false,
  parser: 'moment'
});
```

### Options
Blind date supports all of [pickadate's options](http://amsul.ca/pickadate.js/date.htm#options),
with two additions:

#### formatDisplay
Formatting options to pass through to the parser. This overrides pickadate's <code>format</code> option.

Parser | Description | Default Value (and Example)
------ | ----------- | -----------------------
Native | Uses pickadate's [formats](http://amsul.ca/pickadate.js/date.htm#formats)   | "d mmmm, yyyy" (26 October, 1985)
Moment | Uses Moment's [date formats](http://momentjs.com/docs/#/displaying/format/) | "LL" (October 21, 2015)
Sugar  | Uses Sugar's [date formats](http://sugarjs.com/dates#formatting_dates)      | "short" (November 12, 1955)

#### parser
Specifies which parser to use. This shouldn't be necessary outside of our demo
and tests.

```javascript
$('#datepicker').blinddate({
  parser: 'native'
});

$('#momentpicker').blinddate({
  parser: 'moment'
});

$('#sugarpicker').blinddate({
  parser: 'sugar'
});
```

## Browser Support
Successfully tested in Chrome 38, Firefox 31, IE 9 and IE 11.

## Credits
Originally developed by [Vecna Technologies, Inc.](http://www.vecna.com/) and open sourced as part of its community service program. See the LICENSE file for more details.
Vecna Technologies encourages employees to give 10% of their paid working time to community service projects.
To learn more about Vecna Technologies, its products and community service programs, please visit http://www.vecna.com.
