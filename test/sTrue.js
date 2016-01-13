
var sTrue;

(function() {

  /*
   * Global tests messages
   */
  var passed = "* OK *";
  var failed = "*** FAILED ***";

  /*
   * Constructor
   */
  sTrue = function(m, t) {
    indent = 2;
    return new STRUE(m, t);
  }

  /*
   * sTrue
   */
  var STRUE = function(m, t) {
    log("");
    title = "@test: \""+ m +"\"";
    logg(title, indent, "");
    underline(title, indent, "´");
    t.call(this);
  }

  /*
   * log
   */
  function logg(msg, leftMargin, charLeftMargin) {
    var margin = "";
    for (var i=0; i<leftMargin; i++) { margin += " "; }
    log(margin + msg);
  }

  /**
   * Print s string t times.
   */
  function printy(s, t) {
    for(var i=0, _s=""; i<t; i++) { _s += s; }
    return _s;
  }

  /**
   * Underline (log) string str with c character and p prefix margin
   */
  function underline(str, p, c) {
    var u = "";
    u = printy(" ", p);
    u += printy(c, str.length);
    log(u);
  }

  /**
   * A custom test message
   * @param {boolean} the result of test
   * @param {string} custom test message
   * @param {string} the restul of the test in string
   * @return {boolean}
   */
  function resultMsg(i, msg, result) {
    logg("{"+result+"}" + " " + msg, indent)
  }

  sTrue.fn = STRUE.prototype = {

    /*
     *assert: {
     *  isTrue: function(e, msg) {
     *    var result = failed;
     *    if (e) { result = passed; }
     *    if (!msg) { msg = "Should be true"; }
     *    resultMsg(e, msg, result);
     *  }
     *},
     */

    /**
     * Pass the test if 'e' is true
     * @return {boolean}
     */
    isTrue: function (e, msg) {
      var result = failed;
      if (e) { result = passed; }
      if (!msg) { msg = "Should be true"; }
      resultMsg(e, msg, result);
    },

    /**
     * Pass the test if 'e' is false
     * @return {boolean}
     */
    isFalse: function (e, msg) {
      var result = failed;
      if (!e) { result = passed; }
      if (!msg) { msg = "Should be false"; }
      resultMsg(e, msg, result);
    },

    /**
     * Pass the test if 'a' is equal to 'b'
     * @return {boolean}
     */
    isEqual: function (a, b, msg) {
      var result = failed;
      var e = a == b;
      if (e) { result = passed; }
      if (!msg) { msg = "Should be equal"; }
      resultMsg(e, msg, result);
    },

    /**
     * Pass the test if 'a' is not equal to 'b'
     * @return {boolean}
     */
    isNotEqual: function (a, b, msg) {
      var result = failed;
      var e = a == b;
      if (!e) { result = passed; }
      if (!msg) { msg = "Should be not equal"; }
      resultMsg(e, msg, result);
    },

    /**
     * Pass the test if the class of 'a' is equal to 'b'
     * @return {boolean}
     */
    isClass: function (a, b, msg) {
      var result = failed;
      var e = a.class() == b;
      if (e) { result = passed; }
      if (!msg) { msg = "Should be " + b; }
      resultMsg(e, msg, result);
    },

    /**
     * Pass the test if the type of 'a' is equal to 'b'
     * @return {boolean}
     */
    isTypeof: function (a, b, msg) {
      var result = failed;
      var e = typeof(a) === b;
      if (e) { result = passed; }
      if (!msg) { msg = "Should be typeof: " + b; }
      resultMsg(e, msg, result);
    }

  };

}());
