import React, { useEffect } from "react";
import { connect } from "react-redux";
import { actionCreators } from "../store";

function Detail({toDo, onBtnClick, history}) {
    return (
        <div>
            {toDo? "" : history.push("/")}
            <h1>{toDo?.text}</h1>
            <h5>Created at : {toDo?.id}</h5>
            <button onClick={onBtnClick}>Del</button>
        </div>
    );
}

function mapStateToProps(state, ownProps){
    const {match:{params: id}}= ownProps;
    return {toDo: state.find(toDo => toDo.id === parseInt(id.id))};
}
function mapDispachToProps(dispach, ownProps){
    const {match:{params: id}}= ownProps;
    console.log(parseInt(id.id));
    return {
        onBtnClick : ()=>dispach(actionCreators.deleteToDo(id.id))
    };
}

export default connect(mapStateToProps, mapDispachToProps)(Detail);