// how the game works:
// the player chooses a grid size and difficulty
// the game builds a layout
// the game generates clues based on the difficulty
// the player solves the puzzle using the clues and places the tokens in the correct positions
// the game checks that all of the tokens are correct

function main() {
	// track the mouse position and send it to the css fild
	let root = document.documentElement
	root.addEventListener("mousemove", e => {
		root.style.setProperty('--mouse-x', e.clientX + 'px')
		root.style.setProperty('--mouse-y', e.clientY + 'px')
	})

	const size = 3
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
				grid.textContent = `Grid (${x}, ${y})`

				gameBox.append(grid)
			}
		}

		// set the grid of the parent based of how many lines there are, which is just equal to size
		gameBox.style.gridTemplateColumns = gridLines
		gameBox.style.gridTemplateRows = gridLines
	}
	buildGrid(size)

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

	// function to build the list of tokens
	function buildTokens(tokenList) {
		const tokenHolder = document.querySelector("#token-tray")
		for (let i = 0; i < tokenList.length; i++) {
			let token = document.createElement("div")

			token.classList.add("token")
			token.textContent = tokenList[i]

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

	console.log(buildPuzzle(size))
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