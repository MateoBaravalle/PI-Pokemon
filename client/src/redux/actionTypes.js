/***** ACTIONS TYPES *****/

export const VALIDATE_USER = "VALIDATE_USER"; //GET getUserByName -> API Rest
export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL"; //GET getUserByEmail -> API Rest
export const CREATE_USER = "CREATE_USER"; //POST createUser -> API Rest
export const UPDATE_USER = "UPDATE_USER"; //PUT updateUser -> API Rest
export const DELETE_USER = "DELETE_USER"; //DELETE deleteUser -> API Rest
export const SEARCH_PK = "SEARCH_PK"; //GET getPkByName -> API Rest
export const GET_ALL_PK = "GET_ALL_PK"; //GET getAllPk -> API Rest
export const GET_ONE_PK = "GET_ONE_PK"; //GET (getOnePkAPI||getOnePkDB)&&getTypes -> API Rest
export const GET_CUSTOMS_PK = "GET_CUSTOMS_PK"; //GET getAllPkDB -> API Rest
export const CREATE_CUSTOM_PK = "CREATE_CUSTOM_PK"; //POST createPkDB -> API Rest
export const UPDATE_CUSTOM_PK = "UPDATE_CUSTOM_PK"; //PUT updatePkDB -> API Rest
export const DELETE_CUSTOM_PK = "DELETE_CUSTOM_PK"; //DELETE deletePkDB -> API Rest
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const NEXT_PAGE = "NEXT_PAGE";
export const PREVIOUS_PAGE = "PREVIOUS_PAGE";
export const RESET_PAGE = "RESET_PAGE";
export const FILTER_BY_TYPE = "FILTER_BY_TYPE";
export const SORT_BY_STATS = "SORT_BY_STATS";
export const ORDER_CHANGE = "ORDER_CHANGE";
export const ORDER_BY = "ORDER_BY";
