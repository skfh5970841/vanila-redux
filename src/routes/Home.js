import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";
import ToDo from "../Components/ToDo";

function Home({toDos, addToDo, syncState}) {
  const [text, setText] = useState("");
  
  function onChange(e){
    setText(e.target.value);
  }
 
  function onSubmit(e){
    e.preventDefault();
    addToDo(text);
    setText("");
    //const toDow = {text, id:Date.now()};
    //localStorage.setItem("toDos", JSON.stringify(
    //  {...toDos, toDow}
    //));
  }
  //localStorage.setItem("toDos", JSON.stringify(toDos));
  useEffect(()=>{
    if(localStorage.getItem("toDos")){
      const localToDos = JSON.parse(localStorage.getItem("toDos"));
      var result = Object.keys(localToDos).map(function (key) { 
        return Number(key), localToDos[key]; 
      });  
      //result.unshift(result[result.length-1]);
      //result.pop();
      result.map(localToDo => {syncState(localToDo)});
    }
    return () => console.log(toDos);
  }, []);
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

