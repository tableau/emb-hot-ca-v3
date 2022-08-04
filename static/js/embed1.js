// revert all
function revertAll() {
  // Lesson 1
  // this line finds the document element with the id tableauViz
  //  and set this to an object called viz
  viz = document.getElementById('tableauViz');
 
  // you can then use a method of this viz object to revert to initial view
  //https://help.tableau.com/current/api/embedding_api/en-us/reference/interfaces/viz.html#revertallasync
  // on the next line, call the revertAllAsync() method of the viz object  

  
}

// undo last action
function undo() {
  // Lesson 1
  // similar to the revertAll function
  // first add the code to set the viz object from the tableauViz element

  // next call the method undoAync()

}

// redo last action
function redo() {
  // Lesson 1
  // similar to the revertAll function
  // first add the code to set the viz object from the tableauViz element
  
  // next call the method redoAync()

}
