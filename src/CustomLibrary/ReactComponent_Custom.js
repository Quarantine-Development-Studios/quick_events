import React, {useEffect, useState} from 'react';
import firebase from '../firebase/firebase';
import WindowCloseImg from '../images/WindowClose.png';
import cClient from './Definitions/client';
import cInquiry from './Definitions/inquiry';
import cEvent from './Definitions/event';

const React_Custom = {
    //#region completed
    ReactButton: (ButtonReq, rootName, key) => { 
        return(
            <button className={rootName + ' -button'} id={ButtonReq.name} key={key} onClick={ButtonReq.callback} callbackpointer={ButtonReq.callbackPointer}>
                {ButtonReq.value}
            </button>
        );
    },



    infoField: (FieldLabel, rootName, value, onChangeCB, onBlurCB, callbackpointer, type) => {
        const inputType = (type) ? type : '';

        return (
            <div className={rootName + "-field"} key={FieldLabel}>
                {React_Custom.basicLabel(FieldLabel, rootName)}
                {React_Custom.basicInput(FieldLabel, rootName, value, onChangeCB, onBlurCB, callbackpointer, inputType)}
            </div>
        )
    },

    //#region basic HTML Elements:
    /**
     * 
     * @param {string} lblName //Value Displayed
     * @param {string} rootName //string representative of wrapping element/component
     */
    basicLabel: (lblName, rootName) => {
        return (
            <label className={rootName + "-field-label content-label"} key={'lbl-' + lblName}>{lblName}</label>
        )
    },
    /**
     * 
     * @param {string} id //used in setting id and key values for HTML element
     * @param {string} rootName //string representative of wrapping element/component
     * @param {string} value //actual value of input at current state
     * @param {callback} onChangeCB //callback when value is changed
     * @param {callback} onBlurCB //callback when input loses focus (use this to submit final input changes)
     * @param {*} callbackpointer //data value to be used in callbacks
     * @param {string} inputType //type of input field
     */
    basicInput: (id, rootName, value, onChangeCB, onBlurCB, callbackpointer, inputType) => {
        return (
            <input className={rootName + '-field-input content-input'} id={rootName + '-' + id} key={'input-' + id} value={value} onChange={onChangeCB} onBlur={onBlurCB} callbackpointer={callbackpointer} type={inputType}></input>
        )
    },
    //#endregion


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
            console.log('array is not passed'); return undefined;
        } else if (!accessorID) {
            console.log('accessorID has not been passed'); return undefined;
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

    /**
     * 
     * @param {string} id //required
     * @param {string} rootName //recomended for propper CSS styling
     * @param {*} text //required, actual value displayed
     * @param {*} resourceId //optional
     * @param {*} callback //optional
     * @param {*} tagMod 
     * @param {*} pointer 
     * @param {*} onMouseOutCB 
     */
    NavLbl: (id, rootName, text, resourceId, callback, tagMod, pointer, onMouseOutCB) => { 
        let className = rootName + '-label' + tagMod;
        if(tagMod !== ''){
            className.concat(tagMod);
        }

        return (
        <label 
            className={className} 
            key={id.toString()} 
            data-key={resourceId} 
            onClick={callback} 
            onMouseOver={React_Custom.chgPointer} 
            onMouseOut={onMouseOutCB}
            callbackpointer={pointer}
        >
            {text}
        </label>
        );     
    },




    getDataList: (id, stringArray) => {
        if(stringArray){
            const options = React_Custom.getOptionList(stringArray);

            return (
                <datalist id={id}>
                    <options />
                </datalist>
            )
        }
    },

    //#region display changes
    chgPointer: (event) => {
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

export const Definitions = {
    Client: cClient,
    Inquiry: cInquiry,
    Event: cEvent,
    EventStatusEnums: cEvent.statusEnums, 
}





/** Incomplete
 * 
 * @param {*} props 
 */
export const ReactDropDown = (props) => {
    const name = (props.name) ? props.name : 'React Drop Down';
    const selectionResource = (props.selectionResource) ? props.selectionResource : [];
    const onChange = (props.onChangeCB) ? props.onChangeCB : null;
    const callbackPointer = (props.callbackPointer) ? props.callbackPointer : '';
    const selectedValue = (props.selectedValue) ? props.selectedValue : '';

    const getOptionList = () => {
        if(selectionResource) {
            const options = [];

            for(let i = 0; i < selectionResource.length; i++ ){
                const resource = selectionResource[i];

                if(!(selectedValue === resource.resourceId)) {
                    options.push(
                        <option 
                            name={name + resource.label} 
                            key={resource.resourceId} 
                            callbackpointer={resource.resourceId}
                        >
                            {resource.label}
                        </option>
                    )
                } else {
                    options.push(
                        <option 
                            name={name + resource.label} 
                            key={resource.resourceId} 
                            callbackpointer={resource.resourceId} 
                            selected
                        >
                            {resource.label}
                        </option>
                    )
                }   
            }

            return options;
        }
    }

    return (    
        <select native="true" name={name} className={name} onChange={onChange} callbackpointer={callbackPointer}>
            {getOptionList()}
        </select>
    )
}


/**
 * Generates Custom Label & Input Field Combo as small react component to handle data inputs
 * 
 * Accepts Options in props:
 * @param {String} rootName
 * @param {String} labelText
 * @param {Callback} onSubmit: called when user has released focus on target input field
 * @param {*} callbackPointer: property for onSubmit to reference
 * @param {string} inputType: for setting input type to 'date' or 'time' fields for example
 * @param {String} value: if you have a default value to set input field too. Good for loading in information you already have
 * @param {Array} selectionResource: accepts object Array. 
 * resourceObjecT: {@param {String} label, @param {String} resourceId}  
 * @param {Callback} onDropDownSubmit: called when dropDown Input type is selected and the selection has been changed
 * 
 * @param {*} props 
 */
export const ReactField = (props) => {
    const [value, setValue] = useState(props.value);

    const rootName = (props.rootName) ? props.rootName : 'ReactField';
    const labelText = (props.labelText) ? props.labelText : 'Unset Label'
    
    const onSubmit = (props.onSubmit) ? props.onSubmit : () => {};
    
    const onDropDownSubmit = (props.onDropDownSubmit) ? props.onDropDownSubmit : () => {};

    const callbackPointer = (props.callbackPointer) ? props.callbackPointer : '';
    const inputType = (props.inputType) ? props.inputType : '';
    const selectionResource = (props.selectionResource) ? props.selectionResource : [];


    useEffect(() =>{
        setValue(props.value)
    }, [props])

    const onChangeCB = (e) => {
        setValue(e.target.value)
    }   
    
    const inputActual = () => {
        if(inputType === 'DropDown'){
            console.log(selectionResource)
            return (
                <ReactDropDown
                    name={rootName + '-' + labelText + '-field-dropdown content-input'}
                    selectionResource={selectionResource}
                    onChangeCB={onDropDownSubmit} 
                    callbackPointer={callbackPointer} 
                    selectedValue={value}
                />   
            )
        } else {
            return (
                <input 
                    className={rootName + '-field-input content-input'} 
                    key={rootName + '-input-' + labelText}
                    id={rootName + '-' + labelText}
                    value={value} 
                    onChange={onChangeCB} 
                    onBlur={onSubmit} 
                    callbackpointer={callbackPointer} 
                    type={inputType}
                />
            )
        }
    }

    return (
        <div className={rootName + "-field"} key={rootName + '-' + labelText}>
            <label 
                className={rootName + "-field-label content-label"} 
                key={rootName + '-lbl-' + labelText}
            >
                {labelText}: 
            </label>

            {inputActual()}
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