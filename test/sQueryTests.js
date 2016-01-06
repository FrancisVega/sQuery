// sQuery
@import 'zen.sketchplugin/Contents/Sketch/sQuery/sQuery.js';
@import 'zen.sketchplugin/Contents/Sketch/sQuery/plugins/core.move.js';
@import 'zen.sketchplugin/Contents/Sketch/sQuery/plugins/core.areFroups.js';
@import 'zen.sketchplugin/Contents/Sketch/sQuery/plugins/core.areShapes.js';
// sTrue
@import 'zen.sketchplugin/contents/sketch/sTrue/sTrue.js';

/**
 * Comprueba que se puede crear un artboard
 */
sTrue("Artboard", function() {

  // @Setup
  var artboard = $().createArtboard("test-artboard", 0, 0, 800, 600);

  // @Tests
  this.class( artboard, "MSArtboardGroup");
  this.equal( artboard.name(), "test-artboard");

  // @End
  $(artboard).remove();

});

/**
 * Comprueba que se puede crear una capa de tipo shape
 */
sTrue("Crear una capa tipo Shape", function() {

  // @Setup
  var artboard = $().createArtboard("test-artboard", 0, 0, 1024, 768);
  var newLayer = $(artboard).createShapeLayer("test-artboard");

  // @Tests
  this.class(newLayer, "MSShapeGroup");

  // @End
  $(newLayer).remove();
  $(artboard).remove();

});

/**
 * Comprueba que se puede borrar una capa
 */
sTrue("Borra una capa", function() {

  // @Setup
  var artboard = $().createArtboard("test-artboard", 0, 0, 1024, 768);
  var newLayer = $(artboard).createShapeLayer("test-artboard");
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
  this.class(newGroup, "MSLayerGroup");
  this.equal(newGroup.name(), groupName);
  this.true($selection.length > 0);

  // @End
  artboard.parentGroup().removeLayer(artboard);

});
