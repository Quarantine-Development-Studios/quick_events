import React from 'react';
import firebase from '../firebase/firebase';
import WindowCloseImg from '../images/WindowClose.png';


const React_Custom = {
    //#region completed
    ReactButton: (ButtonReq, rootName, key) => { 
        return(
            <button className={rootName + ' -button'} id={ButtonReq.name} key={key} onClick={ButtonReq.callback} callbackpointer={ButtonReq.callbackPointer}>
                {ButtonReq.value}
            </button>
        );
    },

    ReactDresser: (rootName, title, drawers) => {
        if(drawers){
            return (
                <div className={rootName + "-dresser"}>
                    <label className="InquiryPane-header">{title}:</label>
                    {drawers}
                </div>
            )
        }
    },

    ReactDrawer: (rootName, labelName, contentFields, isExpanded, callback, callbackPointer) => {
        if(!isExpanded){
            return (
                <div className={rootName + "-drawer"}>
                    <label className={rootName + "-drawer-label"}>{labelName}</label>
                    <button className={rootName + "-drawer-expandBtn"} callbackpointer={callbackPointer}>+</button>
                </div>
            )
        } else {
            return (
                <div className={rootName + "-drawer"}>
                    <div className={rootName + "-drawer-header"}>
                        <label className={rootName + "-drawer-label"}>{labelName}</label>
                        <button className={rootName + "-drawer-expandBtn"} callbackpointer={callbackPointer}>-</button>
                    </div>
                    <div className={rootName + "-drawerContents"}>
                        {contentFields}
                    </div>
                </div>
            )
        }
    },

    InfoField: (id, rootName, value, callback, callbackPointer, type) => {
        const inputType = (type) ? type : '';

        return (
            <div className={rootName + "-field"} key={id}>
                <label className={rootName + "-field-label content-label"} key={'lbl-' + id}>{id}: </label>
                <input className={rootName + '-field-input content-input'} id={rootName + '-' + id} key={'input-' + id} defaultValue={value} onBlur={callback} callbackpointer={callbackPointer} type={inputType}></input>
            </div>
        )
    },

    getButtons: (buttonReqs, rootName) => {
        const rItems = [];
        let i = 0;
        for(const [ , ButtonReq] of Object.entries(buttonReqs)){
            const btn = React_Custom.ReactButton(ButtonReq, rootName, rootName + '-button-' + i);
            rItems.push(btn)
            i++;
        }

        return (
            <div className="App-header-menu">
                {rItems}
            </div>   
        );
    },
    //#endregion
    

    //#region database interaction functions

    dbInsertEntry: (dbID, entry, callback) => {
        React_Custom.insertIntoDB(dbID, entry)
                .then(function(docRef) {
                    if(callback){
                        console.log(docRef.id)
                        callback(docRef.id);
                        
                    }
                  })
    },
    
    insertIntoDB: (dbID, entry) => {
        // console.log('trying to create entry')
        if(entry.toJSON()){
            return new Promise(async (resolve, reject) =>{
                    let docRef = firebase.firestore().collection(dbID).doc();
                    await docRef.set(entry.toJSON())

                    resolve(docRef);
            })
        }
    },

    dbRemoveEntry: (dbID, entryID) => {
        console.log('removing client')
        //remove root client
        if(dbID && entryID){
            firebase.firestore().collection(dbID).doc(entryID).delete();
        } else {
            console.log("proper ID's not passed to 'dbRemoveEntry'");
        }
    },  

    dbUpdateLinkedInquiries: (client, fieldKey, value) => {

        if(client.hasOwnProperty('inquiries')  && client.inquiries[0]){
            const inquiries = client.inquiries
            for(let i = 0; i < inquiries.length; i++){
                React_Custom.dbSetValue('inquiries', inquiries[i], fieldKey, value)
            }
        } else {
            console.log('no linked inquiries')
        }
    },

    dbSetValue: (dbRootKey, dbKey, fieldKey, value) => {
        let entry = firebase.firestore().collection(dbRootKey).doc(dbKey);
        if(fieldKey !== 'id'){
            entry.set(
                {[fieldKey]: value},
                {merge: true});
        }
    },

    //#endregion
    getEntry: (array, accessorID) => {
        if(!array) {
            //console.log('array is not passed'); return undefined;
        } else if (!accessorID) {
            //console.log('accessorID has not been passed'); return undefined;
        } else {
            return array.filter(e => e.id === accessorID)[0]
        }
    },
    
    getRelatedInquiries: (client, inquiries) => {
        let rInquiries;
        if(client){
            const linkedInquiriesIDs = client.inquiries;
            if(linkedInquiriesIDs && inquiries){
                rInquiries = inquiries.filter(inquiry => linkedInquiriesIDs.includes(inquiry.id))
            }
            return rInquiries;
        }
    },

    //element templates

    ExpandedNavTree: (rootName, parentElement, childrenElements) => {
        return (
            <div className={rootName + '-expanded'} key={rootName}>
                {parentElement}
                <div className={rootName + '-nested'} key={rootName + '-nested'}>
                    {childrenElements}
                </div>
            </div>
        )
    },

    NavLbl: (id, rootName, text, dbID, callback, tagMod, pointer, onMouseOutCB) => { 
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
            onMouseOver={React_Custom.chgPointer} 
            onMouseOut={onMouseOutCB}
            callbackpointer={pointer}
        >
            {text}
        </label>
        );     
    },

    //#region display changes
    chgPointer: (event) => {
        //console.log('adding pointer')
        event.target.className.concat('-pointer');
    },



    WindowControlBar: (WindowTitle, closingCallback) => {
        return(
            <div className="control-Bar">
                <div className="App-Window-Title">
                    <label >{WindowTitle}</label>
                </div>
                <img className="App-Window-CloseBtn" onClick={closingCallback} alt="" src={WindowCloseImg} ></img>
            </div>
        )
    },

    Divider: () => {
        return (
            <div className='App-divider'></div>
        )
    }
    //#endregion
}

export default React_Custom;