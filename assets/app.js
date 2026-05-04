const state = { templates: [], selected: null, generatedHtml: '' };

const els = {
  templateGrid: document.getElementById('templateGrid'),
  previewFrame: document.getElementById('previewFrame'),
  form: document.getElementById('generatorForm'),
  selectedTemplateBadge: document.getElementById('selectedTemplateBadge'),
  generateBtns: [document.getElementById('generateBtnTop'), document.getElementById('generateBtnSide')],
  downloadBtn: document.getElementById('downloadBtn'),
  copyHtmlBtn: document.getElementById('copyHtmlBtn'),
  loadDemoBtn: document.getElementById('loadDemoBtn')
};

(function initTheme(){
  const root = document.documentElement;
  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  document.addEventListener('click', e => {
    const toggle = e.target.closest('[data-theme-toggle]');
    if (!toggle) return;
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
  });
})();

async function loadTemplates(){
  const res = await fetch('./templates-data/catalog.json');
  state.templates = await res.json();
  renderTemplates();
  selectTemplate(state.templates[0]?.slug);
}

function renderTemplates(){
  els.templateGrid.innerHTML = state.templates.map(t => `
    <button class="template-card ${state.selected === t.slug ? 'active' : ''}" type="button" data-template="${t.slug}">
      <span class="badge">${t.industry}</span>
      <h3>${t.name}</h3>
      <p>${t.tone}</p>
      <div class="template-meta"><span>${t.layout}</span><span>${t.slug}</span></div>
    </button>
  `).join('');
}

function selectTemplate(slug){
  state.selected = slug;
  const current = state.templates.find(t => t.slug === slug);
  els.selectedTemplateBadge.textContent = current ? `${current.name} selected` : 'No template selected';
  renderTemplates();
}

function formData(){
  const data = Object.fromEntries(new FormData(els.form).entries());
  return {
    businessName: data.businessName || 'Your Business Name',
    industry: data.industry || 'Professional Services',
    location: data.location || 'Your Service Area',
    goal: data.goal || 'Generate more qualified leads',
    headline: data.headline || 'Professional websites built from clear business data',
    subheadline: data.subheadline || 'Use this generated page as a polished starter site for your customer. Replace the default content, brand details, and contact information to match the final business.',
    service1: data.service1 || 'Primary service',
    service2: data.service2 || 'Secondary service',
    service3: data.service3 || 'Flagship offer',
    trust1: data.trust1 || 'Experienced team',
    trust2: data.trust2 || 'Fast response and clear communication',
    cta: data.cta || 'Book a consultation'
  };
}

