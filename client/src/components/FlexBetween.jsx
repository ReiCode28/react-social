import { Box } from "@mui/material"
import { styled } from "@mui/system";

//creating a styled component from the mui library to be used later
const FlexBetween = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
})

export default FlexBetween;