# Pixio - AI-Powered Image Processing Platform

<div align="center">


**Transform your images with cutting-edge AI technology**

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://image-generator-ai-client-mtws.vercel.app/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js)](https://nodejs.org/)



</div>

---

## 📖 What is Pixio?

**Pixio**  is a unified AI-powered image editing platform that brings clipdrops professional image APIs into a clean, credit-based SaaS experience — designed for creators who care about speed, design, and simplicity. <br/>
Professional AI image tools are powerful but fragmented, forcing users to jump between multiple tools, interfaces, and workflows. Pixio solves this by bringing seven advanced AI image processing tools into a single, seamless platform with a consistent UI and predictable credit-based usage, including Cleanup for object removal, Image Upscaling for quality enhancement, Background Removal, Text Removal, Background Replacement, Text-to-Image generation, and Uncrop for intelligent image expansion. This allows complex image editing and generation tasks to be completed in seconds with consistent, professional results.

### 🎯 Problems We Solve

| Problem | Pixio Solution |
|---------|----------------|
| **Expensive Software** | Pay-per-use credit system - no subscriptions |
| **Time-Consuming Edits** | AI processes images in 5-15 seconds |
| **Technical Expertise Required** | Simple upload → process → download workflow |
| **Multiple Tools Needed** | 7 AI tools in one unified platform |
| **Desktop-Only Solutions** | Works on any device with a browser |

---

## ✨ Features

### 🛠️ AI Tools Suite

<table>
<tr>
<td width="50%">

#### Core Tools
- 🎨 **Image Cleanup** - Remove unwanted objects
- 🔍 **Image Upscaling** - 2x/4x resolution enhancement
- ✂️ **Remove Background** - Instant background removal
- 📝 **Remove Text** - Erase watermarks & text

</td>
<td width="50%">

#### Advanced Tools
- 🖼️ **Replace Background** - AI-generated backgrounds
- 🎭 **Text to Image** - Generate images from prompts
- 📐 **Uncrop** - Extend images beyond borders

</td>
</tr>
</table>

### 🔐 Authentication & Security
- Email/Password authentication with JWT
- Google OAuth 2.0 integration (Firebase)
- Email verification system (Nodemailer)
- Protected routes with token validation

### 💳 Payment Integration
- Razorpay payment gateway integration
- Credit-based system (1 credits per tool for now)
- Multiple pricing tiers (Basic/Advanced/Business)
- Secure payment verification

### 📱 User Experience
- Responsive dark-themed UI
- Real-time credit balance tracking
- Download processed images instantly
- Comprehensive documentation

---

## 🎨 UI Evolution

<table>
  <tr>
    <td align="center">
      <strong>Old UI (Initial Version)</strong><br>
      <em>Classic layout with basic functionality</em><br><br>
      <img src="https://github.com/user-attachments/assets/baaf2f4e-0e64-48f2-8c5b-112b944e5fe6" width="500">
    </td>
    <td align="center">
      <strong>New UI (Current Version)</strong><br>
      <em>Modern, sleek design with enhanced user experience</em><br><br>
      <img src="https://github.com/user-attachments/assets/57aabd91-90e0-4ae7-8934-de95cc6c4bdd" width="500">
    </td>
  </tr>
</table>


**Key Improvements:**
- ✨ Glassmorphism effects & blur backgrounds
- 🎯 Improved navigation with fixed sidebar
- 🌙 Enhanced dark mode aesthetics
- 📊 Better visual hierarchy
- 🎭 Smooth animations & transitions
- 📱 Fully responsive across all devices

---



### Backend Features & Handling

#### 🔒 Authentication Flow
```javascript
1. User registers → Email verification sent (Nodemailer)
2. User verifies email → Account activated
3. User logs in → JWT token generated (7-day expiry)
4. Token stored in localStorage & sent with each request
5. Middleware validates token on protected routes
```

#### 💰 Payment Processing
```javascript
1. User selects plan → Razorpay order created
2. Payment popup → User completes payment
3. Signature verification → Payment validated
4. Credits added to user account → Transaction recorded
5. Real-time credit balance update
```

#### 🖼️ Image Processing Pipeline
```javascript
1. User uploads image → File validation (size, format)
2. Credit check → Deduct credits if sufficient
3. API call to Clipdrop → Image processing
4. Response received → Save result temporarily
5. User downloads image → Cleanup temporary files
```

#### 🛡️ Security Measures
- Password hashing with bcrypt (10 salt rounds)
- JWT token verification on every request
- Email validation (blocks disposable emails)
- Rate limiting on API endpoints
- Secure payment signature verification
- Input sanitization & validation
- CORS configuration
- Environment variable protection

#### 📊 Database Schema
```javascript
User Schema:
├── name, email, password (hashed)
├── googleId, photoURL (OAuth)
├── isEmailVerified, emailVerificationToken
├── creditBalance (default: 5)
└── createdAt, lastLogin

Transaction Schema:
├── userId, plan, amount
├── credits, payment status
├── razorpayOrderId, razorpayPaymentId
└── createdAt (indexed for date queries)
```

---

## 🚀 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=for-the-badge&logo=tailwind-css)
![React Router](https://img.shields.io/badge/React_Router-6.x-CA4245?style=for-the-badge&logo=react-router)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=for-the-badge&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6.x-47A248?style=for-the-badge&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=json-web-tokens)

### Services & APIs
![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase)
![Razorpay](https://img.shields.io/badge/Razorpay-Payment-0C2451?style=for-the-badge)
![Clipdrop](https://img.shields.io/badge/Clipdrop-AI_API-FF6B6B?style=for-the-badge)
![Nodemailer](https://img.shields.io/badge/Nodemailer-Email-0F9D58?style=for-the-badge)

---


## ⚠️ Current Limitations

### 🐌 Performance Issues

#### Backend Hosting (Render Free Tier)
- **Cold Start Delays**: 30-50 seconds on first request after inactivity
- **Response Times**: 2-5 seconds for API calls (vs <500ms on paid tier)
- **Spinning Down**: Server sleeps after 15 minutes of inactivity
- **Memory Limits**: 512MB RAM (may cause crashes on large files)

**Impact on User Experience:**
```
First visit after idle → 50s wait time
Image processing → 5-15s total (API + backend processing)
Subsequent requests → 2-3s response time
```

**Workaround Solutions:**
- Implement loading states with progress indicators
- Add "server waking up" messages
- Cache common requests
- Consider upgrading to paid tier for production

### 🧪 Test Mode Restrictions

#### Credit Limitations (TEST MODE)
```javascript
// Current Settings (Backend .env)
// Users get only 1 credit per purchase
// Only 1 purchase allowed per day
```

**Why These Restrictions Exist:**
1. **Prevent Abuse**: Razorpay test mode allows unlimited test transactions
2. **Cost Control**: Clipdrop API charges per image processed
3. **Beta Testing**: Limiting usage while testing payment flow
4. **Data Validation**: Ensuring transaction logic works correctly

**Current User Experience:**
- Free signup: 5 credits
- Purchase any plan: Get only 1 credit (regardless of plan)
- Daily limit: 1 purchase per 24 hours
- Credit costs: 1-5 credits per tool



## 🙏 Acknowledgments

- [Clipdrop API](https://clipdrop.co/apis) for AI image processing
- [Razorpay](https://razorpay.com/) for payment gateway
- [Firebase](https://firebase.google.com/) for authentication
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Render](https://render.com/) for backend hosting

---


