// import... 
import './pages.css';
import Button from '../components/Button.js'
import { useNavigate } from "react-router-dom";

// define the page as a function
function Get() { // !! OR const Get = () => {
    // define whatever helper functions
    const navigate = useNavigate(); 

    // return -- which stylise the page
    return(
        <div className="Page">
            <header className="Page-header">Get Data Page</header>
            <div className="mainBox">
                <div className="subBox">
                    <p> DeviceInfo </p>
                    <input type="text" placeholder="Find Token"> 
                    </input>

                    <button className="miniButton">
                        Submit
                    </button>
                </div>

                <div className="subBox">
                    <p> Configuration </p>
                    <input type="text" placeholder="Find modelUrl..."> 
                    </input>

                    <button className="miniButton">
                        Submit
                    </button>
                </div>
            </div>
            <div className="Footer">
                
             <Button onClick={() => navigate("/")}>Send Page</Button> 
                
            </div>
        </div>
    )

}

export default Get; // export the page which can be imported elsewhere */