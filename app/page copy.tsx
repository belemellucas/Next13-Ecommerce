import Image from 'next/image'
import Navbar from './components/Navbar'
import { getCurrentUser } from './lib/session'
import { gql } from '@/utils/gql';

type GraphQLResponse = {
    data: {
      products: {
        nodes: {
          title: string;
        }[];
      };
    };
    extensions: {
      cost: {
        requestedQueryCost: number;
        actualQueryCost: number;
        throttleStatus: {
          maximumAvailable: number;
          currentlyAvailable: number;
          restoreRate: number;
        };
      };
    };
  };

  const getProducts = async (): Promise<GraphQLResponse> => {
    const res = await fetch(process.env.GRAPHQL_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": process.env.ADMIN_API_ACCESS_TOKEN!
      },
      body: JSON.stringify({
        query: gql`
          query ProductsQuery {
            products(first: 6) {
              nodes {
                title
              }
            }
          }
        `
      })
    });
  
    if (!res.ok) {
      const text = await res.text(); // get the response body for more information
      throw new Error(`
        Failed to fetch data
        Status: ${res.status}
        Response: ${text}
      `);
    }
    return res.json();
  };
const Home = async () => {
  
  const json = await getProducts();
  console.log(json)
  return (
   /*<main>
      <h1>Shopify + Next.js 13!</h1>

      <ul>
        {json.data.products.nodes.map((product) => (
          <li key={product.title}>{product.title}</li>
        ))}
      </ul>
    </main> */
    <div>

    </div>
  );
};

export default Home;
/*export default async function Home() {
 
  
  const user = await getCurrentUser()

  //console.log(user)
  return (
   <div className="px-5 max-w-[1200px] mx-auto">
     <Navbar />
   </div>
  )
} */
