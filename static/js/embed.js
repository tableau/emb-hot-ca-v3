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
                          case 'Sales Map':

                            worksheets[i].getFiltersAsync().then(getFilters);

                            // need to save it with global variable to use it later in other functions
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


function getFilters(filters)
        {
          var filterStore = [];

          //create select (filter) variable we will use to inject into HTML//
//           var selectRegion = document.createElement('select');
//          selectRegion.setAttribute("onchange","regionFilter(value);")


          // Use the Option constructor: args text, value, defaultSelected, selected
//          var optionSR = new Option('(All)', 'All', false, false);
//          selectRegion.appendChild(optionSR);
          console.log("filters.length:", filters.length);
          globalNumberFilters = filters.length;
          // Iterate through the filters retrieving properties
          for (filter of filters)
          {
            var tmp_fieldName = filter.fieldName;
            console.log("Filter name: ", tmp_fieldName);
            var tmp_dtype = filter.filterType;
            console.log("Filter Type: ", tmp_dtype);
            switch(tmp_dtype)
            {
            // if filter type is categorical do this
            case 'categorical':
            // create temporary variable for uniqueValues e.g. { id: 1, text: "Office Supplies" }
              var tmp_uniqueValues = [];
              for (j = 0; j < filter.appliedValues.length; j++)
              {
  //              tmp_uniqueValues.push({"id":j, "text":filter.appliedValues[j].value});
                console.log("id: ",j ,"text: ",filter.appliedValues[j].value)
                if (tmp_fieldName == "Region")
                {
//                  optionSR = document.createElement('option');
//                  optionSR.value = filter.getAppliedValues()[j].value;
//                  optionSR.text = filter.getAppliedValues()[j].value;
//                  selectRegion.appendChild(optionSR);
                }
              };
              if (tmp_fieldName == "Region")
              {

console.log("Get Region Filter");
filter.getDomainAsync().then(domain)

//                  optionSR = document.createElement('option');
//                  optionSR.value = filter.getAppliedValues()[j].value;
//                  optionSR.text = filter.getAppliedValues()[j].value;
//                  selectRegion.appendChild(optionSR);
              }
              break;
            }

          }
          //document.getElementById("regionFilter").appendChild(selectRegion);
        }



function domain(stuff) {
a = stuff.type;
b = stuff.values;

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




    function filterRegion(filterName, value) {

          activeFilterSheet.applyFilterAsync(filterName, value, "replace");

    }

    function clearFilters(filterName) {

          activeFilterSheet.clearFilterAsync(filterName);

    }


//*** Part 4 - Marks Selections
    // We'll take in the values passed from dashboard.html and select only those marks.
   function selectStates(category, value) {
       sheet = viz.getWorkbook().getActiveSheet();
       if(sheet.getSheetType() === 'worksheet') {
            sheet.selectMarksAsync(category, value, tableau.SelectionUpdateType.REPLACE);
       } else {
           worksheetArray = sheet.getWorksheets();
           for(var i = 0; i < worksheetArray.length; i++) {
               worksheetArray[i].selectMarksAsync(category, value, tableau.SelectionUpdateType.REPLACE);
           }
       }
   }
    // We'll add to our selected marks.
   function addToStates(category, value) {
       sheet = viz.getWorkbook().getActiveSheet();
       if(sheet.getSheetType() === 'worksheet') {
            sheet.selectMarksAsync(category, value, tableau.SelectionUpdateType.ADD);
       } else {
           worksheetArray = sheet.getWorksheets();
           for(var i = 0; i < worksheetArray.length; i++) {
               worksheetArray[i].selectMarksAsync(category, value, tableau.SelectionUpdateType.ADD);
           }
       }
   }
    // Time to clear the marks.
    function clearSelection() {
         worksheetArray = sheet.getWorksheets();
         for(var i = 0; i < worksheetArray.length; i++) {
           worksheetArray[i].clearSelectedMarksAsync();
          }
        }

//*** Part 5b - Listen & Respond to Events
      function listenToMarksSelection() {
          viz.addEventListener(tableau.TableauEventName.MARKS_SELECTION, onMarksSelection);
      }

      //Mark selection Handler

      //this is the function we specified in the event listener to run whenever a mark selection event occurs
      function onMarksSelection(marksEvent) {

        //filter sheets of selected marks because we dont need to hear events on all of our sheets
        if (marksEvent.getWorksheet().getName() == "Sales Map"){

          //get,marksAsync() is a method in the API that will return a set of the marks selected
          return marksEvent.getMarksAsync().then(reportSelectedMarks);
        }
      }

      //This function is called after we get an array of marks from our mark selection event
      function reportSelectedMarks(marks) {

        //loop through all the selected marks
        for (var markIndex = 0; markIndex < marks.length; markIndex++) {

          //getPairs gets tuples of data for the mark. one mark has multiple tuples
          pairs = marks[markIndex].getPairs();

          //loop through the tuples
          for (var pairIndex = 0; pairIndex < pairs.length; pairIndex++) {

            //we want to insert certain fields into an external table, this logic will set variables in our javascript layer for those
            if (pairs[pairIndex].fieldName == "Country") {
              country = pairs[pairIndex].formattedValue;
            } else if (pairs[pairIndex].fieldName == "State") {
              stateName = pairs[pairIndex].formattedValue;
            } else if (pairs[pairIndex].fieldName == "SUM(Quantity)") {
              sumQuantity = pairs[pairIndex].formattedValue;
            }
          }
          console.log(pairs);
          $('#auditDetailTable tr:last').after('<tr><td>' + country + '</td><td>' + stateName + '</td><td>' + sumQuantity + '</td>');
        }
      }

      //Here we load the table with our "Generate Tables" button and unhide the "dataTablesDiv"
      function loadTable() {
          $('#dataTablesDiv').show();
       }

      function emptyTable(){
          $('#auditDetailTable').empty();
          $('#auditDetailTable').html("<tr><th>Country</th><th>State</th><th>Quantity</th></tr>");
          $('#dataTablesDiv').hide();
          clearSelection();
      }

      //This is the code to allow for web edit.
        // Modified options that adds an event listener for change in URL of iframe
        function launchEdit() {
            viz.getCurrentUrlAsync().then(function(current_url){
                //$("#edit").hide();
                edit_url = current_url.split('?')[0].replace('/views', '/authoring');
                edit_options = {
                	hideTabs: true,
                	hideToolbar: true,
                    onFirstInteractive: function () {
                        var iframe = document.querySelectorAll('iframe')[0];
                        iframe.onload = function(){
                            // Getting the URL post exit from web edit window
                            $("#edit").show();
                            console.log ("This always displays");
                            viz.getCurrentUrlAsync().then (function(current_url){
                                console.log (current_url);
                                loadViz (containerDiv, current_url, viz_options);
                            })
                        }
                    }
                };
                loadViz (containerDiv, edit_url, edit_options);
            })
        }

        // Actually loading the visualization
        function loadViz (containerDiv, url, options) {
            if (viz) {
                viz.dispose();
            }
            viz = new tableau.Viz(containerDiv, url, options);
        }
