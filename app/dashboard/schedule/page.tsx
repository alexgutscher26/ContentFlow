import DashboardLayout from '@/components/dashboard/DashboardLayout';
import PostScheduler from '@/components/scheduler/PostScheduler';

export default function SchedulePage() {
  return (
    <DashboardLayout>
      <PostScheduler />
    </DashboardLayout>
  );
}