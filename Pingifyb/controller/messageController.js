const Conversation = require("../models/conversationmodel");
const Message = require("../models/messageModel");

exports.sendmessage = async (req, res) => {
    try {

        const senderId = req.user.id;
        const receiverId = req.params.receiverId;
        const { message } = req.body;

        // validation
        if (!message?.trim()) {
            return res.status(400).json({
                success: false,
                msg: "Message is required"
            });
        }

        // find conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // create conversation if not exists
        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        // create new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        // push message
        conversation.messages.push(newMessage._id);

        await conversation.save();

        // socket io here

        return res.status(201).json({
            success: true,
            msg: "Message sent successfully",
            newMessage
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};
exports.getMessages = async (req, res) => {

    try {

        const senderId = req.user.id;
        const receiverId = req.params.receiverId;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate({
            path: "messages",
            options: {
                sort: { createdAt: 1 }
            }
        });

        // no conversation
        if (!conversation) {
            return res.status(200).json([]);
        }

        return res.status(200).json(conversation.messages);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            msg: "Internal server error"
        });
    }
};