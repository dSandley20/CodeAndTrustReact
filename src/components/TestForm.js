import React, { useEffect, useState } from "react";
import { TextField, Switch, Button, Avatar } from "@material-ui/core";
import Axios from "axios";

import { makeStyles } from "@material-ui/core/styles";

function TestForm() {
  const formStyles = makeStyles((theme) => ({
    root: {
      color: "white",
      fontFamily: "Play",
    },
    TextField: {
      color: "rgb(244,249,252)",
      textDecorationColor: "rgb(244,249,252)",
    },
    large: {
      width: theme.spacing(16),
      height: theme.spacing(16),
      marginLeft: "auto",
      marginRight: "auto",
    },
  }));
  const classes = formStyles();

  let formData = new FormData();
  const [userUpdate, setUserUpdate] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [accountInfo, setAccountInfo] = useState([]);
  const [pairing, setPairing] = useState({ pair: true });

  useEffect(() => {
    Axios.get("http://projects.codeandtrust.com/api/user/1").then((res) => {
      setAccountInfo(res.data[0]);
      if (res.data[0].pairing === 0) {
        setPairing({ pair: false });
      } else {
        setPairing({ pair: true });
      }
    });
  }, []);

  const handleChange = (event) => {
    setUserUpdate({ ...userUpdate, [event.target.id]: event.target.value });
  };

  const switchHandler = (event) => {
    setPairing({ ...pairing, [event.target.name]: event.target.checked });
  };

  const handleSubmit = () => {
    formData.append("user_name", userUpdate.user_name);
    formData.append("user_email", userUpdate.user_email);
    formData.append("user_phone", userUpdate.user_phone);
    formData.append("pairing", pairing.pair);

    Axios.post(
      "http://projects.codeandtrust.com/api/user/create",
      formData
    ).then((res) => console.log(res));
  };

  return (
    <form className={classes.root}>
      <div>
        <Avatar alt="profile_picture" className={classes.large} />
        <h3>{accountInfo.name}</h3>
        <TextField
          key="user_name"
          id="user_name"
          onChange={handleChange}
          label={accountInfo.name}
          InputLabelProps={{ className: classes.TextField }}
          InputProps={{ className: classes.TextField }}
        />
      </div>
      <div>
        <TextField
          key="user_email"
          id="user_email"
          onChange={handleChange}
          label={accountInfo.email}
          InputLabelProps={{ className: classes.TextField }}
          InputProps={{ className: classes.TextField }}
        />
      </div>
      <div>
        <TextField
          key="user_phone"
          id="user_phone"
          onChange={handleChange}
          label={accountInfo.phone}
          InputLabelProps={{ className: classes.TextField }}
          InputProps={{ className: classes.TextField }}
        />
      </div>
      <div>
        <TextField
          key="pin"
          id="pin"
          onChange={handleChange}
          label={accountInfo.pin}
          InputLabelProps={{ className: classes.TextField }}
          InputProps={{ className: classes.TextField }}
        />
      </div>
      <div>
        <Switch
          key="pairing"
          id="pairing"
          value={pairing.pair}
          checked={pairing.pair}
          onChange={switchHandler}
          color="primary"
          name="pair"
        />
      </div>
      <div>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </form>
  );
}

export default TestForm;
