import { motion } from "motion/react";

export const Mascot = () => {
  return (
    <motion.div
      animate={{ y: [0, -15, 0] }}
      transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      className="relative w-full max-w-[400px] aspect-square mx-auto"
    >
      <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-2xl overflow-visible">
        {/* Background Glow */}
        <motion.circle 
          cx="250" cy="250" r="180" 
          fill="url(#mascot-glow)" 
          opacity="0.2"
          animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        {/* Mascot Body (Dog/Cat hybrid) */}
        {/* Tail */}
        <motion.path 
          d="M340 350 Q420 320 400 250 Q380 180 340 280" 
          stroke="#FDBA74" strokeWidth="36" strokeLinecap="round" strokeLinejoin="round" fill="none"
          style={{ transformOrigin: "340px 350px" }}
          animate={{ rotate: [0, 15, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        />

        {/* Main Body */}
        <path d="M150 250 Q120 380 180 400 L320 400 Q380 380 350 250 Z" fill="#FFEDD5" />
        <path d="M190 250 Q160 380 200 400 L300 400 Q340 380 310 250 Z" fill="#FFF7ED" />

        {/* Ears */}
        {/* Left Ear */}
        <motion.path 
          d="M140 180 Q80 100 160 110 Q200 115 180 170" 
          fill="#FDBA74"
          style={{ transformOrigin: "160px 180px" }}
          animate={{ rotate: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.5 }}
        />
        <path d="M148 175 Q100 120 160 125 Q180 128 172 168" fill="#FDA4AF" />
        
        {/* Right Ear */}
        <motion.path 
          d="M360 180 Q420 100 340 110 Q300 115 320 170" 
          fill="#FDBA74"
          style={{ transformOrigin: "340px 180px" }}
          animate={{ rotate: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 4, delay: 0.2 }}
        />
        <path d="M352 175 Q400 120 340 125 Q320 128 328 168" fill="#FDA4AF" />

        {/* Head */}
        <path d="M150 170 Q100 250 180 280 L320 280 Q400 250 350 170 Q300 90 250 90 Q200 90 150 170 Z" fill="#FFEDD5" />
        <path d="M180 190 Q150 250 200 270 L300 270 Q350 250 320 190 Q280 130 250 130 Q220 130 180 190 Z" fill="#FFF7ED" />

        {/* Blinking Eyes */}
        <motion.g animate={{ scaleY: [1, 0.05, 1] }} transition={{ repeat: Infinity, duration: 6, times: [0, 0.02, 0.04] }}>
          <circle cx="200" cy="190" r="14" fill="#0F172A" />
          <circle cx="205" cy="185" r="4" fill="#FFFFFF" />
          
          <circle cx="300" cy="190" r="14" fill="#0F172A" />
          <circle cx="305" cy="185" r="4" fill="#FFFFFF" />
        </motion.g>

        {/* Nose & Mouth */}
        <path d="M240 220 Q250 228 260 220" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
        <ellipse cx="250" cy="214" rx="10" ry="6" fill="#0F172A" />
        
        <path d="M245 238 Q250 250 255 238 Z" fill="#FDA4AF" stroke="#E11D48" strokeWidth="2" strokeLinejoin="round" />

        {/* Blush */}
        <ellipse cx="170" cy="210" rx="16" ry="10" fill="#FDA4AF" opacity="0.4" />
        <ellipse cx="330" cy="210" rx="16" ry="10" fill="#FDA4AF" opacity="0.4" />

        {/* Front Paws Holding Bowl */}
        <path d="M150 320 Q120 340 160 380" fill="none" stroke="#FDBA74" strokeWidth="32" strokeLinecap="round" />
        <path d="M350 320 Q380 340 340 380" fill="none" stroke="#FDBA74" strokeWidth="32" strokeLinecap="round" />

        {/* The Bowl */}
        <path d="M140 360 Q250 420 360 360 L330 420 Q250 450 170 420 Z" fill="#34D399" />
        <path d="M180 420 L320 420 L330 430 Q250 460 170 430 Z" fill="#059669" />
        
        {/* Food Details in Bowl */}
        <ellipse cx="250" cy="365" rx="100" ry="20" fill="#FDE68A" />
        <motion.g animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            <circle cx="190" cy="360" r="12" fill="#F59E0B" />
            <circle cx="220" cy="355" r="16" fill="#D97706" />
            <circle cx="260" cy="362" r="14" fill="#F59E0B" />
            <circle cx="300" cy="358" r="18" fill="#D97706" />
            <circle cx="240" cy="370" r="10" fill="#B45309" />
            <circle cx="280" cy="368" r="12" fill="#F59E0B" />
        </motion.g>

        {/* Floating Hearts & Stars / Positive Elements */}
        {/* Heart 1 */}
        <motion.path 
          d="M90 180 A 10 10 0 0 1 110 180 A 10 10 0 0 1 130 180 Q 130 195 110 210 Q 90 195 90 180 Z" 
          fill="#FDA4AF"
          animate={{ y: [0, -20, 0], scale: [0.8, 1, 0.8], rotate: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
        />
        {/* Heart 2 */}
        <motion.path 
          d="M370 120 A 12 12 0 0 1 394 120 A 12 12 0 0 1 418 120 Q 418 138 394 156 Q 370 138 370 120 Z" 
          fill="#F43F5E"
          animate={{ y: [0, -30, 0], scale: [0.9, 1.2, 0.9], rotate: [10, -15, 10], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Twinkling Star/Sparkle 1 */}
        <motion.path 
          d="M100 320 Q120 320 120 300 Q120 320 140 320 Q120 320 120 340 Q120 320 100 320 Z" 
          fill="#FCD34D"
          animate={{ scale: [0.5, 1.5, 0.5], rotate: [0, 90, 180] }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        />
        {/* Twinkling Star/Sparkle 2 */}
        <motion.path 
          d="M380 280 Q395 280 395 265 Q395 280 410 280 Q395 280 395 295 Q395 280 380 280 Z" 
          fill="#34D399"
          animate={{ scale: [0.5, 1.5, 0.5], rotate: [0, -90, -180] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear", delay: 0.5 }}
        />
        {/* Twinkling Star/Sparkle 3 */}
        <motion.path 
          d="M200 60 Q210 60 210 50 Q210 60 220 60 Q210 60 210 70 Q210 60 200 60 Z" 
          fill="#818CF8"
          animate={{ scale: [0.5, 1.2, 0.5], rotate: [0, 45, 90] }}
          transition={{ repeat: Infinity, duration: 4, ease: "linear", delay: 1.5 }}
        />

        <defs>
          <radialGradient id="mascot-glow" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
            <stop offset="0%" stopColor="#34D399" stopOpacity="1" />
            <stop offset="100%" stopColor="#34D399" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
};
