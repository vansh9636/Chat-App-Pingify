const Conversation = require("../models/conversationmodel");
const Message = require("../models/messageModel");
exports.sendmessage = async (req, res) => {
    try {
        const senderId = req.user.id;
        const reciverId = req.params.reciverId;
        const { message } = req.body;
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        });
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, reciverId]
            });

        }
        const newmessage = await Message.create({
            senderId: senderId,
            receiverId: reciverId,
            message,
        });
        if (newmessage) {
            conversation.messages.push(newmessage._id);
        }
        await conversation.save();
       
        // soket io work

        res.status(201).json(newmessage); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
} 
exports.getMessages = async (req, res) => {
    try {
        const senderId = req.user.id; 
        const reciverId = req.params.reciverId;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, reciverId] }
        }).populate("messages");
        res.status(200).json(conversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}