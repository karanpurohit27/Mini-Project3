const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users')

class Register{

    static register = async (req,res)=>{
        // res.send('Register here');

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    
    const userId = req.body.userId;
    const password = req.body.password;
    const cpassword = req.body.cpassword;
    const role = req.body.role;
    // const dateofbirth = req.body.DOB;

    const user = await User.findOne({ userId: userId }).lean();

    if (user) {
      res.json({ status: "failed", message: "User Already Exist!!" });
      
      console.log(user);
    } else {
      if (firstname && userId && password) {
        if (password == cpassword) {
          try {
            const salt = await bcrypt.genSalt(10);
            const hash_password = await bcrypt.hash(password, salt);
            const doc = new userModel({
              firstname: firstname,
              lastname: lastname,
              userId: userId,
              password: hash_password,
              role: role,
            });
            await doc.save();
            const saved = await userModel.findOne({ userId: userId });
            const token = jwt.sign(
              { userID: saved._id },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "5d" }
            );
            
            res.json({
              status: "success",
              message: "Registration Successful",
              token: token,
            });
          } catch (err) {
            console.log(err);
            res.json({
              status: "failed",
              message: "Registration UnSuccessful",
            });
          }
        } else {
          res.json({
            status: "failed",
            message: "Password and Confirm Password wasn't matching",
          });
        }
      } else {
        res.json({ status: "failed", message: "All feilds are required" });
      }
    }
    }
    static login  = async (req,res)=>{
        // res.send('Login here');


        const userId = req.body.userId;
    const password = req.body.password;
    // const
    const user = await userModel.findOne({ userId: userId }).lean();

    if (user) {
      if (phone && password) {
        const checkpass = await bcrypt.compareSync(password, user.password);
        if (user.userId === userId && checkpass) {
          const token = jwt.sign(
            { userID: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "5d" }
          );
          console.log("Login Successfully");
          res.status(201).json({
            status: "success",
            message: "Login Successful",
            token: token,
          });
        } else {
          console.log("Login Unsuccessful");
          const result = {
            status: "failed",
            message: "Please check the credentials",
          };
          res.json(`${result}`);
          console.log(user.password);
        }
      } else {
        console.log("All feilds are required");
        res.json({ status: "failed", message: "All feilds are required" });
      }
    } else {
      console.log("User not found! Please registe");
      res.json({
        status: "failed",
        message: "User not found! Please register",
      });
    }

    }
}





module.exports= Register;