
import React, { useState } from 'react';
import { Product, Service } from '../types';
import { improveDescription } from '../aiService';

interface AdminDashboardProps {
  products: Product[];
  services: Service[];
  onUpdateProducts: (products: Product[]) => Promise<void>;
  onUpdateServices: (services: Service[]) => Promise<void>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  products, 
  services, 
  onUpdateProducts, 
  onUpdateServices, 
  onLogout 
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'services'>('products');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEdit = (item: any) => {
    setEditingItem({ ...item });
  };

  const handleAiImprove = async () => {
    if (!editingItem) return;
    setIsAiGenerating(true);
    const newDesc = await improveDescription(editingItem.name, editingItem.description);
    setEditingItem({ ...editingItem, description: newDesc });
    setIsAiGenerating(false);
    showToast("Descripción mejorada con IA");
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (activeTab === 'products') {
        const newProducts = products.map(p => p.id === editingItem.id ? editingItem : p);
        await onUpdateProducts(newProducts);
      } else {
        const newServices = services.map(s => s.id === editingItem.id ? editingItem : s);
        await onUpdateServices(newServices);
      }
      showToast("Cambios guardados en la base de datos");
      setEditingItem(null);
    } catch (err) {
      showToast("Error al guardar cambios", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-6 right-6 z-[300] px-6 py-3 rounded-2xl shadow-2xl text-white font-bold animate-bounce flex items-center gap-2 ${toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
          <i className={`fas ${toast.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-triangle'}`}></i>
          {toast.message}
        </div>
      )}

      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-xl font-bold text-orange-500 italic">Panel Admin</h1>
          <p className="text-xs text-gray-400">Mallas y Soldadura Arce</p>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'products' ? 'bg-orange-600' : 'hover:bg-slate-800'}`}
          >
            <i className="fas fa-box"></i> Productos
          </button>
          <button 
            onClick={() => setActiveTab('services')}
            className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${activeTab === 'services' ? 'bg-orange-600' : 'hover:bg-slate-800'}`}
          >
            <i className="fas fa-tools"></i> Servicios
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={onLogout}
            className="w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 hover:text-red-400 transition-colors"
          >
            <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-8 ml-64 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-extrabold text-slate-800 uppercase tracking-tight">
              Gestionar {activeTab === 'products' ? 'Productos' : 'Servicios'}
            </h2>
            <p className="text-gray-500">Los cambios se guardan permanentemente en la base de datos local.</p>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-slate-600 border flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Base de Datos Online
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4">
          {(activeTab === 'products' ? products : services).map((item: any) => (
            <div key={item.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6 group hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={item.image} className="w-20 h-20 rounded-2xl object-cover" alt={item.name} />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
              </div>
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-slate-900">{item.name}</h4>
                <p className="text-gray-500 text-sm line-clamp-1">{item.description}</p>
                {item.priceInfo && <span className="inline-block bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-bold text-[10px] mt-1 uppercase tracking-wider">{item.priceInfo}</span>}
              </div>
              <button 
                onClick={() => handleEdit(item)}
                className="bg-slate-50 hover:bg-orange-600 hover:text-white px-5 py-2.5 rounded-2xl transition-all text-slate-700 font-bold text-sm flex items-center gap-2 border border-slate-100"
              >
                <i className="fas fa-edit"></i> Editar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isSaving && setEditingItem(null)}></div>
          <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">Editar {activeTab === 'products' ? 'Producto' : 'Servicio'}</h3>
              <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-slate-900"><i className="fas fa-times text-xl"></i></button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Nombre Comercial</label>
                <input 
                  className="w-full bg-slate-50 border-0 rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
                  value={editingItem.name} 
                  onChange={e => setEditingItem({...editingItem, name: e.target.value})}
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5 ml-1">
                  <label className="text-sm font-bold text-slate-700">Descripción detallada</label>
                  <button 
                    type="button"
                    onClick={handleAiImprove}
                    disabled={isAiGenerating}
                    className="text-[10px] font-extrabold uppercase bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full hover:bg-indigo-100 transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    {isAiGenerating ? <i className="fas fa-spinner animate-spin"></i> : <i className="fas fa-magic"></i>}
                    Mejorar con IA
                  </button>
                </div>
                <textarea 
                  className="w-full bg-slate-50 border-0 rounded-2xl p-4 h-32 focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none text-sm leading-relaxed" 
                  value={editingItem.description}
                  onChange={e => setEditingItem({...editingItem, description: e.target.value})}
                  required
                />
              </div>

              {activeTab === 'products' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Categoría</label>
                    <input 
                      className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none" 
                      value={editingItem.category}
                      onChange={e => setEditingItem({...editingItem, category: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Precio Info</label>
                    <input 
                      className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none" 
                      value={editingItem.priceInfo}
                      onChange={e => setEditingItem({...editingItem, priceInfo: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1.5 ml-1">Imagen (URL)</label>
                <input 
                  className="w-full bg-slate-50 border-0 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-orange-500 outline-none" 
                  value={editingItem.image}
                  onChange={e => setEditingItem({...editingItem, image: e.target.value})}
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button 
                  type="button" 
                  disabled={isSaving}
                  onClick={() => setEditingItem(null)} 
                  className="flex-grow py-4 border-2 border-slate-100 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex-grow py-4 bg-orange-600 text-white rounded-2xl font-bold shadow-xl shadow-orange-200 hover:bg-orange-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSaving && <i className="fas fa-circle-notch animate-spin"></i>}
                  {isSaving ? 'Guardando...' : 'Guardar en Base de Datos'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
