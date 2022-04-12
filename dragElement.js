// original script sourced from https://www.w3schools.com/howto/howto_js_draggable.asp
const dragOffset = [10, 10]

function dragElement(elmnt, token) {
  	var mouseX = 0, mouseY = 0;
  	elmnt.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();

		// tell the script what token we're holding
		currentSelectedToken = token

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
		elmnt.style.left = (mouseX + dragOffset[0]) + "px";
		elmnt.style.top = (mouseY + dragOffset[1]) + "px";
	}
	
	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;

		// tell the script we're not holding a token anymore
		currentSelectedToken = null

		// remove absolute positioning
		elmnt.classList.remove('dragging')
  	}
}