const BASE_URL = "http://localhost:5000/api";
const API_URL = import.meta.env.VITE_API_URL;


export async function getClinics() {
  const res = await fetch(`${BASE_URL}/clinics`);
  return res.json();
}

export async function getNotices() {
  const res = await fetch(`${BASE_URL}/notices`);
  return res.json();
}

export async function createClinic(clinicData) {
  const res = await fetch(`${BASE_URL}/clinics`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(clinicData),
  });
  return res.json();
}

export async function createNotice(noticeData) {
  const res = await fetch(`${BASE_URL}/notices`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(noticeData),
  });
  return res.json();
}
