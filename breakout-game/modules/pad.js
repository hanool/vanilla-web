export class Pad {
  constructor(config) {
    this.position = config?.position
    this.size = config?.size
    this.color = config?.color
    this.speed = 0

    document.addEventListener('keydown', this.onKeyDown.bind(this))
    document.addEventListener('keyup', this.onKeyUp.bind(this))
  }

  isMoving = () => this.speed !== 0

  maxX = () => {
    return this.position.x + this.size.width
  }

  minX = () => {
    return this.position.x
  }

  maxY = () => {
    return this.position.y + this.size.height
  }

  minY = () => {
    return this.position.y
  }

  draw = (ctx) => {
    this.position.x += this.speed

    ctx.fillStyle = this.color
    ctx.fillRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )

    ctx.strokeStyle = 'black'
    ctx.strokeRect(
      this.position.x,
      this.position.y,
      this.size.width,
      this.size.height
    )
  }

  onKeyDown = (e) => {
    if (e.code === 'ArrowRight') {
      this.speed = 5
    }

    if (e.code === 'ArrowLeft') {
      this.speed = -5
    }
  }

  onKeyUp = () => {
    this.speed = 0
  }

  move = () => {
    this.position.x += speed
  }

  collide = () => { }
}
