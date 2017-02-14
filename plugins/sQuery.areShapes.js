/**
 * sQuery plugin - areShapes 1.0
 * Francis Vega
 *
 * @desc Filter elements and return just ShapeGroups
 * @return {sQuery}
 * @example
 * $('%selected%').areShapes().UISelect();
 * @desc Filter the selection (in Sketchapp UI) and make a selection only
 * with shape layers.
 */

(function($){

  $.fn.areShapes = function() {
    this.layers = this.layers.slice().filter(layer => layer.class() == MSShapeGroup);
    return this;
  }

}(sQuery));
