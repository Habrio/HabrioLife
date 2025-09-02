export const categories = [
  { name: 'Daily Essentials', slug: 'daily-essentials', description: 'Everyday items for home and on-the-go' },
  { name: 'Household Needs', slug: 'household-needs', description: 'Appliances and tools for a smooth home' },
  { name: 'Health & Personal Care', slug: 'health-personal-care', description: 'Fitness, wellness and grooming' },
  { name: 'Baby, Kids & School', slug: 'baby-kids-school', description: 'Learning, school and parenting essentials' },
  { name: 'Décor, Furniture & Storage', slug: 'decor-furniture-storage', description: 'Make spaces beautiful and organized' },
  { name: 'Smart Spending & Financials', slug: 'smart-spending-financials', description: 'Value buys and money-smart picks' },
];

export const guides = [
  {
    title: 'How to Buy a Laptop',
    slug: 'laptop',
    category: 'smart-spending-financials',
    product: 'Laptop',
    excerpt: 'Learn the key factors to consider when choosing a new laptop.',
    recommendations: {
      budget: [
        {
          title: 'Acer Aspire 5 - 15.6" FHD Laptop',
          price: '₹40,000',
          rating: 4.5,
          image:
            'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'HP 14 Thin & Light Laptop',
          price: '₹50,000',
          rating: 4.3,
          image:
            'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
      'mid-range': [
        {
          title: 'Dell Inspiron 5502 - Core i5, 8GB RAM',
          price: '₹65,000',
          rating: 4.6,
          image:
            'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'ASUS VivoBook S14 - Core i7, 16GB RAM',
          price: '₹80,000',
          rating: 4.7,
          image:
            'https://images.pexels.com/photos/4226796/pexels-photo-4226796.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
      premium: [
        {
          title: 'Apple MacBook Pro 14"',
          price: '₹1,50,000',
          rating: 4.8,
          image:
            'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Dell XPS 13 Ultrabook',
          price: '₹1,20,000',
          rating: 4.8,
          image:
            'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
    },
  },
  {
    title: 'How to Buy Running Shoes',
    slug: 'running-shoes',
    category: 'health-personal-care',
    product: 'Running Shoes',
    excerpt: 'Discover what to look for in quality running footwear for any budget.',
    recommendations: {
      budget: [
        {
          title: 'Sparx Men Running Shoes',
          price: '₹3,000',
          rating: 4.2,
          image:
            'https://images.pexels.com/photos/2698961/pexels-photo-2698961.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Campus Basic Road Runners',
          price: '₹3,500',
          rating: 4.1,
          image:
            'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
      'mid-range': [
        {
          title: 'Nike Revolution 6',
          price: '₹6,500',
          rating: 4.5,
          image:
            'https://images.pexels.com/photos/954599/pexels-photo-954599.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Adidas Galaxy 6',
          price: '₹7,000',
          rating: 4.4,
          image:
            'https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
      premium: [
        {
          title: 'ASICS Gel-Nimbus 25',
          price: '₹12,999',
          rating: 4.7,
          image:
            'https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Nike Air Zoom Pegasus 40',
          price: '₹12,495',
          rating: 4.6,
          image:
            'https://images.pexels.com/photos/2529150/pexels-photo-2529150.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
    },
  },
  {
    title: 'How to Buy an Air Conditioner',
    slug: 'air-conditioner',
    category: 'household-needs',
    product: 'Air Conditioner',
    excerpt: 'Understand important criteria (capacity, efficiency, etc.) for AC units.',
    recommendations: {
      budget: [
        {
          title: 'Voltas 1 Ton 3 Star Split AC',
          price: '₹25,000',
          rating: 4.2,
          image:
            'https://images.pexels.com/photos/3768914/pexels-photo-3768914.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Blue Star 0.8 Ton Window AC',
          price: '₹22,000',
          rating: 4.0,
          image:
            'https://images.pexels.com/photos/3968084/pexels-photo-3968084.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
      'mid-range': [
        {
          title: 'LG 1.5 Ton 3 Star Inverter Split AC',
          price: '₹40,000',
          rating: 4.5,
          image:
            'https://images.pexels.com/photos/1457848/pexels-photo-1457848.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Samsung 1.5 Ton 3 Star Inverter AC',
          price: '₹42,000',
          rating: 4.4,
          image:
            'https://images.pexels.com/photos/1750306/pexels-photo-1750306.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
      premium: [
        {
          title: 'Daikin 1.5 Ton 5 Star Inverter AC',
          price: '₹60,000',
          rating: 4.8,
          image:
            'https://images.pexels.com/photos/5721916/pexels-photo-5721916.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Hitachi 1.5 Ton 5 Star Inverter AC',
          price: '₹59,000',
          rating: 4.7,
          image:
            'https://images.pexels.com/photos/6070396/pexels-photo-6070396.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
    },
  },
  {
    title: 'How to Buy a Treadmill',
    slug: 'treadmill',
    category: 'health-personal-care',
    product: 'Treadmill',
    excerpt: 'Key features to consider when purchasing a home treadmill for exercise.',
    recommendations: {
      budget: [
        {
          title: 'Cockatoo Basic Motorized Treadmill',
          price: '₹20,000',
          rating: 4.1,
          image:
            'https://images.pexels.com/photos/376401/pexels-photo-376401.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'PowerMax Fitness Manual Treadmill',
          price: '₹18,500',
          rating: 4.0,
          image:
            'https://images.pexels.com/photos/949126/pexels-photo-949126.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
      'mid-range': [
        {
          title: 'Durafit Heavy Hike 2.5 HP Treadmill',
          price: '₹40,000',
          rating: 4.4,
          image:
            'https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Fitkit FT200 Series Motorized Treadmill',
          price: '₹38,000',
          rating: 4.3,
          image:
            'https://images.pexels.com/photos/1954521/pexels-photo-1954521.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
      premium: [
        {
          title: 'NordicTrack 1750 Commercial Treadmill',
          price: '₹80,000',
          rating: 4.7,
          image:
            'https://images.pexels.com/photos/1954527/pexels-photo-1954527.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Sole F63 Folding Treadmill',
          price: '₹85,000',
          rating: 4.6,
          image:
            'https://images.pexels.com/photos/1954525/pexels-photo-1954525.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
    },
  },
  {
    title: 'How to Buy Books Online',
    slug: 'buy-books-online',
    category: 'baby-kids-school',
    product: 'Books',
    excerpt: 'Tips for finding great books and deals when shopping online.',
    recommendations: {
      budget: [
        {
          title: 'Used Books Marketplace Picks',
          price: '₹299–₹699',
          rating: 4.2,
          image:
            'https://images.pexels.com/photos/256450/pexels-photo-256450.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Bestseller Paperback Deals',
          price: '₹399–₹799',
          rating: 4.3,
          image:
            'https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
      'mid-range': [
        {
          title: 'New Releases & Editor’s Picks',
          price: '₹899–₹1,499',
          rating: 4.5,
          image:
            'https://images.pexels.com/photos/46274/pexels-photo-46274.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Box Sets & Trilogies',
          price: '₹1,499–₹2,999',
          rating: 4.6,
          image:
            'https://images.pexels.com/photos/1301585/pexels-photo-1301585.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
      premium: [
        {
          title: 'Collector’s Editions & Hardcovers',
          price: '₹3,000+',
          rating: 4.8,
          image:
            'https://images.pexels.com/photos/1054775/pexels-photo-1054775.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
        {
          title: 'Premium Illustrated Editions',
          price: '₹4,000+',
          rating: 4.7,
          image:
            'https://images.pexels.com/photos/233928/pexels-photo-233928.jpeg?auto=compress&cs=tinysrgb&w=400',
          affiliate: '#',
        },
      ],
    },
  }
];

// Note: categories and guides are already exported above.
