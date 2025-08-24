import Layout from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const modules = [
    { title: 'Meals', description: 'Plan and track your meals' },
    { title: 'Chores', description: 'Manage household tasks' },
    { title: 'Budget', description: 'Track your finances' },
    { title: 'Calendar', description: 'Schedule and events' },
    { title: 'Grocery List', description: 'Shopping and groceries' },
    { title: 'Fitness', description: 'Health and wellness' },
    { title: 'Goals', description: 'Set and track objectives' },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome to your Household Hub</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{module.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
