const express = require('express')
const router = express.Router();
const path = require('path')
// const dashboard = require('../controller/dashboard')
const register = require('../controller/register')
// const dashboard = require('../controller/dashboard')
// const room = require('../controller/room')

const User = require("../models/users");
const Case = require("../models/case");
const Messages = require("../models/message")

router.get("/",(req,res)=>{
    res.send("Hello");
    // res.sendFile(path.join(__dirname,'../src/index.html'));
})




// router.get("/case/:userId",dashboard);
// router.get("/messages/:caseId",room);

router.get("/case/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find the user by their ID
      const user = await User.findOne({ user_id: userId });
  
      // If the user doesn't exist, return an error
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Retrieve the cases associated with the user
      const cases = await Case.find({ users: userId });
  
      // Extract the case IDs from the cases
      const caseIds = cases.map((c) => c);
  
      // Return the case IDs
      res.json({ caseIds });
    } catch (err) {
      console.error("Error retrieving case IDs:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  });



router.get("/messages/:caseId",async (req, res) => {
    try {
        const { caseId } = req.params;
        console.log("yes")
  
      // Find the chat room associated with the case
      const Message = await Case.findOne({ case_id: caseId });
  
      // If the chat room doesn't exist, return an error
      if (!Message) {
        return res.status(404).json({ error: "Chat room not found" });
      }
  
      // Retrieve the messages associated with the case
      const messages = await Messages.find({ case_id: caseId });
      // Extract the case IDs from the cases
      const allmessages = messages.map((c) => c);
  
      // Return the messages
      return res.json({ allmessages });
    } catch (err) {
      console.error("Error retrieving messages:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });


  router.post("/login",register.login);



module.exports = router;