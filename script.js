const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('.main-nav');
const header = document.querySelector('.site-header');
const progress = document.querySelector('.scroll-progress');

let scrollFrame = 0;
const updateScroll = () => {
  scrollFrame = 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  header?.classList.toggle('is-scrolled', window.scrollY > 18);
  if (progress) progress.style.transform = `scaleX(${value})`;
};
window.addEventListener('scroll', () => {
  if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateScroll);
}, { passive: true });
updateScroll();

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(open));
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const filters = document.querySelectorAll('[data-filter]');
const cards = document.querySelectorAll('[data-category]');

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    cards.forEach((card) => {
      const visible = category === 'Alle' || card.dataset.category === category;
      card.hidden = !visible;
      card.setAttribute('aria-hidden', String(!visible));
    });
  });
});

const form = document.querySelector('.inquiry-form');
const formEndpointId = typeof window.GT_FORM_ENDPOINT === 'string' ? window.GT_FORM_ENDPOINT.trim() : '';
if (form && formEndpointId && formEndpointId !== 'DEINE_FORM_ID') form.action = `https://formspree.io/f/${formEndpointId}`;
form?.addEventListener('submit', (event) => {
  if (form.action.includes('DEINE_FORM_ID')) {
    event.preventDefault();
    const notice = form.querySelector('.form-notice');
    notice.hidden = false;
    notice.textContent = 'Das Formular ist vorbereitet. Tragen Sie vor dem Veröffentlichen Ihre Formspree-ID ein.';
  }
});

document.querySelectorAll('.service-card').forEach((card, index) => {
  card.classList.add('reveal');
  card.style.transitionDelay = `${index * 70}ms`;
});
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach((item) => revealObserver.observe(item));
} else {
  reveals.forEach((item) => item.classList.add('is-visible'));
}

const calculator = document.querySelector('[data-calculator]');
if (calculator) {
  const money = (value) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  const models = { weg: { name: 'WEG-Verwaltung', surcharge: 0 }, miete: { name: 'Mietverwaltung', surcharge: 8 } };
  const unitPriceFor = (type, units) => {
    const count = Math.max(2, Math.min(100, units));
    let wegPrice;
    if (count <= 5) wegPrice = 75 - (count - 2) * (32 / 3);
    else if (count <= 10) wegPrice = 43 - (count - 5) * 1.6;
    else if (count <= 40) wegPrice = 35 - (count - 10) / 6;
    else if (count <= 80) wegPrice = 30 - (count - 40) / 16;
    else wegPrice = 27.5 - (count - 80) / 40;
    return Math.round((wegPrice + models[type].surcharge) * 100) / 100;
  };
  let kind = 'weg';
  const homes = calculator.querySelector('[name="homes"]');
  const commercial = calculator.querySelector('[name="commercial"]');
  const render = () => {
    const homeCount = Number(homes.value);
    const commercialCount = Number(commercial.value);
    const units = homeCount + commercialCount;
    const model = models[kind];
    const unitPrice = unitPriceFor(kind, units);
    calculator.querySelector('[data-homes-output]').textContent = homeCount;
    calculator.querySelector('[data-commercial-output]').textContent = commercialCount;
    calculator.querySelector('[data-unit-count]').textContent = `${units} Einheiten`;
    calculator.querySelector('[data-result-title]').textContent = model.name;
    calculator.querySelector('[data-unit-price]').textContent = money(unitPrice);
    calculator.querySelector('[data-total-price]').textContent = money(homeCount * unitPrice + commercialCount * (unitPrice + 3.57));
    calculator.querySelector('[data-standard-result]').hidden = false;
    calculator.querySelector('[data-custom-result]').hidden = true;
  };
  calculator.dataset.priceReady = 'true';
  calculator.querySelectorAll('[data-kind]').forEach((button) => button.addEventListener('click', () => {
    kind = button.dataset.kind;
    calculator.querySelectorAll('[data-kind]').forEach((item) => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    render();
  }));
  homes.addEventListener('input', render);
  commercial.addEventListener('input', render);
  render();
}

const privacyStorageKey = 'gt_privacy_notice_v1';
let privacyNotice;

const closePrivacyNotice = () => {
  try {
    window.localStorage.setItem(privacyStorageKey, new Date().toISOString());
  } catch {
    // Die Website bleibt auch bei blockiertem Browser-Speicher nutzbar.
  }
  privacyNotice?.remove();
  privacyNotice = undefined;
};

const showPrivacyNotice = () => {
  if (privacyNotice?.isConnected) return;
  privacyNotice = document.createElement('aside');
  privacyNotice.className = 'cookie-notice';
  privacyNotice.setAttribute('aria-labelledby', 'cookie-title');
  privacyNotice.setAttribute('aria-live', 'polite');
  privacyNotice.innerHTML = `<div class="cookie-copy"><span class="cookie-kicker">Datenschutz</span><h2 id="cookie-title">Nur technisch notwendige Speicherung</h2><p>Wir verwenden derzeit keine Analyse- oder Marketing-Cookies. Lokal gespeichert wird ausschließlich Ihre Entscheidung zu diesem Hinweis. Externe Dienste werden erst aufgerufen, wenn Sie das Kundenportal öffnen oder ein aktiviertes Anfrageformular absenden.</p><a href="datenschutz.html">Details in der Datenschutzerklärung</a></div><button class="button button-light cookie-button" type="button">Verstanden</button>`;
  privacyNotice.querySelector('.cookie-button')?.addEventListener('click', closePrivacyNotice);
  document.body.append(privacyNotice);
};

document.addEventListener('click', (event) => {
  if (event.target instanceof Element && event.target.closest('[data-cookie-settings]')) {
    event.preventDefault();
    showPrivacyNotice();
  }
});

try {
  if (!window.localStorage.getItem(privacyStorageKey)) showPrivacyNotice();
} catch {
  showPrivacyNotice();
}
