import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function ToDo({text, deleteToDo, id, toDos}) {
    function deleteToDoLocal(){
        localStorage.setItem("toDos", JSON.stringify(toDos.filter(function(toDo) {
            return toDo.id !== parseInt(id)
        }))); 
    }
    function onBtnClicked(){
        deleteToDoLocal();
        deleteToDo(id);
    }
    return (
    <li>
        <Link to={`/${id}`}>{text}</Link><button onClick={onBtnClicked}>DEL</button>
    </li>);
}
function mapStateToProps(state, ownProps) {
    return { toDos : state };
}
function mapDispachToProps(dispach, ownProps){
    console.log(ownProps)
    return {
        deleteToDo : ()=>dispach(actionCreators.deleteToDo(ownProps.id))
    };
}
export default connect(mapStateToProps, mapDispachToProps)(ToDo);