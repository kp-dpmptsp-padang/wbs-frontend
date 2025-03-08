// src/services/mockApi.js
// Simulasi data pengguna
const users = [
  {
    id: 1,
    name: 'User Test',
    email: 'user@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    id: 2,
    name: 'Admin Test',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin'
  },
  {
    id: 3,
    name: 'Super Admin',
    email: 'superadmin@example.com',
    password: 'password123',
    role: 'super-admin'
  }
];

// Fungsi helper untuk delay simulasi network
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const mockApi = {
  // Auth endpoints
  login: async (email, password) => {
    // Simulasi network delay
    await delay(800);
    
    // Cari user berdasarkan email
    const user = users.find(u => u.email === email);
    
    // Jika user tidak ditemukan atau password salah
    if (!user || user.password !== password) {
      // Simulasi error response
      throw {
        response: {
          status: 401,
          data: { message: 'Email atau password salah' }
        }
      };
    }
    
    // Jika berhasil, return data user tanpa password
    const { password: _, ...userWithoutPassword } = user;
    
    return {
      data: {
        message: 'Login berhasil',
        access_token: `mock_token_${Date.now()}`,
        refresh_token: `mock_refresh_${Date.now()}`,
        user: userWithoutPassword
      }
    };
  },
  
  register: async (userData) => {
    await delay(800);
    
    // Cek apakah email sudah digunakan
    if (users.some(u => u.email === userData.email)) {
      throw {
        response: {
          status: 400,
          data: { message: 'Email sudah digunakan' }
        }
      };
    }
    
    // Buat user baru
    const newUser = {
      id: users.length + 1,
      name: userData.name,
      email: userData.email,
      password: userData.password, // dalam aplikasi sebenarnya, password harus di-hash
      role: 'user' // user baru selalu role 'user'
    };
    
    // Tambahkan user baru ke array (simulasi database)
    users.push(newUser);
    
    // Return data user tanpa password
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      data: {
        message: 'Registrasi berhasil',
        access_token: `mock_token_${Date.now()}`,
        refresh_token: `mock_refresh_${Date.now()}`,
        user: userWithoutPassword
      }
    };
  },
  
  logout: async () => {
    await delay(500);
    return { data: { message: 'Logout berhasil' } };
  },
  
  getProfile: async () => {
    await delay(600);
    // Simulasi mengambil profil user yang sedang login
    // Dalam aplikasi sebenarnya, ini akan menggunakan token untuk mengidentifikasi user
    const user = { ...users[0] };
    delete user.password;
    
    return { data: { user } };
  }
};

export default mockApi;