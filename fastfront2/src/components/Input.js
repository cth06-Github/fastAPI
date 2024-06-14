import { useState }  from 'react';

const Input = ({label, type, value, id, reset}) => {
    const [inputValue, setInputValue] = useState(""); // inputValue state variable is initialised to ''
    const handleInputChange = (event) => {
        setInputValue(event.target.value); // update inputValue variable with event.target.value
    }; 

    console.log(label, type, inputValue, id, value);

    if (reset === false) {
        setInputValue(null);
    }
    
    return (
        <>
            <label for = {id} style = {{textAlign: "left", fontWeight: "bold"}}>{label}</label>
            <input
                type={type} 
                placeholder = "Type here..."
                value = {inputValue}
                id = {id}
                name = {id}
                onChange = {handleInputChange}
            /> 
        </>
    );
};

export default Input;