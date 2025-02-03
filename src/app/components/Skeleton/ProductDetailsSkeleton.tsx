"use client";

import type React from "react";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent } from "../ui/card";

const ProductDetailsSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#9e9e9e" highlightColor="#a4a4a4">
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
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-md">
                <Skeleton height="100%" />
              </div>

              {/* Details Section */}
              <motion.div
                className="p-6 flex flex-col justify-between space-y-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div>
                  <Skeleton height={36} width="80%" className="mb-4" />

                  {/* Stock Badge & Rating */}
                  <div className="mb-4 flex items-center space-x-2">
                    <Skeleton width={80} height={24} />
                    <Skeleton width={120} height={24} />
                  </div>

                  {/* Price Display */}
                  <Skeleton height={36} width="60%" className="mb-4" />

                  {/* Description */}
                  <div className="mt-4">
                    <Skeleton count={4} className="mb-2" />
                  </div>
                </div>

                {/* Add to Cart Section */}
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 rounded-lg p-2">
                    <Skeleton width={40} height={40} />
                    <Skeleton width={40} height={40} />
                    <Skeleton width={40} height={40} />
                  </div>
                  <Skeleton height={48} className="rounded-lg" />
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </SkeletonTheme>
  );
};

export default ProductDetailsSkeleton;
