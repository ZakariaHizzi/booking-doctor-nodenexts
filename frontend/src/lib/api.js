async function apiFetch(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(text || `Request failed with status ${res.status}`);
  }
  if (!res.ok) {
    throw new Error(data.message || "API request failed");
  }
  return data;
}

export async function signIn(email, password) {
  return apiFetch("/user/auth/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function register(full_name, email, password, role = "patient") {
  return apiFetch("/user/auth/register", {
    method: "POST",
    body: JSON.stringify({ full_name, email, password, role }),
  });
}

export async function signOut() {
  return apiFetch("/user/signout", { method: "POST" });
}

export async function getMe() {
  return apiFetch("/user/me");
}

export async function getProfile(id) {
  return apiFetch(`/profile/${id}`);
}

export async function getDoctors() {
  return apiFetch("/doctor/doctors");
}

export async function getDoctor(id) {
  return apiFetch(`/doctor/doctors/${id}`);
}

export async function getSpecialties() {
  return apiFetch("/specialty");
}

export async function getInsuranceProviders() {
  return apiFetch("/insurance");
}

export async function getMyAppointments() {
  return apiFetch("/appointment/myAppointments");
}

export async function getAppointmentCount() {
  return apiFetch("/appointment/count");
}

export async function createAppointment(data) {
  return apiFetch("/appointment/createAppointment", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteAppointment(id) {
  return apiFetch(`/appointment/deleteAppointment/${id}`, {
    method: "DELETE",
  });
}

export async function updateAppointmentStatus(id, status) {
  return apiFetch(`/appointment/updateStatus/${id}`, {
    method: "PUT",
    body: JSON.stringify({ status }),
  });
}

export async function getProviderAppointments() {
  return apiFetch("/appointment/providerAppointments");
}
