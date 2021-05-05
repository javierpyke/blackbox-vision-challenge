import './finish.css'

export default function Finish(props){
    return(
        <div className='finish'>
            <span>¡El juego ha terminado!</span>
            gdfdgdfgdfgdfgdfgdf
            <span style={{color:'#4FD1C5', fontSize:'90px'}}>{props.score}</span><span style={{fontSize:'20px'}}> pts.</span>
        </div>
    )
}