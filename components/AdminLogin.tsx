
import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
  onCancel: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // El Hash SHA-256 de la contraseña "arce2024"
  // De esta forma, la contraseña real no está escrita en el código.
  const ADMIN_USER = 'admin';
  const PASSWORD_HASH = '8b1935e406263884814e5b4109403b22b406e902b9e69e46a5b485d1872199f1';

  const hashPassword = async (text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setError('');

    try {
      const inputHash = await hashPassword(password);
      
      if (username === ADMIN_USER && inputHash === PASSWORD_HASH) {
        onLogin(true);
      } else {
        setError('Credenciales incorrectas. Intente de nuevo.');
      }
    } catch (err) {
      setError('Error en el sistema de seguridad.');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-lg">
            <i className="fas fa-lock"></i>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900">Acceso Admin</h2>
          <p className="text-gray-500 mt-2">Mallas y Soldadura Arce</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-medium flex items-center gap-3 animate-headshake">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Usuario</label>
            <div className="relative">
              <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="text" 
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                placeholder="Nombre de usuario"
                value={username}
                onChange={e => setUsername(e.target.value)}
                disabled={isVerifying}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Contraseña</label>
            <div className="relative">
              <i className="fas fa-key absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
              <input 
                type="password" 
                className="w-full bg-gray-50 border-0 rounded-2xl p-4 pl-12 focus:ring-2 focus:ring-orange-500 transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isVerifying}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isVerifying}
            className="w-full bg-slate-900 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isVerifying ? <i className="fas fa-circle-notch animate-spin"></i> : <i className="fas fa-shield-alt"></i>}
            {isVerifying ? 'Verificando...' : 'Entrar al Panel'}
          </button>
          
          <button 
            type="button" 
            onClick={onCancel}
            className="w-full text-gray-500 text-sm font-bold hover:text-slate-900 transition-colors"
          >
            Volver a la tienda
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
