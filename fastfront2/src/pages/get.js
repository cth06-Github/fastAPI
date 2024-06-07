// import... 
import './pages.css';
import React, { useState } from 'react'; // need to check the significance of useState
import Button from '../components/Button.js'
import { useNavigate } from "react-router-dom";

// define the page as a function
function Get() { // !! OR const Get = () => {
    // define whatever helper functions
    const navigate = useNavigate(); 
    const [tokenValue, setTokenValue] = useState("");
    const [isTokenSubmitted, findTokenSubmission] = useState(false);
    const [deviceInfoValue, fetchDeviceInfo] = useState(""); // is the initialisation of correct type

    const [modelUrlValue, setModelUrlValue] = useState("");
    const [isModelUrlSubmitted, updateModelUrlSubmission] = useState(false);
    const [configIdValue, fetchConfigId] = useState(["",""]);
    const [isModelUrlMatch, updateMatch] = useState(false);

    const handleTokenChange = (event) => {
        setTokenValue(event.target.value); // update inputValue variable with event.target.value
    }; 

    const handleModelUrlChange = (event) => {
        setModelUrlValue(event.target.value); // update inputValue variable with event.target.value
    }; 
    
    const handleTokenSubmit = async (event) => { // put async at THIS PLACE, not before const
        findTokenSubmission(true); // update inputValue variable with event.target.value
        event.preventDefault(); // "if the event does not get explicitly handled, its default action should not be taken as it normally would be" ???
        // Do something with the input value, for example, send it to backend API

        try {
            // send request to backend and wait for the response
            console.log("execution");
            const fetchedValue = await fetch(`http://localhost:5000/device/info/${tokenValue}`) // MUST ENABLE CORS
                .then(response => response.json()) // consider catching errors...DON'T JUST STOP HERE it will only give [object Promise]
                .then(data => { // response.json()
                    console.log(data); // This will log the data from the JSON response
                    return JSON.stringify(data); // Or return data.token; Not data.toString()...it returns [object Object] (oh, that's why)
                });
            // ^I think the asnyc above is somewhat correct.

            console.log("maybe maybe");
            console.log(fetchedValue);
            // Clear the input field after submission
            setTokenValue('');
            setTimeout(() => {
                findTokenSubmission(false);
            }, 2000); // 2 seconds     

            fetchDeviceInfo(fetchedValue);
            console.log("global");
            console.log(deviceInfoValue);

        } catch (error) {
            console.log("Error error");
        }
    };

    const handleModelUrlSubmit = async (event) => { // put async at THIS PLACE, not before const
        updateModelUrlSubmission(true); // update inputValue variable with event.target.value
        event.preventDefault(); // "if the event does not get explicitly handled, its default action should not be taken as it normally would be" ???
        // Do something with the input value, for example, send it to backend API

        try {
            updateMatch(false); // restore value of boolean match of URL
            // send request to backend and wait for the response
            console.log("execution config");
            const fetchedValue = await fetch(`http://localhost:5000/configuration`) // MUST ENABLE CORS
                .then(response => response.json()) // consider catching errors...DON'T JUST STOP HERE it will only give [object Promise]
                .then(data => { // response.json()
                    console.log(data); // This will log the data from the JSON response
                    return [data.modelUrl, data.id]; // will JSON stringify be better?
                });
            // ^I think the asnyc above is somewhat correct.

            console.log("maybe maybe");
            console.log(fetchedValue);
            // Clear the input field after submission  

            fetchConfigId(fetchedValue);
            console.log("global");
            console.log(configIdValue);

            if (modelUrlValue === fetchedValue[0]) {
                updateMatch(true);
            }

            setModelUrlValue('');
            setTimeout(() => {
                updateModelUrlSubmission(false);
            }, 2000); // 2 seconds   

        } catch (error) {
            console.log("Error error");
        }
    };

    // return -- which stylise the page
    return(
        <div className="Page">
            <header className="Page-header">Get Data Page</header>
            <div className="mainBox">
                <div className="subBox">
                    <p> Find DeviceInfo </p>
                    <input 
                        type="text" 
                        placeholder="Enter Token"
                        value = {tokenValue}
                        onChange = {handleTokenChange}
                    /> 

                    <button className="miniButton" onClick={handleTokenSubmit}>
                        Submit
                    </button>
                    <p>{`${deviceInfoValue}`} </p>
                    {isTokenSubmitted && <p>Submitted!</p>}

                </div>

                <div className="subBox">
                    <p> Configuration Present? </p>
                    <input 
                        type="text" 
                        placeholder="Find modelUrl..."
                        value={modelUrlValue}
                        onChange={handleModelUrlChange}
                    /> 

                    <button className="miniButton" onClick={handleModelUrlSubmit}>
                        Submit
                    </button>
                    {isModelUrlMatch ? <p style={{margin: 2}}>{`Config ID: ${configIdValue[1]}`}</p> : <p style={{margin: 2}}>No match</p>}
                    {isModelUrlSubmitted ? <p style={{margin: 2}}>Submitted</p> : <p style={{margin: 2}}>Enter Config Id!</p>}
                </div>
            </div>
            <div className="Footer">
                
             <Button onClick={() => navigate("/")}>Send Page</Button> 
                
            </div>
        </div>
    )

}

export default Get; // export the page which can be imported elsewhere */