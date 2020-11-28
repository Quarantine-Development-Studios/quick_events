import React, {useState, useEffect} from 'react';
import React_Custom, {ReactField} from '../../../CustomLibrary/ReactComponent_Custom.js';
import Client from '../../Definitions/client.js'

const ClientInfo = (props) => {
    const rootName = 'ClientInfo'

    const [displayActual, setDisplayActual] = useState(null);

    
    useEffect(() => {
        const newDisplayActual = [];
        const client = Client.createClientByObj(props.client)

        const updateDB = (e) => {
            console.log(e)
    
            const fieldKey = e.target.attributes['callbackpointer'].value;
    
            React_Custom.dbSetValue('clients', props.selectedClient, fieldKey, e.target.value)
            React_Custom.dbUpdateLinkedInquiries(props.client, fieldKey, e.target.value);
        }

        for(const [key, value] of Object.entries(client.toJSON())){
            let inputType = '';
            if(key.includes('date')){
                inputType = 'date';
            } else if(key.includes('time')){
                inputType = 'time';
            }

            if(key !== 'inquiries' && key !== 'id'){
                newDisplayActual.push(
                    <ReactField
                        rootName = {rootName}
                        labelText = {key}
                        value = {value}
                        onSubmit = {updateDB}
                        callbackPointer = {key}
                        inputType = {inputType}

                    />
                )
            }
        }
        
        setDisplayActual(newDisplayActual);
    }, [props])


    return (
        <div className={rootName + "-content"}>
            {displayActual}
        </div>
    )

}

export default ClientInfo;