import { AlertTriangle, Shield, FileCheck } from 'lucide-react';

export function SafetyBanner() {
  return (
    <section className="bg-warning-light border-y border-warning/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-center md:text-left">
          <div className="flex items-center gap-2 text-warning-foreground">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <span className="font-semibold">Important Notice</span>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-sm text-warning-foreground/80">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4" />
              <span>Prescription required for certain medicines</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span>Self-medication can be harmful. Consult a doctor</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
