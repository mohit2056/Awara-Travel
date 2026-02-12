// client/src/utils/imageOptimizer.js

export const getOptimizedUrl = (url, width = 800) => {
  if (!url) return "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=800&auto=format&fit=crop";

  // 1. Agar Unsplash ki image hai -> Unsplash API se resize karo
  if (url.includes('images.unsplash.com')) {
    // Agar pehle se query params hain toh hata ke naye lagao
    const baseUrl = url.split('?')[0];
    return `${baseUrl}?q=80&w=${width}&auto=format&fit=crop`;
  }

  // 2. Agar Cloudinary ki image hai -> Cloudinary transformation lagao
  if (url.includes('cloudinary.com')) {
    // "/upload/" ke baad transformation code ghusa do
    return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
  }

  // 3. Agar koi aur link hai toh waisa hi rehne do
  return url;
};