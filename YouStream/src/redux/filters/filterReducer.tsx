import { SET_CATEGORY } from "./filter.types";

const initialState = {
    selectedCategory: ''
}

export default function filterReducer(state = initialState, action: any) {
    switch (action.type) {
        case SET_CATEGORY:
            return { ...state, selectedCategory: action.payload };
        default:
            return state
    }

}