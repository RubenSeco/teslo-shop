
export const revalidate = 60; // 60 segundos



import { Category } from '../../../../interfaces/product.interface';
import { redirect } from "next/navigation";
import { Pagination, ProductGrid, Title } from "@/components";
import { getPaginatedProductsWithImages } from "@/actions/products/product-pagination";



interface Props {

  params: {
    gender: Category;
  };
}


export default async function ({ params }: Props) {

  const labels: Record<Category, string> = {
    "men": "para Hombres",
    "women": "para Mujeres",
    "kid": "para Niños",
    "unisex": "Unisex"

  };

  const { gender } = params;

  if (!labels[gender]) {
    redirect("/");
  }

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ gender });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title
        title={`Artículos ${labels[gender]}`}
        subtitle="Todos los productos"
        className="mb-2" />
      <ProductGrid products={products.filter((product) => product.gender === gender)} />
      <Pagination totalPages={totalPages} />
    </>

  );
}