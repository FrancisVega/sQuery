/*!
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
    var _layers = [];

    this.each(function() {
      if($(this).isGroup()) {
        _layers.push(this);
      }
    });

    this.layers = _layers.slice();
    return this;
  }

}(sQuery));
