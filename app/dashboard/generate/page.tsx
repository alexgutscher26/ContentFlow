import DashboardLayout from '@/components/dashboard/DashboardLayout';
import ContentGenerator from '@/components/content/ContentGenerator';

export default function GeneratePage() {
  return (
    <DashboardLayout>
      <ContentGenerator />
    </DashboardLayout>
  );
}