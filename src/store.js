import { createStore } from "redux";
const ADD = "ADD";
const DELETE= "DELETE";
const SYNC = "SYNC";

const addToDo = (text) =>{
    return {
        type: ADD,
        text
    }
}
const deleteToDo = (id) =>{
    return{
        type: DELETE,
        id: parseInt(id)
    }
}
const syncToDo = (syncstate) => {
    return{
        type: SYNC,
        syncstate
    }
}

const reducer = (state=[], action) => {
    switch (action.type) {
        case ADD: 
            return [{text: action.text, id: Date.now()}, ...state];
        case DELETE: 
            return state.filter(toDo => toDo.id !== action.id);
        case SYNC:
            console.log(action.syncstate.text);
            return [...state, {text: action.syncstate.text, id: action.syncstate.id}];
        default:
            return state;
    }
}
const store = createStore(reducer);

export const actionCreators = {
    addToDo,
    deleteToDo,
    syncToDo
}

export default store;