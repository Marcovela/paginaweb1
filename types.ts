
export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: string; // Nuevo campo para el precio numérico/texto (ej: S/ 15.00)
  priceInfo: string; // Información adicional (ej: Venta por metro)
  image: string;
  icon: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  image: string;
}

export type LegalPage = 'privacy' | 'terms' | 'complaints' | null;
