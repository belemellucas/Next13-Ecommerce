import { gql, GraphQLClient } from "graphql-request";
import { ProductsResponse } from "../interface/types";
const storefrontAccessToken = process.env.ADMIN_API_ACCESS_TOKEN;
const endpoint = process.env.GRAPHQL_API_URL;

const graphQLClient = new GraphQLClient(endpoint!, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
    "Content-Type": "application/json",
  },
});

export async function getProducts(): Promise<ProductsResponse> {
  const getAllProductsQuery = gql`
  {
    collection(handle: "Fones") {
      handle
      products(first: 10
        ) {
        edges {
          node {
           tags
            id
            title
            
            variants (first: 10) {
              edges {
                node {
                  id
                  title
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  try {
    const response = await graphQLClient.request<ProductsResponse>(getAllProductsQuery);
    console.log("Resposta de getProducts:", response);
    return response;
  } catch (error) {
    throw new Error(); 
  }
}