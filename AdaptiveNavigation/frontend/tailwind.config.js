export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


//tells Tailwind where to look for your code. Tailwind scans these files to 
// find which classes you're actually using (like text-blue-500, font-bold) 
// and only includes those in the final CSS. This keeps your CSS file small and fast.
