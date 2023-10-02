import ReplayIcon from "@mui/icons-material/Replay";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MusicOffIcon from "@mui/icons-material/MusicOff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { toggleModel } from "../state/authSlice";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../api/axios";
import { Fragment } from "react";

const CarouselItem = ({
    carouselItems,
    setCarouselItems,
    nextItem,
    previousItem,
}) => {
    const dispatch = useDispatch();

    const handelClick = (id) => {
        const vid = document.getElementById(`${id}`);
        if (vid.paused) {
            vid.play();
            setCarouselItems({ ...carouselItems, video: true });
        } else {
            vid.pause();
            setCarouselItems({ ...carouselItems, video: false });
        }
    };
    const handelReset = (id) => {
        const vid = document.getElementById(`${id}`);
        if (vid.paused) {
            setCarouselItems({ ...carouselItems, video: true });
            vid.pause();
            vid.currentTime = 0;
            vid.play();
        }
        vid.pause();
        vid.currentTime = 0;
        vid.play();
    };
    const handelSound = (id) => {
        const vid = document.getElementById(`${id}`);
        if (vid.muted) {
            vid.muted = false;
            setCarouselItems({ ...carouselItems, sound: true });
        } else {
            vid.muted = true;
            setCarouselItems({ ...carouselItems, sound: false });
        }
    };
    const handelFullScreen = (id) => {
        const vid = document.getElementById(`${id}`);
        const elem = document.querySelector("swiper-slide")

        if (document.fullscreenElement == null) {
            // vid.requestFullscreen();
            launchIntoFullscreen(vid);

            // } else {
            //     document.exitFullscreen();
        }
    };
    const launchIntoFullscreen = (element) => {
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    };

    return (
        <div
            className="swiper-slide"
            onClick={() => dispatch(toggleModel({ model: false }))}
            key={carouselItems._id}
        >
            {carouselItems.type === "i" && (
                <>
                    <img
                        src={`${BASE_URL}/assets/${carouselItems.picturePath}`}
                        alt={carouselItems.alt}
                    />
                    <ArrowForwardIosIcon
                        className="nextbutton"
                        onClick={() => {
                            nextItem();
                        }}
                    />
                    <ArrowBackIosIcon
                        className="prevbutton"
                        onClick={() => {
                            previousItem();
                        }}
                    />
                </>
            )}
            {carouselItems.type === "v" && (
                <>
                    <video autoPlay muted loop id={`${carouselItems._id}`} controlsList=" nodownload noremoteplayback">
                        <source
                            src={`${BASE_URL}/carousel/streamingVideos/${carouselItems.picturePath}`}
                        />
                    </video>
                    {carouselItems.video ? (
                        <PauseIcon
                            className="playbutton"
                            onClick={() => {
                                handelClick(carouselItems._id);
                            }}
                        />
                    ) : (
                        <PlayArrowIcon
                            className="playbutton"
                            onClick={() => {
                                handelClick(carouselItems._id);
                            }}
                        />
                    )}
                    {carouselItems.sound ? (
                        <MusicNoteIcon
                            className="soundbutton"
                            onClick={() => {
                                handelSound(carouselItems._id);
                            }}
                        />
                    ) : (
                        <MusicOffIcon
                            className="soundbutton"
                            onClick={() => {
                                handelSound(carouselItems._id);
                            }}
                        />
                    )}
                    <FullscreenIcon
                        className="FullScreenbutton"
                        onClick={() => {
                            handelFullScreen(carouselItems._id);
                        }}
                    />
                    <ReplayIcon
                        className="resetbutton"
                        onClick={() => {
                            handelReset(carouselItems._id);
                        }}
                    />
                    <ArrowForwardIosIcon
                        className="nextbutton"
                        onClick={() => {
                            nextItem();
                        }}
                    />
                    <ArrowBackIosIcon
                        className="prevbutton"
                        onClick={() => {
                            previousItem();
                        }}
                    />
                </>
            )}
        </div>
    );
};

export default CarouselItem;
