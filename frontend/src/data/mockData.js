// Mock Data for PC Builder Store

export const CATEGORIES = [
  { id: 'cpu', name: 'Processors (CPU)', icon: 'Cpu', desc: 'The brain of your computer. Choose between Intel and AMD.' },
  { id: 'gpu', name: 'Graphics Cards (GPU)', icon: 'Tv', desc: 'Powers gaming, video editing, and rendering performance.' },
  { id: 'motherboard', name: 'Motherboards', icon: 'Layers', desc: 'Connects all your components together.' },
  { id: 'ram', name: 'Memory (RAM)', icon: 'Database', desc: 'High-speed system memory for multitasking and gaming.' },
  { id: 'storage', name: 'Storage (SSD/HDD)', icon: 'HardDrive', desc: 'Fast NVMe SSDs and spacious HDDs for your files.' },
  { id: 'psu', name: 'Power Supplies (PSU)', icon: 'Zap', desc: 'Delivers clean and reliable power to your system.' },
  { id: 'cooler', name: 'CPU Coolers', icon: 'Wind', desc: 'Keeps CPU temperatures low under heavy workloads.' },
  { id: 'case', name: 'PC Cases', icon: 'Box', desc: 'Housing for your build with varying airflow and sizes.' }
];

export const BRANDS = [
  { id: 'intel', name: 'Intel', logo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { id: 'amd', name: 'AMD', logo: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { id: 'nvidia', name: 'NVIDIA', logo: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { id: 'asus', name: 'ASUS', logo: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { id: 'msi', name: 'MSI', logo: 'https://images.unsplash.com/photo-1612287230202-1bf1d85d1bdf?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { id: 'corsair', name: 'Corsair', logo: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { id: 'gigabyte', name: 'Gigabyte', logo: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' },
  { id: 'samsung', name: 'Samsung', logo: 'https://images.unsplash.com/photo-1610792516307-ea5acd9c3b00?w=100&auto=format&fit=crop&q=60&ixlib=rb-4.0.3' }
];

export const COMPONENTS = [
  // --- CPUs ---
  {
    id: 'cpu-intel-i7-14700k',
    name: 'Intel Core i7-14700K',
    category: 'cpu',
    brand: 'Intel',
    price: 389.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1617042375876-a13e36732a04?w=600&auto=format&fit=crop&q=80',
    description: 'Intel Core i7-14700K desktop processor. Featuring 20 cores (8 P-cores + 12 E-cores) and 28 threads. Intel Turbo Boost Max Technology 3.0 support.',
    inStock: true,
    specs: {
      socket: 'LGA1700',
      cores: 20,
      threads: 28,
      baseSpeed: '3.4 GHz',
      boostSpeed: '5.6 GHz',
      tdp: 125, // Watts
      graphics: 'Intel UHD Graphics 770'
    },
    reviews: [
      { user: 'GamerX', rating: 5, comment: 'Phenomenal gaming performance. Highly recommend a 360mm AIO for cooling.' },
      { user: 'DevOpsPro', rating: 4, comment: 'Compile times are ridiculously fast. Runs warm though.' }
    ]
  },
  {
    id: 'cpu-amd-r7-7800x3d',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'cpu',
    brand: 'AMD',
    price: 369.00,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=600&auto=format&fit=crop&q=80',
    description: 'The definitive gaming processor, featuring AMD 3D V-Cache technology for extreme gaming performance. 8 Cores and 16 Processing Threads.',
    inStock: true,
    specs: {
      socket: 'AM5',
      cores: 8,
      threads: 16,
      baseSpeed: '4.2 GHz',
      boostSpeed: '5.0 GHz',
      tdp: 120,
      graphics: 'AMD Radeon Graphics'
    },
    reviews: [
      { user: 'FPSEnthusiast', rating: 5, comment: 'Simply the best gaming CPU on the market. Period.' }
    ]
  },
  {
    id: 'cpu-intel-i5-14600k',
    name: 'Intel Core i5-14600K',
    category: 'cpu',
    brand: 'Intel',
    price: 299.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    description: 'Intel Core i5-14600K desktop processor. 14 Cores (6 P-cores + 8 E-cores) and 20 Threads. Excellent mid-range gaming CPU.',
    inStock: true,
    specs: {
      socket: 'LGA1700',
      cores: 14,
      threads: 20,
      baseSpeed: '3.5 GHz',
      boostSpeed: '5.3 GHz',
      tdp: 125,
      graphics: 'Intel UHD Graphics 770'
    },
    reviews: [
      { user: 'BudgetGamer', rating: 5, comment: 'Perfect balance of cost and performance.' }
    ]
  },

  // --- GPUs ---
  {
    id: 'gpu-nvidia-rtx-4080-super',
    name: 'ASUS ROG Strix RTX 4080 Super OC',
    category: 'gpu',
    brand: 'ASUS',
    price: 1099.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=600&auto=format&fit=crop&q=80',
    description: 'ASUS ROG Strix GeForce RTX 4080 Super 16GB GDDR6X OC Edition. DLSS 3, Axial-tech fans, and custom RGB lighting.',
    inStock: true,
    specs: {
      vram: '16GB GDDR6X',
      tdp: 320, // Watts
      recommendedPsu: 750,
      length: '357 mm',
      interface: 'PCIe 4.0 x16'
    },
    reviews: [
      { user: '4KEnthusiast', rating: 5, comment: 'Destroys any game at 4K max settings. RGB looks incredible.' }
    ]
  },
  {
    id: 'gpu-amd-rx-7800-xt',
    name: 'Gigabyte Radeon RX 7800 XT Gaming OC',
    category: 'gpu',
    brand: 'Gigabyte',
    price: 499.99,
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?w=600&auto=format&fit=crop&q=80',
    description: 'Gigabyte Radeon RX 7800 XT Gaming OC 16GB. Powered by AMD RDNA 3, WINDFORCE cooling system, and dual BIOS.',
    inStock: true,
    specs: {
      vram: '16GB GDDR6',
      tdp: 263,
      recommendedPsu: 700,
      length: '302 mm',
      interface: 'PCIe 4.0 x16'
    },
    reviews: [
      { user: 'RadeonFan', rating: 5, comment: 'Best value 1440p card right now. Huge VRAM buffer is awesome.' }
    ]
  },
  {
    id: 'gpu-nvidia-rtx-4060-ti',
    name: 'MSI Ventus 2X RTX 4060 Ti',
    category: 'gpu',
    brand: 'MSI',
    price: 389.99,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=600&auto=format&fit=crop&q=80',
    description: 'MSI GeForce RTX 4060 Ti Ventus 2X Black 8G OC. Dual fan cooling, DLSS 3 support, perfect for compact setups.',
    inStock: false,
    specs: {
      vram: '8GB GDDR6',
      tdp: 160,
      recommendedPsu: 550,
      length: '199 mm',
      interface: 'PCIe 4.0 x8'
    },
    reviews: []
  },

  // --- Motherboards ---
  {
    id: 'mobo-asus-z790-f',
    name: 'ASUS ROG Strix Z790-F Gaming WiFi II',
    category: 'motherboard',
    brand: 'ASUS',
    price: 359.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80',
    description: 'Intel Z790 LGA1700 ATX motherboard. DDR5, PCIe 5.0, WiFi 7, 2.5Gb Lan, and multi M.2 heatsinks.',
    inStock: true,
    specs: {
      socket: 'LGA1700',
      formFactor: 'ATX',
      ramSlots: 4,
      maxRam: '192GB DDR5',
      m2Slots: 5
    },
    reviews: []
  },
  {
    id: 'mobo-msi-b650-tomahawk',
    name: 'MSI MAG B650 Tomahawk WiFi',
    category: 'motherboard',
    brand: 'MSI',
    price: 199.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=600&auto=format&fit=crop&q=80',
    description: 'AMD B650 AM5 ATX Motherboard. Designed for AMD Ryzen 7000/8000/9000 Series, DDR5, Wi-Fi 6E, and PCIe 4.0.',
    inStock: true,
    specs: {
      socket: 'AM5',
      formFactor: 'ATX',
      ramSlots: 4,
      maxRam: '128GB DDR5',
      m2Slots: 3
    },
    reviews: [
      { user: 'BuildKing', rating: 5, comment: 'Incredible VRM cooling. Safe boot times after BIOS update.' }
    ]
  },

  // --- RAM ---
  {
    id: 'ram-gskill-ddr5-32',
    name: 'G.Skill Trident Z5 Neo RGB 32GB (2x16GB) DDR5-6000',
    category: 'ram',
    brand: 'Corsair', // or G.Skill (let's match brand or use corsair/gskill tags)
    price: 114.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&auto=format&fit=crop&q=80',
    description: 'High-performance DDR5 memory designed for AMD Expo systems. Intel XMP compatible version also available.',
    inStock: true,
    specs: {
      capacity: '32 GB (2x16GB)',
      speed: '6000 MHz',
      type: 'DDR5',
      latency: 'CL30'
    },
    reviews: []
  },
  {
    id: 'ram-corsair-vengeance-32',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5-5600',
    category: 'ram',
    brand: 'Corsair',
    price: 99.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?w=600&auto=format&fit=crop&q=80',
    description: 'Corsair Vengeance RGB DDR5 RAM optimizes performance for Intel motherboards with dynamic multi-zone RGB lighting.',
    inStock: true,
    specs: {
      capacity: '32 GB (2x16GB)',
      speed: '5600 MHz',
      type: 'DDR5',
      latency: 'CL36'
    },
    reviews: []
  },

  // --- Storage ---
  {
    id: 'storage-samsung-990-pro',
    name: 'Samsung 990 Pro 2TB PCIe 4.0 NVMe M.2 SSD',
    category: 'storage',
    brand: 'Samsung',
    price: 169.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&auto=format&fit=crop&q=80',
    description: 'Read speeds up to 7450 MB/s. Thermal control, power efficiency, and optimized for elite gaming and content editing.',
    inStock: true,
    specs: {
      capacity: '2 TB',
      interface: 'M.2 PCIe Gen 4x4',
      readSpeed: '7450 MB/s',
      writeSpeed: '6900 MB/s'
    },
    reviews: []
  },
  {
    id: 'storage-crucial-p3-1tb',
    name: 'Crucial P3 Plus 1TB PCIe 4.0 NVMe M.2 SSD',
    category: 'storage',
    brand: 'Samsung', // map to general brand
    price: 69.99,
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1600541519468-4a9121c64af4?w=600&auto=format&fit=crop&q=80',
    description: 'Fast Gen4 NVMe storage option with up to 5000 MB/s sequential read speeds.',
    inStock: true,
    specs: {
      capacity: '1 TB',
      interface: 'M.2 PCIe Gen 4x4',
      readSpeed: '5000 MB/s',
      writeSpeed: '3600 MB/s'
    },
    reviews: []
  },

  // --- PSU ---
  {
    id: 'psu-corsair-rm850x',
    name: 'Corsair RM850x 850W 80+ Gold Fully Modular',
    category: 'psu',
    brand: 'Corsair',
    price: 129.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&auto=format&fit=crop&q=80',
    description: 'Corsair RM850x fully modular power supply. 80 Plus Gold certified. Zero RPM fan mode for near-silent operation.',
    inStock: true,
    specs: {
      wattage: 850,
      efficiency: '80+ Gold',
      modular: 'Fully Modular',
      formFactor: 'ATX'
    },
    reviews: []
  },
  {
    id: 'psu-msi-mag-a650bn',
    name: 'MSI MAG A650BN 650W 80+ Bronze',
    category: 'psu',
    brand: 'MSI',
    price: 59.99,
    rating: 4.4,
    image: 'https://images.unsplash.com/photo-1616166330003-8e5529f88b2a?w=600&auto=format&fit=crop&q=80',
    description: 'MSI MAG 650W power supply. 80 Plus Bronze certified, compact ATX size, great budget build option.',
    inStock: true,
    specs: {
      wattage: 650,
      efficiency: '80+ Bronze',
      modular: 'Non-Modular',
      formFactor: 'ATX'
    },
    reviews: []
  },

  // --- Coolers ---
  {
    id: 'cooler-corsair-h150i',
    name: 'Corsair iCUE H150i Elite Capellix XT 360mm AIO',
    category: 'cooler',
    brand: 'Corsair',
    price: 189.99,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=600&auto=format&fit=crop&q=80',
    description: '360mm radiator, three AF120 RGB Elite fans, bright Capellix LEDs, compatible with Intel and AMD sockets.',
    inStock: true,
    specs: {
      type: 'Liquid AIO',
      radiatorSize: '360 mm',
      sockets: ['LGA1700', 'LGA1200', 'AM5', 'AM4'],
      noiseLevel: '34.1 dBA'
    },
    reviews: []
  },
  {
    id: 'cooler-peerless-assassin',
    name: 'Thermalright Peerless Assassin 120 SE Air Cooler',
    category: 'cooler',
    brand: 'Intel', // placeholder brand
    price: 35.90,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1601524909162-be87252be298?w=600&auto=format&fit=crop&q=80',
    description: 'Dual tower air cooler with 6 heatpipes and dual 120mm PWM fans. Outstanding budget performance.',
    inStock: true,
    specs: {
      type: 'Air Cooler',
      radiatorSize: 'N/A',
      sockets: ['LGA1700', 'LGA1200', 'AM5', 'AM4'],
      noiseLevel: '25.6 dBA'
    },
    reviews: []
  },

  // --- Cases ---
  {
    id: 'case-lian-li-o11',
    name: 'Lian Li O11 Dynamic EVO Mid-Tower Case',
    category: 'case',
    brand: 'ASUS', // placeholder brand
    price: 149.99,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1632749614488-888de8cae0db?w=600&auto=format&fit=crop&q=80',
    description: 'Premium dual-chamber mid-tower chassis. Modular glass panels, massive watercooling options, and layout reversibility.',
    inStock: true,
    specs: {
      type: 'Mid-Tower',
      supportedFormFactors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
      dimensions: '459 x 285 x 465 mm',
      maxGpuLength: '422 mm'
    },
    reviews: []
  },
  {
    id: 'case-corsair-4000d',
    name: 'Corsair 4000D Airflow Tempered Glass Mid-Tower',
    category: 'case',
    brand: 'Corsair',
    price: 94.99,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=600&auto=format&fit=crop&q=80',
    description: 'High-airflow front panel design, routing channels for cable management, and included 120mm AirGuide fans.',
    inStock: true,
    specs: {
      type: 'Mid-Tower',
      supportedFormFactors: ['ATX', 'Micro-ATX', 'Mini-ITX'],
      dimensions: '453 x 230 x 466 mm',
      maxGpuLength: '360 mm'
    },
    reviews: []
  }
];

export const MOCK_ORDERS = [
  {
    id: 'ORD-89472',
    date: '2026-07-02',
    total: 1654.96,
    status: 'Delivered',
    paymentMethod: 'Credit Card',
    shippingAddress: '123 Tech Lane, Austin, TX 78701',
    items: [
      { id: 'cpu-intel-i7-14700k', name: 'Intel Core i7-14700K', price: 389.99, quantity: 1, category: 'cpu' },
      { id: 'gpu-nvidia-rtx-4080-super', name: 'ASUS ROG Strix RTX 4080 Super OC', price: 1099.99, quantity: 1, category: 'gpu' },
      { id: 'ram-corsair-vengeance-32', name: 'Corsair Vengeance RGB 32GB DDR5-5600', price: 99.99, quantity: 1, category: 'ram' },
      { id: 'storage-crucial-p3-1tb', name: 'Crucial P3 Plus 1TB M.2 SSD', price: 64.99, quantity: 1, category: 'storage' }
    ],
    timeline: [
      { status: 'Order Placed', date: 'July 2, 2026 10:30 AM', completed: true },
      { status: 'Processed & Packed', date: 'July 2, 2026 2:15 PM', completed: true },
      { status: 'Shipped', date: 'July 3, 2026 9:00 AM', completed: true },
      { status: 'Delivered', date: 'July 5, 2026 4:30 PM', completed: true }
    ]
  },
  {
    id: 'ORD-72941',
    date: '2026-07-14',
    total: 483.99,
    status: 'In Transit',
    paymentMethod: 'PayPal',
    shippingAddress: '456 Cyber Road, San Francisco, CA 94103',
    items: [
      { id: 'mobo-msi-b650-tomahawk', name: 'MSI MAG B650 Tomahawk WiFi', price: 199.99, quantity: 1, category: 'motherboard' },
      { id: 'ram-gskill-ddr5-32', name: 'G.Skill Trident Z5 Neo RGB 32GB DDR5', price: 114.99, quantity: 1, category: 'ram' },
      { id: 'storage-samsung-990-pro', name: 'Samsung 990 Pro 2TB SSD', price: 169.00, quantity: 1, category: 'storage' }
    ],
    timeline: [
      { status: 'Order Placed', date: 'July 14, 2026 4:05 PM', completed: true },
      { status: 'Processed & Packed', date: 'July 15, 2026 9:30 AM', completed: true },
      { status: 'Shipped', date: 'July 15, 2026 2:00 PM', completed: true },
      { status: 'Delivered', date: 'Pending', completed: false }
    ]
  }
];

export const MOCK_USERS = [
  { id: 'USR-001', name: 'Manish Kumar', email: 'manish@example.com', role: 'admin', joined: '2025-05-12' },
  { id: 'USR-002', name: 'Sarah Connor', email: 'sarah@example.com', role: 'customer', joined: '2026-01-20' },
  { id: 'USR-003', name: 'Alex Mercer', email: 'alex@example.com', role: 'customer', joined: '2026-06-15' }
];

export const ADMIN_STATS = {
  totalSales: 45293.44,
  salesGrowth: '+12.5% from last month',
  activeUsers: 842,
  userGrowth: '+8% from last week',
  totalOrders: 184,
  orderGrowth: '+4% from yesterday',
  inventoryStatus: '92% in stock',
  salesData: [
    { name: 'Jan', Sales: 4000 },
    { name: 'Feb', Sales: 3000 },
    { name: 'Mar', Sales: 5000 },
    { name: 'Apr', Sales: 8000 },
    { name: 'May', Sales: 7000 },
    { name: 'Jun', Sales: 9000 },
    { name: 'Jul', Sales: 12000 }
  ],
  categoryStats: [
    { name: 'CPUs', value: 35 },
    { name: 'GPUs', value: 45 },
    { name: 'RAM', value: 10 },
    { name: 'Others', value: 10 }
  ]
};
