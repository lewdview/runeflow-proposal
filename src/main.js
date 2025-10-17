import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scroll
const lenis = new Lenis({
  lerp: 0.08,
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  ScrollTrigger.update();
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Intersection Observer for reveal animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-inview');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all reveal elements
document.querySelectorAll('[data-reveal]').forEach((el) => {
  observer.observe(el);
});

// Scroll progress bar
const scrollProgress = document.querySelector('.scroll-progress');
let hasScrolled = false;
window.addEventListener('scroll', () => {
  const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = (window.scrollY / scrollTotal) * 100;
  scrollProgress.style.width = scrolled + '%';
  
  // Dismiss scroll reminder on any scroll
  if (!hasScrolled && window.scrollY > 50) {
    hasScrolled = true;
    const scrollReminder = document.getElementById('scrollReminder');
    if (scrollReminder) {
      gsap.to(scrollReminder, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.3,
      });
    }
  }
});

// Cursor follow effect
const cursorFollow = document.querySelector('.cursor-follow');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorFollow.style.left = mouseX - 15 + 'px';
  cursorFollow.style.top = mouseY - 15 + 'px';
});

// Interactive button hover effects (skip modal buttons)
function attachButtonHoverEffects() {
  document.querySelectorAll('.btn-primary, .btn-secondary').forEach((btn) => {
    // Skip if in modal or already has listener
    if (btn.closest('.modal-content') || btn.hasAttribute('data-hover-listener')) return;
    btn.setAttribute('data-hover-listener', 'true');
    
    btn.addEventListener('mouseenter', () => {
      if (cursorFollow) cursorFollow.classList.add('active');
    });

    btn.addEventListener('mouseleave', () => {
      if (cursorFollow) cursorFollow.classList.remove('active');
    });
  });
}

attachButtonHoverEffects();
// Re-attach after DOM changes
const mutationObserver = new MutationObserver(attachButtonHoverEffects);
mutationObserver.observe(document.body, { childList: true, subtree: true });

// Pricing toggle
document.querySelectorAll('.pricing-toggle').forEach((toggle) => {
  toggle.addEventListener('click', function () {
    const model = this.dataset.model;
    
    // Update active toggle
    document.querySelectorAll('.pricing-toggle').forEach((t) => t.classList.remove('active'));
    this.classList.add('active');
    
    // Update prices with animation
    document.querySelectorAll('[data-model]').forEach((el) => {
      if (el.dataset.model === model) {
        gsap.to(el, {
          opacity: 1,
          duration: 0.3,
          display: 'inline',
          onStart: () => {
            el.style.display = 'inline';
          },
        });
      } else {
        gsap.to(el, {
          opacity: 0,
          duration: 0.3,
          display: 'none',
        });
      }
    });
  });
});

// Parallax effect on hero
const heroSection = document.querySelector('.hero');
window.addEventListener('scroll', () => {
  if (window.scrollY < window.innerHeight) {
    const offset = window.scrollY * 0.5;
    heroSection.style.backgroundPosition = `center ${offset}px`;
  }
});

// Hero canvas animation with advanced WebGL-like effects
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Animated gradient background with multiple layers
let time = 0;
function animateCanvas() {
  time += 0.01;
  
  // Clear
  ctx.fillStyle = 'rgba(11, 15, 20, 0.95)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Layer 1: Main animated radial gradient (cyan)
  const gradient1 = ctx.createRadialGradient(
    canvas.width / 2 + Math.sin(time) * 100,
    canvas.height / 2 + Math.cos(time) * 100,
    0,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width
  );
  gradient1.addColorStop(0, `rgba(125, 249, 255, ${0.08 + Math.sin(time) * 0.02})`);
  gradient1.addColorStop(0.5, 'rgba(125, 249, 255, 0.02)');
  gradient1.addColorStop(1, 'rgba(11, 15, 20, 0)');
  
  ctx.fillStyle = gradient1;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Layer 2: Secondary radial gradient (fuchsia)
  const gradient2 = ctx.createRadialGradient(
    canvas.width * 0.25 + Math.sin(time * 0.7) * 150,
    canvas.height * 0.75 + Math.cos(time * 0.5) * 150,
    0,
    canvas.width * 0.25,
    canvas.height * 0.75,
    400
  );
  gradient2.addColorStop(0, `rgba(255, 102, 196, ${0.06 + Math.cos(time * 1.5) * 0.02})`);
  gradient2.addColorStop(1, 'rgba(255, 102, 196, 0)');
  
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = gradient2;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  
  // Layer 3: Tertiary gradient (lime)
  const gradient3 = ctx.createRadialGradient(
    canvas.width * 0.75 + Math.cos(time * 0.6) * 120,
    canvas.height * 0.25 + Math.sin(time * 0.8) * 120,
    0,
    canvas.width * 0.75,
    canvas.height * 0.25,
    350
  );
  gradient3.addColorStop(0, `rgba(168, 255, 118, ${0.04 + Math.sin(time * 0.9) * 0.02})`);
  gradient3.addColorStop(1, 'rgba(168, 255, 118, 0)');
  
  ctx.globalAlpha = 0.5;
  ctx.fillStyle = gradient3;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 1;
  
  // Add subtle noise texture effect
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;
  
  for (let i = 0; i < data.length; i += 4) {
    const noise = Math.random() * 3;
    data[i] += noise;
    data[i + 1] += noise;
    data[i + 2] += noise;
  }
  
  ctx.putImageData(imageData, 0, 0);
  
  requestAnimationFrame(animateCanvas);
}

