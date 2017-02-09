let sQuery, $;
const doc = context.document;
const page = doc.currentPage();
const currentArtboard = page.currentArtboard();
const app = NSApplication.sharedApplication();

(function(){

  sQuery = $ = function(selector, page, artboard) {
    return new SQUERY(selector, page, artboard);
  };

  const findObjectsByName = (name, scope) => {
    var predicate = NSPredicate.predicateWithFormat("name == %@",name);
    return scope.filteredArrayUsingPredicate(predicate);
  };

  /* ------------------------------------------------------------------------------------------- */

  var SQUERY = function(selector, page, artboard) {

    if (typeof selector == "string") {
      switch(selector) {
        // All
        case "*":
          this.layers = currentArtboard.children().slice().filter(layer => layer.class() != "MSArtboardGroup" && layer.class() != "MSRectangleShape");
          break;

        case "%hierarchy%":
          this.layers = currentArtboard.layers();
          break;

        case "%pages%":
          this.layers = context.document.pages();
          break;

        case "%artboards%":
          this.layers = context.document.currentPage().artboards();
          break;

        case "%images%":
          this.layers = currentArtboard.children().slice().filter(layer => layer.class() == "MSBitmapLayer");
          break;

        case "%layers%":
          this.layers = currentArtboard.children().slice().filter(layer => layer.class() != "MSArtboardGroup" && layer.class() != "MSRectangleShape" && layer.class() != "MSLayerGroup");
          break;

        case "%shapes%":
          this.layers = currentArtboard.children().slice().filter(layer => layer.class() == "MSShapeGroup");
          break;

        case "%groups%":
          this.layers = currentArtboard.children().slice().filter(layer => layer.class() == "MSLayerGroup");
          break;

        case "%textLayers%":
          this.layers = currentArtboard.children().slice().filter(layer => layer.class() == "MSTextLayer");
          break;

        case "%selected%":
          this.layers = context.selection
          break;

          // Default: Layer name.
        default:
          this.layers = findObjectsByName(selector, currentArtboard.children());
          break;
      }
    }
    return this;
  };

  /* @sQuery API */

  sQuery.fn = SQUERY.prototype = {

    /**
     * ...
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    sLayers: function() {
      return this.layers;
    },

    /**
     * texts
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    texts: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSTextLayer);
      return this;
    },

    /**
     * groups
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    groups: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSLayerGroup);
      return this;
    },

    /**
     * pages
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    pages: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSPage);
      return this;
    },

    /**
     * artboards
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    artboards: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSArtboardGroup);
      return this;
    },

    /**
     * shapes
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    shapes: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSShapeGroup);
      return this;
    },

    /**
     * images
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    images: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSBitmapLayer);
      return this;
    },

    /**
     * isLocked
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    isLocked: function(neg) {
      this.layers = this.layers.slice().filter(layer => layer.isLocked())
      return this;
    },

    /**
     * startsWith
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    startsWith: function(str) {
      this.layers = this.layers.slice().filter(layer => layer.name().substr(0, str.length) == str)
      return this;
    },

    /**
     * endsWith
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    endsWith: function(str) {
      this.layers = this.layers.slice().filter(layer => layer.name().substr(layer.name().length() - str.length) == str)
      return this;
    },

    /**
     * contains
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    contains: function(str) {
      this.layers = this.layers.slice().filter(layer => layer.name().indexOf(str) != -1)
      return this;
    },

    /**
     * withName
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    withName: function(name) {
      this.layers = this.layers.slice().filter(layer => layer.name() == name);
      return this;
    },

    /**
     * childs
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    childs: function() {
      const firstLayer = this.layers[0]
      if (firstLayer.class() == "MSLayerGroup" || firstLayer.class() == "MSPage" || firstLayer.class() == "MSArtboardGroup") {
        this.layers = firstLayer.children();
      }
      return this;
    },

    /**
     * hasClickThrought
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    hasClickThrought: function() {
      const groups = this.layers.slice().filter(layer => layer.class() == MSLayerGroup);
      this.layers = groups.filter(layer => layer.hasClickThrough());
      return this;
    },

    /**
     * setHasClickThrough
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    setHasClickThrough: function() {
      let status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      const groups = this.layers.slice().filter(layer => layer.class() == MSLayerGroup);
      groups.map(layer => layer.setHasClickThrough(status))
      return this;
    },

    /**
     * toggleClickThrought
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    toggleClickThrought: function() {
      const groups = this.layers.slice().filter(layer => layer.class() == MSLayerGroup);
      groups.map(layer => layer.setHasClickThrough(!layer.hasClickThrough()))
      return this;
    },

    /**
     * isEmpty
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    isEmpty: function() {
      const groups = this.layers.slice().filter(layer => layer.class() == MSLayerGroup);
      this.layers = groups.filter(layer => layer.layers().length === 0)
      return this;
    },

    /**
     * isVisible
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    isVisible: function() {
      this.layers = this.layers.slice().filter(layer => layer.isVisible() == 1)
      return this;
    },

    /**
     * isHidden
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    isHidden: function() {
      this.layers = this.layers.slice().filter(layer => layer.isVisible() == 0)
      return this;
    },

    /**
     * show
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    show: function() {
      this.layers.slice().map(layer => layer.setIsVisible(true))
      return this;
    },

    /**
     * hide
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    hide: function() {
      this.layers.slice().map(layer => layer.setIsVisible(false))
      return this;
    },

    /**
     * lock
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    lock: function() {
      this.layers.slice().map(layer => layer.setIsLocked(true))
      return this;
    },

    /**
     * unlock
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    unlock: function() {
      this.layers.slice().map(layer => layer.setIsLocked(false))
      return this;
    },

    /**
     * duplicate
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    duplicate: function(name) {
      const duplicateLayers = this.layers.slice().map(layer => layer.duplicate())
      duplicateLayers.map(layer => layer.name = name)
      return this;
    },

    /**
     * remove
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    remove: function() {
      this.layers.slice().map(layer => layer.removeFromParent())
    },

    /**
     * opacity
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    opacity: function(val) {
      if (val) {
        this.layers.slice().map(layer => layer.style().contextSettings().opacity = val / 100)
      } else {
        return this.layers.slice().map(layer => layer.style().contextSettings().opacity())
      }
    },

    /**
     * absolutePosition
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    absolutePosition: function() {
      return this.layers.slice().map(layer => [layer.absoluteRect().x(), layer.absoluteRect().y()]);
    },

    /**
     * relativePosition
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    relativePosition: function() {
      return this.layers.slice().map(layer =>
        [
          layer.absoluteRect().x() - layer.parentRootForAbsoluteRect().rect().origin.x,
          layer.absoluteRect().y() - layer.parentRootForAbsoluteRect().rect().origin.y
        ]
      );
    },

    /**
     * rename
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    rename: function(name) {
      this.layers.slice().map(layer => layer.name = name);
      return this;
    },

    /**
     * UISelect
     * @param {...} ...
     * @param {...} ...
     * @return {...}
     */
    UISelect: function() {
      // Primero deseleccionamos todo
      doc.currentPage().deselectAllLayers();
      this.layers.slice().map(layer => layer.select_byExpandingSelection(true, true))
      return this;
    },
  }
}
)();

$("%hierarchy%").rename("LOL")
