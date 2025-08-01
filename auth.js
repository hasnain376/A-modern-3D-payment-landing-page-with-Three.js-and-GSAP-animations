// Authentication Pages JavaScript
// Initialize GSAP
gsap.registerPlugin(ScrollTrigger);

// Global variables for Three.js
let scene, camera, renderer, cardGroup, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Initialize the application
function init() {
    // Hide loading screen immediately
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }

    // Ensure content is visible
    ensureContentVisible();
    
    // Initialize Three.js scene (optional - won't break if container not found)
    initThreeJS();
    
    // Initialize GSAP animations
    initGSAPAnimations();
    
    // Initialize form functionality
    initFormFunctionality();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Start animation loop (only if Three.js is initialized)
    if (renderer) {
        animate();
    }
}

// Ensure content is visible
function ensureContentVisible() {
    const elements = [
        '.auth-form-container',
        '.auth-preview',
        '.auth-header',
        '.form-group',
        '.auth-button',
        '.social-btn'
    ];
    
    elements.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.style.opacity = '1';
            element.style.visibility = 'visible';
            element.style.display = element.tagName === 'BUTTON' ? 'flex' : 'block';
        }
    });
}

// Three.js Scene Setup for Auth Pages
function initThreeJS() {
    const container = document.getElementById('login-card-3d') || document.getElementById('signup-card-3d');
    if (!container) {
        console.log('3D container not found, skipping Three.js initialization');
        return;
    }
    
    // Scene setup
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0a0a0a, 1, 1000);
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    const pointLight = new THREE.PointLight(0x6366f1, 1, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);
    
    // Create credit card group
    cardGroup = new THREE.Group();
    scene.add(cardGroup);
    
    // Create floating cards
    createAuthCards();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Mouse movement for card interaction
    document.addEventListener('mousemove', onDocumentMouseMove);
}

// Create floating credit cards for auth pages
function createAuthCards() {
    const cardGeometry = new THREE.BoxGeometry(2, 1.2, 0.1);
    const cardMaterials = [
        new THREE.MeshPhongMaterial({ 
            color: 0x667eea,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        }),
        new THREE.MeshPhongMaterial({ 
            color: 0xf093fb,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        }),
        new THREE.MeshPhongMaterial({ 
            color: 0x4facfe,
            shininess: 100,
            transparent: true,
            opacity: 0.9
        })
    ];
    
    for (let i = 0; i < 3; i++) {
        const card = new THREE.Mesh(cardGeometry, cardMaterials[i]);
        card.position.set(
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 3,
            (Math.random() - 0.5) * 2
        );
        card.rotation.set(
            Math.random() * Math.PI * 0.5,
            Math.random() * Math.PI * 0.5,
            Math.random() * Math.PI * 0.5
        );
        card.userData = {
            originalPosition: card.position.clone(),
            originalRotation: card.rotation.clone(),
            speed: Math.random() * 0.02 + 0.01
        };
        cardGroup.add(card);
    }
}

// GSAP Animations for Auth Pages
function initGSAPAnimations() {
    // Make sure elements are visible first
    gsap.set('.auth-form-container', { opacity: 1, y: 0, rotationX: 0 });
    gsap.set('.auth-preview', { opacity: 1, x: 0, rotationY: 0 });
    gsap.set('.auth-header', { opacity: 1, y: 0 });
    gsap.set('.form-group', { opacity: 1, x: 0 });
    gsap.set('.auth-button', { opacity: 1, scale: 1 });
    gsap.set('.social-btn', { opacity: 1, y: 0 });
    gsap.set('.floating-card', { opacity: 0.3, scale: 1, rotation: 0 });
    
    // Simple entrance animations
    gsap.fromTo('.auth-form-container',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
    
    gsap.fromTo('.auth-preview',
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );
    
    gsap.fromTo('.form-group',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.5, ease: "power2.out" }
    );
    
    gsap.fromTo('.auth-button',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.6, delay: 1, ease: "back.out(1.7)" }
    );
}

