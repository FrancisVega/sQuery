/**
 * sQuery plugin - removeEmptyGroupsRecursive 1.0
 * Francis Vega
 *
 * TODO:
 * Ahora mismo es muy limitado y borra todos los grupos, sin tener en cuenta
 * ninguna selección previa.
 * @desc Remove all empty groups from the current artboard
 * @return {sQuery}
 * @example
 * $().removeEmptyGroupsRecursive();
 */

(function($){

  $.fn.removeEmptyGroupsRecursive = function() {
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
