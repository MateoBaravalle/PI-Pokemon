import { useEffect, useState } from "react";
import TypeSelect from "./Selects/TypeSelect";
import SortSelect from "./Selects/SortSelect";
import OrderSelect from "./Selects/OrderSelect";
import "./Filter.css";

const Filter = () => {
  const [stat, setStat] = useState("");

  const handleStat = (e) => {
    setStat(e.target.value);
  };

  useEffect(() => {
  }, [stat]);

  return (
    <div className="filters-container">
      <TypeSelect />
      <SortSelect handleStat={handleStat}/>
      <OrderSelect stat={stat}/>
    </div>
  );
};

export default Filter;
