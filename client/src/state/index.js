import { createSlice } from "@reduxjs/toolkit";

// Defines the initial state for the slice
const initialState = {
    mode: "light", // Represents the mode of the application (e.g. "light" or "dark")
    user: null, // Represents the authenticated user
    token: null, // Represents the authenticated user's token
    posts: [], // Represents an array of posts
};

// Creates the slice with the specified name and initial state
export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        setMode: (state) => {
            // Toggles the value of the mode property between "light" and "dark"
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            // Sets the user and token properties based on the action's payload
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogut: (state) => {
            // Sets the user and token properties to null
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user){
                // Sets the friends property of the user object based on the action's payload
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent")
            }
        },
        setPosts: (state, action) => {
            // Sets the posts property to the array of posts in the action's payload
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            // Finds the post with the specified post_id in the posts array, and updates it with the new post data from the action's payload
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post_id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
    },
});

// Export the action creators and the reducer as the default export
export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;
