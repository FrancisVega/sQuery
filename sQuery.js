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

(function(){

  const sQuery = $ = (selector, page, artboard) => new SQUERY(selector, page, artboard)

  const findObjectsByName = (name, scope) => {
    const predicate = NSPredicate.predicateWithFormat("name == %@",name)
    return scope.filteredArrayUsingPredicate(predicate)
  }

  const findObjectsOfType = (classType, scope) => {
    const predicate = NSPredicate.predicateWithFormat("self isKindOfClass: %@", classType)
    return scope.filteredArrayUsingPredicate(predicate)
  }

  const SQUERY = function(selector, page, artboard) {

    if (typeof selector == "string") {
      switch(selector) {
        // All
        case "*":
          this.layers = context.document.currentPage().currentArtboard().children().slice().filter(layer => layer.class() != "MSArtboardGroup" && layer.class() != "MSRectangleShape")
          break

        case "%hierarchy%":
          this.layers = context.document.currentPage().currentArtboard().layers()
          break

        case "%pages%":
          this.layers = context.document.pages()
          break

        case "%artboards%":
          this.layers = context.document.currentPage().artboards()
          break

        case "%images%":
          this.layers = findObjectsOfType(MSBitmapLayer, context.document.currentPage().currentArtboard().children())
          break

        case "%layers%":
          this.layers = context.document.currentPage().currentArtboard().children().slice().filter(layer => layer.class() != "MSArtboardGroup" && layer.class() != "MSRectangleShape" && layer.class() != "MSLayerGroup")
          break

        case "%shapes%":
          this.layers = findObjectsOfType(MSShapeGroup, context.document.currentPage().currentArtboard().children())
          break

        case "%groups%":
          this.layers = findObjectsOfType(MSLayerGroup, context.document.currentPage().currentArtboard().children())
          break

        case "%textLayers%":
          this.layers = findObjectsOfType(MSTextLayer, context.document.currentPage().currentArtboard().children())
          break

        case "%selected%":
          this.layers = context.selection
          break

          // Default: Layer name.
        default:
          this.layers = findObjectsByName(selector, context.document.currentPage().currentArtboard().children())
          break
      }
    }

    if (typeof selector == "object") {
      this.layers = [selector]
    }

    return this
  }

  /* @sQuery API */

  sQuery.fn = SQUERY.prototype = {

    /**
     * Return an array with the queried layers
     * @return {array}
     */
    sLayers: function() {
      return this.layers
    },

    /**
     * Query text layers
     * @return {sQuery}
     */
    texts: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSTextLayer)
      return this
    },

    /**
     * Query groups
     * @return {sQuery}
     */
    groups: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSLayerGroup)
      return this
    },

    /**
     * Query pages
     * @return {sQuery}
     */
    pages: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSPage)
      return this
    },

    /**
     * Query artboards
     * @return {sQuery}
     */
    artboards: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSArtboardGroup)
      return this
    },

    /**
     * Query shape layers
     * @return {sQuery}
     */
    shapes: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSShapeGroup)
      return this
    },

    /**
     * images
     * @return {sQuery}
     */
    images: function() {
      this.layers = this.layers.slice().filter(layer => layer.class() == MSBitmapLayer)
      return this
    },

    /**
     * isLocked
     * @param {bool} neg
     * @return {sQuery}
     */
    isLocked: function(neg) {
      this.layers = this.layers.slice().filter(layer => layer.isLocked())
      return this
    },

    /**
     * startsWith
     * @param {string} str
     * @return {sQuery}
     */
    startsWith: function(str) {
      this.layers = this.layers.slice().filter(layer => layer.name().substr(0, str.length) == str)
      return this
    },

    /**
     * endsWith
     * @param {string} str
     * @return {sQuery}
     */
    endsWith: function(str) {
      this.layers = this.layers.slice().filter(layer => layer.name().substr(layer.name().length() - str.length) == str)
      return this
    },

    /**
     * contains
     * @param {string} str
     * @return {sQuery}
     */
    contains: function(str) {
      this.layers = this.layers.slice().filter(layer => layer.name().indexOf(str) != -1)
      return this
    },

    /**
     * withName
     * @param {string} name
     * @return {sQuery}
     */
    withName: function(name) {
      this.layers = this.layers.slice().filter(layer => layer.name() == name)
      return this
    },

    /**
     * childs
     * @return {sQuery}
     */
    childs: function() {
      let all = []
      for(let i=0; i<this.layers.length; ++i) {
        layerChilds = this.layers[i].children()
        for(let j=0; j<layerChilds.length; ++j) {
          all.push(layerChilds[j])
        }
      }
      this.layers = all
      return this
    },

    /**
     * hasClickThrought
     * @return {sQuery}
     */
    hasClickThrought: function() {
      const groups = this.layers.slice().filter(layer => layer.class() == MSLayerGroup)
      this.layers = groups.filter(layer => layer.hasClickThrough())
      return this
    },

    /**
     * setHasClickThrough
     * @return {sQuery}
     */
    setHasClickThrough: function() {
      let status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0
      const groups = this.layers.slice().filter(layer => layer.class() == MSLayerGroup)
      groups.map(layer => layer.setHasClickThrough(status))
      return this
    },

    /**
     * toggleClickThrought
     * @return {sQuery}
     */
    toggleClickThrought: function() {
      const groups = this.layers.slice().filter(layer => layer.class() == MSLayerGroup)
      groups.map(layer => layer.setHasClickThrough(!layer.hasClickThrough()))
      return this
    },

    /**
     * isEmpty
     * @return {sQuery}
     */
    isEmpty: function() {
      const groups = this.layers.slice().filter(layer => layer.class() == MSLayerGroup)
      this.layers = groups.filter(layer => layer.layers().length === 0)
      return this
    },

    /**
     * isVisible
     * @return {sQuery}
     */
    isVisible: function() {
      this.layers = this.layers.slice().filter(layer => layer.isVisible() == 1)
      return this
    },

    /**
     * isHidden
     * @return {sQuery}
     */
    isHidden: function() {
      this.layers = this.layers.slice().filter(layer => layer.isVisible() == 0)
      return this
    },

    /**
     * visibility
     * @param {bool} status
     * @return {sQuery}
     */
    visibility: function(status) {
      this.layers.slice().map(layer => layer.setIsVisible(status))
      return this
    },

    /**
     * show
     * @return {sQuery}
     */
    show: function() {
      this.layers.slice().map(layer => layer.setIsVisible(true))
      return this
    },

    /**
     * hide
     * @return {sQuery}
     */
    hide: function() {
      this.layers.slice().map(layer => layer.setIsVisible(false))
      return this
    },

    /**
     * lock
     * @return {sQuery}
     */
    lock: function() {
      this.layers.slice().map(layer => layer.setIsLocked(true))
      return this
    },

    /**
     * unlock
     * @return {sQuery}
     */
    unlock: function() {
      this.layers.slice().map(layer => layer.setIsLocked(false))
      return this
    },

    /**
     * duplicate
     * @param {string} name
     * @return {sQuery}
     */
    duplicate: function(name) {
      const duplicateLayers = this.layers.slice().map(layer => layer.duplicate())
      duplicateLayers.map(layer => layer.name = name)
      this.layers = duplicateLayers
      return this
    },

    /**
     * remove
     * @return {sQuery}
     */
    remove: function() {
      this.layers.slice().map(layer => layer.removeFromParent())
    },

    /**
     * opacity
     * @param {number} val
     * @return {sQuery}
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
     * @return {sQuery}
     */
    absolutePosition: function() {
      return this.layers.slice().map(layer => [layer.absoluteRect().x(), layer.absoluteRect().y()])
    },

    /**
     * relativePosition
     * @return {sQuery}
     */
    relativePosition: function() {
      return this.layers.slice().map(layer =>
        [
          layer.absoluteRect().x() - layer.parentRootForAbsoluteRect().rect().origin.x,
          layer.absoluteRect().y() - layer.parentRootForAbsoluteRect().rect().origin.y
        ]
      )
    },

    /**
     * rename
     * @param {string} name
     * @return {sQuery}
     */
    rename: function(name) {
      this.layers.slice().map(layer => layer.name = name)
      return this
    },

    /**
     * UISelect
     * @return {sQuery}
     */
    UISelect: function() {
      doc.currentPage().deselectAllLayers()
      this.layers.slice().map(layer => layer.select_byExpandingSelection(true, true))
      return this
    },

    /**
     * Itera por cada uno de los elementos previamente seleccionados y devuelve el elemento.
     * @param {function} callback Una función a la que each llama por cada iteración.
     * @return {sQuery}
     */
    each: function(callback) {
      for(let i=0, len=this.layers.length; i<len; ++i) {
        callback.call(this.layers[i], i)
      }
      return this
    },

    /**
     * Itera por cada uno de los elementos filtrando los que devuelvan truea uno de los elementos filtrando los que devuelvan true
     * @param {function} callback Una función a la que filter llama por cada iteración.
     * @return {sQuery}
     */
    filter: function(callback) {
      let r = []
      let k
      for(let i=0, len=this.layers.length; i<len; ++i) {
        k = callback.call(this.layers[i], i)
        if(k) {
          r.push(this.layers[i])
        }
      }
      this.layers = r.slice()
      return this
    },

    /**
     * group
     * @param {string} name
     * @return {sQuery}
     */
    group: function(name) {
      const layers = MSLayerArray.arrayWithLayers(this.layers)
      const group = MSLayerGroup.groupFromLayers(layers)
      group.setName(name)
      return group
    },

    /**
     * createShapeLayer
     * @param {string} name
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {MSLayer}
     */
    createShapeLayer: function(name, x, y, width, height) {
      const parentGroup = this.layers[0]
      const rectShape = MSRectangleShape.alloc().init()
      rectShape.frame = MSRect.rectWithRect(NSMakeRect(x,y,width,height))
      const shapeGroup = MSShapeGroup.shapeWithPath(rectShape)
      shapeGroup.name = name
      this.layers[0].addLayers([shapeGroup])
      return shapeGroup
    },

    /**
     * createArtboard
     * @param {string} name
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     * @return {MSArtboardGroup}
     */
    createArtboard: function(name, x, y, width, height) {
      try {
        const artboard = MSArtboardGroup.new()
        const frame = artboard.frame()
        frame.setX(x)
        frame.setY((y))
        frame.setWidth(width)
        frame.setHeight(height)
        artboard.name = name

        this.layers[0].addLayers([artboard])
        this.layers[0].deselectAllLayers()
        this.layers[0].currentArtboard = artboard

        artboard.setIsSelected(true)
        return artboard

      } catch(e) {
        log(e)
      }
    },
  }
}
)()
