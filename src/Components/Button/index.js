import {useState} from 'react';




export const Colors = {
    primary: "#00E0C5"
}

function Button(props){
    const [bgColour,setBgColour] = useState(props.background)

    const style = {
                    width: "200px",
                    height: "35px",
                    borderRadius: "3px",
                    fontSize: '16px',
                    fontWeight: "400",
                    border: "none",
                    color: props.color,
                    backgroundColor: bgColour,
                    marginBottom: '5px'
                }

    return(
        <button
            onClick={props.onClick}
            disabled={props.disabled}
            
            onMouseEnter={() => setBgColour("#00BFA5")}
            onMouseLeave={() => setBgColour(props.background)}
        >
                {props.text}
        </button>
    )
}

export default Button;
