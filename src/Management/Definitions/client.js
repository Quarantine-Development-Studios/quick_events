

export default class Client { 
    constructor(id, name, email, phone, inquiryIDArray){
        this.name = (name) ? name : 'New Client';
        this.email = (email) ? email : '';
        this.phone = (phone) ? phone : '';
        this.inquiries = (inquiryIDArray) ? inquiryIDArray : [];

    }


    setID(id){
        this.id = id;
        console.log("set id of client to " + this.id)
    }

    setName(name) {
        this.name = name;
        console.log("Set name of client to " + this.name)
    }
    
    setEmail(email){
        this.email = email;
    }
    
    setPhone(phone){
        this.phone = phone;
    }
    


    getInquiries(){
        if(this.inquiries){
            return this.inquiries;
        } else {
            return false;
        }
    }
    
    toJSON(){
        return {
            name: this.name,
            email: this.email,
            phone: this.phone,

        }
    }

}

