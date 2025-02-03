"use client";

import {  useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { imageUrl } from "../../../lib/imageUrl";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Minus, Plus, ShoppingCart, Star } from "lucide-react";
import useBasketStore from "../../../store/store";
import type { Product, Sale } from "../../../../sanity.types";
import { PortableText } from "@portabletext/react";
import type { TypedObject } from "sanity";

const ProductDetails: React.FC<{ product: Product; sale?: Sale }> = ({
  product,
  sale,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const isOutOfStock = product.stock === null || product.stock === 0;

  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(product._id);

  const discountPercentage = sale?.discountAmount || 0;
  const originalPrice = product.price || 0;
  const discountAmount = (originalPrice * discountPercentage) / 100;
  const discountedPrice = originalPrice - discountAmount;
  const imageSrc = product.image
    ? imageUrl(product.image).url()
    : "/placeholder.svg";

  return (
    <motion.div
      className="container mx-auto px-4 pb-8 pt-16"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden shadow-lg rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 pt-8">
        <CardContent className="p-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <motion.div
              className={`relative aspect-square overflow-hidden rounded-lg shadow-md transition-transform duration-300 ${isHovered ? "scale-105" : "scale-100"}`}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {product.image && (
                <Image
                  src={imageSrc}
                  alt={product.name || "Product Image"}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 50vw"
                  priority
                  className={`transition-all duration-300 ${isHovered ? "brightness-90" : "brightness-100"}`}
                />
              )}
              {isHovered && (
                <div className="absolute inset-0 bg-black bg-opacity-10 transition-opacity duration-300" />
              )}
              {isOutOfStock && (
                <motion.div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-white text-2xl font-bold">
                    Out of Stock
                  </span>
                </motion.div>
              )}
            </motion.div>

            {/* Details Section */}
            <motion.div className="p-6 flex flex-col justify-between space-y-6">
              <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                {product.name}
              </h1>
              <Badge
                variant={isOutOfStock ? "destructive" : "secondary"}
                className="text-sm font-semibold px-3 py-1"
              >
                {isOutOfStock ? "Out of Stock" : "In Stock"}
              </Badge>
              {product.rating !== undefined && (
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                    ({(product.rating ?? 0).toFixed(1)})
                  </span>
                </div>
              )}
              <p className="text-3xl font-bold text-primary">
                {discountPercentage > 0 ? (
                  <>
                    <span className="line-through text-gray-500 mr-2">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="text-red-600">
                      ${discountedPrice.toFixed(2)} ({discountPercentage}% off)
                    </span>
                  </>
                ) : (
                  `$${originalPrice.toFixed(2)}`
                )}
              </p>
              <div className="mt-4 text-gray-600 dark:text-gray-300 text-md md:text-xl">
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
              {!isOutOfStock && (
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(product._id)}
                      disabled={itemCount === 0}
                    >
                      <Minus size={20} />
                    </Button>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={itemCount}
                        className="text-2xl font-bold"
                      >
                        {itemCount}
                      </motion.span>
                    </AnimatePresence>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => addItem(product)}
                    >
                      <Plus size={20} />
                    </Button>
                  </div>
                  <Button
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                    onClick={() => addItem(product)}
                  >
                    <ShoppingCart size={20} className="mr-2" /> Add to Cart
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProductDetails;
