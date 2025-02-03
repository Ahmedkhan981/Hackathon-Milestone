"use client";

import type React from "react";
import type { Product, Sale } from "../../../../sanity.types";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PortableText } from "@portabletext/react";
import { imageUrl } from "../../../lib/imageUrl";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { ShoppingCart, AlertCircle } from "lucide-react";
import type { TypedObject } from "sanity";

type Props = {
  product: Product;
  sale: Sale | null;
};

const ProductCard: React.FC<Props> = ({ product, sale }: Props) => {
  const imageSrc = product.image
    ? imageUrl(product.image).url()
    : "/placeholder.svg";

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const imageVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  const originalPrice = product.price || 0;
  const discountPercentage = sale?.discountAmount || 0;
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const finalPrice = originalPrice - discountAmount;
  const savedAmount = originalPrice - finalPrice;
  const finalPriceFormatted = finalPrice.toFixed(2);
  const savedAmountFormatted = savedAmount.toFixed(2);

  return (
    <Link href={`/product/${product?.slug?.current}`} passHref>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        className="h-full"
      >
        <Card className="overflow-hidden h-full flex flex-col">
          <div className="relative w-full pt-[70%] overflow-hidden">
            <motion.div className="absolute inset-0 " variants={imageVariants}>
              <Image
                fill
                priority
                src={imageSrc || "/placeholder.svg"}
                alt={product?.name || "Unnamed Product"}
                className="transition-all duration-300 object-cover "
              />
            </motion.div>
            {product?.stock === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"
              >
                <Badge
                  variant="destructive"
                  className="text-lg font-semibold px-3 py-1"
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Out of Stock
                </Badge>
              </motion.div>
            )}
            {discountPercentage > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 right-4 bg-red-600 text-white text-xs font-semibold py-1 px-3 rounded-full"
              >
                {discountPercentage}% Off
              </motion.div>
            )}
          </div>
          <CardContent className="flex-grow p-4">
            <h2 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-primary transition duration-300">
              {product.name || "Unnamed Product"}
            </h2>
            <div className="text-gray-600 mb-4 line-clamp-3 text-sm">
              {product.description ? (
                <PortableText
                  value={
                    product.description as unknown as
                      | TypedObject
                      | TypedObject[]
                  }
                />
              ) : (
                "No description available."
              )}
            </div>
          </CardContent>
          <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
            <div>
              {discountPercentage > 0 && originalPrice > 0 && (
                <span className="text-sm line-through text-gray-500 mr-2">
                  ${originalPrice.toFixed(2)}
                </span>
              )}
              <span className="text-2xl font-bold text-primary">
                ${finalPriceFormatted}
              </span>
            </div>
            <div className="text-sm text-gray-600 hidden md:block">
              {savedAmount > 0 && <span>You save ${savedAmountFormatted}</span>}
            </div>
            {product?.stock && product.stock > 0 ? (
              <Badge variant="secondary" className="text-sm hidden md:block">
                <ShoppingCart className="w-4 h-4 mr-1 " />
                In Stock: {product.stock}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-sm">
                Out of Stock
              </Badge>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </Link>
  );
};

export default ProductCard;
