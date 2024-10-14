export interface Variant {
    id: string;
    title: string;
    // Adicione outros campos relevantes para a variante
  }
  
  export interface Product {
    handle: string;
    productType: string;
    id: string;
    title: string;
    variants: Variant[];
    // Adicione outros campos relevantes para o produto
  }
  
  export interface ProductsResponse {
    collection: {
      products: {
        edges: Array<{ node: Product }>;
      };
    };
  }