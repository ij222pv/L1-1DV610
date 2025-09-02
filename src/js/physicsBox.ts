import Matter from "matter-js";

const WALL_WIDTH = 50;

/**
 * A class defining a physics simulation. Physics objects can be added to the simulation.
 */
export default class PhysicsBox {
  public width: number;
  public height: number;

  private engine = Matter.Engine.create();
  private renderer?: Matter.Render;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.renderer = Matter.Render.create({
      element: document.body,
      engine: this.engine,
      options: {
        width: this.width,
        height: this.height,
        wireframes: false,
      },
    });

    const walls = [
      // bottom
      Matter.Bodies.rectangle(
        this.width / 2,
        this.height + WALL_WIDTH / 2,
        this.width,
        WALL_WIDTH,
        { isStatic: true }
      ),
      // left
      Matter.Bodies.rectangle(
        -WALL_WIDTH / 2,
        this.height / 2,
        WALL_WIDTH,
        this.height * 1.5,
        {
          isStatic: true,
        }
      ),
      // right
      Matter.Bodies.rectangle(
        this.width + WALL_WIDTH / 2,
        this.height / 2,
        WALL_WIDTH,
        this.height * 1.5,
        { isStatic: true }
      ),
    ];

    Matter.Composite.add(this.engine.world, walls);

    Matter.Render.run(this.renderer);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.engine);
  }

  /**
   * Adds a body to the physics box.
   * 
   * @param body The body to add to the physics simulation
   */
  async add(body: Matter.Body) {
    Matter.Composite.add(this.engine.world, body);
  }

  /**
   * Creates a rectangular physics body with an image texture. 
   * 
   * @param url The URL of the image to use as texture
   * @param x The x position of the body
   * @param y The y position of the body
   * @param width The width of the body
   * @param height The height of the body
   * @returns A Promise that resolves to the created body
   */
  async createImageBody(
    url: string,
    x: number,
    y: number,
    width: number,
    height: number
  ): Promise<Matter.Body> {
    // Load the image to get its dimensions
    const image = document.createElement("img");
    image.src = url;
    await image.decode();

    // Create a rectangle body with the image as a texture
    const body = Matter.Bodies.rectangle(
      x, y, width, height,
      {
        render: {
          sprite: {
            texture: url,
            xScale: width / image.naturalWidth,
            yScale: height / image.naturalHeight,
          },
        },
      }
    );

    return body;
  }
}
