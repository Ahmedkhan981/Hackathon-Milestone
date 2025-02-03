"use client";

import type React from "react";
import { motion } from "framer-motion";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Card, CardContent, CardHeader } from "../ui/card";

const SaleBannerSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#9e9e9e" highlightColor="#a4a4a4">
    <Card className="max-w-4xl mx-auto overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-800 opacity-90 h-[75%] top-[4.3rem]" />
      <CardHeader className="relative">
        <Skeleton height={48} width="80%" className="mx-auto" />
      </CardHeader>
      <CardContent className="relative text-white">
        <Skeleton count={2} className="mb-6" />

        <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
          <Skeleton width={120} height={40} />
          <Skeleton width={160} height={40} />
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 mb-6">
          <Skeleton width={140} height={24} />
          <Skeleton width={140} height={24} />
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-center justify-center mb-2">
                <Skeleton width={120} height={24} />
              </div>
              <div className="flex justify-center space-x-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="text-center">
                    <Skeleton width={60} height={60} className="mb-2" />
                    <Skeleton width={40} height={16} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </CardContent>
    </Card>
          </SkeletonTheme>
  );
};

export default SaleBannerSkeleton;
