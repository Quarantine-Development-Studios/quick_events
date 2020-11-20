import React, {useState} from 'react';
import React_Custom from '../../CustomLibrary/ReactComponent_Custom.js';
import './ContentPane.css'
import NavPane from '../Windows/NavPane/NavPane.js';
import ClientPane from '../Windows/ClientPane/ClientPane.js';
import rxInquiries from '../../firebase/rxInquiries.js';
import rxClients from '../../firebase/rxClients';

export const ViewingContext = React.createContext(null);

const ContentPane = (props) => {
    let [clients, setClients] = useState([]);
    let [inquiries, setInquiries] = useState([]);

    let [viewingNavigation, setViewingNavigation] = useState(true);

    let [selectedClient, setSelectedClient] = useState("");
    let [viewingClient, setViewingClient] = useState(true);

    let [selectedInquiry, setSelectedInquiry] = useState("");
    let [viewingInquiry, setViewingInquiry] = useState(true);

    let [isSubscribed, setIsSubscribed] = useState(false);
                



    const trySubscribeToDB = () => {
        if(!isSubscribed){
            rxInquiries.subscribe((inquiries) => setInquiries(inquiries));
            rxClients.subscribe((clients) => setClients(clients));
            setIsSubscribed(true);
        }
    }

    const tryShowNavPane = (content) => {
        if (viewingNavigation) {
            content.push(
                <NavPane key="NavPane"
                    viewingClient = {viewingClient}
                    setViewingClient = {setViewingClient}
                    clients = {clients}
                    setSelectedClient = {setSelectedClient}
                    selectedClient = {selectedClient} 

                    inquiries = {inquiries}
                    setSelectedInquiry = {setSelectedInquiry}
                    selectedInquiry = {selectedInquiry}
                />
            );
        }
    }

    const tryShowClientPane = (content) => {

        if (viewingClient && selectedClient !== "") {
            const client = React_Custom.getEntry(clients, selectedClient);

            content.push(  
                <ClientPane key="ClientPane"
                    clients = {clients}
                    viewingClient = {viewingClient}
                    selectedClient = {selectedClient}
                    client = {client}

                    inquiries = {inquiries}
                    viewingInquiry = {viewingInquiry} 
                    setSelectedInquiry = {setSelectedInquiry}
                    selectedInquiry = {selectedInquiry}                    
                />
            );
        } else {
            if(selectedInquiry !== ""){
                setSelectedInquiry("");
            }
        }
    }

    trySubscribeToDB();

    let content = [];
    
    //make sure windows that appear on top are assigned last
    tryShowNavPane(content);
    tryShowClientPane(content);

    console.log('ContentPane');
    return (
        <div className='content-pane'>
            {content}
        </div>
    )
    
}

export default ContentPane;