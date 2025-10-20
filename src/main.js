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

// ============================================================================
// ONBOARDING GATE (Post-Payment Welcome)
// ============================================================================

window.showOnboardingModal = function() {
  const onboardingModal = document.getElementById('onboardingModal');
  if (!onboardingModal) return;
  
  // Show modal with animation
  onboardingModal.style.display = 'flex';
  onboardingModal.classList.add('active');
  
  // Set focus to modal for accessibility
  onboardingModal.focus();
  
  // Handle close button
  const closeBtn = onboardingModal.querySelector('.modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      onboardingModal.classList.remove('active');
      setTimeout(() => {
        onboardingModal.style.display = 'none';
      }, 200);
    });
  }
  
  // Handle backdrop click
  onboardingModal.addEventListener('click', (e) => {
    if (e.target === onboardingModal) {
      onboardingModal.classList.remove('active');
      setTimeout(() => {
        onboardingModal.style.display = 'none';
      }, 200);
    }
  });
  
  // Handle Start Onboarding button
  const startBtn = onboardingModal.querySelector('#startOnboardingBtn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      // Mark as seen in localStorage
      localStorage.setItem('rf_onboarding_seen', 'true');
      // Transition to step 1 (placeholder for now)
      console.log('Onboarding started - transitioning to step 1');
      // Future: Show checklist or requirements form here
    });
  }
  
  // Handle View Receipt button
  const receiptBtn = onboardingModal.querySelector('#viewReceiptBtn');
  if (receiptBtn) {
    receiptBtn.addEventListener('click', () => {
      // Placeholder for Stripe customer portal
      console.log('Redirecting to receipt / customer portal');
      // Future: Redirect to Stripe customer portal with session ID
    });
  }
};

window.initOnboardingGate = function() {
  // Check URL for onboarding=1 query param
  const params = new URLSearchParams(window.location.search);
  if (params.get('onboarding') === '1') {
    const sessionId = params.get('session_id');
    
    // Mark as seen
    localStorage.setItem('rf_onboarding_seen', 'true');
    
    if (sessionId) {
      console.log('Onboarding gate triggered with session:', sessionId);
      // Optional: Fetch session data from backend to confirm purchase
      // For MVP, just show the modal
    }
    
    // Show onboarding modal after a brief delay for UX
    setTimeout(() => {
      window.showOnboardingModal();
    }, 500);
  }
};

// ============================================================================
// STRIPE CHECKOUT
// ============================================================================

let stripe = null;

function initStripe() {
  // Wait for Stripe.js to load and ENV config to be available
  if (!window.Stripe || !window.ENV) return;
  
  if (!stripe) {
    stripe = window.Stripe(window.ENV.STRIPE_PUBLISHABLE_KEY);
  }
  return stripe;
}

