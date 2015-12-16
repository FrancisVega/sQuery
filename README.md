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
    var _layers = [];

    this.each(function() {
      // isGroup() is a "private" method of sQuery
      if($(this).isGroup()) {
        _layers.push(this);
      }
    });

    this.layers = _layers.slice();
    return this;
  }

}(sQuery));
```

# Plugins
````javascript
/* Using areGroups() filter plugin */
$("%selected%").areGroups().rename("I'm a group");
```
