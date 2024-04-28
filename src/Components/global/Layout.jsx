import Home from "../home/home"
import SideBar from "./sideBar"
import TopBar from "./topBar"
import { Outlet } from 'react-router-dom'

const Layout = ({ children }) => {
    return (
        <div>
            <TopBar />
            <div>
                <div>
                <SideBar />
                </div>
                <div style={{width:'calc(100% - 200px)' , marginLeft:'200px',marginTop:'0px',position:'relative'}}>
              <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default Layout 