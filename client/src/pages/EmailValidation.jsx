import { styled } from "@mui/system";
import { Box, Button, TextField, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import logo from "../assets/logos/picto-noir.png";
import { useState } from "react";

const EmailValidation = () => {
  const nav = useNavigate();
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  const initialValues = {
    email: "",
    code: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    code: yup.string().required("required").min(6).max(6),
  });

  const handleFormSubmit = (data, onSubmitProps) => {
    axios
      .post("/contacts/validateEmail", data)
      .then((res) => {
        onSubmitProps.resetForm();
        setSuccess(true);
        console.log(res);
      })
      .then(() => {
        setTimeout(() => {
          nav("/");
        }, 3000);
      })
      .catch((err) => {
        setErr(true);
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
                      Email Validation
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
                    <ConfirmationNumberIcon
                      sx={{
                        fontSize: "20px",
                        color: "rgb(2,0,36)",
                        mr: 2,
                        my: 0.5,
                      }}
                    />
                    <TextField
                      label="Code"
                      name="code"
                      type="text"
                      variant="standard"
                      fullWidth
                      sx={{}}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.code}
                      error={Boolean(touched.code) && Boolean(errors.code)}
                    />
                  </Box>

                  <Button
                    fullWidth
                    type="submit"
                    sx={{
                      gridColumn: "span 4",
                      marginTop: "25px",
                      borderRadius: "20px",
                    }}
                    variant="contained"
                  >
                    Submit
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
              Please enter your email with the six digit code that we have
              emailed you
            </span>
            <br />© 2023 Google LLC, 1600 Amphitheatre Parkway, Mountain View,
            CA 94043, USA
          </p>
        </div>

        {err && (
          <Alert
            severity="error"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => setErr(false)}
              >
                X
              </Button>
            }
            sx={{
              position: "fixed",
              bottom: "2%",
              right: "2%",
            }}
          >
            <AlertTitle>Error</AlertTitle>
            Somthing Went Wrong — Either <strong>Email</strong> or{" "}
            <strong>Code</strong> are wrong!
          </Alert>
        )}
        {success && (
          <Alert
            severity="success"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() => setSuccess(false)}
              >
                X
              </Button>
            }
            sx={{
              position: "fixed",
              bottom: "2%",
              right: "2%",
            }}
          >
            <AlertTitle>Email Validated </AlertTitle>
            Thank You For Validating — We'll Reply To You Shortly Through Email!
          </Alert>
        )}
      </Container>
    </>
  );
};

export default EmailValidation;

const Container = styled(Box)`
  position: relative;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
  background: rgb(2, 0, 36);
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
