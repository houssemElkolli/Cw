import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import Carousel from "../components/Carousel";
import Socials from "../components/Socials";
import Contact from "../components/Contact";
import SidePagination from "../components/SidePagination";
import { useDispatch } from "react-redux";
import { toggleModel, toggleSidePagination } from "../state/authSlice";
import SendIcon from "@mui/icons-material/Send";
import { useEffect, useRef, useState } from "react";
import axios from "../api/axios";
const Home = () => {
    const [loaded, setLoaded] = useState(false);
    const [totalNumber, setTotalNumber] = useState();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);

    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("/carousel/getTotalNumber").then((res) => {
            console.log(res.data.totalNumber);
            setTotalNumber(res.data.totalNumber);
            setLoaded(true);
        });
        axios
            .get(`/carousel/sidePaginationItems?page=${0}`)
            .then((res) => {
                console.log(res.data.items);
                setItems(res.data.items);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const fetchData = () => {
        axios
            .get(`/carousel/sidePaginationItems?page=${page + 1}`)
            .then((res) => {
                setItems(items.concat(res.data.items));
                // setItems( [...items , ...res.data.items]);

                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
        setPage(page + 1);
    };

    return (
        <>
            {loaded && (
                <Container>
                    <Carousel totalNumber={totalNumber} />
                    <Socials />
                    <Contact />
                    <SidePagination
                        totalNumber={totalNumber}
                        fetchData={fetchData}
                        items={items}
                    />
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
        opacity: 0.8;
        background-color: rgb(0, 181, 184,0.5);
        scale: 0.8;
        &:hover {
            opacity: 1;
            background-color: rgb(0, 181, 184);
        }
    }
    ::-webkit-media-controls {
        display: none !important;
    }
`;
