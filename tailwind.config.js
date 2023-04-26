/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        colors: {
            'red': '#D23F57',
            'blue' : '#0F3460',
            'dark-blue' : '0C0E30',
            'light-blue' : '#F6F9FC',
            'white': '#FFFFFF',
            'gray' : '#707072',
            'gray-500' : '#6B7280',
            'gray-300' : '#cbd5e1',
            'black': '#000000',
            'white-smoke': 'f5f5f5',
            'red-hover' : '#F43F5E',
            'slate' : 'rgb(51 65 85)',
        },
        screens: {
            'sm': '595px',
            'tablet': '600px',
            'md': '768px',
            'lg': '1024px'
        },
        extend: {}
    },
    plugins: [],
};
