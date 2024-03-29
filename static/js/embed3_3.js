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
                console.log('Found the sheet I need for filter: ', activeFilterSheet.name)
                // now let's find all the filters on this sheet
                worksheets[i].getFiltersAsync().then(getFilters);
                // Lesson 3_3
                // Just like in the filtering examples, we need to know which sheet 
                //    we're going to make selections on. 
                // To keep things simple, we're going to use Sale Map again 
                // Nothing to do here, just notice we're creating "activeSelectSheet"
                //    to use later on in our code
                activeSelectSheet = worksheets[i];
                console.log('Found the sheet I need for selecting: ', activeSelectSheet.name)
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
              if (filter.fieldName == "Category")
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

function selectTableau(fieldName, value, action = "select-replace") {
  // Lesson 3_3
  // we need to create the call to the method to apply our selections. 
  // the syntax is a little tricker than the filter examples as we need to create 
  // a SelectionCriteria Array first
  // this link will explain it. HINT: there is a handy example at the bottom of the page!
  // https://help.tableau.com/current/api/embedding_api/en-us/reference/interfaces/worksheet.html#selectmarksbyvalueasync



  
}

function selectClear() {
    activeSelectSheet.clearSelectedMarksAsync();
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
