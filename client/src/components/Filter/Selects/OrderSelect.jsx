import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "../../../redux/actions";

const OrderSelect = ({ stat }) => {
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filter);
  const search = useSelector((state) => state.search);
  const pokemons = useSelector((state) => state.pokemons);
  const [newOrder, setOrder] = useState("false");

  function orderHandler(e) {
    setOrder(e.target.value);

    if(stat) {
      if (filter.length > 0) {
        dispatch(orderBy(e.target.value, stat, filter));
      } else if (search.length > 0) {
        dispatch(orderBy(e.target.value, stat, search));
      } else {
        dispatch(orderBy(e.target.value, stat, pokemons));
      }
    }
  }

  useEffect(() => {
    orderHandler({ target: { value: newOrder } });
  }, [search, filter]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <label className="filter-label">Order :</label>
      <select
        className="filter-select order"
        value={newOrder}
        onChange={orderHandler}
      >
        <option value="false">Ascending</option>
        <option value="true">Descending</option>
      </select>
    </>
  );
};

export default OrderSelect;
