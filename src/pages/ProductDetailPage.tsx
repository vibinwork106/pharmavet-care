import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, FileText, AlertTriangle, ChevronLeft, Shield, Truck, Clock } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <Link to="/products">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4" />
              Back to Products
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!product.requiresPrescription) {
      addToCart(product);
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-muted py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            <span className="text-muted-foreground">/</span>
            <Link to="/products" className="text-muted-foreground hover:text-foreground">Products</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="bg-card rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {product.requiresPrescription ? (
                <Badge variant="prescription" className="gap-1">
                  <FileText className="h-3 w-3" />
                  Prescription Required
                </Badge>
              ) : (
                <Badge variant="success" className="gap-1">
                  <Shield className="h-3 w-3" />
                  OTC Medicine
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-muted-foreground mb-1">{product.genericName}</p>
            <p className="text-sm text-muted-foreground mb-6">by {product.manufacturer}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-foreground">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ₹{product.originalPrice}
                  </span>
                  <Badge variant="success">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </Badge>
                </>
              )}
            </div>

            {/* Pack Size */}
            <p className="text-foreground mb-6">
              <span className="font-medium">Pack Size:</span> {product.quantity}
            </p>

            {/* Prescription Warning */}
            {product.requiresPrescription && (
              <div className="bg-warning-light border border-warning/20 rounded-xl p-4 mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                  <div>
                    <p className="font-semibold text-warning-foreground">Prescription Required</p>
                    <p className="text-sm text-warning-foreground/80 mt-1">
                      This medicine requires a valid prescription from a licensed medical practitioner. 
                      Please upload your prescription to add this item to cart.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex gap-4 mb-8">
              {product.inStock ? (
                product.requiresPrescription ? (
                  <Link to={`/prescription-upload?product=${product.id}`} className="flex-1">
                    <Button variant="prescription" size="xl" className="w-full gap-2">
                      <FileText className="h-5 w-5" />
                      Upload Prescription
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="hero" 
                    size="xl" 
                    className="flex-1 gap-2"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </Button>
                )
              ) : (
                <Button variant="outline-muted" size="xl" className="flex-1" disabled>
                  Out of Stock
                </Button>
              )}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted rounded-xl">
                <Shield className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">100% Genuine</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-xl">
                <Truck className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Fast Delivery</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-xl">
                <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-12 grid lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Usage Instructions</h2>
            <p className="text-muted-foreground">{product.usage}</p>
            
            {product.sideEffects && (
              <div className="mt-4 pt-4 border-t border-border">
                <h3 className="font-medium text-foreground mb-2">Side Effects</h3>
                <p className="text-sm text-muted-foreground">{product.sideEffects}</p>
              </div>
            )}
          </Card>
        </div>

        {/* Medical Disclaimer */}
        <div className="mt-8 bg-muted rounded-xl p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">Medical Disclaimer</h3>
              <p className="text-sm text-muted-foreground">
                The information provided is for general reference only. It is not intended to substitute 
                professional medical advice, diagnosis, or treatment. Always seek the advice of your 
                physician or other qualified health provider with any questions you may have regarding 
                a medical condition. Self-medication can be harmful.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
