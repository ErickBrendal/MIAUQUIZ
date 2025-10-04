import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/HomePage';
import QuizPage from './pages/QuizPage';
import ResultPage from './pages/ResultPage';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'quiz', 'result'
  const [gameResults, setGameResults] = useState(null);

  const handleStartGame = () => {
    setCurrentPage('quiz');
  };

  const handleFinishGame = (results) => {
    setGameResults(results);
    setCurrentPage('result');
  };

  const handlePlayAgain = () => {
    setGameResults(null);
    setCurrentPage('quiz');
  };

  const handleGoHome = () => {
    setGameResults(null);
    setCurrentPage('home');
  };

  return (
    <div className="App min-h-screen">
      <AnimatePresence mode="wait">
        {currentPage === 'home' && (
          <HomePage 
            key="home"
            onStartGame={handleStartGame}
          />
        )}
        
        {currentPage === 'quiz' && (
          <QuizPage 
            key="quiz"
            onFinish={handleFinishGame}
            onHome={handleGoHome}
          />
        )}
        
        {currentPage === 'result' && gameResults && (
          <ResultPage 
            key="result"
            results={gameResults}
            onPlayAgain={handlePlayAgain}
            onHome={handleGoHome}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
