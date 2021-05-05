import './questions.css'
import { Badge, Stat, StatNumber,StatHelpText,Box } from '@chakra-ui/react'
import { StarIcon } from "@chakra-ui/icons"

export default function Question(props){

  return(
    <div className='question'>
      <div className='head'>
        <div className='dataQuestion'>
          <Badge colorScheme="purple" whiteSpace= 'normal' textAlign='start'>
            {props.category}
          </Badge>
          <Stat textAlign='left' w='50%'>
            <StatNumber><span style={{color:'orange', fontSize:'40px'}}>{props.currentQuestion+1}</span><span style={{fontSize:'12px'}}> / {props.totalQuestions}</span></StatNumber>
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
        </div>
        <div className='score'>
          <span style={{color:'#4FD1C5', fontSize:'90px'}}>{props.score}</span><span style={{fontSize:'20px'}}> pts.</span>
        </div>
      </div>       
      {props.children}
    </div>
    )
}