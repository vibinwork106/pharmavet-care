import { Link } from 'react-router-dom';
import { Package, ChevronRight, Clock, Truck, CheckCircle } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Mock orders data
const mockOrders = [
  {
    id: 'ORD78945612',
    date: '2024-12-25',
    status: 'delivered',
    total: 485,
    items: 3,
    deliveredAt: '2024-12-27',
  },
  {
    id: 'ORD78945613',
    date: '2024-12-27',
    status: 'shipped',
    total: 220,
    items: 2,
    estimatedDelivery: '2024-12-30',
  },
  {
    id: 'ORD78945614',
    date: '2024-12-27',
    status: 'processing',
    total: 150,
    items: 1,
  },
];

const statusConfig = {
  pending: { label: 'Pending', color: 'warning' as const, icon: Clock },
  processing: { label: 'Processing', color: 'pending' as const, icon: Package },
  shipped: { label: 'Shipped', color: 'default' as const, icon: Truck },
  delivered: { label: 'Delivered', color: 'success' as const, icon: CheckCircle },
};

const OrdersPage = () => {
  return (
    <Layout>
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Orders</h1>
          <p className="text-muted-foreground mt-2">Track and manage your orders</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {mockOrders.length > 0 ? (
          <div className="space-y-4">
            {mockOrders.map((order) => {
              const status = statusConfig[order.status as keyof typeof statusConfig];
              const StatusIcon = status.icon;

              return (
                <Card key={order.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Package className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Order #{order.id}</h3>
                        <p className="text-sm text-muted-foreground">
                          {order.items} items • ₹{order.total}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Placed on {new Date(order.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <Badge variant={status.color} className="gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                        {order.status === 'delivered' && order.deliveredAt && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Delivered on {new Date(order.deliveredAt).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </p>
                        )}
                        {order.status === 'shipped' && order.estimatedDelivery && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Expected by {new Date(order.estimatedDelivery).toLocaleDateString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                            })}
                          </p>
                        )}
                      </div>
                      <Button variant="ghost" size="icon">
                        <ChevronRight className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="h-12 w-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">No Orders Yet</h2>
            <p className="text-muted-foreground mb-8">
              You haven't placed any orders yet. Start shopping now!
            </p>
            <Link to="/products">
              <Button variant="hero" size="lg">
                Browse Medicines
              </Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
