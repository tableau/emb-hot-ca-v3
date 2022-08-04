// fires when all html css and images are loaded, but doesn't wait for iframe content
window.onload = function () {
  // Lesson 3_1
  // find the document element with the id tableauViz
  // set this to an object called viz - just as Lesson 1
   
      
  // call the ready() function when the tableau iframe is ready to interact with and fully loaded
   viz.addEventListener("firstinteractive", ready);
   }

// called when the tableau iframe content has changed and is ready to interact with
function ready() {
  console.log("Viz has loaded!");
  activeSheet = viz.workbook.activeSheet;
  console.log("Active sheet:", activeSheet.name);
  console.log("Worksheet type:", activeSheet.sheetType);
  console.log("Workbook name:", viz.workbook.name);
}

//sheet switching
function change_viz(url) {
  // simply set the src to the new sheet and it will render in the existing container/object
  // if on first interactive is set then it will trigger this again when the new src has loaded
  
  // Lesson 3_1
  // set the source property of the viz object to the new url
    

}

// revert all
function revertAll() {
  // NB these functions no longer need the viz object setting
  //   as we're setting this when the view loads initially
  viz.revertAllAsync();
}
// undo last action
function undo() {
  viz.undoAsync();
}

// redo last action
function redo() {
  viz.redoAsync();
}
