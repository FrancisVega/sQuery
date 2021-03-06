log("testing start")

// Generals
const CURRENTPAGE = context.document.currentPage()
const ARTBOARDNAME = 'new-artboard'
const LAYERNAME = 'new-layer'
const DUPLICATELAYERNAME = 'new-duplicate-layer'
const DUPLICATEGROUPNAME = 'new-duplicate-group'
const GROUPNAME = 'new-group'

/**
 * ClickThrough
 */
sTrue("ClickThrough", function() {

  // @Setup
  const artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600)
  const layer = $(artboard).createShapeLayer(LAYERNAME)
  const newGroup = $("%shapes%").group(GROUPNAME)

  // @Tests
  $(newGroup).setHasClickThrough(true)
  this.isTrue(newGroup.hasClickThrough())
  $(newGroup).setHasClickThrough()
  this.isFalse(newGroup.hasClickThrough())

  // @End
  $(layer).remove()
  $(artboard).remove()

})

/**
 * Comprueba que se pueden duplicar capas y grupos
 */
sTrue("Duplicar capas y grupos", function() {

  // @Setup
  const artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600)
  const layer = $(artboard).createShapeLayer(LAYERNAME)
  const newGroup = $("%shapes%").group(GROUPNAME)
  const duplicateLayer = $(layer).duplicate(DUPLICATELAYERNAME)
  const duplicateGroup = $(newGroup).duplicate(DUPLICATEGROUPNAME)

  // @Tests
  this.isEqual(duplicateLayer.layers[0].name(), DUPLICATELAYERNAME)
  this.isEqual(duplicateGroup.layers[0].name(), DUPLICATEGROUPNAME)

  // @End
  $(layer).remove()
  $(artboard).remove()

})

/**
 * Comprueba que se puede crear un artboard
 */
sTrue("Artboard", function() {

  // @Setup
  const artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600)

  // @Tests
  this.isClass(artboard, "MSArtboardGroup")
  this.isEqual(artboard.name(), ARTBOARDNAME)

  // @End
  $(artboard).remove()

})


/**
 * Comprueba que se puede crear una capa de tipo shape
 */
sTrue("Crear una capa tipo Shape", function() {

  // @Setup
  const artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600)
  const newLayer = $(artboard).createShapeLayer(ARTBOARDNAME)

  // @Tests
  this.isClass(newLayer, "MSShapeGroup")

  // @End
  $(newLayer).remove()
  $(artboard).remove()

})

/**
 * Comprueba que se puede borrar una capa
 */
sTrue("Borra una capa", function() {

  // @Setup
  const artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600)
  const newLayer = $(artboard).createShapeLayer(ARTBOARDNAME)
  $(newLayer).remove()

  // @Tests
  this.isClass(newLayer, "MSShapeGroup")

  // @End
  $(artboard).remove()

})

/**
 * Comprueba que se pueden agrupar capas
 */
sTrue("Agrupar capas", function() {

  // @Setup
  const artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600)
  const layer = $(artboard).createShapeLayer(LAYERNAME)
  const newGroup = $("%shapes%").group(GROUPNAME)

  // @Tests
  this.isClass(newGroup, "MSLayerGroup")
  this.isEqual(newGroup.name(), GROUPNAME)
  this.isEqual(newGroup.layers().length, 1)

  // @End
  $(layer).remove()
  $(artboard).remove()

})

/*
sTrue("Title", function() {
  // @Setup
  const artboard = $(CURRENTPAGE).createArtboard(ARTBOARDNAME, 0, 0, 800, 600)
  const layer = $(artboard).createShapeLayer(LAYERNAME)
  const newGroup = $("%shapes%").group(GROUPNAME)

  // @Tests
  //this.isTrue()
  //this.isFalse()
  //this.isEqual()
  //this.isNotEqual()
  //this.isClass()

  // @End
})
*/
