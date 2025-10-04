import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const AvatarGato = ({ mood = 'neutral', score = 0 }) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [earPosition, setEarPosition] = useState('normal');

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    if (mood === 'happy') {
      setEarPosition('up');
    } else if (mood === 'sad') {
      setEarPosition('down');
    } else {
      setEarPosition('normal');
    }
  }, [mood]);

  const getEyeShape = () => {
    if (isBlinking) return 'M15,20 Q20,18 25,20';
    if (mood === 'happy') return 'M15,18 Q20,15 25,18 Q20,22 15,18';
    if (mood === 'sad') return 'M15,22 Q20,25 25,22 Q20,18 15,22';
    return 'M15,20 Q20,17 25,20 Q20,23 15,20';
  };

  const getMouthShape = () => {
    if (mood === 'happy') return 'M18,28 Q20,30 22,28';
    if (mood === 'sad') return 'M18,30 Q20,28 22,30';
    return 'M19,29 L21,29';
  };

  const getEarRotation = () => {
    if (earPosition === 'up') return -10;
    if (earPosition === 'down') return 10;
    return 0;
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        className="relative"
        animate={{
          y: [0, -5, 0],
          rotate: [0, 2, -2, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg width="80" height="80" viewBox="0 0 40 40" className="drop-shadow-lg">
          {/* Orelhas */}
          <motion.path
            d="M8,15 L12,5 L16,15 Z"
            fill="url(#catGradient)"
            stroke="#7C3AED"
            strokeWidth="1"
            animate={{ rotate: getEarRotation() }}
            style={{ transformOrigin: "12px 15px" }}
          />
          <motion.path
            d="M24,15 L28,5 L32,15 Z"
            fill="url(#catGradient)"
            stroke="#7C3AED"
            strokeWidth="1"
            animate={{ rotate: -getEarRotation() }}
            style={{ transformOrigin: "28px 15px" }}
          />
          
          {/* Cabeça */}
          <circle
            cx="20"
            cy="22"
            r="12"
            fill="url(#catGradient)"
            stroke="#7C3AED"
            strokeWidth="2"
            className="drop-shadow-md"
          />
          
          {/* Olhos */}
          <motion.path
            d={getEyeShape()}
            fill="#38BDF8"
            className="drop-shadow-sm"
            animate={{
              fill: mood === 'happy' ? '#10B981' : mood === 'sad' ? '#EF4444' : '#38BDF8'
            }}
          />
          <motion.path
            d={getEyeShape().replace(/15/g, '25').replace(/25/g, '35').replace(/35/g, '25')}
            fill="#38BDF8"
            className="drop-shadow-sm"
            animate={{
              fill: mood === 'happy' ? '#10B981' : mood === 'sad' ? '#EF4444' : '#38BDF8'
            }}
          />
          
          {/* Nariz */}
          <path
            d="M19,25 L20,23 L21,25 Z"
            fill="#EC4899"
            className="drop-shadow-sm"
          />
          
          {/* Boca */}
          <motion.path
            d={getMouthShape()}
            stroke="#7C3AED"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Bigodes */}
          <g stroke="#7C3AED" strokeWidth="1" opacity="0.8">
            <line x1="8" y1="24" x2="12" y2="23" />
            <line x1="8" y1="26" x2="12" y2="26" />
            <line x1="28" y1="23" x2="32" y2="24" />
            <line x1="28" y1="26" x2="32" y2="26" />
          </g>
          
          {/* Gradiente */}
          <defs>
            <linearGradient id="catGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
      
      {/* Pontuação */}
      <motion.div
        className="mt-2 text-center"
        animate={{
          scale: score > 0 ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-sm font-bold text-purple-300">Pontos</div>
        <div className="text-xl font-bold gradient-text orbitron">{score}</div>
      </motion.div>
      
      {/* Reação baseada na pontuação */}
      {score >= 100 && (
        <motion.div
          className="mt-1 text-xs text-yellow-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          🌟 Incrível!
        </motion.div>
      )}
      
      {score >= 50 && score < 100 && (
        <motion.div
          className="mt-1 text-xs text-green-400"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          😸 Muito bem!
        </motion.div>
      )}
    </div>
  );
};

export default AvatarGato;
