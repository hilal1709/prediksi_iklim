/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		const backendOrigin = process.env.BACKEND_URL;

		return backendOrigin
			? [
					{
						source: '/api/backend/:path*',
						destination: `${backendOrigin}/:path*`,
					},
				]
			: [];
	},
};

export default nextConfig;
