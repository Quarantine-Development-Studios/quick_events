import React, {useEffect, useState} from 'react';
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



    InfoField: (id, rootName, value, onChangeCB, onBlurCB, callbackPointer, type) => {
        const inputType = (type) ? type : '';

        return (
            <div className={rootName + "-field"} key={id}>
                <label className={rootName + "-field-label content-label"} key={'lbl-' + id}>{id}: </label>
                <input className={rootName + '-field-input content-input'} id={rootName + '-' + id} key={'input-' + id} value={value} onChange={onChangeCB} onBlur={onBlurCB} callbackpointer={callbackPointer} type={inputType}></input>
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


/**
 * Generates Custom Label & Input Field Combo as small react component to handle data inputs
 * 
 * Accepts Options in props:
 * rootName
 * labelText
 * onSubmit: called when user has released focus on target input field
 * callbackPointer: property for onSubmit to reference
 * inputType: for setting input type to 'date' or 'time' fields for example
 * value: if you have a default value to set input field too. Good for loading in information you already have
 * 
 * @param {*} props 
 */

export const ReactField = (props) => {
    const [value, setValue] = useState(props.value);

    const rootName = (props.rootName) ? props.rootName : 'ReactField';
    const labelText = (props.labelText) ? props.labelText : 'Unset Label'
    const onSubmit = (props.onSubmit) ? props.onSubmit : () => {};
    const callbackPointer = (props.callbackPointer) ? props.callbackPointer : '';
    const inputType = (props.inputType) ? props.inputType : '';

    useEffect(() =>{
        setValue(props.value)
    }, [props])

    const onChangeCB = (e) => {
        setValue(e.target.value)
    }   
    
    return (
        <div className={rootName + "-field"} key={rootName + '-' + labelText}>
            <label 
                className={rootName + "-field-label content-label"} 
                key={rootName + '-lbl-' + labelText}
            >
                {labelText}: 
            </label>

            <input 
                className={rootName + '-field-input content-input'} 
                key={rootName + '-input-' + labelText}
                id={rootName + '-' + labelText}
                value={value} 
                onChange={onChangeCB} 
                onBlur={onSubmit} 
                callbackpointer={callbackPointer} 
                type={inputType}
            >

            </input>
        </div>
    )
}




/**
 * Generates Custom ReactDrawer
 * 
 * Accepts Options in props:
 * 
 * @constant rootName
 * @constant labelText: for DrawerTitle
 * @constant isExpanded: live feed for expanded state
 * @constant onExpand: callback when expand button is pressed
 * @constant callbackPointer: property for onExpand to identify with
 * @constant contentHtml: html
 * @constant drawerNumber: key number
 * @param {*} props 
 */

export const ReactDrawer = (props) => {
    const [isExpanded, setIsExpanded] = 
        useState((props.isExpanded) ? props.isExpanded : false);

    const rootName = (props.rootName) ? props.rootName : 'ReactDrawer';
    const labelText = (props.labelText) ? props.labelText : 'Unset Label'
    const onExpand = (props.onExpand) ? props.onExpand : () => {};
    const callbackPointer = (props.callbackPointer) ? props.callbackPointer : '';
    const contentHtml = (props.contentHtml) ? props.contentHtml : [];
    const drawerNumber = (props.drawerNumber) ? props.drawerNumber : '0';

    useEffect(() =>{
        setIsExpanded(props.isExpanded)
    }, [props])

    if(!isExpanded){
        return (
            <div className={rootName + "-drawer"} key={rootName + '-' + drawerNumber}>
                <label className={rootName + "-drawer-label"}>{labelText}</label>
                <button className={rootName + "-drawer-expandBtn"} callbackpointer={callbackPointer} onClick={onExpand}>+</button>
            </div>
        )
    } else {
        return (
            <div className={rootName + "-drawer"} key={rootName + '-' + drawerNumber}>
                <div className={rootName + "-drawer-header"}>
                    <label className={rootName + "-drawer-label"}>{labelText}</label>
                    <button className={rootName + "-drawer-expandBtn"} callbackpointer={callbackPointer} onClick={onExpand}>-</button>
                </div>
                <div className={rootName + "-drawerContents"}>
                    {contentHtml}
                </div>
            </div>
        )
    }
}



/**
 * Generates Custom ReactDresser
 * 
 * Accepts Options in props:
 * rootName
 * title: title of the collection of drawers
 * drawers: actual array of html drawers
 * 
 * @param {*} props 
 */
export const ReactDresser = (props) => {
    const rootName = (props.rootName) ? props.rootName : 'ReactDresser';
    const title = (props.title) ? props.title : 'React Dresser';
    const drawers = (props.drawers) ? props.drawers : null;

    if(drawers){
        return (
            <div className={rootName + "-dresser"}>
                <label className={rootName + "-header"}>{title}:</label>
                {drawers}
            </div>
        )
    }
}



export default React_Custom;