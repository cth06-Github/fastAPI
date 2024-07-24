//import React from "react"; // what if we don't import React?
import './pages.css';
import React, { useState } from 'react'; // need to check the significance of useState
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import UploadSect from '../components/UploadSect.js';
import { useNavigate } from "react-router-dom"; // named imports


// define the page as a function
function Post() { // !! OR const Post = () => { // MUST START WITH CAPITAL LETTER, OTHERWISE CANNOT WORK
    // define whatever helper functions
    const navigate = useNavigate();
    
    const [resetStatus, setResetStatus] = useState(true); 
    const [isDISubmitted, setDISubmission] = useState(false);
    const [isConfigSubmitted, setConfigSubmission] = useState(false);

    // Function to handle form submission.
    // Consider if it's possible generalise the code & DRY.

    const ResetTrue = () => {
        setResetStatus(true); // Correct, update state in an event handler
    };

    const ResetFalse = () => {
        setResetStatus(false); // Correct, update state in an event handler
    };

    const handleDISubmit = (event) => {

        const DITokenValue = document.getElementById('DIToken').value; // to get the value
        const DIUsername = document.getElementById('DIUsername').value;

        ResetFalse(); 

        console.log("WAIT");
        console.log(DITokenValue);
        console.log(DIUsername);
        setDISubmission(true); // update inputValue variable with event.target.value
        event.preventDefault(); // "if the event does not get explicitly handled, its default action should not be taken as it normally would be" ???
        // Do something with the input value, for example, send it to backend API

        try {
            // send request to backend and wait for the response
            const fetchOptions = { // removed await (apparently fetch is async)
                method: "POST",
                headers: { // tell the server we're sending JSON
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ // in a website, data: was used instead of body, if data, data will be serialized and sent as json
                    token: DITokenValue,
                    username: DIUsername,
                })
            };
            fetch("http://localhost:5000/device/info", fetchOptions) // MUST ENABLE CORS
                .then(response => response.json()); // consider catching errors...
            
            console.log("Pass");
        } catch (error) {
            console.log("Error error");
        }
        
        // Clear the input field after submission
        // Not sure if it's possible 
        
        console.log("WAIT 221");
        document.getElementById('DIToken').value = ""
        document.getElementById('DIUsername').value = ""
        console.log(document.getElementById('DIToken'));
        console.log(document.getElementById('DIUsername'));
        
        setTimeout(() => {
            setDISubmission(false);
            ResetTrue(); 
          }, 2000); // 2 seconds
    };

    const handleConfigSubmit = (event) => {
        const configModelUrlValue = document.getElementById('configModelUrl').value; // to get the value
        const configFreqValue = document.getElementById('configFreq').value;
        const configFederatedValue = document.getElementById('configFederated').value;
        
        setConfigSubmission(true); // update inputValue variable with event.target.value
        event.preventDefault(); // "if the event does not get explicitly handled, its default action should not be taken as it normally would be" ???
        // Do something with the input value, for example, send it to backend API
        try {
            // send request to backend and wait for the response
            const fetchOptions = { // removed await (apparently fetch is async)
                method: "POST",
                headers: { // tell the server we're sending JSON
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ // in a website, data: was used instead of body, if data, data will be serialized and sent as json
                    modelUrl: configModelUrlValue,
                    frequency: configFreqValue,
                    federated: configFederatedValue,
                })
            };
            fetch("http://localhost:5000/configuration", fetchOptions) // MUST ENABLE CORS
                .then(response => response.json()) // consider catching errors...
                .catch((error) => {
                    console.error("Error uploading file:", error);
                  });
            
            console.log("maybe maybe")
        } catch (error) {
            console.log("Error error")
        }
        
        // Clear the input field after submission
        //setModelUrlValue('');
        //setFreqValue(0);
        //setFederatedValue(true);
        setTimeout(() => {
            setConfigSubmission(false);
            ResetTrue(); 
            }, 2000); // 2 seconds
    };
    
    // return -- which stylise the page
    return( // no bracket, code after this line will be IGNORED.
        <div className="Page">
            <header className="Page-header">Send Request Page</header>
            <div className="mainBox">
                <div className="subBox">
                    <p> DeviceInfo </p>
                    <Input
                        label="Token (string)" 
                        type="text" 
                        id = "DIToken"
                        reset = {resetStatus}
                    /> 
                    <Input 
                        label="Username (string)"
                        type="text"
                        id = "DIUsername"
                        reset = {resetStatus}
                    /> 

                    <button className="miniButton" onClick={handleDISubmit}>
                        Submit
                    </button>
                    {isDISubmitted && <p>Submitted!</p>}
                </div>

                <div className="subBox">
                    <p> Configuration </p>
                    <Input 
                        label="ModelUrl (string)"
                        type="text"
                        id = "configModelUrl"
                        reset = {resetStatus}            
                    /> 
                    <Input 
                        label="Frequency (int)"
                        type="number" 
                        id = "configFreq"
                        reset = {resetStatus}
                    /> 
                    <Input 
                        label="Federated (bool)"
                        type="text" 
                        id = "configFederated"
                        reset = {resetStatus}
                    /> 
                    <button className="miniButton" onClick={handleConfigSubmit}>
                        Submit
                    </button>
                    {isConfigSubmitted && <p>Submitted!</p>}
                </div>
            </div>
            
            <UploadSect/>

            <div className="Footer">
                <Button onClick={() => navigate("/finddata")}>Get Page</Button>
            </div>

        </div>
        //</Router>
    )
}
export default Post;


