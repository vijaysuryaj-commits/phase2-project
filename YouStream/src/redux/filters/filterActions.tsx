import { SET_CATEGORY } from "./filter.types";
export const setCategory = (category = "") => ({ type: SET_CATEGORY, payload: category });
