
import React from 'react';
import { WHATSAPP_NUMBER } from '../constants';

const Hero: React.FC = () => {
  const handleWAClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20quisiera%20solicitar%20una%20cotización.`, '_blank');
  };

  return (
    <section id="inicio" className="relative h-[600px] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/id/357/1920/1080" 
          className="w-full h-full object-cover brightness-[0.4]" 
          alt="Soldadura industrial"
        />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-2xl">
          <h2 className="text-orange-500 font-bold uppercase tracking-widest mb-4">Mallas y Soldadura Arce</h2>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
            Soluciones Industriales <br />
            <span className="text-orange-600">Para Tu Hogar y Negocio</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
            Venta por metro de mallas, lonas, linóleos y servicios profesionales de soldadura. Calidad garantizada en todo el Perú.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={handleWAClick}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center transition-all transform hover:scale-105"
            >
              <i className="fab fa-whatsapp mr-2 text-2xl"></i>
              Cotizar por WhatsApp
            </button>
            <a 
              href="#productos"
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold text-lg border border-white/30 flex items-center justify-center transition-all"
            >
              Ver Catálogo
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 p-8 hidden lg:block">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl flex gap-8">
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-500">10+</p>
            <p className="text-sm text-gray-300">Años de Exp.</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-orange-500">1k+</p>
            <p className="text-sm text-gray-300">Clientes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
