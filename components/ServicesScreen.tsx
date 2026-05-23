import React, { useState } from 'react';
import { ArrowLeft, Coffee, Wine, Sparkles, MessageSquareText, ChevronRight, Check } from 'lucide-react';

interface ServicesScreenProps {
  onBack: () => void;
}

type ServiceTab = 'breakfast' | 'minibar' | 'spa';

interface MinibarItem {
  id: string;
  name: string;
  desc: string;
  price: string;
  category: 'beer' | 'wine' | 'snack' | 'drink';
}

const MINIBAR_ITEMS: MinibarItem[] = [
  { id: '1', name: 'Cerveja Artesanal Monte Verde', desc: 'Artesanal local tipo IPA ou Weiss, 500ml', price: 'R$ 24,00', category: 'beer' },
  { id: '2', name: 'Vinho Tinto Regional', desc: 'Garrafa selecionada para o friozinho da serra', price: 'R$ 79,00', category: 'wine' },
  { id: '3', name: 'Queijo Minas Curado', desc: 'Tábua cortada na hora com geleia caseira', price: 'R$ 29,00', category: 'snack' },
  { id: '4', name: 'Chocolate Fino de Monte Verde', desc: 'Barra artesanal trufada ou bombons mistos', price: 'R$ 18,00', category: 'snack' },
  { id: '5', name: 'Água Mineral (com/sem gás)', desc: 'Garrafa refrescante local, 500ml', price: 'R$ 6,00', category: 'drink' },
  { id: '6', name: 'Refrigerante em Lata', desc: 'Coca-Cola ou Guaraná, lata de 350ml', price: 'R$ 8,00', category: 'drink' }
];

