const BASE_URL = "http://localhost:5000/api";

export async function getClinics() {
  const res = await fetch(`${BASE_URL}/clinics`);
  return res.json();
}

export async function getNotices() {
  const res = await fetch("http://localhost:5000/api/notices");
  return res.json();
}
