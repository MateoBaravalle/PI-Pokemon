import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCustomPk } from "../../redux/actions";
import axios from "axios";
import TypesCreate from "./TypesSelector/TypesSelector";
import noImage from "../../assets/no-image-svgrepo-com.svg";
import "./CreateForm.css";

const CreateForm = () => {
  const GB_ERRORS = useSelector((state) => state.errors);
  const navig = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState({});
  const [created, setCreated] = useState({
    NAME: "",
    TYPES: [],
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
        return "disabled";
      }
    }
    return "";
  };
  const setName = (newName) => {
    // Validate name isAlphanumeric without spaces (3-50 characters)
    const nameRegex = /^[a-zA-Z0-9]{3,25}$/;
    if (!nameRegex.test(newName)) {
      setErrors({ ...errors, name: "Alphanum no spaces (3-25)" }); 
    } else {
      setErrors({ ...errors, name: "" });
    }

    setCreated({ ...created, NAME: newName });
  };
  const setTypes = (newTypes) => {
    // Validate types is a array (1-2 types)
    if (newTypes.length < 1 || newTypes.length > 2) {
      setErrors({ ...errors, types: "(1-2) types" });
    } else {
      setErrors({ ...errors, types: "" });
    }

    setCreated({ ...created, TYPES: newTypes });
  };
  const setHp = (newHp) => {
    // Validate hp is a number (1-999)
    if (isNaN(newHp) || newHp < 1 || newHp > 999) {
      setErrors({ ...errors, life: "Number (1-999)" });
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
        attack: "Number (1-999)",
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
        defense: "Number (1-999)",
      });
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
        speed: "Number (1-999)",
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
        height: "Number (1-999)",
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
        weight: "Number (1-999)",
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
      setErrors({ ...errors, image: "Not valid URL" });
    } else {
      setErrors({ ...errors, image: "" });
    }

    setCreated({ ...created, IMAGE: newImage });
  };

  const handleSubmit = async (e) => {
    // handle form submission here
    dispatch(createCustomPk(created));
    setCreated({
      NAME: "",
      TYPES: [],
      LIFE: "",
      ATTACK: "",
      DEFENSE: "",
      SPEED: "",
      HEIGHT: "",
      WEIGHT: "",
      IMAGE: "",
    });

    if (!GB_ERRORS.msg) {
      navig("/Home");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3001/types/all");
      setData(res.data);
    };
    fetchData();
  }, []);

  return (
    <form className="form-container">
      <h2>Create your own Pokemon!</h2>
      <img
        className="form-img"
        src={created.IMAGE ? created.IMAGE : noImage}
        alt="Pokemon"
      />
      <div className="inputs-container">
        <div className="input-box name">
          <label className="input-label">Name:</label>
          <input
            type="text"
            value={created.NAME}
            onChange={(e) => setName(e.target.value)}
          />
          <span>{errors.name}</span>
        </div>
        <div className="input-box atk">
          <label className="input-label">Attack:</label>
          <input
            type="text"
            value={created.ATTACK}
            onChange={(e) => setAttack(e.target.value)}
          />
          <span>{errors.attack}</span>
        </div>
        <div className="input-box dfn">
          <label className="input-label">Defense:</label>
          <input
            type="text"
            value={created.DEFENSE}
            onChange={(e) => setDefense(e.target.value)}
          />
          <span>{errors.defense}</span>
        </div>
        <div className="input-box hp">
          <label className="input-label">Life:</label>
          <input
            type="text"
            value={created.LIFE}
            onChange={(e) => setHp(e.target.value)}
          />
          <span>{errors.life}</span>
        </div>
        <div className="input-box spd">
          <label className="input-label">Speed:</label>
          <input
            type="text"
            value={created.SPEED}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{errors.speed}</span>
        </div>
        <div className="input-box hgt">
          <label className="input-label">Height:</label>
          <input
            type="text"
            value={created.HEIGHT}
            onChange={(e) => setHeight(e.target.value)}
          />
          <span>{errors.height}</span>
        </div>
        <div className="input-box wgt">
          <label className="input-label">Weight:</label>
          <input
            type="text"
            value={created.WEIGHT}
            onChange={(e) => setWeight(e.target.value)}
          />
          <span>{errors.weight}</span>
        </div>
        <div className="input-box img">
          <label className="input-label">Image:</label>
          <input
            type="text"
            value={created.IMAGE}
            onChange={(e) => setImage(e.target.value)}
          />
          <span>{errors.image}</span>
        </div>
        <div className="input types">
          <TypesCreate setTypes={setTypes} data={data} />
          <span>{errors.types}</span>
        </div>
        <button
          type="button"
          className={`input-btn ${isOk()}`}
          onClick={handleSubmit}
        >
          Create !
        </button>
      </div>
    </form>
  );
};

export default CreateForm;
