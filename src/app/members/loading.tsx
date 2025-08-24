import Layout from '@/components/layout/layout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

const MembersLoading = () => {
  // Create skeleton cards
  const skeletonCards = Array.from({ length: 6 }, (_, i) => (
    <Card key={i} className="animate-pulse">
      <CardHeader>
        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </CardContent>
    </Card>
  ));

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-600 mt-2">Loading household members...</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skeletonCards}
        </div>
      </div>
    </Layout>
  );
};

export default MembersLoading;
