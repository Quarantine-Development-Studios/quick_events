//import test from "./inquiry"

export class Client { 
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
    
    createInquiry(){
        console.log(test);
        return test;
         for(let i = 0; i < this.inquiries.length + 1; i++){
            if(!this.inquiries[i]){
                this.inquiries[i] = test;
                return this.inquiries[i];    
            }
        } 
    }
}
