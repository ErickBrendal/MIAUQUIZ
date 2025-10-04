import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Home, Share2, Trophy, Star } from 'lucide-react';
import AvatarGato from '../components/AvatarGato';
import ScoreBoard from '../components/ScoreBoard';

const ResultPage = ({ results, onPlayAgain, onHome }) => {
  const [showRanking, setShowRanking] = useState(false);
  const [playerName, setPlayerName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Gerar confetti se a pontuação for boa
    if (results.percentage >= 70) {
      const newConfetti = [];
      for (let i = 0; i < 50; i++) {
        newConfetti.push({
          id: i,
          x: Math.random() * 100,
          y: -10,
          color: ['#7C3AED', '#38BDF8', '#EC4899', '#10B981'][Math.floor(Math.random() * 4)],
          delay: Math.random() * 2
        });
      }
      setConfetti(newConfetti);
    }
  }, [results.percentage]);

  const getPerformanceMessage = () => {
    const { percentage } = results;
    
    if (percentage >= 90) {
      return {
        title: "🏆 MESTRE FELINO! 🏆",
        message: "Você é um verdadeiro especialista em gatos! Seus conhecimentos felinos são impressionantes!",
        mood: "happy",
        color: "text-yellow-400"
      };
    } else if (percentage >= 70) {
      return {
        title: "😸 EXCELENTE! 😸",
        message: "Muito bem! Você conhece bastante sobre nossos amigos felinos. Continue aprendendo!",
        mood: "happy",
        color: "text-green-400"
      };
    } else if (percentage >= 50) {
      return {
        title: "🐱 BOM TRABALHO! 🐱",
        message: "Você tem um conhecimento sólido sobre gatos. Que tal tentar novamente para melhorar?",
        mood: "neutral",
        color: "text-blue-400"
      };
    } else {
      return {
        title: "🙀 QUASE LÁ! 🙀",
        message: "Ainda há muito para aprender sobre gatos! Não desista, tente novamente e melhore sua pontuação!",
        mood: "sad",
        color: "text-purple-400"
      };
    }
  };

  const performance = getPerformanceMessage();

  const handleSaveScore = () => {
    if (playerName.trim()) {
      // Aqui você salvaria no Firebase/backend
      console.log('Salvando pontuação:', { name: playerName, score: results.score });
      setShowNameInput(false);
      setShowRanking(true);
    }
  };

  const handleShare = () => {
    const shareText = `🐾 Acabei de fazer ${results.score} pontos no MIAUQUIZ! Consegui acertar ${results.correctAnswers} de ${results.totalQuestions} perguntas sobre gatos! 😸`;
    
    if (navigator.share) {
      navigator.share({
        title: 'MIAUQUIZ - O Desafio Felino',
        text: shareText,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(shareText);
      alert('Resultado copiado para a área de transferência!');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Confetti */}
      {confetti.map(piece => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
          }}
          initial={{ y: -10, rotate: 0 }}
          animate={{
            y: window.innerHeight + 10,
            rotate: 360,
            x: [0, 50, -50, 0]
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: "easeOut"
          }}
        />
      ))}

      <div className="container mx-auto px-4 py-8">
        {!showRanking ? (
          <motion.div
            className="max-w-2xl mx-auto text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Título de performance */}
            <motion.h1
              className={`text-4xl md:text-5xl font-bold mb-6 orbitron ${performance.color}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            >
              {performance.title}
            </motion.h1>

            {/* Avatar do gato */}
            <motion.div
              className="mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
            >
              <AvatarGato mood={performance.mood} score={results.score} />
            </motion.div>

            {/* Estatísticas principais */}
            <motion.div
              className="glass-effect rounded-2xl p-8 mb-6 cat-ears relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7 }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text orbitron">
                    {results.score}
                  </div>
                  <div className="text-sm text-gray-400">Pontos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400">
                    {results.correctAnswers}
                  </div>
                  <div className="text-sm text-gray-400">Acertos</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">
                    {results.totalQuestions - results.correctAnswers}
                  </div>
                  <div className="text-sm text-gray-400">Erros</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400">
                    {results.percentage}%
                  </div>
                  <div className="text-sm text-gray-400">Precisão</div>
                </div>
              </div>
            </motion.div>

            {/* Mensagem de performance */}
            <motion.div
              className="glass-effect rounded-xl p-6 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <p className="text-gray-300 text-lg leading-relaxed">
                {performance.message}
              </p>
            </motion.div>

            {/* Barra de progresso visual */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
            >
              <div className="text-sm text-gray-400 mb-2">Desempenho</div>
              <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden">
                <motion.div
                  className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${results.percentage}%` }}
                  transition={{ delay: 1.3, duration: 1.5, ease: "easeOut" }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </motion.div>

            {/* Botões de ação */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              <motion.button
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-lg flex items-center gap-3 pulse-glow transition-all duration-300 transform hover:scale-105"
                onClick={onPlayAgain}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RotateCcw size={20} />
                Jogar Novamente
              </motion.button>

              <motion.button
                className="glass-effect hover:neon-glow text-white font-bold py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                onClick={() => setShowNameInput(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Trophy size={20} />
                Salvar Pontuação
              </motion.button>
            </motion.div>

            {/* Botões secundários */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.button
                className="glass-effect hover:neon-glow text-white py-2 px-6 rounded-xl flex items-center gap-2 transition-all duration-300"
                onClick={handleShare}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={16} />
                Compartilhar
              </motion.button>

              <motion.button
                className="glass-effect hover:neon-glow text-white py-2 px-6 rounded-xl flex items-center gap-2 transition-all duration-300"
                onClick={() => setShowRanking(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Star size={16} />
                Ver Ranking
              </motion.button>

              <motion.button
                className="glass-effect hover:neon-glow text-white py-2 px-6 rounded-xl flex items-center gap-2 transition-all duration-300"
                onClick={onHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home size={16} />
                Início
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          // Tela de Ranking
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center justify-between mb-6">
              <motion.button
                className="glass-effect hover:neon-glow text-white font-bold py-2 px-4 rounded-xl transition-all duration-300"
                onClick={() => setShowRanking(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← Voltar
              </motion.button>
              <h2 className="text-2xl font-bold gradient-text orbitron">
                Ranking Global
              </h2>
              <div></div>
            </div>
            
            <ScoreBoard />
          </motion.div>
        )}

        {/* Modal de input do nome */}
        {showNameInput && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowNameInput(false)} />
            <motion.div
              className="relative glass-effect rounded-2xl p-6 max-w-md mx-auto"
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 10 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <h3 className="text-xl font-bold text-white mb-4 text-center">
                Salvar no Ranking
              </h3>
              <p className="text-gray-300 text-sm mb-4 text-center">
                Digite seu nome para aparecer no ranking:
              </p>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Seu nome aqui..."
                className="w-full bg-gray-800 text-white rounded-xl px-4 py-3 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
                maxLength={20}
                autoFocus
              />
              <div className="flex gap-3">
                <button
                  className="flex-1 glass-effect hover:neon-glow text-white py-2 px-4 rounded-xl transition-all duration-300"
                  onClick={() => setShowNameInput(false)}
                >
                  Cancelar
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-xl transition-all duration-300"
                  onClick={handleSaveScore}
                  disabled={!playerName.trim()}
                >
                  Salvar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ResultPage;
