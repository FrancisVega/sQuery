/*
  The MIT License (MIT)
  Copyright (c) 2017 Francis Vega
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and
  associated documentation files (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge, publish, distribute,
  sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this
  permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT
  NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
  DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
  */

 /*
  *
  *  sQuery 2.0
  *
  */

  const doc = context.document;
  const page = doc.currentPage();
  const currentArtboard = page.currentArtboard();

(function(){

  const sQuery = $ = (selector, page, artboard) => new SQUERY(selector, page, artboard);

  const findObjectsByName = (name, scope) => {
    const predicate = NSPredicate.predicateWithFormat("name == %@",name);
    return scope.filteredArrayUsingPredicate(predicate);
  };

  const findObjectsOfType = (classType, scope) => {
    const predicate = NSPredicate.predicateWithFormat("self isKindOfClass: %@", classType);
    return scope.filteredArrayUsingPredicate(predicate);
  };

  const SQUERY = function(selector, page, artboard) {

    const allLayers = context.document.currentPage().currentArtboard().children();
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
          this.layers = findObjectsOfType(MSBitmapLayer, currentArtboard.children());
          break;

        case "%layers%":
          this.layers = currentArtboard.children().slice().filter(layer => layer.class() != "MSArtboardGroup" && layer.class() != "MSRectangleShape" && layer.class() != "MSLayerGroup");
          break;

        case "%shapes%":
          this.layers = findObjectsOfType(MSShapeGroup, currentArtboard.children());
          break;

        case "%groups%":
          this.layers = findObjectsOfType(MSLayerGroup, currentArtboard.children());
          break;

        case "%textLayers%":
          this.layers = findObjectsOfType(MSTextLayer, currentArtboard.children());
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

    if (typeof selector === "object") {
      this.layers = [selector];
    }

    return this;
  };

  /* @sQuery API */

  sQuery.fn = SQUERY.prototype = {

    /**
     * Return an array with the queried layers
     * @return {array}
     */
    sLayers: function() {
      return this.layers;
    },

    /**
     * Query text layers
     * @return {sQuery}
     */
    texts: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSTextLayer);
      return this;
    },

    /**
     * Query groups
     * @return {sQuery}
     */
    groups: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSLayerGroup);
      return this;
    },

    /**
     * Query pages
     * @return {sQuery}
     */
    pages: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSPage);
      return this;
    },

    /**
     * Query artboards
     * @return {sQuery}
     */
    artboards: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSArtboardGroup);
      return this;
    },

    /**
     * Query shape layers
     * @return {sQuery}
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
      doc.currentPage().deselectAllLayers();
      this.layers.slice().map(layer => layer.select_byExpandingSelection(true, true))
      return this;
    },

    /**
     * Itera por cada uno de los elementos previamente seleccionados y devuelve el elemento.
     * @param {function} callback Una función a la que each llama por cada
     * iteración.
     * @return {sQuery}
     */
    each: function(callback) {
      for(let i=0, len=this.layers.length; i<len; ++i) {
        callback.call(this.layers[i], i);
      }
      return this;
    },

    /**
     * Itera por cada uno de los elementos filtrando los que devuelvan true
     * @param {function} callback Una función a la que filter llama por cada iteración.
     * @return {sQuery}
     */

    filter: function(callback) {
      let r = [];
      let k;
      for(let i=0, len=this.layers.length; i<len; ++i) {
        k = callback.call(this.layers[i], i);
        if(k) {
          r.push(this.layers[i]);
        }
      }
      this.layers = r.slice();
      return this;
    },

    createArtboard: function(name, x, y, width, height) {

      // Get first layer. Should be a page
      try {
        const artboard = MSArtboardGroup.new();
        const frame = artboard.frame();
        frame.setX(x);
        frame.setY((y));
        frame.setWidth(width);
        frame.setHeight(height);
        artboard.name = name;

        this.layers[0].addLayers([artboard]);
        this.layers[0].deselectAllLayers();
        this.layers[0].currentArtboard = artboard;

        artboard.setIsSelected(true);
        return artboard;
      } catch(e) {
        log(e);
      }
    },



  }
}
)();
