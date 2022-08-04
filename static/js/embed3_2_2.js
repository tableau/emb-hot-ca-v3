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
              // we're working with filters on the sheet called "Sales Map"
              case 'Sales Map':
                // need to save it with variable to use it later in other functions
                activeFilterSheet = worksheets[i];
                console.log('Found the sheet I need for filter: ', activeFilterSheet)
                // now let's find all the filters on this sheet
                worksheets[i].getFiltersAsync().then(getFilters);
                break;
            }
          }
        break;
        case 'story':
        //this is just a placeholder to show as example
        break;
        }

}

function getFilters(filters)
        {
          var filterStore = [];
          console.log("Number of filters on the sheet, ", activeFilterSheet.name, " is: ", filters.length);
          globalNumberFilters = filters.length;
          // Iterate through the filters retrieving properties
          for (filter of filters)
          {
            console.log("Filter name: ", filter.fieldName, "; Filter type: ", filter.filterType);
            switch(filter.filterType)
            {
            // if filter type is categorical do this
            case 'categorical':
              // Lesson 3_2_3
              // We've reached the point where we need to get values for the specific filter
              // Check out the filters on the Sales Map in Tableau 
              // We've already used Region, and Order Date is not a categorical filter
              // So set the if statement to the remaining filter below
              if (filter.fieldName == "")
              {
                console.log("Get Category Filter");
                // get all the values the filter could take to display in the web page dynamically
                filter.getDomainAsync().then(domain)
              }
              break;
            }
          }
        }



function domain(filterValues) {
  // loop round the array of all filter values
  for (i=0;i<filterValues.values.length;i++)
    {
      console.log("Category Filter Value: ", filterValues.values[i].formattedValue);
      //add line to our dynamic filter
      htmlLine = "<a class=\"collapse-item\" href=\"#\" onclick=\"filterTableau(\'Category\',[\'" + filterValues.values[i].formattedValue +"\'])\">" + filterValues.values[i].formattedValue + "</a>"
      document.getElementById('dynFilter').innerHTML += htmlLine;
    }
  // add clear filter line
  htmlLine = "<a class=\"collapse-item\" href=\"#\" onclick=\"filterClear(\'Category\')\">Clear Filters</a>"
  document.getElementById('dynFilter').innerHTML += htmlLine;
}



function filterTableau(filterName, value, action = "replace") {
    activeFilterSheet.applyFilterAsync(filterName, value, action);
}

function filterClear(filterName) {
    activeFilterSheet.clearFilterAsync(filterName);
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
