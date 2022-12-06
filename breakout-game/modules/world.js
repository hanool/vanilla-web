const IComponent = [ "maxX", "minX", "maxY", "minY", "collide" ]

export class World {
  constructor(components) {
    this.components = new Array()
    if (components instanceof Array) {
      components.forEach(comp => this.add(comp))
    }
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

  add(obj) {
    if (!this.isComponent(obj)) return
    
    this.components = this.components.push(obj)
  }

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

  isIntersect(compA, compB) {
    aLeftOfB = compA.maxX() < compB.minX()
    aRightOfB = compA.minX() > compB.maxX()
    aAboveB = compA.minY() > compB.maxY()
    aBelowB = compA.maxY() < compB.minY()

    return !(aLeftOfB || aRightOfB || aAboveB || aBelowB)
  }
}
