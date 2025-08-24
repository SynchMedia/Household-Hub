import Layout from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getMembers, formatAge, formatHeightWeight, isValidPhotoUrl } from '@/lib/profiler';
import Link from 'next/link';
import Image from 'next/image';

const MembersPage = async () => {
  // Fetch members data
  const membersResult = await getMembers();



  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Members</h1>
          <p className="text-gray-600 mt-2">Household members and profiles</p>
        </div>

        {/* Error State */}
        {!membersResult.ok && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error Loading Members
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{membersResult.error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {membersResult.ok && (!membersResult.data || membersResult.data.length === 0) && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No members found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding household members in the Profiler app.
            </p>
            <div className="mt-6">
              <a
                href={process.env.PROFILER_BASE_URL || 'http://localhost:3000'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Open Profiler App
              </a>
            </div>
          </div>
        )}

        {/* Members Grid */}
        {membersResult.ok && membersResult.data && membersResult.data.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {membersResult.data.map((member) => (
                             <Link key={member.id} href={`/members/${member.id}`} className="block">
                 <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                   <CardHeader className="pb-3">
                     {/* Photo and Name Row */}
                     <div className="flex items-center space-x-3">
                                               {/* Member Photo */}
                        {isValidPhotoUrl(member.photo) && member.photo ? (
                          <div className="flex-shrink-0">
                            <Image
                              src={member.photo}
                              alt={`${member.name}'s photo`}
                              width={48}
                              height={48}
                              className="rounded-full object-cover"
                              unoptimized={true}
                            />
                          </div>
                        ) : (
                         <div className="flex-shrink-0">
                           <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                             <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                             </svg>
                           </div>
                         </div>
                       )}
                       
                       {/* Member Name */}
                       <CardTitle className="text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                         {member.name}
                       </CardTitle>
                     </div>
                   </CardHeader>
                   
                   <CardContent className="space-y-3">
                                           {/* Age */}
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="h-4 w-4 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {formatAge(member.dob, member.age)}
                      </div>
                      
                      {/* Height and Weight */}
                      <div className="flex items-start text-sm text-gray-600">
                        <svg className="h-4 w-4 mr-2 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        <div className="leading-relaxed">
                          <div className="whitespace-pre-line">
                            {formatHeightWeight(member.height, member.weight)}
                          </div>
                        </div>
                      </div>
                     
                     {/* Click indicator */}
                     <div className="pt-2 border-t border-gray-100">
                       <div className="flex items-center text-xs text-blue-600 group-hover:text-blue-700">
                         <span>Click to view details</span>
                         <svg className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                         </svg>
                       </div>
                     </div>
                   </CardContent>
                 </Card>
               </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default MembersPage;
