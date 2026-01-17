
import React from 'react';
import { LegalPage } from '../types';
import { BUSINESS_NAME, RUC } from '../constants';

interface LegalModalsProps {
  activePage: LegalPage;
  onClose: () => void;
}

const LegalModals: React.FC<LegalModalsProps> = ({ activePage, onClose }) => {
  if (!activePage) return null;

  const renderContent = () => {
    switch (activePage) {
      case 'privacy':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Política de Privacidad</h2>
            <p>En {BUSINESS_NAME}, nos comprometemos a proteger su privacidad. Esta política detalla cómo manejamos sus datos personales según la Ley N° 29733 de Protección de Datos Personales en Perú.</p>
            <h3 className="font-bold text-lg mt-4">1. Recopilación de Datos</h3>
            <p>Recopilamos información que usted nos proporciona directamente al contactarnos por WhatsApp o correo electrónico para cotizaciones.</p>
            <h3 className="font-bold text-lg mt-4">2. Uso de la Información</h3>
            <p>Sus datos se utilizan exclusivamente para procesar sus pedidos, responder consultas y mejorar nuestros servicios.</p>
            <p className="text-sm italic">Última actualización: Mayo 2024.</p>
          </div>
        );
      case 'terms':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Términos y Condiciones</h2>
            <p>Bienvenido a {BUSINESS_NAME}. Al utilizar nuestro sitio, usted acepta estos términos.</p>
            <h3 className="font-bold text-lg mt-4">1. Precios y Productos</h3>
            <p>Los precios mostrados son referenciales y pueden variar según el metraje solicitado. La venta por metro está sujeta a disponibilidad de stock.</p>
            <h3 className="font-bold text-lg mt-4">2. Servicios de Instalación</h3>
            <p>Toda instalación requiere una visita técnica previa para validación de medidas y condiciones del terreno.</p>
          </div>
        );
      case 'complaints':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center">
                <i className="fas fa-book-open mr-3 text-orange-600"></i>
                Libro de Reclamaciones
              </h2>
              <span className="bg-gray-100 text-xs px-3 py-1 rounded">RUC: {RUC}</span>
            </div>
            <p className="text-sm text-gray-600">Conforme a lo establecido en el Código de Protección y Defensa del Consumidor (Ley N° 29571).</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold mb-1">Nombre Completo</label>
                <input type="text" className="w-full border rounded-lg p-2 text-sm" placeholder="Juan Pérez" required />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-bold mb-1">DNI/CE</label>
                <input type="text" className="w-full border rounded-lg p-2 text-sm" placeholder="70000000" required />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-1">Correo Electrónico</label>
                <input type="email" className="w-full border rounded-lg p-2 text-sm" placeholder="ejemplo@correo.com" required />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-bold mb-1">Detalle de la Queja o Reclamo</label>
                <textarea className="w-full border rounded-lg p-2 text-sm h-32" placeholder="Describa su situación..." required></textarea>
              </div>
              <div className="col-span-2">
                <button type="submit" className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition-colors">
                  Enviar Reclamación
                </button>
              </div>
            </form>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-8 shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-slate-900 transition-colors"
        >
          <i className="fas fa-times text-2xl"></i>
        </button>
        {renderContent()}
      </div>
    </div>
  );
};

export default LegalModals;
