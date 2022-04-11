// how the game works:
// the player chooses a grid size and difficulty
// the game builds a layout
// the game generates clues based on the difficulty
// the player solves the puzzle using the clues and places the tokens in the correct positions
// the game checks that all of the tokens are correct

function main() {

	// build the game grid
	function buildGrid(size) {
		const gameBox = document.querySelector("#box")

		let gridLines = ""

		for (let x = 0; x < size; x++) {
			gridLines += "auto "

			for (let y = 0; y < size; y++) {

				let grid = document.createElement("div")

				grid.classList.add("grid")

				gameBox.append(grid)
			}
		}

		gameBox.style.gridTemplateColumns = gridLines
		gameBox.style.gridTemplateRows = gridLines
	}
	buildGrid(2)
}
