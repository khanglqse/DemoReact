import { ADD_ITEM, EDIT_ITEM, TOGGLE_FAVORITE, DELETE_ITEM } from "../types/collection.type";

export function addItem(payload) {
    return { type: ADD_ITEM, payload }
};
export function editItem(payload) {
    return { type: EDIT_ITEM, payload }
};
export function removeItem(payload) {
    return { type: DELETE_ITEM, payload }
};

export function toggleFavorite(payload) {
    return { type: TOGGLE_FAVORITE, payload }
};