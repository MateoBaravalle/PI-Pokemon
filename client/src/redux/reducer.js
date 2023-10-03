import * as actions from "./actionTypes";

const initialState = {
  pokemons: [],
  ordenamiento: [],
  pokeDetail: {},
  authUser: false,
  user: {},
  page: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_CUSTOM_PK:
      return {
        ...state,
        pokemons: [...state.pokemons, action.payload],
      };
    case actions.CREATE_USER:
      return {
        ...state,
        authUser: true,
        user: action.payload,
      };
    case actions.DELETE_CUSTOM_PK:
      return {
        ...state,
        pokemons: state.pokemons.filter(
          (pokemon) => pokemon.id !== action.payload
        ),
      };
    case actions.DELETE_USER:
      return {
        ...state,
        authUser: false,
        user: {},
      };
    case actions.GET_ALL_PK:
      return {
        ...state,
        pokemons: action.payload,
      };
    case actions.GET_CUSTOMS_PK:
      return {
        ...state,
        pokemons: [
          ...state.pokemons.filter((pokemon) => !isNaN(pokemon.id)),
          ...action.payload,
        ],
      };
    case actions.GET_ONE_PK:
      return {
        ...state,
        pokeDetail: action.payload,
      };
    case actions.GET_USER_BY_EMAIL:
      return {
        ...state,
        user: action.payload,
      };
    case actions.SEARCH_PK:
      return {
        ...state,
        pokemons: action.payload,
      };
    case actions.UPDATE_CUSTOM_PK:
      return {
        ...state,
        pokemons: state.pokemons.map((pokemon) =>
          pokemon.id === action.payload.id ? action.payload : pokemon
        ),
      };
    case actions.UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case actions.VALIDATE_USER:
      return {
        ...state,
        authUser: true,
        user: action.payload,
      };
    case actions.NEXT_PAGE:
      return {
        ...state,
        page: state.page + 1,
      };
    case actions.PREVIOUS_PAGE:
      return {
        ...state,
        page: state.page - 1,
      };
    case actions.RESET_PAGE:
        return {
          ...state,
          page: 1,
        };
    default:
      return state;
  }
}


export default rootReducer;
