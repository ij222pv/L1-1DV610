import Matter from "matter-js";
import PhysicsBox from "./physicsBox";
import removeAccents from "remove-accents";

const nameForm = document.getElementById("name-form") as HTMLFormElement;
const physicsBox = new PhysicsBox(window.innerWidth, window.innerHeight);

const LETTER_SIZE = 100;
const LETTER_SPACING = 10;

nameForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  const formData = new FormData(nameForm);
  const name = formData.get("name") as string;
  const normalizedName = removeAccents(name.trim().toLowerCase()).replace(/[^a-z]/g, "");
  const maxNumberOfLetters = Math.floor(
    (physicsBox.width + LETTER_SPACING) / (LETTER_SIZE + LETTER_SPACING)
  );
  const stringToDisplay = `hej ${normalizedName}`.slice(
    0,
    maxNumberOfLetters
  );

  for (let i = 0; i < stringToDisplay.length; i++) {
    const letter: string = stringToDisplay[i];

    // Only proceed with single lowercase a-z letters
    if (!letter.match(/^[a-z]$/)) continue;

    // Create a physics body with the corresponding letter image
    const centerXCoord = physicsBox.width / 2;
    const centerIndex = (stringToDisplay.length - 1) / 2;
    const xCoordOffset = (i - centerIndex) * (LETTER_SIZE + LETTER_SPACING);
    const xCoord = centerXCoord + xCoordOffset;
    const body = await physicsBox.createImageBody(
      `./letters/${letter}.jpg`,
      xCoord,
      -LETTER_SIZE,
      LETTER_SIZE,
      LETTER_SIZE
    );

    // Add a slight rotational velocity for a more interesting result
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.01);

    // Add the body to the physics box with a delay for a cascading effect.
    setTimeout(() => {
      physicsBox.add(body);
    }, i * 200);
  }
});