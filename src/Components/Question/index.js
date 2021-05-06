import { Badge, Stat, StatNumber,StatHelpText,Box } from '@chakra-ui/react'
import { StarIcon } from "@chakra-ui/icons"

export default function Question(props){
  return(
    <Box
      margin='0 auto'
      padding='20px'
      width='350px'
      backgroundColor='rgb(255, 255, 255)'
      borderRadius='10px'
      boxShadow='0px 3px 12px rgba(0, 0, 0, 0.25)'
      border='1px solid #2F855A'
      height='500px'
      textAlign='center'>
      <Box>
        <Box textAlign='left'>
          <Badge colorScheme="purple" whiteSpace='normal' textAlign='start'>
              {props.category}
          </Badge>
        </Box>
        <Box
          display='flex'
          justifyContent='space-between'
          width='100%'
          textAlign='left'>
          <Stat textAlign='left' w='50%'>
            <StatNumber mb='-10px'><span style={{color:'orange', fontSize:'40px'}}>{props.currentQuestion+1}</span><span style={{fontSize:'12px'}}> / {props.totalQuestions}</span></StatNumber>
            <StatHelpText>
              <Box fontWeight="semibold" fontSize="xs" d="flex" mt="2" alignItems="center">
                {Array(3)
                  .fill("")
                  .map((_, i) => (
                    <StarIcon
                      key={i}
                      color={i < props.difficulty ? "teal.500" : "gray.300"}
                    />
                  ))}
              </Box>
            </StatHelpText>
          </Stat>
          <Box
            color='#4FD1C5'
            fontSize='80px'
            margin='0'
            padding='0'
            lineHeight='70px'>
            <span className="score">{props.score}</span>
            <span style={{fontSize:'20px'}}> pts.</span>
          </Box>
        </Box>
        
      </Box>       
      {props.children}
    </Box>
    )
}