import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Star } from 'lucide-react';

const ScoreBoard = ({ scores = [] }) => {
  const getPositionIcon = (position) => {
    switch (position) {
      case 1:
        return <Trophy className="text-yellow-400" size={20} />;
      case 2:
        return <Medal className="text-gray-300" size={20} />;
      case 3:
        return <Award className="text-orange-400" size={20} />;
      default:
        return <Star className="text-purple-400" size={16} />;
    }
  };

  const getPositionClass = (position) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-400/30";
      case 2:
        return "bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/30";
      case 3:
        return "bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-400/30";
      default:
        return "bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-purple-400/20";
    }
  };

  const mockScores = scores.length === 0 ? [
    { name: "MiauMestre", score: 280, date: "Hoje" },
    { name: "GatoSábio", score: 250, date: "Ontem" },
    { name: "FelinoGênio", score: 230, date: "2 dias" },
    { name: "WhiskerWiz", score: 210, date: "3 dias" },
    { name: "PurrfectPlayer", score: 190, date: "1 semana" },
  ] : scores;

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="glass-effect rounded-2xl p-6 cat-ears relative">
        <h2 className="text-2xl font-bold text-center mb-6 gradient-text orbitron">
          🏆 Ranking Felino
        </h2>
        
        <div className="space-y-3">
          {mockScores.slice(0, 10).map((player, index) => (
            <motion.div
              key={index}
              className={`${getPositionClass(index + 1)} rounded-xl p-4 border transition-all duration-300 hover:scale-105`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    {getPositionIcon(index + 1)}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">
                      {player.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      {player.date}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg gradient-text orbitron">
                    {player.score}
                  </div>
                  <div className="text-xs text-purple-300">
                    pontos
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {scores.length === 0 && (
          <motion.div
            className="mt-4 text-center text-sm text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-center gap-2">
              <span>🐾</span>
              <span>Jogue para aparecer no ranking!</span>
              <span>🐾</span>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ScoreBoard;
