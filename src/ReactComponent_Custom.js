import React from 'react';
import WindowCloseImg from './images/WindowClose.png';

export default class ReactComponent_Custom extends React.Component{
    //element templates
    InfoField(id, rootName, value) { 
        console.log(rootName)
        return (
        <div className={rootName + "-field"} key={id}>
            <label className={rootName + "-field-label"} key={'lbl-' + id}>{id}: </label>
            <input className={rootName + '-field-input'} id={rootName + '-' + id} key={'input-' + id} value={value}></input>
        </div>
        )
    };

    WindowControlBar(WindowTitle){
        return(
        <div className="control-Bar">
            <div className="App-Window-Title">
                <label >{WindowTitle}</label>
            </div>
            <img className="App-Window-CloseBtn" onClick={this.closeWindow} alt="" src={WindowCloseImg} ></img>
        </div>
        )
    }

    ReactButton(text, id, callback) { 
        return(
        <button className="menu-button" key={id.toString()}>
            {text}
            </button>
        );
    }



    stateHandler(varName, value, inputChangeCallback){
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