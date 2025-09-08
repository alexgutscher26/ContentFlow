import DashboardLayout from '@/components/dashboard/DashboardLayout';
import DraftEditor from '@/components/collaboration/DraftEditor';

interface DraftPageProps {
  params: {
    draftId: string;
  };
}

export default function DraftPage({ params }: DraftPageProps) {
  return (
    <DashboardLayout>
      <DraftEditor draftId={params.draftId} />
    </DashboardLayout>
  );
}