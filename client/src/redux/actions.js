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

export const getAllTypes = () => async () => {
  try {
    const msg = await axios.get("http://localhost:3001/types/all");
    console.log(msg.data);
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

export const searchPk = (name) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/pokemon/name=${name}`
    );
    dispatch({
      type: actions.SEARCH_PK,
      payload: data,
    });
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
    dispatch({
      type: actions.CREATE_CUSTOM_PK,
      payload: data,
    });
    if (!data.error) return data;
  } catch (error) {
    console.error(error);
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
  if (type === "all")
    dispatch({
      type: actions.FILTER_BY_TYPE,
      payload: {array: [], type: "all"}
    });
  const typeIDs = await axios.post(`http://localhost:3001/types/${type}`, {
    array,
  });
  dispatch({
    type: actions.FILTER_BY_TYPE,
    payload: {array: typeIDs.data, type: type} 
  });
};
