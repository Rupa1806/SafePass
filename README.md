# SafePass
Real-time password security auditor with strength analysis, blacklist detection, entropy estimation, and compliance validation using HTML, CSS, and JavaScript.
# 🛡️ SafePass - Password Security Auditor

SafePass is a client-side web application that analyzes password strength in real time. It evaluates password complexity, checks compliance with common security requirements, detects weak or blacklisted passwords, and estimates password crack time using entropy-based calculations.

## ✨ Features

### 🔒 Real-Time Password Auditing
- Instant password strength evaluation
- Dynamic security score meter
- Strength classification:
  - Dangerous
  - Moderate
  - Secure

### ✅ Security Compliance Checklist
Validates whether a password contains:
- At least 12 characters
- Uppercase letters
- Lowercase letters
- Numbers
- Special characters

### ⚠️ Blacklisted Password Detection
- Detects commonly used weak passwords
- Displays a threat alert when a password appears in the blacklist

### 📊 Password Entropy Estimation
- Calculates estimated crack time
- Uses character pool analysis
- Applies penalties for predictable patterns

### 🧠 Pattern Recognition
Identifies:
- Sequential numbers (`12345`)
- Keyboard-style patterns (`qwe`, `qwerty`)
- Consecutive alphabet sequences (`abc`)
- Repeated characters (`aa`, `111`)

### ⚡ Performance Optimization
- Debounced password analysis
- Reduces unnecessary processing during typing
- Improves UI responsiveness

### 👁️ Password Visibility Toggle
- Show/Hide password functionality

## 🛠️ Technologies Used

| Technology | Purpose |
|------------|---------|
| HTML5 | Structure |
| CSS3 | Styling |
| JavaScript (ES6) | Password Analysis Logic |

## 📂 Project Structure

SafePass/
│
├── index.html
├── style.css
├── app.js
└── README.md

## 🚀 Getting Started

### Clone Repository

```bash
git clone https://github.com/Rupa1806/SafePass.git
```

### Open Project

Simply open:
index.html in any modern web browser.
No installation or backend server is required.


- ##Live demo:https://rupa1806.github.io/SafePass/

## 🔍 How It Works

1. User enters a password.
2. The application checks security requirements.
3. A security score is calculated.
4. The password is compared against a blacklist.
5. Entropy calculations estimate crack time.
6. Pattern analysis applies penalties for predictable passwords.
7. Results are displayed instantly.

## 🔒 Privacy

SafePass operates entirely in the browser.

- No data collection
- No external API calls
- No password storage
- No server-side processing

Your passwords never leave your device.

## 🎯 Learning Outcomes

This project demonstrates:

- DOM Manipulation
- Event Handling
- Debouncing
- Regular Expressions
- Password Security Concepts
- Entropy Calculations
- Responsive UI Design
- Modern JavaScript (ES6)

## 👩‍💻 Author

**Ravada Rupalatha**

Built using HTML, CSS, and JavaScript.
