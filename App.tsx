import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeScreen } from './components/WelcomeScreen';
import { IconGrid } from './components/IconGrid';
import { RestaurantsScreen } from './components/RestaurantsScreen';
import { DirectionsScreen } from './components/DirectionsScreen';
import { GuideScreen } from './components/GuideScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { ToursScreen } from './components/ToursScreen';
import { WifiScreen } from './components/WifiScreen';
import { ScreenName } from './types';
import { Wifi, LogOut } from 'lucide-react';

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const ease = [0.16, 1, 0.3, 1] as const;

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('WELCOME');
  const [time, setTime] = useState<Date>(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = useMemo(() => {
    const h = time.getHours();
    if (h >= 5 && h < 12) return 'Bom dia';
    if (h >= 12 && h < 18) return 'Boa tarde';
    return 'Boa noite';
  }, [time.getHours()]);

  const navigateTo = useCallback((screen: ScreenName) => {
    setCurrentScreen(screen);
  }, []);

  const renderScreen = useCallback(() => {
    switch (currentScreen) {
      case 'WELCOME':
        return <WelcomeScreen onStart={() => navigateTo('MENU')} />;
      case 'RESTAURANTS':
        return <RestaurantsScreen onBack={() => navigateTo('MENU')} />;
      case 'DIRECTIONS':
        return <DirectionsScreen onBack={() => navigateTo('MENU')} />;
      case 'GUIDE':
        return <GuideScreen onBack={() => navigateTo('MENU')} />;
      case 'SERVICES':
        return <ServicesScreen onBack={() => navigateTo('MENU')} />;
      case 'TOURS':
        return <ToursScreen onBack={() => navigateTo('MENU')} />;
      case 'WIFI':
        return <WifiScreen onBack={() => navigateTo('MENU')} />;
      case 'MENU':
      default:
        return (
          <div className="h-full flex flex-col bg-sand-50 relative overflow-hidden">
            {/* Header */}
            <div className="pt-14 pb-4 px-5 bg-white/80 backdrop-blur-sm z-10 flex justify-between items-center border-b border-sand-100">
              <div>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-sand-400" />
                  <p className="text-[9px] uppercase tracking-[0.28em] text-sand-400 font-semibold">Monte Verde · MG</p>
                </div>
                <h1 className="font-serif text-[22px] text-charcoal-900 leading-snug">
                  Olá, Hóspede.
                  <span className="italic text-sand-500 font-normal text-base ml-2">Aproveite.</span>
                </h1>
              </div>
              <motion.button
                onClick={() => navigateTo('WELCOME')}
                className="w-9 h-9 flex items-center justify-center bg-sand-100 rounded-full text-sand-500"
                whileHover={{ scale: 1.08, backgroundColor: 'rgb(230, 226, 218)' }}
                whileTap={{ scale: 0.88 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                aria-label="Voltar à tela inicial"
              >
                <LogOut size={15} strokeWidth={1.8} />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              <IconGrid onNavigate={navigateTo} />

              {/* Quote card */}
              <div className="px-5 pb-24 mt-1">
                <motion.div
                  className="relative overflow-hidden rounded-[20px] bg-gradient-to-br from-sand-800 to-charcoal-900 p-5 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.22)]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease, delay: 0.55 }}
                >
                  <div className="absolute -top-6 -right-6 w-28 h-28 bg-sand-500 rounded-full blur-[40px] opacity-25 pointer-events-none" />
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-sand-600 rounded-full blur-[30px] opacity-15 pointer-events-none" />
                  <span className="absolute top-3 left-4 font-serif text-5xl text-sand-500/20 leading-none select-none" aria-hidden="true">"</span>
                  <p className="font-serif italic text-sand-100/90 text-[15px] leading-relaxed relative z-10 pt-3 pl-1">
                    O frio de Monte Verde é o abraço que a gente guarda na memória.
                  </p>
                  <div className="flex items-center gap-2 mt-3 relative z-10">
                    <div className="w-6 h-px bg-sand-500/50" />
                    <p className="text-sand-400/80 text-[9px] font-medium uppercase tracking-[0.2em]">
                      Bem-vindo à sua estadia
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* WhatsApp Floating Button */}
            <motion.a
              href="https://wa.me/5535984691082?text=Ol%C3%A1%2C%20sou%20h%C3%B3spede%20e%20preciso%20de%20ajuda!"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a pousada pelo WhatsApp"
              className="absolute bottom-6 right-5 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-900/25 border-2 border-white/80"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.45 }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.9 }}
            >
              <WhatsAppIcon className="text-white w-7 h-7" />
            </motion.a>
          </div>
        );
    }
  }, [currentScreen, navigateTo, greeting]);

  return (
    <div className="w-full min-h-screen flex justify-center items-start font-sans relative overflow-y-auto py-6 lg:py-4">
      {/* Background */}
      <div
        className="fixed inset-0 z-[-1] bg-stone-900"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1600&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="fixed inset-0 bg-gradient-to-br from-black/85 via-sand-900/60 to-black/85 backdrop-blur-[14px] z-0" />

      <div className="w-full max-w-6xl px-4 py-4 lg:py-0 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center justify-center mx-auto">

        {/* ── LEFT PANEL ── */}
        <div className="flex flex-col text-white col-span-12 lg:col-span-7 space-y-4 lg:space-y-5 lg:pr-6 order-2 lg:order-1 pb-6 lg:pb-0 w-full max-w-[380px] mx-auto lg:max-w-none lg:mx-0">

          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-sand-400 font-medium">
              Ao lado → o que o seu hóspede vai ver
            </p>
            <h1 className="font-serif text-4xl lg:text-6xl font-medium tracking-tight leading-tight text-white">
              Seu hóspede nunca mais vai te perguntar<br />
              <span className="italic text-sand-300 font-normal">"qual é a senha do Wi-Fi?"</span>
            </h1>
            <p className="text-sand-200/80 text-sm lg:text-lg font-light max-w-lg leading-relaxed">
              O <strong className="text-sand-100 font-semibold">Guia Digital</strong> é um link personalizado que você manda na reserva. O hóspede abre no celular e encontra tudo — antes de chegar.
            </p>
          </motion.div>

          {/* Clock & Date widgets */}
          <motion.div
            className="grid grid-cols-2 gap-3.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.28 }}
          >
            <div className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-4 border border-white/5 shadow-inner-light">
              <span className="text-[9px] lg:text-[11px] text-sand-400 uppercase tracking-[0.15em] block mb-1">Horário Local</span>
              <div className="font-mono text-xl lg:text-3xl font-medium text-white">
                {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
              <span className="text-[11px] lg:text-sm text-sand-300/80 font-light capitalize">
                {greeting}, aproveite o dia!
              </span>
            </div>

            <div className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-4 border border-white/5 shadow-inner-light">
              <span className="text-[9px] lg:text-[11px] text-sand-400 uppercase tracking-[0.15em] block mb-1">Data de Hoje</span>
              <div className="text-sm lg:text-xl font-serif font-semibold text-white truncate">
                {time.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short' })} • {time.toLocaleDateString('pt-BR', { weekday: 'short' })}
              </div>
              <span className="text-[11px] lg:text-sm text-sand-300/80 font-light capitalize block mt-0.5">
                {time.toLocaleDateString('pt-BR', { year: 'numeric' })} • Monte Verde, MG
              </span>
            </div>
          </motion.div>

          {/* Sale card */}
          <motion.div
            className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-5 border border-white/5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.44 }}
          >
            <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-400/30 rounded-full px-2.5 py-1 mb-2">
              <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold">5 vagas • 50% OFF no 1º mês</span>
            </div>

            <h4 className="font-serif text-base lg:text-lg font-semibold text-white leading-snug">
              Pare de perder estrelas no Booking por dúvidas que poderiam ter sido respondidas antes do hóspede chegar.
            </h4>
            <p className="text-sm lg:text-base text-sand-300 font-light leading-relaxed mt-2">
              O <span className="text-sand-100 font-semibold">Guia Digital</span> entrega 1 link com tudo que o hóspede precisa — antes do check-in. Menos atrito, menos WhatsApp, menos avaliação ruim.
            </p>

            <ul className="mt-3 text-sm lg:text-base text-sand-300 list-none space-y-2">
              <li>✅ <span className="text-sand-100 font-medium">Reduz avaliação ruim</span> por "não sabia que…"</li>
              <li>✅ <span className="text-sand-100 font-medium">30 min/semana</span> economizados respondendo o óbvio</li>
              <li>✅ <span className="text-sand-100 font-medium">Visual premium</span> — eleva a percepção da sua pousada</li>
              <li>✅ <span className="text-sand-100 font-medium">Eu monto tudo</span> em 48h, você não mexe em nada</li>
            </ul>

            <div className="mt-3 flex items-center gap-2 text-xs text-sand-400">
              <div className="flex -space-x-1.5" aria-hidden="true">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border border-sand-900" />
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border border-sand-900" />
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 border border-sand-900" />
              </div>
              <span>Pousadas em Monte Verde já testando</span>
            </div>

            <div className="mt-4 bg-white/5 rounded-xl p-3 border border-white/10 space-y-2">
              <div className="flex items-baseline justify-between">
                <span className="text-sand-400 text-xs uppercase tracking-wider">Instalação (única vez)</span>
                <span className="text-white font-bold text-base">R$ 60</span>
              </div>
              <div className="h-px bg-white/10" />
              <div className="flex items-baseline justify-between">
                <span className="text-sand-400 text-xs uppercase tracking-wider">Mensalidade</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-sand-500 text-xs line-through">R$ 158</span>
                  <span className="text-white font-bold text-base">R$ 79<span className="text-sand-400 text-xs font-light">/mês</span></span>
                </div>
              </div>
              <div className="h-px bg-white/10" />
              <p className="text-sand-400 text-xs font-light">Sem fidelidade • Domínio próprio incluso • Suporte via WhatsApp</p>
            </div>

            <motion.a
              href="https://wa.me/5535984691082?text=Ol%C3%A1%20Vitor%2C%20quero%20uma%20das%205%20vagas%20com%2050%25%20OFF%20do%20Guia%20Digital%21"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow mt-4 inline-flex items-center justify-center gap-2 w-full bg-emerald-500 text-emerald-950 font-semibold text-sm lg:text-base rounded-xl px-4 py-3.5 shadow-lg shadow-emerald-500/20"
              whileHover={{ scale: 1.02, backgroundColor: '#34d399' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Quero garantir minha vaga
            </motion.a>
            <p className="mt-2 text-xs text-sand-500 text-center font-light select-text">
              Resposta em até 1h • (35) 98469-1082
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT PANEL: Phone mockup ── */}
        <motion.div
          className="col-span-12 lg:col-span-5 flex justify-center items-center w-full self-center order-1 lg:order-2"
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.05 }}
        >
          <div className="w-[320px] h-[680px] sm:h-[700px] sm:w-[380px] bg-black rounded-[48px] shadow-2xl relative border-[8px] border-black ring-1 ring-white/10 box-border flex flex-col overflow-hidden mx-auto">

            {/* Screen with AnimatePresence transitions */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                className="w-full h-full bg-sand-50 relative overflow-hidden rounded-[40px] flex-1"
                initial={{ opacity: 0, scale: 0.985, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.985, y: -6 }}
                transition={{ duration: 0.28, ease }}
              >
                {renderScreen()}
              </motion.div>
            </AnimatePresence>

            {/* iOS Home Bar */}
            <div className="block absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/20 rounded-full z-50 backdrop-blur-sm pointer-events-none" />

            {/* Status Bar */}
            <div className="flex absolute top-2.5 left-0 right-0 z-50 justify-between px-8 items-center pointer-events-none text-white mix-blend-difference">
              <span className="text-xs font-semibold tracking-wide">
                {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
              </span>
              <div className="flex gap-1.5 items-center">
                <Wifi size={14} className="opacity-80" />
                <div className="w-5 h-3 border-[1.2px] border-current rounded-[3px] relative opacity-80">
                  <div className="bg-current h-full w-[80%] rounded-[1px]" />
                  <div className="absolute top-0.5 -right-0.5 w-0.5 h-1.5 bg-current rounded-r-xs" />
                </div>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default App;
