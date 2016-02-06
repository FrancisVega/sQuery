
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
  $.fn.move = function(coords, pixelFit) {

    pixelFit = pixelFit || false;

    var finalX, finalY;

    this.each(function() {

      if(pixelFit){
        finalX = Math.round($(this).x()+ coords.x);
        finalY = Math.round($(this).y()+ coords.y);
      } else {
        finalX = $(this).x()+ coords.x;
        finalY = $(this).y()+ coords.y;
      }

      $(this).x(finalX);
      $(this).y(finalY);

    });

    return this;

  }
}(sQuery));
