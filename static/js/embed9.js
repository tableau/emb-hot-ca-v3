// fires when all html css and images are loaded, but doesn't wait for iframe content
window.onload = function () {
   viz = document.getElementById('tableauViz');
   console.log(viz);
   window.location.href = '/complete';
   // call the ready() function when the tableau iframe is ready to interact with and fully loaded

   }
