/**
 * sQuery plugin - areTexts 1.0
 * Francis Vega
 *
 * @desc Filter elements and return just text layers
 * @return {sQuery}
 * @example
 * $('%selected%').areText().UISelect();
 * @desc Filter the selection (in Sketchapp UI) and make a selection only
 * with query layers.
 */

(function($){

  $.fn.areTexts = function() {
    var _layers = [];

    this.each(function() {
      if($(this).isText()) {
        _layers.push(this);
      }
    });

    this.layers = _layers.slice();
    return this;
  }

}(sQuery));

