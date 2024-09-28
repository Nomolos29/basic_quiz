import { useState } from "react"
import questions from "../../questions.json"
                                                                                                                                         


const Home = () => {
  
  const [showQuestion, setShowQuestion] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [choice, setChoice] = useState(false);
  const [submit, setSubmit] = useState(false)

  const handleNextQuestion = () => {
    
    setShowQuestion((nextQuestion) => {

      const next = (showQuestion + 1) < questions.length ? nextQuestion + 1 : showQuestion;
      
      return next;

    })
    
  }

  const handlePrevQuestion = () => {

    setShowQuestion((prevQuestion) => {

      const prev = showQuestion > 0 ? prevQuestion - 1 : showQuestion;

      return prev;

    })
  
  }

  const handleChoice = (index) => {

    setChoice(!choice);

  }

  const handleCorrectAnswers = (choice, questionIndex, index) => {

    setCorrectAnswer((prev) => {
        
      const correctAnswers = questions[questionIndex].answer;

      const isCorrect = correctAnswers.includes(choice);

      const answer = isCorrect ? prev + 1 : prev;

      return answer;

    });

    handleChoice(index);

    handleNextQuestion();

  };

  const handleSubmit = () => {

    setSubmit(!submit);

  }

  const handleReplay = () => {

    setSubmit(!submit);

    setShowQuestion(0);
    setCorrectAnswer(0);
    setChoice(false);


  }



  const button = "px-6 py-1 rounded-full bg-white/50 hover:bg-white"

  const failed = correctAnswer < (questions.length / 2) ? true : false;
  const average = (correctAnswer > failed && correctAnswer < ((questions.length / 3))*2) ? true : false;


  return (
    <div className="flex flex-col justify-center items-center p-4 w-screen h-screen bg-gradient-to-tl from-black via-gray-400 to-gray-200">
      <h1 className="text-4xl font-semibold text-gray-500 pb-5">Basic Quiz</h1>
      <main className={`flex justify-center p-5 rounded-2xl w-[600px] h-[450px] shadow-md shadow-white drop-shadow-xl backdrop-blur-2xl shadow-inner bg-white/35 border-[2px] ${failed ? "bg-red-500/50" : "bg-green-500"}`}>
        {!submit ? <span className="flex flex-col justify-between w-full">
          <h2 className="border-b-[1px] border-gray-200 pb-3 text-xl">Question{showQuestion + 1}/{questions.length}</h2>

          <section className="py-5 flex flex-col justify-between">
            <p className="text-center py-6 h-[100px] text-lg text-gray-100 font-semibold">{questions[showQuestion].question}</p>
            <div className="flex flex-wrap justify-between h-[150px] pt-5">
              {questions[showQuestion].options.map((option, index) => (
                <span onClick={() => handleCorrectAnswers(option, showQuestion, index)} className={`w-[45%] py-1 px-3 hover:bg-white rounded-xl mb-4 hover:cursor-pointer border-[2px] {choice ? "bg-white": "bg-green-600"}`} key={index}>{option}</span>
              ))}
            </div>
          </section>

          <section className="flex justify-between">
            {showQuestion > 0  ? <button onClick={handlePrevQuestion} className={button}>{"< Prev"}</button> : ""}
            
            {showQuestion == (questions.length - 1) ? <button onClick={handleSubmit} className={button}>Submit</button> : <button onClick={handleNextQuestion} className={button}>{"Next >"}</button>}
          </section>
        </span> : 
        <span className="flex flex-col items-center justify-center w-full space-y-10">
          <h1 className="text-white text-4xl font-bold">Your Score</h1>
          <span className={`w-28 h-28 flex justify-center items-center bg-gray-300 rounded-[50%] shadow-md bg-red-500 ${average ? "bg-blue-500/50" : "bg-green-500"}`}><span className={`text-4xl text-white/50`}>{correctAnswer}</span>/ <span>{questions.length}</span></span>

          <h2 className="text-lg font-medium">{average ? "Try reduce your Sleep!" : "Congratulations"}</h2>
          <button onClick={handleReplay} className={button}>{average ? "Redeem Yourself!" : "One More"}</button>
        </span> }

      </main>

    </div>
  )
}

export default Home
