import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Snowflake, MapPin } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

const images = [
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542718610-a1d656d1884c?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee?q=80&w=1000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1585543805890-6051f7829f98?q=80&w=1000&auto=format&fit=crop",
];

const ease = [0.16, 1, 0.3, 1] as const;

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setMousePos({
      x: ((e.clientX - rect.left - cx) / cx) * 10,
      y: ((e.clientY - rect.top - cy) / cy) * 10,
    });
  };

  const handleMouseLeave = () => setMousePos({ x: 0, y: 0 });

  return (
    <div
      ref={containerRef}
      className="h-full flex flex-col relative bg-charcoal-900 overflow-hidden font-sans"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Parallax background images */}
      <div className="absolute inset-0 z-0" style={{ overflow: 'hidden' }}>
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
              index === currentImage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/85 z-10" />
            <img
              src={img}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover"
              style={{
                transform: `scale(1.1) translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)`,
                transition: 'transform 0.1s ease-out',
              }}
            />
          </div>
        ))}
      </div>

      {/* Vignette overlay */}
      <div
        className="absolute inset-0 z-1 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />

      {/* Temperature badge — floating */}
      <motion.div
        className="absolute top-14 right-4 z-20 flex gap-2"
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease, delay: 1.1 }}
        style={{
          transform: `translate(${mousePos.x * -0.15}px, ${mousePos.y * -0.15}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        <motion.div
          className="flex items-center gap-1.5 bg-black/25 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10"
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Snowflake size={12} className="text-blue-200" />
          <span className="text-[11px] font-medium text-white/90">12°C</span>
        </motion.div>
      </motion.div>

      {/* Main content */}
      <div
        className="relative z-20 flex-1 flex flex-col justify-end pb-10 px-6"
        style={{
          transform: `translate(${mousePos.x * 0.08}px, ${mousePos.y * 0.08}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Location tag */}
        <motion.div
          className="inline-flex items-center gap-2 text-sand-300 mb-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="w-4 h-px bg-sand-400" />
          <MapPin size={12} />
          <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Monte Verde • MG</span>
        </motion.div>

        {/* Text reveals */}
        <div className="mb-8 space-y-1">
          {/* "Pousada" */}
          <div className="text-reveal-line">
            <motion.span
              className="text-white/70 font-serif text-2xl font-light italic"
              style={{ display: 'block' }}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.5 }}
            >
              Pousada
            </motion.span>
          </div>

          {/* "Villa Verde" */}
          <div className="text-reveal-line">
            <motion.span
              className="text-white font-serif text-4xl font-semibold tracking-wide leading-none drop-shadow-lg"
              style={{ display: 'block' }}
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.75, ease, delay: 0.68 }}
            >
              Villa Verde
            </motion.span>
          </div>

          {/* Divider */}
          <motion.div
            className="h-px w-12 bg-sand-400/60 my-3"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            style={{ originX: 0 }}
            transition={{ duration: 0.5, delay: 0.85 }}
          />

          {/* Subtitle */}
          <motion.div
            className="text-white/75 text-[13px] font-light leading-relaxed border-l-2 border-sand-500/60 pl-3 max-w-[240px]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.9 }}
          >
            O charme dos Alpes com a hospitalidade de Minas.
          </motion.div>
        </div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 1.05 }}
        >
          <motion.button
            onClick={onStart}
            className="group btn-glow w-full bg-white/10 backdrop-blur-md border border-white/20 p-1 rounded-[2rem] flex items-center justify-between"
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.18)', borderColor: 'rgba(255,255,255,0.3)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <span className="pl-5 text-[11px] text-white uppercase tracking-[0.2em] font-medium group-hover:pl-7 transition-all duration-300">
              Acessar Guia
            </span>
            <motion.div
              className="h-11 w-11 bg-white rounded-full flex items-center justify-center text-charcoal-900 shadow-lg flex-shrink-0"
              whileHover={{ rotate: 90 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <ChevronRight size={18} />
            </motion.div>
          </motion.button>
        </motion.div>

        {/* Pagination dots */}
        <motion.div
          className="flex justify-center gap-2 mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          {images.map((_, idx) => (
            <motion.button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              aria-label={`Imagem ${idx + 1}`}
              className={`h-[3px] rounded-full ${
                idx === currentImage ? 'bg-white' : 'bg-white/30 hover:bg-white/50'
              }`}
              animate={{ width: idx === currentImage ? 32 : 8 }}
              transition={{ duration: 0.4, ease }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};
