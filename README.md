
# **Car Expense Tracker**

<img src="https://raw.githubusercontent.com/ismaelmarot/car-expense-tracker/main/app-icon.png" alt="CarET Icon" width="150">

An application to track car expenses, designed to simplify the management of multiple vehicles' expenses and categorize them. It also includes advanced features like generating PDF reports and displaying statistics through interactive charts.

&nbsp;&nbsp;&nbsp;&nbsp;

![Version](https://img.shields.io/badge/version-2.0.1-orange?style=for-the-badge)
&nbsp;&nbsp;&nbsp;&nbsp;
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://github.com/ismaelmarot/car-expense-trcker/blob/HEAD/LICENSE)
&nbsp;&nbsp;&nbsp;&nbsp;
![Last Commit](https://img.shields.io/github/last-commit/ismaelmarot/car-expense-tracker?style=for-the-badge)
&nbsp;&nbsp;&nbsp;&nbsp;

### Frontend Stack
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Styled Components](https://img.shields.io/badge/Styled--Components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![Electron](https://img.shields.io/badge/Electron-30-47848F?style=for-the-badge&logo=electron&logoColor=white)

### Backend Stack
![Node.js](https://img.shields.io/badge/Node.js-22-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

<br/>

----------------------------------------

## **Download**

[![Download for macOS](https://img.shields.io/badge/Download-macOS-000000?style=for-the-badge&logo=apple)](https://github.com/ismaelmarot/car-expense-tracker/releases/download/v2.0.1/CarET-2.0.1-arm64.dmg)

[![Download for Windows](https://img.shields.io/badge/Download-Windows-0078D4?style=for-the-badge&logo=windows)](https://github.com/ismaelmarot/car-expense-tracker/releases/download/v2.0.1/CarET%20Setup%202.0.1.exe)

<br/>

----------------------------------------

## **Table of Contents**
1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Screenshots](#screenshots)
6. [Author](#author)
7. [Screenshots](#screenshots)
8. [License](#license)

<br/>

----------------------------------------

## **Features**
- Record and edit expenses associated with vehicles.
- Support for multiple vehicles.
- Categorize expenses (fuel, maintenance, insurance, etc.).
- Generate PDF and CSV reports with selectable filters.
- Display statistics with interactive charts.
- Track service intervals (km and dates).
- VTV and extinguisher date tracking.
- Spanish and English language support.

<br/>

----------------------------------------

## **Technologies Used**
### **Frontend**
- **React**: Framework for building the user interface.
- **Material UI**: UI component library with modern design.
- **Styled Components**: CSS-in-JS styling for components.

### **Backend**
- **Express**: Minimalist framework for Node.js.

### **Database**
- **SQLite**: Lightweight and efficient local database.

### **Other Tools**
- **Electron**: Desktop application framework.
- **Yarn**: Dependency manager.

<br/>

----------------------------------------

## **Installation**

### **Desktop App (Recommended)**
Simply download the installer for your platform:
- **macOS:** [CarET-2.0.1-arm64.dmg](https://github.com/ismaelmarot/car-expense-tracker/releases/download/v2.0.1/CarET-2.0.1-arm64.dmg)
- **Windows:** [CarET Setup 2.0.1.exe](https://github.com/ismaelmarot/car-expense-tracker/releases/download/v2.0.1/CarET%20Setup%202.0.1.exe)

> **macOS:** If you see _"CarET.app is damaged and can't be opened"_, run this command in Terminal after installing:
> ```bash
> xattr -cr /Applications/CarET.app
> ```

### **Development**
Follow these steps to clone and install the project:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ismaelmarot/car-expense-tracker.git
   cd car-expense-tracker
   ```

2. **Install dependencies** for the frontend and backend:
   ```bash
   cd car-expense-tracker-frontend
   yarn install
   cd ../car-expense-tracker-backend
   yarn install
   ```

3. **Configure environment variables**:
   - Create a `.env` file in the backend folder with the necessary configurations, for example:
     ```env
     PORT=4000
     DATABASE_URL=car_expenses.sqlite
     ```

<br/>

----------------------------------------

## **Usage**

### **Start the Backend**
1. Navigate to the backend folder:
   ```bash
   cd car-expense-tracker-backend
   ```
2. Start the server:
   ```bash
   yarn start
   ```

### **Start the Frontend**
1. Navigate to the frontend folder:
   ```bash
   cd car-expense-tracker-frontend
   ```
2. Start the application:
   ```bash
   yarn start
   ```

### **Environments**
- For development, use the commands above.
- Configure specific scripts if you need to run the project in production mode.

<br/>

----------------------------------------

## **Screenshots**
*(Here you can include images of your application. If you wish, you can add screenshots of the user interface or views of the charts and reports generated by your app).*

<br/>

-----------------------------------------

<a id="screenshots"></a>
## 📸 [Screenshots](#-table-of-content)

>### 📱 Mobile

<p align="center">
  <img src="assets/mob-v2-01.png" width="230" height="500"/>
  <img src="assets/mob-v2-02.png" width="230" height="500"/>
  <img src="assets/mob-v2-03.png" width="230" height="500"/>
  <img src="assets/mob-v2-04.png" width="230" height="500"/>
</p>

<details>
   <summary><strong>See more...</strong></summary>
   <br>
   <p align="center">
     <img src="assets/mob-v2-05.png" width="230" height="500"/>
     <img src="assets/mob-v2-06.png" width="230" height="500"/>
     <img src="assets/mob-v2-07.png" width="230" height="500"/>
     <img src="assets/mob-v2-08.png" width="230" height="500"/>
   </p>
</details>

<br>

----------------------------------------

>### 🖥️ Desktop

<p align="center">
  <img src="assets/desk-v2-01.png" width="600" height="350"/>
  <img src="assets/desk-v2-02.png" width="600" height="350"/>
  <img src="assets/desk-v2-03.png" width="600" height="350"/>
</p>

<details>
   <summary><strong>See more...</strong></summary>
   <br>
   <p align="center">
     <img src="assets/desk-v2-04.png" width="600" height="350"/>
     <img src="assets/desk-v2-05.png" width="600" height="350"/>
     <img src="assets/desk-v2-06.png" width="600" height="350"/>
   </p>
   <p align="center">
     <img src="assets/desk-v2-07.png" width="600" height="350"/>
     <img src="assets/desk-v2-08.png" width="600" height="350"/>
   </p>
</details>

<br>

----------------------------------------

## **License**
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

<br/>

----------------------------------------

## 📬 [CONTACT](#-table-of-content)

Open to collaboration, feedback, and new opportunities.

[![GitHub](https://img.shields.io/badge/GitHub-ismaelmarot-181717?style=for-the-badge&logo=github)](https://github.com/ismaelmarot)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-ismael--marot-0077B5?style=for-the-badge&logo=linkedin)](https://linkedin.com/in/ismael-marot)
[![Portfolio](https://img.shields.io/badge/Portfolio-ishmarot-FF5722?style=for-the-badge&logo=google-chrome)](https://ismaelmarot.github.io)


