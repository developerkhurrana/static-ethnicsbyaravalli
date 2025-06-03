export type CatalogProduct = {
  id: number;
  slug: string;
  name: string;
  category: string;
  description: string;
  images: string[];
  features: string[];
  availableSizes: string[];
};

const products: CatalogProduct[] = [
  {
    id: 1,
    slug: "floral-print-kurti-set",
    name: "Floral Print Kurti Set",
    category: "Kurti Sets",
    description: "Premium cotton kurti set with intricate floral print",
    images: [
      "https://ekohum.com/cdn/shop/files/DB392_3.jpg?v=1740739949",
      "https://ekohum.com/cdn/shop/files/DB392_8.jpg?v=1740739949"
    ],
    features: ["Cotton", "Floral Print", "Matching Dupatta"],
    availableSizes: ["S", "M", "L", "XL"]
  },
  {
    id: 2,
    slug: "embroidered-suit-set",
    name: "Embroidered Suit Set",
    category: "Suit Sets",
    description: "Elegant suit set with detailed embroidery work",
    images: [
      "https://ekohum.com/cdn/shop/files/DW3962_1.jpg?v=1725534156",
      "https://ekohum.com/cdn/shop/files/DW3962_4.jpg?v=1725534157"
    ],
    features: ["Premium Fabric", "Hand Embroidery", "Designer Collection"],
    availableSizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 3,
    slug: "double-layer-kalidaar",
    name: "Double Layer Kalidaar",
    category: "Dresses",
    description: "Luxurious double layer kalidaar with premium fabric",
    images: [
      "https://ekohum.com/cdn/shop/files/DSC_1622_33b0f5b1-b840-4283-90cc-259f6794734e.jpg?v=1729164681",
      "https://ekohum.com/cdn/shop/files/Untitled-9_37b1bb61-61c1-4175-b051-24f143efbae2.jpg?v=1729164548"
    ],
    features: ["Double Layer", "Premium Fabric", "Designer Collection"],
    availableSizes: ["S", "M", "L"]
  },
  {
    id: 4,
    slug: "designer-kaftan",
    name: "Designer Kaftan",
    category: "Kaftans",
    description: "Modern kaftan with contemporary design",
    images: [
      "https://ekohum.com/cdn/shop/files/DSC0406.jpg?v=1745399522",
      "https://ekohum.com/cdn/shop/files/DSC0392.jpg?v=1745399522"
    ],
    features: ["Premium Fabric", "Modern Design", "Comfortable Fit"],
    availableSizes: ["M", "L", "XL", "XXL"]
  }
];

export function getAllCatalogProducts(): CatalogProduct[] {
  return products;
}

export function getCatalogProduct(slug: string): CatalogProduct | undefined {
  return products.find((product) => product.slug === slug);
} 