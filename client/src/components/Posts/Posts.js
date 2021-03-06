import React, { useContext } from "react";
import { Grid, CircularProgress, Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import Post from "../Post/Post";
import useStyles from "./styles";
import { AppContext } from "../../App";

const Posts = ({ setCurrentId, page }) => {
  const { posts } = useSelector((state) => state.posts);
  const classes = useStyles();
  const { showLoadingCircle, setShowLoadingCircle } = useContext(AppContext);

  const toRef = setTimeout(() => {
    setShowLoadingCircle(false);
    clearTimeout(toRef);
  }, 30000);

  return !posts?.length ? (
    showLoadingCircle ? (
      <Box className={classes.loadingContainer}>
        <CircularProgress sx={{ marginTop: "50px" }} />
        <Typography paddingTop={3}>
          Server needs a few seconds please wait ...
        </Typography>
      </Box>
    ) : (
      <Typography sx={{ marginTop: "50px" }}>No posts were found.</Typography>
    )
  ) : (
    <Grid container className={classes.postsContainer} spacing={4}>
      {posts.map((post) => (
        <Grid key={post._id} item>
          <Post post={post} setCurrentId={setCurrentId} page={page} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Posts;
