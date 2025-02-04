export const signupSchema = {
    name: 'signup', 
    type: 'document',
    fields: [
      {
        name: 'userId',
        type: 'string',
        title: 'Unique User ID',  
      },
      {
        name: 'name',
        type: 'string',
        title: 'Full Name',  
      },
      {
        name: 'email',
        type: 'string',
        title: 'User Email',  
      },
      {
        name: 'phone',
        type: 'string',
        title: 'Phone Number',   
      },
      {
        name: 'password',
        type: 'string',
        title: 'Hashed Password',   
      },
      {
        name: 'createdAt',
        type: 'datetime',
        title: 'Account Creation Date',   
      },
      {
        name: 'role',
        type: 'string',
        title: 'User Role',  
        options: {
          list: [
            { title: 'Admin', value: 'admin' },
            { title: 'Customer', value: 'customer' }
          ]
        }
      }
    ]
  }

  





// ////////////////////////////////////////////////////////////////////////////////////////

// Product Schema (Sanity CMS)


export const productSchema = {
    name: 'product',
    type: 'document',
    fields: [
      {
        name: 'id',
        type: 'string',
        title: 'Unique Product ID',  
      },
      {
        name: 'name',
        type: 'string',
        title: 'Product Name',  
      },
      {
        name: 'description',
        type: 'text',
        title: 'Product Description',  
      },
      {
        name: 'price',
        type: 'number',
        title: 'Product Price',  
      },
      {
        name: 'currency',
        type: 'string',
        title: 'Currency Type',  
      },
      {
        name: 'image',
        type: 'image',
        title: 'Product Image',  
      },
      {
        name: 'category',
        type: 'string',
        title: 'Product Category', 
      },
      {
        name: 'stock',
        type: 'number',
        title: 'Available Stock',  
      },
      {
        name: 'rating',
        type: 'number',
        title: 'Product Rating',  
      },
      {
        name: 'reviews',
        type: 'number',
        title: 'Total Reviews',  
      }
    ]
  }
  

// ////////////////////////////////////////////////////////////////////////////////////////


// Cart Schema (Sanity CMS)


export const cartSchema = {
    name: 'cart',
    type: 'document',
    fields: [
      {
        name: 'orderId',
        type: 'string',
        title: 'Unique Order ID',  
      },
      {
        name: 'userId',
        type: 'string',
        title: 'User ID',  
      },
      {
        name: 'products',
        type: 'array',
        of: [{ type: 'reference', to: [{ type: 'product' }] }],
        title: 'List of Products',  
      },
      {
        name: 'totalPrice',
        type: 'number',
        title: 'Total Price',  
      },
      {
        name: 'createdAt',
        type: 'datetime',
        title: 'Cart Creation Timestamp',
      },
      {
        name: 'updatedAt',
        type: 'datetime',
        title: 'Last Modification Timestamp',  
      }
    ]
  }
  
// ////////////////////////////////////////////////////////////////////////////////////////

// Shipment Schema (Sanity CMS)


export const shipmentSchema = {
    name: 'shipment',
    type: 'document',
    fields: [
      {
        name: 'shipmentId',
        type: 'string',
        title: 'Unique Shipment ID', 
      },
      {
        name: 'orderId',
        type: 'string',
        title: 'Order ID',  
      },
      {
        name: 'userId',
        type: 'string',
        title: 'User ID',  
      },
      {
        name: 'trackingId',
        type: 'string',
        title: 'Tracking ID', 
      },
      {
        name: 'shippingAddress',
        type: 'string',
        title: 'Shipping Address',  
      },
      {
        name: 'status',
        type: 'string',
        title: 'Shipment Status', 
        options: {
          list: [
            { title: 'Pending', value: 'pending' },
            { title: 'Shipped', value: 'shipped' },
            { title: 'Delivered', value: 'delivered' }
          ]
        }
      },
      {
        name: 'estimatedDelivery',
        type: 'datetime',
        title: 'Estimated Delivery Date', 
      },
      {
        name: 'carrier',
        type: 'string',
        title: 'Shipping Carrier',  
      }
    ]
  }
  