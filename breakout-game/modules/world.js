const IComponent = ["maxX", "minX", "maxY", "minY", "collide"]
const IDrawble = ["draw"]

export class World {
  constructor(canvas, ctx) {
    this.canvas = canvas
    this.ctx = ctx
    this.components = new Array()
    requestAnimationFrame(this.draw.bind(this))
  }

  /**
   * Draws all drawable components to the canvas. 
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.checkCollision()
    this.checkBroken()
    this.components.forEach(comp => {
      if (this.isDrawable(comp)) {
        comp.draw(this.ctx)
      }
    })

    requestAnimationFrame(this.draw.bind(this))
  }

  /**
   * Check if given object implements IDrawble.
   * @param {Object} object to check.
   * @return {boolean}
   */
  isDrawable(obj) {
    if (!obj) return false
    return IDrawble.every(func => typeof obj[func] === 'function')
  }

  /**
   * Check if given object implements IComponent.
   * @param {Object} object to check.
   * @return {boolean}
   */
  isComponent(obj) {
    if (!obj) return false
    return IComponent.every(func => typeof obj[func] === 'function')
  }

  /**
   * Adds given object to world's components if it's component.
   * @param {Object} object to add. Only the object that implements IComponent will be added.
   */
  add(obj) {
    if (!this.isComponent(obj)) return

    this.components.push(obj)
  }

  addAll(objs) {
    if (objs instanceof Array) {
      objs.forEach(obj => this.add(obj))
    }
  }

  /**
   * Check if there's any component colliding each other.
   * If components are colliding, triggers collide function to that components.
   */
  checkCollision() {
    let result = []
    if (this.components.length < 2) {
      return result
    }

    for (let i = 0; i < this.components.length; i++) {
      let compA = this.components[i]
      for (let j = i + 1; j < this.components.length; j++) {
        let compB = this.components[j]
        if (this.isIntersect(compA, compB)) {
          compA.collide(compB)
          compB.collide(compA)
        }
      }
    }
    return result
  }

  isBrick(comp) {
    return comp.constructor.name === 'Brick'
  }

  checkBroken() {
    this.components
      .filter(comp => this.isBrick(comp))
      .forEach(comp => {
        if (comp.broken) {
          let index = this.components.indexOf(comp)
          if (index > -1) {
            this.components.splice(index, 1)
          }
        }
      })
  }

  /**
   * Check given two components are intersected.
   * @param {IComponent} component object
   * @param {IComponent} another component object
   * @return true if two components are intersected. false if not.
   */
  isIntersect(compA, compB) {
    let aLeftOfB = compA.maxX() < compB.minX()
    let aRightOfB = compA.minX() > compB.maxX()
    let aAboveB = compA.minY() > compB.maxY()
    let aBelowB = compA.maxY() < compB.minY()

    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB)
  }
}
