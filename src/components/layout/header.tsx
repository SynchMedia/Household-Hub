import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Header = () => {
  const navigationItems = [
    { href: '/', label: 'Dashboard' },
    { href: '/members', label: 'Members' },
    { href: '/meals', label: 'Meals' },
    { href: '/budget', label: 'Budget' },
    { href: '/chores', label: 'Chores' },
    { href: '/fitness', label: 'Fitness' },
    { href: '/goals', label: 'Goals' },
    { href: '/settings', label: 'Settings' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Household Hub</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            <Button variant="outline" size="sm">
              Menu
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
