# Research et AL - Official Website  -- https://researchetal.vercel.app/

<div align="center">
  <img src="public/logo.jpeg" alt="Research et AL Logo" width="200" height="200">
</div>

Official website for the Research et AL club - a vibrant community dedicated to exploring research, innovation, and knowledge discovery.

## ✨ Features

### 🎨 Visual Design
- **Animated Background**: 50+ floating purple bubbles with 6 unique random animations
- **Dynamic Navbar**: Floating navbar with mouse-following purple light effect (Dynamic Island style)
- **Fade-in Animations**: Smooth logo entrance with scaling effect
- **Glass-morphism**: Modern translucent effects with backdrop blur
- **Responsive Design**: Mobile-first approach optimized for all devices

### 🎭 Interactive Elements
- **Mouse Tracking**: Purple light follows cursor on navbar hover
- **Floating Bubbles**: Multiple animation patterns with different speeds and directions
- **Smooth Transitions**: Elegant hover effects and state changes
- **Custom Favicon**: Club logo displayed in browser tab

### 🎨 Design System
- **Primary Color**: Purple (`#9333EA` / `#A855F7`)
- **Secondary Colors**: Black (`#000000`), Dark Gray (`#1F1F1F`)
- **Accent Color**: White (`#FFFFFF`)
- **Typography**: Inter (clean, modern sans-serif)
- **Layout**: Minimalist, research-focused aesthetic

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: npm
- **Components**: React with client-side interactivity

## 📦 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dchaudhari7177/Etal.git
cd Et-Al
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build optimized production version
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 📁 Project Structure

```
Et-Al/
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout with metadata & favicon
│   │   ├── page.tsx        # Home page with animations
│   │   └── globals.css     # Global styles & animations
│   └── components/
│       └── Navbar.tsx      # Interactive navbar component
├── public/
│   └── logo.jpeg          # Club logo
├── Images/                # Original assets
├── .github/
│   └── copilot-instructions.md  # AI development guidelines
├── tailwind.config.ts      # Custom theme configuration
├── tsconfig.json          # TypeScript configuration
└── next.config.mjs        # Next.js configuration
```

## 🎨 Custom Animations

### Bubble Animations
- **6 unique keyframes** with different movement patterns
- **Staggered timing** for natural, organic motion
- **Scale & rotation effects** for added visual interest
- **Multiple sizes** from tiny 1.5px dots to large 32px blurred circles

### Interactive Effects
- **Mouse tracking** with smooth purple light following
- **Fade-in sequences** with scale transformation
- **Hover states** with color transitions
- **Glass-morphism** backdrop blur effects

## 🌟 Key Components

### Navbar (`src/components/Navbar.tsx`)
- Client-side interactive component
- Real-time mouse position tracking
- Dynamic light effect on hover
- Floating design with rounded corners
- Purple border glow and shadow effects

### Home Page (`src/app/page.tsx`)
- Animated bubble background (50+ elements)
- Logo with fade-in animation
- Responsive typography and layout
- Fixed footer with transparency

### Global Styles (`src/app/globals.css`)
- Custom keyframe animations for bubbles
- Fade-in animation definitions
- Tailwind CSS imports and overrides

## 🎯 Customization

### Adding New Bubbles
Modify `src/app/page.tsx` and add new bubble elements with different:
- Positions (`top-[%]`, `left-[%]`, `right-[%]`)
- Sizes (`w-` and `h-` classes)
- Animations (`animate-float-1` through `animate-float-6`)
- Opacity levels (`bg-primary/[opacity]`)

### Changing Colors
Update `tailwind.config.ts` primary color values:
```typescript
primary: {
  DEFAULT: '#YOUR_COLOR',
  light: '#YOUR_LIGHT_COLOR',
  dark: '#YOUR_DARK_COLOR',
}
```

## 📱 Responsive Features

- **Mobile Navigation**: Simplified layout for small screens
- **Flexible Grid**: Adaptive bubble positioning
- **Scalable Typography**: Responsive text sizing (text-5xl md:text-7xl)
- **Touch-friendly**: Optimized interactive elements

## � Development Guidelines

- **TypeScript First**: All components use strict typing
- **Component Separation**: Interactive elements in separate components
- **Performance Optimized**: Next.js Image optimization and proper loading
- **Clean Code**: Comment-free, production-ready codebase

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

Research et AL Club - Building the future of research collaboration

---

**Built with ❤️ by the Research et AL team**
