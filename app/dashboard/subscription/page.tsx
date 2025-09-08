import DashboardLayout from '@/components/dashboard/DashboardLayout';
import SubscriptionManagement from '@/components/subscription/SubscriptionManagement';

export default function SubscriptionPage() {
  return (
    <DashboardLayout>
      <SubscriptionManagement />
    </DashboardLayout>
  );
}