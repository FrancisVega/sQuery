// sQuery
@import 'zen.sketchplugin/Contents/Sketch/sQuery/sQuery.js';
@import 'zen.sketchplugin/Contents/Sketch/sQuery/plugins/core.move.js';
@import 'zen.sketchplugin/Contents/Sketch/sQuery/plugins/core.areFroups.js';
@import 'zen.sketchplugin/Contents/Sketch/sQuery/plugins/core.areShapes.js';

// sTrue
@import 'zen.sketchplugin/contents/sketch/sTrue/sTrue.js';

// ---------------------------------- Test ---------------------------------- //
sTrue("Artboard", function() {
  // @Setup
  var artboard = $().createArtboard("test-artboard", 0, 0, 800, 600);
  // @Tests
  this.equal(artboard.name(), "test-artboard");
  // @End
  artboard.parentGroup().removeLayer(artboard);
  artboard = null;
});

// ---------------------------------- Test ---------------------------------- //
sTrue("Basics", function() {
  // @Setup
  var artboard = $().createArtboard("test-artboard", 0, 0, 1024, 768);

  // @Tests
  this.true($().typename == 'sQuery');
  this.equal($("*").queryUsed(), "*");
  // @End
  artboard.parentGroup().removeLayer(artboard);

});
// ---------------------------------- Test ---------------------------------- //
sTrue("Crear una capa tipo Shape", function() {

  // @Setup
  // Select first artboard
  var artboard = $().createArtboard("test-artboard", 0, 0, 1024, 768);
  //artboard.setIsSelected(true);
  var newLayer = $('%artboard%').createShapeLayer("Froi");

  // @Tests
  this.class(newLayer, "MSShapeGroup", "La clase de newLayer tiene que ser MSShapeGroup");

  // @End
  $(newLayer).remove();
  artboard.parentGroup().removeLayer(artboard);

  newLayer = null;
  artboard = null;

});

// ---------------------------------- Test ---------------------------------- //
sTrue("Borra una capa", function() {

  // @Setup
  var artboard = $().createArtboard("test-artboard", 0, 0, 1024, 768);
  var newLayer = $('%artboard%').createShapeLayer("Froi");
  $(newLayer).remove();

  // @Tests
  this.class(newLayer, "MSShapeGroup");

  // @End
  artboard.parentGroup().removeLayer(artboard);

});

// ---------------------------------- Test ---------------------------------- //
sTrue("Agrupar capas", function() {

  // @Setup
  var artboard = $().createArtboard("test-artboard", 0, 0, 1024, 768);
  var newLayer01 = $(artboard).createShapeLayer("Layer01");
  var newLayer02 = $(artboard).createShapeLayer("Layer02");
  //artboard.setIsSelected(true);
  context.document.currentPage().currentArtboard = artboard;
  var $selection = $("%shapes%");

  var groupName = "Froiland";
  var newGroup = $selection.group(groupName);

  // @Tests
  this.class(newGroup, "MSLayerGroup", "La clase de newGroup tiene que ser MSLayerGroup");
  this.equal(newGroup.name(), groupName, "El nombre de la capa debe ser " + groupName);
  this.true($selection.length > 0);

  // @End
  artboard.parentGroup().removeLayer(artboard);

});
