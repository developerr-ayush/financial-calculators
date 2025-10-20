# FinanceCalc - Financial Calculator Suite

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.14-38B2AC.svg)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-5.0.0-646CFF.svg)](https://vitejs.dev/)

> **Plan your finances with our comprehensive collection of calculators**

A modern, responsive web application providing essential financial planning tools including SIP calculators, income tax calculators, inflation calculators, and more. Built with React and Tailwind CSS for optimal performance and user experience.

## 🌟 Features

### 📊 **Calculator Suite**

- **SIP Calculator** - Calculate Systematic Investment Plan returns and growth
- **Step-up SIP Calculator** - Plan progressive investment strategies
- **Income Tax Calculator** - Compute tax liability under new tax regime
- **Inflation Calculator** - Understand inflation's impact on purchasing power

### 🎨 **Modern Design**

- **Dark Theme** - Sleek, modern dark UI with subtle gradients
- **Responsive Layout** - Mobile-first design that works on all devices
- **Interactive Charts** - Visual data representation using Chart.js
- **Smooth Animations** - GSAP-powered animations and transitions
- **Hamburger Menu** - Intuitive mobile navigation

### 🚀 **Performance & Accessibility**

- **Fast Loading** - Optimized with Vite and modern build tools
- **SEO Optimized** - Meta tags, structured data, and semantic HTML
- **Keyboard Navigation** - Full keyboard accessibility support
- **Screen Reader Friendly** - ARIA labels and semantic structure

## 🛠️ Tech Stack

### **Frontend Framework**

- **[React 18.2.0](https://reactjs.org/)** - Modern React with hooks and concurrent features
- **[React Router DOM](https://reactrouter.com/)** - Client-side routing
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework

### **Build & Development Tools**

- **[Vite 5.0.0](https://vitejs.dev/)** - Fast build tool and dev server
- **[ESLint](https://eslint.org/)** - Code linting and quality
- **[PostCSS](https://postcss.org/)** - CSS post-processing

### **Libraries & Dependencies**

- **[Chart.js](https://www.chartjs.org/)** - Interactive data visualization
- **[React Chart.js 2](https://react-chartjs-2.js.org/)** - React wrapper for Chart.js
- **[GSAP](https://greensock.com/gsap/)** - High-performance animations
- **[EmailJS](https://www.emailjs.com/)** - Email integration
- **[React Icons](https://react-icons.github.io/react-icons/)** - Icon library
- **[PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)** - Runtime type checking

## 🚀 Quick Start

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn

### **Installation**

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/financecalc.git
   cd financecalc
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
   Navigate to [http://localhost:5173](http://localhost:5173)

### **Build for Production**

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
financecalc/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   │   ├── Button.jsx
│   │   │   ├── Card.jsx
│   │   │   ├── Container.jsx
│   │   │   ├── Dropdown.jsx
│   │   │   ├── Input.jsx
│   │   │   └── Tabs.jsx
│   │   ├── Header.jsx     # Site header with navigation
│   │   ├── SEO.jsx        # SEO meta tags component
│   │   └── SIP.jsx        # SIP calculator component
│   ├── pages/             # Page components
│   │   ├── Home.jsx       # Landing page
│   │   ├── About.jsx      # About page
│   │   ├── SIP.jsx        # SIP calculator page
│   │   ├── StepUpSIP.jsx  # Step-up SIP page
│   │   ├── IncomeTaxCalculator.jsx
│   │   └── Inflation.jsx  # Inflation calculator
│   ├── utils/             # Utility functions
│   └── App.jsx            # Main app component
├── index.html             # Entry HTML file
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS config
└── package.json           # Dependencies and scripts
```

## 🎯 Usage

### **SIP Calculator**

- Calculate potential returns on systematic investments
- Input monthly investment amount, expected return rate, and time period
- View detailed year-by-year breakdown and final corpus

### **Step-up SIP Calculator**

- Plan progressive investment strategies
- Increase SIP amount annually for better wealth creation
- Compare different step-up percentages

### **Income Tax Calculator**

- Calculate tax liability under new tax regime
- Input annual income and deductions
- Get accurate tax calculations with breakdowns

### **Inflation Calculator**

- Understand inflation's impact on money value
- Calculate real vs nominal returns
- Plan investments considering inflation

## 🎨 Design System

### **Color Palette**

- **Primary**: Blue (#2563eb)
- **Background**: Dark slate tones
- **Text**: White with slate variations
- **Accents**: Subtle gradients and highlights

### **Typography**

- **Headings**: 36px, 30px, 24px, 20px, 18px
- **Body Text**: 16px, 14px, 12px
- **Clean, readable fonts** with proper contrast

### **Components**

- **Cards** with hover effects and subtle shadows
- **Buttons** with multiple variants (primary, secondary, ghost)
- **Inputs** with validation states
- **Responsive grid layouts**

## 🔧 Development

### **Available Scripts**

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### **Code Quality**

- **ESLint** configured for React best practices
- **PropTypes** for component prop validation
- **Semantic HTML** for better accessibility
- **Responsive design** principles

### **Component Guidelines**

- **PascalCase** naming for components
- **Comprehensive PropTypes** validation
- **Default props** where appropriate
- **Accessible** with ARIA labels
- **Mobile-first** responsive design

## 🌐 Deployment

The project is configured for easy deployment on **Netlify**:

1. **Connect your repository** to Netlify
2. **Build command**: `npm run build`
3. **Publish directory**: `dist`
4. **Automatic deployments** on git push

## 📊 Performance

- **Lighthouse Score**: 90+ across all metrics
- **Core Web Vitals**: Optimized for excellent UX
- **Bundle Size**: Minimized with tree shaking
- **Image Optimization**: Compressed assets
- **CDN Ready**: Optimized for global delivery

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### **Development Setup**

```bash
git clone https://github.com/your-username/financecalc.git
cd financecalc
npm install
npm run dev
```

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first approach
- **Vite** for the fast development experience
- **Chart.js** for beautiful data visualization

## 📞 Support

For support, email [your-email@example.com] or create an issue in the repository.

---

**Made with ❤️ for better financial planning**
