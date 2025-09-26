// Main JavaScript for Diana von Burg Portfolio (copied from Wajahat Khan site with edits)
let projectsData = null;
let skillsData = null;

document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

async function initializeApp() {
  try {
    await loadProjectsData();
    const currentPage = getCurrentPage();
    if (currentPage === 'index') {
      initializeHomePage();
    } else if (currentPage === 'projects') {
      initializeProjectsPage();
    }
    initializeNavigation();
    initializeSmoothScrolling();
  } catch (e) { console.error(e); }
}

async function loadProjectsData() {
  try {
    const res = await fetch('projects.json');
    if (!res.ok) throw new Error('Failed to load projects.json');
    const data = await res.json();
    projectsData = data.projects; skillsData = data.skills; return data;
  } catch (e) { console.warn('projects.json not found or invalid – continuing with static content.'); }
}

function getCurrentPage(){ return window.location.pathname.includes('projects.html') ? 'projects' : 'index'; }

function initializeHomePage(){ loadFeaturedProjects(); loadSkills(); initializeAnimations(); initializeNameTypingAnimation(); }
function initializeProjectsPage(){ loadAllProjects(); initializeProjectFilters(); }

function loadFeaturedProjects(){ if(!projectsData) return; const c=document.getElementById('featuredProjects'); if(!c) return; c.innerHTML=''; projectsData.slice(0,6).forEach(p=>{const card=createProjectCard(p); const col=document.createElement('div'); col.className='col-lg-4 col-md-6 mb-4'; col.appendChild(card); c.appendChild(col);});}
function loadAllProjects(){ if(!projectsData) return; const c=document.getElementById('projectsGrid'); if(!c) return; c.innerHTML=''; projectsData.forEach(p=>{const card=createProjectCard(p,true); const col=document.createElement('div'); col.className='col-lg-4 col-md-6 mb-4 project-item'; col.setAttribute('data-category',p.category); col.appendChild(card); c.appendChild(col);});}

function createProjectCard(project, showDetails=false){ const card=document.createElement('div'); card.className='card project-card h-100'; const img=project.image||`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 220"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#f97316"/><stop offset="100%" stop-color="#ea580c"/></linearGradient></defs><rect width="400" height="220" fill="url(%23g)"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-size="24" font-weight="600">${project.title}</text></svg>`; card.innerHTML=`<img src="${img}" class="card-img-top" alt="${project.title}" style="height: 200px; object-fit: cover;"><div class="card-body d-flex flex-column"><div class="mb-2"><span class="badge bg-primary rounded-pill">${project.category||'Project'}</span></div><h5 class="card-title">${project.title}</h5><p class="card-text">${project.description||''}</p><div class="tech-stack mb-3">${(project.tech_stack||[]).map(t=>`<span class="tech-tag">${t}</span>`).join('')}</div><div class="mt-auto">${project.github_url?`<a class="btn btn-outline-primary btn-sm" target="_blank" href="${project.github_url}"><i class="fab fa-github me-1"></i>View Code</a>`:''}</div></div>`; return card; }

function initializeProjectFilters(){ const buttons=document.querySelectorAll('[data-filter]'); const items=document.querySelectorAll('.project-item'); buttons.forEach(b=>b.addEventListener('click',function(){ const f=this.getAttribute('data-filter'); buttons.forEach(x=>x.classList.remove('active')); this.classList.add('active'); items.forEach(i=>{ const cat=i.getAttribute('data-category'); i.style.display=(f==='All'||cat===f)?'block':'none';});})); }

function initializeNavigation(){ window.addEventListener('scroll',function(){ const nav=document.getElementById('mainNav'); if(window.scrollY>100){ nav.classList.add('navbar-scrolled'); } else { nav.classList.remove('navbar-scrolled'); }}); const links=document.querySelectorAll('.navbar-nav .nav-link'); const toggler=document.querySelector('.navbar-toggler'); const collapse=document.querySelector('.navbar-collapse'); links.forEach(l=>l.addEventListener('click',function(){ if(window.innerWidth<992 && collapse && collapse.classList.contains('show')) toggler.click(); })); }

function initializeSmoothScrolling(){ document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener('click',function(e){ const href=this.getAttribute('href'); if(href==='#') return; const t=document.querySelector(href); if(t){ e.preventDefault(); window.scrollTo({top:t.offsetTop-80, behavior:'smooth'}); }})); }

function initializeAnimations(){ const opts={threshold:.1, rootMargin:'0px 0px -50px 0px'}; const obs=new IntersectionObserver((entries)=>{ entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('animate__fadeInUp'); } }); }, opts); document.querySelectorAll('.project-card, .skill-category, .about-content').forEach(el=>obs.observe(el)); }

function initializeNameTypingAnimation(){ const nameText='Diana von Burg'; const nameEl=document.getElementById('typedName'); const cursor=document.getElementById('cursor'); if(!nameEl||!cursor) return; let idx=0; nameEl.textContent=''; let vis=true; const blink=()=>{ cursor.style.opacity=vis?'1':'0'; vis=!vis; }; const timer=setInterval(blink,530); (function type(){ if(idx<nameText.length){ nameEl.textContent+=nameText.charAt(idx++); setTimeout(type,140);} else { setTimeout(()=>{ clearInterval(timer); cursor.style.opacity='0'; },1400);} })(); }

// Inject small helper CSS
const extraCSS=`.animate__fadeInUp{animation:fadeInUp .6s ease forwards}@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}.navbar-scrolled{background:rgba(17,24,39,.98)!important;box-shadow:0 2px 10px rgba(0,0,0,.1)}#typedName{min-height:1em}`; const s=document.createElement('style'); s.textContent=extraCSS; document.head.appendChild(s);
