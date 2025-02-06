# 🎨 DrawFlow - A Collaborative Whiteboarding Tool

🚀 **DrawFlow** is an interactive whiteboarding tool inspired by Excalidraw. It enables real-time drawing, collaborative editing, and seamless state management. Whether you're brainstorming ideas, diagramming workflows, or sketching wireframes, DrawFlow provides a smooth and intuitive experience.  

---

## ✨ Features

✅ **Real-time Collaboration** - Multiple users can draw simultaneously.  
✅ **Shape Support** - Draw **circles, rectangles, lines, arrows, and freehand (pencil)**.  
✅ **Color & Background Customization** - Change shape colors and background.    
✅ **Save & Load Drawings** - Store and retrieve your work.  
✅ **Smooth UI/UX** - Built with performance and responsiveness in mind.  

---

## 🛠️ Tech Stack

- **Monorepo Architecture**: Managed with **Turborepo** 🏗️  
- **Backend**: **Node.js + Express.js** ⚡  
- **Real-time Collaboration**: Powered by **WebSockets** 🔄  
- **Frontend**: **Next.js + TypeScript** 🖥️  
- **Database**: **PostgreSQL + PrismaORM** 📊  

---

## 🚀 Getting Started

### 📌 Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL installed and running
- pnpm (for Turborepo)

### 📥 Installation

1. **Clone the repository**  
   ```sh
   git clone https://github.com/Rajput-vinay/drawFlow.git
   cd drawflow

2. **Install Dependencies**:
   ```bash
    pnpm install  

3. **Set Up Environment Variables: Create a .env file in the root directory and add the following**:
   ```bash
    PORT = 8000
    DATABASE_URL=your_postgresSql_database_url
    JWT_SECRET=your_jwt_secret
    NEXT_PUBLIC_API_URL = 'your next public api url'
    NEXT_PUBLIC_WS_URL = "your websocket api uri"
    
 4. **Start the Server**:
     ```bash
     pnpm dev

## License 📜
This project is licensed under the [MIT License](LICENSE).

## Contact 📬
For feedback or inquiries, feel free to reach out:

- **Email**: [vinayrajput2004vr@gmail.com](mailto:vinayrajput2004vr@gmail.com)
- **LinkedIn**: [Vinay Rajput](https://www.linkedin.com/in/vinay-rajput-984668227/)
