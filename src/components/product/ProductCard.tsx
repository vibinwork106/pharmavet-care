import { Link } from 'react-router-dom';
import { ShoppingCart, FileText, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!product.requiresPrescription) {
      addToCart(product);
    }
  };

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group overflow-hidden border-2 border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.requiresPrescription && (
              <Badge variant="prescription" className="gap-1">
                <FileText className="h-3 w-3" />
                Rx Required
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="destructive" className="gap-1">
                <AlertCircle className="h-3 w-3" />
                Out of Stock
              </Badge>
            )}
          </div>
          {product.originalPrice && (
            <div className="absolute top-3 right-3">
              <Badge variant="success" className="text-xs">
                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
              </Badge>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          <p className="text-xs text-muted-foreground mb-1">{product.manufacturer}</p>
          <h3 className="font-semibold text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">{product.quantity}</p>
          
          <div className="mt-auto">
            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl font-bold text-foreground">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            {product.inStock ? (
              product.requiresPrescription ? (
                <Button variant="prescription" size="sm" className="w-full gap-2">
                  <FileText className="h-4 w-4" />
                  Upload Prescription
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  size="sm" 
                  className="w-full gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="h-4 w-4" />
                  Add to Cart
                </Button>
              )
            ) : (
              <Button variant="outline-muted" size="sm" className="w-full" disabled>
                Out of Stock
              </Button>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
