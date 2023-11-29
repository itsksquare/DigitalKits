"use client";

import { Button } from "./ui/button";
import { useCart } from "@/hooks/use-cart";
import { Product } from "@/payload-types";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { items, addItem } = useCart();

  const isItemInCart =
    items.find((item) => item.product.id === product.id)?.product.id ===
    product.id;

  return (
    <Button
      onClick={() => {
        addItem(product);
      }}
      size="lg"
      className="w-full"
      disabled={isItemInCart}
    >
      {isItemInCart ? "Added to cart!" : "Add to cart"}
    </Button>
  );
};

export default AddToCartButton;
