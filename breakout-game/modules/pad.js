export class Pad {
  constructor(config) {
    this.position = config?.position
    this.size = config?.size
    this.color = config?.color

    document.addEventListener('keypress', this.onKeyPress.bind(this))
  }

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

  onKeyPress = (e) => {
    if (e.code === 'ArrowRight') {
      this.move(5)
    }

    if (e.code === 'ArrowLeft') {
      this.move(-5)
    }
  }

  move = (amount) => {
    this.position.x += amount
  }

  collide = () => {}
}
