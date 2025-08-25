# Household Hub

A comprehensive household management application built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Dashboard**: Overview of all household modules
- **Members**: Manage household members
- **Meals**: Plan and track meals
- **Budget**: Track finances and expenses
- **Chores**: Manage household tasks
- **Fitness**: Health and wellness tracking
- **Goals**: Set and track objectives
- **Settings**: Application configuration

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Environment Setup

### Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Household [Profiler](https://github.com/SynchMedia/household-profiler) API Configuration
PROFILER_BASE_URL=http://localhost:3000
# PROFILER_API_KEY=  # Optional: Add if your [Profiler](https://github.com/SynchMedia/household-profiler) API requires authentication
```

**Important Notes:**
- **Port Configuration**: Household Hub runs on port 3001, [Profiler](https://github.com/SynchMedia/household-profiler) API on port 3000
- **Cross-Machine Setup**: If running Hub and [Profiler](https://github.com/SynchMedia/household-profiler) on different machines, replace `localhost` with the actual IP address or hostname
- **Server-Side Fetching**: All [Profiler](https://github.com/SynchMedia/household-profiler) API calls are made server-side to avoid CORS issues

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Household_Hub
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Available Scripts

- `npm run dev` - Start development server on port 3001
- `npm run build` - Build for production
- `npm run start` - Start production server on port 3001
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Dashboard page
├── components/          # Reusable components
│   ├── ui/            # shadcn/ui components
│   └── layout/        # Layout components
└── lib/               # Utility functions
```

## Development

The application uses:
- **TypeScript** with strict mode for type safety
- **Tailwind CSS** for responsive design
- **shadcn/ui** components for consistent UI
- **App Router** for modern Next.js routing

### Data Caching Strategy

The Household Hub uses Next.js built-in fetch caching for optimal performance:

- **List Endpoints** (Household, Members): 60-second cache with `revalidate: 60`
- **Detail Endpoints** (Individual Member): 30-second cache with `revalidate: 30`
- **Cache Tags**: All [Profiler](https://github.com/SynchMedia/household-profiler) data uses the `profiler-data` tag for easy invalidation
- **Server-Side Rendering**: All API calls are made server-side for better performance and SEO

This approach provides:
- **Fresh Data**: Regular updates without manual refresh
- **Performance**: Reduced API calls and faster page loads
- **Stability**: Graceful fallbacks when the [Profiler](https://github.com/SynchMedia/household-profiler) API is unavailable

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
