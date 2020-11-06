import React from 'react';
import ReactComponent_Custom from '../ReactComponent_Custom.js';
import './ClientImporter.css'
import WindowCloseImg from '../images/WindowClose.png'

export default class ClientImporter extends ReactComponent_Custom {
    constructor(props){
        super(props);
        this.state = {

        }

        //bind functions
        this.customBinds();
        this.closeWindow = this.closeWindow.bind(this);
    }


    closeWindow(e){
        console.log("ClientImporter_CloseWindow");
        this.stateHandler('creatingClient', false);
    }

    render(){
        console.log("ClientImporter")
        console.log(this.props);
        return (
            <div className="App-Border1 client-importer">
                <div className="control-Bar">
                    <div className="App-Window-Title">
                        <label >Client Importer</label>
                    </div>
                    <img className="App-Window-CloseBtn" onClick={this.closeWindow} alt="" src={WindowCloseImg} ></img>
                </div>
            </div>
        )
    }




}