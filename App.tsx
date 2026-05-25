import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { IconGrid } from './components/IconGrid';
import { RestaurantsScreen } from './components/RestaurantsScreen';
import { DirectionsScreen } from './components/DirectionsScreen';
import { GuideScreen } from './components/GuideScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { ToursScreen } from './components/ToursScreen';

import { ScreenName } from './types';
import { Wifi, Copy, Info, LogOut } from 'lucide-react';

// Custom WhatsApp Icon Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('WELCOME');
  const [time, setTime] = useState<Date>(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hours = time.getHours();
    if (hours >= 5 && hours < 12) return 'Bom dia';
    if (hours >= 12 && hours < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'WELCOME':
        return <WelcomeScreen onStart={() => setCurrentScreen('MENU')} />;
      case 'RESTAURANTS':
        return <RestaurantsScreen onBack={() => setCurrentScreen('MENU')} />;
      case 'DIRECTIONS':
        return <DirectionsScreen onBack={() => setCurrentScreen('MENU')} />;
      case 'GUIDE':
        return <GuideScreen onBack={() => setCurrentScreen('MENU')} />;
      case 'SERVICES':
        return <ServicesScreen onBack={() => setCurrentScreen('MENU')} />;
      case 'TOURS':
        return <ToursScreen onBack={() => setCurrentScreen('MENU')} />;

      case 'WIFI':
         return (
             <div className="h-full flex flex-col items-center justify-center bg-sand-900 text-white p-8 relative">
                <button onClick={() => setCurrentScreen('MENU')} className="absolute top-14 left-6 p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <div className="w-full max-w-sm">
                    <div className="mx-auto bg-gradient-to-br from-sand-500 to-sand-700 w-24 h-24 rounded-[2rem] flex items-center justify-center mb-10 shadow-2xl shadow-sand-500/20 rotate-3 border border-white/10">
                        <Wifi size={42} className="text-white" />
                    </div>
                    <div className="text-center mb-12">
                        <h3 className="font-serif text-3xl text-sand-50 mb-3 tracking-wide">Wi-Fi do Hóspede</h3>
                        <p className="text-sand-300 text-sm font-light leading-relaxed">Conecte-se e compartilhe seus<br/>momentos em Monte Verde.</p>
                    </div>
                    
                    <div className="space-y-4">
                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 transition-colors">
                            <div className="flex items-center gap-3 mb-2">
                                <Info size={14} className="text-sand-400"/>
                                <p className="text-[10px] text-sand-400 uppercase tracking-[0.2em]">Rede</p>
                            </div>
                            <p className="font-medium text-xl tracking-wide text-white ml-6">VillaVerde_Guest</p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 flex items-center justify-between group cursor-pointer hover:bg-white/10 transition-colors active:scale-[0.98]"
                             onClick={() => {
                                 navigator.clipboard.writeText("monteverde2024");
                             }}>
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <Info size={14} className="text-sand-400"/>
                                    <p className="text-[10px] text-sand-400 uppercase tracking-[0.2em]">Senha</p>
                                </div>
                                <p className="font-mono text-xl text-sand-200 ml-6 tracking-wide">monteverde2024</p>
                            </div>
                            <div className="bg-white/10 p-3 rounded-xl border border-white/5">
                                <Copy size={20} className="text-sand-200 group-hover:text-white transition-colors"/>
                            </div>
                        </div>
                    </div>
                    
                    <p className="text-center text-white/20 text-[10px] mt-16 uppercase tracking-widest">Toque para copiar</p>
                </div>
             </div>
         );
      case 'MENU':
      default:
        return (
          <div className="h-full flex flex-col bg-sand-50 relative overflow-hidden">
             {/* Header */}
             <div className="pt-16 pb-6 px-8 bg-sand-50 z-10 flex justify-between items-start border-b border-sand-100/50">
                <div>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-sand-500 mb-3 font-medium">Monte Verde • MG</p>
                    <h1 className="font-serif text-3xl text-charcoal-900 leading-tight">
                      Olá, Hóspede.<br/>
                      <span className="italic text-sand-600 font-medium text-lg">Aproveite o clima.</span>
                    </h1>
                </div>
                
                {/* Back to Home Button */}
                <button 
                  onClick={() => setCurrentScreen('WELCOME')}
                  className="p-3 bg-white rounded-full text-sand-400 hover:text-charcoal-900 hover:bg-sand-100 transition-all shadow-sm border border-sand-100"
                  title="Sair"
                >
                  <LogOut size={18} strokeWidth={1.5} />
                </button>
             </div>

             {/* Content */}
             <div className="flex-1 overflow-y-auto pb-12 no-scrollbar px-2">
                <IconGrid onNavigate={setCurrentScreen} />
                
                <div className="mt-4 mb-24 px-8">
                    <div className="bg-sand-800 rounded-[2rem] p-8 text-center shadow-card relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-sand-600 rounded-full blur-[80px] opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-sand-500 rounded-full blur-[60px] opacity-10 pointer-events-none"></div>
                        
                        <p className="font-serif italic text-sand-100 text-xl mb-3 relative z-10 leading-relaxed">
                          "O lugar onde o frio é apenas um detalhe acolhedor."
                        </p>
                        <div className="w-12 h-px bg-sand-500/30 mx-auto my-4"></div>
                        <p className="text-sand-400 text-[10px] font-medium uppercase tracking-[0.2em] relative z-10">
                          Recepção 24h
                        </p>
                    </div>
                </div>
             </div>

             {/* WhatsApp Floating Button */}
             <a 
               href="https://wa.me/5535984687353?text=Ol%C3%A1%20Vitor%2C%20vi%20o%20demo%20do%20Guia%20Digital%20e%20quero%20saber%20mais%21"
               target="_blank"
               rel="noopener noreferrer"
               className="absolute bottom-6 right-6 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-green-900/20 hover:scale-105 transition-all duration-300 active:scale-95 group border-2 border-white"
             >
               <WhatsAppIcon className="text-white w-8 h-8" />
             </a>
          </div>
        );
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-start font-sans relative overflow-y-auto select-none py-6 lg:py-4">
        {/* Fixed background image — stays in place while content scrolls */}
        <div
          className="fixed inset-0 z-[-1]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1600&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Fixed glassmorphic overlay */}
        <div className="fixed inset-0 bg-gradient-to-br from-black/85 via-sand-900/60 to-black/85 backdrop-blur-[14px] z-0"></div>

        {/* Outer Content Container */}
        <div className="w-full max-w-6xl px-4 py-4 lg:py-0 z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start lg:items-center justify-center mx-auto">

            {/* Left Panel: Presentation content — visible on all sizes */}
            <div className="flex flex-col text-white col-span-12 lg:col-span-7 space-y-4 lg:space-y-5 lg:pr-6 order-2 lg:order-1 pb-6 lg:pb-0 w-full max-w-[380px] mx-auto lg:max-w-none lg:mx-0">
                <div className="space-y-2">
                    <h1 className="font-serif text-3xl lg:text-5xl font-medium tracking-tight leading-tight text-white animate-fade-in">
                        Sinta o aconchego de<br />
                        <span className="italic text-sand-300 font-normal font-serif">Monte Verde</span>
                    </h1>
                    <p className="text-sand-200/80 text-xs lg:text-base font-light max-w-lg leading-relaxed">
                        Seja muito bem-vindo ao seu refúgio alpino na Serra da Mantiqueira. Criamos este concierge digital para enriquecer cada detalhe da sua estadia conosco.
                    </p>
                </div>

                {/* Clock & Greeting widget */}
                <div className="grid grid-cols-2 gap-3.5">
                    <div className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-4 border border-white/5 shadow-inner-light">
                        <span className="text-[9px] lg:text-[11px] text-sand-400 uppercase tracking-[0.15em] block mb-1">Horário Local</span>
                        <div className="font-mono text-xl lg:text-3xl font-medium text-white select-all">
                            {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                        </div>
                        <span className="text-[11px] lg:text-sm text-sand-300/80 font-light capitalize">
                            {getGreeting()}, aproveite o dia!
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

                {/* Weather widget placeholder */}
                <div className="bg-white/[0.04] backdrop-blur-md rounded-2xl p-4 border border-white/5 flex items-center gap-3.5">
                    <div className="bg-white/10 p-2.5 rounded-xl border border-white/5 text-amber-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/><circle cx="12" cy="12" r="4"/></svg>
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl lg:text-3xl font-bold font-serif text-white flex items-center">13°C</span>
                            <span className="text-xs text-sand-300/80">•</span>
                            <span className="text-xs lg:text-sm text-sand-300/80 font-medium uppercase tracking-wider">Nublado & Frio</span>
                        </div>
                        <p className="text-[11px] lg:text-sm text-sand-400 font-light">Temperatura ideal para apreciar nossa lareira e um bom vinho artesanal.</p>
                    </div>
                </div>

                {/* Live QR Code syncing helper */}
                <div className="flex gap-3.5 items-start bg-white/[0.04] backdrop-blur-md rounded-2xl p-4 border border-white/5">
                  <div className="bg-white p-2.5 rounded-xl border border-neutral-800 flex items-center justify-center shrink-0 shadow-lg text-charcoal-900">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="2" y="2" width="6" height="6" rx="1" strokeWidth="1.5"/>
                      <rect x="4" y="4" width="2" height="2" fill="currentColor"/>
                      <rect x="16" y="2" width="6" height="6" rx="1" strokeWidth="1.5"/>
                      <rect x="18" y="4" width="2" height="2" fill="currentColor"/>
                      <rect x="2" y="16" width="6" height="6" rx="1" strokeWidth="1.5"/>
                      <rect x="4" y="18" width="2" height="2" fill="currentColor"/>
                      <rect x="10" y="3" width="2" height="2" fill="currentColor" rx="0.5"/>
                      <rect x="13" y="5" width="1" height="2" fill="currentColor"/>
                      <rect x="10" y="8" width="3" height="1.5" fill="currentColor"/>
                      <rect x="10" y="11" width="2" height="2" fill="currentColor" rx="0.5"/>
                      <rect x="3" y="10" width="2" height="2" fill="currentColor" rx="0.5"/>
                      <rect x="6" y="13" width="2" height="1" fill="currentColor"/>
                      <rect x="14" y="10" width="2" height="4" fill="currentColor" rx="0.5"/>
                      <rect x="18" y="10" width="3" height="2" fill="currentColor" rx="0.5"/>
                      <rect x="18" y="14" width="2" height="2" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    {/* Selo de urgência */}
                    <div className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-400/30 rounded-full px-2.5 py-1 mb-2">
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse"></span>
                      <span className="text-[10px] uppercase tracking-wider text-amber-300 font-semibold">5 vagas • 50% OFF no 1º mês</span>
                    </div>

                    <h4 className="font-serif text-sm lg:text-base font-semibold text-white leading-snug">
                      Pare de perder estrelas no Booking por dúvidas que poderiam ter sido respondidas antes do hóspede chegar.
                    </h4>
                    <p className="text-[12px] lg:text-sm text-sand-300 font-light leading-relaxed mt-2">
                      O <span className="text-sand-100 font-medium">Guia Digital</span> entrega 1 link com tudo que o hóspede precisa saber — antes do check-in. Menos atrito, menos WhatsApp, menos avaliação ruim.
                    </p>

                    <ul className="mt-3 text-[12px] lg:text-sm text-sand-300 list-none space-y-1.5">
                      <li>✅ <span className="text-sand-100">Reduz avaliação ruim</span> por "não sabia que…"</li>
                      <li>✅ <span className="text-sand-100">30 min/semana</span> economizados respondendo o óbvio</li>
                      <li>✅ <span className="text-sand-100">Visual premium</span> — eleva a percepção da sua pousada</li>
                      <li>✅ <span className="text-sand-100">Eu monto tudo</span> em 48h, você não mexe em nada</li>
                    </ul>

                    {/* Mini prova social */}
                    <div className="mt-3 flex items-center gap-2 text-[11px] text-sand-400">
                      <div className="flex -space-x-1.5">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 border border-sand-900"></div>
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border border-sand-900"></div>
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-rose-400 to-rose-600 border border-sand-900"></div>
                      </div>
                      <span>Pousadas em Monte Verde já testando</span>
                    </div>

                    <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                      <span className="text-[14px] lg:text-base text-white font-bold">R$ 79<span className="text-[10px] text-sand-400 font-light">/mês</span></span>
                      <span className="text-[10px] text-sand-500 line-through">R$ 158</span>
                      <span className="text-[11px] text-sand-500 font-light">• sem fidelidade • sem taxa de criação</span>
                    </div>

                    {/* CTA real */}
                    <a
                      href="https://wa.me/5535984687353?text=Ol%C3%A1%20Vitor%2C%20quero%20uma%20das%205%20vagas%20com%2050%25%20OFF%20do%20Guia%20Digital%21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-2 w-full bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-semibold text-[12px] lg:text-sm rounded-xl px-4 py-3 transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/20"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      Quero garantir minha vaga
                    </a>
                    <p className="mt-2 text-[10px] text-sand-500 text-center font-light">Resposta em até 1h • (35) 98468-7353</p>
                  </div>
                </div>
            </div>

            {/* Right Panel: Smartphone Frame */}
            <div className="col-span-12 lg:col-span-5 flex justify-center items-center w-full self-center order-1 lg:order-2">
                {/* Phone mockup frame — shows on all screen sizes */}
                <div className="w-[320px] h-[680px] sm:h-[700px] sm:w-[380px] bg-black rounded-[48px] shadow-2xl relative border-[8px] border-black ring-1 ring-white/10 box-border flex flex-col justify-between overflow-hidden mx-auto">

                    {/* Screen Content */}
                    <div className="w-full h-full bg-sand-50 relative overflow-hidden rounded-[40px] flex-1">
                        {renderScreen()}
                    </div>

                    {/* iOS Home Bar Indicator */}
                    <div className="block absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-1.5 bg-black/20 rounded-full z-50 backdrop-blur-sm pointer-events-none"></div>

                    {/* Status Bar Mockup */}
                    <div className="flex absolute top-2.5 left-0 right-0 z-50 justify-between px-8 items-center pointer-events-none text-white mix-blend-difference">
                        <span className="text-xs font-semibold tracking-wide">
                            {time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="flex gap-1.5 items-center">
                            <Wifi size={14} className="opacity-80" />
                            <div className="w-5 h-3 border-[1.2px] border-current rounded-[3px] relative opacity-80">
                                <div className="bg-current h-full w-[80%] rounded-[1px]"></div>
                                <div className="absolute top-0.5 -right-0.5 w-0.5 h-1.5 bg-current rounded-r-xs"></div>
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