import Image from 'next/image'
import Navbar from './components/Navbar'
import { getCurrentUser } from './lib/session'
import { getProducts } from './utils/shopify'
import { ProductsResponse } from './interface/types'
interface HomeProps {
  products: ProductsResponse;
}

export default function Home({ products }: HomeProps) {
   console.log(products)
  if (!products || !products.collection) {
    return <div>Loading...</div>; // ou qualquer outra mensagem de "carregando" ou erro
  }
  return (
    <div className="px-5 max-w-[1200px] mx-auto">
      <Navbar />
      {products.collection.products.edges.map(({ node: product }) => (
        <div key={product.id}>
          <h2>{product.title}</h2>
          {/* Outros detalhes do produto */}
        </div>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const products = await getProducts();
    console.log(products, "-- products -- ");
    return { props: { products } };
  } catch (error) {
    console.error("Erro ao obter produtos:", error);
    return { props: { products: null, error: "Falha ao carregar produtos" } };
  }
}