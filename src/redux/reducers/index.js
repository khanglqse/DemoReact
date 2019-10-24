import {
  ADD_ITEM, TOGGLE_FAVORITE, DELETE_ITEM, EDIT_ITEM
} from "../types/collection.type";
import {
  combineReducers
} from "redux";

const initialState = {
  collection: []
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      if(state.collection.find(m => m.data[0].nasa_id == action.payload.data[0].nasa_id)){
        alert('This item is already in collection');
        return state;
      } else {
        const { collection = []} = state;
        collection.push(action.payload);
        
        return {...state,...{collection}}
      }
    }
    case DELETE_ITEM:
      {
        return Object.assign({}, state, {collection: [...state.collection.filter(item => item.data[0].nasa_id !== action.payload.data[0].nasa_id)]})
      }
    case EDIT_ITEM:
        {
          const currentItem = state.collection.find(m => m.data[0].nasa_id == action.payload.nasa_id);
          Object.assign(currentItem.data[0], action.payload);
          currentItem.links[0].href = action.payload.href;
          const itemIndex = state.collection.indexOf(currentItem);
          return Object.assign({}, state, {collection: 
            [
              ...state.collection.slice(0,itemIndex), 
              currentItem,
              ...state.collection.slice(itemIndex+1)
            ]
          })
        }
    case TOGGLE_FAVORITE:
      {
        const currentItem = state.collection.find(m => m.data[0].nasa_id == action.payload.data[0].nasa_id);
        const itemIndex = state.collection.indexOf(currentItem);
        return Object.assign({}, state, {collection: 
          [
            ...state.collection.slice(0,itemIndex), 
            Object.assign(currentItem, {isFavorite: currentItem.isFavorite? false : true}),
            ...state.collection.slice(itemIndex+1)
          ]
        })
      }
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  collectionReducer
})
export default rootReducer;