import React, { useState, useMemo, useCallback } from 'react';
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

// Custom WhatsApp Icon Component
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

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('WELCOME');
  const [time, setTime] = useState<Date>(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // useMemo — recalcula só quando o horário muda de período, não a cada segundo
  const greeting = useMemo(() => {
    const h = time.getHours();
    if (h >= 5 && h < 12) return 'Bom dia';
    if (h >= 12 && h < 18) return 'Boa tarde';
    return 'Boa noite';
  }, [time.getHours()]);

  // useCallback — evita recriar a função a cada render
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
            <div className="pt-16 pb-6 px-8 bg-sand-50 z-10 flex justify-between items-start border-b border-sand-100/50">
              <div>
                <p className="text-[10px] uppercase tracking-[0.25em] text-sand-500 mb-3 font-medium">Monte Verde • MG</p>
                <h1 className="font-serif text-3xl text-charcoal-900 leading-tight">
                  Olá, Hóspede.<br />
                  <span className="italic text-sand-600 font-medium text-lg">Aproveite o clima.</span>
                </h1>
              </div>
              <button
                onClick={() => navigateTo('WELCOME')}
                className="p-3 bg-white rounded-full text-sand-400 hover:text-charcoal-900 hover:bg-sand-100 transition-all shadow-sm border border-sand-100"
                aria-label="Voltar à tela inicial"
                title="Início"
              >
                <LogOut size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto pb-12 no-scrollbar px-2">
              <IconGrid onNavigate={navigateTo} />

              <div className="mt-4 mb-24 px-8">
                <div className="bg-sand-800 rounded-[2rem] p-8 text-center shadow-card relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-sand-600 rounded-full blur-[80px] opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-sand-500 rounded-full blur-[60px] opacity-10 pointer-events-none" />
                  <p className="font-serif italic text-sand-100 text-xl mb-3 relative z-10 leading-relaxed">
                    "O lugar onde o frio é apenas um detalhe acolhedor."
                  </p>
                  <div className="w-12 h-px bg-sand-500/30 mx-auto my-4" />
                  <p className="text-sand-400 text-[10px] font-medium uppercase tracking-[0.2em] relative z-10">
                    Bem-vindo à sua estadia
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Floating Button — contato da pousada */}
            <a
              href="https://wa.me/5535984691082?text=Ol%C3%A1%2C%20sou%20h%C3%B3spede%20e%20preciso%20de%20ajuda!"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Falar com a pousada pelo WhatsApp"
              className="absolute bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-green-900/20 hover:scale-105 transition-all duration-300 active:scale-95 border-2 border-white"
            >
              <WhatsAppIcon className="text-white w-8 h-8" />
            </a>
          </div>
        );
    }
  }, [currentScreen, navigateTo, greeting]);

  return (
    <div className="w-full min-h-screen flex justify-center items-start font-sans relative overflow-y-auto py-6 lg:py-4">
      {/* Background fixo com fallback de cor */}
      <div
        className="fixed inset-0 z-[-1] bg-stone-900"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1600&auto=format&fit=crop')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/85 via-sand-900/60 to-black/85 backdrop-blur-[14px] z-0" />

      {/* Container principal */}
      <div className="w-full max-w-6xl px-4 py-4 lg:py-0 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center justify-center mx-auto">

        {/* ── PAINEL ESQUERDO: Pitch para o dono da pousada ── */}
        <div className="flex flex-col text-white col-span-12 lg:col-span-7 space-y-4 lg:space-y-5 lg:pr-6 order-2 lg:order-1 pb-6 lg:pb-0 w-full max-w-[380px] mx-auto lg:max-w-none lg:mx-0">

          {/* Headline B2B — fala com o DONO da pousada */}
          <div className="space-y-3">
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
          </div>

          {/* Clock & Date widgets */}
          <div className="grid grid-cols-2 gap-3.5">
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
          </div>

          {/* Card de venda */}
          <div className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-5 border border-white/5">
              {/* Selo urgência */}
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

              {/* Mini prova social */}
              <div className="mt-3 flex items-center gap-2 text-xs text-sand-400">
                <div className="flex -space-x-1.5" aria-hidden="true">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border border-sand-900" />
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border border-sand-900" />
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 border border-sand-900" />
                </div>
                <span>Pousadas em Monte Verde já testando</span>
              </div>

              {/* Preço com taxa de instalação */}
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

              {/* CTA — botão WhatsApp real */}
              <a
                href="https://wa.me/5535984691082?text=Ol%C3%A1%20Vitor%2C%20quero%20uma%20das%205%20vagas%20com%2050%25%20OFF%20do%20Guia%20Digital%21"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold text-sm lg:text-base rounded-xl px-4 py-3.5 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Quero garantir minha vaga
              </a>
              <p className="mt-2 text-xs text-sand-500 text-center font-light select-text">
                Resposta em até 1h • (35) 98469-1082
              </p>
          </div>
        </div>

        {/* ── PAINEL DIREITO: Mockup do celular ── */}
        <div className="col-span-12 lg:col-span-5 flex justify-center items-center w-full self-center order-1 lg:order-2">
          <div className="w-[320px] h-[680px] sm:h-[700px] sm:w-[380px] bg-black rounded-[48px] shadow-2xl relative border-[8px] border-black ring-1 ring-white/10 box-border flex flex-col justify-between overflow-hidden mx-auto">

            {/* Conteúdo da tela */}
            <div className="w-full h-full bg-sand-50 relative overflow-hidden rounded-[40px] flex-1">
              {renderScreen()}
            </div>

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
        </div>

      </div>
    </div>
  );
};

export default App;
