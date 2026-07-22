// =========================================================
// MOBILE NAV TOGGLE
// =========================================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// ACTIVE NAV LINK ON SCROLL
// =========================================================
const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav-link');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.dataset.section === id);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

sections.forEach(section => navObserver.observe(section));

// =========================================================
// SCROLL REVEAL
// =========================================================
const revealTargets = document.querySelectorAll(
  '.about-grid, .skills-grid, .project-card, .cert-card, .edu-table-wrap, .resume-cta, .contact-grid'
);
revealTargets.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// =========================================================
// HERO TERMINAL — TYPED "BUILD LOG"
// =========================================================
const terminalBody = document.getElementById('terminalBody');

const buildLog = [
  { type: 'prompt', text: '$ flutter run' },
  { type: 'plain',  text: 'Launching lib/main.dart...' },
  { type: 'kv',     key: 'name',       val: 'Gauswami Yashgiri' },
  { type: 'kv',     key: 'role',       val: 'Flutter Developer' },
  { type: 'kv',     key: 'status',     val: 'B.Tech IT, 5th Sem' },
  { type: 'kv',     key: 'targetYear', val: '2027 Placement' },
  { type: 'plain',  text: '✓ Build succeeded. Ready to ship.' },
];

function typeLine(container, prefix, text, className, speed = 22) {
  return new Promise(resolve => {
    const lineEl = document.createElement('div');
    lineEl.className = 'line';
    if (prefix) {
      const span = document.createElement('span');
      span.className = className;
      span.textContent = prefix;
      lineEl.appendChild(span);
    }
    const textNode = document.createElement('span');
    lineEl.appendChild(textNode);
    container.appendChild(lineEl);

    let i = 0;
    const interval = setInterval(() => {
      textNode.textContent += text[i];
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        resolve();
      }
    }, speed);
  });
}

async function runBuildLog() {
  if (!terminalBody) return;
  terminalBody.innerHTML = '';

  for (const entry of buildLog) {
    if (entry.type === 'prompt') {
      await typeLine(terminalBody, '', entry.text, 't-prompt', 32);
      terminalBody.lastChild.querySelector('span').className = 't-prompt';
    } else if (entry.type === 'kv') {
      const lineEl = document.createElement('div');
      lineEl.className = 'line';
      const keySpan = document.createElement('span');
      keySpan.className = 't-key';
      keySpan.textContent = entry.key + ': ';
      const valSpan = document.createElement('span');
      valSpan.className = 't-val';
      lineEl.appendChild(keySpan);
      lineEl.appendChild(valSpan);
      terminalBody.appendChild(lineEl);

      let i = 0;
      await new Promise(resolve => {
        const interval = setInterval(() => {
          valSpan.textContent += entry.val[i];
          i++;
          if (i >= entry.val.length) { clearInterval(interval); resolve(); }
        }, 20);
      });
    } else {
      await typeLine(terminalBody, '', entry.text, 't-plain', 14);
    }
    await new Promise(r => setTimeout(r, 120));
  }

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  terminalBody.appendChild(cursor);
}

// Kick off once the hero terminal is visible
const heroObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      runBuildLog();
      obs.disconnect();
    }
  });
}, { threshold: 0.3 });

if (terminalBody) heroObserver.observe(terminalBody);

// =========================================================
// CONTACT FORM — EmailJS
// =========================================================
const contactForm = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (contactForm) {

  contactForm.addEventListener('submit', function (e) {

    e.preventDefault();

    formNote.style.color = "#4db8ff";
    formNote.textContent = "Sending message...";

    emailjs.sendForm(
      "service_0247oho",
      "template_wxlq7o9",
      this
    )
    .then(() => {

      formNote.style.color = "#00ff99";
      formNote.textContent = "✅ Message sent successfully.";

      contactForm.reset();

      setTimeout(() => {
        formNote.textContent = "";
      }, 4000);

    })
    .catch((error) => {

      console.error("EmailJS Error:", error);

      formNote.style.color = "#ff4d4d";
      formNote.textContent = "❌ Failed to send message. Please try again.";

    });

  });

}

// =========================================================
// FOOTER YEAR
// =========================================================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
