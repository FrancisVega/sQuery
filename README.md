# sQuery 1.0
A growing small library of chain methods "in a jQuery way" for Sketch to make the selection and filter task a little easiest :)

# Install
Copy sQuery.js inside your sketch plugin bundle.
Then just import them into your scripts.
````javascript
// Import sQuery
@import 'sQuery.js';

// Your code here
```

# Some (silly) examples
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
/* Get the last layer object from query and log the class */
$("%selected%").each(function(){
  log($(this).layers[0].class());
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
/* Rename groups from selection */
$("%selected%").areGroups().rename("I'm a group");

/* re-Select in Sketch just the shape layers from sketch selection */
$("%selected%").areShapes().UISelect();

/* Move selected layers by 20 units in x at fixed pixel coords */
$("%selected%").move({"x":20, "y":0}, true);
```

# License

The MIT License (MIT)

Copyright (c) 2017 Francis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

