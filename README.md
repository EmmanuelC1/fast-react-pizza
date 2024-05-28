# Fast React Pizza Co.

Fast React Pizza Co. is a React website that allows users to browse a pizza menu and place orders. Built for learning purposes with **React, React Router, Redux ToolKit, and  TailwindCSS**.

# Built With
[![Built With](https://skillicons.dev/icons?i=js,html,react,redux,tailwind,vite,netlify,vscode&perline=4)](https://skillicons.dev)

# Getting Started

### Prerequisites

- npm
  ```
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
2. Install all NPM Packages
   ```
   npm install
   ```
3. Run Application
   ```
   npm run dev
   ```
5. Open browser at <http://localhost:5173>

# User Stories

- [x] Users can order **one or more pizzas frmo a menu**
- [x] Requires **no user accounts** and no login: users just input their names before using the app
- [x] The pizza menu cann change, so it should be **loaded from an API**
- [x] Users cann add multiple pizzas to a **cart** before ordering
- [x] Ordering requires just the **user's name, phone number, and address**
- [x] If possible, **GPS location** should also be provided, to make delivery easier
- [x] User's can **mark their order as "priority"** for an additional **20%** of the cart price
- [x] Orders are made by **sending a POST request** with the order data (user data + selected pizzas) to the API
- [x] Payments are made on delivery, so **no payment processing** is necessary in the app
- [x] Each order will get a **unique ID** that should be displayed, so the **user can later look up their order** based on the ID
- [x] Users should be able to mark their order as "priority" order **even after it has been placed**, and update the price accordingly   

# License

© Copyright by [Jonas Schmedtmann](https://twitter.com/jonasschmedtman). Use for learning or your portfolio. Don't use to teach. Don't claim as your own.

Project is from the course [_The Ultimate React Course 2024: React, Next.js, Redux & More_](https://www.udemy.com/course/the-ultimate-react-course/) by Jonas Schmedtmann
