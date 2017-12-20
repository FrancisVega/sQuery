# sQuery
A growing small library of chain methods "in a jQuery way" for Sketch to make the selection and filter task a little easiest :)

# Install
Copy sQuery.js inside your sketch plugin bundle.
Then just import them into your scripts.
```javascript
// Import sQuery
@import 'sQuery.js';

// Your code here
```

# Some (silly) examples
```javascript
/* Hide all layers and groups */
$("*").hide()
```

```javascript
/* Hide all text layers with less than 10% opacity */
$("%textLayers%").filter(function(){
    return $(this).opacity() < 0.1;
}).hide();
```

```javascript
/* Loop through each group and rename it with and "index" */
$("%groups%").each(function(idx){
    $(this).rename("I'm group number " + idx);
});
```

```javascript
/* Remove all empty groups */
$("%groups%").isEmpty().remove();
```

```javascript
/* Rename all bitmaps layers */
$("%images%").rename("Hi! I'm a bitmaps layer");
```

# Write plugins
```javascript
/* Example of groups filter plugin */
  $.fn.areGroups = function() {
    this.layers = this.layers.slice().filter(layer => layer.class() == MSLayerGroup);
    return this;
  }
```

# Plugins
```javascript
/* Rename groups from selection */
$("%selected%").areGroups().rename("I'm a group");

/* re-Select in Sketch just the shape layers from sketch selection */
$("%selected%").areShapes().UISelect();

/* Move selected layers by 20 units in x at fixed pixel coords */
$("%selected%").move({"x":20, "y":0}, true);
```

# Method list

- sLayers : -> sQuery
- texts : -> sQuery
- groups : -> sQuery
- pages : -> sQuery
- artboards : -> sQuery
- shapes : -> sQuery
- images : -> sQuery
- isLocked : -> sQuery
- startsWith : string -> sQuery
- endsWith : string -> sQuery
- contains : string -> sQuery
- withName : string -> sQuery
- childs : -> sQuery
- hasClickThrought : -> sQuery
- setHasClickThrough : bool [false] -> sQuery
- toggleClickThrought : -> sQuery
- isEmpty : -> sQuery
- isVisible : -> sQuery
- isHidden : -> sQuery
- visibility : bool -> sQuery
- show : -> sQuery
- hide : -> sQuery
- lock : -> sQuery
- unlock : -> sQuery
- duplicate : string -> sQuery
- remove : -> sQuery
- opacity : float -> sQuery
- absolutePosition : -> sQuery
- relativePosition : -> sQuery
- rename : string -> sQuery
- UISelect : -> sQuery
- each : function -> sQuery
- filter : function -> sQuery
- group : string -> sQuery
- createShapeLayer : string -> number -> number -> number -> number -> mslayer
- createArtboard : string -> number -> number -> number -> number -> artboard
