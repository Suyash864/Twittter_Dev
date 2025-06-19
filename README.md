# Twitter-Like Backend System

This is a fully functional backend system built with **Node.js** and **Express.js**, designed to simulate the core features of Twitter. It supports tweeting (with optional images), nested comments, likes, retweeting (upcoming), hashtag extraction, user authentication, and more.

---

## Features

### Tweeting
- Users can post tweets with a **250-character limit**.
- Tweets can include **optional image uploads** (stored on AWS S3).
- Tweets support **automatic hashtag extraction** via regex.

### Commenting
- Authenticated users can comment on **tweets** and also on **comments** (nested replies).
- Comments are associated with both **tweets** and other **comments**.

### Liking
- Authenticated users can like or unlike:
  - Tweets
  - Comments

### Authentication
- **Signup** with name, email, and password.
- **Login** to receive a **JWT token**.
- Passwords are **hashed securely** with bcrypt.
- **JWT-based auth** used for all protected routes.

### Hashtag Management
- Hashtags are automatically extracted from tweet content.
- New hashtags are saved in DB, existing ones are linked to tweets.

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JWT, bcrypt
- **File Uploads**: AWS S3, Multer
- **Environment Config**: dotenv
- **Testing Tool**: Postman
- **Architecture**: MVC + Repository-Service Pattern

---

## API Endpoints (v1)

| Method | Endpoint            | Description                                |
|--------|---------------------|--------------------------------------------|
| POST   | `/signup`           | Register a new user                        |
| POST   | `/login`            | Login and receive JWT                      |
| POST   | `/tweets`           | Create a new tweet (optionally with image) |
| GET    | `/tweets/:id`       | Fetch a tweet with its comments            |
| POST   | `/comments`         | Add comment to a tweet or another comment  |
| POST   | `/likes/toggle`     | Toggle like/unlike for tweet or comment    |

---

## Key Concepts Implemented

- **MVC Pattern**: Separation of concerns  
- **Repository Pattern**: DB abstraction for cleaner services  
- **Mongoose Population**: Nested likes & comments  
- **Regex**: For hashtag extraction  
- **AWS S3 Integration**: Secure file storage for images  
- **JWT Auth**: Stateless authentication  
---
