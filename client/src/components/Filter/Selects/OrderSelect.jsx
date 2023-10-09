import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderBy } from "../../../redux/actions";

const OrderSelect = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const sort = useSelector((state) => state.sort);
  const filter = useSelector((state) => state.filter);
  const search = useSelector((state) => state.search);
  const [newOrder, setOrder] = useState("false");

  function orderHandler(e) {
    setOrder(e.target.value);

    dispatch(orderBy(e.target.value));
  }

  useEffect(() => {
    orderHandler({ target: { value: newOrder } });
  }, [search, sort, filter, order]); // eslint-disable-line react-hooks/exhaustive-deps

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
