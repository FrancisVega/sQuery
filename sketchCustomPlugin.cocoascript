@import 'zen.sketchplugin/contents/sketch/squery/squery.js';
@import 'zen.sketchplugin/contents/sketch/squery/plugins/core.move.js';
@import 'zen.sketchplugin/contents/sketch/squery/plugins/core.aregroups.js';
@import 'zen.sketchplugin/contents/sketch/squery/plugins/core.areshapes.js';

log("start test");

// sTrue
@import 'zen.sketchplugin/contents/sketch/squery/sTrue.js';

// Try sTrue
var test = sTrue("sQuery");

log("Passeds tests");
// Passed!
test.assertTrue(1==1);
test.assertFalse(0==1);
test.assertEqual("1", 1);
test.assertNotEqual("hello", "bye");
test.assertStrictEqual("hello", "hello");
test.assertStrictNotEqual("hello", "bye");

log("\n");
log("Not Passeds with auto msgs");
// Not Passed without msgs
test.assertTrue(0==1);
test.assertFalse(1==1);
test.assertEqual("a", "A");
test.assertNotEqual("1", 1);
test.assertStrictEqual("1", 1);
test.assertStrictNotEqual("1", "1");

log("\n");
log("Not Passeds with custom msgs");
// Not Passed!
test.assertTrue(0==1, "Needs return true! and 0 == 1 is false");
test.assertFalse(1==1, "Needs return false! and 1 == 1 is true");
test.assertEqual("a", "A", "Needs to be equal! and \"a\" == \"A\" are not equal");
test.assertNotEqual("1", 1, "Needs to be not equal!!! and \"1\" == 1 are equal");
test.assertStrictEqual("1", 1, "Needs to be strict equal! and \"1\" === 1 is not strict equal");
test.assertStrictNotEqual("1", "1", "Needs to be strict not equal! and \"1\" === \"1\" is strict equal");


log("end test")

// Test it
// @import 'zen.sketchplugin/contents/sketch/squery/squerytest.cocoascript';


