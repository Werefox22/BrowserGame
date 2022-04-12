// original script sourced from https://www.w3schools.com/howto/howto_js_draggable.asp
const dragOffset = [25, 25]

function dragElement(elmnt) {
  var mouseX = 0, mouseY = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();

	// set the class so the positioning is absolute
	elmnt.classList.add('dragging')

	// call a function when the mouse is unpressed:
    document.onmouseup = closeDragElement;
	
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    mouseX = e.clientX;
    mouseY = e.clientY;

    // set the element's new position:
    elmnt.style.left = (mouseX - dragOffset[0]) + "px";
	elmnt.style.top = (mouseY - dragOffset[1]) + "px";
	}

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;

	// remove absolute positioning
	elmnt.classList.remove('dragging')
  }
}