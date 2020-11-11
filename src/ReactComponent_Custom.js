import React, { useCallback } from 'react';
import firebase from './firebase';
import WindowCloseImg from './images/WindowClose.png';

export default class ReactComponent_Custom extends React.Component{
    //element templates

    ExpandedNavTree(rootName, parentElement, childrenElements){
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

    InfoSelector(id, rootName, options, callback){
        const optionElements = [];
        for(let i = 0; i < options.length; i++){
            optionElements.push(
                <option className={rootName + '-option'} key={rootName + "-option-" + i}>{options[i]}</option>
            )
        }

        return (
            <div className={rootName + "-selector"} key={id + '-selector'}>
                <label className={rootName + "-selector-label content-label"} key={id + '-lbl'}>{id}: </label>
                <select name={id} className={rootName + "-dropdown"} key={id + "-selecter"} onChange={callback}>
                        {optionElements}
                </select>
            </div>
        )
    }

    InfoField(id, rootName, value, callback, callbackPointer) {
        return (
            <div className={rootName + "-field"} key={id}>
                <label className={rootName + "-field-label content-label"} key={'lbl-' + id}>{id}: </label>
                <input className={rootName + '-field-input content-input'} id={rootName + '-' + id} key={'input-' + id} value={value} onChange={callback} callbackpointer={callbackPointer}></input>
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

    ReactButton(id, rootName, value, callback) { 
        return(
            <button className={rootName + '-button'} key={id.toString()} onClick={callback}>
                {value}
            </button>
        );
    }

    Divider(){
        return (
            <div className='App-divider'></div>
        )
    }


    async stateHandler(varName, value, inputChangeCallback){
        console.log('setting: ' + varName + ' to value: ')
        console.log(value);
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


    setValue(event){
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
                break;
            default:
                console.log('unable to set dbRoot in "setValue()"');
        }

        let fieldKey = event.target.attributes['id'].value;
        fieldKey = fieldKey.split('-');
        fieldKey = fieldKey[fieldKey.length - 1];
        fieldKey = fieldKey[0].toLowerCase() + fieldKey.slice(1);
        console.log(fieldKey);

        let entry = firebase.firestore().collection(dbRootKey).doc(dbKey);
        console.log('entry is:')
        console.log(entry);
        entry.set(
            {[fieldKey]: event.target.value},
            {merge: true});
    }

    customBinds(){
        this.stateHandler = this.stateHandler.bind(this);
        this.chgNormal = this.chgNormal.bind(this);
        this.chgPointer = this.chgPointer.bind(this);
        this.setValue = this.setValue.bind(this);
    }


    //element templates



}