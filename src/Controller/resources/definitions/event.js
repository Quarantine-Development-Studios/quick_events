

class Event {
    constructor(inquiry_ID, title, startDate_Time, stopDate_Time, status) {
        const cAlert = (msg) => {
            return window.alert("!! Event  constructor " + msg + " !!")
        }

        if(inquiry_ID){    
            return{
                id: inquiry_ID,
                title: (title)       
                    ? title : cAlert("needs a valid title"),
                
                start: (startDate_Time)   
                    ? startDate_Time : cAlert("needs a valid startDate"),

                end: (stopDate_Time)    
                    ? stopDate_Time  : cAlert("needs a valid stop Date"),
                
                resourceId: Event.statusEnums[status].resourceId, 
                color: Event.statusEnums[status].color,
                textColor: Event.statusEnums[status].textColor,
                borderColor: 'black',
            }
        }   
    }
    
    //resources for constructor
    static statusEnums = {
        lead: {
            resourceId: 'lead',
            order: 1,
            label: 'Lead',
            color: 'yellow',
            textColor: 'black'
        },
        outforsign: {
            resourceId: 'outforsign',
            order: 2,
            label: 'Out For Sign',
            color: 'blue',
            textColor: 'white'
        },
        booked: {
            resourceId: 'booked',
            order: 3,
            label: 'Booked',
            color: 'green',
            textColor: 'white'
        }
    }

    static resources = () => {
        const entries = [];
        
        for(const [key, value] of Object.entries(this.statusEnums)){
            entries.push({
                id: value.resourceId,
                title: value.label,
                eventColor: value.color,
                eventTextColor: value.textColor,
                eventBorderColor: (value.borderColor) ? value.borderColor : 'black',
                tOrder: (value.order) ? value.order : ''
            })
        }

        return entries;
    }
}

export default Event;