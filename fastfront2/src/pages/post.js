//import React from "react"; // what if we don't import React?
import './pages.css';
import React, { useState } from 'react'; // need to check the significance of useState
import Button from '../components/Button.js'
import { useNavigate } from "react-router-dom"; // What's the DIFFERENCE when you got { } inside?


// define the page as a function
function Post() { // !! OR const Post = () => {
    // define whatever helper functions
    const navigate = useNavigate();

    // CAN WE COMBINE THEM TOGTHER INTO A LIST? IMAGINE IF I HAVE 100 INPUTS THEN I NEED TO COPY CODE 100 TIMES
    // ^includes the update function....HOF?
    const [tokenValue, setTokenValue] = useState(""); // inputValue state variable is initialised to ''
    const [usernameValue, setUsernameValue] = useState("");
    const [modelUrlValue, setModelUrlValue] = useState("");
    const [freqValue, setFreqValue] = useState(0);
    const [federatedValue, setFederatedValue] = useState(true); // TO MAKE IT A STRING?

    const [isDISubmitted, setDISubmission] = useState(false);
    const [isConfigSubmitted, setConfigSubmission] = useState(false);
    
    // Function to handle input change
    const handleTokenChange = (event) => {
        setTokenValue(event.target.value); // update inputValue variable with event.target.value
    }; 

    const handleUsernameChange = (event) => {
        setUsernameValue(event.target.value); // update inputValue variable with event.target.value
    }; 

    const handleModelUrlChange = (event) => {
        setModelUrlValue(event.target.value); // update inputValue variable with event.target.value
    }; 

    const handleFreqChange = (event) => {
        setFreqValue(event.target.value); // update inputValue variable with event.target.value
    }; 

    const handleFederatedChange = (event) => {
        setFederatedValue(event.target.value); // update inputValue variable with event.target.value
    }; 

    // Function to handle form submission
    const handleDISubmit = (event) => {
        setDISubmission(true); // update inputValue variable with event.target.value
        event.preventDefault(); // "if the event does not get explicitly handled, its default action should not be taken as it normally would be" ???
        // Do something with the input value, for example, send it to backend API

        // WRITE THE JSON HERE
        try {
            // send request to backend and wait for the response
            const fetchOptions = { // removed await (apparently fetch is async)
                method: "POST",
                headers: { // tell the server we're sending JSON
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ // in a website, data: was used instead of body, if data, data will be serialized and sent as json
                    token: tokenValue,
                    username: usernameValue,
                })
            };
            fetch("http://127.0.0.1/testing", fetchOptions)
                .then(response => response.json()) // consider catching errors...
            
            console.log("maybe maybe")
        } catch (error) {
            console.log("Error error")
        }

        console.log("Input value:", tokenValue);
        
        // Clear the input field after submission
        setTokenValue('');
        setUsernameValue('');
        setTimeout(() => {
            setDISubmission(false);
          }, 2000); // 2 seconds
    };

    const handleConfigSubmit = (event) => {
        setConfigSubmission(true); // update inputValue variable with event.target.value
        event.preventDefault(); // "if the event does not get explicitly handled, its default action should not be taken as it normally would be" ???
        // Do something with the input value, for example, send it to backend API
        console.log("Input value:", modelUrlValue);
        
        // Clear the input field after submission
        setModelUrlValue('');
        setFreqValue(0);
        setFederatedValue(true);
        setTimeout(() => {
            setConfigSubmission(false);
            }, 2000); // 2 seconds

    };
    
    // return -- which stylise the page
    return(
        <div className="Page">
            <header className="Page-header">Send Request Page</header>
            <div className="mainBox">
                <div className="subBox">
                    <p> DeviceInfo </p>
                    <input 
                        type="text" 
                        placeholder="Token (string)..."
                        value = {tokenValue}
                        onChange = {handleTokenChange}
                    /> 
                    <input 
                        type="text" 
                        placeholder="Username (string)..."
                        value = {usernameValue}
                        onChange = {handleUsernameChange}
                    /> 

                    <button className="miniButton" onClick={handleDISubmit}>
                        Submit
                    </button>
                    {isDISubmitted && <p>Submitted!</p>}
                </div>

                <div className="subBox">
                    <p> Configuration </p>
                    <input 
                        type="text" 
                        placeholder="modelUrl (string)..."
                        value = {modelUrlValue}
                        onChange = {handleModelUrlChange}
                        
                    /> 

                    <input 
                        type="number" 
                        placeholder="frequency (int)..."
                        value = {freqValue}
                        onChange = {handleFreqChange}
                    /> 

                    <input 
                        type="text" 
                        placeholder="federated (bool)..."
                        value = {federatedValue}
                        onChange = {handleFederatedChange}
                    /> 

                    <button className="miniButton" onClick={handleConfigSubmit}>
                        Submit
                    </button>
                    {isConfigSubmitted && <p>Submitted!</p>}
                </div>
            </div>
            
            <div className="Footer">
                <Button onClick={() => navigate("/finddata")}>Get Page</Button>
            </div>
            
        </div>
        //</Router>
    )
}
export default Post; // export the page which can be imported elsewhere 


/* THE FOLLOWING GVES ME ERROR the whatever Null error thingy
const Post = () => { // !! OR const Post = () => {
    // define whatever helper functions
    const navigate = useNavigate(); // THIS LINE OF CODE IS THE ONE CAUSING THE ERROR
   // const handleClick = () => {
     //     navigate('/finddata');
    //} 

    // return -- which stylise the page
    return(
        //<Router>
        <div className="Page">
            <header className="Page-header">Send Request Page</header>
            <div className="mainBox">
                <div className="subBox">
                    <p> DeviceInfo </p>
                    <input type="text" placeholder="Token (string)..."> 
                    </input>

                    <input type="text" placeholder="Username (string)..."> 
                    </input>

                    <button className="miniButton">
                        Submit
                    </button>
                </div>

                <div className="subBox">
                    <p> Configuration </p>
                    <input type="text" placeholder="modelUrl (string)..."> 
                    </input>

                    <input type="text" placeholder="frequency (int)..."> 
                    </input>

                    <input type="text" placeholder="federated (bool)..."> 
                    </input>

                    <button className="miniButton">
                        Submit
                    </button>
                </div>
            </div>
            
            <div className="Footer">
                <Button >Get Page</Button>
            </div>
            
        </div>
        //</Router>
    )
}
*/

// const navigate = useNavigate()... IS THE ONE CAUSING THE ERROR (when wihout Router tags)
//but won't be error if <Router>const navigate = useNavigate()</Router>