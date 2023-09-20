import { useEffect, useState } from "react";
import logo from "../assets/logos/picto-noir.png";

import { Box } from "@mui/material";
import { styled } from "@mui/system";
import { Link, NavLink } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { setLogout } from "../state/authSlice";

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();
    const [lod, setLod] = useState(false);
    useEffect(() => {
        setLod(true);
    }, []);
    return (
        <>
            {lod && (
                <Container className="carousel">
                    <Box
                        sx={{
                            fontFamily: "Poppins, sans-serif",
                            scale: "0.7",
                            position: "absolute",
                            height: "90px",
                            width: "100px",
                            top: "-1%",
                            left: "-1%",
                            zIndex: "99",
                            display: "grid",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <div className="nav-container">
                            <ul id="menu">
                                <a
                                    className="menu-button icon-plus"
                                    id="open-menu"
                                    href="#menu"
                                    title="Show navigation"
                                >
                                    <MenuRoundedIcon
                                        sx={{ fontSize: "28px" }}
                                    />
                                    {/* MENU */}
                                </a>
                                <a
                                    className="menu-button icon-minus"
                                    href="#0"
                                    title="Hide navigation"
                                >
                                    <img className="menu-logo" src={logo} />
                                </a>
                                <li className="menu-item">
                                    <NavLink to="/l">Login</NavLink>
                                </li>
                                {/* <li className="menu-item">
                                    <NavLink to="/work">Work</NavLink>
                                </li> */}

                                {user?.email ? (
                                    <li className="menu-item">
                                        <Link
                                            to="/"
                                            onClick={() => {
                                                axiosPrivate.post(
                                                    "/auth/logout"
                                                );
                                                dispatch(setLogout());
                                            }}
                                        >
                                            logout
                                        </Link>
                                    </li>
                                ) : (
                                    <li className="menu-item">
                                        <NavLink to="/l">login</NavLink>
                                    </li>
                                )}
                                <li className="menu-item">
                                    <NavLink to="/partners">Partners</NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to="/sponsors">Sponsors</NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to="/aboutUs">About</NavLink>
                                </li>
                                <li className="menu-item">
                                    <NavLink to="/">Home</NavLink>
                                </li>
                                {user?.role === ("superAdmin" || "admin") && (
                                    <li className="menu-item">
                                        <NavLink to="/dashboard/carousel">
                                            DB
                                        </NavLink>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </Box>
                </Container>
            )}
        </>
    );
};

export default Navbar;

const Container = styled(Box)`
    /* navbar */
    .nav-container {
        display: grid;
        justify-content: center;
        align-items: center;
    }
    #menu {
        width: 60px;
        height: 60px;
        position: relative;
        top: 0%;
        list-style: none;
        border-radius: 50%;
    }

    .menu-button {
        width: 60px;
        height: 60px;
        position: absolute;
        left: 0%;
        top: 0%;
        color: #fff;
        border-radius: 50%;
        background-size: 100%;
        overflow: hidden;
        text-decoration: none;
        background-color: rgb(50, 116, 105);
        /* box-shadow: 0 0 1px 3px rgb(74, 141, 130); */
    }

    .menu-button:active {
        /* scale: 0.8; */
    }

    .icon-plus {
        padding: 18px 0px;
        text-align: center;
    }

    .menu-logo {
        margin: 0;
        height: 60px;
        width: 60px;
        border-radius: 50%;
        background-color: #fff;
    }

    #menu:not(:target) > a:first-of-type,
    #menu:target > a:last-of-type {
        opacity: 1;
        z-index: 1;
    }

    #menu:not(:target) > .icon-plus:before,
    #menu:target > .icon-minus:before {
        opacity: 1;
    }

    .menu-item {
        width: 65px;
        height: 50px;
        position: absolute;
        left: -10%;
        line-height: 5px;
        top: 20%;
        border-radius: 50%;
        transform: translate(0px, 0px);
        transition: transform 500ms;
        z-index: -2;
        color: beige;
        display: grid;
        justify-content: center;
        align-items: center;
        font-size: 13px;
        opacity: 0.7;
        visibility: hidden;
    }

    #menu:target > .menu-item:hover {
        opacity: 1;
        background-color: black;
    }

    .menu-item a {
        width: 75px;
        height: 50px;
        position: absolute;
        top: -4%;
        left: -3%;
        text-decoration: none;
        color: #dddddd;
        border-radius: 50%;
        display: grid;
        justify-content: center;
        align-items: center;
    }
    #menu:target > .menu-item {
        animation: animate 2s;
        animation-delay: 0s;
        animation-iteration-count: 1;

        @keyframes animate {
            from {
                opacity: 0;
            }
            to {
                opacity: 0.7;
            }
        }
    }

    //Dashboard
    #menu:target > .menu-item:nth-of-type(7) {
        transform: translateY(420px);
        transition-delay: 0s;
        border: 2px solid beige;
        width: 75px;
        visibility: visible;
        background-color: rgb(50, 116, 105);
        box-shadow: 0 0 3px 5px rgb(74, 141, 130);
    }
    //Home
    #menu:target > .menu-item:nth-of-type(6) {
        transform: translateY(350px);
        transition-delay: 0s;
        border: 2px solid beige;
        width: 75px;
        visibility: visible;
        background-color: rgb(50, 116, 105);
        box-shadow: 0 0 3px 5px rgb(74, 141, 130);
    }
    //about
    #menu:target > .menu-item:nth-of-type(5) {
        transform: translateY(280px);
        transition-delay: 0.1s;
        border: 2px solid beige;
        width: 75px;
        visibility: visible;
        background-color: rgb(50, 116, 105);
        box-shadow: 0 0 3px 5px rgb(74, 141, 130);
    }
    /* team */
    #menu:target > .menu-item:nth-of-type(4) {
        transform: translateY(210px);
        transition-delay: 0.2s;
        border: 2px solid beige;
        width: 75px;
        visibility: visible;
        background-color: rgb(50, 116, 105);
        box-shadow: 0 0 3px 5px rgb(74, 141, 130);
    }
    /* parteners */
    #menu:target > .menu-item:nth-of-type(3) {
        transform: translateY(140px);
        transition-delay: 0.3s;
        border: 2px solid beige;
        width: 75px;
        visibility: visible;
        background-color: rgb(50, 116, 105);
        box-shadow: 0 0 3px 5px rgb(74, 141, 130);
    }

    /* work */
    #menu:target > .menu-item:nth-of-type(2) {
        transform: translateY(70px);
        transition-delay: 0.4s;
        border: 2px solid beige;
        width: 75px;
        visibility: visible;
        background-color: rgb(50, 116, 105);
        box-shadow: 0 0 3px 5px rgb(74, 141, 130);
    }
    /* login */
    #menu:target > .login {
        transform: translateY(0);
        transition-delay: 0.3s;
        border: 2px solid beige;
        width: 75px;
        visibility: hidden;
        background-color: rgb(50, 116, 105);
        box-shadow: 0 0 3px 5px rgb(74, 141, 130);
    }

    #menu:target > .menu-item:has(.active) {
        opacity: 0.7;
        a {
            color: #fff;
            box-shadow: 0 0 3px 5px rgb(2, 253, 253);
        }
    }

    /* team */

    /* #menu:target>.menu-item:nth-child(6) {
  transform: rotate(58deg) translateX(150px) rotate(300deg);
  transition-delay: 0.1s;
  border: 2px solid beige;
  width: 75px;
  visibility: visible;
  background-color: rgb(50, 116, 105);
  box-shadow: 0 0 3px 5px rgb(74, 141, 130);



} */
    /* parteners */
    /* #menu:target>.menu-item:nth-child(5) {
  transform: rotate(24deg) translateX(155px) rotate(-25deg);
  transition-delay: 0.2s;
  border: 2px solid beige;
  width: 75px;
  visibility: visible;
  background-color: rgb(50, 116, 105);
  box-shadow: 0 0 3px 5px rgb(74, 141, 130);


}  */

    /* work */
    /* #menu:target>.menu-item:nth-child(4) {
  transform: rotate(-6deg) translateX(165px) rotate(6deg);
  transition-delay: 0.3s;
  border: 2px solid beige;
  width: 75px;
  visibility: visible;
  background-color: rgb(50, 116, 105);
  box-shadow: 0 0 3px 5px rgb(74, 141, 130);
} */
    /* home */
    /* #menu:target>.menu-item:nth-child(3) {
  transform: rotate(-60deg) translateX(50px) rotate(-300deg);
  transition-delay: 0.3s;
  border: 2px solid beige;
  width: 75px;
  visibility: hidden;
  background-color: rgb(50, 116, 105);
  box-shadow: 0 0 3px 5px rgb(74, 141, 130);
} */
`;

{
    /* <div className='nav-container'>
        <ul id="menu">
          <a className="menu-button icon-plus" id="open-menu" href="#menu" title="Show navigation">
            MENU
          </a>
          <a className="menu-button icon-minus" href="#0" title="Hide navigation">
            <img className='menu-logo' src={logo} />
          </a>
          <li className="menu-item">
            <NavLinkIon>
              Home
            </NavLinkIon>
          </li>
          <li className="menu-item">
            <NavLinkIon>
              About
            </NavLinkIon>
          </li>
          <li className="menu-item">
            <NavLinkIon>
              Partners
            </NavLinkIon>
          </li>
          <li className="menu-item">
            <NavLinkIon>
              Team
            </NavLinkIon>
          </li>
          <li className="menu-item">
            <NavLinkIon>
              Contact
            </NavLinkIon>
          </li>
          <li className="menu-item">
            <NavLinkIon>
              Work
            </NavLinkIon>
          </li>
        </ul>
      </div>
export const Container = styled(Box)({
  fontFamily: "Poppins, sans-serif",
  position: "absolute",
  height: "60px",
  width: "60px",
  top: "45vh",
  borderRadius: '50%',
  left: "1%",
  zIndex: '999',
  scale : "0.7",
  "@media screen and (max-width: 600px)" : {
    "&" : {
      top: "30vh",
      scale : "0.5",
      left: "-2%",
    }
  }

});
 */
}
