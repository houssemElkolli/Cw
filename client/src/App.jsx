import './App.css'
import { Routes, Route, Link } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Users from './pages/Users'
import CarouselSettings from './pages/CarouselSettings'
import Partners from './pages/Partners'
import Sponsors from './pages/Sponsors'
import Contacts from './pages/Contacts'
import Dashboard from './pages/Dashboard'
import PartnersView from './pages/PartnersView'
import AboutUs from './pages/AboutUs'


function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/l' element={<Login />} />
        <Route path='/partners' element={<PartnersView />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/dashboard' element={<Dashboard />}>
          <Route path="carousel" element={<CarouselSettings />} />
          <Route path="users" element={<Users />} />
          <Route path="partners" element={<Partners />} />
          <Route path="sponsors" element={<Sponsors />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
        {/* <Route path="/about" element={<About />} />
            <Route path="/other" element={<Other />} />
            <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </div>
  )
}

export default App
