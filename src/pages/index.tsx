import * as React from "react"
import html2canvas from "html2canvas"
import "../css/styles.css"
import "bootstrap/dist/css/bootstrap-grid.min.css"
import Image from "../components/Image"

const IndexPage: React.FC = () => {
  const [answer, setAnswer] = React.useState("");
  const [questionAnswer, setQuestionAnswer] = React.useState(0);
  const [question, setQuestion] = React.useState("");
  const [answered, setAnswered] = React.useState<string[]>([]);
  const [answerColor, setAnswerColor] = React.useState("transparent")

  function handleClickNumber(value: string){
    return () => setAnswer(answer+value)
  }

  function handleClickAnswer(){
    if(answer === questionAnswer.toString()){
      setAnswered([...answered, question])
      setAnswerColor("green")
    } else {
      setAnswerColor("red")
    }
    setTimeout(() => {
      setAnswer("")
      generateQuestion()
      setAnswerColor("transparent")
    }, 1000)
  }

  function handleDelete(){
    setAnswer(answer.substr(0,answer.length - 1))
  }

  function generateQuestion(){
    const A = Math.floor(Math.random() * 10 + 1)
    const B = Math.floor(Math.random() * 10 + 1)
    if(answered.includes(A+" x "+B)){
      generateQuestion()
    } else {
      setQuestion(A+" x "+B)
      setQuestionAnswer(A*B)
    }
  }

  React.useEffect(() => {
    generateQuestion()
  }, [])

  function handleClickReset() {
    setAnswered([])
    generateQuestion()
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12 py-3">
          <h1 style={{textAlign:"center"}}>Belajar Perkalian</h1>
        </div>
        <div className="py-3">
          <h1>SOAL : {question} = </h1>
        </div>
        <div className="py-3 position-relative">
          <h1>JAWAB : {answer}</h1>
          <div style={{color:answerColor, position:"absolute",top:0,marginTop:"0.5rem", transform: "rotate(-15deg)", left:"7rem", border: `3px solid ${answerColor}`, padding:"5px 5px 0px 5px"}}>
            <h1>
              {answerColor === "green" && "BENAR"}
              {answerColor === "red" && "SALAH"}
            </h1>
          </div>
        </div>
      </div>
      <div className="row">
        <button className="col-4 btn btn-light py-3" onClick={handleClickNumber("1")}>1</button>
        <button className="col-4 btn btn-light py-3" onClick={handleClickNumber("2")}>2</button>
        <button className="col-4 btn btn-light py-3" onClick={handleClickNumber("3")}>3</button>
        <button className="col-4 btn btn-light py-3" onClick={handleClickNumber("4")}>4</button>
        <button className="col-4 btn btn-light py-3" onClick={handleClickNumber("5")}>5</button>
        <button className="col-4 btn btn-light py-3" onClick={handleClickNumber("6")}>6</button>
        <button className="col-4 btn btn-light py-3" onClick={handleClickNumber("7")}>7</button>
        <button className="col-4 btn btn-light py-3" onClick={handleClickNumber("8")}>8</button>
        <button className="col-4 btn btn-light py-3" onClick={handleClickNumber("9")}>9</button>
        <button className="col-4 btn btn-light py-3" onClick={handleDelete}>
          <i className="bi bi-backspace"></i>
        </button>
        <button className="col-4 btn btn-light py-3" onClick={handleClickNumber("0")}>0</button>
        <button className="col-4 btn btn-success py-3" onClick={handleClickAnswer}>
          <i className="bi bi-check-lg"></i>
        </button>
      </div>
      <div className="row p-3">
        <strong>{100 - answered.length} soal lagi</strong>
        <div className="progress" style={{padding:0}}>
          <div className="progress-bar" style={{width:`${answered.length/100*100}%`}}></div>
        </div>
      </div>
      <div className="row py-3">
        <button className="btn btn-success" onClick={handleClickReset}><i className="bi bi-arrow-clockwise"></i> MAIN LAGI
        </button>
      </div>
    </div>
  )
}

export default IndexPage
