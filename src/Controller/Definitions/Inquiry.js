
export default class Inquiry { 
    constructor(dataObj){
        this.basicInfo = {
            name: "",
            email: "",
            phone: "",

            eventTitle: "",
            eventDate: "",
            room: "",
            startTime: "",
            guestCount: "",
            stopTime: "",            

            company: "",
            
            dateRecieved: "",
            source: "",
            sourceLocation: "",
        }
        //this.calendarSlot = "";
        //this.agreement = {};
        //this.tableMenu = {};
        //this.coorespondence = [];

        if(dataObj){
            for(const [key, value] of Object.entries(dataObj)){
                this.basicInfo[key] = value;
            }
        }

    }

    static createInquiryByClient(client){
        const dataObj = {
            name: client.name,
            email: client.email,
            phone: client.phone,
            dateRecieved: new Date().toDateString(),
            eventTitle: 'New Event'
        }
        return new Inquiry(dataObj);
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
    

    
    toJSON(){
        const rInfo = {};
        for(const[key, value] of Object.entries(this.basicInfo)){
            rInfo[key] = value;
        }

        return rInfo;
    }
}