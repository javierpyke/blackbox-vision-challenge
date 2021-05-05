import {useState,useEffect} from 'react';
import Question from '../../Components/Question'
import EndGame from '../../Components/EndGame';
import getQuestions from '../../api.js'
import {Button, Box, useToast, Spinner} from '@chakra-ui/react'
import Answers from '../../Components/Answers'
import Finish from '../../Components/Finish'
import { Skeleton, SkeletonCircle, SkeletonText, Stack } from "@chakra-ui/react"


function NewGame() {

  const toast = useToast()
  const questionsColors = ['red.500','orange.500','green.500','cyan.500']
  const [status,setStatus] = useState('loading')
  const [score,setScore] = useState(0)
  const [questions,setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers,setAnswers] = useState([])
  const [disabled, setDisabled] = useState(false)
  const [result,setResult] = useState()

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
        duration: 2000,
        isClosable: true,
        onCloseComplete:	(() => nextQuestion()),
      })
    } else {
      toast({
        title: 'Incorrecto',
        description: 'La respuesta correcta es: '+questions[currentQuestion].correct_answer,
        status: 'error',
        variant: "left-accent",
        duration: 5000,
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
      <Finish score={score} />
    )
  }


  return (
    <div className='App'>
      <Question
        score={score}
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        category={questions[currentQuestion].category}
        difficulty={difficulty}>
        <Box
          bgGradient="linear(to-b, purple.500, purple.600)"
          m='1'
          mb='20px'
          p='30px 10px 30px'
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          color='white'
          borderRadius='10'
        >
          {questions[currentQuestion].question.replaceAll("&quot;",'"').replaceAll("&#039;","'")}
        </Box>
        <Answers>
          {answers.map((answer,i) =>
          <Button
            w='80%'
            m='3px'
            backgroundColor={questionsColors[i]}
            key={i}
            onClick={() => checkAnswer(answer)}
            disabled={disabled}>
              {answer}
            </Button>)}
        </Answers>
      </Question>
    </div>

  );
}

export default NewGame;