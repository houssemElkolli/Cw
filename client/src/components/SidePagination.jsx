import { BASE_URL } from "../api/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import UseOnClickOutSide from "./UseOnClickOutSide";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidePagination } from "../state/authSlice";
import Date from "../components/Date";
import pictoVert from "../assets/logos/picto-vert.png";
import { setItemNumber } from "../state/authSlice";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import CloseIcon from "@mui/icons-material/Close";
import useMediaQuery from "@mui/material/useMediaQuery";

function SidePagination({ totalNumber, items, fetchData }) {
    const matches = useMediaQuery("(max-width:500px)");
    const [showImg, setShowImg] = useState(true);
    const [showVid, setShowVid] = useState(true);
    const ref = useRef();
    const dispatch = useDispatch();
    const itemNumber = useSelector((state) => state.auth.itemNumber);

    const sidePagination = useSelector((state) => state.auth.sidePagination);

    UseOnClickOutSide(ref, () => {
        dispatch(toggleSidePagination({ sidePagination: false }));
    });
    return (
        <>
            {sidePagination && (
                <ShadowContainer>
                    <Container id="scrollableDiv" ref={ref}>
                        {matches && (
                            <Button
                                onClick={() =>
                                    dispatch(
                                        toggleSidePagination({
                                            sidePagination: false,
                                        })
                                    )
                                }
                                sx={{
                                    position: "sticky",
                                    top: "0px",
                                    backdropFilter: " blur(50px)",
                                    borderRadius: "50%",
                                    zIndex: "1",
                                }}
                            >
                                <CloseIcon
                                    sx={{
                                        color: "#fff",
                                        borderRadius: "50%",
                                    }}
                                />
                            </Button>
                        )}

                        {items.length > 5 && (
                            <Box
                                sx={{
                                    direction: "ltr",
                                    position: "sticky",
                                    top: "95%",
                                    zIndex: "1",
                                    backdropFilter: " blur(10px)",
                                    padding: "10px 20px ",
                                    borderRadius: "10px",
                                }}
                            >
                                <>
                                    {showImg && (
                                        <FormControlLabel
                                            sx={{
                                                color: "#fff",
                                                position: "sticky",
                                                top: "20px",
                                            }}
                                            control={
                                                <Checkbox
                                                    checked={!showVid}
                                                    onChange={() =>
                                                        setShowVid(!showVid)
                                                    }
                                                    sx={{
                                                        color: "#fff",
                                                        "&.Mui-checked": {
                                                            color: "#fff",
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Images"
                                        />
                                    )}

                                    {showVid && (
                                        <FormControlLabel
                                            sx={{ color: "#fff" }}
                                            control={
                                                <Checkbox
                                                    checked={!showImg}
                                                    onChange={() =>
                                                        setShowImg(!showImg)
                                                    }
                                                    sx={{
                                                        color: "#fff",
                                                        "&.Mui-checked": {
                                                            color: "#fff",
                                                        },
                                                    }}
                                                />
                                            }
                                            label="Videos"
                                        />
                                    )}
                                </>
                            </Box>
                        )}
                        {(items || []).map((i, index) => (
                            <>
                                {i.type === "i" && showImg && (
                                    <>
                                        <span
                                            key={`seconde${index}`}
                                            style={{
                                                color: "white",
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {i.alt}
                                        </span>
                                        <img
                                            onClick={() =>
                                                dispatch(setItemNumber(index))
                                            }
                                            src={`${BASE_URL}/assets/${i.picturePath}`}
                                            alt={i.alt}
                                            height={"150px"}
                                            key={i._id}
                                            style={{}}
                                            className={
                                                "itemImage " +
                                                (itemNumber === index
                                                    ? "active"
                                                    : "")
                                            }
                                            loading="lazy"
                                        />
                                        <Box
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1fr",
                                                alignItems: "center",
                                                direction: "ltr",
                                                width: "30%",
                                                fontSize: "10px",
                                                color: "#ddd",
                                            }}
                                        >
                                            <Date
                                                key={`third${index}`}
                                                dateStr={i.createdAt}
                                            />
                                            <InsertPhotoOutlinedIcon
                                                style={{
                                                    justifySelf: "end",
                                                }}
                                            />
                                        </Box>
                                        <Box
                                            key={`first${index}`}
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    "1fr 1fr 1fr 1fr 1fr",
                                                // gridGap: "5px",
                                                justifyItems: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                        "1fr 1fr 1fr",
                                                    justifyItems: "center",
                                                    alignItems: "center",
                                                    gridColumnGap: "5px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        height: "8px",
                                                        width: "8px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                                <span
                                                    style={{
                                                        height: "5px",
                                                        width: "5px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                                <span
                                                    style={{
                                                        height: "2px",
                                                        width: "2px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                            </div>
                                            <span
                                                style={{
                                                    width: "70px",
                                                    height: "1px",
                                                    backgroundImage:
                                                        "linear-gradient(to right, white 18%, transparent)",
                                                }}
                                            />

                                            <img
                                                src={pictoVert}
                                                style={{
                                                    objectFit: "contain",
                                                    height: "20px",
                                                    width: "20px",
                                                    borderRadius: "50%",
                                                    border: "1.5px solid white",
                                                    boxShadow:
                                                        "0 4px 20px 0 #f5f5f5",
                                                }}
                                            />
                                            <span
                                                style={{
                                                    width: "70px",
                                                    height: "1px",
                                                    backgroundImage:
                                                        "linear-gradient(to left, white 18%, transparent)",
                                                }}
                                            />
                                            <div
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                        "1fr 1fr 1fr ",
                                                    justifyItems: "center",
                                                    alignItems: "center",
                                                    gridColumnGap: "5px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        height: "2px",
                                                        width: "2px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                                <span
                                                    style={{
                                                        height: "5px",
                                                        width: "5px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                                <span
                                                    style={{
                                                        height: "8px",
                                                        width: "8px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                            </div>
                                        </Box>
                                    </>
                                )}

                                {i.type === "v" && showVid && (
                                    <>
                                        <span
                                            key={`vseconde${index}`}
                                            style={{
                                                color: "white",
                                                textTransform: "capitalize",
                                            }}
                                        >
                                            {i.alt}
                                        </span>
                                        <video
                                            onClick={() =>
                                                dispatch(setItemNumber(index))
                                            }
                                            muted
                                            id={`${i._id}`}
                                            key={i._id}
                                            style={{
                                                pointerEvents: "all",
                                                height: "150px",
                                                width: "fit-content",
                                                aspectRatio: "16/9",
                                            }}
                                            className={
                                                "itemVideo " +
                                                (itemNumber === index
                                                    ? "active"
                                                    : "")
                                            }
                                        >
                                            <source
                                                src={`${BASE_URL}/carousel/gettingThumbnail/${i.picturePath}`}
                                            />
                                        </video>
                                        <Box
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns: "1fr 1fr",
                                                alignItems: "center",
                                                direction: "ltr",
                                                gridColumnGap: "20px",
                                                fontSize: "10px",
                                                color: "#ddd",
                                            }}
                                        >
                                            <Date
                                                key={`vthird${index}`}
                                                dateStr={i.createdAt}
                                            />
                                            <SmartDisplayOutlinedIcon
                                                sx={{ justifySelf: "end" }}
                                            />
                                        </Box>
                                        <Box
                                            key={`vfirst${index}`}
                                            sx={{
                                                display: "grid",
                                                gridTemplateColumns:
                                                    "1fr 1fr 1fr 1fr 1fr",
                                                gridGap: "10px",
                                                justifyItems: "center",
                                                alignItems: "center",
                                            }}
                                        >
                                            <div
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                        "1fr 1fr 1fr",
                                                    justifyItems: "center",
                                                    alignItems: "center",
                                                    gridColumnGap: "5px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        height: "8px",
                                                        width: "8px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                                <span
                                                    style={{
                                                        height: "5px",
                                                        width: "5px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                                <span
                                                    style={{
                                                        height: "2px",
                                                        width: "2px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                            </div>
                                            <span
                                                style={{
                                                    width: "70px",
                                                    height: "1px",
                                                    backgroundImage:
                                                        "linear-gradient(to right, white 18%, transparent)",
                                                }}
                                            />
                                            <img
                                                src={pictoVert}
                                                style={{
                                                    objectFit: "contain",
                                                    height: "20px",
                                                    width: "20px",
                                                    borderRadius: "50%",
                                                    boxShadow:
                                                        "0 4px 20px 0 #f5f5f5",
                                                    border: "1.5px solid white",
                                                }}
                                            />
                                            <span
                                                style={{
                                                    width: "70px",
                                                    height: "1px",
                                                    backgroundImage:
                                                        "linear-gradient(to left, white 18%, transparent)",
                                                }}
                                            />
                                            <div
                                                style={{
                                                    display: "grid",
                                                    gridTemplateColumns:
                                                        "1fr 1fr 1fr",
                                                    justifyItems: "center",
                                                    alignItems: "center",
                                                    gridColumnGap: "5px",
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        height: "2px",
                                                        width: "2px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                                <span
                                                    style={{
                                                        height: "5px",
                                                        width: "5px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                                <span
                                                    style={{
                                                        height: "8px",
                                                        width: "8px",
                                                        backgroundColor:
                                                            "white",
                                                        borderRadius: "50%",
                                                    }}
                                                ></span>
                                            </div>
                                        </Box>
                                    </>
                                )}
                            </>
                        ))}
                        <InfiniteScroll
                            dataLength={items.length} //This is important field to render the next data
                            next={() => {
                                fetchData();
                            }}
                            hasMore={
                                totalNumber === items.length ? false : true
                            }
                            loader={
                                <p
                                    style={{
                                        textAlign: "center",
                                        color: "gray",
                                        direction: "ltr",
                                    }}
                                >
                                    <b> Loading...</b>
                                </p>
                            }
                            endMessage={
                                <p
                                    style={{
                                        textAlign: "center",
                                        color: "gray",
                                    }}
                                >
                                    <b> The End.</b>
                                </p>
                            }
                            scrollableTarget="scrollableDiv"

                            // below props only if you need pull down functionality
                        ></InfiniteScroll>
                    </Container>
                </ShadowContainer>
            )}
        </>
    );
}

export default SidePagination;
const ShadowContainer = styled(Box)`
    /* background-image: linear-gradient(to right, black 18%, transparent); */
    /* background-image: linear-gradient(to right, transparent 30%, black 50%, transparent 100%) , linear-gradient(to left, transparent 30%, black 50%, transparent 100%); */
    background-image: linear-gradient(
            to right,
            transparent 0%,
            #000000bc 60%,
            transparent 100%
        ),
        linear-gradient(
            to left,
            transparent 0%,
            #000000bc 60%,
            transparent 100%
        );
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0%;
    z-index: 10000;
    backdrop-filter: blur(5px);

    @media screen and (width < 500px) {
        background-image: linear-gradient(
                to right,
                transparent 0%,
                #000000bc 0,
                transparent 100%
            ),
            linear-gradient(
                to left,
                transparent 0%,
                #000000bc 0,
                transparent 100%
            );
    }
`;

const Container = styled(Box)`
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    display: grid;
    grid-template-columns: 1fr;
    grid-row-gap: 30px;
    justify-items: center;
    align-items: center;
    overflow-y: scroll;
    height: 100vh;
    padding: 50px;
    direction: rtl;
    width: fit-content;
    @media screen and (width < 500px) {
        scale: 0.8;
        transform: translateX(-62%);
    }

    ::-webkit-scrollbar {
        height: 5px;
        width: 1px;
    }
    ::-webkit-scrollbar-thumb:vertical {
        background-image: linear-gradient(to bottom, transparent, #fefefe84);
        border-radius: 10px;
        cursor: pointer;
    }

    scrollbar-width: none;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
    scroll-behavior: smooth;

    .itemImage,
    .itemVideo {
        border-radius: 15px;
        border-top-left-radius: 0px;
        border: 1.5px solid white;
        box-shadow: 0 4px 20px 0 #f5f5f5;
        transition: 0.3s ease-in-out all;
        object-fit: contain;

        &:hover {
            box-shadow: 0 0px 12px 0 #f5f5f5;
            scale: 1.05;
            cursor: pointer;
            border-radius: 0;
        }
    }
    .active {
        border: 1.5px solid rgb(0, 181, 184);
        box-shadow: 0 0 20px 0 rgb(0, 181, 184);
        border-radius: 0;

        &:hover {
            box-shadow: 0 0px 12px 0rgb (0, 181, 184);
            scale: 1.05;
            cursor: pointer;
        }
    }
`;
