import init, {Direction, World} from "wasm-snake"

init().then(_ => {
    const CELL_SIZE = 15
    const WORLD_WIDTH = 8

    const snakeSpawnIdx = Date.now() % (WORLD_WIDTH * WORLD_WIDTH)

    const world = World.new(WORLD_WIDTH, snakeSpawnIdx)
    const worldWidth = world.width()

    const canvas = <HTMLCanvasElement>document.getElementById("snake-canvas")
    const ctx = canvas.getContext("2d")

    canvas.width = worldWidth * CELL_SIZE
    canvas.height = worldWidth * CELL_SIZE

    document.addEventListener("keydown", e => {
        switch (e.code) {
            case "ArrowUp":
                world.change_snake_dir(Direction.Up)
                break
            case "ArrowRight":
                world.change_snake_dir(Direction.Right)
                break
            case "ArrowDown":
                world.change_snake_dir(Direction.Down)
                break
            case "ArrowLeft":
                world.change_snake_dir(Direction.Left)
                break
        }
    })

    function drawWorld() {
        ctx.beginPath()

        for (let x = 0; x < worldWidth + 1; x++) {
            ctx.moveTo(CELL_SIZE * x, 0)
            ctx.lineTo(CELL_SIZE * x, worldWidth * CELL_SIZE)
        }

        for (let y = 0; y < worldWidth + 1; y++) {
            ctx.moveTo(0, CELL_SIZE * y)
            ctx.lineTo(worldWidth * CELL_SIZE, CELL_SIZE * y)
        }

        ctx.stroke()
    }

    function drawSnake() {
        const snakeIdx = world.snake_head_idx()
        const col = snakeIdx % worldWidth
        const row = Math.floor(snakeIdx / worldWidth)

        ctx.beginPath()
        ctx.fillRect(
            col * CELL_SIZE,
            row * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
        )

        ctx.stroke()
    }

    function paint() {
        drawWorld()
        drawSnake()
    }

    function update() {
        const fps = 10
        setTimeout(() => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            world.update()
            paint()
            // the method takes a callback to invoked before the next repaint
            requestAnimationFrame(update)
        }, 1000 / fps)
    }

    paint()
    update()
})