export const revalidate = 604800; // 7 días

import { getProductBySlug } from "@/actions";
import { ProductMobileSlideShow, ProductSlideShow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { get } from "http";
import { Metadata, ResolvingMetadata } from "next";
// import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
  params: {
    slug: string;
  };

}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await getProductBySlug(slug);
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "Sin descripción",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "Sin descripción",

      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {

  const { slug } = params;

  // const product = initialData.products.find((product) => product.slug === slug);

  const product = await getProductBySlug(slug);


  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        {/* Mobile SlideShow */}

        <ProductMobileSlideShow images={product.images} title={product.title} className="block md:hidden" />
        {/* Desktop SlideShow */}
        <ProductSlideShow images={product.images} title={product.title} className="hidden md:block" />

      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">

        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>


        <AddToCart product={product} />


        {/* Descripción */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">
          {product.description}
        </p>


      </div>


    </div>
  );
}