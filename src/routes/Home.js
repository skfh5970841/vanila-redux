import React, {useState} from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../Components/ToDo";

function Home({toDos, addToDo}) {
  const [text, setText] = useState("");
  function onChange(e){
    setText(e.target.value);
  }
  function onSubmit(e){
    e.preventDefault();
    console.log(text);
    addToDo(text);
    setText("");
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
  localStorage.setItem("toDos", JSON.stringify(state));
  console.log(localStorage.getItem("toDos"));
    return { toDos : state };
}
function mapDispachToProps(dispach, ownProps){
    return {
        addToDo : (text) => dispach(actionCreators.addToDo(text)),
    };
}

export default connect(mapStateToProps, mapDispachToProps)(Home);

