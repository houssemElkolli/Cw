import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { styled } from "@mui/system";
import cc from "../assets/images/page.png";
import { Typography } from "@mui/material";

const PartnersView = () => {
    const [partners, setPartners] = useState([]);
    const [lod, setLod] = useState(false);
    useEffect(() => {
        axios.get("http://localhost:3001/partners/getPartners").then((res) => {
            setPartners(res.data.partners);
            console.log(res);
            setLod(true);
        });
    }, []);
    const partnerss = [
        {
            img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
            title: "Breakfast",
        },
        {
            img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
            title: "Burger",
        },
        {
            img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
            title: "Camera",
        },
        {
            img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
            title: "Coffee",
        },
        {
            img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
            title: "Hats",
        },
        {
            img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
            title: "Honey",
        },
        {
            img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
            title: "Basketball",
        },
        {
            img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
            title: "Fern",
        },
        {
            img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
            title: "Mushrooms",
        },
        {
            img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
            title: "Tomato basil",
        },
        {
            img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
            title: "Sea star",
        },
        {
            img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
            title: "Bike",
        },
        {
            img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
            title: "Fern",
        },
        {
            img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
            title: "Mushrooms",
        },
        {
            img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
            title: "Tomato basil",
        },
        {
            img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
            title: "Sea star",
        },
        {
            img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
            title: "Bike",
        },
        {
            img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
            title: "Fern",
        },
        {
            img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
            title: "Mushrooms",
        },
        {
            img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
            title: "Tomato basil",
        },
        {
            img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
            title: "Sea star",
        },
        {
            img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
            title: "Bike",
        },
    ];
    return (
        <Container className="PartnersView">
            {lod && (
                <>
                    <Typography
                        variant="h3"
                        sx={{
                            fontFamily: "poppins, cursive",
                            marginTop: "20px",
                            color: "#494949",
                        }}
                    >
                        Our Partners{" "}
                    </Typography>
                    <ImageList gap={10} cols={6} sx={{ padding: "5px" }}>
                        {partners.map((item) => (
                            <ImageListItem
                                key={item._id}
                                sx={{
                                    height: "180px",
                                    width: "180px",
                                    boxShadow: "1px 2px 5px rgb(131, 131, 131)",
                                }}
                            >
                                <img
                                    src={`http://localhost:3001/assets/${item.picturePath}`}
                                    alt={item.alt}
                                    loading="lazy"
                                />
                            </ImageListItem>
                            //  <ImageListItem key={item.img} sx={{ height: '200px', width: '200px', boxShadow : '5px 5px 10px rgb(75, 75, 75)' }}>
                            // <img
                            //         src={`${item.img}`}
                            //         alt={item.title}
                            //         loading="lazy"
                            //     />
                            // </ImageListItem>
                        ))}
                    </ImageList>
                </>
            )}
        </Container>
    );
};

export default PartnersView;

const Container = styled(Box)`
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: start;
`;
