import {useState,useEffect} from 'react';
import Question from '../../Components/Question'
import EndGame from '../../Components/EndGame';

function NewGame() {
  const [finish,setFinish] = useState(false)
  const [score,setScore] = useState(0)
  const [preguntas,setPreguntas] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0)
      
  async function getData() {
    const response = await fetch('https://opentdb.com/api.php?amount=10');
    const preguntas = await response.json();
    setPreguntas(preguntas.results);
  }

  useEffect(() => {
    getData();
  }, []);

  function handleCallback(data) {
    setScore(score+data)
    if(currentQuestion+1 < preguntas.length){
      setCurrentQuestion(currentQuestion+1)
    } else {
      setFinish(true)
    }
       
  }

  return (
    <div className='App'>
      {!finish?
        <>
          {preguntas.length>0?<Question score={score} currentQuestion={currentQuestion} totalQuestions={preguntas.length} question={preguntas[currentQuestion]} callback={handleCallback}/>:null}
          </>:<EndGame score={score}/>}
    </div>

  );
}

export default NewGame;