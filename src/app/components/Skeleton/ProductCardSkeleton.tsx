"use client";

import React from "react";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";

const ProductCardSkeleton: React.FC = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <SkeletonTheme baseColor="#9e9e9e" highlightColor="#a4a4a4">

    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col">
        <div className="relative w-full pt-[75%] overflow-hidden">
          <Skeleton height="100%" className="absolute inset-0" />
          <div className="absolute top-4 right-4">
            <Skeleton width={60} height={24} className="rounded-full" />
          </div>
        </div>
        <CardContent className="flex-grow p-4">
          <Skeleton height={28} width="80%" className="mb-2" />
          <Skeleton count={3} className="mb-4" />
        </CardContent>
        <CardFooter className="p-4 bg-gray-50 flex justify-between items-center">
          <div>
            <Skeleton width={80} height={28} />
          </div>
          <div className="hidden md:block">
            <Skeleton width={100} height={20} />
          </div>
          <div className="hidden md:block">
            <Badge variant="secondary" className="text-sm">
              <Skeleton width={80} height={24} />
            </Badge>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
      </SkeletonTheme>
  );
};

export default ProductCardSkeleton;
