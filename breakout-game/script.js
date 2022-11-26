const btnRules = document.getElementById('btn-show-rules')
const btnClose = document.getElementById('btn-close-rules')
const rules = document.getElementById('rules')
const canvas = document.getElementById('canvas')

// constants
const ctx = canvas.getContext('2d')
const BRICK_CONF = {
  ROWS: 4,
  COLS: 7,
  START_POS: {
    X: 20,
    Y: 30,
  },
  GAP: 10,
}
const BRICK = {
  SIZE: {
    X: 100,
    Y: 45,
  },
  COLOR: 'yellow',
}

// functions
const init = () => {
  let bricks = initBricks(BRICK_CONF.ROWS, BRICK_CONF.COLS)
  drawBricks(bricks)
}
const initBricks = (rows, cols) => {
  let bricks = []
  for (let i = 0; i < rows; i++) {
    let row = []
    for (let j = 0; j < cols; j++) {
      let brick = {
        position: {
          x: BRICK_CONF.START_POS.X + j * (BRICK.SIZE.X + BRICK_CONF.GAP),
          y: BRICK_CONF.START_POS.Y + i * (BRICK.SIZE.Y + BRICK_CONF.GAP),
        },
        size: {
          width: BRICK.SIZE.X,
          height: BRICK.SIZE.Y,
        },
        broken: false,
      }
      row.push(brick)
    }
    bricks.push(row)
  }

  return bricks
}

const drawBricks = (bricks) => {
  bricks.forEach((row) => {
    row.forEach((brick) => {
      if (!brick.broken) {
        drawBrick(brick)
      }
    })
  })
}

const drawBrick = (brick) => {
  ctx.fillStyle = BRICK.COLOR
  ctx.fillRect(
    brick.position.x,
    brick.position.y,
    brick.size.width,
    brick.size.height
  )

  ctx.strokeStyle = 'black'
  ctx.strokeRect(
    brick.position.x,
    brick.position.y,
    brick.size.width,
    brick.size.height
  )
}

const showRules = () => {
  rules.classList.add('show')
}

const hideRules = () => {
  rules.classList.remove('show')
}

// event listeners
window.addEventListener('load', init)
btnRules.addEventListener('click', showRules)
btnClose.addEventListener('click', hideRules)
