export const baseUrl = "https://shortify-rg0z.onrender.com/api/v1";

const urls = {
  signupUrl: `${baseUrl}/auth/signup`,
  loginUrl: `${baseUrl}/auth/login`,
  verifyMailUrl: (id: string) => `${baseUrl}/auth/verify-email/${id}`,
  fetchUrls: `${baseUrl}/url/all`,
  fetchSingleUrl: (id: string) => `${baseUrl}/url/${id}`,
  createShortUrl: `${baseUrl}/url/create-shortUrl`,
  editShortUrl: (id: string) => `${baseUrl}/url/${id}`,
  deleteUrl: (id: string) => `${baseUrl}/url/${id}`,
  generateQrcode: (id: string) => `${baseUrl}/url/${id}/qrcode`,
};
export default urls;
