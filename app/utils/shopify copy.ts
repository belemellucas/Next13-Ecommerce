import { gql, GraphQLClient } from "graphql-request";
const storefrontAccessToken = process.env.ADMIN_API_ACCESS_TOKEN;
const endpoint = process.env.GRAPHQL_API_URL;

const graphQLClient = new GraphQLClient(endpoint!, {
  headers: {
    "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
    "Content-Type": "application/json",
  },
});


/*
const getAllProductsQuery = gql`
    {
      collection(handle: "filterable-collection") { 
         handle
      products(
        first: 10
        filters: { variantOption: { name: "Color", value: "#000000" } }
        ) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
              }
            }
            featuredImage {
              altText
              url
            }
          }
        }
      }
      }
     
    }
  `;
  try {
    return await graphQLClient.request(getAllProductsQuery);
  } catch (error) {
    throw new Error(error);
  }*/


export async function getProducts() {
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
    return await graphQLClient.request(getAllProductsQuery);
  } catch (error) {
    throw new Error(error);
  }
} 




/*
 {
      collection(handle: "filterable-collection") {
        handle
        products(
          first: 10
          filters: { variantOption: { name: "Color", value: "#000000" } }
        ) {
          edges {
            node {
              handle
              variants(first: 10) {
                edges {
                  node {
                    selectedOptions {
                      name
                      value
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
*/