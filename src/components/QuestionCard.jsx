import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const QuestionCard = ({ question, onAnswer, questionNumber, totalQuestions }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(15);
  }, [question]);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(null);
    }
  }, [timeLeft, showResult]);

  const handleAnswer = (answer) => {
    if (showResult) return;
    
    setSelectedAnswer(answer);
    const correct = answer === question.correta;
    setIsCorrect(correct);
    setShowResult(true);
    
    // Auto-advance após 3 segundos
    setTimeout(() => {
      onAnswer(answer, correct);
    }, 3000);
  };

  const getButtonClass = (option) => {
    if (!showResult) {
      return "glass-effect hover:neon-glow transition-all duration-300 transform hover:scale-105";
    }
    
    if (option === question.correta) {
      return "correct-answer";
    }
    
    if (option === selectedAnswer && option !== question.correta) {
      return "wrong-answer";
    }
    
    return "glass-effect opacity-50";
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto p-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header com progresso */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-purple-300">
          Pergunta {questionNumber} de {totalQuestions}
        </div>
        <div className="flex items-center gap-2 text-blue-300">
          <Clock size={16} />
          <span className={`font-bold ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : ''}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Barra de progresso */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
        <motion.div
          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Pergunta */}
      <motion.div
        className="glass-effect rounded-2xl p-6 mb-6 cat-ears relative"
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl md:text-2xl font-bold text-white text-center leading-relaxed">
          {question.pergunta}
        </h2>
      </motion.div>

      {/* Opções */}
      <div className="grid gap-4 mb-6">
        {question.opcoes.map((opcao, index) => (
          <motion.button
            key={index}
            className={`${getButtonClass(opcao)} rounded-xl p-4 text-left text-white font-medium transition-all duration-300 cat-paw`}
            onClick={() => handleAnswer(opcao)}
            disabled={showResult}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: showResult ? 1 : 1.02 }}
            whileTap={{ scale: showResult ? 1 : 0.98 }}
          >
            <div className="flex items-center justify-between">
              <span>{opcao}</span>
              {showResult && opcao === question.correta && (
                <CheckCircle className="text-green-400" size={20} />
              )}
              {showResult && opcao === selectedAnswer && opcao !== question.correta && (
                <XCircle className="text-red-400" size={20} />
              )}
            </div>
          </motion.button>
        ))}
      </div>

      {/* Explicação */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            className="glass-effect rounded-xl p-4 border-l-4 border-blue-400"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">
                {isCorrect ? '😸' : '🙀'}
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">
                  {isCorrect ? 'Correto! 🎉' : 'Ops! 😿'}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {question.explicacao}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timer visual */}
      <div className="mt-4">
        <div className="w-full bg-gray-700 rounded-full h-1">
          <motion.div
            className={`h-1 rounded-full ${timeLeft <= 5 ? 'bg-red-500' : 'bg-blue-500'}`}
            initial={{ width: '100%' }}
            animate={{ width: `${(timeLeft / 15) * 100}%` }}
            transition={{ duration: 1, ease: 'linear' }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
