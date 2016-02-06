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
    var _layers = [];

    this.each(function() {
      if($(this).isShape()) {
        _layers.push(this);
      }
    });

    this.layers = _layers.slice();
    return this;
  }

}(sQuery));
