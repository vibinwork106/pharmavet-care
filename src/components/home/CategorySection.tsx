import { Link } from 'react-router-dom';
import { Pill, FileText, Leaf, ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const categories = [
  {
    id: 'otc',
    name: 'OTC Medicines',
    description: 'Over-the-counter medicines for common ailments',
    icon: Pill,
    color: 'bg-primary/10 text-primary',
    count: '500+ Products',
  },
  {
    id: 'prescription',
    name: 'Prescription Medicines',
    description: 'Medicines that require a valid prescription',
    icon: FileText,
    color: 'bg-prescription/10 text-prescription',
    count: '1000+ Products',
  },
  {
    id: 'supplement',
    name: 'Health Supplements',
    description: 'Vitamins, minerals, and wellness products',
    icon: Leaf,
    color: 'bg-secondary/10 text-secondary',
    count: '300+ Products',
  },
];

export function CategorySection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our comprehensive range of medicines and health products across various categories
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link 
              key={category.id} 
              to={`/products?category=${category.id}`}
              className="group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="p-6 h-full border-2 border-transparent hover:border-primary/20 hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 rounded-xl ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-primary font-medium">{category.count}</span>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
