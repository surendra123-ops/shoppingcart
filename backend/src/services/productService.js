import axios from 'axios';
import { Product } from '../models/Product.js';
import { env } from '../config/env.js';

const fallbackProducts = [
  {
    title: 'Vintage Leather Backpack',
    description: 'Premium leather backpack with multiple compartments and padded straps.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1512495966493-3fd91f51f51a?auto=format&fit=crop&w=400&q=60',
    category: 'accessories',
  },
  {
    title: 'Wireless Noise-Cancelling Headphones',
    description: 'Over-ear headphones with 30 hours battery life and active noise cancellation.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=60',
    category: 'electronics',
  },
  {
    title: 'Minimalist Analog Watch',
    description: 'Stainless steel watch with leather strap and water resistant design.',
    price: 69.99,
    image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=60',
    category: 'accessories',
  },
  {
    title: 'Ergonomic Office Chair',
    description: 'Adjustable office chair with lumbar support and breathable mesh.',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=60',
    category: 'furniture',
  },
  {
    title: 'Smart Home Speaker',
    description: 'Voice-controlled speaker with high-fidelity sound and smart assistant integration.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=400&q=60',
    category: 'electronics',
  },
  {
    title: 'Organic Cotton Hoodie',
    description: 'Soft and sustainable hoodie with relaxed fit and front pocket.',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=60',
    category: 'apparel',
  },
];

const normalizeProducts = (products) =>
  products.map((item) => ({
    title: item.title || item.name,
    description: item.description || '',
    price: Number(item.price) || 0,
    image: item.image,
    category: item.category || 'general',
    externalId: item.id ? String(item.id) : undefined,
  }));

export const fetchExternalProducts = async () => {
  try {
    const { data } = await axios.get(env.fakeStoreUrl, { timeout: 5000 });
    if (!Array.isArray(data) || data.length === 0) {
      return normalizeProducts(fallbackProducts);
    }
    return normalizeProducts(data);
  } catch (error) {
    console.warn('Falling back to local products. Reason:', error.message);
    return normalizeProducts(fallbackProducts);
  }
};

export const seedProducts = async () => {
  const count = await Product.countDocuments();
  if (count > 0) {
    return;
  }

  const products = await fetchExternalProducts();

  await Product.insertMany(products);
  console.log(`Seeded ${products.length} products.`);
};

export const listProducts = async () => Product.find().lean();

export const findProductById = async (productId) => Product.findById(productId);

