# 🌍 Physics-Shift Weather Simulator

A futuristic, interactive Next.js website where users manipulate fundamental physics parameters (gravity, air density, CO₂, sunlight, etc.) and observe real-time simulated weather outcomes through stunning 3D visualizations and AI-powered explanations.

![Physics Weather Simulator](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-3D-blue?style=for-the-badge&logo=three.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=for-the-badge&logo=typescript)

## ✨ Features

### 🌍 Globe-to-Map Transform
- **Interactive D3 Visualization**: Smoothly transform a 3D globe into a 2D equirectangular map
- **Dark Industrial Aesthetic**: Premium dark mode design with glassmorphism
- **Interactive Controls**: Unroll/Roll animations and reset functionality

### 🎮 Interactive Physics Controls
- **8 Physics Parameters**: Gravity, Air Density, Atmospheric Pressure, CO₂, Sunlight, Humidity, Wind Drag, Cloud Condensation
- **Real-time Simulation**: Instant weather calculations using physics-based formulas
- **Extreme Value Warnings**: Visual alerts when parameters reach unusual levels

### 🌐 3D Visualization
- **Interactive Globe**: Rotate, zoom, and explore with Three.js
- **Dynamic Effects**: Atmosphere glow, cloud layers, storm particles
- **Physics-Based Visuals**: Colors and effects change based on parameters

### 🤖 AI-Powered Explanations
- **Gemini AI Integration**: Natural language weather analysis
- **7 Explanation Sections**:
  1. Simple Summary
  2. Scientific Explanation
  3. Biological Impact
  4. What Your Day Feels Like
  5. Risks & Anomalies
  6. Fun Facts
- **Typewriter Animation**: Smooth text reveal effect

### 📊 Weather Metrics
- Temperature (°C)
- Cloud Altitude (m)
- Precipitation Chance (%)
- Wind Speed (km/h)
- Storm Probability (%)
- Evaporation Rate (mm/day)
- Visibility (km)
- Human Comfort Index (0-100)

### 🎨 Futuristic UI/UX
- **Glassmorphism Design**: Frosted glass panels with blur effects
- **Neon Glow Effects**: Color-coded severity indicators
- **Smooth Animations**: 60fps Framer Motion transitions
- **Particle Background**: Animated cosmic gradient with floating particles
- **Responsive Design**: Works on desktop, tablet, and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- (Optional) Gemini API key for AI explanations

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd weatherweb
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables** (Optional)
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Gemini API key:
```
GEMINI_API_KEY=your_api_key_here
```

> **Note**: The app works without an API key using mock AI responses!

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
weatherweb/
├── app/
│   ├── page.tsx                    # Home page
│   ├── simulation/page.tsx         # Main simulation dashboard
│   ├── compare/page.tsx            # Earth vs Modified comparison
│   ├── about/page.tsx              # Physics explanations
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   └── api/
│       ├── simulate/route.ts       # Physics simulation API
│       └── ai-summary/route.ts     # AI explanation API
├── components/
│   ├── Globe.tsx                   # 3D Earth with Three.js
│   ├── PhysicsSlider.tsx           # Interactive parameter slider
│   ├── WeatherCard.tsx             # Weather metric display
│   ├── AISummary.tsx               # AI explanation panel
│   ├── NavBar.tsx                  # Navigation bar
│   └── ParticleBackground.tsx      # Animated background
├── lib/
│   ├── physicsEngine.ts            # Core weather calculations
│   ├── types.ts                    # TypeScript interfaces
│   ├── constants.ts                # Physics constants
│   └── utils.ts                    # Utility functions
└── public/
    └── assets/                     # Static assets
```

## 🧮 Physics Engine

The simulator uses realistic physics formulas:

### Cloud Altitude
```
H = (T - Td) × 125 × (gravity / EARTH_GRAVITY)
```

### Rainfall Rate
```
RainRate = BaseRain × gravity^0.4 × (pressure / BASE_PRESSURE)
```

### Wind Speed
```
Wind = BaseWind × (1 / airDensity) × windDragCoefficient
```

### Temperature
```
Temp = BaseTemp + (CO2 × 0.01) - (airDensity × 0.5) + (sunlight × 0.3)
```

### Evaporation
```
E = humidity × (sunlightIntensity × 0.02) × (1 / gravity)
```

## 🎨 Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **3D Graphics**: Three.js, React Three Fiber, @react-three/drei
- **Animations**: Framer Motion
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS, Custom CSS
- **Icons**: Lucide React

## 🌟 Pages

### 1. Home (`/`)
- Hero section with animated title
- Feature cards
- Statistics
- Call-to-action buttons

### 2. Simulation Dashboard (`/simulation`)
- 8 physics control sliders
- Interactive 3D globe
- 7 weather metric cards
- AI explanation panel
- Reset button

### 3. Comparison View (`/compare`)
- Side-by-side Earth vs Modified globes
- Quick parameter controls
- Detailed comparison table
- Impact summary cards

### 4. About Physics (`/about`)
- Detailed parameter explanations
- Real-world examples
- Weather output descriptions
- Technology stack

## 🎯 Key Features Explained

### Glassmorphism Effects
```css
.glass-panel {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}
```

### Neon Glow
```css
.neon-glow-blue {
  box-shadow: 0 0 20px rgba(0, 217, 255, 0.5),
              0 0 40px rgba(0, 217, 255, 0.3);
}
```

### Particle Background
- Canvas-based animation
- 100 floating particles
- Connection lines between nearby particles
- Smooth 60fps performance

## 🔧 Configuration

### Tailwind Colors
```javascript
colors: {
  neon: {
    blue: '#00D9FF',
    purple: '#B026FF',
    cyan: '#00FFF0',
    pink: '#FF006E'
  }
}
```

### Physics Ranges
All parameters have configurable min/max/step values in `lib/constants.ts`

## 📱 Responsive Design

- **Desktop**: Full 3-column layout
- **Tablet**: 2-column layout
- **Mobile**: Single column, touch-optimized

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Other Platforms
```bash
npm run build
npm run start
```

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes!

## 🙏 Acknowledgments

- Physics formulas based on atmospheric science principles
- Inspired by climate simulation models
- Built with modern web technologies

## 📞 Support

For questions or issues, please open a GitHub issue.

---

**Built with ❤️ using Next.js, Three.js, and AI**

🌍 *Experience weather like never before!*
