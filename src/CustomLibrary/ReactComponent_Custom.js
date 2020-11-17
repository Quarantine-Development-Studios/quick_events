import React from 'react';
import firebase from '../firebase';
import WindowCloseImg from '../images/WindowClose.png';

export default class ReactComponent_Custom extends React.Component{
    //#region completed
    
    stateHandler(varName, value, inputChangeCallback){
        console.log(varName + '  ' + value)
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
                console.log(varName + '  ' + value)
            }
        }
    }

    ReactButton(ButtonReq, rootName, key) { 
        return(
            <button className={rootName + ' -button'} id={ButtonReq.name} key={key} onClick={ButtonReq.callback} callbackpointer={ButtonReq.callbackPointer}>
                {ButtonReq.value}
            </button>
        );
    }

    //#endregion
    
    //#region database interaction functions
    insertIntoDB(dbID, entry){
        console.log('trying to create entry')
        if(entry.toJSON()){
            return new Promise(async (resolve, reject) =>{
                    let docRef = firebase.firestore().collection(dbID).doc();
                    await docRef.set(entry.toJSON())

                    resolve(docRef);
            })
        }
    }

    dbInsertEntry(dbID, entry, callback){
        this.insertIntoDB(dbID, entry)
                .then(function(docRef) {
                    if(callback){
                        callback(docRef.id);
                    }
                  })
    }
    
    setValue(event){
        console.log('attempting to change db value')
        const cbPointer = event.target.attributes['callbackpointer'].value;

        let dbRootKey = '';
        let dbKey = '';


        switch (cbPointer) {
            case 'client':
                dbRootKey = 'clients';
                dbKey = this.props.selectedClient;
                break;
            case 'inquiry':
                
                dbRootKey = 'inquiries';
                dbKey = this.props.selectedInquiry;
                console.log('setting db entry args: ' + dbRootKey + '  ' + dbKey)
                break;
            default:
                console.log('unable to set dbRoot in "setValue()"');
        }

        let fieldKey = event.target.attributes['id'].value;
        fieldKey = fieldKey.split('-');
        fieldKey = fieldKey[fieldKey.length - 1];
        fieldKey = fieldKey[0].toLowerCase() + fieldKey.slice(1);
        fieldKey = fieldKey.replace(' ', '');


        this.dbSetValue(dbRootKey, dbKey, fieldKey, event.target.value)
    }

    dbSetValue(dbRootKey, dbKey, fieldKey, value){
        let entry = firebase.firestore().collection(dbRootKey).doc(dbKey);
        if(fieldKey !== 'id'){
            entry.set(
                {[fieldKey]: value},
                {merge: true});
        }
    }

    //#endregion

    getClient(){
        return this.props.clients.filter(e => e.id === this.props.selectedClient)[0]
    }


    //element templates

    ExpandedNavTree(rootName, parentElement, childrenElements){
        console.log('test element')
        console.log()
        return (
            <div className={rootName + '-expanded'} key={rootName}>
                {parentElement}
                <div className={rootName + '-nested'} key={rootName + '-nested'}>
                    {childrenElements}
                </div>
            </div>
        )
    }

    NavLbl(id, rootName, text, dbID, callback, tagMod, pointer) { 
        let className = rootName + '-label' + tagMod;
        if(tagMod !== ''){
            className.concat(tagMod);
        }

        return (
        <label 
            className={className} 
            key={id.toString()} 
            data-key={dbID} 
            onClick={callback} 
            onMouseOver={this.chgPointer} 
            onMouseOut={this.chgNormal}
            callbackpointer={pointer}
        >
            {text}
        </label>
        ); 
    
    }

    //display changes
    chgPointer(event){
        //console.log('adding pointer')
        event.target.className.concat('-pointer');
    }

    chgNormal(event){
        let callbackpointer = event.target.attributes['callbackpointer'].value;
        callbackpointer = callbackpointer.charAt(0).toUpperCase() + callbackpointer.slice(1);

        if(event.target.attributes['data-key'].value !== this.props['selected' + callbackpointer]){
            //console.log('removing pointer');
            event.target.className.replace('-pointer', '');
        }
    }

    InfoField(id, rootName, value, callback, callbackPointer) {
        return (
            <div className={rootName + "-field"} key={id}>
                <label className={rootName + "-field-label content-label"} key={'lbl-' + id}>{id}: </label>
                <input className={rootName + '-field-input content-input'} id={rootName + '-' + id} key={'input-' + id} defaultValue={value} onBlur={callback} callbackpointer={callbackPointer}></input>
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

    Divider(){
        return (
            <div className='App-divider'></div>
        )
    }



    customBinds(){
        this.stateHandler = this.stateHandler.bind(this);
        this.chgNormal = this.chgNormal.bind(this);
        this.chgPointer = this.chgPointer.bind(this);
        this.setValue = this.setValue.bind(this);
        this.ReactButton = this.ReactButton.bind(this);
        this.insertIntoDB = this.insertIntoDB.bind(this);
        this.dbInsertEntry = this.dbInsertEntry.bind(this);
        this.getClient = this.getClient.bind(this);
    }


    //element templates



}