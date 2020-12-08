const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let particleArray = []
let adjustX = 5
let adjustY = 5

//handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 250,
}

window.addEventListener('mousemove', function ({ x, y }) {
    mouse.x = x
    mouse.y = y
})

ctx.fillStyle = 'white'
ctx.font = '16px Verdana'
ctx.fillText('A', 0, 30)
const textCoordinates = ctx.getImageData(0, 0, 100, 100)

class Particle {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.size = 3
        this.baseX = this.x
        this.baseY = this.y
        //prettier-ignore
        this.density = (Math.random() * 3) + 5
    }
    draw() {
        ctx.fillStyle = 'red'
        ctx.beginPath()
        //const textCoordinates = ctx.getImageData(0, 0, 100, 100)
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.closePath()
        ctx.fill()
    }
    update() {
        let dx = mouse.x - this.x // 10  // 2
        let dy = mouse.y - this.y // 10  // 2
        let distance = Math.sqrt(dx * dx + dy * dy) // 33 // 3.46

        let forceDirectionX = dx / distance // 10/33 = .3      // 2 / 3.46 = .57
        let forceDirectionY = dy / distance // .3    // .57

        //let maxDistance = mouse.radius
        //250 -
        let force = (mouse.radius - distance) / mouse.radius // (250 - 33) / 250 = .868

        let directionX = forceDirectionX * force * this.density // .3 * .868 * 5.47607 = 1.4
        let directionY = forceDirectionY * force * this.density

        if (distance < mouse.radius) {
            this.x -= directionX
            this.y -= directionY
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX
                this.x -= dx / 5
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY
                this.y -= dy / 10
            }
        }
    }
}

console.log(textCoordinates)

function init() {
    particleArray = []
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.width; x < x2; x++) {
            if (
                textCoordinates.data[
                    y * 4 * textCoordinates.width + x * 4 + 3
                ] > 128
            ) {
                let positionX = x + adjustX
                let positionY = y + adjustY
                particleArray.push(new Particle(positionX * 20, positionY * 20))
            }
        }
    }
    animate()
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].draw()
        particleArray[i].update()
    }
    requestAnimationFrame(animate)
}

function connect() {
    for (let a = 0; a < particleArray.length; a++) {
        for (let b = a; b < particleArray.length; b++) {}
    }
}

init()