// Form functionality
function initFormFunctionality() {
    // Password toggle functionality
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.previousElementSibling.previousElementSibling;
            if (input.type === 'password') {
                input.type = 'text';
                this.classList.remove('bx-show');
                this.classList.add('bx-hide');
            } else {
                input.type = 'password';
                this.classList.remove('bx-hide');
                this.classList.add('bx-show');
            }
        });
    });
    
    // Form submission
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    // Input focus effects
    const inputs = document.querySelectorAll('.auth-form input');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            gsap.to(this, {
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        input.addEventListener('blur', function() {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Handle login form submission
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const remember = document.getElementById('remember').checked;
    
    // Show loading state
    const button = e.target.querySelector('.auth-button');
    const originalText = button.innerHTML;
    
    gsap.to(button, {
        scale: 0.95,
        duration: 0.2
    });
    
    button.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Signing In...';
    
    // Simulate API call
    setTimeout(() => {
        // Success animation
        gsap.to(button, {
            scale: 1,
            duration: 0.2
        });
        
        button.innerHTML = '<i class="bx bx-check"></i> Success!';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Redirect after success
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
        
    }, 2000);
}

// Handle signup form submission
function handleSignup(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const terms = document.getElementById('terms').checked;
    const newsletter = document.getElementById('newsletter').checked;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    // Validate terms
    if (!terms) {
        showError('Please accept the Terms & Conditions');
        return;
    }
    
    // Show loading state
    const button = e.target.querySelector('.auth-button');
    const originalText = button.innerHTML;
    
    gsap.to(button, {
        scale: 0.95,
        duration: 0.2
    });
    
    button.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Creating Account...';
    
    // Simulate API call
    setTimeout(() => {
        // Success animation
        gsap.to(button, {
            scale: 1,
            duration: 0.2
        });
        
        button.innerHTML = '<i class="bx bx-check"></i> Account Created!';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Redirect after success
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 1500);
        
    }, 2000);
}

// Show error message
function showError(message) {
    // Create error element
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(errorDiv);
    
    // Animate in
    gsap.to(errorDiv, {
        x: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
    });
    
    // Remove after 3 seconds
    setTimeout(() => {
        gsap.to(errorDiv, {
            x: '100%',
            duration: 0.5,
            ease: "back.in(1.7)",
            onComplete: () => {
                document.body.removeChild(errorDiv);
            }
        });
    }, 3000);
}

// Interactive elements
function initInteractiveElements() {
    // Social button hover effects
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {
            gsap.to(button, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        button.addEventListener('mouseleave', () => {
            gsap.to(button, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Back link hover effect
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('mouseenter', () => {
            gsap.to(backLink, {
                x: -5,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        backLink.addEventListener('mouseleave', () => {
            gsap.to(backLink, {
                x: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    }
}

// Mouse movement handler
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

// Window resize handler
function onWindowResize() {
    const container = document.getElementById('login-card-3d') || document.getElementById('signup-card-3d');
    if (!container || !camera || !renderer) return;
    
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    if (cardGroup) {
        // Rotate card group based on mouse position
        cardGroup.rotation.x += (mouseY - cardGroup.rotation.x) * 0.05;
        cardGroup.rotation.y += (mouseX - cardGroup.rotation.y) * 0.05;
        
        // Animate individual cards
        cardGroup.children.forEach((card, index) => {
            const time = Date.now() * card.userData.speed;
            card.position.y = card.userData.originalPosition.y + Math.sin(time + index) * 0.3;
            card.rotation.z = card.userData.originalRotation.z + Math.sin(time) * 0.05;
        });
    }
    
    // Render scene only if Three.js is properly initialized
    if (renderer && scene && camera) {
        renderer.render(scene, camera);
    }
}

// Parallax effect for floating elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = parseFloat(element.dataset.speed) || 0.5;
        const yPos = -(scrolled * speed);
        gsap.set(element, {
            y: yPos
        });
    });
});

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Immediate fallback - hide loading screen right away
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
});

// Fallback to hide loading screen after 2 seconds if something goes wrong
setTimeout(() => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && loadingScreen.style.display !== 'none') {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}, 2000);

// Add some interactive effects for form elements
document.addEventListener('mousemove', (e) => {
    const formContainer = document.querySelector('.auth-form-container');
    if (!formContainer) return;
    
    const rect = formContainer.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / window.innerWidth;
    const deltaY = (e.clientY - centerY) / window.innerHeight;
    
    gsap.to(formContainer, {
        rotationY: deltaX * 5,
        rotationX: -deltaY * 5,
        duration: 0.5,
        ease: "power2.out"
    });
});

// ULTIMATE FALLBACK - Force hide loading screen and show content
(function() {
    function hideLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.visibility = 'hidden';
            loadingScreen.style.display = 'none';
        }
    }
    
    function showContent() {
        const elements = [
            '.auth-form-container',
            '.auth-preview',
            '.auth-header',
            '.form-group',
            '.auth-button',
            '.social-btn'
        ];
        
        elements.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.opacity = '1';
                element.style.visibility = 'visible';
                element.style.display = element.tagName === 'BUTTON' ? 'flex' : 'block';
            }
        });
    }
    
    // Try multiple times to hide the loading screen and show content
    hideLoading();
    showContent();
    setTimeout(() => { hideLoading(); showContent(); }, 100);
    setTimeout(() => { hideLoading(); showContent(); }, 500);
    setTimeout(() => { hideLoading(); showContent(); }, 1000);
    setTimeout(() => { hideLoading(); showContent(); }, 2000);
})(); 