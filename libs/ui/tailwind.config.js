const {
  keyframesConfig,
  animationConfig,
  colorsConfig,
  spacingConfig,
} = require('./tailwindConfig')

/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: ['./src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: colorsConfig,
    important: true,
    extend: {
      ringColor: colorsConfig.primary.DEFAULT,
      ringOpacity: 20,
      outlineColor: colorsConfig.primary.DEFAULT,
      borderRadius: {
        DEFAULT: '0',
      },
      spacing: spacingConfig,
      animation: animationConfig,
      keyframes: keyframesConfig,
    },
  },
  plugins: [],
}
