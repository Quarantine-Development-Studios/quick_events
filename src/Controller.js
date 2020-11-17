import React from 'react';
import ReactComponent_Custom from './CustomLibrary/ReactComponent_Custom.js';
import TitleBar from './TitleBar/TitleBar.js';
import Management from './Management/ContentPane.js';

export class Controller extends ReactComponent_Custom{
    constructor(props){
        super(props);
        this.state = {
            isLoggedIn: false,
        }

        //function binds
        this.customBinds();
        this.getDisplay = this.getDisplay.bind(this);
    }


    getDisplay(){
        
        return(
            <Management
                stateHandler = {this.stateHandler}
            />
        )
    }

    render(){
        // console.log('Controller')
        // console.log(this.state)

        //reset creatingInquiry if no Client is selected

        return (
            <div className="App">
                <TitleBar 
                    stateHandler = {this.stateHandler}
                    
                />
                <li className="test-line">{'is logged in: ' + this.state.isLoggedIn}</li>

                {this.getDisplay()}
            </div>
        )
    }
}