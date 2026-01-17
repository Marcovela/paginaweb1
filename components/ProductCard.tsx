
import React from 'react';
import { Product } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const handleBuy = () => {
    const message = `Hola, estoy interesado en comprar ${product.name} (Precio: ${product.price}). ¿Me brindas más información?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full border border-gray-100">
      {/* Etiqueta de Categoría */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-orange-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
          {product.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">
              <i className={`fas ${product.icon} text-orange-600`}></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 leading-tight">{product.name}</h3>
          </div>
        </div>

        <p className="text-slate-600 text-sm mb-6 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="bg-slate-50 rounded-2xl p-4 mb-4">
          <div className="flex flex-col">
            <span className="text-xs text-slate-400 font-bold uppercase tracking-tighter mb-1">Precio Online</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">{product.price}</span>
              <span className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">/ {product.priceInfo.split(' ').pop()}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={handleBuy}
          className="w-full bg-slate-900 hover:bg-orange-600 text-white py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-orange-200"
        >
          Pedir por WhatsApp
          <i className="fab fa-whatsapp text-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
