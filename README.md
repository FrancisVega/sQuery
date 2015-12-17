# sQuery
A growing small library of chain methods "in a jQuery way" for Sketch to make the selection and filter task a little easiest :)


# Some (silly) examples
````javascript
/* Import :) */
@import 'sQuery.js';
```

````javascript
/* Hide all layers and groups */
$("*").hide()
```

````javascript
/* Hide all text layers with less than 10% opacity */
$("%textLayers%").filter(function(){
    return $(this).opacity() < 10;
}).hide();
```

````javascript
/* Loop through each group and rename it with and "index" */
$("%groups%").each(function(idx){
    $(this).rename("I'm group number " + idx);
});
```

````javascript
/* Remove all empty groups */
$("%groups%").isEmpty().remove();
```

````javascript
/* Rename all bitmaps layers */
$("%images%").rename("Hi! I'm a bitmaps layer");
```

````javascript
/* Get MSLayer object from query and log the class */
$("%selected%").each(function(){
  log($(this).MSLayer().class());
});
```

# Write plugins
````javascript
/* Example of groups filter plugin */
(function($){

  $.fn.areGroups = function() {
    // New array to store filtered layers
    var _layers = [];

    // this is a sQuery object and represent the queries layers
    // this.each() iterates through every queries layers
    this.each(function() {
    // $(this) represent one query layer
    // $(this).isGroup() is a private function of sQuery to determine if a sQuery layer object is a sketchapp LayerGroup
    if($(this).isGroup()) {
        // If $(this) is a group we put it into _layers array
        _layers.push(this);
      }
    });

    // this.layers is the base array to store query layers
    // "copy" _layers into this.layers
    this.layers = _layers.slice();
    
    // Retur this to allow chain methods
    return this;
  }

}(sQuery));
```

# Plugins
````javascript
/* Using areGroups() filter plugin */
$("%selected%").areGroups().rename("I'm a group");
```
