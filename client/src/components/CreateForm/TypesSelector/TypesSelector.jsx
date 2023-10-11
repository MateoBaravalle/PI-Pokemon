import { useEffect, useState } from "react";
import "./TypesSelector.css";

const TypesCreate = ({ setTypes, data }) => {
  const [text, setText] = useState("Select");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(() => {
    let obj = {};
    for (let i = 0; i < 20; i++) {
      obj[i + 1] = false;
    }
    return obj;
  });

  const changeHandler = (e) => {
    setSelected({ ...selected, [e.target.id]: !selected[e.target.id] });
  };

  useEffect(() => {
    let types = [];
    for (let key in selected) {
      if (selected[key]) {
        types.push(Number(key));
      }
    }
    setTypes(types);
    setText(types.length > 0 ? `${types.length} Selected` : "Select");
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="select-box">
      <div
        className="selected"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {text}
      </div>
      <div className={`options-container ${isOpen ? "active" : ""}`}>
        {data.map((type, index) => (
          <div
            className={`option ${selected[type.ID] ? "checked" : ""}`}
            key={index}
          >
            <input
              type="checkbox"
              className="checkbox"
              id={type.ID}
              value={selected[type.ID]}
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor={type.ID}>{type.NAME.toUpperCase()}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypesCreate;
