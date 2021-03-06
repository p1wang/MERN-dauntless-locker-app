import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  postsContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "50px",
    [theme.breakpoints.down("sm")]: {
      paddingTop: "0",
    },
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
}));