animateCanvas();

// ============================================================================
// MODAL SYSTEM
// ============================================================================

window.showServiceModal = function(serviceName) {
  const details = {
    'LSRS': {
      title: 'Lead Scaling & Response System',
      description: 'Automate inbound lead response, qualification, and CRM synchronization across multiple channels.',
      features: ['Multichannel intake', 'Auto-responder & booking links', 'Follow-up sequencing', 'CRM integration', 'Analytics dashboard'],
      pricing: { nonBaked: '$1,800 (one-time)', baked: '$3,200 setup + $450/mo' }
    },
    'CMS': {
      title: 'Content Marketing System',
      description: 'Auto-generate, schedule, and publish content at scale.',
      features: ['Multiplatform publishing', 'AI-assisted video creation', 'Brand tone control', 'Calendar automation', 'Analytics dashboard'],
      pricing: { nonBaked: '$1,800 (one-time)', baked: '$3,500 setup + $500/mo' }
    },
    'FSGS': {
      title: 'Full Stack Growth System',
      description: 'Complete unified growth engine combining lead generation and content marketing.',
      features: ['Shared data pipelines', 'Unified system', 'Reporting automation', 'Team training', 'Enterprise support'],
      pricing: { nonBaked: '$2,800 (one-time)', baked: '$5,500 setup + $800/mo' }
    }
  };

  const service = details[serviceName];
  if (!service) return;

  let modal = document.getElementById('service-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'service-modal';
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">×</button>
      <h2>${service.title}</h2>
      <p style="color: var(--ink-1); margin-bottom: var(--space-6);">${service.description}</p>
      <h3>Key Features</h3>
      <ul style="list-style: none; padding: 0;">
        ${service.features.map(f => `<li>✓ ${f}</li>`).join('')}
      </ul>
      <div style="margin-top: var(--space-8); padding: var(--space-6); background: rgba(125, 249, 255, 0.05); border-radius: var(--radius-md);">
        <p><strong>Non-Baked:</strong> ${service.pricing.nonBaked}</p>
        <p><strong>Baked:</strong> ${service.pricing.baked}</p>
      </div>
      <button class="btn-primary" style="width: 100%; margin-top: var(--space-8);" id="contact-from-modal">Get Started</button>
    </div>
  `;
  document.body.appendChild(modal);
  
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 200);
  });
  modal.querySelector('#contact-from-modal').addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => {
      modal.remove();
      window.showContactModal();
    }, 200);
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 200);
    }
  });
};

window.showContactModal = function() {
  let modal = document.getElementById('contact-modal');
  if (modal) modal.remove();

  modal = document.createElement('div');
  modal.id = 'contact-modal';
  modal.className = 'modal-overlay active';
  modal.innerHTML = `
    <div class="modal-content">
      <button class="modal-close">×</button>
      <h2>Let's Build Your Growth Engine</h2>
      <div style="display: grid; gap: var(--space-6);">
        <div>
          <h4><span style="font-size: 1.5rem; margin-right: 0.5rem;">ᚳ</span> Email</h4>
          <a href="mailto:webhalla@proton.me">webhalla@proton.me</a>
          <p style="color: var(--ink-2); font-size: var(--font-sm);">We respond within 24 hours.</p>
        </div>
        <div>
          <h4><span style="font-size: 1.5rem; margin-right: 0.5rem;">ᛏ</span> Phone</h4>
          <a href="tel:+15204272131">+1 (520) 427-2131</a>
          <p style="color: var(--ink-2); font-size: var(--font-sm);">Schedule a discovery call.</p>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  modal.querySelector('.modal-close').addEventListener('click', () => {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 200);
  });
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      setTimeout(() => modal.remove(), 200);
    }
  });
};

