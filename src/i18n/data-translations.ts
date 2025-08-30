import { guides as enGuides } from '@/lib/data';
import type { Lang } from './LanguageProvider';

// New canonical categories for the site
const categoriesNew = [
  { name: 'Daily Essentials', slug: 'daily-essentials', description: 'Everyday items for home and on-the-go' },
  { name: 'Household Needs', slug: 'household-needs', description: 'Appliances and tools for a smooth home' },
  { name: 'Health & Personal Care', slug: 'health-personal-care', description: 'Fitness, wellness and grooming' },
  { name: 'Baby, Kids & School', slug: 'baby-kids-school', description: 'Learning, school and parenting essentials' },
  { name: 'Décor, Furniture & Storage', slug: 'decor-furniture-storage', description: 'Make spaces beautiful and organized' },
  { name: 'Smart Spending & Financials', slug: 'smart-spending-financials', description: 'Value buys and money-smart picks' },
];

const categoryHi: Record<string, { name: string; description?: string }> = {
  'daily-essentials': { name: 'दैनिक आवश्यकताएँ', description: 'घर और बाहर के रोज़मर्रा के सामान' },
  'household-needs': { name: 'घरेलू ज़रूरतें', description: 'उपकरण और चीजें जो घर को सरल बनाएं' },
  'health-personal-care': { name: 'स्वास्थ्य और व्यक्तिगत देखभाल', description: 'फिटनेस, वेलनेस और ग्रूमिंग' },
  'baby-kids-school': { name: 'बेबी, किड्स और स्कूल', description: 'सीखना, स्कूल और पेरेंटिंग आवश्यकताएँ' },
  'decor-furniture-storage': { name: 'डेकोर, फर्नीचर और स्टोरेज', description: 'स्पेस को सुंदर और व्यवस्थित बनाएं' },
  'smart-spending-financials': { name: 'स्मार्ट खर्च और वित्त', description: 'वैल्यू बाय और मनी-स्मार्ट पिक्स' },
};

// Remap original guides to the new categories
const guideCategoryRemap: Record<string, string> = {
  laptop: 'smart-spending-financials',
  'running-shoes': 'health-personal-care',
  'air-conditioner': 'household-needs',
  treadmill: 'health-personal-care',
  'buy-books-online': 'baby-kids-school',
};

