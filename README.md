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

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