// Attach listeners on DOM ready
function initializeModals() {
  document.querySelectorAll('button').forEach(btn => {
    const text = btn.textContent.trim();
    
    if (text === 'View Details' && !btn.hasAttribute('data-modal-listener')) {
      btn.setAttribute('data-modal-listener', 'true');
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const card = this.closest('.card');
        const title = card.querySelector('h3').textContent;
        const service = title.includes('LSRS') ? 'LSRS' : title.includes('CMS') ? 'CMS' : 'FSGS';
        window.showServiceModal(service);
      });
    }
    
    if ((text.includes('Get Started') || text === 'Get in Touch' || text === 'Explore Systems') && !btn.hasAttribute('data-modal-listener')) {
      btn.setAttribute('data-modal-listener', 'true');
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        window.showContactModal();
      });
    }
    
    if (text === 'Learn More' && !btn.hasAttribute('data-modal-listener')) {
      btn.setAttribute('data-modal-listener', 'true');
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
      });
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeModals);
} else {
  initializeModals();
}

// Prevent cursor circle from interfering
function disableCursorFollowForModals(modal) {
  const cursorFollow = document.querySelector('.cursor-follow');
  modal.addEventListener('mouseenter', () => {
    if (cursorFollow) cursorFollow.style.display = 'none';
  });
  modal.addEventListener('mouseleave', () => {
    if (cursorFollow) cursorFollow.style.display = 'block';
  });
}

// Add styles for modal
const style = document.createElement('style');
style.textContent = `
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(5px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    animation: fadeIn 0.3s ease-out;
    pointer-events: auto;
  }

  .modal-content {
    position: relative;
    background: linear-gradient(135deg, rgba(17, 23, 34, 0.95) 0%, rgba(11, 15, 20, 0.95) 100%);
    border: 1px solid rgba(125, 249, 255, 0.2);
    border-radius: 16px;
    padding: 40px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), 0 0 60px rgba(125, 249, 255, 0.1);
    animation: slideUp 0.4s ease-out;
    pointer-events: auto !important;
  }

  .modal-close {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    border: none;
    background: rgba(125, 249, 255, 0.1);
    color: var(--accent-1);
    font-size: 28px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    z-index: 10000;
    padding: 0;
    line-height: 1;
  }

  .modal-close:hover {
    background: rgba(125, 249, 255, 0.2);
    transform: rotate(90deg);
  }
  
  .modal-close:focus {
    outline: none;
  }
  
  .modal-content button,
  .modal-content a {
    pointer-events: auto;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;document.head.appendChild(style);

// Smooth anchor scrolling
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        lenis.scrollTo(target, {
          duration: 1.5,
        });
      }
    }
  });
});

// Add stagger to timeline items
gsap.utils.toArray('.timeline-item').forEach((el, i) => {
  gsap.to(el, {
    scrollTrigger: {
      trigger: el,
      start: 'top center+=100',
      toggleActions: 'play none none none',
    },
    opacity: 1,
    y: 0,
    duration: 0.6,
    delay: i * 0.1,
  });
});

// Nav active state on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.style.color = 'var(--accent-1)';
    } else {
      link.style.color = 'var(--ink-1)';
    }
  });
});

// Mobile menu toggle (if needed)
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
}

// Reduce motion support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (prefersReducedMotion) {
  gsap.globalTimeline.timeScale(0);
}

// Button ripple effect
document.querySelectorAll('.btn-primary, .btn-secondary').forEach((btn) => {
  btn.addEventListener('click', function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.width = '0';
    ripple.style.height = '0';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.pointerEvents = 'none';

    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);

    gsap.to(ripple, {
      width: 300,
      height: 300,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      onComplete: () => {
        ripple.remove();
      },
    });
  });
});

// Service card tilt effect (subtle)
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * 5;
    const rotateY = (x - 0.5) * 5;

    gsap.to(this, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  });

  card.addEventListener('mouseleave', () => {
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.3,
    });
  });
});

console.log('✓ RuneFlow redesigned loaded with Lenis smooth scroll and GSAP animations');
