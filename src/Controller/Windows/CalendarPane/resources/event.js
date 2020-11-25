

const event = (inquiry_ID, title, startDate_Time, stopDate_Time, status) => {
    if(inquiry_ID){

        return{
            id: inquiry_ID,
            title: (title)       
                ? title : this.cAlert("needs a valid title"),
            
            start: (startDate_Time)   
                ? startDate_Time : this.cAlert("needs a valid startDate"),

            end: (stopDate_Time)    
                ? stopDate_Time  : this.cAlert("needs a valid stop Date"),
            
            status: (status)      
                ? status : this.cAlert("needs a valid 'Status' Object"),
        }
    }   


    const cAlert = (msg) => {
        window.alert("!! Event  constructor " + msg + " !!")
    }
}

export default event;
/* export const StatusOptions = {
    //not implemented yet
} */