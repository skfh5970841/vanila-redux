import React, {useState} from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function Home({toDos, addToDo}) {
  const [text, setText] = useState("");
  console.log({toDos});
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
            {JSON.stringify(toDos)}
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
        deleteToDo : (id) => dispach(actionCreators.deleteToDo(id))
    };
}

export default connect(mapStateToProps, mapDispachToProps)(Home);

