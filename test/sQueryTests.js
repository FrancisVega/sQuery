
// sQuery
@import 'zen.sketchplugin/Contents/Sketch/sQuery/sQuery.js';
@import 'zen.sketchplugin/Contents/Sketch/sQuery/plugins/core.move.js';
@import 'zen.sketchplugin/Contents/Sketch/sQuery/plugins/core.areFroups.js';
@import 'zen.sketchplugin/Contents/Sketch/sQuery/plugins/core.areShapes.js';

// sTrue
@import 'zen.sketchplugin/contents/sketch/sTrue/sTrue.js';

// Generals
var CURRENTPAGE = context.document.currentPage();
var ARTBOARDNAME = 'testing-artboard';
var LAYERNAME = 'testing-layer';
var GROUPNAME = 'testing-group';

/**
 * Comprueba que se puede crear un artboard
 */
sTrue("Artboard", function() {

  // @Setup
  var artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600);

  // @Tests
  this.class(artboard, "MSArtboardGroup");
  this.equal(artboard.name(), ARTBOARDNAME);

  // @End
  $(artboard).remove();

});

/**
 * Comprueba que se puede crear una capa de tipo shape
 */
sTrue("Crear una capa tipo Shape", function() {

  // @Setup
  var artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600);
  var newLayer = $(artboard).createShapeLayer(ARTBOARDNAME);

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
  var artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600);
  var newLayer = $(artboard).createShapeLayer(ARTBOARDNAME);
  $(newLayer).remove();

  // @Tests
  this.class(newLayer, "MSShapeGroup");

  // @End
  $(artboard).remove();

});

/**
 * Comprueba que se pueden agrupar capas
 */
sTrue("Agrupar capas", function() {

  // @Setup
  var artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600);
  var layer = $(artboard).createShapeLayer(LAYERNAME);
  var newGroup = $("%shapes%").group(GROUPNAME);

  // @Tests
  this.class(newGroup, "MSLayerGroup");
  this.equal(newGroup.name(), GROUPNAME);
  this.equal(newGroup.layers().array().length(), 1);

  // @End
  $(layer).remove();
  $(artboard).remove();

});
