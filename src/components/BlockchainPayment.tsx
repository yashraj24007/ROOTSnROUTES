import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { CheckCircle, Clock, AlertCircle, Shield, Wallet, Lock } from 'lucide-react';
import { blockchainService, BlockchainTransaction } from '@/services/blockchainService';
import { useToast } from '@/hooks/use-toast';

interface BlockchainPaymentProps {
  vendorId: string;
  vendorName: string;
  amount: number;
  description: string;
  onPaymentComplete?: (transaction: BlockchainTransaction) => void;
}

const BlockchainPayment: React.FC<BlockchainPaymentProps> = ({
  vendorId,
  vendorName,
  amount,
  description,
  onPaymentComplete
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [transaction, setTransaction] = useState<BlockchainTransaction | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const result = await blockchainService.makePayment(
        'current_user_id', // In real app, get from auth context
        vendorId,
        amount
      );
      
      setTransaction(result);
      onPaymentComplete?.(result);
      
      toast({
        title: 'Payment Successful!',
        description: 'Your payment has been processed securely on the blockchain.',
      });
    } catch (error) {
      toast({
        title: 'Payment Failed',
        description: 'There was an error processing your payment. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-green-600" />
          Secure Blockchain Payment
        </CardTitle>
        <CardDescription>
          Pay securely using blockchain technology
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Vendor:</span>
            <span className="text-sm font-medium">{vendorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Service:</span>
            <span className="text-sm">{description}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-muted-foreground">Amount:</span>
            <span className="text-lg font-bold">₹{amount.toLocaleString()}</span>
          </div>
        </div>

        <Separator />

        <Alert>
          <Lock className="h-4 w-4" />
          <AlertDescription>
            <strong>Blockchain Security:</strong> Your payment is secured by blockchain technology, 
            ensuring transparency and immutable transaction records.
          </AlertDescription>
        </Alert>

        {transaction ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {getStatusIcon(transaction.status)}
              <span className="text-sm font-medium">
                Transaction {transaction.status}
              </span>
              <Badge variant={transaction.status === 'confirmed' ? 'default' : 'secondary'}>
                {transaction.status}
              </Badge>
            </div>
            
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-xs text-muted-foreground">Transaction ID:</p>
              <p className="text-sm font-mono break-all">{transaction.id}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {new Date(transaction.timestamp).toLocaleString()}
              </p>
            </div>

            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  View Transaction Details
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Transaction Details</DialogTitle>
                  <DialogDescription>
                    Blockchain transaction information
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Transaction ID</p>
                      <p className="text-sm font-mono break-all">{transaction.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        <span className="text-sm">{transaction.status}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Type</p>
                      <p className="text-sm">{transaction.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Timestamp</p>
                      <p className="text-sm">{new Date(transaction.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ) : (
          <Button 
            onClick={handlePayment} 
            disabled={loading}
            className="w-full"
          >
            <Wallet className="h-4 w-4 mr-2" />
            {loading ? 'Processing...' : `Pay ₹${amount.toLocaleString()}`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default BlockchainPayment;