import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Upload, FileText, AlertTriangle, CheckCircle, X, Image } from 'lucide-react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/products';
import { toast } from '@/hooks/use-toast';

const PrescriptionUploadPage = () => {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get('product');
  const product = productId ? products.find((p) => p.id === productId) : null;

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success'>('idle');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: 'File too large',
          description: 'Please select a file smaller than 5MB',
          variant: 'destructive',
        });
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploadStatus('uploading');
    
    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setUploadStatus('success');
    toast({
      title: 'Prescription Uploaded',
      description: 'Your prescription has been submitted for review. We will notify you once approved.',
    });
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadStatus('idle');
  };

  return (
    <Layout>
      <div className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">Upload Prescription</h1>
          <p className="text-muted-foreground mt-2">
            Submit your prescription for verification
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Selected Product */}
          {product && (
            <Card className="p-4 mb-6">
              <div className="flex items-center gap-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{product.name}</h3>
                  <p className="text-sm text-muted-foreground">{product.manufacturer}</p>
                </div>
                <Badge variant="prescription" className="gap-1">
                  <FileText className="h-3 w-3" />
                  Rx Required
                </Badge>
              </div>
            </Card>
          )}

          {/* Upload Instructions */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              Valid Prescription Requirements
            </h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                <span>Prescription must be issued by a licensed medical practitioner</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                <span>Must contain doctor's name, registration number, and signature</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                <span>Patient name and date should be clearly visible</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-success mt-0.5 shrink-0" />
                <span>Prescription should not be older than 6 months</span>
              </li>
            </ul>
          </Card>

          {/* Upload Area */}
          {uploadStatus === 'success' ? (
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-success-light rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Prescription Uploaded Successfully
              </h3>
              <p className="text-muted-foreground mb-6">
                Your prescription has been submitted for review. Our pharmacists will verify it 
                within 2-4 hours. We will notify you once approved.
              </p>
              <div className="flex gap-4 justify-center">
                <Button variant="outline" onClick={handleRemoveFile}>
                  Upload Another
                </Button>
                <Link to="/cart">
                  <Button variant="hero">Go to Cart</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <Card className="p-6">
              {/* File Preview */}
              {previewUrl ? (
                <div className="mb-6">
                  <div className="relative rounded-lg overflow-hidden bg-muted">
                    {selectedFile?.type.startsWith('image/') ? (
                      <img
                        src={previewUrl}
                        alt="Prescription preview"
                        className="w-full max-h-96 object-contain"
                      />
                    ) : (
                      <div className="flex items-center justify-center py-12">
                        <FileText className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    <button
                      onClick={handleRemoveFile}
                      className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:opacity-80"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    {selectedFile?.name}
                  </p>
                </div>
              ) : (
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/50 transition-colors">
                    <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                      <Upload className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Upload Prescription
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Drag and drop your prescription here or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Supported formats: JPG, PNG, PDF (Max 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </label>
              )}

              {/* Upload Button */}
              {selectedFile && (
                <Button
                  variant="hero"
                  className="w-full mt-6"
                  onClick={handleUpload}
                  disabled={uploadStatus === 'uploading'}
                >
                  {uploadStatus === 'uploading' ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4" />
                      Submit Prescription
                    </>
                  )}
                </Button>
              )}
            </Card>
          )}

          {/* Medical Disclaimer */}
          <div className="mt-8 bg-warning-light rounded-xl p-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
              <div>
                <h3 className="font-semibold text-warning-foreground mb-2">Medical Disclaimer</h3>
                <p className="text-sm text-warning-foreground/80">
                  The prescription you upload will be verified by our licensed pharmacists. 
                  We reserve the right to reject prescriptions that do not meet our verification 
                  criteria. All prescription medicines will only be dispensed upon valid prescription 
                  approval. Self-medication can be harmful to your health.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrescriptionUploadPage;
