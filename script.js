const ROWS = 6
const COLS = 6
const COOLDOWN = 1000

let isFlipped = false

function createTile(row, col) {
	const tile = document.createElement('div')
	tile.className = 'tile'

	tile.innerHTML = `
    <div class="tile-face tile-front"></div>
    <div class="tile-face tile-back"></div>
  `

	const bgPosition = `${col * 20}% ${row * 20}%`
	tile.querySelector('.tile-front').style.backgroundPosition = bgPosition
	tile.querySelector('.tile-back').style.backgroundPosition = bgPosition

	return tile
}

function createBoard() {
	const board = document.querySelector('.board')

	for (let i = 0; i < ROWS; i++) {
		const row = document.createElement('div')
		row.className = 'row'

		for (let j = 0; j < COLS; j++) {
			row.appendChild(createTile(i, j))
		}

		board.appendChild(row)
	}
}

function initializeTileAnimations() {
	const tiles = document.querySelectorAll('.tile')

	tiles.forEach((tile, index) => {
		let lastEnterTime = 0

		tile.addEventListener('mouseenter', () => {
			const currentTime = Date.now()

			if (currentTime - lastEnterTime < COOLDOWN) return

			lastEnterTime = currentTime

			let tiltY = ((index % 6) - 2.5) * 15

			animateTile(tile, tiltY)
		})
	})

	document
		.getElementById('flipButton')
		.addEventListener('click', () => flipAllTiles(tiles))
}

function animateTile(tile, tiltY) {
	gsap
		.timeline()
		.set(tile, { rotateX: isFlipped ? 180 : 0, rotateY: 0 })
		.to(tile, {
			rotateX: isFlipped ? 450 : 270,
			rotateY: tiltY,
			duration: 0.5,
			ease: 'power2.out',
		})
		.to(
			tile,
			{
				rotateX: isFlipped ? 540 : 360,
				rotateY: 0,
				duration: 0.5,
				ease: 'power2.out',
			},
			'-=0.25',
		)
}

function flipAllTiles(tiles) {
	isFlipped = !isFlipped

	gsap.to(tiles, {
		rotateX: isFlipped ? 180 : 0,
		duration: 1,
		stagger: {
			amount: 0.5,
			from: 'center',
		},
		ease: 'power2.inOut',
	})
}

function init() {
	createBoard()
	initializeTileAnimations()
}

document.addEventListener('DOMContentLoaded', init)
