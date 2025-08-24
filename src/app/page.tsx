import Layout from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getHousehold, getMembers } from '@/lib/profiler';

// Helper function to check if Profiler API is on localhost but Hub might be on different machine
function isLocalhostSetupIssue(): boolean {
  const profilerUrl = process.env.PROFILER_BASE_URL;
  if (!profilerUrl) return false;
  
  try {
    const url = new URL(profilerUrl);
    return url.hostname === 'localhost' || url.hostname === '127.0.0.1';
  } catch {
    return false;
  }
}

const Dashboard = async () => {
  // Fetch household data
  const householdResult = await getHousehold();
  const membersResult = await getMembers();

  // Get current date
  const today = new Date();
  const dateOptions: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = today.toLocaleDateString('en-US', dateOptions);

  // Process member data
  let memberCount = 0;
  let adultCount = 0;
  let minorCount = 0;
  let profilerAvailable = false;

  if (membersResult.ok && membersResult.data) {
    profilerAvailable = true;
    memberCount = membersResult.data.length;
    
    // Simple logic to categorize members (you can adjust this based on your data structure)
    membersResult.data.forEach(member => {
      // Assuming members have an age or type field - adjust as needed
      // For now, we'll just count all as adults for demonstration
      adultCount++;
    });
    minorCount = memberCount - adultCount;
  }

  // Dashboard cards with live data
  const modules = [
    { 
      title: 'Meals', 
      description: 'Planner not connected yet',
      status: 'info'
    },
    { 
      title: 'Chores', 
      description: '0 due today',
      status: 'neutral'
    },
    { 
      title: 'Budget', 
      description: '$0 / $0',
      status: 'neutral'
    },
    { 
      title: 'Calendar', 
      description: '0 events today',
      status: 'neutral'
    },
    { 
      title: 'Grocery List', 
      description: '0 items',
      status: 'neutral'
    },
    { 
      title: 'Fitness', 
      description: `Members: ${memberCount}`,
      status: profilerAvailable ? 'success' : 'warning'
    },
    { 
      title: 'Goals', 
      description: `Profiles: ${memberCount}`,
      status: profilerAvailable ? 'success' : 'warning'
    },
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header with household info and date */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div className="flex items-center gap-2">
              {householdResult.ok && householdResult.data ? (
                <span className="text-lg text-gray-700">
                  {householdResult.data.name}
                </span>
              ) : (
                <span className="text-lg text-gray-500">Household</span>
              )}
              {profilerAvailable && (
                <span className="text-sm text-gray-500">
                  • {memberCount} member{memberCount !== 1 ? 's' : ''}
                </span>
              )}
            </div>
            <span className="text-sm text-gray-500">{formattedDate}</span>
          </div>
        </div>

        {/* Setup Hint for localhost configuration */}
        {isLocalhostSetupIssue() && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Setup Hint
                </h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>
                    Your Profiler API is configured to use <code className="bg-blue-100 px-1 rounded">localhost:3000</code>. 
                    If you're running the Household Hub on a different machine, update your <code className="bg-blue-100 px-1 rounded">.env.local</code> 
                    file with the correct IP address or hostname.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profiler Status Banner */}
        {!profilerAvailable && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Profiler API Unavailable
                </h3>
                <div className="mt-2 text-sm text-yellow-700">
                  <p>
                    Unable to connect to Household Profiler. Dashboard is showing placeholder data. 
                    Please check your Profiler service and ensure it's running on {process.env.PROFILER_BASE_URL || 'localhost:3000'}.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Member Summary */}
        {profilerAvailable && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-blue-800">Household Summary</h3>
                <p className="text-sm text-blue-700 mt-1">
                  {memberCount} total member{memberCount !== 1 ? 's' : ''}
                  {adultCount > 0 && ` • ${adultCount} adult${adultCount !== 1 ? 's' : ''}`}
                  {minorCount > 0 && ` • ${minorCount} minor${minorCount !== 1 ? 's' : ''}`}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">{memberCount}</div>
                <div className="text-xs text-blue-500">Members</div>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className={`text-sm ${
                  module.status === 'success' ? 'text-green-600' :
                  module.status === 'warning' ? 'text-yellow-600' :
                  module.status === 'info' ? 'text-blue-600' :
                  'text-gray-600'
                }`}>
                  {module.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
