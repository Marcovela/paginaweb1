
import { Product, Service } from './types';

export const WHATSAPP_NUMBER = '51992301852';
export const BUSINESS_NAME = 'Mallas y Soldadura Arce';
export const RUC = '20600000000'; // Placeholder RUC

export const PRODUCTS: Product[] = [
  {
    id: 'malla-rachel',
    name: 'Malla Rachel 80% - 95%',
    description: 'Ideal para sombra en cocheras, patios y agricultura. Alta durabilidad y protección UV.',
    category: 'Malla Rachel',
    price: 'S/ 12.50',
    priceInfo: 'Venta por metro',
    image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop',
    icon: 'fa-border-all'
  },
  {
    id: 'lonas',
    name: 'Lonas de Alta Resistencia',
    description: 'Lonas impermeables para camiones, eventos o protección de materiales a la intemperie.',
    category: 'Lonas',
    price: 'S/ 25.00',
    priceInfo: 'Venta por metro',
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc5c2?q=80&w=800&auto=format&fit=crop',
    icon: 'fa-sheet-plastic'
  },
  {
    id: 'linoleo',
    name: 'Linóleo para Pisos (Tráfico Pesado)',
    description: 'Pisos vinílicos resistentes y fáciles de limpiar. Gran variedad de diseños tipo madera y mármol.',
    category: 'Linóleo (Pisos)',
    price: 'S/ 18.00',
    priceInfo: 'Venta por metro',
    image: 'https://images.unsplash.com/photo-1581850518616-bcb8077fa233?q=80&w=800&auto=format&fit=crop',
    icon: 'fa-rug'
  },
  {
    id: 'hules',
    name: 'Hules para Mesas Estampados',
    description: 'Manteles de hule impermeables. Protege tus muebles con estilo y facilidad de limpieza.',
    category: 'Hules (Mesas)',
    price: 'S/ 15.00',
    priceInfo: 'Venta por metro',
    image: 'https://images.unsplash.com/photo-1614359833911-53740035c33d?q=80&w=800&auto=format&fit=crop',
    icon: 'fa-table'
  },
  {
    id: 'arpilleras',
    name: 'Arpilleras de Yute y Sintéticas',
    description: 'Telas de saco de alta calidad para construcción, embalaje y decoración rústica.',
    category: 'Arpilleras',
    price: 'S/ 8.50',
    priceInfo: 'Venta por metro',
    image: 'https://images.unsplash.com/photo-1605648916319-cf082f7524a1?q=80&w=800&auto=format&fit=crop',
    icon: 'fa-box'
  },
  {
    id: 'plastico-impermeable',
    name: 'Plástico Impermeable Transparente',
    description: 'Rollos de plástico resistente para techos, obras y protección contra lluvias.',
    category: 'Plásticos Impermeables',
    price: 'S/ 10.00',
    priceInfo: 'Venta por metro',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
    icon: 'fa-cloud-rain'
  },
  {
    id: 'red-cancha',
    name: 'Red Perimetral para Canchas',
    description: 'Redes de nylon de alta resistencia para lozas deportivas y canchas de fútbol.',
    category: 'Red Perimetral',
    price: 'S/ 45.00',
    priceInfo: 'Venta por metro lineal',
    image: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?q=80&w=800&auto=format&fit=crop',
    icon: 'fa-volleyball'
  }
];

export const SERVICES: Service[] = [
  {
    id: 'inst-malla',
    name: 'Instalación de Mallas Rachel',
    description: 'Expertos en estructuras y tensado de mallas para cocheras y patios.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'inst-red',
    name: 'Instalación de Red Perimetral',
    description: 'Montaje profesional en complejos deportivos con postes y cables de acero.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=800&auto=format&fit=crop'
  },
  {
    id: 'soldadura',
    name: 'Servicios de Soldadura',
    description: 'Estructuras metálicas, portones y reparaciones con acabado profesional.',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop'
  }
];
