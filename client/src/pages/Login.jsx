import { styled } from "@mui/system";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from 'yup'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../state/authSlice";
import ImageListItem from '@mui/material/ImageListItem';
import logo from '../assets/logos/picto-noir.png'






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

        axios.post("http://localhost:3001/auth/login", data)
            .then((res) => {
                onSubmitProps.resetForm();
                dispatch(
                    setLogin({
                        user: res.data.user,
                        token: res.data.token,
                    }))
                localStorage.setItem("token", `Bearer ${res.data.token}`)
                nav("/");
                console.log(res);
            })
            .catch((err) => {
                console.log(err);

            })

    }
    return (
        <>
            <Container>
                    <img
                        src={logo}
                        height={'100px'}
                        width={'100px'}
                        sx={{
                        }}

                    />
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
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: '1fr',
                                padding: '0',
                            }}>
                                <Box className="form-box">

                                    <Typography variant="h4" component="h4"
                                        sx={{
                                            gridColumn: "span 4",
                                            justifySelf: 'center',
                                            fontFamily: "Poppins, sans-serif",
                                            color: "#666666ef",
                                            padding: "10px 30px",
                                            borderRadius: "30px",
                                        }}
                                    > 
                                        Creative World
                                    </Typography>
                                    <TextField
                                        label="Email"
                                        name="email"
                                        type="email"
                                        variant='standard'
                                        fullWidth
                                        sx={{ gridColumn: "span 4" }}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.email}
                                        error={Boolean(touched.email) && Boolean(errors.email)}

                                    />

                                    <TextField
                                        label="Password"
                                        name="password"
                                        type="password"
                                        variant='standard'
                                        fullWidth
                                        sx={{ gridColumn: "span 4" }}
                                        onBlur={handleBlur}
                                        onChange={handleChange}
                                        value={values.password}
                                        error={Boolean(touched.password) && Boolean(errors.password)}
                                    />

                                    <Button
                                        fullWidth
                                        type="submit"
                                        sx={{
                                            gridColumn: "span 4",
                                            marginTop: '20px'
                                        }}
                                        variant="contained"
                                    >
                                        Log in
                                    </Button>
                                </Box>
                            </Box>
                        </form>
                    )}

                </Formik>
            </Container>
        </>
    )
}

export default Login


const Container = styled(Box)`
    position: relative;
    height: 100vh;
    width: 100vw;
    background-color: #ececec;
    display :grid;
    justify-items: center;
    overFlow : hidden;
background-image: linear-gradient(160deg, #cee9f8 10%, #beebe5 100%);



    .form-box{
        width: 500px;
        height: 300px;
        background-color: #f8f8f8;
        position: fixed;
        top : 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 1fr 1fr;
        justify-content: center;
        align-items: center;
        padding: 30px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px 2px #494949;


    }
    img {
        box-shadow: 0px 0px 10px 4px #494949;
        border-radius: 50%;
        margin-Top : 30px;
        background-color: #fff;

    }
    button {
        background-color: #3f89d3;

    }
` 
