# sQuery
A growing small library of chain methods "in a jQuery way" for Sketch to make the selection and filter task a little easiest :)


# Some examples
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
/* Remove all empty groups */
$("%groups%").isEmpty().remove();
```

````javascript
/* Rename all bitmaps layers */
$("%images%").rename("Hi! I'm a bitmaps layer");
```
