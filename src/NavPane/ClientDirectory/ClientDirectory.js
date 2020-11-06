import React from 'react';


export default class ClientDirectory extends React.Component {
    constructor(props){
        super(props)
        
        
        this.chgNormal = this.chgNormal.bind(this)
        this.selectClient = this.selectClient.bind(this)
    }
    
    //templates
    ClientLBL(id, name, dbID, className) { return (<label className={className} key={id.toString()} data-key={dbID} onClick={this.selectClient} onMouseOver={this.chgPointer} onMouseOut={this.chgNormal}>{name}</label>); }

    //display changes
    chgPointer(event){
        event.target.className = "client-label-pointer";
    }
    chgNormal(event){
        if(!(event.target.attributes['data-key'].value === this.props.selectedClient)){
            event.target.className = "client-label";
        }
    }
    
    selectClient(event){
        const stateHandler = this.props.stateHandler;
        stateHandler('selectedClient', event.target.attributes['data-key'].value);
    }


    getClientAccessors(){
        const liveClients = this.props.clients;
        const rClients = [];        

        if(liveClients[0]){
            for(let i = 0; i < liveClients.length; i++){
                const key = i;
                const text = liveClients[i].name;
                const dbID = liveClients[i].id;
                
                //default className
                let className = "client-label"
                //if pointer
                if(dbID === this.props.selectedClient){ className = "client-label-pointer" }

                //create lbl
                rClients[i] = this.ClientLBL(key, text, dbID, className);

            }

            return (
                <div className="navpane-content">
                    {rClients}
                </div>
            ) 
        } else {
            return (<label></label>);
        } 
    }

    render(){
        return (
            <div>
                {this.getClientAccessors()}
            </div>
        )
    }
}