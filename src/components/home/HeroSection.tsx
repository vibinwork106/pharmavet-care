import { Link } from 'react-router-dom';
import { Upload, ShoppingBag, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-pharmacy.jpg';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-up">
            <div className="inline-flex items-center gap-2 bg-success-light text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              100% Genuine Medicines Guaranteed
            </div>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Your Health,{' '}
              <span className="text-primary">Our Priority</span>
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Order medicines online with confidence. Upload your prescription and get 
              genuine medicines delivered to your doorstep safely and securely.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/prescription-upload">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  <Upload className="h-5 w-5" />
                  Upload Prescription
                </Button>
              </Link>
              <Link to="/products">
                <Button variant="outline" size="xl" className="w-full sm:w-auto">
                  <ShoppingBag className="h-5 w-5" />
                  Browse Medicines
                </Button>
              </Link>
            </div>

            {/* Trust Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 pt-8 border-t border-border">
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">10K+</p>
                <p className="text-sm text-muted-foreground">Products</p>
              </div>
              <div>
                <p className="text-2xl md:text-3xl font-bold text-primary">100%</p>
                <p className="text-sm text-muted-foreground">Genuine</p>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src={heroImage}
                alt="Pharmavet - Trusted Online Pharmacy"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-lg animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-success-light rounded-full flex items-center justify-center">
                  <Shield className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Licensed Pharmacy</p>
                  <p className="text-sm text-muted-foreground">Verified & Trusted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
