// Typing animation for "Hi, I'm Akanksha 👋"
const heroText = document.querySelector('.hero-section h2');
const textToType = "Hi, I'm Akanksha ! ";
const waveEmoji = "👋";
let heroIndex = 0;

function typeHeroText() {
  if (heroIndex < textToType.length) {
    heroText.textContent = textToType.slice(0, heroIndex + 1);
    heroIndex++;
    setTimeout(typeHeroText, 160);
  } else {
    heroText.textContent = textToType + waveEmoji;
  }
}

// Sections that require scroll-triggered heading typing
const sections = [
  {
    id: 'skills',
    text: '- SKILLS -',
    speed: 120,
    played: false,
    element: null
  },
  {
    id: 'experience',
    text: '- EXPERIENCE -',
    speed: 120,
    played: false,
    element: null
  },
  {
    id: 'projects',
    text: '- PROJECTS -',
    speed: 120,
    played: false,
    element: null
  },
  {
    id: 'recommendations',
    text: ' - TESTIMONIALS -',
    speed: 100,
    played: false,
    element: null
  }
];

function typeSectionText(section) {
  let index = 0;
  section.element.textContent = '';

  function type() {
    if (index < section.text.length) {
      section.element.textContent += section.text.charAt(index);
      index++;
      setTimeout(type, section.speed);
    }
  }

  type();
}

function setupScrollAnimations() {
  sections.forEach(section => {
    section.element = document.querySelector(`#${section.id} h2`);
    if (section.element) {
      section.element.textContent = '';
    } else {
      console.warn(`Missing <h2> for section: #${section.id}`);
    }
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        sections.forEach(section => {
          if (entry.target.id === section.id && !section.played && section.element) {
            typeSectionText(section);
            section.played = true;
          }
        });
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -150px 0px'
  });

  sections.forEach(section => {
    const sectionElement = document.getElementById(section.id);
    if (sectionElement) {
      observer.observe(sectionElement);
    }
  });
}

window.addEventListener('load', () => {
  if (heroText) heroText.textContent = '';
  typeHeroText();
  setupScrollAnimations();
});

window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const heroTextDiv = document.querySelector('.hero-section .text');
    if (heroTextDiv) heroTextDiv.classList.add('visible');
  }, 500);
});

// Fallback to catch any missed sections
const checkElements = setInterval(() => {
  const projectsElement = document.querySelector('#projects h2');
  if (projectsElement) {
    clearInterval(checkElements);
    if (!sections[2].played) {
      setupScrollAnimations();
    }
  }
}, 100);

// Headshot fade-in animation
window.addEventListener('DOMContentLoaded', () => {
  const headshotImg = document.querySelector('.headshot img');
  if (headshotImg) {
    headshotImg.style.opacity = 0;
    headshotImg.style.transform = 'translateX(-60px)';
    headshotImg.style.transition = 'opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 1.2s cubic-bezier(0.4,0,0.2,1)';
    setTimeout(() => {
      headshotImg.style.opacity = 1;
      headshotImg.style.transform = 'translateX(0)';
    }, 700);
  }
});

// Animate SKILLS logos on scroll
function animateSkillsLogosOnScroll() {
  const skillsSection = document.querySelector('.skills-section');
  const skillCells = document.querySelectorAll('.skills-section .cell');
  let played = false;

  if (!skillsSection) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !played) {
        skillCells.forEach((cell, idx) => {
          setTimeout(() => {
            cell.classList.add('animated-in');
          }, idx * 80);
        });
        played = true;
      }
    });
  }, {
    threshold: 0.22
  });

  observer.observe(skillsSection);
}

window.addEventListener('DOMContentLoaded', () => {
  animateSkillsLogosOnScroll();
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href').substring(1);
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
