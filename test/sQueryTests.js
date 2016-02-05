log("testing start");

// Generals
var CURRENTPAGE = context.document.currentPage();
var ARTBOARDNAME = 'testing-artboard';
var LAYERNAME = 'testing-layer';
var DUPLICATELAYERNAME = 'new-layer';
var DUPLICATEGROUPNAME = 'new-group';
var GROUPNAME = 'testing-group';

/**
 * Comprueba que se pueden duplicar capas y grupos
 */
sTrue("Duplicar capas y grupos", function() {

  // @Setup
  var artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600);
  var layer = $(artboard).createShapeLayer(LAYERNAME);
  var newGroup = $("%shapes%").group(GROUPNAME);
  var duplicateLayer = $(layer).duplicate(DUPLICATELAYERNAME);
  var duplicateGroup = $(newGroup).duplicate(DUPLICATEGROUPNAME);

  // @Tests
  this.isEqual(duplicateLayer.MSLayer().name(), DUPLICATELAYERNAME);
  this.isEqual(duplicateGroup.MSLayer().name(), DUPLICATEGROUPNAME);

  // @End
  /*
   *$(layer).remove();
   *$(artboard).remove();
   */

});
/**
 * Comprueba que se puede crear un artboard
 */
sTrue("Artboard", function() {

  // @Setup
  var artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600);

  // @Tests
  this.isClass(artboard, "MSArtboardGroup");
  this.isEqual(artboard.name(), ARTBOARDNAME);

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
  this.isClass(newLayer, "MSShapeGroup");

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
  this.isClass(newLayer, "MSShapeGroup");

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
  this.isClass(newGroup, "MSLayerGroup");
  this.isEqual(newGroup.name(), GROUPNAME);
  this.isEqual(newGroup.layers().array().length(), 1);

  // @End
  $(layer).remove();
  $(artboard).remove();

});

