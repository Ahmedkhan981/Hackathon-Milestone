import type React from "react";
import { Suspense } from "react";
import { COUPON_CODES } from "../../../sanity/lib/sales/couponCode";
import { getActiveSaleByCouponCode } from "../../../sanity/lib/sales/getActiveSaleByCouponCode";
import SaleBannerClient from "./SaleBannerClient";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { CalendarDays, Percent, Tag } from "lucide-react";
import SaleBannerSkeleton from "../Skeleton/SaleBannerSkeleton";
import { Sale } from "sanity.types";

const SaleBanner: React.FC = async () => {
  const sale:Sale|null = await getActiveSaleByCouponCode(
    COUPON_CODES.Ramadan as keyof typeof COUPON_CODES,
  ); // Explicit cast

  return (
    
    <Suspense fallback={<SaleBannerSkeleton />}>
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-500 via-slate-600 to-slate-800 opacity-90 h-[75%] top-[4.3rem] " />
        <CardHeader className="relative">
          <CardTitle className="text-4xl font-extrabold text-white text-center mb-2 drop-shadow-lg">
            {sale?.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="relative text-white">
          <p className="text-lg mb-6 text-center leading-relaxed">
            {sale?.description}
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 mb-6">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Percent className="w-5 h-5 mr-2" />
              {sale?.discountAmount}% OFF
            </Badge>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              <Tag className="w-5 h-5 mr-2" />
              Code: {COUPON_CODES.Ramadan}
            </Badge>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 mb-6 text-sm font-medium">
            <span className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2" />
              From:{" "}
              {sale?.validFrom
                ? new Date(sale?.validFrom).toLocaleDateString()
                : "N/A"}
            </span>
            <span className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2" />
              Until: {new Date(sale?.validUntil ?? "").toLocaleDateString()}
            </span>
          </div>

          <SaleBannerClient validUntil={sale?.validUntil || ""} />
        </CardContent>
      </Card>
    </Suspense>
  );
};

export default SaleBanner;
