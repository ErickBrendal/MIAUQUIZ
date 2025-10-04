import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Volume2, VolumeX } from 'lucide-react';
import QuestionCard from '../components/QuestionCard';
import AvatarGato from '../components/AvatarGato';
import { getRandomQuestions, curiosidades } from '../data/questions';

const QuizPage = ({ onFinish, onHome }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [consecutiveCorrect, setConsecutiveCorrect] = useState(0);
  const [catMood, setCatMood] = useState('neutral');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showCuriosity, setShowCuriosity] = useState(false);
  const [currentCuriosity, setCurrentCuriosity] = useState('');

  useEffect(() => {
    const gameQuestions = getRandomQuestions(10);
    setQuestions(gameQuestions);
  }, []);

  const playSound = (type) => {
    if (!soundEnabled) return;
    
    // Simular sons (em uma implementação real, você usaria arquivos de áudio)
    console.log(`Playing sound: ${type}`);
  };

  const handleAnswer = (answer, isCorrect) => {
    playSound('click');
    
    if (isCorrect) {
      setScore(prev => prev + 10);
      setCorrectAnswers(prev => prev + 1);
      setConsecutiveCorrect(prev => prev + 1);
      setCatMood('happy');
      playSound('correct');
      
      // Mostrar curiosidade a cada 3 acertos consecutivos
      if ((consecutiveCorrect + 1) % 3 === 0) {
        const randomCuriosity = curiosidades[Math.floor(Math.random() * curiosidades.length)];
        setCurrentCuriosity(randomCuriosity);
        setShowCuriosity(true);
        setTimeout(() => setShowCuriosity(false), 3000);
      }
    } else {
      setConsecutiveCorrect(0);
      setCatMood('sad');
      playSound('wrong');
    }

    // Resetar humor do gato após um tempo
    setTimeout(() => setCatMood('neutral'), 2000);

    // Avançar para próxima pergunta ou finalizar
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        onFinish({
          score,
          correctAnswers: isCorrect ? correctAnswers + 1 : correctAnswers,
          totalQuestions: questions.length,
          percentage: Math.round(((isCorrect ? correctAnswers + 1 : correctAnswers) / questions.length) * 100)
        });
      }
    }, 3000);
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          className="text-center"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="text-4xl mb-4">🐱</div>
          <div className="text-white">Preparando perguntas...</div>
        </motion.div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-purple-500/20"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.button
            className="glass-effect hover:neon-glow text-white p-2 rounded-xl transition-all duration-300"
            onClick={onHome}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Home size={20} />
          </motion.button>
          
          <div className="text-center">
            <div className="text-sm text-purple-300">MIAUQUIZ</div>
            <div className="text-xs text-gray-400">O Desafio Felino</div>
          </div>
          
          <motion.button
            className="glass-effect hover:neon-glow text-white p-2 rounded-xl transition-all duration-300"
            onClick={() => setSoundEnabled(!soundEnabled)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </motion.button>
        </div>
      </motion.div>

      {/* Conteúdo principal */}
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            
            {/* Avatar do gato (sidebar) */}
            <motion.div
              className="lg:col-span-1 flex justify-center lg:justify-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="sticky top-24">
                <AvatarGato mood={catMood} score={score} />
                
                {/* Estatísticas */}
                <motion.div
                  className="mt-6 glass-effect rounded-xl p-4 text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="text-sm text-purple-300 mb-2">Estatísticas</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Acertos:</span>
                      <span className="text-green-400 font-bold">{correctAnswers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Sequência:</span>
                      <span className="text-blue-400 font-bold">{consecutiveCorrect}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Precisão:</span>
                      <span className="text-purple-400 font-bold">
                        {currentQuestionIndex > 0 ? Math.round((correctAnswers / currentQuestionIndex) * 100) : 0}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Pergunta principal */}
            <div className="lg:col-span-3">
              <AnimatePresence mode="wait">
                <QuestionCard
                  key={currentQuestionIndex}
                  question={currentQuestion}
                  onAnswer={handleAnswer}
                  questionNumber={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Curiosidade popup */}
      <AnimatePresence>
        {showCuriosity && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
            <motion.div
              className="relative glass-effect rounded-2xl p-6 max-w-md mx-auto text-center"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="text-3xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-white mb-3">
                Curiosidade Desbloqueada!
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {currentCuriosity}
              </p>
              <div className="mt-4 text-xs text-purple-300">
                3 acertos consecutivos! Continue assim! 🐾
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Partículas de fundo */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
