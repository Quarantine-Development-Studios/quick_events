

const event = (inquiry_ID, title, startDate_Time, stopDate_Time, status) => {
    const cAlert = (msg) => {
        return window.alert("!! Event  constructor " + msg + " !!")
    }

    if(inquiry_ID){
        
        const resourceId = () => {
            switch(status) {
                case 'lead':
                    return '1_lead';
                case 'outforsign':
                    return '2_outforsign';
                case 'booked':
                    return '3_booked';
                case 'hosted':
                    return '4_hosted';
                default:
                    return '';
            }
        }

        return{
            id: inquiry_ID,
            title: (title)       
                ? title : cAlert("needs a valid title"),
            
            start: (startDate_Time)   
                ? startDate_Time : cAlert("needs a valid startDate"),

            end: (stopDate_Time)    
                ? stopDate_Time  : cAlert("needs a valid stop Date"),
            
            resourceId: resourceId(),
        }
    }   

}

export default event;
/* export const StatusOptions = {
    //not implemented yet
} */