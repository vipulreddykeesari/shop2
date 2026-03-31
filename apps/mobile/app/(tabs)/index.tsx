import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { COLORS, CATEGORIES, PRODUCTS } from '../../src/constants';
import { useCartStore } from '../../src/store';

const { width } = Dimensions.get('window');

function HeroSection() {
  const router = useRouter();
  return (
    <LinearGradient colors={['#1a1a2e', '#16213e', '#0f3460']} style={styles.hero}>
      <View style={styles.heroBadge}>
        <Ionicons name="flash" size={14} color={COLORS.primary} />
        <Text style={styles.heroBadgeText}>Farm Fresh • 45 min Delivery</Text>
      </View>
      <Text style={styles.heroTitle}>
        Fresh Chicken,{'\n'}
        <Text style={{ color: COLORS.primary }}>Delivered</Text> to{'\n'}
        Your Door
      </Text>
      <Text style={styles.heroSubtitle}>
        Premium farm-fresh chicken from Rahman Chicken Center. Quality you can taste!
      </Text>
      <TouchableOpacity
        style={styles.heroBtn}
        onPress={() => router.push('/(tabs)/products')}
        activeOpacity={0.8}
      >
        <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.heroBtnGrad}>
          <Text style={styles.heroBtnText}>Order Now</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.trustRow}>
        {['🐔 Farm Fresh', '⚡ 45 Min', '✅ FSSAI', '🔒 Secure'].map((t, i) => (
          <Text key={i} style={styles.trustItem}>{t}</Text>
        ))}
      </View>
      {/* Floating chicken emoji */}
      <Text style={styles.floatingEmoji}>🍗</Text>
    </LinearGradient>
  );
}

function CategorySection() {
  const router = useRouter();
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Shop by <Text style={{ color: COLORS.primary }}>Category</Text></Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
        {CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryCard, { backgroundColor: cat.color }]}
            onPress={() => router.push({ pathname: '/(tabs)/products', params: { category: cat.id } })}
            activeOpacity={0.7}
          >
            <Text style={styles.categoryIcon}>{cat.icon}</Text>
            <Text style={styles.categoryName}>{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function ProductCard({ product }: { product: any }) {
  const router = useRouter();
  const addItem = useCartStore(s => s.addItem);
  const firstWeight = product.weights[0];

  const handleAdd = () => {
    addItem({
      id: `${product.id}-${firstWeight.value}`,
      productId: product.id,
      name: product.name,
      weight: firstWeight.value,
      weightLabel: firstWeight.label,
      price: firstWeight.price,
      pricePerKg: product.pricePerKg,
      image: product.image,
    });
  };

  return (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => router.push(`/product/${product.id}`)}
      activeOpacity={0.85}
    >
      {/* Badge */}
      {product.tags?.[0] && (
        <View style={[styles.badge, product.tags[0] === 'premium' ? styles.badgePremium : styles.badgeBestseller]}>
          <Text style={styles.badgeText}>
            {product.tags[0] === 'bestseller' ? '🔥 Bestseller' : product.tags[0] === 'premium' ? '⭐ Premium' : product.tags[0]}
          </Text>
        </View>
      )}

      {/* Image Area */}
      <View style={styles.productImgArea}>
        <Text style={styles.productEmoji}>🍗</Text>
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color={COLORS.star} />
          <Text style={styles.ratingText}>{product.rating}</Text>
        </View>
      </View>

      {/* Info */}
      <View style={styles.productInfo}>
        <Text style={styles.productCategory}>{product.category.replace(/-/g, ' ').toUpperCase()}</Text>
        <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.productPrice}>₹{firstWeight.price}</Text>
          <Text style={styles.productUnit}>/{firstWeight.label}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.7}>
          <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.addBtnGrad}>
            <Ionicons name="cart-outline" size={16} color="#fff" />
            <Text style={styles.addBtnText}>Add</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function BestsellersSection() {
  const bestsellers = PRODUCTS.filter(p => p.tags?.includes('bestseller') || p.tags?.includes('premium')).slice(0, 6);
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🔥 <Text style={{ color: COLORS.primary }}>Bestsellers</Text></Text>
      <FlatList
        data={bestsellers}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
}

function PromoSection() {
  return (
    <View style={styles.section}>
      <LinearGradient colors={[COLORS.primary, '#c62828']} style={styles.promoBanner}>
        <View style={{ flex: 1 }}>
          <Text style={styles.promoTag}>🎉 Weekend Special</Text>
          <Text style={styles.promoTitle}>Flat 20% OFF</Text>
          <Text style={styles.promoSubtitle}>On all Combos & Family Packs</Text>
          <Text style={styles.promoCode}>Use code: WEEKEND20</Text>
        </View>
        <Text style={{ fontSize: 60 }}>🍗</Text>
      </LinearGradient>
    </View>
  );
}

