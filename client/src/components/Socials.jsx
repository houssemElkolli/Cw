import { Box } from "@mui/material";
import { styled } from "@mui/system";
import fb from "../assets/socials/fb.png";
import insta from "../assets/socials/insta.png";
import tw from "../assets/socials/tw.png";

const Socials = () => {
    return (
        <Container>
            <div>
                <ul>
                    <li>
                        <a
                            href={
                                "https://www.facebook.com/creative.world.setif"
                            }
                            target="_blank"
                        >
                            <img
                                src={fb}
                                alt="Facebook"
                                width={"25px"}
                                height={"25px"}
                            />
                        </a>
                    </li>
                    <li>
                        <a
                            href={"https://www.instagram.com/cw.creative.world"}
                            target="_blank"
                        >
                            <img
                                src={insta}
                                alt="Instagram"
                                width={"25px"}
                                height={"25px"}
                            />
                        </a>
                    </li>
                    <li>
                        <a
                            href={"https://www.instagram.com/cw.creative.world"}
                            target="_blank"
                        >
                            <img
                                src={tw}
                                alt={"Twitter"}
                                width={"25px"}
                                height={"25px"}
                            />
                        </a>
                    </li>
                </ul>
            </div>
        </Container>
    );
};

export default Socials;

const Container = styled(Box)`
    position: absolute;
    transform: translateY(-180px) translateX(15px);
    z-index: 9;
    scale: 0.8;

    ul {
        list-style: none;
        opacity: 1;
        li {
            background-color: rgb(0, 181, 184, 0.6);
            /* box-shadow: -2px -2px 10px rgba(74, 141, 130, 0.63) ; */
            border-radius: 50%;
            padding: 7px 7px;
            margin: 2px;
            &:hover {
                background-color: rgb(0, 181, 184);
            }
        }
    }
`;
