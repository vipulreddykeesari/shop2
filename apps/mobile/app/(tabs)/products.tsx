import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { COLORS, CATEGORIES, PRODUCTS } from '../../src/constants';
import { useCartStore } from '../../src/store';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

export default function ProductsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const addItem = useCartStore(s => s.addItem);

  const [activeCategory, setActiveCategory] = useState(params.category || 'all');
  const [searchQuery, setSearchQuery] = useState('');

  let filtered = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  if (searchQuery) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const handleAdd = (product: any) => {
    const w = product.weights[0];
    addItem({
      id: `${product.id}-${w.value}`,
      productId: product.id,
      name: product.name,
      weight: w.value,
      weightLabel: w.label,
      price: w.price,
      pricePerKg: product.pricePerKg,
      image: product.image,
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={COLORS.textMuted} />
          <TextInput
            placeholder="Search chicken, cuts, combos..."
            placeholderTextColor={COLORS.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={styles.searchInput}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
        <TouchableOpacity
          style={[styles.categoryChip, activeCategory === 'all' && styles.categoryChipActive]}
          onPress={() => setActiveCategory('all')}
        >
          <Text style={[styles.chipText, activeCategory === 'all' && styles.chipTextActive]}>All</Text>
        </TouchableOpacity>
        {CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[styles.categoryChip, activeCategory === cat.id && styles.categoryChipActive]}
            onPress={() => setActiveCategory(cat.id)}
          >
            <Text style={[styles.chipText, activeCategory === cat.id && styles.chipTextActive]}>
              {cat.icon} {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Results Count */}
      <Text style={styles.resultCount}>{filtered.length} products found</Text>

      {/* Product Grid */}
      {filtered.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={{ fontSize: 60, marginBottom: 12 }}>🍗</Text>
          <Text style={styles.emptyTitle}>No products found</Text>
          <Text style={styles.emptySubtitle}>Try adjusting your filters</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {filtered.map(product => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => router.push(`/product/${product.id}`)}
              activeOpacity={0.85}
            >
              {product.tags?.[0] && (
                <View style={[styles.badge, product.tags[0] === 'premium' ? styles.badgePremium : styles.badgeDefault]}>
                  <Text style={styles.badgeText}>
                    {product.tags[0] === 'bestseller' ? '🔥' : product.tags[0] === 'premium' ? '⭐' : '🏷️'} {product.tags[0]}
                  </Text>
                </View>
              )}
              <View style={styles.imgArea}>
                <Text style={{ fontSize: 44 }}>🍗</Text>
                <View style={styles.ratingBadge}>
                  <Ionicons name="star" size={10} color={COLORS.star} />
                  <Text style={styles.ratingText}>{product.rating} ({product.reviews})</Text>
                </View>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.catLabel}>{product.category.replace(/-/g, ' ').toUpperCase()}</Text>
                <Text style={styles.cardTitle} numberOfLines={1}>{product.name}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{product.description}</Text>
                {/* Weight Options */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
                  {product.weights.map((w, i) => (
                    <View key={i} style={[styles.weightChip, i === 0 && styles.weightChipActive]}>
                      <Text style={[styles.weightChipText, i === 0 && { color: '#fff' }]}>{w.label}</Text>
                    </View>
                  ))}
                </ScrollView>
                <View style={styles.cardBottom}>
                  <View>
                    <Text style={styles.cardPrice}>₹{product.weights[0].price}</Text>
                    <Text style={styles.cardPerKg}>₹{product.pricePerKg}/kg</Text>
                  </View>
                  <TouchableOpacity onPress={() => handleAdd(product)} activeOpacity={0.7}>
                    <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.addBtn}>
                      <Ionicons name="cart-outline" size={14} color="#fff" />
                      <Text style={styles.addBtnText}>Add</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      )}
      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  searchContainer: { padding: 16, paddingBottom: 8 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 14, paddingHorizontal: 14, height: 48, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 4, gap: 10 },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.text },
  categoryRow: { paddingHorizontal: 16, paddingVertical: 8, gap: 8 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: COLORS.border, marginRight: 8 },
  categoryChipActive: { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
  chipText: { fontSize: 12, fontWeight: '600', color: COLORS.textSecondary },
  chipTextActive: { color: '#fff' },
  resultCount: { paddingHorizontal: 16, fontSize: 13, color: COLORS.textMuted, marginBottom: 12, fontWeight: '500' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 12 },
  productCard: { width: cardWidth, backgroundColor: '#fff', borderRadius: 18, margin: 6, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6 },
  badge: { position: 'absolute', top: 8, left: 8, zIndex: 10, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  badgeDefault: { backgroundColor: '#fee2e2' },
  badgePremium: { backgroundColor: '#fef3c7' },
  badgeText: { fontSize: 9, fontWeight: '700', color: COLORS.text, textTransform: 'capitalize' },
  imgArea: { height: 110, backgroundColor: '#fef2f2', justifyContent: 'center', alignItems: 'center', position: 'relative' },
  ratingBadge: { position: 'absolute', bottom: 6, right: 6, flexDirection: 'row', alignItems: 'center', gap: 3, backgroundColor: '#fff', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8, elevation: 1 },
  ratingText: { fontSize: 10, fontWeight: '600', color: COLORS.text },
  cardBody: { padding: 10 },
  catLabel: { fontSize: 8, fontWeight: '700', color: COLORS.primary, letterSpacing: 0.5, marginBottom: 2 },
  cardTitle: { fontSize: 13, fontWeight: '700', color: COLORS.text, marginBottom: 3 },
  cardDesc: { fontSize: 10, color: COLORS.textMuted, lineHeight: 14, marginBottom: 6 },
  weightChip: { paddingHorizontal: 8, paddingVertical: 4, backgroundColor: COLORS.borderLight, borderRadius: 8, marginRight: 6 },
  weightChipActive: { backgroundColor: COLORS.primary },
  weightChipText: { fontSize: 10, fontWeight: '600', color: COLORS.textSecondary },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 17, fontWeight: '900', color: COLORS.text },
  cardPerKg: { fontSize: 10, color: COLORS.textMuted },
  addBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  addBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  emptyState: { alignItems: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: COLORS.text, marginBottom: 4 },
  emptySubtitle: { fontSize: 13, color: COLORS.textMuted },
});
