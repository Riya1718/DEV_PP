  
import React, { useContext, useState } from "react";
import { firebaseDB, firebaseStorage } from "../config/firebase";
import { AuthContext } from "../context/AuthProvider";
import logo from "../logo.png";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import{
  TextField,
  Grid,
  Button,
  Paper,
  Card,
  CardContent,
  CardActions,
  Container,
  CardMedia,
  Typography,
  makeStyles,
} from "@material-ui/core";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [message, setMessage] = useState("");
  const { signUp } = useContext(AuthContext);

  const handleFileSubmit = (event) => {
    let fileObject = event.target.files[0];
    setProfileImage(fileObject);
  };

  const handleSignUp = async () => {
    try {
      let response = await signUp(email, password);
      let uid = response.user.uid;
      //   you are signed up
      const uploadPhotoObject = firebaseStorage
        .ref(`/profilePhotos/${uid}/image.jpg`)
        .put(profileImage);
      //   console.log(uploadPhotoObject);
      uploadPhotoObject.on("state_changed", fun1, fun2, fun3);
      // to track the progress of the upload
      function fun1(snapshot) {
        // bytes transferred
        // totoal bytes
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      }
      // if indicates a error !!
      function fun2(error) {
        console.log(error);
      }
      // it indicates success of the upload !!
      async function fun3() {
        let profileImageUrl =
          await uploadPhotoObject.snapshot.ref.getDownloadURL();
        // db me collection => document => {username , email , profileImageUrl};
        firebaseDB.collection("users").doc(uid).set({
          email: email,
          userId: uid,
          username: username,
          profileImageUrl: profileImageUrl,
          postsCreated:[]
        });
        props.history.push("/");
      }
    } catch (err) {
      setMessage(err.message);
    }
  };

  let useStyles = makeStyles(
    {
      centerElements: {
        display: "flex",
        flexDirection: "column",
      },

      mb : {
        marginBottom : "1rem"
      },

      ml : {
        marginLeft : "350px",
        width : "500px"
      },

      centerDivs: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        width: "100vw",
      },

      padding : {
        paddingLeft : "10px",
        paddingRight : "10px"
      },

      fullWidth : {
        width : "100%"
      }
    }
  )
  let classes = useStyles();

  return (
    <div>
       <Container>
       <Grid container className = {classes.ml}>
       <Card className = {classes.mb}>
              <CardMedia
                image={logo}
                style={{ height: "10rem", backgroundSize: "auto" }}
              ></CardMedia>
              <Typography style = { {textAlign : "center" , fontSize : "1.5rem", color : "grey"}} className = {classes.padding}>
                Sign up to see Photos and videos from your friends.
              </Typography>
              <CardContent className = {classes.centerElements}>
                <TextField
                  label="Enter Email"
                  type="email"
                  variant="outlined"
                  value={email}
                  size="small"
                  onChange={(e) => setEmail(e.target.value)}
                  className = {classes.mb}
                ></TextField>
                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={password}
                  size="small"
                  onChange={(e) => setPassword(e.target.value)}
                  className = {classes.mb}
                ></TextField>
                <TextField
                  label="Full Name"
                  type="text"
                  variant="outlined"
                  value={username}
                  size="small"
                  onChange={(e) => setUsername(e.target.value)}
                  className = {classes.mb}
                ></TextField>
                <CardActions>
                <Button 
                variant="outlined" 
                color="secondary" 
                onClick = {handleFileSubmit} 
                className={classes.fullWidth}
                startIcon = {<CloudUploadIcon></CloudUploadIcon>}
                >  
                  Upload Profile Image
                </Button>
                </CardActions>
                <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick = {(e) => {
                            handleFileSubmit(e);
                          }}
                  className={classes.fullWidth}
                >
                  Sign Up
                </Button>
              </CardActions>
              <Typography style = { {fontSize : "1.2rem" , textAlign : "center"}}> 
                By Signing Up, You agree to our Terms, Data Policy and Cookies Policy.
              </Typography>
              </CardContent>
              </Card>
              <Card style = { {width : "500px"}}>
              <Typography style = { {fontSize : "1.2rem" , textAlign : "center"}}> 
                Have an Account ?
               <Button color="primary" href = "/login">
                Log In
              </Button>
              </Typography>
              
              </Card>
             </Grid>
       </Container>
    </div>

    // <>
    //   <h1>Signup Page</h1>
    //   <div>
    //     <div>
    //       Username
    //       <input
    //         value={username}
    //         onChange={(e) => setUsername(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       Email
    //       <input
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       Password
    //       <input
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       ></input>
    //     </div>
    //     <div>
    //       Profile Image
    //       <input
    //         type="file"
    //         accept="image/*"
    //         onChange={(e) => {
    //           handleFileSubmit(e);
    //         }}
    //       ></input>
    //     </div>
    //   </div>
    //   <button onClick={handleSignUp}>SignUp</button>
    //   <h2 style={{ color: "red" }}>{message}</h2>{" "}
    // </>
  );
};

export default Signup;