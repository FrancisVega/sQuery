/**
 * sQuery plugin - sendToRoot 1.0
 * Francis Vega
 *
 * @desc Parent layers "back" to Artboard
 * @return {sQuery}
 * @example
 * $('%selected%').sendToRoot();
 */

(function($) {
  $.fn.sendToRoot = function() {
    // For each query
    this.each(function() {
      const parent = this.parentGroup();
      if (parent.class() != MSArtboardGroup) {
        // Get the artboard
        const artboard = this.parentRootForAbsoluteRect();
        // Get this absolute position
        const x = this.absoluteRect().x() - artboard.absoluteRect().x();
        const y = this.absoluteRect().y() - artboard.absoluteRect().y();
        // Parent to it
        artboard.addLayers([this]);
        // Remove from previous parent
        parent.removeLayer(this);
        // Position new this
        this.frame().setX(x);
        this.frame().setY(y);
      }
    });
  }
}(sQuery));
