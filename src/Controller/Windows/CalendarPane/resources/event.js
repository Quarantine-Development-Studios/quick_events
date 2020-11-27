

const event = (inquiry_ID, title, startDate_Time, stopDate_Time, status) => {
    const cAlert = (msg) => {
        return window.alert("!! Event  constructor " + msg + " !!")
    }

    if(inquiry_ID){
        
        const resourceId = () => {
            switch(status) {
                case 'lead':
                    return 'lead';
                case 'outforsign':
                    return 'outforsign';
                case 'booked':
                    return 'booked';
                case 'hosted':
                    return 'hosted';
                default:
                    return '';
            }
        }

        const color = () => {
            switch(status) {
                case 'lead':
                    return 'yellow';
                case 'outforsign':
                    return 'blue';
                case 'booked':
                    return 'green';
                case 'hosted':
                    return 'pink';
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
            color: color(),
            textColor: 'black',
            borderColor: 'black',
        }
    }   

}

export default event;
/* export const StatusOptions = {
    //not implemented yet
} */