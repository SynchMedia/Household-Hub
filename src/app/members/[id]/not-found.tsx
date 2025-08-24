import Layout from '@/components/layout/layout';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function MemberNotFound() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mb-6">
            <svg className="mx-auto h-24 w-24 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
            </svg>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Member Not Found</h1>
          
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The member you're looking for doesn't exist or may have been removed from the system.
          </p>
          
          <div className="space-y-4">
            <Link href="/members">
              <Button size="lg">
                ← Back to Members
              </Button>
            </Link>
            
            <div className="text-sm text-gray-500">
              <p>If you believe this is an error, please check the member ID or</p>
              <Link 
                href={process.env.PROFILER_BASE_URL || 'http://localhost:3000'}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                open the Profiler app
              </Link>
              <p>to verify the member exists.</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
