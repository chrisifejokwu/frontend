const API_URL = "http://localhost:5000/api"; // backend

async function apiRequest(endpoint, method = "GET", data = null, auth = false) {
  const headers = { "Content-Type": "application/json" };
  const token = localStorage.getItem("token");
  if (auth && token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: data ? JSON.stringify(data) : null,
  });

  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
