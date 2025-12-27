import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, Truck, MapPin, ArrowRight } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD12345678';

  const steps = [
    { label: 'Order Placed', icon: CheckCircle, completed: true },
    { label: 'Processing', icon: Package, completed: false },
    { label: 'Shipped', icon: Truck, completed: false },
    { label: 'Delivered', icon: MapPin, completed: false },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-success-light rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <CheckCircle className="h-12 w-12 text-success" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-muted-foreground text-lg mb-2">
            Thank you for your order
          </p>
          <p className="text-foreground font-medium text-xl mb-8">
            Order ID: <span className="text-primary">{orderId}</span>
          </p>

          {/* Order Tracking */}
          <Card className="p-6 mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-6">Order Status</h2>
            <div className="flex justify-between relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-border">
                <div className="h-full w-1/4 bg-success" />
              </div>

              {steps.map((step, index) => (
                <div key={step.label} className="relative flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step.completed
                        ? 'bg-success text-success-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p
                    className={`text-xs mt-2 ${
                      step.completed ? 'text-success font-medium' : 'text-muted-foreground'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Card className="p-4 text-left">
              <h3 className="font-medium text-foreground mb-2">Estimated Delivery</h3>
              <p className="text-muted-foreground text-sm">
                Your order will be delivered within 2-5 business days
              </p>
            </Card>
            <Card className="p-4 text-left">
              <h3 className="font-medium text-foreground mb-2">Order Updates</h3>
              <p className="text-muted-foreground text-sm">
                We'll send you SMS and email updates about your order
              </p>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/orders">
              <Button variant="outline" size="lg">
                <Package className="h-4 w-4" />
                Track Order
              </Button>
            </Link>
            <Link to="/products">
              <Button variant="hero" size="lg">
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccessPage;
