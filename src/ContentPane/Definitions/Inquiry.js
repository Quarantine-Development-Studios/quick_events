import Client from './client.js';

export default class Inquiry { 
    constructor(dataObj){
        this.basicInfo = {
            name: "",
            email: "",
            phone: "",
            company: "",
            dateRecieved: "",
            source: "",
            sourceLocation: "",
            eventTitle: "",
            eventDate: "",
            room: "",
            startTime: "",
            stopTime: "",
            guestCount: "",
        }
        //this.calendarSlot = "";
        //this.agreement = {};
        //this.tableMenu = {};
        //this.coorespondence = [];

        if(dataObj){
            for(const [key, value] of Object.entries(dataObj)){
                if(this.basicInfo[key]){
                    this.basicInfo[key] = value;
                }
            }
        }

        console.log(this);
    }


    
    getBaseProps(){
        const rInfo = {};
        for(const [key, value] of Object.entries(this.basicInfo)){
            let k = key.charAt(0).toUpperCase() + key.slice(1);
            k = k.replace(/([A-Z])/g, ' $1').trim()
            rInfo[k] = value;
        }
        return rInfo;
    }
    

    
    BasicToJSON(){
        const rInfo = {};
        for(const[key, value] of Object.entries(this.basicInfo)){
            rInfo[key] = value;
        }

        return rInfo;
    }
}