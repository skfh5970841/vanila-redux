import { createStore } from "redux";
const form = document.getElementById("form");
const input = document.getElementById("input");
const ul = document.getElementById("ul");

const ADD_TODO = "ADD_TODO";
const DEL_TODO = "DEL_TODO";

const addToDo = (text) => {
  return {
    type: ADD_TODO,
    text
  }
}
const delToDo = (id) => {
  return { 
    type: DEL_TODO,
    id
  }
}
const reducer = (state=[], action) => {
  switch (action.type) {
    case ADD_TODO : return [...state, {text: action.text, id: Date.now()} ];
    case DEL_TODO :  return state.filter(toDo => toDo.id !== action.id);
    default : return state;
  }
}
const store = createStore(reducer);

const diapachAddToDo = (text) => {
  store.dispatch(addToDo(text));
}

const dispachDeleteToDo = (e) => {
  const id = parseInt(e.target.parentNode.id);
  store.dispatch(delToDo(id));
}

const onChange = () => {
  console.log(store.getState());
}
store.subscribe(onChange);

const paintToDos = () => {
  const toDos = store.getState();
  ul.innerHTML = "";
  toDos.forEach(toDo => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.innerText="Del";
    btn.addEventListener("click", dispachDeleteToDo);
    li.id = toDo.id;
    li.innerText = toDo.text;
    li.appendChild(btn);
    ul.appendChild(li);
  });
}

store.subscribe(paintToDos);

const onSubmit = (e) => {
  e.preventDefault();
  const toDo = input.value;
  diapachAddToDo(toDo);
}

form.addEventListener("submit", onSubmit);