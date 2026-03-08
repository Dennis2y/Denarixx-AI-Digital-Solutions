## Packages
framer-motion | Essential for premium, smooth scroll animations and page transitions
react-hook-form | Required for robust contact form state management
@hookform/resolvers | Required to connect Zod schema to react-hook-form
lucide-react | Already in base stack, used extensively for premium iconography

## Notes
Tailwind Config - extend fontFamily:
fontFamily: {
  display: ["var(--font-display)"],
  body: ["var(--font-body)"],
}
Colors: The application forces a dark/gold theme via CSS variables in index.css.
Images: Uses the provided logo from @assets/Denarixx_1772975867904.png. Unsplash placeholders are used for conceptual sections.