export const ServicesScreen: React.FC<ServicesScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab ] = useState<ServiceTab>('breakfast');

  return (
    <div className="h-full flex flex-col bg-sand-50">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-sand-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-sand-100 transition-colors text-charcoal-900" id="btn-services-back">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h2 className="font-serif text-lg font-bold text-charcoal-900 tracking-wide">Serviços & Menu</h2>
        <div className="w-8" />
      </div>

      {/* Tabs */}
      <div className="flex bg-white px-6 py-2 gap-2 border-b border-sand-100">
        {[
          { id: 'breakfast', label: 'Café', icon: Coffee },
          { id: 'minibar', label: 'Minibar', icon: Wine },
          { id: 'spa', label: 'Lazer & Spa', icon: Sparkles }
        ].map(tab => {
          const Icon = tab.icon;
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as ServiceTab)}
              className={`flex-1 py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs font-semibold ${
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

      <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
        
        {/* Café da Manhã panel */}
        {activeTab === 'breakfast' && (
          <div className="p-6 space-y-6 animate-fade-in" id="panel-breakfast">
            <div className="h-44 rounded-2xl overflow-hidden relative shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=1000&auto=format&fit=crop" 
                alt="Café da Manhã" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-sand-300">Cesta de Café da Manhã</span>
                <p className="font-serif text-lg">Entregue na sua Cabana</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-sand-150 shadow-sm space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-sand-100">
                <span className="text-xs uppercase font-semibold text-sand-500 tracking-wider">Horário</span>
                <span className="text-sm font-bold text-sand-900">08:30 às 11:00</span>
              </div>
              <p className="text-sm text-charcoal-800 font-light leading-relaxed">
                Nosso café da manhã é um ritual de amor. Servido fresquinho em uma linda <strong className="font-semibold text-sand-800">Cesta de Piquenique Alpina</strong>, deixada silenciosamente na antessala ou varanda do seu chalé, garantindo total privacidade.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-base font-semibold text-charcoal-900 px-1">O que está incluso na Cesta:</h3>
              <div className="bg-white rounded-2xl p-5 border border-sand-100 shadow-sm space-y-3.5">
                {[
                  "Pão de Queijo artesanal assado na hora",
                  "Bolos caseiros do dia (Milho, Cenoura ou Chocolate)",
                  "Geleias de frutas vermelhas e doce de leite locais",
                  "Queijo Minas fresco e frios (Salaminho e Peito de Peru)",
                  "Frutas selecionadas da estação picadas",
                  "Suco natural, Iogurte, Café quente e Chá"
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <div className="bg-emerald-50 text-emerald-600 p-1 rounded-full border border-emerald-100">
                      <Check size={12} strokeWidth={2.5} />
                    </div>
                    <span className="text-xs text-charcoal-800 font-light leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-sand-500/10 rounded-2xl p-4 border border-sand-500/20 text-center">
              <p className="text-xs text-sand-800 font-light">Se tiver alguma restrição alimentar ou intolerância a lactose/glúten, avise-nos via recepção no dia anterior!</p>
            </div>
          </div>
        )}

        {/* Minibar panel */}
        {activeTab === 'minibar' && (
          <div className="p-6 space-y-6 animate-fade-in" id="panel-minibar">
            <div className="bg-white rounded-2xl p-5 border border-sand-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-sand-50 p-2.5 rounded-xl text-sand-600 border border-sand-100">
                  <Wine size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-charcoal-900">Consumo do Chalé</h3>
                  <p className="text-xs text-sand-500 font-light">Basta anotar o consumo correspondente no checkout.</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {MINIBAR_ITEMS.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-2xl p-4 border border-sand-100 shadow-sm flex justify-between items-center group hover:border-sand-400 transition-colors"
                >
                  <div className="flex-1 pr-4">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-sand-500 mb-1 block">
                      {item.category === 'beer' && 'Cervejas'}
                      {item.category === 'wine' && 'Vinhos'}
                      {item.category === 'snack' && 'Petiscos e Doces'}
                      {item.category === 'drink' && 'Bebidas'}
                    </span>
                    <h4 className="font-serif text-sm font-semibold text-charcoal-900 leading-tight mb-1">{item.name}</h4>
                    <p className="text-xs text-sand-500 font-light leading-snug">{item.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-sand-800 block whitespace-nowrap">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <a 
              href="https://wa.me/5548999999999?text=Olá,%20gostaria%20de%20solicitar%20uma%20reposição%20de%20itens%20para%20o%20minibar%20de%20meu%20chalé." 
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-sand-800 text-white p-4 rounded-xl text-xs uppercase font-semibold hover:bg-sand-700 transition-colors shadow-md shadow-sand-900/10"
            >
              <MessageSquareText size={16} />
              <span>Pedir Reposição</span>
            </a>
          </div>
        )}

        {/* Spa & Lazer panel */}
        {activeTab === 'spa' && (
          <div className="p-6 space-y-6 animate-fade-in" id="panel-spa">
            <div className="h-44 rounded-2xl overflow-hidden relative shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1000&auto=format&fit=crop" 
                alt="Spa da Serra" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent"></div>
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-sand-300">Ofurô & Terapias</span>
                <p className="font-serif text-lg">Seu Momento Zen nas Estrelas</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif text-base font-semibold text-charcoal-900 px-1">Nossos Tratamentos</h3>
              
              <div className="bg-white rounded-2xl p-5 border border-sand-100 shadow-sm space-y-5">
                {[
                  { title: "Sessão Exclusiva de Ofurô", desc: "60 mins de relaxamento em água a 38°C com sais, pétalas e vista para os pinheiros. Acompanha champanhe.", price: "R$ 180" },
                  { title: "Massagem Relaxante das Montanhas", desc: "Terapia corporal com óleos essenciais de lavanda. Alivia tensões da viagem e do frio das montanhas.", price: "R$ 220" },
                  { title: "Sauna Finlandesa a Vapor", desc: "Acesso de 45 mins para desintoxicação saudável. Disponível das 15:00 às 20:00 (Inclusa na estadia - requer agendamento)." }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1 pb-4 last:pb-0 last:border-b-0 border-b border-sand-100">
                    <div className="flex justify-between items-start gap-3">
                      <h4 className="font-bold text-sm text-charcoal-900 leading-normal">{item.title}</h4>
                      {item.price && <span className="bg-sand-50 text-sand-800 text-xs font-bold px-2.5 py-1 rounded-lg border border-sand-100">{item.price}</span>}
                    </div>
                    <p className="text-xs text-charcoal-800 font-light leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <a 
              href="https://wa.me/5548999999999?text=Olá,%20gostaria%20de%20reservar%20um%20horário%20para%20as%20atividades%20do%20Spa/Ofurô." 
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-between w-full bg-sand-800 text-white p-5 rounded-2xl shadow-xl shadow-sand-900/10 hover:bg-sand-700 transition-all active:scale-[0.98]"
            >
              <div className="text-left">
                <span className="text-[10px] uppercase tracking-wider text-sand-300 font-bold block mb-1">Agendamento Necessário</span>
                <span className="font-serif text-lg">Agendar Horário</span>
              </div>
              <ChevronRight size={22} className="text-white" />
            </a>
          </div>
        )}

      </div>
    </div>
  );
};
