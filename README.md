# 🚀 3D Payment Landing Page

A modern, responsive payment landing page built with Three.js, GSAP animations, and beautiful glassmorphism design. Features interactive 3D elements, smooth animations, and dedicated login/signup pages.

![3D Payment Landing Page](https://img.shields.io/badge/Status-Complete-brightgreen)
![Three.js](https://img.shields.io/badge/Three.js-3D%20Graphics-blue)
![GSAP](https://img.shields.io/badge/GSAP-Animation-orange)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20Friendly-green)

## ✨ Features

### 🎨 **Visual Design**
- **3D Graphics**: Interactive Three.js scenes with floating credit cards
- **Glassmorphism**: Modern glass-like UI elements with blur effects
- **Gradient Design**: Beautiful color gradients throughout the interface
- **Particle Effects**: Dynamic particle systems for enhanced visual appeal
- **Responsive Layout**: Fully responsive design for all device sizes

### 🎭 **Animations & Interactions**
- **GSAP Animations**: Smooth entrance animations and scroll-triggered effects
- **Hover Effects**: Interactive hover animations on buttons and cards
- **Parallax Scrolling**: Dynamic parallax effects for floating elements
- **Mouse Tracking**: 3D elements respond to mouse movement
- **Loading Screens**: Professional loading animations with progress bars

### 🔐 **Authentication Pages**
- **Login Page**: Clean login form with email/password fields
- **Signup Page**: Comprehensive registration form with validation
- **Social Login**: Google and Facebook login options
- **Form Validation**: Client-side validation with error messages
- **Password Toggle**: Show/hide password functionality

### 📱 **Responsive Features**
- **Mobile-First Design**: Optimized for mobile devices
- **Tablet Support**: Responsive layout for tablet screens
- **Desktop Experience**: Enhanced experience for larger screens
- **Touch Interactions**: Touch-friendly interface elements

## 🛠️ Technologies Used

### **Frontend Technologies**
- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with CSS Grid, Flexbox, and custom properties
- **JavaScript (ES6+)**: Modern JavaScript with async/await and modules
- **Three.js**: 3D graphics and WebGL rendering
- **GSAP**: Professional animation library
- **ScrollTrigger**: Scroll-based animation triggers

### **Design & UI**
- **Glassmorphism**: Modern glass-like design effects
- **CSS Gradients**: Beautiful color transitions
- **Custom Properties**: CSS variables for consistent theming
- **Flexbox & Grid**: Modern CSS layout systems
- **Media Queries**: Responsive design breakpoints

### **Libraries & Dependencies**
- **Three.js CDN**: 3D graphics library
- **GSAP CDN**: Animation library
- **Boxicons**: Icon library for UI elements
- **Google Fonts**: Montserrat font family

## 📦 Installation

### **Prerequisites**
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### **Quick Start**
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/3d-payment-landing-page.git
   cd 3d-payment-landing-page
   ```

2. **Open in browser**
   - Simply open `index.html` in your web browser
   - Or use a local server for development:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

3. **Access the application**
   - Main page: `http://localhost:8000`
   - Login page: `http://localhost:8000/login.html`
   - Signup page: `http://localhost:8000/signup.html`

## 🎯 Usage

### **Main Landing Page**
- Navigate through the hero section with 3D credit card animations
- Explore the features section with interactive cards
- Click "Login" or "Sign Up" buttons to access authentication pages
- Experience smooth scroll animations and parallax effects

### **Login Page**
- Enter email and password
- Toggle password visibility
- Use "Remember Me" option
- Access social login options
- Navigate back to main page

### **Signup Page**
- Fill in registration form (name, email, phone, password)
- Confirm password matching
- Accept terms and conditions
- Subscribe to newsletter (optional)
- Complete registration process

## 📁 Project Structure

```
3d-payment-landing-page/
├── index.html              # Main landing page
├── login.html              # Login page
├── signup.html             # Signup page
├── style.css               # Main stylesheet
├── auth.css                # Authentication pages styles
├── script.js               # Main JavaScript functionality
├── auth.js                 # Authentication pages JavaScript
├── README.md               # Project documentation
└── assets/                 # Additional assets (if any)
    ├── images/
    └── icons/
```

## 🎨 Customization

### **Colors & Themes**
Edit CSS custom properties in `style.css`:
```css
:root {
  --background-color: #0a0a0a;
  --primary-color: #fff;
  --accent-color: #6366f1;
  --gradient-1: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-2: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --gradient-3: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}
```

### **3D Elements**
Modify Three.js scenes in `script.js` and `auth.js`:
- Adjust card colors and materials
- Change particle system parameters
- Modify animation speeds and effects

### **Animations**
Customize GSAP animations:
- Edit timing and easing functions
- Modify scroll trigger parameters
- Adjust hover effect intensities

## 🌟 Key Features Explained

### **Three.js Integration**
- **Floating Cards**: 3D credit cards that rotate and float
- **Particle Systems**: Dynamic particle effects for background
- **Mouse Interaction**: Cards respond to mouse movement
- **Responsive 3D**: 3D scenes adapt to different screen sizes

### **GSAP Animations**
- **Entrance Animations**: Smooth page load animations
- **Scroll Triggers**: Animations triggered by scroll position
- **Hover Effects**: Interactive button and card animations
- **Form Animations**: Smooth form element transitions

### **Responsive Design**
- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: Optimized for mobile, tablet, and desktop
- **Touch-Friendly**: Large touch targets for mobile users
- **Performance**: Optimized animations for mobile devices

## 🚀 Performance Optimizations

- **CDN Resources**: External libraries loaded via CDN
- **Efficient Animations**: Optimized GSAP animations
- **Responsive Images**: Optimized for different screen sizes
- **Minimal Dependencies**: Only essential libraries included

## 🔧 Browser Support

- **Chrome**: 80+
- **Firefox**: 75+
- **Safari**: 13+
- **Edge**: 80+

## 📱 Mobile Support

- **iOS Safari**: 13+
- **Chrome Mobile**: 80+
- **Samsung Internet**: 10+
- **Firefox Mobile**: 68+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js**: 3D graphics library
- **GSAP**: Animation library
- **Boxicons**: Icon library
- **Google Fonts**: Typography
- **Glassmorphism Design**: Modern UI trend

## 📞 Support

If you have any questions or need help with the project:

- **Issues**: Create an issue on GitHub
- **Email**: your.email@example.com
- **Documentation**: Check the code comments for detailed explanations

---

**⭐ Star this repository if you found it helpful!**

**🔄 Fork it to create your own version!**

**💬 Share your feedback and suggestions!**

---

*Built with ❤️ using modern web technologies* 