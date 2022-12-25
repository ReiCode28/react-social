import bcrypt from "bcrypt"; //allows to encrypt passwords 
import jwt from "jsonwebtoken"; //gives a way to send users a web token that they can use for authorization
import User from "../models/User.js";

/** REGISTER USER */
/** Handles request to register new users */
 
export const register = async (req, res) => { 

    //handling errors
    try {
        //structuring parameters from the req body. Will have to send an object that has the following parameters from the front end:
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation
        } = req.body;

        //generating a salt using the 'genSalt' method from the 'bcrypt' library, then using that salt to hash the user's password using the 'hash' method.
        const salt = await bcrypt.genSalt(); //using salt to encrypt our password
        const passwordHash = await bcrypt.hash(password, salt); //

        //creating a new instance of 'User', assigning it to 'newUser', passing in the extracted properties
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000), //using random dummy data
            impressions: Math.floor(Math.random() * 10000) //using random dummy data
        });

        //saving user to the database
        const savedUser = await newUser.save();
        //if successful, it will send a status code 201 and save the user object, if not, it will send a JSON response with status code 500 w/ error message
        res.status(201).json(savedUser);
    }catch (err){
        res.status(500).json({ error: err.message });
    }
}

/** LOGGING IN */
/** Handles requests for logging in existing users */
export const login = async (req, res) => {
    try {
        // Extracts the 'email' and 'password' properties from the request body and assign them to local variables
        const { email, password } = req.body;
        //Attempts to find a user in the database with a matching email by calling the 'findOne' method on the 'User' model
        const user = await User.findOne({ email: email});
        if (!user) return res.status(400).json({ msg: "User does not exist. "}); // error message if no user exists

        // Compares the provided password with the hashed password stored in the database by calling the 'compare' method on the 'bcrypt' library
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." }); //error message if password does not match

        //If the provided email and password are both valid, generates a JWT by calling the 'sign' method on the 'jwt' library
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        //removes the 'password' from the 'user' for security reasons
        delete user.password;
        //Sends a JSON response with a status code of 200, a 'token' property set to the generated JWT, and a 'user' property set to the modified 'user' object
        res.status(200).json({ token, user});

    }catch (err){
        res.status(500).json({ error: err.message });
    }
};
