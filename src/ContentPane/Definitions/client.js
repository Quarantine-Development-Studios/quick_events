//import test from "./inquiry"

export default class Client { 
    constructor(name, email, phone){
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.inquiries = [];
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

