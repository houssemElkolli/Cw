import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import Carousel from "../components/Carousel";
import Socials from "../components/Socials";
import Contact from "../components/Contact";
import { useDispatch, useSelector } from "react-redux";
import { toggleModel } from "../state/authSlice";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import axios from "../api/axios";

const Home = () => {
    const [loaded, setLoaded] = useState(false);
    const [totalNumber, setTotalNumber] = useState();

    const dispatch = useDispatch();
    const accessToken = useSelector((state) => state.auth.accessToken);

    useEffect(() => {
        axios.get("/carousel/getTotalNumber").then((res) => {
            console.log(res.data.totalNumber);
            setTotalNumber(res.data.totalNumber);
            setLoaded(true);
        });
        console.log(accessToken);
    }, []);

    return (
        <>
            {loaded && (
                <Container>
                    <Carousel totalNumber={totalNumber} />
                    <Socials />
                    <Contact />
                    <Button
                        type="button"
                        variant="contained"
                        endIcon={<SendIcon />}
                        onClick={() => {
                            dispatch(toggleModel({ model: true }));
                        }}
                        className="contact-button"
                    >
                        Contact
                    </Button>
                </Container>
            )}
        </>
    );
};

export default Home;

const Container = styled(Box)`
    position: relative;
    overflow: hidden;

    .contact-button {
        position: absolute;
        right: 0%;
        bottom: 2%;
        z-index: 999;
        background-color: rgb(0, 181, 184);
        opacity: 0.7;
        scale: 0.8;
        &:hover {
            opacity: 1;
            background-color: rgb(0, 181, 184);
        }
    }
`;
