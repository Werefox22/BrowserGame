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

	let clue = puzzle
	let rngX = Math.floor(Math.random() * puzzle.length)
	let rngY = Math.floor(Math.random() * puzzle.length)

	clue[rngX][rngY] = ""

	clueArray.push(clue)

	isSolvable(clueArray, puzzle)
	return clueArray
}

// a function to check that the puzzle is solvable with the clues that are given
function isSolvable(clueArray, puzzle) {
	let solvedPuzzle = []

	// build puzzle checker
	for (let x = 0; x < puzzle.length; x++) {
		let row = [ ]

		for (let y = 0; y < puzzle[x].length; y++) {
			let clue = { 
				'hasLetter': false,
				'hasNumber': false,
				'isSolved': false,
				check() {
					this.isSolved = (this.hasLetter && this.hasNumber) || this.isSolved
				}
			}

			row.push(clue)
		}

		solvedPuzzle.push(row)
	}

	console.log(solvedPuzzle)
	
	// check each square and see if it has a letter and a number assigned to it	
	for (let i = 0; i < clueArray.length; i++) {
		let clue = clueArray[i]

		// iterate through the clue
		for (let x = 0; x < clue.length; x++) {
			for (let y = 0; y < clue[x].length; y++) {

				let token = clue[x][y]
				
				// if the token has a letter
				if (/[a-zA-Z]/.test(token)) {
					solvedPuzzle[x][y].hasLetter = true
					solvedPuzzle[x][y].check()
				}

				// if the token has a number
				if (/[0-9]/.test(token)) {
					solvedPuzzle[x][y].hasNumber = true
					solvedPuzzle[x][y].check()
				}
			}
		}
	}

	
}