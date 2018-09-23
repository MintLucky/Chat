class Room {
    constructor(roomId) {
        this.roomId = roomId;
        this.messages = [];
    }

    getMessages() {
        return this.messages;
    }

    setMessage(message) {
        this.messages.push(message);
    }
}

module.exports = Room;
