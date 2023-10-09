import TypeSelect from "./Selects/TypeSelect";
import SortSelect from "./Selects/SortSelect";
import OrderSelect from "./Selects/OrderSelect";
import "./Filter.css";

const Filter = () => {
  return (
    <div className="filters-container">
      <TypeSelect />
      <SortSelect />
      <OrderSelect />
    </div>
  );
};

export default Filter;
