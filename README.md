# ShopVolt - Full Stack E-Commerce Application

A modern, full-stack e-commerce application built with Next.js, NestJS, and PostgreSQL.

## 🚀 Quick Start

**Get started in 5 minutes!** Follow the [Quick Start Guide](./QUICK_START.md)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Documentation](#documentation)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### User Features
- 🔐 User authentication (signup/login)
- 🛍️ Browse products from database
- 🔍 Search and filter products
- 📊 Sort by price, rating, featured
- 💝 Add to wishlist
- 🛒 Shopping cart
- 📱 Responsive design
- ⭐ Product ratings and reviews
- 🏷️ Category and brand filtering
- 💰 Price range filtering

### Admin Features
- 🔑 Admin authentication
- 📦 Product management (CRUD)
- 📊 View all products
- ➕ Add new products
- ✏️ Edit existing products
- 🗑️ Delete products
- 🏷️ Manage categories and brands
- 🎯 Set featured/trending products

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** JavaScript
- **Styling:** Tailwind CSS
- **UI Components:** Custom components + shadcn/ui
- **State Management:** React Context API
- **HTTP Client:** Fetch API

### Backend
- **Framework:** NestJS
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** bcrypt for password hashing
- **Validation:** class-validator

### Database
- **PostgreSQL** - Relational database for products and users

## 📁 Project Structure

```
shopvolt/
├── backend/
│   └── ShopVolt_Backend/
│       ├── src/
│       │   ├── admin/          # Admin module
│       │   ├── auth/           # Authentication module
│       │   ├── products/       # Products module
│       │   └── main.ts         # Application entry
│       ├── .env                # Environment variables
│       └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/               # Next.js pages
│   │   ├── components/        # React components
│   │   ├── contexts/          # Context providers
│   │   ├── hooks/             # Custom hooks
│   │   └── lib/               # Utilities and API
│   ├── .env.local             # Frontend environment
│   └── package.json
├── QUICK_START.md             # 5-minute setup guide
├── SETUP_INSTRUCTIONS.md      # Detailed setup guide
├── INTEGRATION_SUMMARY.md     # Integration details
├── INTEGRATION_CHECKLIST.md   # Testing checklist
└── README.md                  # This file
```

## 📚 Documentation

- **[Quick Start Guide](./QUICK_START.md)** - Get started in 5 minutes
- **[Setup Instructions](./SETUP_INSTRUCTIONS.md)** - Detailed setup guide
- **[Integration Summary](./INTEGRATION_SUMMARY.md)** - What's been integrated
- **[Integration Checklist](./INTEGRATION_CHECKLIST.md)** - Testing checklist
- **[API Documentation](./backend/ShopVolt_Backend/API_ENDPOINTS.md)** - API endpoints reference

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd shopvolt
```

2. **Setup Database**
```bash
# Create PostgreSQL database
psql -U postgres
CREATE DATABASE shopvolt_db;
\q
```

3. **Setup Backend**
```bash
cd backend/ShopVolt_Backend
npm install
npm run start:dev
```

4. **Seed Database**
```bash
# In a new terminal
curl -X POST http://localhost:3001/products/seed
curl -X POST http://localhost:3001/admin/create-admin \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin","email":"admin@shopvolt.com","password":"admin123"}'
```

5. **Setup Frontend**
```bash
# In a new terminal
cd frontend
npm install
npm run dev
```

6. **Access the Application**
- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Admin Panel: http://localhost:3000/admin/login

### Default Credentials

**Admin Account:**
- Email: `admin@shopvolt.com`
- Password: `admin123`

## 🔌 API Endpoints

### Authentication
- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `GET /products/featured` - Get featured products
- `GET /products/trending` - Get trending products
- `GET /products/categories` - Get all categories
- `GET /products/search?q=query` - Search products

### Admin
- `POST /admin/login` - Admin login
- `GET /admin/products` - Get all products (admin)
- `POST /admin/products` - Create product
- `PUT /admin/products/:id` - Update product
- `DELETE /admin/products/:id` - Delete product

For complete API documentation, see [API_ENDPOINTS.md](./backend/ShopVolt_Backend/API_ENDPOINTS.md)

## 🖼️ Screenshots

### Homepage
- Hero section with call-to-action
- Featured products carousel
- Trending products section
- Category cards

### Shop Page
- Product grid/list view
- Advanced filtering (category, brand, price)
- Search functionality
- Sorting options

### Product Detail
- Large product images
- Detailed specifications
- Add to cart/wishlist
- Customer reviews

### Admin Panel
- Product management dashboard
- Add/Edit product forms
- Product list with actions
- Real-time updates

## 🧪 Testing

Run the complete testing checklist:
```bash
# Follow the checklist in INTEGRATION_CHECKLIST.md
```

## 🔒 Security

- Passwords hashed with bcrypt
- CORS enabled for frontend origin
- Environment variables for sensitive data
- Input validation on all forms
- SQL injection prevention via TypeORM

## 🚧 Known Limitations

- Order management not yet implemented
- No JWT authentication (simple auth only)
- Product images use URLs (no file upload)
- No pagination (loads all products)
- No email notifications

## 🔮 Future Enhancements

- [ ] Order management system
- [ ] JWT authentication with refresh tokens
- [ ] File upload for product images
- [ ] Pagination for product lists
- [ ] Email notifications
- [ ] Payment integration (Stripe/PayPal)
- [ ] Product reviews and ratings
- [ ] Advanced analytics dashboard
- [ ] Multi-language support
- [ ] Dark mode

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- NestJS team for the backend framework
- shadcn/ui for the beautiful components
- All contributors and supporters

## 📞 Support

For support, email support@shopvolt.com or open an issue in the repository.

## 🔗 Links

- [Documentation](./SETUP_INSTRUCTIONS.md)
- [API Reference](./backend/ShopVolt_Backend/API_ENDPOINTS.md)
- [Quick Start](./QUICK_START.md)
- [Testing Checklist](./INTEGRATION_CHECKLIST.md)

---

**Built with ❤️ using Next.js, NestJS, and PostgreSQL**
