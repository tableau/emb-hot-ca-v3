// fires when all html css and images are loaded, but doesn't wait for iframe content
window.onload = function () {
  viz = document.getElementById('tableauViz');
   
      
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
