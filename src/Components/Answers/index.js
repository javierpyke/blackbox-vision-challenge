import { Box } from '@chakra-ui/react'

export default function Answer(props){
    return(
        <Box
        alignItems='center'
        display='flex'
        flexDirection='column'
        flexWrap='wrap'>
            {props.children}
        </Box>
    )
}