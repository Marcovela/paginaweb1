
import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import ServiceCard from './components/ServiceCard';
import Footer from './components/Footer';
import LegalModals from './components/LegalModals';
import { PRODUCTS, SERVICES, WHATSAPP_NUMBER } from './constants';
import { LegalPage } from './types';

const App: React.FC = () => {
  const [activeLegalPage, setActiveLegalPage] = useState<LegalPage>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');

  const categories = useMemo(() => {
    const cats = ['Todas', ...new Set(PRODUCTS.map(p => p.category))];
    return cats;
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todas' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const handleFloatingWAClick = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=Hola,%20quisiera%20hacer%20una%20consulta%20general.`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col scroll-smooth">
      <Header />
      
      <main className="flex-grow">
        <Hero />

        {/* Feature Highlights */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-orange-50">
              <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white shrink-0">
                <i className="fas fa-ruler-combined"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Venta por Metro</h4>
                <p className="text-sm text-slate-600">Compra solo lo que necesitas para tu proyecto.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-blue-50">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shrink-0">
                <i className="fas fa-truck"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Envíos a Todo el Perú</h4>
                <p className="text-sm text-slate-600">Llegamos a todas las provincias con rapidez.</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-slate-50">
              <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white shrink-0">
                <i className="fas fa-shield-alt"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-900">Servicio Garantizado</h4>
                <p className="text-sm text-slate-600">Instalaciones profesionales con acabados A1.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id="productos" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-2">Nuestro Catálogo</h2>
              <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Productos por Metro</h3>
              <p className="text-gray-600 max-w-2xl mx-auto mb-8">
                Explora nuestra amplia variedad de mallas, plásticos y revestimientos para todo tipo de aplicaciones.
              </p>

              {/* Search and Filters UI */}
              <div className="max-w-4xl mx-auto space-y-6">
                {/* Search Bar */}
                <div className="relative group">
                  <i className="fas fa-search absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-orange-600 transition-colors"></i>
                  <input 
                    type="text"
                    placeholder="¿Qué estás buscando? (Ej: Malla Rachel, Piso, Red...)"
                    className="w-full bg-white border-2 border-transparent focus:border-orange-500 rounded-2xl py-4 pl-14 pr-6 shadow-sm focus:shadow-xl transition-all outline-none text-slate-700"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Categories Filter */}
                <div className="flex flex-wrap justify-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap shadow-sm
                        ${selectedCategory === cat 
                          ? 'bg-orange-600 text-white shadow-orange-200 ring-4 ring-orange-100' 
                          : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-in fade-in duration-500">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-[3rem] shadow-inner border-2 border-dashed border-gray-200">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-search-minus text-3xl text-gray-400"></i>
                </div>
                <h4 className="text-xl font-bold text-slate-800 mb-2">No encontramos resultados</h4>
                <p className="text-gray-500 mb-6">Intenta con otros términos o cambia la categoría.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setSelectedCategory('Todas');}}
                  className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors"
                >
                  Ver todos los productos
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section id="servicios" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-4">
              <div className="max-w-2xl">
                <h2 className="text-orange-600 font-bold uppercase tracking-widest text-sm mb-2">Expertos en Obra</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">Servicios Profesionales de Instalación</h3>
                <p className="text-gray-600">
                  No solo vendemos los materiales, nos encargamos de que queden instalados correctamente para su máxima durabilidad.
                </p>
              </div>
              <button 
                onClick={handleFloatingWAClick}
                className="bg-slate-900 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all whitespace-nowrap"
              >
                Solicitar Técnico
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {SERVICES.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-16 bg-orange-600">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6">¿Buscas una medida especial?</h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              Contáctanos hoy mismo y te brindamos una cotización personalizada según los metros o dimensiones que necesites.
            </p>
            <button 
              onClick={handleFloatingWAClick}
              className="bg-white text-orange-600 hover:bg-slate-900 hover:text-white px-10 py-4 rounded-full font-extrabold text-lg transition-all shadow-xl"
            >
              Hablar con un Asesor
            </button>
          </div>
        </section>
      </main>

      <Footer onLegalClick={setActiveLegalPage} />

      <button 
        onClick={handleFloatingWAClick}
        className="fixed bottom-8 right-8 z-[60] bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 group"
      >
        <i className="fab fa-whatsapp text-3xl"></i>
      </button>

      <LegalModals 
        activePage={activeLegalPage} 
        onClose={() => setActiveLegalPage(null)} 
      />
    </div>
  );
};

export default App;
