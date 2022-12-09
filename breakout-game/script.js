import { Ball } from './modules/ball.js'
import { Brick } from './modules/brick.js'
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

// functions
const init = () => {
  let ctx = canvas.getContext("2d")
  let components = new Array()
  components = components.concat(createBricks(BRICK_CONF.ROWS, BRICK_CONF.COLS))
  components = components.concat(createBall())
  components = components.concat(initPad())
  world = new World(canvas, ctx)
  world.addAll(components)
}

const createBricks = (rows, cols) => {
  let bricks = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let brick = new Brick({
        position: {
          x: BRICK_CONF.START_POS.X + j * (BRICK.SIZE.X + BRICK_CONF.GAP),
          y: BRICK_CONF.START_POS.Y + i * (BRICK.SIZE.Y + BRICK_CONF.GAP),
        },
        size: {
          width: BRICK.SIZE.X,
          height: BRICK.SIZE.Y,
        },
        color: BRICK.COLOR,
        broken: false,
      })
      bricks.push(brick)
    }
  }

  return bricks
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
