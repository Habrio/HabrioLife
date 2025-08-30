import type { Lang } from './LanguageProvider';

type Dict = Record<string, { en: string; hi: string }>; // key -> translations

export const dict: Dict = {
  browseCategories: { en: 'Browse Categories', hi: 'श्रेणियां देखें' },
  exploreCategories: {
    en: 'Explore our guide categories and find the products you need help with',
    hi: 'हमारे गाइड श्रेणियां देखें और वह उत्पाद ढूंढें जिसमें आपको मदद चाहिए',
  },
  hero_title_1: { en: 'Discover How to Buy', hi: 'सीखें कैसे खरीदें' },
  hero_title_2: { en: 'the Best Products', hi: 'सबसे बेहतर प्रोडक्ट्स' },
  hero_sub_1: {
    en: 'Expert tips and step-by-step guides to help you make smart purchasing decisions.',
    hi: 'सही खरीद निर्णय के लिए विशेषज्ञ टिप्स और स्टेप-बाय-स्टेप गाइड्स।',
  },
  hero_sub_2: { en: 'Shop smarter, buy with confidence.', hi: 'समझदारी से खरीदें, भरोसे के साथ।' },
  searchResults: { en: 'Search Results', hi: 'खोज परिणाम' },
  enterSearch: { en: 'Please enter a search term.', hi: 'कृपया खोज शब्द दर्ज करें।' },
  startTyping: { en: 'Start typing to search', hi: 'खोजने के लिए टाइप करना शुरू करें' },
  noGuides: { en: 'No guides found', hi: 'कोई गाइड नहीं मिला' },
  latestPosts: { en: 'Latest Posts', hi: 'नवीनतम पोस्ट' },
  allPosts: { en: 'All Posts', hi: 'सभी पोस्ट' },
};

export function t(key: keyof typeof dict, lang: Lang) {
  const row = dict[key];
  return row ? row[lang] : String(key);
}
