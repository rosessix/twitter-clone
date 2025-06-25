# DayDream.
![Image of DayDream](https://i.gyazo.com/5124c8ed0006b0bec4911ea3bfed4e6e.png)
**DayDream** is a fullstack social media platform inspired by X (formerly known as Twitter). This proect was developed as a learning experience to deepend my understanding of fullstack development, including frontend frameworks, backend architechture, API development, authentication and database integration.
DayDream is a social media, made with React, Express and a MySQL database.

# ✨ Overview
DayDream allows users to sign up, log in, and post short messages ("thoughts") visible on a central feed—similar to how X works. The goal of the project is not to replicate every feature of a modern social platform, but to understand how core concepts like authentication, session handling, data persistence, and UI state management come together in a production-like app.

## 🧰 Tech stack

### Frontend
* **Framework**: React
* **Styling**: Tailwind CSS, no UI library
* **Routing**: React Router DOM
* **State Management**: React Hooks and Context API for user auth and app-wide data sharing

**Key features**
* Responsive layout with TailwindCSS
* Login, Register and a authenticated feed page
* Protected routes using context-based authentication
* Minimalist user experience

Login Page UI Example:
![Login page](https://i.gyazo.com/f6d5d689ad9af9299b8f3f091c261491.png)


The main feature, of the page is the Feed page. The feed page is a mimic of X's feed, where people share their thoughts and beliefs, for others to see.
### Backend
* **Framework**: **Express** with **TypeScript**
* **Authentication**: JWT-based authentcation with custom middleware
* **Database**: **MySQL**
* **Security**: Passwords are hashed with bcrypt, tokens are verified via middleware on protected API calls
* **Data Handling**: RESTful API endpoints for login, registration, posting and fetching feed content

**Key learnings**
* Built custom middleware for authentication and route protection
* Developed modular route handling and controllers
* Learned to securely interact with a MySQL using paramterized queries
* Gained experience with CORS, a little session handling,  and .env based projects.


## 🚀 Features
* User Registration and Login
* JWT-based Authentication
* Create and view posts
* Real-time-like feed updates on refresh
* Simple and clean UI optimized for readability

## Images of the project
![Feed page](https://i.gyazo.com/5513ad4ed8062d67ae5a54c9112013c2.png)
![Registration form](https://i.gyazo.com/14a843a8d6161f381526ade0e16211d1.png)
![Landing page](https://i.gyazo.com/6f41fb548cfcfcac94c59feefceed43a.png)