import React, { useState } from 'react';
import { Wifi, Copy, Info, Check } from 'lucide-react';

interface WifiScreenProps {
  onBack: () => void;
}

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
      <button
        onClick={onBack}
        className="absolute top-14 left-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
        aria-label="Voltar"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <div className="w-full max-w-sm">
        <div className="mx-auto bg-gradient-to-br from-sand-500 to-sand-700 w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl shadow-sand-500/20 rotate-3 border border-white/10">
          <Wifi size={42} className="text-white" />
        </div>

        <div className="text-center mb-12">
          <h3 className="font-serif text-3xl text-sand-50 mb-3 tracking-wide">Wi-Fi do Hóspede</h3>
          <p className="text-sand-300 text-sm font-light leading-relaxed">
            Conecte-se e compartilhe seus<br />momentos em Monte Verde.
          </p>
        </div>

        <div className="space-y-4">
          {/* Network name */}
          <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
            <div className="flex items-center gap-3 mb-2">
              <Info size={14} className="text-sand-400" />
              <p className="text-[10px] text-sand-400 uppercase tracking-[0.2em]">Rede</p>
            </div>
            <p className="font-medium text-xl tracking-wide text-white ml-6">VillaVerde_Guest</p>
          </div>

          {/* Password with copy feedback */}
          <div
            className={`bg-white/5 backdrop-blur-lg p-6 rounded-2xl border flex items-center justify-between group cursor-pointer transition-all active:scale-[0.98] ${
              copied ? 'border-emerald-400/50 bg-emerald-500/10' : 'border-white/10 hover:bg-white/10'
            }`}
            onClick={handleCopy}
            role="button"
            aria-label="Copiar senha do Wi-Fi"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Info size={14} className="text-sand-400" />
                <p className="text-[10px] text-sand-400 uppercase tracking-[0.2em]">Senha</p>
              </div>
              <p className="font-mono text-xl text-sand-200 ml-6 tracking-wide">monteverde2024</p>
            </div>
            <div className={`p-3 rounded-xl border transition-all ${
              copied ? 'bg-emerald-500/20 border-emerald-400/30' : 'bg-white/10 border-white/5'
            }`}>
              {copied
                ? <Check size={20} className="text-emerald-400" />
                : <Copy size={20} className="text-sand-200 group-hover:text-white transition-colors" />
              }
            </div>
          </div>
        </div>

        <p className="text-center text-white/20 text-[10px] mt-16 uppercase tracking-widest">
          {copied ? '✓ Copiado para a área de transferência' : 'Toque para copiar'}
        </p>
      </div>
    </div>
  );
};