/*Placeholder for Presentation*/
/*
//import React from "react"; // what if we don't import React?
import './pages.css';
import React, { useState } from 'react'; // need to check the significance of useState
import Button from '../components/Button.js'
import Input from '../components/Input.js'
import UploadSect from '../components/UploadSect.js';
import { useNavigate } from "react-router-dom"; // named imports


// define the page as a function
function Post() { // !! OR const Post = () => { // MUST START WITH CAPITAL LETTER, OTHERWISE CANNOT WORK
    // define whatever helper functions
    const navigate = useNavigate();
    
    const [resetStatus, setResetStatus] = useState(true); 
    const [isDISubmitted, setDISubmission] = useState(false);
    const [isConfigSubmitted, setConfigSubmission] = useState(false);

    // Function to handle form submission.
    // Consider if it's possible generalise the code & DRY.

    const ResetTrue = () => {
        setResetStatus(true); // Correct, update state in an event handler
    };

    const ResetFalse = () => {
        setResetStatus(false); // Correct, update state in an event handler
    };

    const handleDISubmit = (event) => {

        const DITokenValue = document.getElementById('DIToken').value; // to get the value
        const DIUsername = document.getElementById('DIUsername').value;

        ResetFalse(); 

        console.log("WAIT");
        console.log(DITokenValue);
        console.log(DIUsername);
        setDISubmission(true); // update inputValue variable with event.target.value
        event.preventDefault(); // "if the event does not get explicitly handled, its default action should not be taken as it normally would be" ???
        // Do something with the input value, for example, send it to backend API

        try {
            // send request to backend and wait for the response
            const fetchOptions = { // removed await (apparently fetch is async)
                method: "POST",
                headers: { // tell the server we're sending JSON
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ // in a website, data: was used instead of body, if data, data will be serialized and sent as json
                    token: DITokenValue,
                    username: DIUsername,
                })
            };
            fetch("http://localhost:5000/device/info", fetchOptions) // MUST ENABLE CORS
                .then(response => response.json()); // consider catching errors...
            
            console.log("Pass");
        } catch (error) {
            console.log("Error error");
        }
        
        // Clear the input field after submission
        // Not sure if it's possible 
        
        console.log("WAIT 221");
        document.getElementById('DIToken').value = ""
        document.getElementById('DIUsername').value = ""
        console.log(document.getElementById('DIToken'));
        console.log(document.getElementById('DIUsername'));
        
        setTimeout(() => {
            setDISubmission(false);
            ResetTrue(); 
          }, 2000); // 2 seconds
    };

    const handleConfigSubmit = (event) => {
        const configModelUrlValue = document.getElementById('configModelUrl').value; // to get the value
        const configFreqValue = document.getElementById('configFreq').value;
        const configFederatedValue = document.getElementById('configFederated').value;
        
        setConfigSubmission(true); // update inputValue variable with event.target.value
        event.preventDefault(); // "if the event does not get explicitly handled, its default action should not be taken as it normally would be" ???
        // Do something with the input value, for example, send it to backend API
        try {
            // send request to backend and wait for the response
            const fetchOptions = { // removed await (apparently fetch is async)
                method: "POST",
                headers: { // tell the server we're sending JSON
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ // in a website, data: was used instead of body, if data, data will be serialized and sent as json
                    modelUrl: configModelUrlValue,
                    frequency: configFreqValue,
                    federated: configFederatedValue,
                })
            };
            fetch("http://localhost:5000/configuration", fetchOptions) // MUST ENABLE CORS
                .then(response => response.json()) // consider catching errors...
                .catch((error) => {
                    console.error("Error uploading file:", error);
                  });
            
            console.log("maybe maybe")
        } catch (error) {
            console.log("Error error")
        }
        
        // Clear the input field after submission
        //setModelUrlValue('');
        //setFreqValue(0);
        //setFederatedValue(true);
        setTimeout(() => {
            setConfigSubmission(false);
            ResetTrue(); 
            }, 2000); // 2 seconds
    };
    
    // return -- which stylise the page
    return( // no bracket, code after this line will be IGNORED.
        <div className="Page">
            <header className="Page-header">Send Request Page</header>
            <div className="mainBox">
                <div className="subBox">
                    <p> DeviceInfo </p>
                    <Input
                        label="Token (string)" 
                        type="text" 
                        id = "DIToken"
                        reset = {resetStatus}
                    /> 
                    <Input 
                        label="Username (string)"
                        type="text"
                        id = "DIUsername"
                        reset = {resetStatus}
                    /> 

                    <button className="miniButton" onClick={handleDISubmit}>
                        Submit
                    </button>
                    {isDISubmitted && <p>Submitted!</p>}
                </div>

                <div className="subBox">
                    <p> Configuration </p>
                    <Input 
                        label="ModelUrl (string)"
                        type="text"
                        id = "configModelUrl"
                        reset = {resetStatus}            
                    /> 
                    <Input 
                        label="Frequency (int)"
                        type="number" 
                        id = "configFreq"
                        reset = {resetStatus}
                    /> 
                    <Input 
                        label="Federated (bool)"
                        type="text" 
                        id = "configFederated"
                        reset = {resetStatus}
                    /> 
                    <button className="miniButton" onClick={handleConfigSubmit}>
                        Submit
                    </button>
                    {isConfigSubmitted && <p>Submitted!</p>}
                </div>
            </div>
            
            <UploadSect/>

            <div className="Footer">
                <Button onClick={() => navigate("/finddata")}>Get Page</Button>
            </div>

        </div>
        //</Router>
    )
}
export default Post;*/



/*To try Radio Buttons later*/
/*
<p style = {{textAlign: "left", fontWeight: "bold"}}>Federated (bool)</p> 
                    <Input 
                        label="true"
                        type="radio"
                        id = "configFederated"
                        value = "true" 
                    /> 
                    <Input 
                        label="false"
                        type="radio"
                        id = "configFederated"
                        value = "false" 
                    /> 
*/



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