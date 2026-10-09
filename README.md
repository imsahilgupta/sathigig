# 🇳🇵 SathiGig

> **Connect. Collaborate. Earn — Made for Nepal.**

SathiGig is a Nepal-focused freelance marketplace that connects skilled freelancers with clients, startups, businesses, and organizations. Freelancers can showcase their skills, create gigs, apply for jobs, and manage projects, while clients can post jobs, hire talent, communicate, and make secure payments in Nepalese Rupees (NPR).

## ✨ Features

* 🔐 Secure authentication with JWT
* 👥 Freelancer, Client, and Admin roles
* 💼 Job posting and job search
* 📩 Proposal and hiring system
* 🛍️ Fixed-price freelance gigs
* 👤 Professional freelancer profiles
* 📁 Portfolio and file uploads
* 💬 Real-time messaging
* 📊 Freelancer and client dashboards
* 📌 Project and milestone management
* 💳 NPR-based local payment support
* ⭐ Ratings and reviews
* 🔔 Real-time notifications
* 🛡️ User verification and dispute management
* 🤖 AI-powered proposal and skill tools
* 📱 Fully responsive design
* 🌙 Dark mode

## 🧰 Tech Stack

**Frontend**

* Next.js
* React
* TypeScript
* Tailwind CSS
* Shadcn/UI

**Backend**

* Node.js
* Express.js
* MongoDB
* Mongoose

**Other Technologies**

* JWT and bcrypt
* Socket.IO
* Cloudinary
* eSewa and Khalti
* Vercel
* Render or Railway

## 📂 Project Structure

```text
sathigig/
├── client/          # Next.js frontend
├── server/          # Express backend
├── docs/            # Documentation
├── README.md
└── package.json
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/imsahilgupta/sathigig.git
cd sathigig
```

### 2. Install dependencies

```bash
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```

### 3. Configure environment variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/sathigig
JWT_SECRET=your_secure_secret
CLIENT_URL=http://localhost:3000

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run the application

Open two terminals.

**Frontend:**

```bash
cd client
npm run dev
```

**Backend:**

```bash
cd server
npm run dev
```

The application will be available at:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

## 🗺️ Roadmap

* [ ] User authentication
* [ ] Role-based access control
* [ ] Freelancer profiles
* [ ] Job marketplace
* [ ] Proposal system
* [ ] Gig marketplace
* [ ] Real-time messaging
* [ ] Local payment integration
* [ ] Ratings and reviews
* [ ] AI-powered tools
* [ ] Mobile application

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Sahil Gupta**

* GitHub: https://github.com/imsahilgupta
* LinkedIn: https://www.linkedin.com/in/iamsahil2000/

---

<p align="center">
  <strong>Built for Nepal’s Freelancers and Digital Future 🇳🇵</strong>
</p>