function FeaturesSection() {
  const features = [
    { icon: '🐔', title: 'Farm Fresh', desc: 'Sourced daily from verified farms' },
    { icon: '🚚', title: '45 Min Delivery', desc: 'From our shop to your door' },
    { icon: '❄️', title: 'Cold Chain', desc: 'Temperature controlled packaging' },
    { icon: '💯', title: '100% Halal', desc: 'Certified quality assurance' },
  ];
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Why <Text style={{ color: COLORS.primary }}>Rahman Chicken?</Text></Text>
      <View style={styles.featuresGrid}>
        {features.map((f, i) => (
          <View key={i} style={styles.featureCard}>
            <Text style={styles.featureIcon}>{f.icon}</Text>
            <Text style={styles.featureTitle}>{f.title}</Text>
            <Text style={styles.featureDesc}>{f.desc}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

function ContactSection() {
  return (
    <View style={[styles.section, { marginBottom: 30 }]}>
      <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.contactCard}>
        <Text style={{ fontSize: 40, marginBottom: 8 }}>📍</Text>
        <Text style={styles.contactTitle}>Visit Us</Text>
        <Text style={styles.contactText}>Jai Hind Babu Gully, Vanasthalipuram{'\n'}Hyderabad, Telangana</Text>
        <View style={styles.contactRow}>
          <Ionicons name="call" size={16} color={COLORS.primary} />
          <Text style={styles.contactPhone}>+91 97008 90630</Text>
        </View>
        <Text style={styles.contactHours}>⏰ Open: 7:00 AM - 10:00 PM (Daily)</Text>
      </LinearGradient>
    </View>
  );
}

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <HeroSection />
      <CategorySection />
      <BestsellersSection />
      <PromoSection />
      <FeaturesSection />
      <ContactSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },

  // Hero
  hero: { padding: 24, paddingTop: 30, paddingBottom: 40, position: 'relative', overflow: 'hidden' },
  heroBadge: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(230,57,70,0.15)', alignSelf: 'flex-start', paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, marginBottom: 16 },
  heroBadgeText: { color: COLORS.primary, fontSize: 12, fontWeight: '600' },
  heroTitle: { fontSize: 34, fontWeight: '900', color: '#fff', lineHeight: 42, marginBottom: 12 },
  heroSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.65)', lineHeight: 22, marginBottom: 24, maxWidth: '75%' },
  heroBtn: { alignSelf: 'flex-start', marginBottom: 20 },
  heroBtnGrad: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 28, paddingVertical: 14, borderRadius: 14 },
  heroBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  trustRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  trustItem: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '600' },
  floatingEmoji: { position: 'absolute', right: 20, top: 40, fontSize: 80, opacity: 0.15 },

  // Section
  section: { marginTop: 24 },
  sectionTitle: { fontSize: 22, fontWeight: '800', color: COLORS.text, marginBottom: 16, paddingHorizontal: 16 },

  // Categories
  categoryCard: { width: 100, height: 100, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  categoryIcon: { fontSize: 32, marginBottom: 6 },
  categoryName: { fontSize: 11, fontWeight: '700', color: COLORS.text, textAlign: 'center' },

  // Product Card
  productCard: { width: 170, backgroundColor: '#fff', borderRadius: 18, marginRight: 12, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
  badge: { position: 'absolute', top: 8, left: 8, zIndex: 10, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  badgeBestseller: { backgroundColor: '#fee2e2' },
  badgePremium: { backgroundColor: '#fef3c7' },
  badgeText: { fontSize: 9, fontWeight: '700', color: COLORS.text },
  productImgArea: { height: 120, backgroundColor: '#fef2f2', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  productEmoji: { fontSize: 50 },
  ratingBadge: { position: 'absolute', bottom: 6, right: 6, flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#fff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, elevation: 2 },
  ratingText: { fontSize: 11, fontWeight: '700', color: COLORS.text },
  productInfo: { padding: 12 },
  productCategory: { fontSize: 9, fontWeight: '700', color: COLORS.primary, letterSpacing: 0.5, marginBottom: 2 },
  productName: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 6 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 10 },
  productPrice: { fontSize: 18, fontWeight: '900', color: COLORS.text },
  productUnit: { fontSize: 11, color: COLORS.textMuted, marginLeft: 2 },
  addBtn: { borderRadius: 10, overflow: 'hidden' },
  addBtnGrad: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 9, borderRadius: 10 },
  addBtnText: { color: '#fff', fontSize: 13, fontWeight: '700' },

  // Promo
  promoBanner: { marginHorizontal: 16, borderRadius: 20, padding: 24, flexDirection: 'row', alignItems: 'center' },
  promoTag: { color: '#fff', fontSize: 12, fontWeight: '600', marginBottom: 6 },
  promoTitle: { color: '#fff', fontSize: 28, fontWeight: '900', marginBottom: 4 },
  promoSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 13 },
  promoCode: { color: '#ffd54f', fontSize: 12, fontWeight: '700', marginTop: 8 },

  // Features
  featuresGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12 },
  featureCard: { width: (width - 48) / 2, backgroundColor: '#fff', borderRadius: 16, padding: 16, margin: 4, alignItems: 'center', elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.04, shadowRadius: 4 },
  featureIcon: { fontSize: 30, marginBottom: 8 },
  featureTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  featureDesc: { fontSize: 11, color: COLORS.textMuted, textAlign: 'center' },

  // Contact
  contactCard: { marginHorizontal: 16, borderRadius: 20, padding: 24, alignItems: 'center' },
  contactTitle: { color: '#fff', fontSize: 20, fontWeight: '800', marginBottom: 8 },
  contactText: { color: 'rgba(255,255,255,0.7)', fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 12 },
  contactRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 },
  contactPhone: { color: COLORS.primary, fontSize: 16, fontWeight: '700' },
  contactHours: { color: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: '600' },
});
