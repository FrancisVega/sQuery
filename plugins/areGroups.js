/**
 * Filtra los elementos devolviendo solo los grupos
 * @return {sQuery}
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
