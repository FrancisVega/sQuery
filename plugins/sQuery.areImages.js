/**
 * sQuery plugin - areImages 1.0
 * Francis Vega
 *
 * @desc Filter elements and return just image layers
 * @return {sQuery}
 * @example
 * $('%selected%').areText().UISelect();
 * @desc Filter the selection (in Sketchapp UI) and make a selection only
 * with query layers.
 */

(function($){

  $.fn.areImages = function() {
    var _layers = [];

    this.each(function() {
      if($(this).isImageLayer()) {
        _layers.push(this);
      }
    });

    this.layers = _layers.slice();
    return this;
  }

}(sQuery));

