export interface Product {
  id: string;
  name: string;
  genericName: string;
  manufacturer: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: 'otc' | 'prescription' | 'supplement';
  inStock: boolean;
  requiresPrescription: boolean;
  description: string;
  usage: string;
  sideEffects?: string;
  dosage: string;
  quantity: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
  prescriptionStatus?: 'pending' | 'approved' | 'rejected' | 'not_required';
  prescriptionId?: string;
}

export interface Prescription {
  id: string;
  productId: string;
  userId: string;
  fileUrl: string;
  fileName: string;
  status: 'pending' | 'approved' | 'rejected';
  uploadedAt: Date;
  reviewedAt?: Date;
  adminNotes?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'upi';
  paymentStatus: 'pending' | 'completed' | 'failed';
  shippingAddress: Address;
  createdAt: Date;
  estimatedDelivery?: Date;
}

export interface Address {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}
