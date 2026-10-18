import logo2Img from '../assets/logo2.png';
import logo1Img from '../assets/logo1.png';
import spicyChillaImg from '../assets/packagespicychila.png';
import superDesiChillaImg from '../assets/packagesuperdesichila.png';
import classicChillaImg from '../assets/packageClassicchila.png';
import planFraImg from '../assets/planfra.png';
import masalaPraImg from '../assets/masalpra.png';
import dudhPraImg from '../assets/dudhpra.png';
import pepration1Img from '../assets/pepration1.jpeg';
import pepration2Img from '../assets/pepration2.jpeg';
import pepration3Img from '../assets/pepration3.jpeg';
import pepration4Img from '../assets/pepration4.jpeg';

export { logo2Img, logo1Img };

export const highlights = [
  {
    title: 'Ready-to-Cook Mixes',
    text: 'Cereals and pulse-based instant food mixes designed for fast, home-style cooking in under 10 minutes.',
  },
  {
    title: 'Brand-First Quality',
    text: 'Bold branding, clean labeling, and visually distinct product variants for authentic culinary appeal.',
  },
  {
    title: 'Rooted in Bhilai',
    text: 'Proudly manufactured at Shivaji Nagar, Camp-2, Power House, Bhilai, Durg, Chhattisgarh.',
  },
];

export const whyChooseUs = [
  {
    title: 'Authentic Chhattisgarhi Recipes',
    description: 'Traditional taste and heritage recipes formulated to preserve true regional food identity.',
  },
  {
    title: 'Premium Farm-Sourced Ingredients',
    description: 'We source high-quality grains directly from local Chhattisgarh farmlands.',
  },
  {
    title: 'Hygienically Processed & Packed',
    description: 'Manufactured under strict hygienic protocols and multi-stage quality checks.',
  },
  {
    title: 'No Artificial Preservatives',
    description: '100% natural ingredients. Free from artificial colors, chemical flavors, or additives.',
  },
  {
    title: 'Consistent Taste & Texture',
    description: 'Carefully measured ratios to ensure perfect, crispy results every single time.',
  },
  {
    title: 'Supporting Local Farmers',
    description: 'Sourcing directly to empower regional agriculture and local farming families.',
  },
];

export const trustFeatures = [
  {
    icon: '🌾',
    title: '100% Grain Mix',
    subtitle: 'Pure rice & pulse flours',
  },
  {
    icon: '⚡',
    title: 'Cook in 5 Mins',
    subtitle: 'Quick & effortless meal',
  },
  {
    icon: '🚫',
    title: 'Zero Maida',
    subtitle: 'No preservatives added',
  },
  {
    icon: '🏆',
    title: 'FSSAI Certified',
    subtitle: 'Strict quality control',
  },
];

export const products = [
  {
    id: 'spicy',
    name: 'Chhattisgarhi Spicy Chilla Mix',
    image: spicyChillaImg,
    accent: 'Spicy',
    rating: '4.9',
    reviews: '142 reviews',
    description: 'A high-impact variant with strong shelf presence, quick preparation, and a bold, spicy, masaledar identity.',
    weight: '250g / 500g',
    bullets: ['Bold Masala Flavor', '5-Min Instant Cook', 'High Protein & Fiber'],
    ingredientsList: ['New Rice Flour', 'Besan (Gram Flour)', 'Chilli Flakes', 'Jeera Powder', 'Garlic Powder', 'Coriander', 'Salt'],
  },
  {
    id: 'desi',
    name: 'Chhattisgarhi Super Desi Chilla Mix',
    image: superDesiChillaImg,
    accent: 'Super Desi',
    rating: '5.0',
    reviews: '215 reviews',
    description: 'A traditional-looking variant built around rustic positioning, everyday utility, and classic tastes.',
    weight: '250g / 500g',
    bullets: ['Rustic Regional Flavor', 'Perfect Crispiness', '100% Natural Ingredients'],
    ingredientsList: ['New Rice Flour', 'Besan', 'Coriander Leaves', 'Jeera', 'Traditional Spices', 'Salt'],
  },
  {
    id: 'classic',
    name: 'Chhattisgarhi Classic Chilla Mix',
    image: classicChillaImg,
    accent: 'Classic',
    rating: '4.8',
    reviews: '98 reviews',
    description: 'A clean, familiar option for buyers who want a simple, authentic, and dependable ready-to-cook mix.',
    weight: '250g / 500g',
    bullets: ['Mild & Authentic', 'Family Favorite', 'No Preservatives'],
    ingredientsList: ['New Rice Flour', 'Besan', 'Mild Spices', 'Coriander', 'Rock Salt'],
  },
];

export const comparisonData = [
  { feature: 'Primary Base', shreeDhaan: '100% Natural Grains & Pulses', market: 'Often blended with Maida or starch' },
  { feature: 'Artificial Preservatives', shreeDhaan: '0% Preservatives & Colors', market: 'Contains chemical stabilizers' },
  { feature: 'Recipe Origin', shreeDhaan: 'Authentic Chhattisgarhi Heritage', market: 'Generic commercial mix' },
  { feature: 'Preparation Time', shreeDhaan: 'Ready in 5 Minutes', market: '15-20 minutes with added steps' },
  { feature: 'Farm Traceability', shreeDhaan: 'Direct Chhattisgarh Farmlands', market: 'Mass commercial sourcing' },
];

export const ingredients = [
  'New Rice Flour',
  'Besan (Gram Flour)',
  'Coriander Leaves',
  'Chilli Flakes',
  'Jeera Powder',
  'Garlic Powder',
  'Salt',
];

export const futureProducts = [
  {
    name: 'Plain Fara',
    type: 'Steamed Snack',
    image: planFraImg,
    description: 'Traditional steamed rice rolls, light and served with sesame-chilli tempering.',
  },
  {
    name: 'Masala Fara',
    type: 'Crispy Snack',
    image: masalaPraImg,
    description: 'Crispy fried rice snacks tossed with a robust blend of local spices.',
  },
  {
    name: 'Dudh Fara',
    type: 'Sweet Dessert',
    image: dudhPraImg,
    description: 'Sweet rice flour dumplings slow-cooked in cardamom and saffron infused milk.',
  },
];

export const preparationSteps = [
  {
    text: 'Mix the Shree Dhaan chilla batter with water until smooth. Let it rest for 2-3 minutes.',
    image: pepration1Img,
  },
  {
    text: 'Heat the non-stick pan on medium flame and apply a light brush of oil or ghee.',
    image: pepration2Img,
  },
  {
    text: 'Pour one cup of batter and spread it evenly in circular motion to form a round chilla.',
    image: pepration3Img,
  },
  {
    text: 'Cover with a lid and cook. Flip the chilla once the edges turn crisp and golden brown.',
    image: pepration4Img,
  },
];
