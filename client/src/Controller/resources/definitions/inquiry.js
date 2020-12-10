import Message from './message.js';


class Inquiry { 
    constructor(dataObj) {
        this.name = (dataObj.name) ? dataObj.name : "";
        this.email = (dataObj.email) ? dataObj.email : "";
        this.phone = (dataObj.phone) ? dataObj.phone : "";

        this.eventTitle = (dataObj.eventTitle) ? dataObj.eventTitle : "";
        this.eventStatus = (dataObj.eventStatus) ? dataObj.eventStatus  : 'lead';
        this.guestCount = (dataObj.guestCount) ? dataObj.guestCount : "";
        this.eventDate = (dataObj.eventDate) ? dataObj.eventDate : "";
        this.room = (dataObj.room) ? dataObj.room : "";

        this.startTime = "12:00";
        this.stopTime = "15:00";           

        this.company = (dataObj.company) ? dataObj.company : "";
        
        this.dateRecieved = (dataObj.dateRecieved) ? dataObj.dateRecieved : "";
        this.source = (dataObj.source) ? dataObj.source : "";
        this.sourceLocation = (dataObj.sourceLocation) ? dataObj.sourceLocation : "";
        
        //this.calendarSlot = "";
        //this.agreement = {};
        //this.tableMenu = {};

        this.coorespondence = [];

        //
        if(dataObj){
            for(const [key, value] of Object.entries(dataObj)){
                this[key] = value;
            }
        }
    }

    static createInquiryByClient(client){
        const dataObj = {
            name: client.name,
            email: client.email,
            phone: client.phone,
            eventTitle: 'New Event'
        }
        return new Inquiry(dataObj);
    }



    toJSON(){
        const basicInfo = {
            //items will appear in the oder they are here
            //name, email, and phone are required as they are binded to client when inquiry is created
            name:           this.name,
            email:          this.email,
            phone:          this.phone,



            eventTitle:     this.eventTitle,
            eventStatus:    this.eventStatus,
            guestCount:     this.guestCount,
            eventDate:      this.eventDate,
            room:           this.room,
    
            startTime:      this.startTime,
            stopTime:       this.stopTime,            
    
            company:        this.company,
            
            dateRecieved:   this.dateRecieved,
            source:         this.source,
            sourceLocation: this.sourceLocation
        }

        return basicInfo;
    }

    
}

export default Inquiry;