// Additional guides to guarantee at least 2 per category
const extraGuides = [
  {
    title: 'How to Buy a Water Bottle',
    slug: 'water-bottle',
    category: 'daily-essentials',
    product: 'Water Bottle',
    excerpt: 'Pick a durable, leak-proof bottle that suits your daily routine.',
    recommendations: {
      budget: [
        { title: 'Milton Basic 1L Bottle', price: '₹299', rating: 4.2, image: 'https://images.pexels.com/photos/396547/pexels-photo-396547.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Cello H2O 1L PET Bottle', price: '₹249', rating: 4.1, image: 'https://images.pexels.com/photos/416528/pexels-photo-416528.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      'mid-range': [
        { title: 'Borosil Hydra Stainless 750ml', price: '₹699', rating: 4.5, image: 'https://images.pexels.com/photos/296730/pexels-photo-296730.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Tupperware Eco 1L', price: '₹899', rating: 4.4, image: 'https://images.pexels.com/photos/299528/pexels-photo-299528.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      premium: [
        { title: 'Hydro Flask 946ml', price: '₹3,999', rating: 4.8, image: 'https://images.pexels.com/photos/593097/pexels-photo-593097.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'CamelBak Chute Mag', price: '₹2,999', rating: 4.7, image: 'https://images.pexels.com/photos/1235660/pexels-photo-1235660.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
    },
  },
  {
    title: 'Choosing Laundry Detergent',
    slug: 'laundry-detergent',
    category: 'daily-essentials',
    product: 'Detergent',
    excerpt: 'Powder vs liquid vs pods — what works best for your wash.',
    recommendations: {
      budget: [
        { title: 'Surf Excel Easy Wash 1kg', price: '₹180', rating: 4.3, image: 'https://images.pexels.com/photos/38325/wash-bowl-clean-cleaning-38325.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Ghadi Detergent Powder 1kg', price: '₹120', rating: 4.1, image: 'https://images.pexels.com/photos/48889/pexels-photo-48889.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      'mid-range': [
        { title: 'Ariel Matic Liquid 1L', price: '₹399', rating: 4.5, image: 'https://images.pexels.com/photos/3964343/pexels-photo-3964343.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Surf Excel Matic Liquid 1L', price: '₹349', rating: 4.4, image: 'https://images.pexels.com/photos/3964353/pexels-photo-3964353.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      premium: [
        { title: 'Persil Bio Liquid 2L', price: '₹1,299', rating: 4.7, image: 'https://images.pexels.com/photos/450054/pexels-photo-450054.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Tide Pods (Imported)', price: '₹1,999', rating: 4.6, image: 'https://images.pexels.com/photos/5863871/pexels-photo-5863871.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
    },
  },
  {
    title: 'How to Buy a Vacuum Cleaner',
    slug: 'vacuum-cleaner',
    category: 'household-needs',
    product: 'Vacuum Cleaner',
    excerpt: 'Suction, filters, and form factor — find the right vacuum for your home.',
    recommendations: {
      budget: [
        { title: 'Eureka Forbes Quick Clean DX', price: '₹4,999', rating: 4.2, image: 'https://images.pexels.com/photos/3616762/pexels-photo-3616762.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Agaro Rapid 1000W', price: '₹3,999', rating: 4.1, image: 'https://images.pexels.com/photos/4107285/pexels-photo-4107285.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      'mid-range': [
        { title: 'Philips PowerPro 2000W', price: '₹8,999', rating: 4.5, image: 'https://images.pexels.com/photos/8566446/pexels-photo-8566446.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Dyson V8 Absolute (Renewed)', price: '₹24,999', rating: 4.6, image: 'https://images.pexels.com/photos/4107284/pexels-photo-4107284.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      premium: [
        { title: 'Dyson V12 Detect Slim', price: '₹47,900', rating: 4.8, image: 'https://images.pexels.com/photos/8566445/pexels-photo-8566445.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'iRobot Roomba i7', price: '₹39,999', rating: 4.7, image: 'https://images.pexels.com/photos/8566442/pexels-photo-8566442.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
    },
  },
  {
    title: 'Best School Backpack Guide',
    slug: 'school-backpack',
    category: 'baby-kids-school',
    product: 'Backpack',
    excerpt: 'Comfort, capacity, and durability for everyday school use.',
    recommendations: {
      budget: [
        { title: 'AmazonBasics 21L', price: '₹699', rating: 4.2, image: 'https://images.pexels.com/photos/207697/pexels-photo-207697.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Wildcraft 20L', price: '₹899', rating: 4.3, image: 'https://images.pexels.com/photos/373125/pexels-photo-373125.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      'mid-range': [
        { title: 'American Tourister 32L', price: '₹1,699', rating: 4.5, image: 'https://images.pexels.com/photos/52500/pexels-photo-52500.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Skybags Brat 30L', price: '₹1,499', rating: 4.4, image: 'https://images.pexels.com/photos/374746/pexels-photo-374746.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      premium: [
        { title: 'Fjällräven Kånken', price: '₹7,999', rating: 4.7, image: 'https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'North Face Borealis', price: '₹8,499', rating: 4.7, image: 'https://images.pexels.com/photos/2728255/pexels-photo-2728255.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
    },
  },
  {
    title: 'Buy a Bookshelf for Small Spaces',
    slug: 'bookshelf',
    category: 'decor-furniture-storage',
    product: 'Bookshelf',
    excerpt: 'Make the most of tight corners with compact shelving.',
    recommendations: {
      budget: [
        { title: 'Flipzon 4-Tier Engineered Wood', price: '₹1,999', rating: 4.2, image: 'https://images.pexels.com/photos/276724/pexels-photo-276724.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'HomeCentre Zig-Zag Wall Shelf', price: '₹1,499', rating: 4.1, image: 'https://images.pexels.com/photos/698066/pexels-photo-698066.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      'mid-range': [
        { title: 'IKEA Kallax 2x4', price: '₹6,990', rating: 4.6, image: 'https://images.pexels.com/photos/276583/pexels-photo-276583.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'DeckUp Turrano 5-Shelf', price: '₹5,499', rating: 4.4, image: 'https://images.pexels.com/photos/207924/pexels-photo-207924.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      premium: [
        { title: 'Solid Sheesham Ladder Shelf', price: '₹12,999', rating: 4.7, image: 'https://images.pexels.com/photos/276566/pexels-photo-276566.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Industrial Metal + Wood Shelf', price: '₹14,999', rating: 4.6, image: 'https://images.pexels.com/photos/276508/pexels-photo-276508.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
    },
  },
  {
    title: 'Ergonomic Desk Chair Guide',
    slug: 'desk-chair',
    category: 'decor-furniture-storage',
    product: 'Desk Chair',
    excerpt: 'Support, adjustability, and breathability for long work hours.',
    recommendations: {
      budget: [
        { title: 'Green Soul Jupiter', price: '₹5,999', rating: 4.3, image: 'https://images.pexels.com/photos/8139409/pexels-photo-8139409.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Cellbell C104', price: '₹3,999', rating: 4.2, image: 'https://images.pexels.com/photos/189333/pexels-photo-189333.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      'mid-range': [
        { title: 'INNOWIN Jazz High Back', price: '₹9,999', rating: 4.5, image: 'https://images.pexels.com/photos/8112338/pexels-photo-8112338.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Featherlite Amaze', price: '₹12,999', rating: 4.6, image: 'https://images.pexels.com/photos/8112313/pexels-photo-8112313.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      premium: [
        { title: 'Herman Miller Aeron (Renewed)', price: '₹69,999', rating: 4.8, image: 'https://images.pexels.com/photos/8112337/pexels-photo-8112337.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'ErgoChair Pro', price: '₹29,999', rating: 4.7, image: 'https://images.pexels.com/photos/8112368/pexels-photo-8112368.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
    },
  },
  {
    title: 'Best Power Banks to Buy',
    slug: 'power-bank',
    category: 'smart-spending-financials',
    product: 'Power Bank',
    excerpt: 'Capacity, ports and protections — charge safely on the go.',
    recommendations: {
      budget: [
        { title: 'Mi Power Bank 3i 10000mAh', price: '₹1,299', rating: 4.5, image: 'https://images.pexels.com/photos/5086486/pexels-photo-5086486.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'URBN 10000mAh Fast Charge', price: '₹999', rating: 4.3, image: 'https://images.pexels.com/photos/5082576/pexels-photo-5082576.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      'mid-range': [
        { title: 'Anker PowerCore 20K', price: '₹3,499', rating: 4.6, image: 'https://images.pexels.com/photos/5082577/pexels-photo-5082577.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Ambrane 20000mAh', price: '₹2,499', rating: 4.4, image: 'https://images.pexels.com/photos/5082578/pexels-photo-5082578.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
      premium: [
        { title: 'Anker 737 Power Bank', price: '₹11,999', rating: 4.8, image: 'https://images.pexels.com/photos/5082575/pexels-photo-5082575.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
        { title: 'Baseus Blade 100W', price: '₹9,999', rating: 4.7, image: 'https://images.pexels.com/photos/5082572/pexels-photo-5082572.jpeg?auto=compress&cs=tinysrgb&w=400', affiliate: '#' },
      ],
    },
  },
];

const guideHi: Record<string, { title?: string; excerpt?: string; product?: string; category?: string }> = {
  laptop: { title: 'लैपटॉप कैसे खरीदें', excerpt: 'नए लैपटॉप चुनते समय ध्यान देने योग्य मुख्य बातें।', product: 'लैपटॉप', category: guideCategoryRemap['laptop'] },
  'running-shoes': { title: 'रनिंग शूज़ कैसे चुनें', excerpt: 'किसी भी बजट के लिए गुणवत्ता वाले रनिंग फुटवेयर में क्या देखें।', product: 'रनिंग शूज़', category: guideCategoryRemap['running-shoes'] },
  'air-conditioner': { title: 'एयर कंडीशनर कैसे खरीदें', excerpt: 'ऊर्जा दक्षता और कमरे के आकार के अनुसार सही AC चुनें।', product: 'एयर कंडीशनर', category: guideCategoryRemap['air-conditioner'] },
  treadmill: { title: 'ट्रेडमिल कैसे खरीदें', excerpt: 'होम वर्कआउट के लिए ट्रेडमिल लेते समय किन बातों पर ध्यान दें।', product: 'ट्रेडमिल', category: guideCategoryRemap['treadmill'] },
  'buy-books-online': { title: 'ऑनलाइन किताबें कैसे खरीदें', excerpt: 'ऑनलाइन बेहतरीन किताबें और डील्स ढूँढने के आसान तरीके।', product: 'किताबें', category: guideCategoryRemap['buy-books-online'] },
  'water-bottle': { title: 'वॉटर बॉटल कैसे चुनें', excerpt: 'हर दिन के लिए टिकाऊ और लीक-प्रूफ बॉटल चुनें।', product: 'वॉटर बॉटल', category: 'daily-essentials' },
  'laundry-detergent': { title: 'लॉन्ड्री डिटर्जेंट कैसे चुनें', excerpt: 'पाउडर, लिक्विड या पॉड्स — आपकी वॉश के लिए क्या बेहतर है।', product: 'डिटर्जेंट', category: 'daily-essentials' },
  'vacuum-cleaner': { title: 'वैक्यूम क्लीनर कैसे खरीदें', excerpt: 'सक्शन, फ़िल्टर और फॉर्म फ़ैक्टर पर ध्यान दें।', product: 'वैक्यूम क्लीनर', category: 'household-needs' },
  'school-backpack': { title: 'स्कूल बैकपैक कैसे चुनें', excerpt: 'आराम, क्षमता और टिकाऊपन — रोज़मर्रा के लिए।', product: 'बैकपैक', category: 'baby-kids-school' },
  bookshelf: { title: 'छोटी स्पेस के लिए बुकशेल्फ़', excerpt: 'कॉम्पैक्ट शेल्फ़िंग से जगह का सही उपयोग।', product: 'बुकशेल्फ़', category: 'decor-furniture-storage' },
  'desk-chair': { title: 'एर्गोनोमिक डेस्क चेयर गाइड', excerpt: 'लंबे काम के लिए सपोर्ट और एडजस्टेबिलिटी।', product: 'डेस्क चेयर', category: 'decor-furniture-storage' },
  'power-bank': { title: 'सबसे अच्छे पावर बैंक', excerpt: 'कैपेसिटी, पोर्ट्स और सेफ़्टी — चलते-फिरते चार्जिंग।', product: 'पावर बैंक', category: 'smart-spending-financials' },
};

export function getCategories(lang: Lang) {
  if (lang === 'hi') {
    return categoriesNew.map((c) => ({ ...c, ...(categoryHi[c.slug] || {}) }));
  }
  return categoriesNew;
}

export function getGuides(lang: Lang) {
  // Start with remapped originals
  const originals = enGuides.map((g) => ({ ...g, category: guideCategoryRemap[g.slug] || g.category }));
  // Add extra guides
  let result: any[] = [...originals, ...extraGuides];
  if (lang === 'hi') {
    result = result.map((g) => ({ ...g, ...(guideHi[g.slug] || {}) }));
  }
  return result;
}
