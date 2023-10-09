import * as actions from "./actionTypes";

const initialState = {
  pokemons: [], // NAME, ID all pokemons / Local Storage
  search: [], // NAME, ID search pokemons
  filter: [], // ID -> filter by ID
  sort: [], // ID -> sort by ID --
  order: false, //|-\       false = asc, true = desc
  filterBy: "All", //|--\ Los puedo pasar a Local Storage para no usar Redux y mirar ahi
  pokeDetail: {},
  authUser: false,
  user: {},
  page: 1,
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CLEAR_DETAIL:
      return {
        ...state,
        pokeDetail: {},
      };
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
        search: action.payload,
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
    case actions.FILTER_BY_TYPE:
      return {
        ...state,
        filter: action.payload,
      };
    case actions.SORT_BY_STATS:
      return {
        ...state,
        sort: action.payload,
      };
    case actions.ORDER_BY:
      return {
        ...state,
        sort:
          action.payload === true && state.sort[0] < state.sort[state.sort.length - 1]
            ? state.sort.reverse()
            : action.payload === false && state.sort[0] > state.sort[state.sort.length - 1]
            ? state.sort.reverse()
            : state.sort,
        order: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
