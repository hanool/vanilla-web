export class World {
  constructor(components) {
    this.components = new Array()
    if (components !== null && components instanceof Array) {
      this.components = this.components.concat(components)
    }
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
