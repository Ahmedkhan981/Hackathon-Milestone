"use client";

import type React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HeaderSkeleton: React.FC = () => {
  return (
    <SkeletonTheme baseColor="#9e9e9e" highlightColor="#a4a4a4">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Skeleton width={120} height={24} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} width={60} height={20} />
            ))}
          </nav>

          {/* Search and Cart Icons */}
          <div className="flex items-center space-x-4">
            <Skeleton circle width={24} height={24} />
            <Skeleton circle width={24} height={24} />
            <Skeleton circle width={24} height={24} />
            <div className="flex items-center space-x-2">
              <Skeleton circle width={32} height={32} />
              <div className="hidden sm:block">
                <Skeleton width={80} height={12} />
                <Skeleton width={60} height={12} />
              </div>
            </div>
            <Skeleton width={100} height={32} borderRadius={6} />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="container mx-auto px-4 py-2">
            {[...Array(3)].map((_, index) => (
              <Skeleton key={index} height={24} className="my-2" />
            ))}
          </div>
        </div>
      </header>
    </SkeletonTheme>
  );
};

export default HeaderSkeleton;
