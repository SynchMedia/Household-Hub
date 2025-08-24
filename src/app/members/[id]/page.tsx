import Layout from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getMember, formatAge, formatHeight, formatHeightWeight } from '@/lib/profiler';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';

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

        {/* Top Row: Profile (Left) and Calendar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card - Takes 2 columns */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Photo */}
                {member.photo && (
                  <div className="flex justify-center">
                    <Image
                      src={member.photo}
                      alt={`${member.name}'s photo`}
                      width={200}
                      height={200}
                      className="rounded-lg object-cover"
                      unoptimized={true}
                    />
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {renderInfoSection(
                    'Age',
                    formatAge(member.dateOfBirth, member.age),
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
                    member.height ? formatHeight(member.height) : undefined,
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  )}
                  
                  {renderInfoSection(
                    'Weight',
                    member.weight ? `${member.weight} lbs.` : undefined,
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
          </div>

          {/* Calendar Card - Takes 1 column */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Activities Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-sm">Calendar coming soon</p>
                  <p className="text-gray-400 text-xs mt-1">Individual activities will be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Second Row: Income (Left) and Preferences (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Income Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Income</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="text-gray-400 mb-3">
                  <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <p className="text-gray-500">Income information</p>
                <p className="text-gray-400 text-sm mt-1">Will be integrated with budget system</p>
              </div>
            </CardContent>
          </Card>

          {/* Preferences Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Array.isArray(member.likes) && member.likes.length > 0 && (
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

              {(!Array.isArray(member.likes) || member.likes.length === 0) && (
                <div className="text-center py-4">
                  <p className="text-gray-500">No preferences specified</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Dietary Information Card - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Dietary Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">

            {/* Parse and display allergens */}
            {(() => {
              let allergensArray: string[] = [];
              
              if (typeof member.allergens === 'string' && member.allergens.trim()) {
                try {
                  allergensArray = JSON.parse(member.allergens);
                } catch (e) {
                  console.error('Failed to parse allergens:', e);
                }
              } else if (Array.isArray(member.allergens)) {
                allergensArray = member.allergens;
              }
              
              return allergensArray.length > 0 ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Allergens</h4>
                  <div className="flex flex-wrap gap-2">
                    {allergensArray.map((allergen, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                      >
                        {allergen}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}
            
            {/* Parse and display exclusions */}
            {(() => {
              let exclusionsArray: string[] = [];
              
              if (typeof member.exclusions === 'string' && member.exclusions.trim()) {
                try {
                  exclusionsArray = JSON.parse(member.exclusions);
                } catch (e) {
                  console.error('Failed to parse exclusions:', e);
                }
              } else if (Array.isArray(member.exclusions)) {
                exclusionsArray = member.exclusions;
              }
              
              return exclusionsArray.length > 0 ? (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Dietary Exclusions</h4>
                  <div className="flex flex-wrap gap-2">
                    {exclusionsArray.map((exclusion, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800"
                      >
                        {exclusion}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null;
            })()}

            {/* Show empty state if no dietary restrictions */}
            {(() => {
              let hasAllergens = false;
              let hasExclusions = false;
              
              if (typeof member.allergens === 'string' && member.allergens.trim()) {
                try {
                  const parsed = JSON.parse(member.allergens);
                  hasAllergens = Array.isArray(parsed) && parsed.length > 0;
                } catch (e) {
                  hasAllergens = false;
                }
              } else if (Array.isArray(member.allergens)) {
                hasAllergens = member.allergens.length > 0;
              }
              
              if (typeof member.exclusions === 'string' && member.exclusions.trim()) {
                try {
                  const parsed = JSON.parse(member.exclusions);
                  hasExclusions = Array.isArray(parsed) && parsed.length > 0;
                } catch (e) {
                  hasExclusions = false;
                }
              } else if (Array.isArray(member.exclusions)) {
                hasExclusions = member.exclusions.length > 0;
              }
              
              if (!hasAllergens && !hasExclusions) {
                return (
                  <div className="text-center py-4">
                    <p className="text-gray-500">No dietary restrictions specified</p>
                  </div>
                );
              }
              return null;
            })()}
          </CardContent>
        </Card>

        {/* Goals Card - Full Width */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Goals</CardTitle>
          </CardHeader>
          <CardContent>
            {Array.isArray(member.goals) && member.goals.length > 0 ? (
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
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-500">No goals specified</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Medical Information - Full Width */}
        <div className="space-y-6">
          {/* Medical Notes */}
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

          {/* Medication Section - Placeholder for future */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Medication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-6">
                <div className="text-gray-400 mb-3">
                  <svg className="mx-auto h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <p className="text-gray-500">Medication tracking</p>
                <p className="text-gray-400 text-sm mt-1">Will be integrated with medical system</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default MemberDetailPage;
