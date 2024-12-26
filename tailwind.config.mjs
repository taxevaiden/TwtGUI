/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
    theme: {
        extend: {
            fontFamily: {
                mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
            },

			boxShadow: {
				'border': ['0px 0px 8px rgba(187, 247, 208, 0.25)', 'inset 0px 0px 8px rgba(187, 247, 208, 0.5)'],
				'glow': ['0px 0px 8px rgba(187, 247, 208, 0.25)'],
			},

            dropShadow: {
				'text': '0px 0px 8px rgba(187, 247, 208, 0.25)',
			},
        },
    },
    plugins: [],
};
