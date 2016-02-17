// liveQuery
// @shortcut cmd '

var onRun = function(context) {
  @import '../sQuery.js';
  @import '../plugins/sQuery.areGroups.js';
  @import '../plugins/sQuery.areShapes.js';
  @import '../plugins/sQuery.areTexts.js';
  @import '../plugins/sQuery.areImages.js';

  var doc = context.document;
  var sq = [doc askForUserInput:"sQuery?" initialValue:""];
  var previousSelection = $('%selected%');
  var previousLayers = previousSelection.layers;
  var finalSelection;

  if (sq == "" || sq == "shapes" || sq == "shape" || sq == "s" || sq == "S" || sq == "l" || sq == "L" || sq == "v" || sq == "V") {
    finalSelection = previousSelection.areShapes();
  }

  if (sq == "group" || sq == "groups" || sq == "g" || sq == "G") {
    finalSelection = previousSelection.areGroups();
  }

  if (sq == "text" || sq == "texts" || sq == "t" || sq == "T") {
    finalSelection = previousSelection.areTexts();
  }

  if (sq == "image" || sq == "images" || sq == "i" || sq == "I") {
    finalSelection = previousSelection.areImages();
  }

  if (finalSelection.layers.length > 0) {
    finalSelection.UISelect();
  } else {
    previousSelection.layers = previousLayers.slice();
  }

}
