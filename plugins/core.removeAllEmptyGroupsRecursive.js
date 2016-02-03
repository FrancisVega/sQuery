/**
 * sQuery plugin - removeEmptyGroupsRecursive 1.0
 * Francis Vega
 *
 * @desc Remove all empty groups in a recursive way
 * @return {sQuery}
 * @example
 * $('%selected%').removeEmptyGroupsRecursive();
 */

(function($){

  $.fn.areShapes = function() {
    var removeEmpty;
    var hasChilds = 1;
    while(hasChilds) {
      removeEmpty = $("%groups%").each(function(){
        $(this).isEmpty().remove();
      });
      hasChilds = removeEmpty.layers.length;
    }
  }

}(sQuery));
