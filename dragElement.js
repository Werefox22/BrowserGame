// original script sourced from https://www.w3schools.com/howto/howto_js_draggable.asp
const dragOffset = [10, 10]

function dragElement(element) {
  	var mouseX = 0, mouseY = 0;
  	element.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();

		// tell the script what token we're holding
		currentSelectedToken = element

		// set the class so the positioning is absolute
		element.classList.add('dragging')

		// call a function when the mouse is unpressed:
		document.onmouseup = closeDragElement;
		
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;

		// call it to update the position immediately
		elementDrag(e)
	}

  	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();

		// calculate the new cursor position:
		mouseX = e.clientX;
		mouseY = e.clientY;

		// set the element's new position:
		element.style.left = (mouseX + dragOffset[0]) + "px";
		element.style.top = (mouseY + dragOffset[1]) + "px";
	}
	
	function closeDragElement() {
		// stop moving when mouse button is released:
		document.onmouseup = null;
		document.onmousemove = null;

		// tell the script we're not holding a token anymore
		currentSelectedToken = null

		// remove absolute positioning
		element.classList.remove('dragging')
  	}
}