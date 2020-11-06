import React from 'react';


export default class ReactComponent_Custom extends React.Component{

    stateHandler(varName, value){
        console.log("trying to set stateHandler: " + varName + "  " + value);
        console.log(this.state);

        if (this.state[varName] !== undefined){
            this.setState({
                ...this.state,
                [varName]: value
            })
        } else {
            //call again to check in parent
            if(this.props.stateHandler){
                this.props.stateHandler(varName, value);
            } else {
                console.log("unable to find desired state with desired prop")
            }
        }
    }

    customBinds(){
        this.stateHandler = this.stateHandler.bind(this);
    }


    //element templates



}