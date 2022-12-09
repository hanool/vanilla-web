export class Brick {
  constructor(config) {
    this.position = config?.position
    this.speed = config?.speed
    this.size = config?.size
    this.color = config?.color
    this.broken = false
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

  collide = (obj) => {
      this.broken = true
  }
}