function generateSite(){
  const current = state.templates.find(t => t.slug === state.selected) || { name: 'Template', tone: 'Professional', layout: 'Modern' };
  const data = formData();
  const testimonials = [
    '“The site looked polished from day one and gave us a faster launch path.”',
    '“It organized our services and trust points in a way customers understood instantly.”',
    '“We started with a strong draft instead of a blank page.”'
  ];

  state.generatedHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${data.businessName}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Manrope:wght@600;700;800&display=swap" rel="stylesheet">
<style>
:root{--bg:#f7f6f2;--surface:#fbfaf7;--surface2:#f1eee7;--text:#241f18;--muted:#6d675d;--border:#d7d2c9;--primary:#01696f;--inverse:#f9f8f4;--shadow:0 18px 48px rgba(20,20,20,.08);--radius:24px;--font-body:'Inter',system-ui,sans-serif;--font-display:'Manrope',system-ui,sans-serif}
*{box-sizing:border-box}body{margin:0;font-family:var(--font-body);background:var(--bg);color:var(--text);line-height:1.6}a{text-decoration:none;color:inherit}.container{width:min(calc(100% - 2rem),1160px);margin:auto}header{position:sticky;top:0;background:rgba(247,246,242,.9);backdrop-filter:blur(14px);border-bottom:1px solid rgba(120,120,120,.16)}nav{display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1rem 0}.brand{display:flex;align-items:center;gap:.8rem;font-weight:800}.brand-mark{width:2.6rem;height:2.6rem;padding:.45rem;border-radius:1rem;background:rgba(1,105,111,.1);color:var(--primary)}.nav-links{display:flex;gap:.8rem;flex-wrap:wrap}.nav-links a{padding:.55rem .8rem;border-radius:999px;color:var(--muted)}.hero{padding:5rem 0 3rem}.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:1.2rem;align-items:center}.eyebrow{display:inline-flex;font-size:.78rem;text-transform:uppercase;letter-spacing:.14em;color:var(--primary);font-weight:800}.hero h1{font-family:var(--font-display);font-size:clamp(2.1rem,1.2rem + 3vw,4.8rem);line-height:1.01;letter-spacing:-.04em;max-width:12ch;margin:.45rem 0 1rem}.hero p{max-width:60ch;color:var(--muted)}.actions{display:flex;gap:.8rem;flex-wrap:wrap;margin-top:1.2rem}.btn{display:inline-flex;align-items:center;justify-content:center;padding:.9rem 1.1rem;border-radius:999px;border:0;font-weight:700}.btn-primary{background:var(--primary);color:var(--inverse)}.btn-secondary{border:1px solid rgba(120,120,120,.2);background:transparent}.panel,.card,.quote{background:var(--surface);border:1px solid rgba(120,120,120,.14);border-radius:var(--radius);box-shadow:var(--shadow)}.panel{padding:1.3rem}.mock{aspect-ratio:4/3;border-radius:18px;background:linear-gradient(135deg, rgba(1,105,111,.18), rgba(255,255,255,.55));border:1px solid rgba(120,120,120,.14)}.section{padding:3.4rem 0}.section-head{display:flex;justify-content:space-between;gap:1rem;align-items:end;margin-bottom:1rem}.section-head h2{font-family:var(--font-display);font-size:clamp(1.5rem,1.1rem + 1.2vw,2.3rem);margin:0;line-height:1.05}.grid3,.grid4{display:grid;gap:1rem}.grid3{grid-template-columns:repeat(3,minmax(0,1fr))}.grid4{grid-template-columns:repeat(4,minmax(0,1fr))}.card,.quote{padding:1.2rem}.badge{display:inline-flex;padding:.35rem .7rem;border-radius:999px;background:rgba(1,105,111,.1);color:var(--primary);font-size:.76rem;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.muted{color:var(--muted)}footer{padding:2rem 0 3rem;border-top:1px solid rgba(120,120,120,.14)}@media (max-width:900px){.hero-grid,.grid3,.grid4,.section-head,nav{grid-template-columns:1fr;display:grid}.nav-links{display:none}.hero{padding-top:3rem}}
</style>
</head>
<body>
<header><div class="container"><nav><div class="brand"><div class="brand-mark"><svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="40" height="40" rx="14" stroke="currentColor" stroke-width="2.2"/><path d="M13 31V17h9.2c5.4 0 9.8 2.8 9.8 7s-4.4 7-9.8 7H13Z" stroke="currentColor" stroke-width="2.2"/><path d="M21 17v14" stroke="currentColor" stroke-width="2.2"/></svg></div><span>${data.businessName}</span></div><div class="nav-links"><a href="#services">Services</a><a href="#proof">Proof</a><a href="#reviews">Reviews</a><a href="#contact">Contact</a></div></nav></div></header>
<main>
<section class="hero"><div class="container hero-grid"><div><div class="eyebrow">${current.industry} website</div><h1>${data.headline}</h1><p>${data.subheadline}</p><div class="actions"><a class="btn btn-primary" href="#contact">${data.cta}</a><a class="btn btn-secondary" href="#services">Explore services</a></div></div><div class="panel"><div class="mock"></div><div class="grid3" style="margin-top:1rem"><div class="card"><span class="badge">Goal</span><h3>${data.goal}</h3><p class="muted">Structured content designed to support better conversion flow.</p></div><div class="card"><span class="badge">Location</span><h3>${data.location}</h3><p class="muted">Swap this line for your target market, city, or service radius.</p></div><div class="card"><span class="badge">Template</span><h3>${current.name}</h3><p class="muted">${current.tone} with a ${current.layout.toLowerCase()} composition.</p></div></div></div></div></section>
<section id="services" class="section"><div class="container"><div class="section-head"><h2>Services your customers can understand quickly</h2><p class="muted">Use short, direct service blocks so visitors know what you offer and why they should contact you.</p></div><div class="grid3"><article class="card"><span class="badge">Service 1</span><h3>${data.service1}</h3><p class="muted">Lead with a short benefit statement and one clear next step.</p></article><article class="card"><span class="badge">Service 2</span><h3>${data.service2}</h3><p class="muted">Add proof, process, or response expectations to reduce hesitation.</p></article><article class="card"><span class="badge">Service 3</span><h3>${data.service3}</h3><p class="muted">Highlight the offer that best matches your most profitable work.</p></article></div></div></section>
<section id="proof" class="section"><div class="container"><div class="section-head"><h2>Trust signals that support conversion</h2><p class="muted">Professional websites perform better when they clearly present credibility, speed, and confidence-building details.</p></div><div class="grid4"><article class="card"><span class="badge">Trust point</span><h3>${data.trust1}</h3></article><article class="card"><span class="badge">Trust point</span><h3>${data.trust2}</h3></article><article class="card"><span class="badge">Response</span><h3>Fast onboarding</h3></article><article class="card"><span class="badge">Experience</span><h3>Professional delivery</h3></article></div></div></section>
<section id="reviews" class="section"><div class="container"><div class="section-head"><h2>Simple testimonials</h2><p class="muted">Even placeholder testimonials can show your customers how this section should be structured.</p></div><div class="grid3"><blockquote class="quote"><p>${testimonials[0]}</p><strong>Jordan Lee</strong><div class="muted">Operations lead</div></blockquote><blockquote class="quote"><p>${testimonials[1]}</p><strong>Priya Patel</strong><div class="muted">Founder</div></blockquote><blockquote class="quote"><p>${testimonials[2]}</p><strong>Marcus Reed</strong><div class="muted">Business owner</div></blockquote></div></div></section>
<section id="contact" class="section"><div class="container"><div class="panel"><div class="section-head"><h2>Ready to launch a cleaner website draft?</h2><p class="muted">Use this final block for your conversion action, consultation form, booking link, or quote request.</p></div><div class="actions"><a class="btn btn-primary" href="mailto:hello@example.com">${data.cta}</a><a class="btn btn-secondary" href="#top">Back to top</a></div></div></div></section>
</main>
<footer><div class="container"><p class="muted">Generated from the ${current.name} layout for ${data.businessName}. Replace demo content with your final customer brand details before publishing.</p></div></footer>
</body>
</html>`;

  els.previewFrame.srcdoc = state.generatedHtml;
}

function downloadHtml(){
  if(!state.generatedHtml) generateSite();
  const blob = new Blob([state.generatedHtml], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${(formData().businessName || 'website').toLowerCase().replace(/[^a-z0-9]+/g,'-')}.html`;
  a.click();
  URL.revokeObjectURL(url);
}

async function copyHtml(){
  if(!state.generatedHtml) generateSite();
  await navigator.clipboard.writeText(state.generatedHtml);
  els.copyHtmlBtn.textContent = 'Copied';
  setTimeout(() => els.copyHtmlBtn.textContent = 'Copy HTML', 1200);
}

function loadDemo(){
  const demo = {
    businessName: 'Northline Legal Group',
    industry: 'Law firm',
    location: 'Minneapolis, Minnesota',
    goal: 'Generate more qualified consultations',
    headline: 'Clear legal guidance when the stakes are high',
    subheadline: 'Northline Legal Group helps businesses and professionals move forward with strategic counsel, responsive communication, and a polished client experience from first call to final resolution.',
    service1: 'Business litigation',
    service2: 'Employment counsel',
    service3: 'Contract review',
    trust1: '20+ years combined experience',
    trust2: 'Fast response for urgent matters',
    cta: 'Book a consultation'
  };
  Object.entries(demo).forEach(([key, value]) => { if(els.form.elements[key]) els.form.elements[key].value = value; });
}

document.addEventListener('click', e => {
  const card = e.target.closest('[data-template]');
  if(card) selectTemplate(card.dataset.template);
});

els.generateBtns.forEach(btn => btn.addEventListener('click', generateSite));
els.downloadBtn.addEventListener('click', downloadHtml);
els.copyHtmlBtn.addEventListener('click', copyHtml);
els.loadDemoBtn.addEventListener('click', loadDemo);

loadTemplates().then(loadDemo).then(generateSite);
