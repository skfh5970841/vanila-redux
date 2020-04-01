import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../Components/ToDo";

function Home({toDos, addToDo}) {
  const [text, setText] = useState("");
  let count = 0;
  
  function onChange(e){
    setText(e.target.value);
  }
 
  function onSubmit(e){
    e.preventDefault();
    addToDo(text);
    setText("");
    localStorage.setItem("toDos", JSON.stringify({text, ...toDos}));
  }
  return (
    <>
    <h1>To Do</h1> {" "}
    <form onSubmit={onSubmit}>
        <input type="text" value={text} onChange={onChange}/>
        <button>Add</button>
        <ul>
            {
              toDos.map((toDo)=><ToDo {...toDo} key={toDo.id}></ToDo>)
            }
        </ul>
    </form>
    </>
  );
}

function mapStateToProps(state, ownProps) {
    return { toDos : state };
}
function mapDispachToProps(dispach, ownProps){
    return {
        addToDo : (text) => dispach(actionCreators.addToDo(text)), 
        syncState : (syncState) => dispach(actionCreators.syncToDo(syncState))
    };
}

export default connect(mapStateToProps, mapDispachToProps)(Home);

