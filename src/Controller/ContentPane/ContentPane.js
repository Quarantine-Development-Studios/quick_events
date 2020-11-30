import React, {useState, useEffect} from 'react';
import React_Custom from '../../CustomLibrary/ReactComponent_Custom.js';
import './ContentPane.css';
import NavPane from '../Windows/NavPane/NavPane.js';
import ClientPane from '../Windows/ClientPane/ClientPane.js';
import CalendarPane from '../Windows/CalendarPane/CalendarPane.js';

import rxInquiries from '../../firebase/rxInquiries.js';
import rxClients from '../../firebase/rxClients';

export const ViewingContext = React.createContext(null);

const ContentPane = (props) => {
    let [client, setClient] = useState(null);
    let [clients, setClients] = useState([]);

    let [inquiries, setInquiries] = useState([]);

    let [viewingNavigation, setViewingNavigation] = useState(true);

    let [selectedClient, setSelectedClient] = useState("");
    let [viewingClient, setViewingClient] = useState(true);

    let [selectedInquiry, setSelectedInquiry] = useState("");
    let [viewingInquiry, setViewingInquiry] = useState(true);

                
    //subscribe to database
    useEffect(() => {
        console.log('Subscribing to databases')
        rxInquiries.subscribe((inquiries) => {
            setInquiries(inquiries)

        });
        rxClients.subscribe((clients) => setClients(clients));
    }, [])

    useEffect(() => {

    }, [inquiries])

    const tryShowNavPane = () => {
        if (viewingNavigation) {
            return (
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

    const tryShowClientPane = () => {
        if (viewingClient && selectedClient !== "") {
            const client_res = React_Custom.getEntry(clients, selectedClient)

            if(client !== client_res){
                setClient(client_res);
            }

            return (  
                <ClientPane key="ClientPane"
                    client = {client}
                    clients = {clients}
                    viewingClient = {viewingClient}
                    selectedClient = {selectedClient}
                    
                    inquiries = {inquiries}
                    viewingInquiry = {viewingInquiry} 
                    selectedInquiry = {selectedInquiry}                    
                    setSelectedInquiry = {setSelectedInquiry}
                />
            );
        } else {
            if(selectedInquiry !== ""){
                setSelectedInquiry("");
            }
            if(client !== null){
                setClient(null);
            }
        }
    }
    
    const tryShowCalendar = () => {
        if(inquiries && inquiries[0]) { //temporary
            console.log('inquiries loaded, showing CalendarPane')
            return ( 
                <div className='CalendarPane App-Window'>
                    {React_Custom.WindowControlBar("Calendar")} 
                    <CalendarPane
                        inquiries = {inquiries}
                    /> 
                </div>
            )
        }
    }



    return (
        <div className='content-pane'>
            {tryShowNavPane()}
            {tryShowClientPane()}
            {tryShowCalendar()}
        </div>
    )
    
}

export default ContentPane;