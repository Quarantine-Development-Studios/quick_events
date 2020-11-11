
export default class Inquiry { 
    constructor(dataObj){
        console.log(dataObj)
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
            console.log('attempting to set inquiry values')
            for(const [key, value] of Object.entries(dataObj)){
                this.basicInfo[key] = value;
            }
        }
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