const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: String,
        },
        sender: {
            type: String,
        },
        text: {
            type: String,
        },
        img_mess: {
            type: String,
            default: '',
        },
    },
    { timestamps: true },
);

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema);

export default Message;
