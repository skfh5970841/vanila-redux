import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function ToDo({text, onBtnClick, id}) {
    return (
    <li>
        <Link to={`/${id}`}>{text}</Link><button onClick={onBtnClick}>DEL</button>
    </li>);
}

function mapDispachToProps(dispach, ownProps){
    console.log(ownProps)
    return {
        onBtnClick : ()=>dispach(actionCreators.deleteToDo(ownProps.id))
    };
}
export default connect(null, mapDispachToProps)(ToDo);