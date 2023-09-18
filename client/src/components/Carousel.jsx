import React, { useEffect, useState } from "react";
// Import Swiper React components
import tw from "../assets/images/test.jpg";
import axios from "../api/axios";
import CircleIcon from "@mui/icons-material/Circle";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CarouselItem from "./CarouselItem";

const Carousel = ({ totalNumber }) => {
    const [carouselItems, setCarouselItems] = useState([]);
    const [itemNumber, setItemNumber] = useState(0);

    useEffect(() => {
        axios
            .get(
                `/carousel/getCarouselItem?itemNumber=${itemNumber}`
            )
            .then((res) => {
                console.log(res.data);
                setCarouselItems(res.data.carouselItems[0]);
            });
    }, [itemNumber]);

    const nextItem = () => {
        if (itemNumber < totalNumber - 1) {
            setItemNumber((itemNumber) => itemNumber + 1);
            console.log(itemNumber);
        }
    };
    const previousItem = () => {
        if (itemNumber > 0) {
            setItemNumber((itemNumber) => itemNumber - 1);
            console.log(itemNumber);
        }
    };

    return (
        <>
            <Container className="carousel">
                <div>
                    <img src={tw} alt="" className="imageee" />
                </div>
                <CarouselItem
                    carouselItems={carouselItems}
                    setCarouselItems={setCarouselItems}
                    nextItem={nextItem}
                    previousItem={previousItem}
                />
                <div className="paginationBulletContainer">
                    {Array(totalNumber)
                        .fill(0)
                        .map((s, index) => (
                            <span
                                onClick={() => {
                                    console.log(index);
                                    setItemNumber(index);
                                }}
                                key={index}
                                className={
                                    "swiper-pagination-bullet " +
                                    (itemNumber === index ? "active" : "")
                                }
                            >
                                {index + 1}
                            </span>
                        ))}
                </div>
            </Container>
        </>
    );
};

export default Carousel;

const Container = styled(Box)`
    overflow-y: hidden;

    @media screen and (orientation: portrait) {
        .mySwiper {
            display: none;
        }
        .imageee {
            display: block;
            height: 100vh;
            width: 100%;
            background-size: cover;
            overflow: hidden;
            position: absolute;
        }
    }
    @media screen and (orientation: landscape) {
        .imageee {
            display: none;
        }
    }
    .paginationBulletContainer {
        position: absolute;
        bottom: 0%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: absolute;
        display: flex;
        flex-direction: row;
        z-index: 9999;
        height: fit-content;
        width: 200px;
        overflow-x: auto;

        ::-webkit-scrollbar {
            /* width: 12px; */
            height: 5px;
            width: 50px;
        }
        ::-webkit-scrollbar-thumb:horizontal {
            background-image: linear-gradient(to right, transparent, #327469);
            border-radius: 10px;
            cursor: pointer;
        }
    }
    scrollbar-width: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    scroll-behavior: smooth;
    /* .paginationBulletContainer::-webkit-scrollbar {
        display: none;
    } */
    .swiper-pagination-bullet {
        /* position: absolute;
        bottom: 50%;
        left: 50%; */
        scale: 0.6;
        border-radius: 50%;
        background-color: black;
        margin: 0 5px;
        padding: 5px;
        height: 25px;
        min-width: 25px;
        text-align: center;
        z-index: 9999;
        font-size: 12px;
        color: #ddd;
        opacity: 1;
        transition: all ease-in-out 0.2s;
        cursor: pointer;
    }

    .swiper-pagination-bullet:hover {
        transform: translateY(-3px);
        scale: 0.8;
        background-color: rgb(50, 116, 105);
    }
    .active {
        transform: translateY(-3px);
        scale: 0.8;
        background-color: rgb(50, 116, 105);
    }

    .playbutton {
        z-index: 9999;
        position: absolute;
        right: 1%;
        top: 13%;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        color: #fff;
        &:active {
            scale: 0.8;
        }
    }
    .resetbutton {
        z-index: 9999;
        position: absolute;
        right: 1%;
        top: 18%;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        color: #fff;
        &:active {
            scale: 0.8;
        }
    }
    .soundbutton {
        z-index: 9999;
        position: absolute;
        right: 1%;
        top: 23%;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        color: #fff;
        &:active {
            scale: 0.8;
        }
    }
    .nextbutton {
        z-index: 9999;
        position: absolute;
        right: 1%;
        top: 3%;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        color: #fff;
        &:active {
            scale: 0.8;
        }
    }
    .prevbutton {
        z-index: 9999;
        position: absolute;
        right: 0.8%;
        top: 8%;
        border-radius: 50%;
        border: none;
        cursor: pointer;
        color: #fff;
        &:active {
            scale: 0.8;
        }
    }
`;
