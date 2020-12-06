

export default class Client { 
    constructor(id, name, email, phone, inquiryIDArray){
        this.id = (id) ? id : '';
        this.name = (name) ? name : 'New Client';
        this.email = (email) ? email : '';
        this.phone = (phone) ? phone : '';

    }


    setID(id){
        this.id = id;
    }

    setName(name) {
        this.name = name;
    }
    
    setEmail(email){
        this.email = email;
    }
    
    setPhone(phone){
        this.phone = phone;
    }
    
    static createClientByObj(clientObj){
        if(clientObj){
            const client = new Client(
                clientObj.id,
                clientObj.name,
                clientObj.email,
                clientObj.phone,
            )
            return client;
        } else {
            console.error('!CRITICAL! clientObj is not defined.')
        }
    }

    getInquiries(){
        if(this.inquiries){
            return this.inquiries;
        } else {
            return false;
        }
    }
    
    toJSON(){
        const rInfo = {};
        for(const[key, value] of Object.entries(this)){
            rInfo[key] = value;
        }

        return rInfo;
    }

}

