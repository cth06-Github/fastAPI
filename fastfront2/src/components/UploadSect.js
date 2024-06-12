// import React from 'react';
import "./UploadSect.css";
import {useState} from "react";

const UploadSect = () => {

    const [theFile, chooseFile] = useState(null); // good to use null?
    const [isFileUploaded, updateUploadStatus] = useState(false);

    const handleFileChange = (event) => {
        // Update the state with the selected file
        chooseFile(event.target.files[0]); // TO CHECK WHAT IS EVENT.TARGET.FILES[0]...APA ARRAY?
        console.log(theFile);
    };

    const uploadFunction = async () => {
        console.log("exec, the file uploaded is: ");
        console.log(theFile);
        updateUploadStatus(true); // update inputValue variable with event.target.value
        // NEVER event.preventDefault(); 

        try { //THIS IS GETTING VERY WEIRD...
            const formData = new FormData(); // CHECK WHAT IS FormData()?  
            //console.log("form constructore")
            //console.log(formData);
            formData.append("file", theFile); // WHAT IS THE ENCODING LIKE FOR MULTIPART FILES?
            //console.log("form data is")
            //console.log(formData);
            //console.log(formData.get("file"))
            // TO TROUBLESHOOT NEXTTIME
            await fetch("http://localhost:5000/uploadfile", { //"http://localhost:5000/uploadfile"
                method: "POST",
                //headers: { // tell the server we're sending JSON
                  //  "Content-Type": "multipart/form-data" //multipart/form-data
                //},
                body: formData
              }).then(response => response.json()) // consider catching errors...
            //inter1.then((data) => { // MUST HAVE THIS .THEN(DATA) LINE OF CODE, OTHERWISE FETCH ERROR. WHY?
              //    console.log("File uploaded successfully:", data);
              //})
            console.log("maybe maybe")
            //console.log(inter1)
            //console.log(inter2)
        } catch (error) {
            console.log("Error error")
        }
        
        // Clear the input field after submission
        setTimeout(() => {
            chooseFile(null); // hmmm
            updateUploadStatus(false);
            }, 7000); // 7 seconds

    };

    return (
        <div className="Upload-Box">
            <header className="Upload-header">Upload File</header>
            
            <input type="file" accept = ".txt" onChange={handleFileChange} />

            <button onClick={uploadFunction}>
            Upload File
            </button>
            {isFileUploaded && <p>Uploaded!</p>}
        </div>
        // how to read the code above? Is it && operator?
    );
};

export default UploadSect;

