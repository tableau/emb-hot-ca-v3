// fires when all html css and images are loaded, but doesn't wait for iframe content
window.onload = function () {
   viz = document.getElementById('tableauViz');
   console.log(viz);
   // call the ready() function when the tableau iframe is ready to interact with and fully loaded
   viz.addEventListener("firstinteractive", ready);
   }

// called when the tableau iframe content has chnged and is ready to interact with
function ready() {
  console.log("Viz has loaded!");
  activeSheet = viz.workbook.activeSheet;
  console.log("Active sheet:", activeSheet.name);
  console.log("Worksheet type:", activeSheet.sheetType);
  console.log("Workbook name:", viz.workbook.name);
  // determine what type of sheet it is, worksheet, dashboard or story
  switch (activeSheet.sheetType)
      {
        case 'worksheet':
        //this is just a placeholder to show as example
        break;
        case 'dashboard':
        console.log('Found Dashboard!')
          worksheets = activeSheet.worksheets;
          for(i=0;i<worksheets.length;i++)
          {
            console.log(worksheets[i].name); // Do anything you'd like with a given worksheet
            switch (worksheets[i].name) {
              // Lesson 3_2_1
              // We're going to be using the filter called Region
              // And we're working with filters on the sheet called Sales Map
              // Fill in the name of the sheet in the case statement to set activeFilterSheet
              case '':
                // need to save it with variable to use it later in other functions
                activeFilterSheet = worksheets[i];
                console.log('Found the sheet I need for filter: ', activeFilterSheet)
                break;
            }
          }
        break;
        case 'story':
        //this is just a placeholder to show as example
        break;
        }

}

function filterTableau(filterName, value, action = "replace") {
    //Lesson 3_2_1 
    //call the applyFilterAsync method of the activeFilterSheet
    //This takes 3 parameters, which are all being passed or set in this fuction
    //https://help.tableau.com/current/api/embedding_api/en-us/reference/interfaces/worksheet.html#applyfilterasync
    
    
}

function filterClear(filterName) {
    //Lesson 3_2_1
    //similarly to the filterTableau function, but we need to call the clearFilterAync method
    //the only take a single paramter though 
    //https://help.tableau.com/current/api/embedding_api/en-us/reference/interfaces/worksheet.html#clearfilterasync
    
    
}

//sheet switching
function change_viz(url) {
  // siply set the src to the new sheet and it will render in the existing container/object
  // if onfirst interactive is set then it will trigger this again when the new src has loaded
    viz.src = url;
}

// revert all
function revertAll() {
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
