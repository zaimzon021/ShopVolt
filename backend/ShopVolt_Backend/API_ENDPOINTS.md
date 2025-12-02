# ShopVolt Backend API Endpoints

## Base URL
`http://localhost:3001`

## Authentication API

### User Signup
```
POST /auth/signup
```
Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

---

### User Login
```
POST /auth/login
```
Login with existing user credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "isAdmin": false
  }
}
```

---

## Admin API

### Admin Login
```
POST /admin/login
```
Login as admin user.

**Request Body:**
```json
{
  "email": "admin@shopvolt.com",
  "password": "adminpassword"
}
```

**Response:**
```json
{
  "message": "Admin login successful",
  "admin": {
    "id": 1,
    "name": "Admin",
    "email": "admin@shopvolt.com",
    "isAdmin": true
  }
}
```

---

### Create Admin
```
POST /admin/create-admin
```
Create a new admin account.

**Request Body:**
```json
{
  "name": "Admin Name",
  "email": "admin@shopvolt.com",
  "password": "securepassword"
}
```

---

### Get All Products (Admin)
```
GET /admin/products
```
Get all products for admin management.

---

### Create Product (Admin)
```
POST /admin/products
```
Create a new product.

**Request Body:**
```json
{
  "name": "Product Name",
  "description": "Product description",
  "price": 99.99,
  "originalPrice": 129.99,
  "category": "Electronics",
  "brand": "BrandName",
  "image": "/product.jpg",
  "rating": 4.5,
  "reviews": 100,
  "discount": 23,
  "inStock": true,
  "isFeatured": false,
  "isTrending": false,
  "specs": ["Spec 1", "Spec 2"]
}
```

---

### Update Product (Admin)
```
PUT /admin/products/:id
```
Update an existing product.

---

### Delete Product (Admin)
```
DELETE /admin/products/:id
```
Delete a product.

---

## Products API

### Base URL
`http://localhost:3001/products`

### Endpoints

#### 1. Seed Products (Initialize Database)
```
POST /products/seed
```
Seeds the database with all 12 products from your frontend data.

**Response:**
```json
{
  "message": "Products seeded successfully",
  "count": 12
}
```

---

#### 2. Get All Products
```
GET /products
```
Returns all products in the database.

---

#### 3. Get Products by Category
```
GET /products?category=Electronics
```
Returns all products in a specific category.

**Query Parameters:**
- `category` (string): Category name (e.g., "Electronics", "Accessories")

---

#### 4. Get Product by ID
```
GET /products/:id
```
Returns a single product by its ID.

**Example:** `GET /products/1`

---

#### 5. Get Featured Products
```
GET /products/featured
```
Returns all products marked as featured.

---

#### 6. Get Trending Products
```
GET /products/trending
```
Returns all products marked as trending.

---

#### 7. Search Products
```
GET /products/search?q=headphones
```
Search products by name, brand, category, or description.

**Query Parameters:**
- `q` (string): Search query

---

#### 8. Get Products by Price Range
```
GET /products/price-range?min=50&max=200
```
Returns products within a specific price range.

**Query Parameters:**
- `min` (number): Minimum price
- `max` (number): Maximum price

---

#### 9. Get All Categories
```
GET /products/categories
```
Returns all unique categories with product counts.

**Response:**
```json
[
  { "name": "Electronics", "count": 5 },
  { "name": "Accessories", "count": 7 }
]
```

---

#### 10. Get All Brands
```
GET /products/brands
```
Returns all unique brand names.

**Response:**
```json
["TechSound", "FitTech", "DeskPro", ...]
```

---

## How to Use

### 1. Start the Backend Server
```bash
cd backend/ShopVolt_Backend
npm install
npm run start:dev
```

### 2. Seed the Database
Make a POST request to seed the database:
```bash
curl -X POST http://localhost:3000/products/seed
```

Or use a tool like Postman, Insomnia, or Thunder Client.

### 3. Test the API
```bash
# Get all products
curl http://localhost:3000/products

# Get featured products
curl http://localhost:3000/products/featured

# Search products
curl http://localhost:3000/products/search?q=wireless
```

---

## Product Schema

Each product has the following fields:

```typescript
{
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  discount: number;
  inStock: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  description: string;
  specs: string[];
}
```

---

## Database Configuration

The backend uses PostgreSQL. Configure your database in `.env`:

```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=bakehouse_db
```

Or the defaults will be used:
- Host: localhost
- Port: 5432
- User: postgres
- Password: postgres
- Database: bakehouse_db
