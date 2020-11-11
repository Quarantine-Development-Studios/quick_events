import ReactComponent_Custom from '../ReactComponent_Custom.js';



export default class ClientDirectory extends ReactComponent_Custom {
    constructor(props){
        super(props)
        this.state = {

        }

        this.customBinds();
        this.selectLbl = this.selectLbl.bind(this)
    }
    

    selectLbl(event){

        let pointer = event.target.attributes['callbackpointer'].value;

        const targetID = event.target.attributes['data-key'].value
        let value = ((this.props['selected' + pointer] !== targetID) ? targetID : "");

        this.stateHandler('selected' + pointer, value)
    }


    getClientAccessors(){
        const liveClients = this.props.clients;        
        const returnData = [];

        if(liveClients[0]){
            for(let ClientIndex = 0; ClientIndex < liveClients.length; ClientIndex++){
                const rootName = "ClientDirectory";

                //get RootClient Label then build children if isPointer
                let text = liveClients[ClientIndex].name;
                let dbID = liveClients[ClientIndex].id;
                let tagMod = '';
                let isPointer = (dbID === this.props.selectedClient);
        
                let clientLabel = this.NavLbl(ClientIndex, rootName, text, dbID, this.selectLbl, tagMod, 'Client');

                //if pointer establish extra class name for highlighting
                if (isPointer) {
                    tagMod = '-pointer';
                    //overwrite
                    clientLabel = this.NavLbl(ClientIndex, rootName, text, dbID, this.selectLbl, tagMod, 'Client');
                    //establish root label
                    const inquiryLabels = [];
                    const relatedInquiries = this.props.relatedInquiries;
                    const selectedInquiry = this.props.selectedInquiry;

                    if(relatedInquiries){
                        for (let riIndex = 0; riIndex < relatedInquiries.length; riIndex++) {
                            const key = riIndex;
                            const text = '- ' + relatedInquiries[riIndex].name;
                            const dbID = relatedInquiries[riIndex].id;
                            let tagMod = '';

                            const isPointer = (dbID === selectedInquiry);
                
                            if (isPointer) {
                                tagMod = '-pointer';
                            }
                
                            const newLabel = this.NavLbl(key, rootName + '-nested', text, dbID, this.selectLbl, tagMod, 'Inquiry');
                
                            inquiryLabels.push(newLabel);
                        }
                    }

                    returnData[ClientIndex] = this.ExpandedNavTree(rootName, clientLabel, inquiryLabels);
                } else {
                    returnData[ClientIndex] = clientLabel;
                }
            }
            return returnData;

        } else {
            return (<label></label>);
        } 
    }


    render(){

        return (
            <div className="navpane-content">
                {
                    this.getClientAccessors()
                }
            </div>
        )
    }
}