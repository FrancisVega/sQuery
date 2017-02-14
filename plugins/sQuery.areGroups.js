/**
 * sQuery plugin - areGroups 1.0
 * Francis Vega
 *
 * @desc Filter elements and return just LayerGroups
 * @return {sQuery}
 * @example
 * $('%selected%').areGroups().UISelect();
 * @desc Filter the selection (in Sketchapp UI) and make a selection only with groups.
 */

(function($){

  $.fn.areGroups = function() {
    this.layers = this.layers.slice().filter(layer => layer.class() == MSLayerGroup);
    return this;
  }

}(sQuery));
