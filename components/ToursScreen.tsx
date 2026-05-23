import React from 'react';
import { ArrowLeft, Compass, Info, MapPin, Star, AlertCircle } from 'lucide-react';

interface ToursScreenProps {
  onBack: () => void;
}

interface Tour {
  id: string;
  name: string;
  desc: string;
  distance: string;
  difficulty?: 'Fácil' | 'Moderado' | 'Difícil';
  tip: string;
  imageUrl: string;
}

const TOURS: Tour[] = [
  {
    id: '1',
    name: 'Trilha da Pedra Redonda',
    desc: 'O cartão postal mais famoso de Monte Verde! Caminhada curtinha levando a um topo rochoso plano a 1990m de altitude com uma vista 360° incrível de toda a Região da Mantiqueira.',
    distance: '2.5 km de subida | 1h30 total',
    difficulty: 'Moderado',
    tip: 'Vá no pôr do sol se o dia estiver limpo! Recomendamos agendar entrada pelo site antecipadamente.',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '2',
    name: 'Chocolates Artesanais & Av. Principal',
    desc: 'A charmosa avenida é cheia de galerias temáticas em estilo alpino-suíço, onde você pode provar chocolates finos caseiros, comprar queijos coloniais, licores e saborear fondue acolhedor.',
    distance: 'No centro da vila | 1.8km',
    tip: 'Visite a Fábrica do Gressoney (fundada em 1978) para provar a famosa Prímula com doce de leite.',
    imageUrl: 'https://images.unsplash.com/photo-1544967082-d9d25dca7cbd?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: '3',
    name: 'Trilha do Platô',
    desc: 'Seguindo a mesma direção da trilha principal, é uma caminhada com subida gradual e solo rochoso espetacular que proporciona uma vista frontal perfeita da Pedra Redonda e do Chapéu do Bispo.',
    distance: '3.1 km ida/volta | 2h total',
    difficulty: 'Fácil',
    tip: 'Trilha ótima para quem quer caminhar com mais tranquilidade e menos degraus exigentes.',
    imageUrl: 'https://images.unsplash.com/photo-1475924156734-496f6cac6ec1?q=80&w=1000&auto=format&fit=crop'
  }
];

export const ToursScreen: React.FC<ToursScreenProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col bg-sand-50">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 flex items-center justify-between bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-sand-100">
        <button onClick={onBack} className="p-2 -ml-2 rounded-full hover:bg-sand-100 transition-colors text-charcoal-900" id="btn-tours-back">
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>
        <h2 className="font-serif text-lg font-bold text-charcoal-900 tracking-wide">Passeios e Trilhas</h2>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar p-6 space-y-6">
        
        {/* Intro */}
        <div className="bg-sand-100/50 p-5 rounded-2xl border border-sand-200">
          <div className="flex items-start gap-3">
            <Compass className="text-sand-600 shrink-0 mt-0.5" size={20} />
            <div>
              <h3 className="font-serif text-charcoal-900 font-bold text-sm mb-1">Dica do Anfitrião</h3>
              <p className="text-xs text-charcoal-800 font-light leading-relaxed">
                Monte Verde oferece trilhas de tirar o fôlego pela Serra da Mantiqueira e uma atmosfera gastronômica espetacular. Prepare agasalhos confortáveis, calçado esportivo antiderrapante e aproveite!
              </p>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-6">
          {TOURS.map((tour) => (
            <div 
              key={tour.id} 
              className="bg-white rounded-3xl overflow-hidden shadow-sm border border-sand-100 group hover:border-sand-450 transition-all duration-300 hover:shadow-card"
            >
              {/* Cover Image */}
              <div className="h-44 w-full overflow-hidden relative">
                <img 
                  src={tour.imageUrl} 
                  alt={tour.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[6000ms] ease-out"
                />
                
                {tour.difficulty && (
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 text-[9px] uppercase font-bold tracking-widest text-white">
                    {tour.difficulty}
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6">
                <h4 className="font-serif text-lg font-bold text-charcoal-900 mb-2 leading-snug">{tour.name}</h4>
                <p className="text-xs text-charcoal-800 font-light leading-relaxed mb-4">{tour.desc}</p>
                
                {/* Specs */}
                <div className="flex items-center gap-2 mb-4 bg-sand-50 p-3 rounded-xl border border-sand-100 text-sand-800 text-[11px] font-medium uppercase tracking-wide">
                  <MapPin size={14} className="text-sand-600" />
                  <span>{tour.distance}</span>
                </div>

                {/* Host Secret Tip */}
                <div className="flex gap-2.5 items-start border-t border-sand-100 pt-4">
                  <AlertCircle size={14} className="text-sand-500 shrink-0 mt-0.5" />
                  <p className="text-[11px] italic text-sand-700 leading-normal">
                    <strong className="font-bold underline uppercase tracking-wider text-[9px] mr-1">Dica Secreta:</strong> 
                    {tour.tip}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
