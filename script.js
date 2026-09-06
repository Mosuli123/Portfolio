// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  highlightNav();
});

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== ACTIVE NAV HIGHLIGHT =====
function highlightNav() {
  const sections = document.querySelectorAll('section[id]');
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.timeline-card, .project-card, .skill-group, .edu-card, .cert-card, .leadership-card, .fht-card, .about-grid, .approach-step, .stat-card').forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });
});

// ===== PROJECT FILTERS =====
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.classList.toggle('hidden', !show);
    });
  });
});

// ===== CV DOWNLOAD =====
function downloadCV() {
  const a = document.createElement('a');
  a.href = 'Comprehensive CV.pdf';
  a.download = 'Mosuli_Ntiyane_CV.pdf';
  a.click();
}

// ===== CERTIFICATE MODAL =====
function openCertModal(el) {
  const certFile = el.dataset.cert;
  document.getElementById('certFrame').src = certFile;
  document.getElementById('certModal').classList.add('open');
}

function closeCertModal() {
  document.getElementById('certModal').classList.remove('open');
  document.getElementById('certFrame').src = '';
}

document.getElementById('certModal')?.addEventListener('click', function(e) {
  if (e.target === this) closeCertModal();
});

// ===== CONTACT FORM =====
async function handleContactForm(e) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitBtn');
  const result = document.getElementById('formResult');

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  result.className = 'form-result';
  result.textContent = '';

  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (json.success) {
      result.className = 'form-result success';
      result.textContent = "Message sent! I'll get back to you soon.";
      form.reset();
    } else {
      throw new Error(json.message);
    }
  } catch (err) {
    result.className = 'form-result error';
    result.textContent = 'Something went wrong. Please try again or email me directly.';
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
  }
}
