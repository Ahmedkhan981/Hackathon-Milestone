import { auth } from "@clerk/nextjs/server"
import { getMyOrder } from "@/sanity/lib/orders/getMyOrder"
import { redirect } from "next/navigation"
import OrderClient from "../components/layout/OrderClient"
import { Order } from "sanity.types"
const OrderPage = async () => {
  const { userId } = await auth()

  if (!userId) {
    redirect("/")
  }

  const orders= await getMyOrder(userId);
  
  
if(orders?.length==0){
  return(
        <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <p className="text-gray-600">You have no orders yet.</p>
    </div>
  )
}
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <OrderClient orders={orders as unknown as Order[]} />
    </div>
  );
}

export default OrderPage