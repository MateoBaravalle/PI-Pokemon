import axios from "axios";
import * as actions from "./actionTypes";

export const validateUser = (username, password) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/users/${username}`);
    if (data.password === password) {
      dispatch({
        type: actions.VALIDATE_USER,
        payload: data,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getUserByEmail = (email) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/users?email=${email}`
    );
    dispatch({
      type: actions.GET_USER_BY_EMAIL,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const createUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.post(`http://localhost:3001/users`, user);
    dispatch({
      type: actions.CREATE_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `http://localhost:3001/users/${user.id}`,
      user
    );
    dispatch({
      type: actions.UPDATE_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    const { data } = await axios.delete(`http://localhost:3001/users/${id}`);
    dispatch({
      type: actions.DELETE_USER,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllPk = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/pokemon`);
    dispatch({
      type: actions.GET_ALL_PK,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllSorts = () => async () => {
  try {
    const { data } = await axios.get("http://localhost:3001/sorts");
    window.localStorage.setItem("sorts", JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
};

export const getAllTypes = () => async () => {
  try {
    const msg = await axios.get("http://localhost:3001/types/all");
    console.log(msg.data);
  } catch (error) {
    console.error(error);
  }
};

export const searchPk = (name) => async (dispatch) => {
  if (name.length === 0)
    return dispatch({ type: actions.SEARCH_PK, payload: [] });

  try {
    const { data } = await axios.get(
      `http://localhost:3001/pokemon/name=${name}`
    );
    if (data.length > 0) {
      dispatch({
        type: actions.SEARCH_PK,
        payload: data,
      });
    } else {
      dispatch({
        type: actions.SEARCH_PK,
        payload: [{ error: "Pokemon not found" }],
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const getOnePk = (id) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/pokemon/${id}`);
    const dataTypes = data.TYPES;
    // GET Types, sending TYPES array on body request
    const types = await axios.post("http://localhost:3001/types", {
      dataTypes,
    });
    data.TYPES = types.data;

    dispatch({
      type: actions.GET_ONE_PK,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCustomsPk = () => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/pokemon/customs`);
    dispatch({
      type: actions.GET_CUSTOMS_PK,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};

export const createCustomPk = (pokemon) => async (dispatch) => {
  try {
    const { data } = await axios.post(`http://localhost:3001/pokemon`, pokemon);
    alert("Pokemon created successfully!");
    dispatch({
      type: actions.CREATE_CUSTOM_PK,
      payload: data,
    });
  } catch (err) {
    if (err.response.status === 409) {
      alert("Pokemon already exists!");
      dispatch({
        type: actions.ERRORS,
        payload: { msg: "Pokemon already exists!" },
      });
    } else {
      alert("Something went wrong!");
      dispatch({
        type: actions.ERRORS,
        payload: { msg: "Something went wrong!" },
      });
    }
  }
};

export const updateCustomPk = (pokemon) => async (dispatch) => {
  try {
    const { data } = await axios.put(
      `http://localhost:3001/pokemon/${pokemon.id}`,
      pokemon
    );
    dispatch({
      type: actions.UPDATE_CUSTOM_PK,
      payload: data,
    });
    if (!data.error) return data;
  } catch (error) {
    console.error(error);
  }
};

export const deleteCustomPk = (id) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:3001/pokemon/${id}`);
    dispatch({
      type: actions.DELETE_CUSTOM_PK,
      payload: id,
    });
  } catch (error) {
    console.error(error);
  }
};

export const nextPage = () => {
  return {
    type: actions.NEXT_PAGE,
  };
};

export const previousPage = () => {
  return {
    type: actions.PREVIOUS_PAGE,
  };
};

export const resetPage = () => {
  return {
    type: actions.RESET_PAGE,
  };
};

export const clearDetail = () => {
  return {
    type: actions.CLEAR_DETAIL,
  };
};

export const filterByType = (type, array) => async (dispatch) => {
  try {
    if (type === "all") {
      return dispatch({
        type: actions.FILTER_BY_TYPE,
        payload: [],
      });
    }

    const { data } = await axios.post(`http://localhost:3001/types/${type}`, {
      array,
    });

    if (data.length > 0) {
      return dispatch({
        type: actions.FILTER_BY_TYPE,
        payload: data,
      });
    }

    return dispatch({
      type: actions.FILTER_BY_TYPE,
      payload: [{ error: "No pokemon found" }],
    });
  } catch (error) {
    console.error(error);
  }
};

export const sortBy = (stat, array) => {
  // Get the ordered array from localStorage
  const Sorts = JSON.parse(window.localStorage.getItem("sorts"));
  let ordered = [];

  // If array is an array of objects, map it to get an array of ids
  array = array.map((pk) => (pk.ID ? pk.ID : pk));

  // If stat is id, order array by id (default)
  if (stat === "id") {
    ordered = array;
  } else {
    // Else, order array by stat
    ordered = Sorts[stat]?.map((id) => {
      const pk = array.find((p) => p === id);
      return pk;
    });

    // Remove undefined values
    ordered = ordered.filter((pk) => pk !== undefined);
  }

  // Return ordered array
  return {
    type: actions.SORT_BY_STATS,
    payload: ordered,
  };
};

export const orderBy = (order, stat, array) => {
  const orderType = JSON.parse(order);
  let { payload } = sortBy(stat, array);
  const ordered = { array: payload, order: orderType };

  if (orderType) {
    payload.reverse();
  }

  return {
    type: actions.ORDER_BY,
    payload: ordered,
  };
};
