import { useState , useEffect } from 'react';
import { Button } from "@chakra-ui/react"
import { Box , Flex , Spacer } from "@chakra-ui/react"
import { Badge } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
import { StarIcon } from "@chakra-ui/icons"
import {
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react"



export default function Question(props) {

  const toast = useToast()
  const questionsColors = ['red.500','orange.500','green.500','cyan.500']
  const questionsColorsHover = ['red.700','orange.700','green.700','cyan.700']
  const [answers,setAnswers] = useState([])
  const [buttonDisabled,setButtonDisabled] = useState(false)
  const [difficulty,setDifficulty] = useState(0)


  function difficulty_func(){
    if(props.question.difficulty === 'hard'){
      setDifficulty(3)
    } else if(props.question.difficulty === 'medium'){
      setDifficulty(2)
    } else {
      setDifficulty(1)
    }

  }

  useEffect(() => {
    setButtonDisabled(false)
    difficulty_func()

    var answers_temp = props.question.incorrect_answers.slice()
    answers_temp.push(props.question.correct_answer)

    function shuffle(arr) {
      var i,
          j,
          temp;
      for (i = arr.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          temp = arr[i];
          arr[i] = arr[j];
          arr[j] = temp;
      }
      return arr;    
    };
  
    setAnswers(shuffle(answers_temp));
  }, [props.question.incorrect_answers]);

  function corroborateAnswer(answer){
    if(answer === props.question.correct_answer && props.question.type === "multiple"){
      toast({
        title: 'Correcto',
        status: 'success',
        variant: "left-accent",
        duration: 2000,
        isClosable: true,
        onCloseComplete:	(() => props.callback(10)),
      })      
    } else if(answer === props.question.correct_answer && props.question.type === "boolean"){
      toast({
        title: 'Correcto',
        status: 'success',
        variant: "left-accent",
        duration: 2000,
        isClosable: true,
        onCloseComplete:	(() => props.callback(5)),
      }) 

    } else {
      toast({
        title: 'Incorrecto',
        description: 'La respuesta correcta es: '+props.question.correct_answer,
        status: 'error',
        variant: "left-accent",
        duration: 5000,
        isClosable: true,
        onCloseComplete:	(() => props.callback(0)),
      }) 
    }
    setButtonDisabled(true)  
  }

  return(
    <>
      <Box m='0 auto'  p="3" w='90%' borderWidth="1px" borderRadius="lg" 
      bgGradient="linear(to-b, white, gray.50)">
        <Box d='flex' flexWrap='wrap'> 
          <Box w='100%' textAlign='start'>
            <Badge colorScheme="purple" whiteSpace= 'normal' textAlign='start'>
                    {props.question.category}
            </Badge>
          </Box>
          <Flex w='100%' >
            <Stat textAlign='left' w='50%'>
              <StatNumber><span style={{color:'orange', fontSize:'40px'}}>{props.currentQuestion+1}</span><span style={{fontSize:'12px'}}> / {props.totalQuestions}</span></StatNumber>
              <StatHelpText>
                <Box fontWeight="semibold" fontSize="xs" d="flex" mt="2" alignItems="center">
                  {Array(3)
                    .fill("")
                    .map((_, i) => (
                      <StarIcon
                        key={i}
                        color={i < difficulty ? "teal.500" : "gray.300"}
                      />
                    ))}
                </Box>
              </StatHelpText>
            </Stat>
            <Box m='0' w='70%' ><span style={{color:'#4FD1C5', fontSize:'90px'}}>90</span><span style={{fontSize:'20px'}}> pts.</span></Box>
          </Flex>
        </Box>
       
        <Box
          bgGradient="linear(to-b, purple.500, purple.600)"
          m='1'
          mb='3'
          p='2'
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          color='white'
          borderRadius='10'
        >
          {props.question.question.replaceAll("&quot;",'"').replaceAll("&#039;","'")}
        </Box>
          <ul>
        {answers.map((answer,i) =>
          <li style={{listStyle: 'none'}} key={i}>
            <Button
              color='white'
              width="98%"
              whiteSpace= 'normal'
              height= 'auto'
              mb="5px"
              borderRadius="5px"
              pt="8px"
              pb="8px"
              backgroundColor={questionsColors[i]}
              _hover={{background:questionsColorsHover[i]}}
              onClick={()=>corroborateAnswer(answer)}
              isDisabled={buttonDisabled}>
                {answer.replaceAll("&quot;",'"')}
            </Button>
          </li>)}
      </ul>
        
      </Box>
      
    </>
  )
  };
