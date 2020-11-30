
class Inquiry { 
    constructor(dataObj) {
        this.name = ("");
        this.email = "";
        this.phone = "";

        this.eventTitle = "";
        this.eventStatus = (dataObj.eventStatus) ? dataObj.eventStatus  : 'lead';
        this.guestCount = "";
        this.eventDate = "";
        this.room = "";

        this.startTime = "12:00";
        this.stopTime = "15:00";           

        this.company = "";
        
        this.dateRecieved = "";
        this.source = "";
        this.sourceLocation = "";
        
        //this.calendarSlot = "";
        //this.agreement = {};
        //this.tableMenu = {};
        //this.coorespondence = [];

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
        const basicInfo = {
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

        for(const[key, value] of Object.entries(basicInfo)){
            rInfo[key] = value;
        }

        return rInfo;
    }
}

export default Inquiry;