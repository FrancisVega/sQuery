
/**
 * sQuery plugin - move 1.0
 * Francis Vega
 *
 * @desc Move query layers
 * @param {object} coords
 * @param {object} coords.x Position x value
 * @param {object} coords.y Position y value
 * @return {sQuery}
 * @example
 * $('%selected%').move({"x":100, "y":234})
 * @desc Move "selected" layers by x100, y234
 */

(function($){
  $.fn.move = function(coords, pixelFit = false) {

    let finalX, finalY;

    this.each(function() {

      if(pixelFit) {
        finalX = Math.round( this.absoluteRect().x() - this.parentRootForAbsoluteRect().rect().origin.x + coords.x );
        finalY = Math.round( this.absoluteRect().y() - this.parentRootForAbsoluteRect().rect().origin.y + coords.y );
      } else {
        finalX = this.absoluteRect().x() - this.parentRootForAbsoluteRect().rect().origin.x + coords.x;
        finalY = this.absoluteRect().y() - this.parentRootForAbsoluteRect().rect().origin.y + coords.y;
      }

      this.absoluteRect().x = finalX + this.parentRootForAbsoluteRect().rect().origin.x
      this.absoluteRect().y = finalY + this.parentRootForAbsoluteRect().rect().origin.y

    });

    return this;

  }
}(sQuery));
