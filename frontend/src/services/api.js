const BASE_URL = '/api/v1';

// Category mapping helper
const mapBackendCategoryToFrontend = (catName) => {
  if (!catName) return 'cpu';
  const lower = catName.toLowerCase();
  if (lower.includes('cpu') || lower.includes('processor')) return 'cpu';
  if (lower.includes('gpu') || lower.includes('graphics')) return 'gpu';
  if (lower.includes('motherboard')) return 'motherboard';
  if (lower.includes('ram') || lower.includes('memory')) return 'ram';
  if (lower.includes('storage') || lower.includes('ssd') || lower.includes('hdd')) return 'storage';
  if (lower.includes('psu') || lower.includes('power supply')) return 'psu';
  if (lower.includes('cooler')) return 'cooler';
  if (lower.includes('case') || lower.includes('cabinet')) return 'case';
  return 'cpu';
};

// Specs list mapping helper
const mapBackendSpecsToFrontend = (specsList) => {
  const specs = {};
  if (!specsList) return specs;
  specsList.forEach(s => {
    const key = s.key.toLowerCase();
    if (key === 'socket') specs.socket = s.value;
    else if (key === 'cores') specs.cores = parseInt(s.value) || s.value;
    else if (key === 'threads') specs.threads = parseInt(s.value) || s.value;
    else if (key === 'form_factor') specs.formFactor = s.value;
    else if (key === 'tdp') specs.tdp = parseInt(s.value) || s.value;
    else if (key === 'vram') specs.vram = s.value;
    else if (key === 'memory_type') specs.memoryType = s.value;
    else if (key === 'memory_speed') specs.speed = s.value;
    else if (key === 'length') specs.length = s.value;
    else specs[key] = s.value;
  });
  return specs;
};

// Component item mapping helper
export const mapComponentToFrontend = (c) => {
  return {
    id: c.id.toString(),
    name: c.name,
    category: mapBackendCategoryToFrontend(c.category),
    brand: c.brand,
    price: c.price,
    rating: 4.8, // backend doesn't have rating, default to 4.8
    image: c.imageUrl || 'https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=600&auto=format&fit=crop&q=80',
    description: c.description || '',
    inStock: c.stockQuantity > 0,
    specs: mapBackendSpecsToFrontend(c.specifications),
    reviews: []
  };
};

const getHeaders = () => {
  const token = localStorage.getItem('auth_token');
  const headers = {
    'Content-Type': 'application/json',
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

async function handleResponse(res, fallbackMessage) {
  if (res.ok) return res;

  let message = fallbackMessage;
  try {
    const errData = await res.json();
    message = errData.message || errData.error || fallbackMessage;
  } catch {
    // response body was not JSON
  }
  throw new Error(message);
}

export const api = {
  async login(email, password) {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    await handleResponse(res, 'Invalid credentials');
    const data = await res.json();
    localStorage.setItem('auth_token', data.token);
    
    // Fetch profile info immediately
    return this.getProfile();
  },

  async register(firstName, lastName, email, password) {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password })
    });
    await handleResponse(res, 'Registration failed');
    const data = await res.json();
    localStorage.setItem('auth_token', data.token);
    return this.getProfile();
  },

  async getProfile() {
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      headers: getHeaders()
    });
    if (!res.ok) {
      localStorage.removeItem('auth_token');
      await handleResponse(res, 'Session expired');
    }
    const data = await res.json();
    return {
      id: data.id.toString(),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      role: data.role.toLowerCase(), // 'admin' or 'customer'
      joined: new Date().toISOString().split('T')[0]
    };
  },

  async getComponents(params = {}) {
    const query = new URLSearchParams();
    if (params.category && params.category !== 'all') {
      // Find category ID or let context filter it. Let's just fetch all and filter in frontend to ensure compatibility.
    }
    const res = await fetch(`${BASE_URL}/components?size=100`, {
      headers: getHeaders()
    });
    await handleResponse(res, 'Failed to load components');
    const data = await res.json();
    return (data.content || []).map(mapComponentToFrontend);
  }
};
