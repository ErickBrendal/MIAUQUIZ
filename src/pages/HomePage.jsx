import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Trophy, Info, Sparkles } from 'lucide-react';
import AvatarGato from '../components/AvatarGato';
import ScoreBoard from '../components/ScoreBoard';

const HomePage = ({ onStartGame }) => {
  const [showRanking, setShowRanking] = useState(false);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Gerar estrelas para o fundo
    const newStars = [];
    for (let i = 0; i < 50; i++) {
      newStars.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 2
      });
    }
    setStars(newStars);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Campo de estrelas */}
      <div className="star-field">
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="star"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: star.delay
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-screen">
          
          {!showRanking ? (
            // Tela Principal
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Logo/Título */}
              <motion.div
                className="mb-8"
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <h1 className="text-6xl md:text-8xl font-bold mb-4 gradient-text orbitron">
                  MIAUQUIZ
                </h1>
                <motion.div
                  className="text-xl md:text-2xl text-purple-300 mb-2"
                  animate={{
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  O Desafio Felino
                </motion.div>
                <div className="text-sm text-blue-300 flex items-center justify-center gap-2">
                  <Sparkles size={16} />
                  <span>Teste seus conhecimentos sobre gatos</span>
                  <Sparkles size={16} />
                </div>
              </motion.div>

              {/* Avatar do Gato */}
              <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <AvatarGato mood="happy" />
              </motion.div>

              {/* Descrição */}
              <motion.div
                className="glass-effect rounded-2xl p-6 mb-8 max-w-2xl mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
              >
                <p className="text-gray-300 text-lg leading-relaxed">
                  Embarque em uma jornada de descobertas felinas! Responda perguntas sobre 
                  curiosidades dos gatos, ganhe pontos e aprenda fatos incríveis sobre 
                  nossos amigos de quatro patas. 🐾
                </p>
              </motion.div>

              {/* Botões */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-2xl text-xl flex items-center gap-3 pulse-glow transition-all duration-300 transform hover:scale-105"
                  onClick={onStartGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={24} />
                  Iniciar Jogo
                </motion.button>

                <motion.button
                  className="glass-effect hover:neon-glow text-white font-bold py-4 px-8 rounded-2xl text-lg flex items-center gap-3 transition-all duration-300 transform hover:scale-105"
                  onClick={() => setShowRanking(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Trophy size={20} />
                  Ranking
                </motion.button>
              </motion.div>

              {/* Informações do jogo */}
              <motion.div
                className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
              >
                <div className="glass-effect rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🎯</div>
                  <div className="font-bold text-white">10 Perguntas</div>
                  <div className="text-sm text-gray-400">Por partida</div>
                </div>
                <div className="glass-effect rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">⏱️</div>
                  <div className="font-bold text-white">15 Segundos</div>
                  <div className="text-sm text-gray-400">Por pergunta</div>
                </div>
                <div className="glass-effect rounded-xl p-4 text-center">
                  <div className="text-2xl mb-2">🏆</div>
                  <div className="font-bold text-white">10 Pontos</div>
                  <div className="text-sm text-gray-400">Por acerto</div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            // Tela de Ranking
            <motion.div
              className="w-full max-w-2xl mx-auto"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <motion.button
                  className="glass-effect hover:neon-glow text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-all duration-300"
                  onClick={() => setShowRanking(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Voltar
                </motion.button>
                <h2 className="text-2xl font-bold gradient-text orbitron">
                  Hall da Fama
                </h2>
                <div></div>
              </div>
              
              <ScoreBoard />
              
              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.button
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 mx-auto transition-all duration-300 transform hover:scale-105"
                  onClick={onStartGame}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play size={20} />
                  Jogar Agora
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
