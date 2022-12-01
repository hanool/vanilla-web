export class Ball {
  constructor(config) {
    this.position = config?.position
    this.speed = config?.speed
    this.size = config?.size
    this.color = config?.color
  }

  draw = (ctx) => {
    ctx.beginPath()
    ctx.ellipse(
      this.position.x,
      this.position.y,
      this.size,
      this.size,
      0,
      0,
      Math.PI * 2
    )

    ctx.fillStyle = 'black'
    ctx.stroke()

    ctx.fillStyle = this.color
    ctx.fill()
  }

  move = () => {
    this.position.x += this.speed.x
    this.position.y += this.speed.y
  }
}
