const router = require("express").Router();
const Message = require("../models/Message");
const User = require("../models/User");

// new conversation
router.post("/", async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
    });

    try {
        const savedConversation = await newConversation.save();
        res.status(200).json(savedConversation);
    } catch(err) {
        res.status(500).json(err);
    }
});
// get Conversation of a user


module.exports = router;
