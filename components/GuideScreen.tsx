import React, { useState } from 'react';
import { ArrowLeft, Flame, ShieldAlert, Moon, Sparkles, HelpCircle, Sun } from 'lucide-react';

interface GuideScreenProps {
  onBack: () => void;
}

type GuideTab = 'rules' | 'fireplace' | 'general';

export const GuideScreen: React.FC<GuideScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<GuideTab>('rules');

  return (
    <div className="h-full flex flex-col bg-sand-50">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-sand-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-sand-100 transition-colors text-charcoal-900" id="btn-guide-back">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h2 className="font-serif text-lg font-bold text-charcoal-900 tracking-wide">Guia & Regras</h2>
        <div className="w-8" />
      </div>

      {/* Tabs */}
      <div className="flex bg-white px-6 py-2 gap-2 border-b border-sand-100">
        {[
          { id: 'rules', label: 'Regras', icon: ShieldAlert },
          { id: 'fireplace', label: 'Lareira', icon: Flame },
          { id: 'general', label: 'Dicas Úteis', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as GuideTab)}
              className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs font-semibold ${
                isSelected 
                  ? 'bg-sand-800 text-white shadow-md shadow-sand-900/10' 
                  : 'text-sand-500 hover:bg-sand-50'
              }`}
            >
              <Icon size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
        
        {activeTab === 'rules' && (
          <div className="space-y-4 animate-fade-in" id="panel-rules">
            <div className="bg-white rounded-2xl p-5 border border-sand-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-sand-800">
                <Moon size={18} className="text-sand-600" />
                <h3 className="font-serif text-base font-semibold">Horário de Silêncio</h3>
              </div>
              <p className="text-sm font-light text-charcoal-800 leading-relaxed">
                Para manter a paz de nossa reserva alpina, solicitamos silêncio absoluto entre as <strong className="font-medium text-sand-800">22:00 e as 08:00</strong>. Som alto ou ruídos excessivos não são permitidos nesse intervalo.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-sand-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-sand-800">
                <Sun size={18} className="text-sand-600" />
                <h3 className="font-serif text-base font-semibold">Check-in & Check-out</h3>
              </div>
              <ul className="text-sm font-light text-charcoal-800 leading-relaxed space-y-2 list-none">
                <li><strong className="font-medium text-sand-800">✓ Check-in:</strong> A partir das 14:00. Na recepção ou via autoatendimento.</li>
                <li><strong className="font-medium text-sand-800">✓ Check-out:</strong> Até às 12:00. Solicitamos que envie uma mensagem avisando sua saída e entregue as chaves na recepção.</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-sand-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-sand-800">
                <Sparkles size={18} className="text-sand-600" />
                <h3 className="font-serif text-base font-semibold">Cuidado Ambiental</h3>
              </div>
              <p className="text-sm font-light text-charcoal-800 leading-relaxed">
                Monte Verde abriga uma biodiversidade única. Ajude-nos apagando as luzes e o aquecedor ao sair de seu chalé, evite o desperdício de água e descarte o lixo reciclável nas lixeiras indicadas.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'fireplace' && (
          <div className="space-y-4 animate-fade-in" id="panel-fireplace">
            <div className="bg-sand-900 rounded-3xl p-6 text-white relative overflow-hidden shadow-xl">
              <div className="absolute right-0 bottom-0 opacity-10">
                <Flame size={120} />
              </div>
              <div className="flex items-center gap-2 mb-4">
                <Flame size={20} className="text-amber-400" />
                <h3 className="font-serif text-lg font-semibold tracking-wide">Acendendo a Lareira</h3>
              </div>
              <p className="text-xs text-sand-200 font-light leading-relaxed mb-4">
                Deixamos um kit de lenha e acendalha pronto em seu chalé. Siga os passos para um clima aconchegante e seguro:
              </p>
              
              <div className="space-y-3">
                {[
                  { step: "1", text: "Abra a chapa metálica de saída de fumaça (duto traseiro) antes de acender." },
                  { step: "2", text: "Posicione duas toras paralelas paralelas e a acendalha ecológica no centro." },
                  { step: "3", text: "Acenda a acendalha e coloque pequenas lascas de madeira por cima até pegar fogo." },
                  { step: "4", text: "Adicione as toras maiores gradualmente conforme o fogo se estabilizar." }
                ].map((s, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-400 flex items-center justify-center text-xs font-bold shrink-0">{s.step}</span>
                    <p className="text-xs font-light text-sand-100 leading-normal">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-red-50/50 rounded-2xl p-5 border border-red-150 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-red-800">
                <ShieldAlert size={18} />
                <h3 className="font-serif text-base font-semibold">Segurança Importante</h3>
              </div>
              <ul className="text-xs font-light text-red-900 leading-relaxed space-y-2 list-disc pl-4">
                <li>Nunca deixe a lareira acesa sem supervisão direta ou ao deitar-se.</li>
                <li>Mantenha a grelha de proteção fechada para evitar faíscas no carpete alpino.</li>
                <li>Caso deseje lenha extra, toque no botão de WhatsApp para solicitar (R$ 30 o fardo extra).</li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'general' && (
          <div className="space-y-4 animate-fade-in" id="panel-general">
            <div className="bg-white rounded-2xl p-5 border border-sand-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-sand-800">
                <HelpCircle size={18} className="text-sand-600" />
                <h3 className="font-serif text-base font-semibold">Toalhas e Roupa de Cama</h3>
              </div>
              <p className="text-sm font-light text-charcoal-800 leading-relaxed">
                Em nossa pousada ecológica, trocamos roupas de cama e toalhas a cada <strong className="font-medium text-sand-800">3 dias de estadia</strong>. Caso precise de reposição ou secagem de emergência, basta acionar nossa recepção via WhatsApp.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-sand-100 shadow-sm">
              <div className="flex items-center gap-2 mb-3 text-sand-800">
                <Flame size={18} className="text-sand-600" />
                <h3 className="font-serif text-base font-semibold">Ducha & Aquecimento</h3>
              </div>
              <p className="text-sm font-light text-charcoal-800 leading-relaxed">
                Nossos chuveiros usam aquecimento a gás central ecológico. Ao abrir a torneira, aguarde cerca de 1 minuto para estabilizar a água quente. Gire o controle esquerdo para ajustar com precisão.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl p-5 border border-sand-100 shadow-sm">
              <p className="text-center font-serif text-sm italic text-sand-600">
                "Qualquer outra dúvida, estamos a uma mensagem de distância!"
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
