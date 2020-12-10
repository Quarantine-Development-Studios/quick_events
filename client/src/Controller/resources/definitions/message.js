
class message {
    constructor(date, msg) {
        this.date = date;
        this.msg = msg;
    }

    editMessage = (newMessage) => {
        this.msg = newMessage;
    }
}

export default message