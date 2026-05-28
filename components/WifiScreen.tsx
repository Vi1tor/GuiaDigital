import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wifi, Copy, Info, Check } from 'lucide-react';

interface WifiScreenProps {
  onBack: () => void;
}

const ease = [0.16, 1, 0.3, 1] as const;

export const WifiScreen: React.FC<WifiScreenProps> = ({ onBack }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText('monteverde2024').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-sand-900 text-white p-8 relative">

      {/* Back button */}
      <motion.button
        onClick={onBack}
        className="absolute top-14 left-6 p-3 bg-white/10 rounded-full"
        whileHover={{ scale: 1.08, backgroundColor: 'rgba(255,255,255,0.2)' }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        aria-label="Voltar"
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </motion.button>

      <div className="w-full max-w-sm">
        {/* Icon */}
        <motion.div
          className="mx-auto bg-gradient-to-br from-sand-500 to-sand-700 w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl shadow-sand-500/20 border border-white/10"
          initial={{ opacity: 0, scale: 0.7, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 3 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
          whileHover={{ rotate: 0, scale: 1.05 }}
        >
          <Wifi size={42} className="text-white" />
        </motion.div>

        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <h3 className="font-serif text-3xl text-sand-50 mb-3 tracking-wide">Wi-Fi do Hóspede</h3>
          <p className="text-sand-300 text-sm font-light leading-relaxed">
            Conecte-se e compartilhe seus<br />momentos em Monte Verde.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.32 }}
        >
          {/* Network name */}
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Info size={14} className="text-sand-400" />
              <p className="text-[10px] text-sand-400 uppercase tracking-[0.2em]">Rede</p>
            </div>
            <p className="font-medium text-xl tracking-wide text-white ml-6">VillaVerde_Guest</p>
          </div>

          {/* Password with copy */}
          <motion.div
            className={`backdrop-blur-lg p-6 rounded-2xl border flex items-center justify-between cursor-pointer ${
              copied
                ? 'border-emerald-400/50 bg-emerald-500/10'
                : 'bg-white/5 border-white/10'
            }`}
            onClick={handleCopy}
            role="button"
            aria-label="Copiar senha do Wi-Fi"
            whileHover={{ backgroundColor: copied ? 'rgba(16,185,129,0.12)' : 'rgba(255,255,255,0.08)' }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Info size={14} className="text-sand-400" />
                <p className="text-[10px] text-sand-400 uppercase tracking-[0.2em]">Senha</p>
              </div>
              <p className="font-mono text-xl text-sand-200 ml-6 tracking-wide">monteverde2024</p>
            </div>
            <motion.div
              className={`p-3 rounded-xl border transition-colors ${
                copied ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-white/10 border-white/5'
              }`}
              whileTap={{ scale: 0.85 }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <Check size={20} className="text-emerald-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <Copy size={20} className="text-sand-200" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.p
          className="text-center text-white/20 text-[10px] mt-16 uppercase tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                ✓ Copiado para a área de transferência
              </motion.span>
            ) : (
              <motion.span
                key="tap"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                Toque para copiar
              </motion.span>
            )}
          </AnimatePresence>
        </motion.p>
      </div>
    </div>
  );
};
