import { Search, Upload, CheckCircle, Truck } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search Medicine',
    description: 'Find the medicine you need from our vast catalog',
  },
  {
    icon: Upload,
    title: 'Upload Prescription',
    description: 'Upload prescription for restricted medicines',
  },
  {
    icon: CheckCircle,
    title: 'Get Approval',
    description: 'Our pharmacists verify your prescription',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Receive genuine medicines at your doorstep',
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ordering medicines online has never been easier. Follow these simple steps.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative text-center animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-border" />
              )}
              
              {/* Step Number */}
              <div className="relative mx-auto mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center relative z-10">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
