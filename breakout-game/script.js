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
const BALL_CONF = {
  COLOR: 'blue',
  SIZE: {
    W: 10,
    H: 10,
  },
  START_POS: {
    X: canvas.clientWidth / 2,
    Y: canvas.clientHeight - 30,
  },
  SPEED: 10,
}
const PAD_CONF = {
  COLOR: 'black',
  SIZE: {
    W: 130,
    H: 15,
  },
  START_POS: {
    X: ( canvas.clientWidth - 130 ) / 2,
    Y: canvas.clientHeight - 50
  }
}

// varibles
let bricks
let ball
let pad

// functions
const init = () => {
  bricks = initBricks(BRICK_CONF.ROWS, BRICK_CONF.COLS)
  ball = initBall()
  pad = initPad()
  setInterval(delta, 10)
}

const delta = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  moveBall()
  draw()
}

const draw = () => {
  drawBricks(bricks)
  drawBall(ball)
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

const initBall = () => {
  let ball = {
    position: {
      x: BALL_CONF.START_POS.X,
      y: BALL_CONF.START_POS.Y,
    },
    speed: {
      x: 0,
      y: BALL_CONF.SPEED,
    },
  }
  return ball
}

const moveBall = () => {
  if (
    ball.position.x < BALL_CONF.SIZE.W ||
    ball.position.x > canvas.width - BALL_CONF.SIZE.W
  ) {
    ball.speed.x *= -1
  }
  if (
    ball.position.y < BALL_CONF.SIZE.H ||
    ball.position.y > canvas.height - BALL_CONF.SIZE.H
  ) {
    ball.speed.y *= -1
  }
  ball.position.x += ball.speed.x
  ball.position.y += ball.speed.y
}

const drawBall = (ball) => {
  ctx.beginPath()
  ctx.ellipse(
    ball.position.x,
    ball.position.y,
    BALL_CONF.SIZE.W,
    BALL_CONF.SIZE.H,
    0,
    0,
    Math.PI * 2
  )
  ctx.fillStyle = 'black'
  ctx.stroke()

  ctx.fillStyle = BALL_CONF.COLOR
  ctx.fill()
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
  ctx.fillRect(
    pad.position.x,
    pad.position.y,
    PAD_CONF.SIZE.W,
    PAD_CONF.SIZE.H
  )
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
