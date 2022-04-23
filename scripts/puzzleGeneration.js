// function to build the puzzle layout
function generatePuzzle(size, tokenList) {
	// get tokens
	let tokens = shuffle(tokenList)

	let puzzle = [ ]
	let i = 0
	for (let x = 0; x < size; x++) {
		let row = [ ]

		for (let y = 0; y < size; y++) {
			row.push(tokens[i])
			i++
		}

		puzzle.push(row)
	}

	return puzzle
}

// function to generate clues
// returns an array of clues
// difficulty should be a positive integer, the lower the easier
function generateClues(puzzle, difficulty) {

	let clueArray = []
	
	// start with solved puzzle
	// every loop, remove one piece of information, making a new state
	// this new state must be able to be solved into the previous state
	
	// start with the solved puzzle
	clueArray.push(puzzle)
	console.log(clueArray)
	for (let i = 0; i <= difficulty; i++) {
		
		let pendingClues = []
		// every loop, iterate over every clue and add a step back
		// for now let's only have clue bisection
		for (let ii = 0; ii < clueArray.length; ii++) {
			// take the clue and seperate it into two seperate, smaller clues
			let clue = clueArray[ii]

			// if the clue is more than 2 tokens tall
			if (clue.length > 2) {
		
				// get the halfway point
				let halfCeil = Math.ceil(clue.length / 2)
				let halfFloor = Math.floor(clue.length / 2)
	
				// make the new clues
				let clue1 = bisectClue(clue, 0, halfCeil, 0, clue[0].length)
				let clue2 = bisectClue(clue, halfFloor, clue.length, 0, clue[0].length)
	
				// push the new clues
				clueArray[ii] = clue1;
				pendingClues.push(clue2)
			}
			// if the clue is more than 2 tokens wide
			else if (clue[0].length > 2) {

				// get the halfway point
				let halfCeil = Math.ceil(clue[0].length / 2) 
				let halfFloor = Math.floor(clue[0].length / 2) 
				
				// make the new clues
				let clue1 = bisectClue(clue, 0, clue.length, 0, halfCeil)
				let clue2 = bisectClue(clue, 0, clue.length, halfFloor, clue[0].length)
	
				// push the new clues
				clueArray[ii] = clue1;
				pendingClues.push(clue2)
			}
		}

		pendingClues.forEach(x => clueArray.push(x))

		console.log(clueArray)
	}

	return shuffle(clueArray)
}

// function for generating an empty clue with a selectable size
function getNewEmptyClue(height, width) {
	let clue = []

	for (let x = 0; x < height; x++) {
		let row = []
		for (let y = 0; y < width; y++) {
			row.push('')
		}
		clue.push(row)
	}

	return clue
}

function bisectClue(clue, startX, endX, startY, endY) {
	let bisClue = []

	for (let x = startX; x < endX; x++) {
		let row = []
		for (let y = startY; y < endY; y++) {
			row.push(clue[x][y])
		}
		bisClue.push(row)
	}

	return bisClue
}