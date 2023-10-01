import { styled } from "@mui/system";
import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/authSlice";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import PasswordIcon from "@mui/icons-material/Password";
import logo from "../assets/logos/picto-noir.png";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  });

  const handleFormSubmit = (data, onSubmitProps) => {
    axios
      .post("/auth/login", data , { withCredentials : true} )
      .then((res) => {
        onSubmitProps.resetForm();
        dispatch(
          setLogin({
            accessToken: res.data.accessToken,
            user : res.data.user
          })
        );
        // localStorage.setItem("token", `Bearer ${res.data.accessToken}`);
        nav("/");
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container>
        <img src={logo} height={"100px"} width={"100px"} sx={{}} />
        <Formik
          onSubmit={handleFormSubmit}
          validationSchema={validationSchema}
          initialValues={initialValues}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  padding: "0",
                }}
              >
                <Box className="form-box">
                  <Box
                    sx={{
                      display: "flex",
                      justifyItems: "center",
                      alignItems: "center",
                      gridColumn: "span 4",
                      justifySelf: "center",
                    }}
                  >
                    {/* <LoginIcon sx={{ fontSize: "50px", color: '#131313ed', mr: 2, my: 0.5 }} /> */}
                    <Typography
                      variant="h4"
                      component="h6"
                      sx={{
                        justifySelf: "center",
                        fontFamily: "Poppins, sans-serif",
                        color: "rgb(2,0,36)",
                        borderRadius: "30px",
                      }}
                    >
                      Log In
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      gridColumn: "span 4",
                    }}
                  >
                    <AlternateEmailIcon
                      sx={{
                        fontSize: "20px",
                        color: "rgb(2,0,36)",
                        mr: 2,
                        my: 0.5,
                      }}
                    />
                    <TextField
                      label="Email"
                      name="email"
                      type="email"
                      variant="standard"
                      fullWidth
                      sx={{}}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email}
                      error={Boolean(touched.email) && Boolean(errors.email)}
                    />
                  </Box>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-end",
                      gridColumn: "span 4",
                    }}
                  >
                    <PasswordIcon
                      sx={{
                        fontSize: "20px",
                        color: "rgb(2,0,36)",
                        mr: 2,
                        my: 0.5,
                      }}
                    />
                    <TextField
                      label="Password"
                      name="password"
                      type="password"
                      variant="standard"
                      fullWidth
                      sx={{}}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={
                        Boolean(touched.password) && Boolean(errors.password)
                      }
                    />
                  </Box>

                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      gridColumn: "span 4",
                      marginTop: "20px",
                      borderRadius: "20px",

                    }}
                    variant="contained"
                  >
                    submit
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
        <div className="bottomText">
          <h3>Note</h3>
          <p>
            <span className="p2">
              Please do not attempt to log in if you are not a member of
              Creative World
            </span>
            <br />© 2023 Google LLC, 1600 Amphitheatre Parkway, Mountain View,
            CA 94043, USA
          </p>
        </div>
      </Container>
    </>
  );
};

export default Login;

const Container = styled(Box)`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color:  rgb(1, 0, 19);
  /* background: rgb(2, 0, 36); */
  /* background: linear-gradient(90deg, rgba(2,0,36,0.8100490196078431) 0%, rgba(0,212,255,1) 50%, rgba(2,0,36,0.8128501400560224) 100%); */

  display: grid;
  justify-items: center;
  overflow: auto;

  .form-box {
    width: 400px;
    height: 300px;
    background-color: #fcfcfc;
    top: 50%;
    left: 50%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    justify-content: center;
    align-items: center;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 0px 7.5px 0px #494949;
  }
  img {
    box-shadow: 0px 0px 7.5px 0px #494949;
    border-radius: 50%;
    margin-top: 30px;
    background-color: #fff;
  }
  button {
  }

  .bottomText {
    font-family: "Source Sans Pro", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #5e5d5d;
    text-align: center;

    .p2 {
      display: inline-block;
      margin-top: 5px;
      width: 400px;
      text-transform: capitalize;
    }
  }
`;
