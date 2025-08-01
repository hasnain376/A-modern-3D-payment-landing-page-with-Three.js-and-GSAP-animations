// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Global variables
let scene, camera, renderer, cardGroup, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// Loading screen management
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.querySelector('.progress-bar');

// Initialize the application
function init() {
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
        progressBar.style.width = progress + '%';
    }, 100);

    // Initialize Three.js scene
    initThreeJS();
    
    // Initialize GSAP animations
    initGSAPAnimations();
    
    // Initialize particle effects
    initParticles();
    
    // Initialize interactive elements
    initInteractiveElements();
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Start animation loop
    animate();
}

// Three.js Scene Setup
function initThreeJS() {
    const container = document.getElementById('card-3d-container');
    
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
    
    // Create multiple floating cards
    createFloatingCards();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Mouse movement for card interaction
    document.addEventListener('mousemove', onDocumentMouseMove);
}

// Create floating credit cards
function createFloatingCards() {
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
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 2
        );
        card.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
        );
        card.userData = {
            originalPosition: card.position.clone(),
            originalRotation: card.rotation.clone(),
            speed: Math.random() * 0.02 + 0.01
        };
        cardGroup.add(card);
    }
}

// Particle system
function initParticles() {
    const particleCount = 100;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        particlePositions[i] = (Math.random() - 0.5) * 20;
        particlePositions[i + 1] = (Math.random() - 0.5) * 20;
        particlePositions[i + 2] = (Math.random() - 0.5) * 20;
        
        particleColors[i] = Math.random();
        particleColors[i + 1] = Math.random();
        particleColors[i + 2] = Math.random();
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6
    });
    
    particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
}

// GSAP Animations
function initGSAPAnimations() {
    // Text animations
    const animateTexts = document.querySelectorAll('.animate-text');
    
    animateTexts.forEach((text, index) => {
        gsap.fromTo(text, 
            {
                opacity: 0,
                y: 50,
                rotationX: -90
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1,
                delay: index * 0.2,
                ease: "power3.out"
            }
        );
    });
    
    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach((card, index) => {
        gsap.fromTo(card,
            {
                opacity: 0,
                y: 100,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: index * 0.2,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: card,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    });
    
    // Floating elements parallax
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        gsap.to(card, {
            y: -50,
            rotation: 360,
            duration: 3 + index,
            repeat: -1,
            ease: "power1.inOut",
            yoyo: true
        });
    });
    
    // Header animation
    gsap.fromTo('header',
        {
            y: -100,
            opacity: 0
        },
        {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        }
    );
}

// Interactive elements
function initInteractiveElements() {
    // CTA button hover effect
    const ctaButton = document.querySelector('.cta-button');
    
    ctaButton.addEventListener('mouseenter', () => {
        gsap.to(ctaButton, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    ctaButton.addEventListener('mouseleave', () => {
        gsap.to(ctaButton, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
    
    // Navigation links hover effect
    const navLinks = document.querySelectorAll('nav a');
    
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(link, {
                y: -2,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        link.addEventListener('mouseleave', () => {
            gsap.to(link, {
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const hamburgerMenu = document.querySelector('#menu-icon');
    const navLink = document.querySelector('#navLinks');
    let flag = 0;
    
    hamburgerMenu.addEventListener('click', (event) => {
        if (flag === 0) {
            gsap.to(navLink, {
                left: "0%",
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            });
            flag++;
        } else {
            gsap.to(navLink, {
                left: "-100%",
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            });
            flag--;
        }
    });
}

// Mouse movement handler
function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

// Window resize handler
function onWindowResize() {
    const container = document.getElementById('card-3d-container');
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate card group based on mouse position
    cardGroup.rotation.x += (mouseY - cardGroup.rotation.x) * 0.05;
    cardGroup.rotation.y += (mouseX - cardGroup.rotation.y) * 0.05;
    
    // Animate individual cards
    cardGroup.children.forEach((card, index) => {
        const time = Date.now() * card.userData.speed;
        card.position.y = card.userData.originalPosition.y + Math.sin(time + index) * 0.5;
        card.rotation.z = card.userData.originalRotation.z + Math.sin(time) * 0.1;
    });
    
    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
    }
    
    // Render scene
    renderer.render(scene, camera);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: { y: target, offsetY: 100 },
                ease: "power3.inOut"
            });
        }
    });
});

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

// Add some interactive effects
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.feature-card');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - cardCenterX) / window.innerWidth;
        const deltaY = (e.clientY - cardCenterY) / window.innerHeight;
        
        gsap.to(card, {
            rotationY: deltaX * 10,
            rotationX: -deltaY * 10,
            duration: 0.5,
            ease: "power2.out"
        });
    });
});

// Add scroll-triggered animations
ScrollTrigger.batch(".feature-card", {
    onEnter: (elements) => {
        gsap.fromTo(elements, 
            {
                opacity: 0,
                y: 50,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)"
            }
        );
    },
    onLeave: (elements) => {
        gsap.to(elements, {
            opacity: 0,
            y: -50,
            scale: 0.8,
            duration: 0.5
        });
    },
    onEnterBack: (elements) => {
        gsap.fromTo(elements,
            {
                opacity: 0,
                y: -50,
                scale: 0.8
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)"
            }
        );
    },
    onLeaveBack: (elements) => {
        gsap.to(elements, {
            opacity: 0,
            y: 50,
            scale: 0.8,
            duration: 0.5
        });
    }
});


