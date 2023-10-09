import { useState, useEffect } from "react";
import axios from "axios";
import "./TypesCreate.css";

const TypesCreate = ({ setTypes }) => {
  const [data, setData] = useState([]);
  const [text, setText] = useState("Select Types");
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(() => {
    let obj = {};
    for (let i = 0; i < data.length; i++) {
      obj[data[i].ID] = false;
    }
    return obj;
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3001/types/all");
      setData(res.data);
    };
    fetchData();
  }, []);

  const changeHandler = (e) => {
    setSelected({ ...selected, [e.target.id]: !selected[e.target.id] });

    let types = [];
    for (let key in selected) {
      if (selected[key]) {
        types.push(key);
      }
    }
    console.log(types);
    setTypes(types);
    setText(types.length > 0 ? types.join(", ") : "Select Types");
  };

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
          <div className="option" key={index} checked={`${selected[type.ID]? 'checked': ''}`}>
            <input
              type="checkbox"
              className="checkbox"
              id={type.ID}
              value={selected[type.ID]}
              onChange={(e) => changeHandler(e)}
            />
            <label htmlFor={type.ID}>{type.NAME}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypesCreate;
