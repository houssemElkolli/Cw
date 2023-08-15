import { Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import Carousel from "../components/Carousel"
import Socials from "../components/Socials"
import Contact from "../components/Contact";
import { useDispatch } from "react-redux";
import { toggleModel } from "../state/authSlice"
import SendIcon from '@mui/icons-material/Send';
import { useEffect, useState } from "react";
import axios from "axios";



const Home = () => {
  const [carouselItems, setCarouselItems] = useState([])
  const [loaded, setLoaded] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("http://localhost:3001/carousel/getCarouselItems",)
    .then((res) => {
      console.log(res.data);
      setCarouselItems(res.data.carouselItems)
      setLoaded(true)
    })

}, [])

return (
  <>
    {loaded &&
      <Container>
        <Carousel carouselItems={carouselItems} setCarouselItems={setCarouselItems} />
        <Socials />
        <Contact />
        <Button type="button" variant="contained" endIcon={<SendIcon />} onClick={() => { dispatch(toggleModel({ model: true })) }} className="contact-button">
          Contact
        </Button>
      </Container>}
  </>
)
}

export default Home

const Container = styled(Box)`
position: relative;

  .contact-button{
    position: absolute;
    right: 2%;
    bottom :2%;
    z-index: 999;
    background-color: rgb(50, 116, 105);
    opacity: 0.7;
    &:hover {
      opacity: 1;
      background-color: rgb(50, 116, 105);

    }
  }
`


