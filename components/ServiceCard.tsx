
import React from 'react';
import { Service } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const handleServiceClick = () => {
    const message = `Hola, quisiera información sobre el servicio de ${service.name}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div 
      onClick={handleServiceClick}
      className="relative group cursor-pointer overflow-hidden rounded-3xl h-[400px]"
    >
      <img 
        src={service.image} 
        alt={service.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
      
      <div className="absolute bottom-0 left-0 p-8 text-white">
        <h3 className="text-2xl font-bold mb-2 group-hover:text-orange-500 transition-colors">{service.name}</h3>
        <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
          {service.description}
        </p>
        <div className="inline-flex items-center text-orange-500 font-bold">
          Solicitar Cotización <i className="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
