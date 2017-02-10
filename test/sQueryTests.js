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

});
