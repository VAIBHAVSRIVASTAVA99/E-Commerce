
import { ObjectId } from 'mongodb';

interface MemoryUser {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MemoryProduct {
  _id: ObjectId;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface MemoryCartItem {
  _id: ObjectId;
  userId: ObjectId;
  productId: ObjectId;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}

class MemoryDatabase {
  private users: MemoryUser[] = [];
  private products: MemoryProduct[] = [];
  private cart: MemoryCartItem[] = [];


  async createUser(userData: Omit<MemoryUser, '_id'>): Promise<MemoryUser> {
    const user: MemoryUser = {
      _id: new ObjectId(),
      ...userData,
    };
    this.users.push(user);
    return user;
  }

  async findUserByEmail(email: string): Promise<MemoryUser | null> {
    return this.users.find(u => u.email === email) || null;
  }

  async findUserById(id: string): Promise<MemoryUser | null> {
    return this.users.find(u => u._id.toString() === id) || null;
  }


  async createProduct(productData: Omit<MemoryProduct, '_id'>): Promise<MemoryProduct> {
    const product: MemoryProduct = {
      _id: new ObjectId(),
      ...productData,
    };
    this.products.push(product);
    return product;
  }

  async findProducts(query: any = {}, sort: any = {}, skip = 0, limit = 12): Promise<MemoryProduct[]> {
    let filteredProducts = [...this.products];


    if (query.category && query.category !== 'All') {
      filteredProducts = filteredProducts.filter(p => p.category === query.category);
    }

    if (query.price) {
      if (query.price.$gte !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= query.price.$gte);
      }
      if (query.price.$lte !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= query.price.$lte);
      }
    }

    if (query.rating && query.rating.$gte !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.rating >= query.rating.$gte);
    }

    if (query.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.inStock === query.inStock);
    }

    if (query.$or) {
      const searchTerms = query.$or.map((or: any) => {
        if (or.name && or.name.$regex) {
          return or.name.$regex.source;
        }
        return '';
      }).filter(Boolean);

      if (searchTerms.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
          searchTerms.some((term: string) => 
            p.name.toLowerCase().includes(term.toLowerCase()) ||
            p.description.toLowerCase().includes(term.toLowerCase()) ||
            p.tags.some((tag: string) => tag.toLowerCase().includes(term.toLowerCase()))
          )
        );
      }
    }


    if (sort.name) {
      filteredProducts.sort((a, b) => sort.name === 1 ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
    } else if (sort.price) {
      filteredProducts.sort((a, b) => sort.price === 1 ? a.price - b.price : b.price - a.price);
    } else if (sort.rating) {
      filteredProducts.sort((a, b) => sort.rating === 1 ? a.rating - b.rating : b.rating - a.rating);
    } else if (sort.reviews) {
      filteredProducts.sort((a, b) => sort.reviews === 1 ? a.reviews - b.reviews : b.reviews - a.reviews);
    }

    return filteredProducts.slice(skip, skip + limit);
  }

  async countProducts(query: any = {}): Promise<number> {
    let filteredProducts = [...this.products];


    if (query.category && query.category !== 'All') {
      filteredProducts = filteredProducts.filter(p => p.category === query.category);
    }

    if (query.price) {
      if (query.price.$gte !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= query.price.$gte);
      }
      if (query.price.$lte !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= query.price.$lte);
      }
    }

    if (query.rating && query.rating.$gte !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.rating >= query.rating.$gte);
    }

    if (query.inStock !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.inStock === query.inStock);
    }

    if (query.$or) {
      const searchTerms = query.$or.map((or: any) => {
        if (or.name && or.name.$regex) {
          return or.name.$regex.source;
        }
        return '';
      }).filter(Boolean);

      if (searchTerms.length > 0) {
        filteredProducts = filteredProducts.filter(p => 
          searchTerms.some((term: string) => 
            p.name.toLowerCase().includes(term.toLowerCase()) ||
            p.description.toLowerCase().includes(term.toLowerCase()) ||
            p.tags.some((tag: string) => tag.toLowerCase().includes(term.toLowerCase()))
          )
        );
      }
    }

    return filteredProducts.length;
  }

  async findProductById(id: string): Promise<MemoryProduct | null> {
    return this.products.find(p => p._id.toString() === id) || null;
  }

  async distinctCategories(): Promise<string[]> {
    const categories = Array.from(new Set(this.products.map((p: MemoryProduct) => p.category)));
    return categories.sort();
  }


  async createCartItem(cartData: Omit<MemoryCartItem, '_id'>): Promise<MemoryCartItem> {
    const cartItem: MemoryCartItem = {
      _id: new ObjectId(),
      ...cartData,
    };
    this.cart.push(cartItem);
    return cartItem;
  }

  async findCartItemsByUser(userId: ObjectId): Promise<(MemoryCartItem & { product: MemoryProduct })[]> {
    const userCartItems = this.cart.filter(c => c.userId.toString() === userId.toString());
    
    return userCartItems.map(cartItem => {
      const product = this.products.find(p => p._id.toString() === cartItem.productId.toString());
      return {
        ...cartItem,
        product: product!
      };
    });
  }

  async findCartItem(userId: ObjectId, productId: ObjectId): Promise<MemoryCartItem | null> {
    return this.cart.find(c => 
      c.userId.toString() === userId.toString() && 
      c.productId.toString() === productId.toString()
    ) || null;
  }

  async updateCartItem(id: ObjectId, updateData: Partial<MemoryCartItem>): Promise<boolean> {
    const index = this.cart.findIndex(c => c._id.toString() === id.toString());
    if (index === -1) return false;
    
    this.cart[index] = { ...this.cart[index], ...updateData, updatedAt: new Date() };
    return true;
  }

  async deleteCartItem(id: ObjectId): Promise<boolean> {
    const index = this.cart.findIndex(c => c._id.toString() === id.toString());
    if (index === -1) return false;
    
    this.cart.splice(index, 1);
    return true;
  }

  async deleteCartItemsByUser(userId: ObjectId): Promise<number> {
    const initialLength = this.cart.length;
    this.cart = this.cart.filter(c => c.userId.toString() !== userId.toString());
    return initialLength - this.cart.length;
  }


  async seedProducts(): Promise<void> {
    if (this.products.length > 0) return;


    const { mockProducts } = await import('./mock-products');
    
    for (const product of mockProducts) {
      const productData: Omit<MemoryProduct, '_id'> = {
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
        updatedAt: new Date(),
      };
      
      await this.createProduct(productData);
    }
  }
}


export const memoryDb = new MemoryDatabase();

