import Matter from "matter-js";
import PhysicsBox from "./physicsBox";
import removeAccents from "remove-accents";

const nameForm = document.getElementById("name-form") as HTMLFormElement;
const physicsBox = new PhysicsBox(window.innerWidth, window.innerHeight);

nameForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(nameForm);
  const name = formData.get("name") as string;
  const normalizedName = removeAccents(name.trim().toLowerCase());
  const stringToDisplay = `hej ${normalizedName}`;

  for (let i = 0; i < stringToDisplay.length; i++) {
    const letter: string = stringToDisplay[i];

    // Only proceed with single lowercase a-z letters
    if (!letter.match(/^[a-z]$/)) continue;

    // Create a physics body with the corresponding letter image
    const body = await physicsBox.createImageBody(`./letters/${letter}.jpg`, 110 * i + 100, -150, 100, 100);

    // Add a slight rotational velocity for a more interesting result
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.01);

    // Add the body to the physics box with a delay for a cascading effect.
    setTimeout(() => {
      physicsBox.add(body);
    }, i * 200);
  }
});
