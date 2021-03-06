import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import useStyles from "./styles";
import { createPost } from "../../actions/posts";

const Form = ({ setCurrentId, setShowForm, setShowAlert, setAlertMessage }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    url: "",
  });

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: "", url: "" });
  };

  const alertResults = (msg) => {
    setAlertMessage(msg);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!postData.url.includes("dauntless-builder.com")) {
      alertResults([
        "warning",
        "Upload failed, please provide valid url for the build.",
      ]);
      return;
    }
    dispatch(createPost(postData, navigate));
    setShowForm(false);
    alertResults(["success", "Upload successful!"]);
    clear();
  };

  if (!user?.result?.name) {
    return (
      <div>
        <Typography variant="h6" align="center">
          Please Sign In to create your own builds
        </Typography>
      </div>
    );
  }

  return (
    <Paper
      elevation={6}
      component="form"
      className={classes.form}
      autoComplete="off"
      noValidate
      onSubmit={handleOnSubmit}
    >
      <Typography variant="h6" align="center">
        New builds
      </Typography>
      <TextField
        name="title"
        variant="outlined"
        label="Title"
        fullWidth
        inputProps={{ maxLength: "35" }}
        value={postData.title}
        onChange={(e) => setPostData({ ...postData, title: e.target.value })}
      />
      <TextField
        name="message"
        variant="outlined"
        label="Message"
        fullWidth
        multiline
        rows={4}
        inputProps={{ maxLength: "200" }}
        value={postData.message}
        onChange={(e) => setPostData({ ...postData, message: e.target.value })}
      />
      <TextField
        name="tags"
        variant="outlined"
        label="Tags (coma separated)"
        fullWidth
        inputProps={{ maxLength: "100" }}
        value={postData.tags}
        onChange={(e) =>
          setPostData({ ...postData, tags: e.target.value.split(",") })
        }
      />
      <TextField
        name="url"
        variant="outlined"
        label="URL to the build"
        fullWidth
        inputProps={{ maxLength: "100" }}
        value={postData.url}
        onChange={(e) => setPostData({ ...postData, url: e.target.value })}
      />

      <Button
        className={classes.buttonSubmit}
        variant="contained"
        color="secondary"
        size="large"
        type="submit"
        fullWidth
      >
        Submit
      </Button>
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={clear}
        fullWidth
      >
        Clear
      </Button>
    </Paper>
  );
};

export default Form;
