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

// function to generate clues
// returns an array of clues
// difficulty should be a positive integer, the lower the easier
function generateClues(puzzle, difficulty) {

	let clueArray = []
	
	// start with solved puzzle
	// every loop, remove one piece of information, making a new state
	// this new state must be able to be solved into the previous state
	
	clueArray.push(getNewEmptyClue(1, 3))
	clueArray.push(getNewEmptyClue(3, 1))
	clueArray.push(getNewEmptyClue(2, 2))
	clueArray.push(getNewEmptyClue(4, 2))


	// isSolvable(clueArray, puzzle)
	return clueArray
}

// old clue generator and checker
/*
// function to generate clues
// returns an array of clues
// difficulty should be a positive integer, the lower the easier
function generateClues(puzzle, difficulty) {

	let clueArray = []
	
	// fill the array with  clues
	for (let i = 0; i < difficulty + 1; i++) {
		// make a new clue every time to avoid using the same clue multiple times
		let emptyClue = []
		for (let x = 0; x < puzzle.length; x++) {
			let row = []
			for (let y = 0; y < puzzle.length; y++) {
				row.push('')
			}
			emptyClue.push(row)
		}
	
		clueArray.push(emptyClue)
	}

	// get a random list of the tokens
	let tokens = []
	for (x = 0; x < puzzle.length; x++) {
		for (y = 0; y < puzzle.length; y++) {
			tokens.push([x, y])
		}
	}
	tokens = shuffle(tokens)

	let seenLetters = []
	let seenNumbers = []
	let oneBlank = false
	// iterate through the tokens
	for (let i = 0; i < tokens.length; i++) {
		let x = tokens[i][0]
		let y = tokens[i][1]
		
		// skip the number and letter the first time we see it
		let solution = puzzle[x][y]

		// track the letter
		let skipLetter = false
		if (!seenLetters.includes(solution[0])) {
			seenLetters.push(solution[0])
			skipLetter = true
		}

		// track the number
		let skipNumber = false
		if (!seenNumbers.includes(solution[1])) {
			seenNumbers.push(solution[1])
			skipNumber = true
		}

		// if we're skipping both, there's no need to run any more code on this pass
		if (skipLetter && skipNumber) {
			console.log("Skip both")
			// if we already had an empty square
			if (oneBlank) {
				skipNumber = false
				seenNumbers.pop()
			} else {
				oneBlank = true
				continue
			}
		}

		let clue1
		let clue2

		// if there are at least 3 clues
		if (clueArray.length > 2) {
			// pick 2 nonrepeating numbers
			let num1 = Math.floor(Math.random() * clueArray.length)
			let num2 = Math.floor(Math.random() * clueArray.length)
			
			if (num1 === num2) {
				num2++
				if (num2 >= clueArray.length) {
					num2 -= 2
				}
			}

			// assign the clues
			clue1 = clueArray[num1]
			clue2 = clueArray[num2]

		} else {
			// pick from the 2 clues randomly
			// or if there's 1 clue pick it twice
			clue1 = clueArray[Math.floor(Math.random() * clueArray.length)]
			clue2 = clueArray[Math.floor(Math.random() * clueArray.length)]
		}

		// add the solution to the 2 clues
		if (!skipLetter) {
			clue1[x][y] = solution[0] + clue1[x][y]
		}
		if (!skipNumber) {
			clue2[x][y] = clue2[x][y] + solution[1] + ""
		}
	}

	// isSolvable(clueArray, puzzle)
	return clueArray
}
*/

/*
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
*/