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

	let totalTokenCount = 0
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
			totalTokenCount++
		}

		solvedPuzzle.push(row)
	}

	console.log(solvedPuzzle)
	
	let isPuzzleSolved = false
	let isPuzzleUnsolvable = false

	// if it's solved or unsolvable, end the loop
	while(!(isPuzzleSolved || isPuzzleUnsolvable)) {

		// if we go through the entire puzzle and can do nothing then the puzzle is unsolvable
		let madeProgress = false

		let solvedTokenCount = 0
		// iterate through the clues
		for (let i = 0; i < clueArray.length; i++) {
			let clue = clueArray[i]

			// look at the clue
			for (let x = 0; x < clue.length; x++) {
				for (let y = 0; y < clue[x].length; y++) {
					
					// if the token is already solved, just skip it
					if (solvedPuzzle[x][y].isSolved) {
						continue
					}

					let clueToken = clue[x][y]
					
					// if the token has a letter
					if (/[a-zA-Z]/.test(clueToken)) {
						solvedPuzzle[x][y].hasLetter = true
						solvedPuzzle[x][y].check()
						madeProgress = true
					}

					// if the token has a number
					if (/[0-9]/.test(clueToken)) {
						solvedPuzzle[x][y].hasNumber = true
						solvedPuzzle[x][y].check()
						madeProgress = true
					}

					if (solvedPuzzle[x][y].isSolved) {
						solvedTokenCount++
					}
				}
			}
		}

		// if all tokens are solved
		if (solvedTokenCount === totalTokenCount) {
			// puzzle is solved
			isPuzzleSolved = true
		} else if (solvedTokenCount > totalTokenCount) {
			console.error('Somehow, we have solved more tokens than there are tokens that exist.')
		} else if (solvedTokenCount === totalTokenCount - 1) {
			// solved by rule 2
			isPuzzleSolved = true
		}

		if (madeProgress == false) {
			isPuzzleUnsolvable = true
		}
	}

	if (isPuzzleSolved) {
		console.log("Solved puzzle")
	}

	if (isPuzzleUnsolvable) {
		console.log("Could not solve puzzle")
	}
}