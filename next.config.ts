import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    // 아래 사항 적용해야 관리자도구에서 debug 걸수 있음
    productionBrowserSourceMaps: true, // 프로덕션에도 소스맵 허용
    reactStrictMode: true,
};

export default nextConfig;
