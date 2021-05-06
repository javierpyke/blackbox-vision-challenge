import {Button, Box, useToast, Spinner, Text} from '@chakra-ui/react'
import getQuestions from '../../Resources/api.js'
import { useState , useEffect } from 'react';
import Question from '../Question'
import Answers from '../Answers'
import Finish from '../Finish'



function Game() {

  const toast = useToast()
  const questionsColors = ['teal','pink','purple','linkedin']
  const [status,setStatus] = useState('loading')
  const [score,setScore] = useState(0)
  const [questions,setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers,setAnswers] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [difficulty,setDifficulty] = useState(0)
       
  useEffect(() => {
    getQuestions()
    .then(
      (res) => { setQuestions(res)
      setStatus('ready')
    })
  }, []);

  useEffect(() => {    
    if(questions[currentQuestion]){
      function joinAnswers(){
        var answers_temp = questions[currentQuestion].incorrect_answers.slice()
        answers_temp.push(questions[currentQuestion].correct_answer)

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
      
        setAnswers(shuffle(answers_temp))
      }


      function difficultyFunc(){
        if(questions[currentQuestion].difficulty === 'hard'){
          setDifficulty(3)
        } else if(questions[currentQuestion].difficulty === 'medium'){
          setDifficulty(2)
        } else {
          setDifficulty(1)
        }
    
      }
      difficultyFunc()
      joinAnswers()
      setDisabled(false)
    }
    
    } , [questions,currentQuestion]);


  function nextQuestion(){
    if(currentQuestion+1 === questions.length){
      setStatus('finish')
    } else {
      setCurrentQuestion(currentQuestion => currentQuestion+1)
    }
  }
  
  function checkAnswer(answer){
    setDisabled(true)
    if(answer === questions[currentQuestion].correct_answer){
      if(questions[currentQuestion].type === 'boolean'){
        setScore(score => score + 5)
        
      } else {
        setScore(score => score + 10)
      }
      toast({
        title: 'Correcto',
        status: 'success',
        variant: "left-accent",
        duration: 1000,
        isClosable: true,
        onCloseComplete:	(() => nextQuestion()),
      })
    } else {
      toast({
        title: 'Incorrecto',
        description: 'La respuesta correcta es: '+questions[currentQuestion].correct_answer,
        status: 'error',
        variant: "left-accent",
        duration: 2000,
        isClosable: true,
        onCloseComplete:	(() => nextQuestion()),
      }) 
    } 
    
  }

  if(status === 'loading'){
    return(
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="#7025B3"
        color="#4FD1C5"
        size="xl"
      />
    )
  } 

  if(status === 'finish'){
    return(
      <Finish score={score}>
        <Text>¡El juego ha terminado!</Text>
        <Text>Tu puntaje final es:</Text>
      </Finish> 
    )
  }


  return (
      <Question
        score={score}
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        category={questions[currentQuestion].category}
        difficulty={difficulty}>
        <Box
          bgColor='#F6E05E'
          borderColor='#ECC94B'
          border='1px solid #ECC94B'
          m='1'
          mb='10px'
          p='20px 10px 20px'
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          color='#1A202C'
          borderRadius='10'>
          {questions[currentQuestion].question.replaceAll("&quot;",'"').replaceAll("&#039;","'")}
        </Box>
        <Answers>
          {answers.map((answer,i) =>
          <Button
            w='80%'
            m='3px'
            colorScheme={questionsColors[i]}
            variant="solid"            
            key={i}
            onClick={() => checkAnswer(answer)}
            isDisabled={disabled}>
              <Text isTruncated>{answer}</Text>
          </Button>  
          )}
        </Answers>
      </Question>
  );
}

export default Game;
