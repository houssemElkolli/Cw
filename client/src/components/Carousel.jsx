import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import ReplayIcon from '@mui/icons-material/Replay';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import MusicOffIcon from '@mui/icons-material/MusicOff';
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import tw from "../assets/images/test.jpg"


import { EffectCoverflow, Pagination } from "swiper";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { useDispatch } from "react-redux";
import { toggleModel } from "../state/authSlice"

const Carousel = ({ carouselItems, setCarouselItems }) => {
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch()

    useState(()=> {
        setLoaded(true)

    }, [])

    const pagination = {
        clickable: true,
        // renderBullet: function (index, className) {
        //   return '<span class="' + className + '">' + (index + 1) + "</span>";
        // },
    };

    const handelClick = (id) => {
        const vid = document.getElementById(`${id}`)
        if (vid.paused) {
            vid.play()
            const items = carouselItems.map(item => {
                if (item._id === id) {
                    item.video = true
                }
                return item;
            })
            console.log(items);
            setCarouselItems(items)

        } else {
            vid.pause()
            const items = carouselItems.map(item => {
                if (item._id === id) {
                    item.video = false
                }
                return item;
            })
            console.log(items);

            setCarouselItems(items)
        }
    }
    const handelReset = (id) => {
        const vid = document.getElementById(`${id}`)
        if (vid.paused) {
            const items = carouselItems.map(item => {
                if (item._id === id) {
                    item.video = true
                }
                return item;
            })
            setCarouselItems(items)
            vid.pause();
            vid.currentTime = 0;
            vid.play();
        }
        vid.pause();
        vid.currentTime = 0;
        vid.play();
    }
    const handelSound = (id) => {
        const vid = document.getElementById(`${id}`)
        if (vid.muted) {
            vid.muted = false;
            const items = carouselItems.map(item => {
                if (item._id === id && item.type === 'v') {
                    item.sound = true
                }
                else {
                    if (item.type === 'v') {
                        const vid2 = document.getElementById(`${item._id}`)
                        vid2.muted = true;
                        item.sound = false

                    }
                }
                return item;
            })
            console.log(items);
            setCarouselItems(items)
        } else {
            vid.muted = true;
            const items = carouselItems.map(item => {
                if (item._id === id) {
                    item.sound = false
                }
                return item;
            })
            setCarouselItems(items)
        }



    }


    return (
        <>
            <Container className="carousel">
                <div>
                    <img src={tw} alt="" className="imageee" />
                </div>

                {loaded && 
                <Swiper
                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                        rotate: 100,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={pagination}
                    modules={[EffectCoverflow, Pagination]}
                    className="mySwiper"
                >
                    {
                        (carouselItems || []).map((s) =>

                            <SwiperSlide onClick={() => dispatch(toggleModel({ model: false }))} key={s._id} >
                                {s.type === 'i' &&
                                
                                    <img src={`http://localhost:3001/assets/${s.picturePath}`} alt={s.alt} />
                                }
                                {s.type === 'v' &&
                                    <>
                                        <video autoPlay muted loop id={`${s._id}`}  >
                                            <source src={`http://localhost:3001/assets/${s.picturePath}`} />
                                        </video>
                                        {s.video
                                            ?
                                            <PauseIcon className="playbutton" onClick={() => { handelClick(s._id) }} />
                                            : <PlayArrowIcon className="playbutton" onClick={() => { handelClick(s._id) }} />
                                        }
                                        {s.sound
                                            ?
                                            <MusicNoteIcon className="soundbutton" onClick={() => { handelSound(s._id) }} />
                                            : <MusicOffIcon className="soundbutton" onClick={() => { handelSound(s._id) }} />
                                        }
                                        <ReplayIcon className="resetbutton" onClick={() => { handelReset(s._id) }} />
                                    </>
                                }
                            </SwiperSlide>

                        )
                    }
                </Swiper>
                }
            </Container>
        </>
    )
}

export default Carousel

const Container = styled(Box)`

@media screen and (orientation:portrait)
{
    .mySwiper
   {
      display: none;
   }
   .imageee {
        display : block;
        height :100vh ;
        width :100% ;
        background-size: cover ;
        overflow : hidden ;
        position: absolute;
   }
}
@media screen and (orientation:landscape)
{
   .imageee {
    display : none;
   }
}


.swiper-pagination-bullet {
  text-align: center;
  font-size: 12px;
  color: #000;
  opacity: 1;
  background:rgb(50, 116, 105);
  &:hover {
    width: 20px;
    height: 20px;
  }
}

.swiper-pagination-bullet-active {
  color: #fff;
  background: #007aff;
}

.playbutton {
    z-index: 9999;
    position: absolute;
    right: 1%;
    top : 3%;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    color: #fff;


}
.resetbutton{
    z-index: 9999;
    position: absolute;
    right: 1%;
    top : 8%;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    color: #fff;
   
}
.soundbutton{
    z-index: 9999;
    position: absolute;
    right: 1%;
    top : 13%;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    color: #fff;
}

`