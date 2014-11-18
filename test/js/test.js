mocha.setup('bdd');

describe('Convert predefined input values to proper dates', function() {
  it("should work with vanilla JS", function(done) {
    setTimeout(function() {
      $('#datepicker').prev().val().should.be.exactly("31 December, 2014");
      done();
    }, 0);
  });

  it("should work with momentjs", function() {
    $('#momentpicker').prev().val().should.be.exactly("December 31, 2014");
  });

  it("should work with sugarjs", function() {
    $('#sugarpicker').prev().val().should.be.exactly("December 31, 2014");
  });
});

describe('Convert text input to proper dates', function() {
  it("should work with vanilla JS", function() {
    $('#datepicker').prev().val('Nov 22, 2014').change().val().should.be.exactly('22 November, 2014');
  });

  it("should work with momentjs", function() {
    $('#momentpicker').prev().val('Nov 22, 2014').change().val().should.be.exactly('November 22, 2014');
  });

  it("should work with sugarjs", function() {
    $('#sugarpicker').prev().val('11-22-2014').change().val().should.be.exactly('November 22, 2014');
  });
});

describe('Convert date picker selection to proper date', function() {
  it("should work with vanilla JS", function() {
    $('#datepicker').pickadate('clear').set('select', [2014, 9, 15]);
    $('#datepicker').prev().val().should.be.exactly("15 October, 2014");
  });

  it("should work with momentjs", function() {
    $('#momentpicker').pickadate('clear').set('select', [2014, 9, 15]);
    $('#momentpicker').prev().val().should.be.exactly("October 15, 2014");
  });

  it("should work with sugarjs", function() {
    $('#sugarpicker').pickadate('clear').set('select', [2014, 9, 15]);
    $('#sugarpicker').prev().val().should.be.exactly("October 15, 2014");
  });
});

mocha.run();
