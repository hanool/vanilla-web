import { Ball } from './modules/ball.js'
import { World } from './modules/world.js'

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

const PAD_CONF = {
  COLOR: 'black',
  SIZE: {
    W: 130,
    H: 15,
  },
  START_POS: {
    X: (canvas.clientWidth - 130) / 2,
    Y: canvas.clientHeight - 60,
  },
}

// varibles
let world
let bricks
let ball
let pad

// functions
const init = () => {
  bricks = initBricks(BRICK_CONF.ROWS, BRICK_CONF.COLS)
  ball = createBall()
  pad = initPad()
  setInterval(delta, 10)
  world = new World([ball])
}

const delta = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  world.checkCollision()
  ball.move()
  draw()
}

const draw = () => {
  drawBricks(bricks)
  ball.draw(ctx)
  drawPad(pad)
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

const createBall = () => {
  const BALL_CONF = {
    color: 'blue',
    size: 10,
    position: {
      x: canvas.clientWidth / 2,
      y: canvas.clientHeight - 90,
    },
    speed: {
      x: 0,
      y: -7,
    },
  }

  return new Ball(BALL_CONF)
}

const initPad = () => {
  let pad = {
    position: {
      x: PAD_CONF.START_POS.X,
      y: PAD_CONF.START_POS.Y,
    },
  }
  return pad
}

const drawPad = (pad) => {
  ctx.fillStyle = PAD_CONF.COLOR
  ctx.fillRect(pad.position.x, pad.position.y, PAD_CONF.SIZE.W, PAD_CONF.SIZE.H)
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
