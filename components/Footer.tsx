
import React from 'react';
import { BUSINESS_NAME, RUC } from '../constants';
import { LegalPage } from '../types';

interface FooterProps {
  onLegalClick: (page: LegalPage) => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick }) => {
  return (
    <footer className="bg-slate-900 text-gray-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-6">
              <div className="bg-orange-600 p-2 rounded-lg mr-2">
                <i className="fas fa-hammer text-white"></i>
              </div>
              <span className="text-white text-xl font-bold uppercase">{BUSINESS_NAME}</span>
            </div>
            <p className="text-sm leading-relaxed mb-6">
              Tu proveedor confiable en materiales industriales y servicios de soldadura en Perú. Soluciones duraderas para cada necesidad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-orange-500 transition-colors"><i className="fab fa-facebook-f text-xl"></i></a>
              <a href="#" className="hover:text-orange-500 transition-colors"><i className="fab fa-instagram text-xl"></i></a>
              <a href="#" className="hover:text-orange-500 transition-colors"><i className="fab fa-tiktok text-xl"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Empresa</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#inicio" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#productos" className="hover:text-white transition-colors">Catálogo de Productos</a></li>
              <li><a href="#servicios" className="hover:text-white transition-colors">Servicios Profesionales</a></li>
              <li><a href="#contacto" className="hover:text-white transition-colors">Contáctanos</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-wider">Atención al Cliente</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <button onClick={() => onLegalClick('privacy')} className="hover:text-white transition-colors text-left">
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button onClick={() => onLegalClick('terms')} className="hover:text-white transition-colors text-left">
                  Términos y Condiciones
                </button>
              </li>
              <li>
                <button onClick={() => onLegalClick('complaints')} className="hover:text-white transition-colors flex items-center text-left">
                  <i className="fas fa-book-open mr-2 text-orange-600"></i>
                  Libro de Reclamaciones
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} {BUSINESS_NAME}. RUC: {RUC}. Todos los derechos reservados.</p>
          <p className="mt-4 md:mt-0">Diseñado para el mercado peruano <i className="fas fa-heart text-red-600"></i></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
