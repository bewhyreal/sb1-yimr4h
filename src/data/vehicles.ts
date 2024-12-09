export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  imageUrl: string;
  category: string;
  features: string[];
  available: boolean;
  active: boolean;
}

export const vehicles: Vehicle[] = [
  {
    id: 1,
    brand: 'BMW',
    model: '3 Series',
    year: 2023,
    price: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=2070&q=80',
    category: 'Luxury',
    features: ['Automatic', 'Leather Seats', 'GPS Navigation', 'Bluetooth'],
    available: true,
    active: true,
  },
  {
    id: 2,
    brand: 'Mercedes',
    model: 'C-Class',
    year: 2023,
    price: 1300,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2070&q=80',
    category: 'Luxury',
    features: ['Automatic', 'Leather Seats', 'GPS Navigation', 'Bluetooth'],
    available: true,
    active: true,
  },
  {
    id: 3,
    brand: 'Audi',
    model: 'A4',
    year: 2023,
    price: 1100,
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=2070&q=80',
    category: 'Luxury',
    features: ['Automatic', 'Leather Seats', 'GPS Navigation', 'Bluetooth'],
    available: true,
    active: true,
  },
];