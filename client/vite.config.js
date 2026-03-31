import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
	// Load environment variables
	const env = loadEnv(mode, process.cwd(), "");

	return defineConfig({
		plugins: [react()],
		server: {
			port: 8171,
			proxy: {
				"/users": {
					target: env.VITE_BASE_URL, // Use env loaded here
					changeOrigin: true,
					secure: false,
				},
			},
		},
	});
};
