import { Box } from '@chakra-ui/react'

export default function Finish(props){
    return(
        <Box
        margin= '0 auto'
        padding= '20px'
        width= '350px'
        backgroundColor= 'rgb(255, 255, 255)'
        borderRadius= '10px'
        boxShadow= '0px 3px 12px rgba(0, 0, 0, 0.25)'
        color= 'black'
        textAlign='center'> 
            {props.children}
            <span style={{color:'#4FD1C5', fontSize:'90px'}}>{props.score}</span><span style={{fontSize:'20px'}}> pts.</span>
        </Box>
    )
}