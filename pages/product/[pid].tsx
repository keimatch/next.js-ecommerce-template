import { GetStaticPaths, GetStaticProps } from "next";

import { Fragment, useEffect, useState } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import ProductsFeatured from "../../components/products-featured";
import Gallery from "../../components/product-single/gallery";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import Reviews from "../../components/product-single/reviews";
import { server } from "../../utils/server";

// types
import { ProductType } from "types";

type ProductPageType = {
  product: ProductType;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const pid = params?.pid;
  const res = await fetch(`${server}/api/product/${pid}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${server}/api/products`);
  const products: ProductType[] = await res.json();
  const productIds = products.map((item) => ({
    params: { pid: item.id },
  }));

  return {
    paths: productIds,
    fallback: false,
  };
};

const event = new CustomEvent("productInfo-updated");

const Product = ({ product }: ProductPageType) => {
  const [showBlock, setShowBlock] = useState("description");

  useEffect(() => {
    const prodData: {
      "entity:id": string;
      "entity:name": string;
      "entity:url": string;
      "entity:image": string;
      "entity:price": string;
      "entity:stock": boolean;
    } = {
      "entity:id": product.id,
      "entity:name": product.name,
      "entity:url": location.href,
      "entity:image": location.origin + "/" + product.images,
      "entity:price": product.price,
      "entity:stock": product.stock,
    };

    // @ts-ignore
    window.customDataLayer = {
      __adobe: {
        target: prodData,
      },
    };
    dispatchEvent(event);
    return () => {
      // @ts-ignore
      window.customDataLayer = {};
    };
  }, []);

  return (
    <Layout>
      <Breadcrumb />

      <section className="product-single">
        <div className="container">
          <div className="product-single__content">
            <Gallery images={product.images} />
            <Content product={product} />
          </div>

          <div className="product-single__info">
            <div className="product-single__info-btns">
              <button
                type="button"
                onClick={() => setShowBlock("description")}
                className={`btn btn--rounded ${
                  showBlock === "description" ? "btn--active" : ""
                }`}
              >
                Description
              </button>
              <button
                type="button"
                onClick={() => setShowBlock("reviews")}
                className={`btn btn--rounded ${
                  showBlock === "reviews" ? "btn--active" : ""
                }`}
              >
                Reviews (2)
              </button>
            </div>

            <Description show={showBlock === "description"} />
            <Reviews product={product} show={showBlock === "reviews"} />
          </div>
        </div>
      </section>

      <div className="product-single-page">
        <ProductsFeatured />
      </div>
      <Footer />
    </Layout>
  );
};

export default Product;
