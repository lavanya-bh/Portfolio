// Wait for DOM to be fully loaded
//document.addEventListener('DOMContentLoaded', function() {

  // Custom Cursor
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');

  if (cursorDot && cursorOutline) {
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      }
    });

    // Smooth cursor outline follow
    function animateCursor() {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      
      if (cursorOutline) {
        cursorOutline.style.left = `${outlineX}px`;
        cursorOutline.style.top = `${outlineY}px`;
      }
      
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .contact-card, .nav-links a, .mobile-link');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
    });
  }

  // Theme Toggle
const themeToggle = document.getElementById('themeToggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');

    if (document.body.classList.contains('dark-theme')) {
      localStorage.setItem('theme', 'dark');
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
      localStorage.setItem('theme', 'light');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  });

  // Load saved theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}

  // Mobile Menu Toggle
  const mobileMenuToggle = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
      }
    });
  }

  // Floating particles
  function createParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      const size = Math.random() * 6 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      const duration = Math.random() * 20 + 10;
      particle.style.animationDuration = `${duration}s`;
      
      const delay = Math.random() * 5;
      particle.style.animationDelay = `${delay}s`;
      
      const colors = ['#ffc0e3', '#ff9dd1', '#d4a5ff', '#b57edc'];
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      
      particlesContainer.appendChild(particle);
    }
  }

  // Particle styles
  const style = document.createElement('style');
  style.textContent = `
    .particle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.4;
      animation: float infinite ease-in-out;
      pointer-events: none;
    }
    
    @keyframes float {
      0%, 100% {
        transform: translateY(0) translateX(0);
        opacity: 0.4;
      }
      25% {
        transform: translateY(-100px) translateX(50px);
        opacity: 0.6;
      }
      50% {
        transform: translateY(-200px) translateX(-30px);
        opacity: 0.3;
      }
      75% {
        transform: translateY(-100px) translateX(-50px);
        opacity: 0.5;
      }
    }
  `;
  document.head.appendChild(style);

  createParticles();

  // Intersection Observer for fade-in
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = document.querySelector('nav').offsetHeight;
        const targetPosition = target.offsetTop - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Active nav link on scroll
  window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = '#9747ff';
      }
    });
  });

  // Navbar scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      nav.style.boxShadow = '0 4px 20px rgba(151, 71, 255, 0.15)';
    } else {
      nav.style.boxShadow = '0 2px 8px rgba(151, 71, 255, 0.1)';
    }
    
    lastScroll = currentScroll;
  });

  // Animate stats
  const animateStats = () => {
    const stats = document.querySelectorAll('.stat-num');
    stats.forEach(stat => {
      const target = parseFloat(stat.textContent);
      const isDecimal = stat.textContent.includes('.');
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.textContent = isDecimal ? target.toFixed(2) : target;
          clearInterval(timer);
        } else {
          stat.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
        }
      }, 30);
    });
  };

  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const heroSection = document.querySelector('#hero');
  if (heroSection) {
    heroObserver.observe(heroSection);
  }

  console.log('%c👋 Hi there! Thanks for checking out my portfolio!', 'color: #9747ff; font-size: 16px; font-weight: bold;');
  console.log('%cBuilt with 💜 by Lavanya Bhamidipati', 'color: #ff6bb5; font-size: 14px;');

//});
