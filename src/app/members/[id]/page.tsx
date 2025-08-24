import Layout from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getMember } from '@/lib/profiler';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface MemberDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

const MemberDetailPage = async ({ params }: MemberDetailPageProps) => {
  // Get params (Next.js 15 makes params async)
  const { id } = await params;
  
  // Fetch member data
  const memberResult = await getMember(id);

  // If member not found, show 404
  if (!memberResult.ok) {
    notFound();
  }

  const member = memberResult.data!;

  // Helper function to format age or DOB
  const formatAgeOrDOB = () => {
    if (member.age) {
      return `${member.age} years old`;
    }
    if (member.dateOfBirth) {
      const dob = new Date(member.dateOfBirth);
      const age = Math.floor((Date.now() - dob.getTime()) / (365.25 * 24 * 60 * 60 * 1000));
      return `${age} years old (born ${dob.toLocaleDateString()})`;
    }
    return 'Age not specified';
  };

  // Helper function to format lists
  const formatList = (items: string[] | undefined, emptyMessage: string) => {
    if (!items || items.length === 0) return emptyMessage;
    return items.join(', ');
  };

  // Helper function to render info section
  const renderInfoSection = (title: string, value: string | undefined, icon: React.ReactNode) => {
    if (!value) return null;
    
    return (
      <div className="flex items-center text-sm text-gray-600">
        <span className="mr-2 text-gray-400">{icon}</span>
        <span className="font-medium">{title}:</span>
        <span className="ml-2">{value}</span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header with back button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{member.name}</h1>
            <p className="text-gray-600 mt-2">Member profile and details</p>
          </div>
          <Link href="/members">
            <Button variant="outline">
              ← Back to Members
            </Button>
          </Link>
        </div>

        {/* Basic Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInfoSection(
                'Age',
                formatAgeOrDOB(),
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
              
              {renderInfoSection(
                'Sex',
                member.sex,
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
              
              {renderInfoSection(
                'Height',
                member.height,
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              )}
              
              {renderInfoSection(
                'Weight',
                member.weight,
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l1-6m-1 6l-6-2m6 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V9a2 2 0 012-2h8a2 2 0 012 2z" />
                </svg>
              )}
              
              {renderInfoSection(
                'Activity Level',
                member.activityLevel,
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Goals Card */}
        {member.goals && member.goals.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Goals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {member.goals.map((goal, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {goal}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dietary Information Card */}
        {(member.allergens && member.allergens.length > 0) || 
         (member.exclusions && member.exclusions.length > 0) ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Dietary Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {member.allergens && member.allergens.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Allergens</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.allergens.map((allergen, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {member.exclusions && member.exclusions.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Exclusions</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.exclusions.map((exclusion, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                      >
                        {exclusion}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Dietary Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No dietary restrictions specified</p>
            </CardContent>
          </Card>
        )}

        {/* Preferences Card */}
        {(member.likes && member.likes.length > 0) || 
         (member.dislikes && member.dislikes.length > 0) ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {member.likes && member.likes.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Likes</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.likes.map((like, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                      >
                        {like}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {member.dislikes && member.dislikes.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Dislikes</h4>
                  <div className="flex flex-wrap gap-2">
                    {member.dislikes.map((dislike, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800"
                      >
                        {dislike}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No preferences specified</p>
            </CardContent>
          </Card>
        )}

        {/* Medical Notes Card */}
        {member.medicalNotes && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Medical Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 whitespace-pre-wrap">{member.medicalNotes}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
};

export default MemberDetailPage;
