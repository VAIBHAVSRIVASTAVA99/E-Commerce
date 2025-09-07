import { mockProducts } from './mock-products';
import { getDatabase } from './mongodb';
import { memoryDb } from './memory-db';

/**
 * Seeds the database (MongoDB or memory) with mock product data
 */
export async function seedMockData() {
  try {
    const db = await getDatabase();
    
    if (db && db.collection) {

      console.log('Seeding MongoDB with mock products...');
      const productsCollection = db.collection('products');
      

      const existingCount = await productsCollection.countDocuments();
      if (existingCount > 0) {
        console.log(`Database already contains ${existingCount} products. Skipping seed.`);
        return;
      }
      

      const productsToInsert = mockProducts.map(product => ({
        name: product.name,
        description: product.description,
        price: product.price,
        originalPrice: product.originalPrice,
        category: product.category,
        rating: product.rating,
        reviews: product.reviews,
        image: product.image,
        inStock: product.inStock,
        tags: product.tags,
        createdAt: new Date(),
        updatedAt: new Date()
      }));
      
      const result = await productsCollection.insertMany(productsToInsert);
      console.log(`✅ Successfully seeded ${result.insertedCount} products to MongoDB`);
      
    } else {

      console.log('Seeding memory database with mock products...');
      await memoryDb.seedProducts();
      console.log('✅ Successfully seeded products to memory database');
    }
    
  } catch (error) {
    console.error('❌ Error seeding mock data:', error);
    throw error;
  }
}

/**
 * Gets sample products for testing
 */
export function getSampleProducts(count: number = 10) {
  return mockProducts.slice(0, count);
}

/**
 * Gets products by category for testing
 */
export function getSampleProductsByCategory(category: string, count: number = 5) {
  return mockProducts
    .filter(product => product.category === category)
    .slice(0, count);
}