window.initMVPCheckout = function() {
  const mvpBtn = document.getElementById('mvpCheckoutBtn');
  if (!mvpBtn) return;
  
  mvpBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    
    // Initialize Stripe if needed
    const stripeInstance = initStripe();
    if (!stripeInstance) {
      console.error('Stripe not initialized');
      return;
    }
    
    if (!window.ENV || !window.ENV.MVP_PRICE_ID) {
      console.error('MVP_PRICE_ID not configured in environment');
      // Fallback to contact modal
      window.showContactModal();
      return;
    }
    
    // Show loading state
    mvpBtn.disabled = true;
    mvpBtn.style.opacity = '0.6';
    const originalText = mvpBtn.textContent;
    mvpBtn.textContent = 'Redirecting to Stripe...';
    
    try {
      const result = await stripe.redirectToCheckout({
        lineItems: [{ price: window.ENV.MVP_PRICE_ID, quantity: 1 }],
        mode: 'payment',
        successUrl: `${window.location.origin}/?onboarding=1&session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/#pricing`,
      });
      
      if (result.error) {
        // Re-enable button on error
        mvpBtn.disabled = false;
        mvpBtn.style.opacity = '1';
        mvpBtn.textContent = originalText;
        
        // Show error toast
        const errorMsg = result.error.message || 'Unable to process checkout';
        console.error('Stripe error:', errorMsg);
        
        // Simple error notification
        const errorEl = document.createElement('div');
        errorEl.style.cssText = `
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgba(255, 102, 196, 0.1);
          border: 1px solid rgba(255, 102, 196, 0.3);
          border-radius: 8px;
          padding: 16px;
          color: var(--ink-1);
          font-size: 14px;
          max-width: 300px;
          z-index: 10000;
          animation: slideUp 0.4s ease-out;
        `;
        errorEl.textContent = errorMsg;
        document.body.appendChild(errorEl);
        
        setTimeout(() => {
          gsap.to(errorEl, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => errorEl.remove(),
          });
        }, 4000);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      mvpBtn.disabled = false;
      mvpBtn.style.opacity = '1';
      mvpBtn.textContent = originalText;
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
      <h2>Tell Us About Your Growth Goals</h2>
      <p style="color: var(--ink-1); margin-bottom: var(--space-6); font-size: var(--font-sm);">We'll review your details and reach out within 24 hours with a tailored solution.</p>
      <form id="growth-form" style="display: grid; gap: var(--space-5);">
        <div>
          <label for="email" style="display: block; margin-bottom: var(--space-2); font-weight: 600; color: var(--accent-1);">Email *</label>
          <input type="email" id="email" name="email" required placeholder="you@company.com" style="width: 100%; padding: var(--space-3); border: 1px solid rgba(125, 249, 255, 0.2); background: rgba(125, 249, 255, 0.02); border-radius: var(--radius-md); color: var(--ink-0); font-size: var(--font-base);" />
        </div>
        
        <div>
          <label for="company" style="display: block; margin-bottom: var(--space-2); font-weight: 600; color: var(--accent-1);">Company / Business Name *</label>
          <input type="text" id="company" name="company" required placeholder="Your company" style="width: 100%; padding: var(--space-3); border: 1px solid rgba(125, 249, 255, 0.2); background: rgba(125, 249, 255, 0.02); border-radius: var(--radius-md); color: var(--ink-0); font-size: var(--font-base);" />
        </div>
        
        <div>
          <label for="focus" style="display: block; margin-bottom: var(--space-2); font-weight: 600; color: var(--accent-1);">Primary Focus *</label>
          <select id="focus" name="focus" required style="width: 100%; padding: var(--space-3); border: 1px solid rgba(125, 249, 255, 0.2); background: rgba(125, 249, 255, 0.02); border-radius: var(--radius-md); color: var(--ink-0); font-size: var(--font-base);">
            <option value="">Select your primary focus</option>
            <option value="Lead Generation (LSRS)">Lead Generation & Response (LSRS)</option>
            <option value="Content Marketing (CMS)">Content Marketing System (CMS)</option>
            <option value="Full Stack (FSGS)">Full Stack Growth System (FSGS)</option>
            <option value="Custom Solution">Custom / Multiple Solutions</option>
          </select>
        </div>
        
        <div>
          <label for="current-challenge" style="display: block; margin-bottom: var(--space-2); font-weight: 600; color: var(--accent-1);">Your Biggest Challenge *</label>
          <textarea id="current-challenge" name="current-challenge" required placeholder="What's your biggest growth obstacle right now?" rows="4" style="width: 100%; padding: var(--space-3); border: 1px solid rgba(125, 249, 255, 0.2); background: rgba(125, 249, 255, 0.02); border-radius: var(--radius-md); color: var(--ink-0); font-size: var(--font-base); font-family: inherit; resize: vertical;"></textarea>
        </div>
        
        <button type="submit" class="btn-primary" style="width: 100%; margin-top: var(--space-4);" id="submit-growth-form">Send My Details</button>
        <p style="color: var(--ink-2); font-size: var(--font-xs); text-align: center; margin-top: var(--space-2);">We'll keep your information secure and respond promptly.</p>
      </form>
      <div id="form-status" style="display: none; text-align: center; padding: var(--space-6); background: rgba(168, 255, 118, 0.1); border-radius: var(--radius-md); border: 1px solid rgba(168, 255, 118, 0.3);">
        <p style="color: var(--accent-2); font-weight: 600; margin: 0;">✓ Thanks! We'll be in touch within 24 hours.</p>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  
  // Handle form submission
  const form = modal.querySelector('#growth-form');
  const formStatus = modal.querySelector('#form-status');
  const submitBtn = modal.querySelector('#submit-growth-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = modal.querySelector('#email').value;
    const company = modal.querySelector('#company').value;
    const focus = modal.querySelector('#focus').value;
    const challenge = modal.querySelector('#current-challenge').value;
    
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    submitBtn.textContent = 'Sending...';
    
    try {
      // Send to Formspree
      const response = await fetch('https://formspree.io/f/xblzbwzp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          company,
          focus,
          challenge,
          timestamp: new Date().toISOString()
        })
      });
      
      if (response.ok) {
        form.style.display = 'none';
        formStatus.style.display = 'block';
        setTimeout(() => {
          modal.classList.remove('active');
          setTimeout(() => modal.remove(), 200);
        }, 3000);
      } else {
        // Fallback: open email client
        const subject = `Growth System Inquiry - ${company}`;
        const body = `Email: ${email}\nCompany: ${company}\nPrimary Focus: ${focus}\nChallenge: ${challenge}`;
        window.location.href = `mailto:webhalla@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      }
    } catch (error) {
      // Fallback: open email client
      const subject = `Growth System Inquiry - ${company}`;
      const body = `Email: ${email}\nCompany: ${company}\nPrimary Focus: ${focus}\nChallenge: ${challenge}`;
      window.location.href = `mailto:webhalla@proton.me?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  });
  
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
  // Initialize MVP checkout
  window.initMVPCheckout();
  
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

function initializeApp() {
  initializeModals();
  window.initOnboardingGate();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
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
