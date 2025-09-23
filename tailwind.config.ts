import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Forest & Autumn Organic Color Palette
        forest: {
          50: "hsl(140 45% 95%)",   // Ultra light forest
          100: "hsl(140 45% 90%)",  // Very light forest
          200: "hsl(140 45% 85%)",  // Light forest
          300: "hsl(140 45% 75%)",  // Soft forest
          400: "hsl(140 45% 65%)",  // Medium forest
          500: "hsl(var(--forest-primary))", // Primary forest
          600: "hsl(140 40% 35%)",  // Deep forest
          700: "hsl(140 40% 25%)",  // Dark forest
          800: "hsl(140 40% 15%)",  // Very dark forest
          900: "hsl(140 40% 8%)",   // Ultra dark forest
          DEFAULT: "hsl(var(--forest-primary))",
        },
        
        autumn: {
          50: "hsl(25 70% 95%)",    // Ultra light autumn
          100: "hsl(25 70% 90%)",   // Very light autumn
          200: "hsl(25 70% 85%)",   // Light autumn
          300: "hsl(25 70% 75%)",   // Soft autumn
          400: "hsl(25 70% 65%)",   // Medium autumn
          500: "hsl(var(--autumn-primary))", // Primary autumn
          600: "hsl(25 60% 45%)",   // Deep autumn
          700: "hsl(25 60% 35%)",   // Dark autumn
          800: "hsl(25 60% 25%)",   // Very dark autumn
          900: "hsl(25 60% 15%)",   // Ultra dark autumn
          DEFAULT: "hsl(var(--autumn-primary))",
        },
        
        earth: {
          50: "hsl(30 35% 95%)",    // Ultra light earth
          100: "hsl(30 35% 90%)",   // Very light earth
          200: "hsl(30 35% 85%)",   // Light earth
          300: "hsl(30 35% 75%)",   // Soft earth
          400: "hsl(30 35% 65%)",   // Medium earth
          500: "hsl(var(--earth-primary))", // Primary earth
          600: "hsl(30 30% 55%)",   // Deep earth
          700: "hsl(30 30% 45%)",   // Dark earth
          800: "hsl(30 30% 35%)",   // Very dark earth
          900: "hsl(30 30% 25%)",   // Ultra dark earth
          DEFAULT: "hsl(var(--earth-primary))",
        },

        golden: {
          50: "hsl(45 60% 95%)",    // Ultra light golden
          100: "hsl(45 60% 90%)",   // Very light golden
          200: "hsl(45 60% 85%)",   // Light golden
          300: "hsl(45 60% 75%)",   // Soft golden
          400: "hsl(45 60% 65%)",   // Medium golden
          500: "hsl(var(--autumn-secondary))", // Primary golden
          600: "hsl(45 50% 55%)",   // Deep golden
          700: "hsl(45 50% 45%)",   // Dark golden
          800: "hsl(45 50% 35%)",   // Very dark golden
          900: "hsl(45 50% 25%)",   // Ultra dark golden
          DEFAULT: "hsl(var(--autumn-secondary))",
        },

        // Organic blend colors for dashboard
        sage: {
          50: "hsl(120 30% 95%)",   // Ultra light sage
          100: "hsl(120 30% 90%)",  // Very light sage
          200: "hsl(120 30% 85%)",  // Light sage
          300: "hsl(120 30% 75%)",  // Soft sage
          400: "hsl(120 30% 65%)",  // Medium sage
          500: "hsl(var(--forest-secondary))", // Primary sage
          600: "hsl(120 25% 45%)",  // Deep sage
          700: "hsl(120 25% 35%)",  // Dark sage
          800: "hsl(120 25% 25%)",  // Very dark sage
          900: "hsl(120 25% 15%)",  // Ultra dark sage
          DEFAULT: "hsl(var(--forest-secondary))",
        },

        // Legacy support (waterfall using forest colors)
        waterfall: {
          50: "hsl(140 45% 95%)",   
          100: "hsl(140 45% 90%)", 
          200: "hsl(140 45% 85%)",
          300: "hsl(140 45% 75%)",
          400: "hsl(140 45% 65%)",
          500: "hsl(var(--forest-primary))",
          600: "hsl(140 40% 35%)",
          700: "hsl(140 40% 25%)",
          800: "hsl(140 40% 15%)",
          900: "hsl(140 40% 8%)",
          DEFAULT: "hsl(var(--forest-primary))",
        },

        // Legacy teal support  
        teal: {
          DEFAULT: "hsl(var(--forest-primary))",
          light: "hsl(var(--forest-secondary))",
          50: "hsl(140 45% 95%)",
          100: "hsl(140 45% 90%)",
          200: "hsl(140 45% 85%)",
          300: "hsl(140 45% 75%)",
          400: "hsl(140 45% 65%)",
          500: "hsl(var(--forest-primary))",
          600: "hsl(140 40% 35%)",
          700: "hsl(140 40% 25%)",
          800: "hsl(140 40% 15%)",
          900: "hsl(140 40% 8%)",
        },

        // Remove old pastel colors - replaced with organic forest/autumn theme
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-card': 'var(--gradient-card)',
        'gradient-nature': 'var(--gradient-nature)',
        'gradient-subtle': 'var(--gradient-subtle)',
        'gradient-dashboard': 'var(--gradient-dashboard)',
        
        // Forest & Autumn Organic Gradients
        'gradient-forest': 'linear-gradient(135deg, hsl(140 45% 90%) 0%, hsl(140 45% 75%) 100%)',
        'gradient-autumn': 'linear-gradient(135deg, hsl(25 70% 90%) 0%, hsl(25 70% 75%) 100%)',
        'gradient-earth': 'linear-gradient(135deg, hsl(30 35% 90%) 0%, hsl(30 35% 75%) 100%)',
        'gradient-golden': 'linear-gradient(135deg, hsl(45 60% 90%) 0%, hsl(45 60% 75%) 100%)',
        'gradient-organic': 'linear-gradient(135deg, hsl(140 45% 85%) 0%, hsl(25 70% 85%) 50%, hsl(45 60% 88%) 100%)',
        'gradient-forest-autumn': 'linear-gradient(135deg, hsl(140 45% 80%) 0%, hsl(25 70% 80%) 100%)',
        
        // Dark mode gradients
        'gradient-forest-dark': 'linear-gradient(135deg, hsl(140 40% 20%) 0%, hsl(140 40% 35%) 100%)',
        'gradient-autumn-dark': 'linear-gradient(135deg, hsl(25 60% 25%) 0%, hsl(25 60% 40%) 100%)',
        'gradient-earth-dark': 'linear-gradient(135deg, hsl(30 30% 25%) 0%, hsl(30 30% 40%) 100%)',
        'gradient-organic-dark': 'linear-gradient(135deg, hsl(140 40% 20%) 0%, hsl(25 60% 25%) 50%, hsl(45 50% 30%) 100%)',
      },
      boxShadow: {
        'glow': 'var(--shadow-glow)',
        'card': 'var(--shadow-card)',
        'nature': 'var(--shadow-nature)',
        'dashboard': 'var(--shadow-dashboard)',
        'forest': '0 6px 25px hsl(var(--forest-primary) / 0.12)',
        'autumn': '0 6px 25px hsl(var(--autumn-primary) / 0.15)',
        'earth': '0 4px 20px hsl(var(--earth-primary) / 0.1)',
        'golden': '0 4px 20px hsl(var(--autumn-secondary) / 0.12)',
        'organic': '0 8px 30px hsl(var(--forest-primary) / 0.08), 0 4px 15px hsl(var(--autumn-primary) / 0.06)',
        'organic-lg': '0 12px 40px hsl(var(--forest-primary) / 0.12), 0 6px 20px hsl(var(--autumn-primary) / 0.08)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // Tourism animations
        "gentle-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in-up": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(40px)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
        },
        "fadeIn": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)"
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)"
          }
        },
        "scale-in": {
          "0%": { 
            opacity: "0", 
            transform: "scale(0.8)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "scale(1)" 
          },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "water-flow": {
          "0%, 100%": { transform: "translateX(0px) scale(1)" },
          "25%": { transform: "translateX(-5px) scale(1.02)" },
          "75%": { transform: "translateX(5px) scale(0.98)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // Tourism animations
        "gentle-float": "gentle-float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.8s ease-out",
        "fadeIn": "fadeIn 0.5s ease-out",
        "scale-in": "scale-in 0.6s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "water-flow": "water-flow 4s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
