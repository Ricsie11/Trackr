# 💰 Trackr - Premium Expense Tracker

**Master Your Money with Style**

Trackr is a modern, beautifully designed expense tracking application that helps you take control of your finances. Built with cutting-edge web technologies, Trackr offers a premium user experience with real-time insights, dynamic visualizations, and an intuitive interface.

---

## 🎯 Purpose

The purpose of Trackr is to provide individuals with a **simple yet powerful tool** to:

- **Track daily expenses and income** in real-time
- **Visualize financial data** through interactive charts and summaries
- **Gain insights** into spending patterns across different timeframes (daily, weekly, monthly, yearly)
- **Make informed financial decisions** with comprehensive financial summaries and analytics

Whether you're budgeting for the month, tracking business expenses, or simply trying to understand where your money goes, Trackr makes financial management effortless and engaging.

---

## ✨ Features

### 🏠 **Dashboard Overview**

- **Real-time Financial Summary**: View income, expenses, and balance at a glance
- **Timeframe Filtering**: Switch between today, week, month, year, and total views
- **Personalized Greeting**: Custom welcome message using your profile nickname or first name

### 📊 **Data Visualization**

- **Interactive Charts**: Powered by Recharts for dynamic data visualization
- **Spending Analytics**: Visual breakdown of your financial patterns
- **Trend Analysis**: Track your financial health over time

### 💳 **Transaction Management**

- **Quick Logging**: Fast expense and income entry with dedicated quick-add buttons
- **Full CRUD Operations**: Create, read, update, and delete transactions
- **Transaction History**: Comprehensive list of all financial activities
- **Search & Filter**: Easily find specific transactions (coming soon)

### 👤 **Profile Settings**

- **Custom Profile**: Set your nickname and personal information
- **Profile Picture Upload**: Personalize your account with a profile photo
- **Secure Authentication**: Protected routes with JWT-based authentication

### 🎨 **Premium UI/UX**

- **Glassmorphism Design**: Modern, elegant interface with glass-effect cards
- **Smooth Animations**: Powered by Framer Motion for fluid interactions
- **Responsive Layout**: Seamless experience on desktop, tablet, and mobile
- **Dark Mode Optimized**: Eye-friendly interface designed for extended use

---

## 🛠️ Tech Stack

### Frontend

- **React 19.2.0** - Modern UI library
- **Vite 7.3.1** - Lightning-fast build tool
- **Tailwind CSS 4.1.18** - Utility-first CSS framework
- **Framer Motion 12.34.0** - Animation library
- **Recharts 3.7.0** - Charting library for data visualization
- **React Router DOM 7.13.0** - Client-side routing
- **Axios 1.13.5** - HTTP client for API requests
- **Lucide React** - Beautiful icon library

### Backend (API)

- **Django REST Framework** - Robust backend API
- **JWT Authentication** - Secure token-based authentication

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- Backend API running (see backend setup instructions)

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd Trackr-Frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**
   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Update the `.env` file with your backend API URL:
     ```
     VITE_API_URL=https://your-backend-api-url.com/api/v1.0
     ```
   - For local development, use:
     ```
     VITE_API_URL=http://localhost:8000/api/v1.0
     ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

---

## 📖 How to Use

### 1. **Create an Account**

- Click **Sign Up** on the landing page
- Fill in your details (username, email, password, first name, last name)
- Submit to create your account

### 2. **Log In**

- Use your credentials to log in
- You'll be redirected to your personalized dashboard

### 3. **Add Your First Transaction**

- Use the **Fast Logging** panel on the right side
- Click **Add Expense** or **Add Income**
- Fill in the transaction details:
  - **Title**: Description of the transaction
  - **Amount**: Dollar amount
  - **Date**: When the transaction occurred
  - **Category**: Type of expense/income
  - **Description** (optional): Additional notes
- Click **Save** to record the transaction

### 4. **View Your Financial Summary**

- The top of the dashboard shows your **Income**, **Expense**, and **Balance**
- Use the **timeframe toggle** (Today, Week, Month, Year, Total) to switch views
- Summaries automatically update based on your selected timeframe

### 5. **Analyze Your Spending**

- Scroll to the **Charts Section** to view visual analytics
- Charts display spending patterns and trends
- Gain insights into your financial habits

### 6. **Manage Transactions**

- View all transactions in the **Transaction List**
- Click the **Edit** icon to modify a transaction
- Click the **Delete** icon to remove a transaction (with confirmation)
- Search and filter transactions (feature coming soon)

### 7. **Update Your Profile**

- Click your profile icon in the header
- Navigate to **Settings**
- Update your nickname, profile picture, or other details
- Save changes to update your profile

---

## 📁 Project Structure

```
Trackr-Frontend/
├── dist/                    # Production build output
├── public/                  # Static assets
├── src/
│   ├── assets/             # Images and media files
│   ├── components/
│   │   ├── auth/           # Login and signup components
│   │   ├── common/         # Reusable UI components (GlassCard, etc.)
│   │   ├── dashboard/      # Dashboard-specific components
│   │   └── layout/         # Header and Footer
│   ├── context/            # React Context (AuthContext)
│   ├── App.jsx             # Main app component with routing
│   ├── index.css           # Global styles and Tailwind config
│   └── main.jsx            # App entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧪 Available Scripts

- **`npm run dev`** - Start the development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview the production build locally
- **`npm run lint`** - Run ESLint to check code quality

---

## 🔐 Authentication

Trackr uses **JWT (JSON Web Token)** authentication to secure your financial data. When you log in:

1. Your credentials are verified by the backend
2. A JWT access token is issued and stored in `localStorage`
3. All API requests include this token in the `Authorization` header
4. Protected routes ensure only authenticated users can access the dashboard

---

## 📊 API Integration

The frontend communicates with the Django REST API for all data operations:

- **`/auth/login/`** - User authentication
- **`/auth/register/`** - User registration
- **`/summary/`** - Financial summaries (daily, weekly, monthly, yearly, total)
- **`/expenses/`** - Expense CRUD operations
- **`/incomes/`** - Income CRUD operations
- **`/profile/`** - User profile management

---

## 🎨 Design Philosophy

Trackr is built with a **premium-first design philosophy**:

- **Visual Excellence**: Modern gradients, smooth animations, and glassmorphism effects
- **User-Centric**: Intuitive navigation and clear information hierarchy
- **Performance**: Optimized for fast load times and smooth interactions
- **Accessibility**: Readable typography and high-contrast UI elements

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 💡 Future Enhancements

- **Budget Goals**: Set monthly budgets and track progress
- **Recurring Transactions**: Automate regular expenses/income
- **Export Data**: Download financial reports as CSV/PDF
- **Multi-Currency Support**: Track finances in different currencies
- **Data Insights**: AI-powered spending recommendations

---

**Built with ❤️ by the Trackr Team**
