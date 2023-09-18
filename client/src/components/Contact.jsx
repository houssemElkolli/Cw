import { Box, Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Formik } from "formik";

import UseOnClickOutSide from "./UseOnClickOutSide";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleModel, setChange } from "../state/authSlice";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import axios from "../api/axios";
import * as yup from "yup";

const Contact = () => {
    const [email, setEmail] = useState();
    const ref = useRef();
    const dispatch = useDispatch();
    const model = useSelector((state) => state.auth.model);
    const change = useSelector((state) => state.auth.change);

    UseOnClickOutSide(ref, () => {
        dispatch(toggleModel({ model: false }));
        dispatch(setChange({ change: false }));
    });

    const initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        phoneNumber: "",
        companyName: "",
        message: "",
    };
    const validationSchema = yup.object().shape({
        firstName: yup.string(),
        lastName: yup.string(),
        email: yup.string(),
        subject: yup.string(),
        phoneNumber: yup.number(),
        companyName: yup.string(),
        message: yup.string(),
    });

    const handleFormSubmit = (data, onSubmitProps) => {
        console.log(data);
        axios
            .post("/contacts/addContactForm", data)
            .then((res) => {
                onSubmitProps.resetForm();
                console.log(res);
                setEmail(res.data.email);
                dispatch(setChange({ change: true }));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            {model && (
                <Container ref={ref} className="Contact">
                    {change ? (
                        <Box
                            sx={{
                                paddingTop: " 10px",
                                width: "500px",
                                border: "3px solid rgb(116, 50, 50)",
                                borderRadius: "10px",
                            }}
                        >
                            <Typography
                                variant="h3"
                                component="h3"
                                sx={{
                                    textAlign: "center",
                                    letterSpacing: "2px",
                                    fontFamily: "poppins, cursive",
                                    color: "rgb(116, 50, 50)",
                                    padding: "10px 30px",
                                    fontWeight: "800",
                                }}
                            >
                                Important Note!
                            </Typography>
                            <Box
                                sx={{
                                    textTransform: "capitalize",
                                    letterSpacing: "2px",
                                    lineHeight: "150%",
                                    padding: "10px 30px ",
                                    paddingBottom: "5px",
                                    fontFamily: "poppins, cursive",
                                    fontWeight: "500",
                                    color: "#525252",
                                    fontSize: "12px",
                                    display: "grid",
                                    gridTemplateColumns: "1fr",
                                    justifyItems: "center",
                                    alignItems: "center",
                                }}
                            >
                                Welcome, Thank You For contacting us
                                <Box
                                    sx={{
                                        lineHeight: "170%",
                                        color: "rgb(112, 112, 112)",
                                        fontSize: "12px",
                                        textAlign: "center",
                                    }}
                                >
                                    before we reply to your message we need you
                                    to verify that you are the owner of this
                                    email address
                                </Box>
                                <Box
                                    sx={{
                                        color: "#252525",
                                        fontSize: "20px",
                                        marginTop: "20px",
                                    }}
                                >
                                    "{email}"
                                </Box>
                                <a
                                    className="button-00"
                                    type="button"
                                    href="https://mail.google.com/mail"
                                    target="blank"
                                >
                                    Please Go to Email
                                </a>
                                {/* <Box
                    sx={{
                      color : "rgb(112, 112, 112)",
                      fontSize : '12px'
                    }} 
                >
                  you will recieve an email sent by creative World where you past the previous number to complete verfication
                </Box> */}
                            </Box>
                        </Box>
                    ) : (
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
                                            padding: "0px",
                                        }}
                                    >
                                        <Box className="form-box">
                                            <Button
                                                onClick={() => {
                                                    dispatch(
                                                        toggleModel({
                                                            model: false,
                                                        })
                                                    );
                                                }}
                                                variant="contained"
                                                className="close-btn"
                                            >
                                                Close
                                            </Button>
                                            <Typography
                                                className="typo"
                                                variant="h3"
                                                component="h3"
                                                sx={{
                                                    gridColumn: "span 4",
                                                    justifySelf: "center",
                                                    letterSpacing: "2px",
                                                    fontFamily:
                                                        "poppins, cursive",
                                                    color: "rgb(50, 116, 105)",
                                                    padding: "10px 30px",
                                                    // borderRadius : "30px",
                                                    // backgroundImage: "linear-gradient(to right,  rgba(68, 129, 235, 0.753), rgba(68, 129, 235, 0.377), rgba(4, 192, 254, 0.767), rgb(63, 134, 237))",
                                                    // boxShadow: "0px -8px 10px 0px rgba(0,0,0,0.2)",
                                                    fontWeight: "800",
                                                }}
                                            >
                                                Contact Us
                                            </Typography>
                                            {/* <Typography variant="p"
                      sx={{
                        gridColumn: "span 4",
                        justifySelf: 'center',
                        fontFamily: "Poppins, sans-serif",
                        padding: "5px",
                        borderRadius: "30px",
                        textAlign: 'center',
                        textTransform: "capitalize",
                        color: "#797878",


                      }}>
                      State your info with a brief message down below and we will respond to you as soon as possible
                    </Typography> */}
                                            <TextField
                                                label="First Name"
                                                name="firstName"
                                                variant="standard"
                                                sx={{
                                                    gridColumn: "span 2",
                                                }}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.firstName}
                                                error={
                                                    Boolean(
                                                        touched.firstName
                                                    ) &&
                                                    Boolean(errors.firstName)
                                                }
                                            />

                                            <TextField
                                                label="Last Name"
                                                name="lastName"
                                                variant="standard"
                                                sx={{ gridColumn: "span 2" }}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.lastName}
                                                error={
                                                    Boolean(touched.lastName) &&
                                                    Boolean(errors.lastName)
                                                }
                                            />

                                            <TextField
                                                label="Email"
                                                name="email"
                                                variant="standard"
                                                fullWidth
                                                sx={{ gridColumn: "span 4" }}
                                                type="email"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.email}
                                                error={
                                                    Boolean(touched.email) &&
                                                    Boolean(errors.email)
                                                }
                                            />

                                            <TextField
                                                label="Subject"
                                                name="subject"
                                                variant="standard"
                                                fullWidth
                                                sx={{ gridColumn: "span 4" }}
                                                type="text"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.subject}
                                                error={
                                                    Boolean(touched.subject) &&
                                                    Boolean(errors.subject)
                                                }
                                            />

                                            <TextField
                                                label="Phone Number"
                                                name="phoneNumber"
                                                variant="standard"
                                                fullWidth
                                                sx={{ gridColumn: "span 4" }}
                                                type="text"
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.phoneNumber}
                                                error={
                                                    Boolean(touched.phoneNumber) &&
                                                    Boolean(errors.phoneNumber)
                                                }
                                            />

                                            <TextField
                                                label="Company Name"
                                                name="companyName"
                                                variant="standard"
                                                sx={{ gridColumn: "span 4" }}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.companyName}
                                                error={
                                                    Boolean(
                                                        touched.companyName
                                                    ) &&
                                                    Boolean(errors.companyName)
                                                }
                                            />

                                            <TextField
                                                label="Message"
                                                name="message"
                                                variant="outlined"
                                                id="outlined-multiline-static"
                                                fullWidth
                                                multiline
                                                maxRows={3}
                                                minRows={3}
                                                sx={{
                                                    gridColumn: "span 4",
                                                    resize: "none",
                                                }}
                                                onBlur={handleBlur}
                                                onChange={handleChange}
                                                value={values.message}
                                                error={
                                                    Boolean(touched.message) &&
                                                    Boolean(errors.message)
                                                }
                                            />
                                            <button
                                                type="submit"
                                                className="button-56"
                                            >
                                                Contact
                                            </button>
                                        </Box>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    )}
                </Container>
            )}
        </>
    );
};

