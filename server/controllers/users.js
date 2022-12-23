import User from "../models/User.js";

/** READ */
export const getUser = async (req, res) => {
    try {
        const { id } = req.params; //grab the id from the request
        const user = await User.findById(id); //use the id to grab the information of the user that i will need
        res.status(200).json(user); //sends back to the front end, everything relevant to the user after it's found
    } catch (err){
        res.status(404).json({ message: err.message });
    }
}

export const getUserFriends = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
    
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath}
            }
        );
        res.status(200).json(formattedFriends);  
    } catch(err){
        res.status(404).json({ message: err.message });
    }
}

/** UPDATE */
export const addRemoveFriend = async (req, res) => {
    try{
        const { id, friendId } = req.params;
        const user = await User.findById(id); //grabbing current user 
        const friend = await User.findById(friendId); //grabbing friend information

        //check if friendId is included in the main user's friend Id and remove if friend Id exists
        if (user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId); 
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        //reformat the friends
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath}
            }
        );
        
        res.status(200).json(formattedFriends);
    } catch (err){
        res.status(404).json({ message: err.message });
    }
}