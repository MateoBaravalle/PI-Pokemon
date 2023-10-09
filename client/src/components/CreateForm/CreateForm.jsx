import { useState } from "react";
import TypesCreate from "./TypesCreate";
import "./CreateForm.css";

const CreateForm = () => {
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState({
    NAME: "",
    TYPES: "",
    LIFE: "",
    ATTACK: "",
    DEFENSE: "",
    SPEED: "",
    HEIGHT: "",
    WEIGHT: "",
    IMAGE: "",
  });

  const isOk = () => {
    // Validate errors object is empty
    for (let key in errors) {
      if (errors[key] !== "") {
        return false;
      }
    }
    return true;
  };

  const setName = (newName) => {
    // Validate name isAlphanumeric without spaces (3-50 characters)
    const nameRegex = /^[a-zA-Z0-9]{3,25}$/;
    if (!nameRegex.test(newName)) {
      setErrors({ ...errors, name: "Alphanumeric without spaces (3-25 char)" });
    } else {
      setErrors({ ...errors, name: "" });
    }

    setCreated({ ...created, NAME: newName });
  };
  const setTypes = (newTypes) => {
    // Validate types is a array (1-2 types)
    if(newTypes.length < 1 || newTypes.length > 2) {
      setErrors({ ...errors, types: "Must have 1 or 2 types" });
    } else {
      setErrors({ ...errors, types: "" });
    }

    setCreated({ ...created, TYPES: newTypes });
  }
  const setHp = (newHp) => {
    // Validate hp is a number (1-999)
    if (isNaN(newHp) || newHp < 1 || newHp > 999) {
      setErrors({ ...errors, life: "Life must be a number between 1 and 999" });
    } else {
      setErrors({ ...errors, life: "" });
    }

    setCreated({ ...created, LIFE: newHp });
  };
  const setAttack = (newAttack) => {
    // Validate attack is a number (1-999)
    if (isNaN(newAttack) || newAttack < 1 || newAttack > 999) {
      setErrors({
        ...errors,
        attack: "Attack must be a number between 1 and 999",
      });
    } else {
      setErrors({ ...errors, attack: "" });
    }

    setCreated({ ...created, ATTACK: newAttack });
  };
  const setDefense = (newDefense) => {
    // Validate defense is a number (1-999)
    if (isNaN(newDefense) || newDefense < 1 || newDefense > 999) {
      setErrors({
        ...errors,
        defense: "Defense must be a number between 1 and 999",
      });
      return;
    } else {
      setErrors({ ...errors, defense: "" });
    }

    setCreated({ ...created, DEFENSE: newDefense });
  };
  const setSpeed = (newSpeed) => {
    // Validate speed is a number (1-999)
    if (isNaN(newSpeed) || newSpeed < 1 || newSpeed > 999) {
      setErrors({
        ...errors,
        speed: "Speed must be a number between 1 and 999",
      });
    } else {
      setErrors({ ...errors, speed: "" });
    }

    setCreated({ ...created, SPEED: newSpeed });
  };
  const setHeight = (newHeight) => {
    // Validate height is a number (1-999)
    if (isNaN(newHeight) || newHeight < 1 || newHeight > 999) {
      setErrors({
        ...errors,
        height: "Height must be a number between 1 and 999",
      });
    } else {
      setErrors({ ...errors, height: "" });
    }

    setCreated({ ...created, HEIGHT: newHeight });
  };
  const setWeight = (newWeight) => {
    // Validate weight is a number (1-999)
    if (isNaN(newWeight) || newWeight < 1 || newWeight > 999) {
      setErrors({
        ...errors,
        weight: "Weight must be a number between 1 and 999",
      });
    } else {
      setErrors({ ...errors, weight: "" });
    }

    setCreated({ ...created, WEIGHT: newWeight });
  };
  const setImage = (newImage) => {
    //Validate image is a url (RegEx)
    const urlRegex =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    if (!urlRegex.test(newImage)) {
      setErrors({ ...errors, image: "Image must be a valid url" });
    } else {
      setErrors({ ...errors, image: "" });
    }

    setCreated({ ...created, IMAGE: newImage });
  };

  console.log(isOk())
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission here
    console.log(created);
  };

  return (
    <form className="create-form" onSubmit={handleSubmit}>
      <label className="create-label">
        Name:
        <input
          type="text"
          value={created.NAME}
          onChange={(e) => setName(e.target.value)}
        />
        <span>{errors.name}</span>
      </label>
      <TypesCreate setTypes={setTypes}/>
      <span>{errors.types}</span>
      <label className="create-label">
        Life:
        <input
          type="text"
          value={created.LIFE}
          onChange={(e) => setHp(e.target.value)}
        />
        <span>{errors.life}</span>
      </label>
      <label className="create-label">
        Attack:
        <input
          type="text"
          value={created.ATTACK}
          onChange={(e) => setAttack(e.target.value)}
        />
        <span>{errors.attack}</span>
      </label>
      <label className="create-label">
        Defense:
        <input
          type="text"
          value={created.DEFENSE}
          onChange={(e) => setDefense(e.target.value)}
        />
        <span>{errors.defense}</span>
      </label>
      <label className="create-label">
        Speed:
        <input
          type="text"
          value={created.SPEED}
          onChange={(e) => setSpeed(e.target.value)}
        />
        <span>{errors.speed}</span>
      </label>
      <label className="create-label">
        Height:
        <input
          type="text"
          value={created.HEIGHT}
          onChange={(e) => setHeight(e.target.value)}
        />
        <span>{errors.height}</span>
      </label>
      <label className="create-label">
        Weight:
        <input
          type="text"
          value={created.WEIGHT}
          onChange={(e) => setWeight(e.target.value)}
        />
        <span>{errors.weight}</span>
      </label>
      <label className="create-label">
        Image:
        <input
          type="text"
          value={created.IMAGE}
          onChange={(e) => setImage(e.target.value)}
        />
        <span>{errors.image}</span>
      </label>
      <button type="submit" disabled={`${!isOk ? "." : ""}`}>
        Create !
      </button>
    </form>
  );
};

export default CreateForm;
