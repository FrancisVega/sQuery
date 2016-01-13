/**
 * sQuery plugin - parentRoot 1.0
 * Francis Vega
 *
 * @desc Parent layers "back" to Artboard
 * @return {sQuery}
 * @example
 * $('%selected%').rootParent();
 */

(function($) {

  $.fn.parentRoot = function() {

    function getArtboardFromLayer(layer) {
      var parent = layer.parentGroup();
      if(parent.class() == 'MSArtboardGroup') {
        artboard = parent;
      } else {
        getArtboardFromLayer(parent);
      }
      return artboard;
    }

    function parentToRoot(layer) {
      if (layer.parentGroup().class() != 'MSArtboardGroup') {
        // Get the artboard
        var artboard = getArtboardFromLayer(layer);
        var parent = layer.parentGroup();
        // Get layer absolute position
        var x = layer.absoluteRect().x() - artboard.absoluteRect().x();
        var y = layer.absoluteRect().y() - artboard.absoluteRect().y();
        // Parent to it
        artboard.addLayers([layer]);
        // Remove from previous parent
        parent.removeLayer(layer);
        // Position new layer
        layer.frame().setX(x);
        layer.frame().setY(y);
      }
    }

    this.each(function() {
      parentToRoot(this);
    });

  }

}(sQuery));
