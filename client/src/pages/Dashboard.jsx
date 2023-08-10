import { Box } from '@mui/material'
import { styled } from '@mui/system'
import { Link, Outlet } from 'react-router-dom'

import CategoryIcon from '@mui/icons-material/Category';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import WidgetsIcon from '@mui/icons-material/Widgets';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useEffect, useRef, useState } from 'react';


const Dashboard = () => {
    const [open, setOpen] = useState(false)
    const carousel = useRef()

    useEffect(()=>{
      carousel.current.click()
    },[])
    const toggle = () => {
        setOpen(!open)
      }
    return (
        <Container open={open}>
            <div className='container'>
                <div id="mySidenav" className="sidenav">
                    {open ? <MenuOpenIcon onClick={toggle} className='closebtn' /> : <MenuOpenIcon onClick={toggle} className='closebtn' />}
                    <Link ref={carousel} to="carousel"><DashboardIcon className='icon' /><span className='item'>Carousel</span></Link>
                    <Link to="users"><SupervisedUserCircleIcon className='icon' /><span className='item'>Users</span></Link>
                    <Link to="sponsors"><WidgetsIcon className='icon' /><span className='item'>Sponsers</span></Link>
                    <Link to="partners"><CategoryIcon className='icon' /><span className='item'>Partners</span> </Link>
                    <Link to="contacts"><ContactMailIcon className='icon' /><span className='item'>Contacts</span> </Link>
                </div>
                <div id="main">
                    <Outlet />
                </div>
            </div>
        </Container>
    )
}

export default Dashboard

const Container = styled(Box)`


.container {
    height: 100%;

    .sidenav {
        display : grid;
        grid-template-columns: 1fr;
        align-content: center;
        grid-row-gap : 20px;
        height : 100%;
        position: fixed;
        left: 0;
        background-color: black;
        overflow-x: hidden;
        transition: 0.5s;
        padding-top: 60px;
        box-shadow: 10px 16px 20px 0px rgba(0,0,0,0.2);

        a {
            position: relative;
            text-decoration: none;
            font-size: 25px;
            color: #818181;
            transition: 0.3s;
            &:hover {
            color: #f1f1f1;
            }
            .item{
              visibility:${({ open }) => (open === true ? 'initial' : 'hidden')} ;
              margin-left: 40px;
            }
            .icon {
              position: absolute;
              top : 4px;
              left: 14px;
              font-size: 20px;
              color : white;
            }
            .active {
              font-size: 60px;
            }
        }
        
        .closebtn {
            position: absolute;
            top: 200px;
            right: 7px;
            font-size: 36px;
            margin-left: 50px;
            color : white;
            opacity : 0.5;
            align-self: center;
            transform: ${({ open }) => (open === true ? 'rotate(360deg)' : 'rotateZ(180deg)')};
                  &:hover {
                      opacity : 1;
                  }
        }
    }

#main {
  transition:.5s;
  padding: 16px;
  margin-left: ${({ open }) => (open === true ? '150px' : '50px')};
}
#mySidenav{
  width : ${({ open }) => (open === true ? '150px' : '50px')};


}

@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}

}
`