export default Contact;

const Container = styled(Box)`
    border-radius: 10px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: fit-content;
    height: fit-content;
    z-index: 99;
    background-color: rgb(255, 253, 253);
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    font-size: 12px;
    opacity: 70%;

    animation-name: appear;
    animation-duration: 0.5s;

    @keyframes appear {
        0% {
            opacity: 0%;
            /* scale: 0; */
            transform: translateX(20px);
        }
        70% {
            opacity: 0%;
            /* scale: 0.7; */
            transform: translateX(5px);
        }

        100% {
            opacity: 70%;
            /* scale: 1; */
        }
    }
    .form-box {
        border-radius: 10px;

        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        grid-gap: 10px 10px;
        padding: 10px 30px;
        padding-bottom: 30px;
        border: 3px solid rgb(50, 116, 105);
    }

    .close-btn {
        position: absolute;
        top: -5%;
        left: 50%;
        transform: translateX(-100%);
        outline: none;
        scale: 0.5;
        background-color: rgb(50, 116, 105);
        text-transform: uppercase;
        height: 40px;
        width: 40px;
    }

    .button-56 {
        margin-top: 10px;
        align-items: center;
        background-color: #f6f9fc;
        border: 2px solid #9b9b9b;
        box-sizing: border-box;
        color: #555454;
        cursor: pointer;
        display: flex;
        font-size: 16px;
        min-height: 35px;
        justify-content: center;
        line-height: 24px;
        width: 100%;
        position: relative;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        justify-self: center;
        grid-column: span 4;
    }
    .button-56:after {
        background-color: #c0bebe;
        content: "";
        display: block;
        min-height: 35px;
        left: 0;
        width: 100%;
        position: absolute;
        top: -2px;
        transform: translate(6px, 6px);
        transition: transform 0.2s ease-out;
        z-index: -1;
    }

    .button-56:hover:after {
        transform: translate(0, 0);
    }

    .button-56:active {
        outline: 0;
    }

    .button-56:hover {
        outline: 0;
        border-width: 3px;
        border-image: linear-gradient(to right, #11998e, #38ef7d);
        border-image-slice: 1;
        color: #1b1b1b;
    }

    @media (min-width: 768px) {
        .button-56 {
            padding: 0 40px;
        }
    }

    .button-00 {
        margin: 25px 0;
        align-items: center;
        background-color: #f6f9fc;
        border: 2px solid #9b9b9b;
        box-sizing: border-box;
        color: #555454;
        cursor: pointer;
        display: flex;
        font-size: 16px;
        min-height: 35px;
        justify-content: center;
        line-height: 24px;
        width: 100%;
        position: relative;
        text-align: center;
        text-decoration: none;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
    }
    .button-00:after {
        background-color: #c0bebe;
        content: "";
        display: block;
        min-height: 35px;
        left: 0;
        width: 100%;
        position: absolute;
        top: -2px;
        transform: translate(6px, 6px);
        transition: transform 0.2s ease-out;
        z-index: -1;
    }

    .button-00:hover:after {
        transform: translate(0, 0);
    }

    .button-00:active {
        outline: 0;
    }

    .button-00:hover {
        outline: 0;
        border-width: 3px;
        border-image: linear-gradient(to right, #ffc7c7, rgb(116, 50, 50));
        border-image-slice: 1;
        color: #1b1b1b;
    }

    @media (min-width: 768px) {
        .button-00 {
            padding: 0 40px;
        }
    }
`;
