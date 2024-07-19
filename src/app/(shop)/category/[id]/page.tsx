
import { initialData } from "@/seed/seed";
import { Category } from '../../../../interfaces/product.interface';
import { notFound } from "next/navigation";
import { ProductGrid, Title } from "@/components";



interface Props {

  params: {
    id: Category;
  };
}

const products = initialData.products;

export default function ({ params }: Props) {

  const { id } = params;

  const labels: Record<Category, string> = {
    "men": "para Hombres",
    "women": "para Mujeres",
    "kid": "para Niños",
    "unisex": "Unisex"

  };

  if (!labels[id]) {
    notFound();
  }

  return (
    <>
      <Title
        title={`Artículos ${labels[id]}`}
        subtitle="Todos los productos"
        className="mb-2" />
      <ProductGrid products={products.filter((product) => product.gender === id)} />
    </>
  );
}