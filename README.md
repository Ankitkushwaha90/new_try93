---
title: Django Blog Frontend (Next.js)
description: Next.js frontend for Django REST API to display structured blogs with search, images, subtopics, and dark mode.
---

# 🌐 Django Blog Frontend (Next.js)

A **Next.js frontend** to display blogs, structured subtopics, images, and descriptions from your **Django REST API**, with **search and dark mode** support.

---

## 🚀 Features

- **Fetches blog data automatically** from Django API with Axios.
- **Clean card UI** with images, title, description, subtopics, and hover effects.
- **Dark mode toggle** with system preference detection + local storage persistence.
- **Search bar** for real-time filtering of blogs.
- Fully **responsive, mobile-friendly**.
- Built with **TypeScript + Tailwind CSS**.
- Optimized for **Vercel/Netlify deployment**.

---

## 🛠️ Tech Stack

- **Framework**: Next.js (React)
- **Styling**: Tailwind CSS
- **HTTP**: Axios
- **Type Safety**: TypeScript
- **Image Handling**: Next/Image
- **Deployment**: Vercel, Netlify, VPS

---

## ⚙️ Setup

### 1️⃣ Clone and install

```bash
git clone https://github.com/yourusername/django-blog-frontend.git
cd django-blog-frontend
npm install
```
### 2️⃣ Configure environment variables
Create .env.local:

```ini
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```
Replace with your Django API URL for production.

### 3️⃣ Run locally
```bash
npm run dev
```
Access at http://localhost:3000.

### 🖼️ Screenshots
- Home Page with search, dark mode toggle, and blog cards.

- Responsive on mobile and desktop.

- Blog Cards show images, title, descriptions, created date, and subtopics.

### 🔗 API Integration
The frontend fetches from your Django API endpoint:

```bash
GET /api/blogs/
```
Expected response:

```json
[
  {
    "id": 1,
    "title": "Blog Title",
    "description": "Short summary",
    "thumbnail": "http://localhost:8000/media/blog_thumbnails/example.jpg",
    "description_image": null,
    "image": "http://localhost:8000/media/blog_images/example.jpg",
    "slug": "blog-title",
    "created_at": "2025-06-29T10:00:00Z",
    "subtopics": [
      { "id": 1, "title": "Subtopic 1" },
      { "id": 2, "title": "Subtopic 2" }
    ]
  }
]
```
### 🌌 Customization Ideas
✅ Add pagination or infinite scroll with SWR/React Query.
✅ Integrate NextAuth for authentication if needed.
✅ Add a blog details page using dynamic routing (/blog/[slug]).
✅ Use react-markdown for rich blog content rendering.
✅ Optimize images with Next/Image advanced settings.

#✅ Deployment
You can deploy easily to:

- Vercel (recommended)

- Netlify

- Custom VPS (DigitalOcean, AWS, Linode)

Ensure your Django backend is running and NEXT_PUBLIC_API_URL points to your API.

### 🤝 Contributing
Contributions are welcome:

- Improve UI/UX.

- Add detailed blog pages.

- Add categories, tags, or filter systems.

- Add skeleton loaders or transitions for enhanced experience.

### 🛡️ License
MIT License.

### 💡 Need Help?
If you need:
✅ Example package.json
✅ Tailwind config best practices
✅ Blog details page example
✅ SEO optimization (next/head) snippets
✅ Django DRF API setup instructions

let me know and I will prepare them for your learning and deployment workflow.
