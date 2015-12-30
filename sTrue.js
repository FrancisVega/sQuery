var sTrue;

(function(){

  sTrue = function(testName) {
    return new STRUE(testName);
  };


  var STRUE = function(testName) {
    this.testName = testName;

  }

  /* @sTrue API */
  sTrue.fn = STRUE.prototype = {

    // Assert
    assertTrue: function(a, msg) {
      if (a === true) {
        log(this.testName + " >> " + "Passed!");
        return a
      } else {
        if(msg == undefined) {
          msg = "(assertTrue): Test Fail! - " + a + " is not true"
        }
        log(this.testName + " >> " + msg);
      }
    },

    // Assert
    assertFalse: function(a, msg) {
      if (a === false) {
        log(this.testName + " >> " + "Passed!");
        return a
      } else {
        if(msg == undefined) {
          msg = "(assertFalse): Test Fail! - " + a + " is not false"
        }
        log(this.testName + " >> " + msg);
      }
    },

    // Assert
    assertEqual: function(a, b, msg) {
      if (a == b) {
        log(this.testName + " >> " + "Passed!");
        return a
      } else {
        if(msg == undefined) {
          msg = "(assertEqual): Test Fail! - " + a + " and " + b + " are not equal";
        }
        log(this.testName + " >> " + msg);
      }
    },

    // Assert
    assertNotEqual: function(a, b, msg) {
      if (a != b) {
        log(this.testName + " >> " + "Passed!");
        return a
      } else {
        if(msg == undefined) {
          msg = "(assertNotEqual): Test Fail! - " + a + " and " + b + " are equal";
        }
        log(this.testName + " >> " + msg);
      }
    },

    // Assert
    assertStrictEqual: function(a, b, msg) {
      if (a === b) {
        log(this.testName + " >> " + "Passed!");
        return a
      } else {
        if(msg == undefined) {
          msg = "(assertStrictEqual): Test Fail! - " + a+"("+typeof(a)+")" + " and " + b +"("+typeof(b)+")"+ " are not strict equal";
        }
        log(this.testName + " >> " + msg);
      }
    },

    // Assert
    assertStrictNotEqual: function(a, b, msg) {
      if (a !== b) {
        log(this.testName + " >> " + "Passed!");
        return a
      } else {
        if(msg == undefined) {
          msg = "(assertStrictEqual): Test Fail! - " + a+"("+typeof(a)+")" + " and " + b +"("+typeof(b)+")"+ " are strict equal";
        }
        log(this.testName + " >> " + msg);
      }
    }
  }
}
)();
