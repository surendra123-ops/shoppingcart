import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchProducts } from '../api/productApi.js';
import { EmptyState } from '../components/EmptyState.jsx';
import { Loader } from '../components/Loader.jsx';
import { PageContainer } from '../components/PageContainer.jsx';
import { ProductCard } from '../components/ProductCard.jsx';

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        toast.error(error.message || 'Unable to load products');
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <PageContainer
      title="Discover Amazing Products"
      subtitle="Browse our curated collection of premium items"
    >
      {loading ? (
        <Loader label="Loading products" />
      ) : products.length === 0 ? (
        <EmptyState title="No products available" description="Products will appear here once available." />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </PageContainer>
  );
};
