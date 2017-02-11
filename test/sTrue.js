let sTrue;

(function() {

  /*
   * Global tests messages
   */
  const passed = "* OK *";
  const failed = "*** FAILED ***";

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
    title = `@test: "${m}"`
    logg(title, indent, "");
    underline(title, indent, "´");
    t.call(this);
  }

  /*
   * log
   */
  const logg = (msg, leftMargin, charLeftMargin) => {
    log(`${" ".repeat(leftMargin)}${msg}`);
  }

  /**
   * Underline (log) string str with c character and p prefix margin
   */
  function underline(str, p, c) {
    log(`${" ".repeat(p)}${c.repeat(str.length)}`);
  }

  /**
   * A custom test message
   * @param {boolean} the result of test
   * @param {string} custom test message
   * @param {string} the restul of the test in string
   * @return {boolean}
   */
  function resultMsg(i, msg, result) {
    logg(`{${result}} ${msg}`, indent)
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
      let result = failed;
      if (e) { result = passed; }
      if (!msg) { msg = "Should be true"; }
      resultMsg(e, msg, result);
    },

    /**
     * Pass the test if 'e' is false
     * @return {boolean}
     */
    isFalse: function (e, msg) {
      let result = failed;
      if (!e) { result = passed; }
      if (!msg) { msg = "Should be false"; }
      resultMsg(e, msg, result);
    },

    /**
     * Pass the test if 'a' is equal to 'b'
     * @return {boolean}
     */
    isEqual: function (a, b, msg) {
      let result = failed;
      let e = a == b;
      if (e) { result = passed; }
      if (!msg) { msg = "Should be equal"; }
      resultMsg(e, msg, result);
    },

    /**
     * Pass the test if 'a' is not equal to 'b'
     * @return {boolean}
     */
    isNotEqual: function (a, b, msg) {
      let result = failed;
      let e = a == b;
      if (!e) { result = passed; }
      if (!msg) { msg = "Should be not equal"; }
      resultMsg(e, msg, result);
    },

    /**
     * Pass the test if the class of 'a' is equal to 'b'
     * @return {boolean}
     */
    isClass: function (a, b, msg) {
      let result = failed;
      let e = a.class() == b;
      if (e) { result = passed; }
      if (!msg) { msg = "Should be " + b; }
      resultMsg(e, msg, result);
    },

    /**
     * Pass the test if the type of 'a' is equal to 'b'
     * @return {boolean}
     */
    isTypeof: function (a, b, msg) {
      let result = failed;
      let e = typeof(a) === b;
      if (e) { result = passed; }
      if (!msg) { msg = "Should be typeof: " + b; }
      resultMsg(e, msg, result);
    }

  };

}());
