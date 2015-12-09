# sQuery
Una pequeña librería con métodos encadenables "tipo jQuery" para Sketch

# Ejemplos

````javascript
/* Oculta todas las capas */
$("*").hide()
```

````javascript
/* Oculta todas las capas de texto con menos del 10% de opacidad */
$("%textLayers%").filter(function(){
    return $(this).opacity() < 10;
}).hide();
```

````javascript
/* Borra todos los grupos vacíos */
$("%groups%").isEmpty();
```

````javascript
/* Renombra las capas de imágenes */
$("%images%").rename("Hi! I'm a bitmaps layer");
```
