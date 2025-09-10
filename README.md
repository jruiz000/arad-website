# ARAD System Website

A modern, responsive website for ARAD System - an institutional-grade algorithmic trading platform that transforms historical market data into forward-looking insights.

## 🚀 Live Demo

[ARAD System Website](https://arad-system.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Modern Design**: Clean, professional design with ARAD brand colors
- **Responsive**: Fully responsive across all devices
- **Accessible**: WCAG 2.1 compliant with proper ARIA labels
- **SEO Optimized**: Meta tags, structured data, and semantic HTML
- **Performance**: Optimized images, lazy loading, and efficient CSS
- **Interactive**: Smooth scrolling, animations, and hover effects
- **Contact Form**: Integrated Typeform for lead generation

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 4.4.5
- **Styling**: Tailwind CSS 3.3.3
- **UI Components**: @relume_io/relume-ui
- **Animations**: Framer Motion 10.16.4
- **Icons**: React Icons 4.11.0
- **Fonts**: Libre Caslon Text, Inconsolata
- **Deployment**: Vercel (recommended)

## 📁 Project Structure

```
arad-system-new-website/
├── README.md                # Project docs (root)
├── .gitignore               # Git ignore (root)
└── app/                     # App code lives here
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    ├── vite.config.js
    ├── public/
    │   └── images/
    ├── src/
    │   ├── App.jsx
    │   ├── main.jsx
    │   ├── index.css
    │   ├── components/
    │   │   ├── navbar-01.jsx
    │   │   ├── layout/
    │   │   │   └── footer-03.jsx
    │   │   └── sections/
    │   │       ├── banner-07.jsx
    │   │       ├── blog-36.jsx
    │   │       ├── contact-form.jsx
    │   │       ├── faq-11.jsx
    │   │       ├── header-02.jsx
    │   │       ├── layout-01.jsx
    │   │       ├── layout-239.jsx
    │   │       ├── layout-328.jsx
    │   │       ├── logo-06.jsx
    │   │       ├── pricing-18.jsx
    │   │       └── stats-13.jsx
    └── legacy/
        └── html_file_site/
            └── home/
                └── index.html
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/arad-system-website.git
   cd arad-system-website/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to http://localhost:5173

## 💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Development Guidelines

- **Components**: Use functional components with hooks
- **Styling**: Use Tailwind CSS classes, custom CSS for complex styles
- **Accessibility**: Include proper ARIA labels and semantic HTML
- **Performance**: Optimize images and use lazy loading
- **SEO**: Use proper meta tags and structured data

### Code Style

- Use consistent naming conventions
- Include proper comments for complex logic
- Follow React best practices
- Use TypeScript for better type safety (future enhancement)

## 🏗️ Building for Production

```bash
npm run build
```

The build output will be in `app/dist/`, ready for deployment.

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your GitHub repository to Vercel**
2. **Configure build settings**:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
   - Root Directory: `app/`

3. **Environment Variables**: None required

### Manual Deployment

```bash
# Build the project
npm run build

# The app/dist/ folder is ready for deployment
```

### Other Platforms

- Netlify: set publish directory to `app/dist/`
- GitHub Pages: deploy from `app/dist/`
- AWS S3: upload `app/dist/` contents

## 🎨 Customization

### Brand Colors

The website uses ARAD brand colors defined in `app/tailwind.config.js`:

```javascript
colors: {
  'meteorite': '#3C2074',
  'geraldine': '#F89078',
  'french-rose': '#EA4F88',
  'medium-red-violet': '#A3319F',
  'karry': '#FFE5D0',
}
```

### Typography

- Headings: Libre Caslon Text (serif)
- Body: Inconsolata (monospace)

### Sections

Each section is a separate component in `app/src/components/sections/`.

## 🔧 Configuration

### Typeform Integration

Update the form ID in `app/src/components/sections/contact-form.jsx`:

```jsx
<div data-tf-live="YOUR_FORM_ID"></div>
```

### Analytics

Add Google Analytics by updating the tracking ID in `app/index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure accessibility standards are met

## 📝 License

This project is proprietary and confidential. All rights reserved by ARAD System.

## 📞 Support

For support and questions:
- Email: contact@arad-system.com
- Website: https://arad-system.com

---

**ARAD System** - Transform Historical Data into Forward-Looking Insights
