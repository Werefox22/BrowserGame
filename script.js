// how the game works:
// the player chooses a grid size and difficulty
// the game builds a layout
// the game generates clues based on the difficulty
// the player solves the puzzle using the clues and places the tokens in the correct positions
// the game checks that all of the tokens are correct

var currentSelectedToken = null

function main() {

	const size = Number.parseInt(window.prompt("Grid size?"))
	const clueCount = NUmber.parseInt(window.prompt("Clue count?"))
	const gridSquares = []
	// build the game grid
	function buildGrid(size) {
		// get the parent grid
		const gameBox = document.querySelector("#box")

		let gridLines = ""

		// loop x and y, mainly to easily track the coords of a grid item
		for (let x = 0; x < size; x++) {
			gridLines += "auto "

			for (let y = 0; y < size; y++) {

				let grid = document.createElement("div")

				grid.classList.add("grid")

				grid.addEventListener('mouseup', () => moveTokenToGrid(currentSelectedToken, grid))

				gameBox.append(grid)
				gridSquares.push(grid)
			}
		}

		// set the grid of the parent based of how many lines there are, which is just equal to size
		gameBox.style.gridTemplateColumns = gridLines
		gameBox.style.gridTemplateRows = gridLines
	}
	buildGrid(size)

	const tokenTray = document.querySelector("#token-tray")
	tokenTray.addEventListener('mouseup', () => moveTokenToGrid(currentSelectedToken, tokenTray))

	// function for building a list of tokens
	function getTokenList(size) {
		// list alphabet to reference in the token names
		const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

		let tokens = [ ]
		for (let x = 0; x < size; x++) {

			for (let y = 0; y < size; y++) {

				let token = alphabet[x] + (y + 1)
				tokens.push(token)
			}
		}
		return tokens
	}
	const tokenList = getTokenList(size)

	// function to build the tray of tokens
	function buildTokens(tokenList) {
		const tokenHolder = document.querySelector("#token-tray")

		for (let i = 0; i < tokenList.length; i++) {
			let token = document.createElement("div")

			token.classList.add("token")
			token.textContent = tokenList[i]
			dragElement(token)

			tokenHolder.append(token)
		}
	}
	buildTokens(tokenList)

	// function to build the puzzle layout
	function buildPuzzle(size) {
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
	const puzzle = buildPuzzle(size)
	console.log(puzzle)

	// function to handle token movement
	function moveTokenToGrid(token, grid) {
		// if there's a token to move AND it's either not a grid (it's the token tray) OR it's empty
		if (token != null && (!grid.classList.contains("grid") || grid.childNodes.length === 0)) {
			grid.append(token)
			checkWinCondtion()
		}
	}

	// function that checks if the game has won
	function checkWinCondtion() {

		// check how many squares are occupied
		let i = 0

		for (let x = 0; x < size; x++) {

			for (let y = 0; y < size; y++) {
				// if the square has something
				if (gridSquares[i].childNodes.length > 0) {
					// compare it to the solution
					if (gridSquares[i].childNodes[0].textContent === puzzle[x][y]) {
						// it's correct
					} else {
						// incorrect square
						return false
					}
				} else {
					// if the square is empty
					return false
				}

				i++
			}
		}

		console.log("You win!")
	}
}

// shuffle function sourced from https://bost.ocks.org/mike/shuffle/
function shuffle(array) {
	var m = array.length, t, i;
  
	// While there remain elements to shuffle…
	while (m) {
  
	  // Pick a remaining element…
	  i = Math.floor(Math.random() * m--);
  
	  // And swap it with the current element.
	  t = array[m];
	  array[m] = array[i];
	  array[i] = t;
	}
  
	return array;
  }