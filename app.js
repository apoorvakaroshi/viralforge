// ═══════════════════════════════════════════════════════════════
// VIRALFORGE — Main Application
// ═══════════════════════════════════════════════════════════════

'use strict';

// ─── State ────────────────────────────────────────────────────
const State = {
  currentUser: null,
  campaigns: [],
  currentSection: 'home',
  selectedType: null,
  selectedColor: '#6366f1',
  selectedPlatforms: [],
  tags: [],
  viewMode: 'grid',
  currentPage: 1,
  perPage: 9,
  filters: { type: 'all', sort: 'votes', search: '' },
  uploadedFile: null,
  shareTarget: null,
  liveCount: 0,
  isDark: true,
};

// ─── Sample Data Generator ────────────────────────────────────
const EMOJIS = ['🔥','🚀','💡','⚡','🎯','💎','🏆','✨','🌟','💥','🎪','🎭','🎨','🎬','📱','💸','🤑','🎤','🎵','🌈'];
const TYPES = ['viral-hook', 'meme-ad', 'video-concept', 'campaign-concept'];
const TYPE_LABELS = { 'viral-hook': 'Viral Hook', 'meme-ad': 'Meme Ad', 'video-concept': 'Video Concept', 'campaign-concept': 'Bold Campaign' };
const INDUSTRIES = ['Tech', 'Fashion', 'Food', 'Health', 'Finance', 'Education', 'Entertainment', 'Startup'];
const COLORS = ['#6366f1','#f59e0b','#ef4444','#10b981','#06b6d4','#ec4899'];

const SAMPLE_HOOKS = [
  "Your competitor's ad just made their customer YOUR customer. Here's how.",
  "We replaced our entire marketing team with this one post.",
  "Stop making content. Start making moments people can't scroll past.",
  "The ad that made ₹1 crore from ₹500 spent. No paid promotion.",
  "If your brand disappeared tomorrow, would anyone notice? Be the one they'd miss.",
  "GenZ doesn't buy products. They buy identities. Are you selling the right one?",
  "We interviewed 1,000 customers. None remembered our logo. All remembered how we made them feel.",
  "Your brand is not your logo. It's the feeling people get when they're not looking at you.",
  "The reel that got 1M views in 6 hours — and the one line that made it happen.",
  "Forget the product. Sell the transformation. Here's the formula.",
  "Nobody wakes up wanting to buy your product. They wake up wanting to solve a problem. Be the solution they're already searching for.",
  "We launched with zero budget and beat brands spending ₹10 lakhs a month. This was our weapon.",
  "The most powerful 3 words in marketing aren't 'buy now' — they're 'this is you'.",
  "We stopped advertising and our sales went up. Here's what we did instead.",
  "Your customers are already talking about you. The question is — are you part of that conversation?",
];

const REAL_CAMPAIGN_TITLES = [
  "The Invisible Billboard — We Advertised in Places No Brand Dared to Go",
  "24 Hours of Real Reactions: No Script, No Actors, Just Truth",
  "We Let Our Angriest Customer Write Our Ad Copy",
  "The ₹0 Campaign That Outperformed Our ₹5 Lakh Budget Run",
  "Mirror Campaign — Show India What It Actually Looks Like",
  "The Last DM — A Campaign Built on the Messages People Never Sent",
  "Unsell It — A Campaign That Told People NOT to Buy Our Product",
  "Before the Algorithm: A Campaign Designed to Be Shared by Humans",
  "The Blank Post — What Happens When a Brand Stays Silent for 48 Hours",
  "India's Most Honest Product Review (Written By Us, About Ourselves)",
  "The 5-Second Hook Challenge — Can You Stop a Scroll in Under 5 Words?",
  "Chai Time Marketing — Reaching India's 800 Million Tea Drinkers",
  "The Comment Section Campaign — We Turned Trolls Into Brand Advocates",
  "Regional First — Why We Launched in Tamil Before English",
  "The Referral Revolution — Turn Every Customer Into a Micro-Influencer",
  "Zero Followers, Maximum Reach — The Power of Community-First Marketing",
  "The Comeback Story — How We Rebuilt Trust After a Brand Crisis",
  "WhatsApp-First Marketing — Reaching India Where It Actually Scrolls",
  "Gen Z Decoded — A Campaign Built From 1,000 Hours of TikTok Research",
  "The Emotion Economy — Selling Feelings in a Market Drowning in Features",
];

const SAMPLE_DESCS = [
  "A comprehensive campaign that flips traditional advertising on its head. Instead of showing the product, we show the world without it — creating a powerful emotional void that makes customers realize they need it.",
  "A viral meme series that transforms industry pain points into shareable content. Each post drives 10x more engagement than traditional ads because it speaks the language of the internet.",
  "A 15-second video concept where the entire ad is told backwards — starting with the result and revealing the journey, creating irresistible curiosity that demands a second watch.",
  "An interactive campaign where users create the content. We provide the spark, the audience provides the fuel. Result: 0 ad spend, 100% organic reach.",
  "A bold campaign that challenges the entire category — not just competitors. We didn't compare ourselves to anyone. We made the comparison irrelevant.",
  "A storytelling-first campaign that ran on WhatsApp before any other platform. 200,000 forwards in 72 hours — all organic, all emotional, all real people.",
];

function generateCampaigns(count = 50) {
  const campaigns = [];
  const creators = [
    { name: 'Arjun Sharma',   username: 'arjun_creates',  id: 'user_0' },
    { name: 'Priya Patel',    username: 'priya_digital',   id: 'user_1' },
    { name: 'Rahul Gupta',    username: 'rahulg_viral',    id: 'user_2' },
    { name: 'Sneha Iyer',     username: 'sneha_mktg',      id: 'user_3' },
    { name: 'Vikram Nair',    username: 'vikram_bold',     id: 'user_4' },
    { name: 'Kavya Reddy',    username: 'kavya_rx',        id: 'user_5' },
    { name: 'Amit Kumar',     username: 'amit_buzz',       id: 'user_6' },
    { name: 'Pooja Singh',    username: 'pooja_viral',     id: 'user_7' },
    { name: 'Ravi Mehta',     username: 'ravimehta',       id: 'user_8' },
    { name: 'Ananya Roy',     username: 'ananya_creates',  id: 'user_9' },
    { name: 'Dev Kapoor',     username: 'dev_mktg',        id: 'user_10' },
    { name: 'Nisha Verma',    username: 'nisha_viral',     id: 'user_11' },
  ];

  const tagPools = [
    ['viral','hook','attention','scroll'],
    ['marketing','brand','digital','campaign'],
    ['creative','bold','india','strategy'],
    ['genz','instagram','reels','trending'],
    ['storytelling','emotion','authentic','organic'],
    ['startup','growth','reach','engage'],
  ];

  for (let i = 0; i < count; i++) {
    const type     = TYPES[Math.floor(Math.random() * TYPES.length)];
    const votes    = Math.floor(Math.pow(Math.random(), 1.5) * 12000) + 50;
    const views    = votes * (3 + Math.floor(Math.random() * 8));
    const shares   = Math.floor(votes * (0.05 + Math.random() * 0.2));
    const creator  = creators[i % creators.length];
    const daysAgo  = Math.floor(Math.random() * 25);
    const date     = new Date();
    date.setDate(date.getDate() - daysAgo);
    date.setHours(Math.floor(Math.random() * 24));
    const colorIdx = Math.floor(Math.random() * COLORS.length);
    const tagPool  = tagPools[Math.floor(Math.random() * tagPools.length)];
    const tags     = [...tagPool].sort(() => 0.5 - Math.random()).slice(0, 3);
    const title    = REAL_CAMPAIGN_TITLES[i % REAL_CAMPAIGN_TITLES.length];
    const hook     = SAMPLE_HOOKS[i % SAMPLE_HOOKS.length];
    const desc     = SAMPLE_DESCS[i % SAMPLE_DESCS.length];

    campaigns.push({
      id: `camp_${i}_${Date.now()}`,
      title,
      hook,
      description: desc,
      type,
      industry: INDUSTRIES[Math.floor(Math.random() * INDUSTRIES.length)],
      emoji: EMOJIS[i % EMOJIS.length],
      color: COLORS[colorIdx],
      votes,
      views,
      shares,
      comments: i < 5 ? [
        { id: `cm_${i}_1`, author: creators[(i+1)%creators.length].name, text: 'This is genuinely brilliant. Voted!', time: new Date(Date.now() - 3600000).toISOString() },
        { id: `cm_${i}_2`, author: creators[(i+2)%creators.length].name, text: 'The boldest idea on this platform.', time: new Date(Date.now() - 7200000).toISOString() },
      ] : [],
      reactions: { '🔥': Math.floor(votes * 0.4), '❤️': Math.floor(votes * 0.2), '🚀': Math.floor(votes * 0.15), '💯': Math.floor(votes * 0.1) },
      authorName: creator.name,
      authorUsername: creator.username,
      authorId: creator.id,
      tags,
      platforms: ['instagram','tiktok','twitter','linkedin','whatsapp'].sort(() => 0.5 - Math.random()).slice(0, 3),
      createdAt: date.toISOString(),
      votedBy: [],
      viralScore: Math.floor(Math.random() * 35) + 62,
      trending: false,
      featured: false,
    });
  }

  // Sort by votes
  campaigns.sort((a, b) => b.votes - a.votes);

  // Seed Apoorva's real campaign at the very top
  const apoorvaCampaign = {
    id: 'camp_apoorva_featured',
    title: 'The Silence Campaign — What If Your Brand Said Nothing for 24 Hours?',
    hook: 'We went completely silent for 24 hours. No posts. No stories. No replies. The internet noticed — and that silence spoke louder than any ad we ever ran.',
    description: 'In a world drowning in content, the boldest move a brand can make is to stop. This campaign challenged our audience: What would you miss if we disappeared? The result was thousands of user-generated posts asking us to come back — free, authentic, and more powerful than any paid campaign. Silence is the new viral.',
    type: 'campaign-concept',
    industry: 'Marketing',
    emoji: '🤫',
    color: '#6366f1',
    votes: 9847,
    views: 87430,
    shares: 1240,
    comments: [
      { author: 'Rahul Gupta', text: 'This is genuinely brilliant. Silence as a marketing strategy — never thought of it this way!', time: new Date(Date.now() - 3600000).toISOString() },
      { author: 'Priya Patel', text: 'The boldest idea on this entire platform. Voted immediately.', time: new Date(Date.now() - 7200000).toISOString() },
      { author: 'Vikram Nair', text: 'This would actually work. The curiosity gap is real.', time: new Date(Date.now() - 10800000).toISOString() },
    ],
    reactions: { '🔥': 3200, '❤️': 1800, '🚀': 2100, '💯': 1400 },
    authorName: 'Apoorva Karoshi',
    authorUsername: 'apoorva_karoshi',
    authorId: 'apoorva_001',
    tags: ['silence', 'bold', 'viral', 'brandstrategy', 'creative'],
    platforms: ['instagram', 'twitter', 'linkedin'],
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    votedBy: [],
    viralScore: 97,
    trending: true,
    featured: true,
  };
  campaigns.unshift(apoorvaCampaign);

  return campaigns;
}

// ─── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  startLoader();
});

function startLoader() {
  const progress = document.getElementById('loaderProgress');
  const tagline = document.getElementById('loaderTagline');
  const taglines = [
    'Charging the attention engine...',
    'Loading real campaigns...',
    'Warming up the scoreboard...',
    'Preparing the viral algorithms...',
    'Almost ready to make the internet stop...',
  ];
  let p = 0;
  let tIdx = 0;

  const tInterval = setInterval(() => {
    tIdx = (tIdx + 1) % taglines.length;
    if (tagline) {
      tagline.style.opacity = '0';
      setTimeout(() => {
        tagline.textContent = taglines[tIdx];
        tagline.style.opacity = '1';
      }, 200);
    }
  }, 700);

  const interval = setInterval(() => {
    p += Math.random() * 18;
    if (p > 100) p = 100;
    if (progress) progress.style.width = p + '%';
    if (p >= 100) {
      clearInterval(interval);
      clearInterval(tInterval);
      setTimeout(finishLoad, 400);
    }
  }, 100);
}

function finishLoad() {
  const loadScreen = document.getElementById('loadingScreen');
  const app = document.getElementById('app');
  if (loadScreen) loadScreen.classList.add('fade-out');
  if (app) app.classList.remove('hidden');

  // Init data
  State.campaigns = generateCampaigns(50);

  // Check saved session
  const saved = localStorage.getItem('vf_user');
  if (saved) {
    try {
      State.currentUser = JSON.parse(saved);
      updateUserUI();
    } catch(e) {}
  }

  // Init sections
  renderHomeTrending();
  renderCampaigns();
  renderLeaderboard();
  renderAnalytics();
  updateLiveCounter();
  initObservers();

  // Start typed text
  setTimeout(() => Animations.typeText(), 500);

  // Update live counter
  setInterval(updateLiveCounter, 5000);

  // New features — campaigns are ready now
  autoMarkTrending();
  renderVelocityList();
  buildActivityFeed();
  renderTagCloud();
  renderCreatorSpotlight();
  renderCampaignOfDay();
  updateUserRankBanner();
  initBringPeopleIn();
  startLiveVoteSimulation();
  startCountdown();
  initBackToTop();
  startStatsTicker();
  updateCampaignsBadge();
  initScrollSpy();
  setTimeout(showOnboarding, 2200);
  setInterval(renderVelocityList, 60000);
  setInterval(buildActivityFeed, 30000);
  setInterval(updateCampaignsBadge, 15000);

  // Seed bringPeople stats
  const bv = document.getElementById('bringVotes');
  const bc = document.getElementById('bringCampaigns');
  const bs = document.getElementById('bringShares');
  const totalVotes = State.campaigns.reduce((s,c)=>s+c.votes,0);
  const totalShares = State.campaigns.reduce((s,c)=>s+(c.shares||0),0);
  if (bv) Animations.animateCounter(bv, totalVotes, 2000);
  if (bc) Animations.animateCounter(bc, State.campaigns.length, 1500);
  if (bs) Animations.animateCounter(bs, totalShares, 2000);
}

// ─── Navigation ───────────────────────────────────────────────
function showSection(name) {
  Animations.pageTransition(() => {
    // Hide all
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.getElementById('userDropdown')?.classList.remove('open');
    // Close mobile menu
    document.getElementById('navLinks')?.classList.remove('open');

    const sectionMap = {
      home: 'homeSection',
      campaigns: 'campaignsSection',
      leaderboard: 'leaderboardSection',
      analytics: 'analyticsSection',
      create: 'createSection',
      battle: 'battleSection',
      simulator: 'simulatorSection',
      insights: 'insightsSection',
      profile: 'profileSection',
      myCampaigns: 'myCampaignsSection',
    };

    const sId = sectionMap[name] || 'homeSection';
    const section = document.getElementById(sId);
    if (section) section.classList.add('active');

    // Update nav active state
    const navLink = document.querySelector(`.nav-link[data-section="${name}"]`);
    if (navLink) navLink.classList.add('active');

    State.currentSection = name;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Auth guard for create
    if (name === 'create' && !State.currentUser) {
      // Still show the create section dimly behind the modal
      const createSection = document.getElementById('createSection');
      if (createSection) createSection.classList.add('active');
      openModal('authModal');
      return;
    }

    // Section-specific inits — ALL merged here
    if (name === 'analytics') renderAnalyticsCharts();
    if (name === 'profile') renderProfile();
    if (name === 'myCampaigns') renderMyCampaigns();
    if (name === 'battle') { setTimeout(() => { if (!State.battle.a) loadNewBattle(); }, 200); }
    if (name === 'leaderboard') { setTimeout(() => renderLeaderboardWithVelocity(), 300); }
    if (name === 'simulator') setTimeout(initSimulator, 200);
    if (name === 'insights') setTimeout(initInsights, 200);
    if (name === 'analytics') setTimeout(renderAnalyticsCharts, 250);
    if (name === 'home') { setTimeout(() => { renderTagCloud(); renderCreatorSpotlight(); renderVelocityList(); renderCampaignOfDay(); updateUserRankBanner(); }, 200); }
  });
}

// ─── Auth ──────────────────────────────────────────────────────
function login() {
  const user = document.getElementById('loginUser').value.trim();
  const pass = document.getElementById('loginPass').value;

  if (!user || !pass) {
    showToast('Please fill in all fields', 'warning');
    return;
  }

  // Demo login
  if ((user === 'demo' || user === 'demo@viralforge.in') && pass === 'demo123') {
    doLogin({ id: 'demo_user', name: 'Demo Creator', username: 'demo', email: 'demo@viralforge.in' });
    return;
  }

  // Check localStorage
  const users = JSON.parse(localStorage.getItem('vf_users') || '[]');
  const found = users.find(u => (u.username === user || u.email === user) && u.password === pass);

  if (found) {
    doLogin(found);
  } else {
    showToast('Invalid credentials. Try demo / demo123', 'error');
  }
}

function signup() {
  const name = document.getElementById('signupName').value.trim();
  const username = document.getElementById('signupUser').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const pass = document.getElementById('signupPass').value;

  if (!name || !username || !email || !pass) {
    showToast('Please fill in all fields', 'warning');
    return;
  }
  if (pass.length < 8) {
    showToast('Password must be at least 8 characters', 'warning');
    return;
  }

  const users = JSON.parse(localStorage.getItem('vf_users') || '[]');
  if (users.find(u => u.username === username)) {
    showToast('Username already taken', 'error');
    return;
  }

  const newUser = { id: `user_${Date.now()}`, name, username, email, password: pass, createdAt: new Date().toISOString() };
  users.push(newUser);
  localStorage.setItem('vf_users', JSON.stringify(users));

  doLogin(newUser);
}

function doLogin(user) {
  State.currentUser = { ...user };
  delete State.currentUser.password;
  localStorage.setItem('vf_user', JSON.stringify(State.currentUser));
  updateUserUI();
  setTimeout(updateUserRankBanner, 300);
  closeModal('authModal');
  showToast(`Welcome, ${user.name}! 🚀`, 'success');
  if (State.currentSection !== 'create') {
    showSection('home');
  } else {
    showSection('create');
  }
}

function socialLogin(provider) {
  const adjectives = ['Creative', 'Bold', 'Sharp', 'Viral', 'Smart', 'Bright'];
  const nouns = ['Marketer', 'Creator', 'Thinker', 'Strategist', 'Maker', 'Visionary'];
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const name = `${adj} ${noun}`;
  const user = {
    id: `social_${Date.now()}`,
    name,
    username: `user_${Math.floor(Math.random() * 9999)}`,
    email: `user_${Date.now()}@${provider.toLowerCase()}.social`,
    provider,
  };
  doLogin(user);
}

function logout() {
  State.currentUser = null;
  localStorage.removeItem('vf_user');
  updateUserUI();
  document.getElementById('userDropdown')?.classList.remove('open');
  showToast('Logged out. See you soon! 👋', 'info');
  showSection('home');
}

function updateUserUI() {
  const user = State.currentUser;
  const letter = user ? user.name[0].toUpperCase() : '?';

  const navAvatar = document.getElementById('navAvatar');
  const dropAvatar = document.getElementById('dropAvatar');
  const dropName = document.getElementById('dropName');
  const dropEmail = document.getElementById('dropEmail');
  const avatarLetter = document.getElementById('avatarLetter');

  if (navAvatar) navAvatar.style.display = user ? 'flex' : 'none';
  if (avatarLetter) avatarLetter.textContent = letter;
  if (dropAvatar) dropAvatar.textContent = letter;
  if (dropName) dropName.textContent = user ? user.name : 'Guest User';
  if (dropEmail) dropEmail.textContent = user ? user.email : 'Sign in to continue';
}

function toggleUserMenu() {
  if (!State.currentUser) {
    openModal('authModal');
    return;
  }
  document.getElementById('userDropdown')?.classList.toggle('open');
}

function switchAuth(mode, btn) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(mode === 'login' ? 'loginForm' : 'signupForm')?.classList.add('active');
}

function checkUsername(val) {
  const el = document.getElementById('usernameCheck');
  if (!el) return;
  if (val.length < 3) { el.textContent = ''; return; }
  const users = JSON.parse(localStorage.getItem('vf_users') || '[]');
  const taken = users.find(u => u.username === val);
  el.className = 'username-check ' + (taken ? 'invalid' : 'valid');
  el.textContent = taken ? '✗ Username taken' : '✓ Username available';
}

function checkPassword(val) {
  const fill = document.getElementById('strengthFill');
  const label = document.getElementById('strengthLabel');
  if (!fill || !label) return;
  let score = 0;
  if (val.length >= 8) score++;
  if (/[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^A-Za-z0-9]/.test(val)) score++;
  const levels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['', '#ef4444', '#f59e0b', '#10b981', '#6366f1'];
  fill.style.width = (score * 25) + '%';
  fill.style.background = colors[score];
  label.textContent = levels[score];
  label.style.color = colors[score];
}

function togglePass(id) {
  const input = document.getElementById(id);
  if (!input) return;
  input.type = input.type === 'password' ? 'text' : 'password';
}

// ─── Modal ─────────────────────────────────────────────────────
function openModal(id) {
  document.getElementById(id)?.classList.add('open');
}

function closeModal(id) {
  document.getElementById(id)?.classList.remove('open');
}

// Close on overlay click
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('open');
    document.body.style.overflow = '';
  }
});

// ─── Toast ─────────────────────────────────────────────────────
function showToast(msg, type = 'info') {
  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span class="toast-icon">${icons[type]}</span><span class="toast-text">${msg}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('hiding');
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ─── Home Trending ─────────────────────────────────────────────
function renderHomeTrending() {
  const grid = document.getElementById('homeTrending');
  if (!grid) return;
  const trending = [...State.campaigns].sort((a, b) => b.votes - a.votes).slice(0, 3);
  grid.innerHTML = trending.map((c, i) => renderCampaignCard(c, i + 1)).join('');
  initCounters();
}

// ─── Campaigns ────────────────────────────────────────────────
function renderCampaigns() {
  const grid = document.getElementById('campaignsGrid');
  if (!grid) return;

  let filtered = filterAndSort(State.campaigns, State.filters);
  const count = document.getElementById('campaignCount');
  if (count) count.textContent = `${filtered.length} campaigns`;

  const paged = filtered.slice(0, State.currentPage * State.perPage);
  grid.innerHTML = paged.length > 0 ? paged.map((c, i) => renderCampaignCard(c, i + 1)).join('') : `
    <div class="empty-state" style="grid-column:1/-1">
      <span class="empty-state-icon">🔍</span>
      <h3>No campaigns found</h3>
      <p>Try adjusting your filters or be the first to create one!</p>
      <button class="btn-primary" onclick="showSection('create')" style="margin-top:16px">Create Campaign</button>
    </div>
  `;

  const loadMoreBtn = document.getElementById('loadMoreBtn');
  if (loadMoreBtn) {
    loadMoreBtn.style.display = paged.length < filtered.length ? 'inline-flex' : 'none';
  }
}

function filterAndSort(campaigns, { type, sort, search }) {
  let result = [...campaigns];

  if (type && type !== 'all' && type !== 'trending' && type !== 'new') {
    result = result.filter(c => c.type === type);
  }
  if (type === 'trending') {
    result = result.filter(c => c.trending || c.votes > 3000);
  }
  if (type === 'new') {
    const week = new Date();
    week.setDate(week.getDate() - 7);
    result = result.filter(c => new Date(c.createdAt) > week);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(c =>
      c.title.toLowerCase().includes(q) ||
      c.hook.toLowerCase().includes(q) ||
      c.tags.some(t => t.includes(q))
    );
  }

  if (sort === 'votes') result.sort((a, b) => b.votes - a.votes);
  if (sort === 'new') result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (sort === 'trending') result.sort((a, b) => b.viralScore - a.viralScore);
  if (sort === 'comments') result.sort((a, b) => b.comments.length - a.comments.length);

  return result;
}

function renderCampaignCard(c, rank) {
  const voted = State.currentUser && c.votedBy?.includes(State.currentUser.id);
  const timeAgo = getTimeAgo(c.createdAt);
  const typeLabel = TYPE_LABELS[c.type] || c.type;

  return `
    <div class="campaign-card" onclick="openCampaign('${c.id}')">
      <div class="card-image" style="background:linear-gradient(135deg,${c.color}22,${c.color}44)">
        ${rank <= 3 ? `<div class="card-rank">${['🥇','🥈','🥉'][rank-1]} #${rank}</div>` : `<div class="card-rank">#${rank}</div>`}
        <div class="card-type-badge">${typeLabel}</div>
        <span style="font-size:4rem">${c.emoji}</span>
        ${c.trending ? '<div class="card-trending">🔥 Trending</div>' : ''}
        ${c.featured ? '<div class="card-featured-badge">⭐ Featured</div>' : ''}
        ${isNewCampaign(c) && !c.featured ? '<div class="card-new-badge">NEW</div>' : ''}
      </div>
      <div class="card-body">
        <div class="card-title">${c.title}</div>
        <div class="card-hook">${c.hook}</div>
        <div class="card-author">
          <div class="author-avatar" style="background:${c.color}">${c.authorName[0]}</div>
          <div>
            <div class="author-name" style="font-size:0.82rem;font-weight:600">${c.authorName}</div>
            <div style="font-size:0.72rem;color:var(--text3)">${timeAgo}</div>
          </div>
        </div>
        <div class="card-tags">
          ${c.tags.slice(0, 3).map(t => `<span class="tag">#${t}</span>`).join('')}
        </div>
        <div class="card-footer" onclick="event.stopPropagation()">
          <div class="vote-section">
            <button class="vote-btn ${voted ? 'voted' : ''}" onclick="vote('${c.id}', event)">
              ${voted ? '✅' : '🔥'} ${voted ? 'Voted' : 'Vote'}
            </button>
            <span class="vote-count">${c.votes.toLocaleString()} votes</span>
          </div>
          <div class="card-actions">
            <button class="card-action-btn" onclick="openShare('${c.id}', event)" title="Share">
              <i class="fas fa-share-alt"></i>
            </button>
            <button class="card-action-btn" onclick="generateEmbed('${c.id}'); event.stopPropagation()" title="Embed">
              <i class="fas fa-code"></i>
            </button>
            <button class="card-action-btn" onclick="openCampaign('${c.id}')" title="View Details">
              <i class="fas fa-expand-alt"></i>
            </button>
          </div>
        </div>
        <div class="reaction-bar" onclick="event.stopPropagation()">
          ${Object.entries(c.reactions).map(([emoji, count]) => `
            <button class="reaction-btn" onclick="react('${c.id}', '${emoji}', this)">
              ${emoji} <span class="reaction-count">${count}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function filterCampaigns(type, btn) {
  State.filters.type = type;
  State.currentPage = 1;
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderCampaigns();
}

function searchCampaigns(val) {
  State.filters.search = val;
  State.currentPage = 1;
  renderCampaigns();
}

function sortCampaigns(val) {
  State.filters.sort = val;
  renderCampaigns();
}

function loadMoreCampaigns() {
  State.currentPage++;
  renderCampaigns();
}

function setView(view, btn) {
  State.viewMode = view;
  const grid = document.getElementById('campaignsGrid');
  if (grid) {
    grid.classList.toggle('list-view', view === 'list');
  }
  document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ─── Campaign Detail ──────────────────────────────────────────
function openCampaign(id) {
  const c = State.campaigns.find(c => c.id === id);
  if (!c) return;
  c.views = (c.views || 0) + 1;
  const voted = State.currentUser && c.votedBy?.includes(State.currentUser.id);

  const commentsHtml = c.comments.length > 0 ? c.comments.map(cm => `
    <div class="comment-item">
      <div class="comment-top">
        <div class="comment-avatar">${cm.author[0]}</div>
        <div class="comment-user">${cm.author}</div>
        <div class="comment-time">${getTimeAgo(cm.time)}</div>
      </div>
      <div class="comment-text">${cm.text}</div>
    </div>
  `).join('') : '<p style="color:var(--text3);font-size:0.85rem">No comments yet. Be the first!</p>';

  document.getElementById('campaignModalContent').innerHTML = `
    <div class="cm-image" style="background:linear-gradient(135deg,${c.color}33,${c.color}55)">
      <span style="font-size:5rem">${c.emoji}</span>
    </div>
    <div class="cm-meta">
      <span class="cm-type">${TYPE_LABELS[c.type]}</span>
      <span class="cm-date">${getTimeAgo(c.createdAt)}</span>
      ${c.trending ? '<span class="cm-type" style="background:rgba(239,68,68,0.15);color:#f87171">🔥 Trending</span>' : ''}
      <span class="cm-type" style="background:rgba(16,185,129,0.15);color:#34d399">👁️ ${c.views?.toLocaleString()} views</span>
    </div>
    <h2 class="cm-title">${c.title}</h2>
    <div class="cm-hook">"${c.hook}"</div>
    <p class="cm-desc">${c.description}</p>
    <div class="cm-author">
      <div class="cm-author-avatar" style="background:${c.color}">${c.authorName[0]}</div>
      <div>
        <div class="cm-author-name">${c.authorName}</div>
        <div class="cm-author-sub">@${c.authorUsername} · ${c.industry} Industry</div>
      </div>
    </div>
    <div class="card-tags" style="margin-bottom:16px">
      ${c.tags.map(t => `<span class="tag">#${t}</span>`).join('')}
    </div>
    
    <!-- Viral Score + DNA Mini -->
    <div class="viral-score-container" style="margin-bottom:20px">
      <h4>🔮 Viral Score: ${c.viralScore}/100</h4>
      <div class="viral-score-bar">
        <div class="vs-fill" style="width:${c.viralScore}%"></div>
      </div>
      <div class="vs-details">${c.shares?.toLocaleString()} shares · ${c.views?.toLocaleString()} views · ${c.comments.length} comments</div>
      ${renderDNAMini(getQuickDNA(c))}
    </div>

    <div class="cm-actions">
      <button class="btn-primary ${voted ? 'voted' : ''}" id="cmVoteBtn_${c.id}"
              onclick="voteCampaignModal('${c.id}', this)">
        ${voted ? `✅ ${c.votes.toLocaleString()} Votes` : `🔥 Vote — ${c.votes.toLocaleString()}`}
      </button>
      <button class="btn-secondary" onclick="openShare('${c.id}', event)">
        <i class="fas fa-share-alt"></i> Share
      </button>
      <button class="btn-ghost" onclick="generateEmbed('${c.id}')">
        <i class="fas fa-code"></i> Embed
      </button>
      <button class="btn-ghost" onclick="closeModal('campaignModal')">Close</button>
    </div>

    <!-- Reactions -->
    <div class="reaction-bar" style="margin:16px 0">
      ${Object.entries(c.reactions).map(([emoji, count]) => `
        <button class="reaction-btn" onclick="react('${c.id}', '${emoji}', this)">
          ${emoji} <span class="reaction-count">${count}</span>
        </button>
      `).join('')}
    </div>

    <!-- Comments -->
    <div class="cm-comments">
      <h4>💬 Comments (${c.comments.length})</h4>
      <div class="comment-input-row">
        <input type="text" id="commentInput_${c.id}" placeholder="${State.currentUser ? 'Add a comment...' : 'Login to comment'}" 
               ${!State.currentUser ? 'disabled' : ''}
               onkeydown="if(event.key==='Enter') addComment('${c.id}')"/>
        <button class="btn-primary" onclick="addComment('${c.id}')">Send</button>
      </div>
      <div class="comment-list" id="commentList_${c.id}">${commentsHtml}</div>
    </div>
  `;

  openModal('campaignModal');
  // Scroll modal to top
  setTimeout(() => {
    const modal = document.querySelector('#campaignModal .modal');
    if (modal) modal.scrollTop = 0;
  }, 50);
}

// ─── Voting ────────────────────────────────────────────────────
function vote(id, e) {
  if (e) e.stopPropagation();

  if (!State.currentUser) {
    showToast('Login to vote for campaigns!', 'warning');
    openModal('authModal');
    return;
  }

  const c = State.campaigns.find(c => c.id === id);
  if (!c) return;

  if (c.votedBy?.includes(State.currentUser.id)) {
    showToast("You've already voted for this campaign!", 'info');
    return;
  }

  c.votes++;
  c.votedBy = [...(c.votedBy || []), State.currentUser.id];

  // Persist vote
  const votes = JSON.parse(localStorage.getItem('vf_votes') || '{}');
  votes[id] = (votes[id] || 0) + 1;
  localStorage.setItem('vf_votes', JSON.stringify(votes));

  // Confetti burst on every vote!
  Animations.launchConfetti();

  // Animate vote count on card
  if (e) {
    const btn = e.target.closest('.vote-btn') || e.target;
    if (btn) {
      btn.classList.add('voted');
      btn.style.transform = 'scale(1.3)';
      setTimeout(() => { btn.style.transform = ''; }, 300);
    }
  }

  showToast(`🔥 Vote cast! "${c.title.substring(0,30)}..." is rising!`, 'success');

  // Re-render with rank change animations
  renderCampaigns();
  renderHomeTrending();
  renderLeaderboardAnimated();
  renderVelocityList();
  updateAnalyticsNumbers();

  // Particle burst
  if (window.particleSystem && e) {
    for (let i = 0; i < 10; i++) {
      window.particleSystem.particles.push(window.particleSystem.createParticle(e.clientX, e.clientY));
    }
  }
}

function react(id, emoji, btn) {
  const c = State.campaigns.find(c => c.id === id);
  if (!c) return;
  if (!c.reactions) c.reactions = {};
  if (!c.reactions[emoji]) c.reactions[emoji] = 0;
  c.reactions[emoji]++;

  // Update count on button
  if (btn) {
    const countEl = btn.querySelector('.reaction-count');
    if (countEl) countEl.textContent = c.reactions[emoji];
    btn.classList.add('active');
    btn.style.transform = 'scale(1.4)';
    setTimeout(() => btn.style.transform = '', 300);

    // Float emoji upward
    const float = document.createElement('div');
    float.textContent = emoji;
    float.style.cssText = `
      position:fixed;
      font-size:1.8rem;
      pointer-events:none;
      z-index:9999;
      animation:floatUp 1.2s ease forwards;
    `;
    const rect = btn.getBoundingClientRect();
    float.style.left = rect.left + rect.width / 2 - 14 + 'px';
    float.style.top = rect.top + 'px';
    document.body.appendChild(float);
    setTimeout(() => float.remove(), 1200);
  }

  // Add float animation if not exists
  if (!document.getElementById('floatUpStyle')) {
    const s = document.createElement('style');
    s.id = 'floatUpStyle';
    s.textContent = `@keyframes floatUp {
      0%   { transform: translateY(0) scale(1); opacity: 1; }
      100% { transform: translateY(-80px) scale(1.4); opacity: 0; }
    }`;
    document.head.appendChild(s);
  }
}

function addComment(id) {
  if (!State.currentUser) { showToast('Login to comment', 'warning'); return; }
  const input = document.getElementById(`commentInput_${id}`);
  if (!input || !input.value.trim()) return;

  const c = State.campaigns.find(c => c.id === id);
  if (!c) return;

  const comment = {
    id: `cm_${Date.now()}`,
    author: State.currentUser.name,
    text: input.value.trim(),
    time: new Date().toISOString(),
  };

  c.comments.unshift(comment);
  input.value = '';

  const list = document.getElementById(`commentList_${id}`);
  if (list) {
    const el = document.createElement('div');
    el.className = 'comment-item';
    el.innerHTML = `
      <div class="comment-top">
        <div class="comment-avatar">${comment.author[0]}</div>
        <div class="comment-user">${comment.author}</div>
        <div class="comment-time">Just now</div>
      </div>
      <div class="comment-text">${comment.text}</div>
    `;
    el.style.animation = 'fadeIn 0.3s ease';
    list.prepend(el);
  }

  showToast('Comment added!', 'success');
}

// ─── Share ─────────────────────────────────────────────────────
function openShare(id, e) {
  if (e) e.stopPropagation();
  const c = State.campaigns.find(c => c.id === id);
  if (!c) return;
  State.shareTarget = c;

  const link = `${window.location.origin}${window.location.pathname}?campaign=${id}`;
  const el = document.getElementById('shareLink');
  if (el) el.value = link;

  openModal('shareModal');
}

function copyShareLink() {
  const link = document.getElementById('shareLink');
  if (!link) return;
  navigator.clipboard.writeText(link.value).then(() => {
    showToast('Link copied to clipboard! 📋', 'success');
  });
}

function shareOn(platform) {
  const c = State.shareTarget;
  if (!c) return;
  c.shares = (c.shares || 0) + 1;
  const text = `🔥 Check out this viral campaign: "${c.title}" — ${c.hook}`;
  const url = encodeURIComponent(`${window.location.href}`);
  const encoded = encodeURIComponent(text);

  const urls = {
    twitter: `https://twitter.com/intent/tweet?text=${encoded}&url=${url}`,
    linkedin: `https://linkedin.com/shareArticle?mini=true&url=${url}&title=${encodeURIComponent(c.title)}`,
    whatsapp: `https://wa.me/?text=${encoded}%20${url}`,
    reddit: `https://reddit.com/submit?url=${url}&title=${encodeURIComponent(c.title)}`,
    instagram: null,
  };

  if (urls[platform]) {
    window.open(urls[platform], '_blank', 'width=600,height=400');
  } else {
    showToast('Copy the link and share it on Instagram!', 'info');
  }

  showToast(`Sharing on ${platform}! 🚀`, 'success');
  closeModal('shareModal');
}

// ─── Leaderboard ──────────────────────────────────────────────
function renderLeaderboard(filter = 'all') {
  let sorted = [...State.campaigns].sort((a, b) => b.votes - a.votes);

  // Render Podium
  const podium = document.getElementById('podiumContainer');
  if (podium) {
    const top3 = sorted.slice(0, 3);
    const order = [1, 0, 2]; // Silver(left), Gold(center-tallest), Bronze(right)
    podium.innerHTML = order.map(idx => {
      const c = top3[idx];
      if (!c) return '';
      const medals = ['🥇', '🥈', '🥉'];
      const heights = ['80px', '60px', '45px'];
      return `
        <div class="podium-item" data-rank="${idx}" onclick="openCampaign('${c.id}')">
          <div class="podium-card">
            <div class="podium-rank">${medals[idx]}</div>
            <span class="podium-emoji">${c.emoji}</span>
            <div class="podium-title">${c.title.substring(0, 40)}...</div>
            <div class="podium-author">by ${c.authorName}</div>
            <div class="podium-votes">${c.votes.toLocaleString()} votes</div>
          </div>
          <div class="podium-pedestal" style="height:${heights[idx]}"></div>
        </div>
      `;
    }).join('');
  }

  // Render Table
  const table = document.getElementById('leaderboardTable');
  if (!table) return;

  if (filter === 'week') {
    const week = new Date();
    week.setDate(week.getDate() - 7);
    sorted = sorted.filter(c => new Date(c.createdAt) > week);
  } else if (filter === 'today') {
    const today = new Date();
    today.setHours(0,0,0,0);
    sorted = sorted.filter(c => new Date(c.createdAt) > today);
    if (sorted.length === 0) sorted = [...State.campaigns].sort((a,b) => b.votes - a.votes).slice(0, 10);
  }

  table.innerHTML = sorted.slice(0, 20).map((c, i) => {
    const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
    const rankDisplay = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
    const changeSign = Math.random() > 0.4 ? 'up' : 'down';
    const changeNum = Math.floor(Math.random() * 5);

    return `
      <div class="lb-row" data-id="${c.id}" onclick="openCampaign('${c.id}')">
        <div class="lb-rank ${rankClass}">${rankDisplay}</div>
        <div class="lb-emoji">${c.emoji}</div>
        <div class="lb-info">
          <div class="lb-title">
            ${c.id === getMostCreativeId() ? '<span style="font-size:0.65rem;background:rgba(236,72,153,0.15);color:#ec4899;padding:2px 7px;border-radius:6px;font-weight:800;margin-right:6px;vertical-align:middle">🎨 MOST CREATIVE</span>' : ''}
            ${c.title}
          </div>
          <div class="lb-author">by ${c.authorName} · ${TYPE_LABELS[c.type]}</div>
        </div>
        <div class="lb-change ${changeSign}">
          ${changeSign === 'up' ? `▲ ${changeNum}` : `▼ ${changeNum}`}
        </div>
        <div class="lb-votes">
          <div class="lb-vote-count">${c.votes.toLocaleString()}</div>
          <div class="lb-vote-label">votes</div>
        </div>
      </div>
    `;
  }).join('');
}

function filterLeaderboard(period, btn) {
  document.querySelectorAll('.table-filters .filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderLeaderboard(period);
}

// ─── Analytics ────────────────────────────────────────────────
function renderAnalytics() {
  updateAnalyticsNumbers();
  renderAnalyticsCharts();
}

function updateAnalyticsNumbers() {
  const totalVotes = State.campaigns.reduce((s, c) => s + c.votes, 0);
  const totalViews = State.campaigns.reduce((s, c) => s + (c.views || c.votes * 5), 0);
  const totalShares = State.campaigns.reduce((s, c) => s + (c.shares || 0), 0);
  animateNum('totalViews', totalViews);
  animateNum('totalVotesAnalytics', totalVotes);
  animateNum('totalShares', totalShares);
  animateNum('activeUsers', Math.floor(totalVotes / 4));
}

function animateNum(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  Animations.animateCounter(el, target, 1500);
}

// Track chart instances to destroy before re-creating
const _charts = {};

function renderAnalyticsCharts() {
  // --- Vote Activity Line Chart (Chart.js) ---
  const voteCanvas = document.getElementById('voteChart');
  if (voteCanvas) {
    if (_charts.vote) _charts.vote.destroy();
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const voteData = days.map(() => Math.floor(Math.random() * 8000) + 2000);
    const prevData = voteData.map(v => Math.floor(v * (0.6 + Math.random() * 0.3)));
    _charts.vote = new Chart(voteCanvas, {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            label: 'This Week',
            data: voteData,
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99,102,241,0.1)',
            borderWidth: 3,
            pointBackgroundColor: '#6366f1',
            pointRadius: 5,
            tension: 0.4,
            fill: true,
          },
          {
            label: 'Last Week',
            data: prevData,
            borderColor: 'rgba(255,255,255,0.2)',
            backgroundColor: 'transparent',
            borderWidth: 2,
            borderDash: [5, 5],
            pointRadius: 3,
            tension: 0.4,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { labels: { color: 'rgba(255,255,255,0.6)', font: { size: 11 } } } },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)' } },
          y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: 'rgba(255,255,255,0.5)', callback: v => v.toLocaleString() } }
        }
      }
    });
  }

  // --- Campaign Types Doughnut Chart ---
  const typeCanvas = document.getElementById('typeChart');
  if (typeCanvas) {
    if (_charts.type) _charts.type.destroy();
    const typeData = [
      State.campaigns.filter(c => c.type === 'viral-hook').length,
      State.campaigns.filter(c => c.type === 'meme-ad').length,
      State.campaigns.filter(c => c.type === 'video-concept').length,
      State.campaigns.filter(c => c.type === 'campaign-concept').length,
    ];
    _charts.type = new Chart(typeCanvas, {
      type: 'doughnut',
      data: {
        labels: ['Viral Hook', 'Meme Ad', 'Video Concept', 'Campaign'],
        datasets: [{
          data: typeData,
          backgroundColor: ['#6366f1', '#f59e0b', '#ef4444', '#10b981'],
          borderColor: 'transparent',
          borderWidth: 0,
          hoverOffset: 8,
        }]
      },
      options: {
        responsive: true,
        cutout: '65%',
        plugins: {
          legend: { position: 'bottom', labels: { color: 'rgba(255,255,255,0.6)', padding: 12, font: { size: 11 } } }
        }
      }
    });
  }

  // --- Vote Velocity Radar ---
  const radarCanvas = document.getElementById('analyticsRadar');
  if (radarCanvas) {
    if (_charts.radar) _charts.radar.destroy();
    _charts.radar = new Chart(radarCanvas, {
      type: 'radar',
      data: {
        labels: ['Creativity', 'Virality', 'Engagement', 'Reach', 'Retention', 'Shares'],
        datasets: [{
          label: 'Platform Average',
          data: [82, 74, 68, 79, 55, 63],
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99,102,241,0.15)',
          borderWidth: 2,
          pointBackgroundColor: '#6366f1',
        }, {
          label: 'Top Campaign',
          data: [97, 95, 91, 88, 78, 85],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#10b981',
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { labels: { color: 'rgba(255,255,255,0.6)', font: { size: 11 } } } },
        scales: {
          r: {
            grid: { color: 'rgba(255,255,255,0.08)' },
            angleLines: { color: 'rgba(255,255,255,0.08)' },
            ticks: { display: false },
            pointLabels: { color: 'rgba(255,255,255,0.6)', font: { size: 11 } }
          }
        }
      }
    });
  }

  // --- Hourly Heatmap ---
  Animations.renderHeatmap('heatmapContainer');

  // --- Category Bars ---
  const catBars = document.getElementById('categoryBars');
  if (catBars) {
    const cats = [
      { name: 'Technology', value: 87 }, { name: 'Fashion', value: 74 },
      { name: 'Food & Drink', value: 68 }, { name: 'Health', value: 56 },
      { name: 'Finance', value: 45 }, { name: 'Education', value: 38 },
    ];
    const totalVotes = State.campaigns.reduce((s, c) => s + c.votes, 0);
    catBars.innerHTML = cats.map(c => {
      const votes = Math.floor((c.value / 100) * totalVotes * 0.2);
      return `
        <div class="cat-row">
          <div class="cat-label">${c.name}</div>
          <div class="cat-bar-wrap">
            <div class="cat-bar" style="width:0;transition:width 1s cubic-bezier(0.4,0,0.2,1)" data-width="${c.value}%"></div>
          </div>
          <div class="cat-val">${votes.toLocaleString()} votes</div>
        </div>
      `;
    }).join('');
    setTimeout(() => {
      catBars.querySelectorAll('.cat-bar').forEach(b => b.style.width = b.getAttribute('data-width'));
    }, 200);
  }

  updateAnalyticsNumbers();
}

// ─── Create Campaign ──────────────────────────────────────────
let currentStep = 1;

function nextStep(step) {
  if (step > currentStep) {
    // Validate current step
    if (currentStep === 1) {
      const title = document.getElementById('campTitle')?.value.trim();
      if (!title) { showToast('Please enter a campaign title', 'warning'); return; }
      if (!State.selectedType) { showToast('Please select a campaign type', 'warning'); return; }
    }
    if (currentStep === 2) {
      const hook = document.getElementById('campHook')?.value.trim();
      const desc = document.getElementById('campDesc')?.value.trim();
      if (!hook) { showToast('Please enter your viral hook', 'warning'); return; }
      if (!desc) { showToast('Please enter a campaign description', 'warning'); return; }
    }
  }

  // Update step UI
  document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.progress-step').forEach((ps, i) => {
    ps.classList.remove('active', 'done');
    if (i + 1 < step) ps.classList.add('done');
    if (i + 1 === step) ps.classList.add('active');
  });

  const stepEl = document.getElementById(`formStep${step}`);
  if (stepEl) stepEl.classList.add('active');

  currentStep = step;

  if (step === 3) {
    generateReview();
  }
}

function selectType(type, el) {
  State.selectedType = type;
  document.querySelectorAll('.type-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  updatePreview();
}

function selectColor(color, el) {
  State.selectedColor = color;
  document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
  if (el) el.classList.add('active');
  updatePreview();
}

function togglePlatform(el, platform) {
  el.classList.toggle('selected');
  if (el.classList.contains('selected')) {
    State.selectedPlatforms.push(platform);
  } else {
    State.selectedPlatforms = State.selectedPlatforms.filter(p => p !== platform);
  }
}

// Tags
function addTag(e) {
  if (e.key !== 'Enter') return;
  const input = document.getElementById('tagInput');
  const val = input.value.trim().toLowerCase().replace(/\s+/g, '-');
  if (!val || State.tags.includes(val) || State.tags.length >= 5) return;
  State.tags.push(val);
  input.value = '';
  renderTags();
}

function removeTag(tag) {
  State.tags = State.tags.filter(t => t !== tag);
  renderTags();
}

function renderTags() {
  const display = document.getElementById('tagsDisplay');
  if (!display) return;
  display.innerHTML = State.tags.map(t => `
    <span class="tag-chip">#${t}<button onclick="removeTag('${t}')">×</button></span>
  `).join('');
}

// Char counters
function updateHookCount() {
  const val = document.getElementById('campHook')?.value.length || 0;
  const el = document.getElementById('hookCount');
  if (el) el.textContent = val;
}

function updateDescCount() {
  const val = document.getElementById('campDesc')?.value.length || 0;
  const el = document.getElementById('descCount');
  if (el) el.textContent = val;
}

// Title counter
document.addEventListener('input', (e) => {
  if (e.target.id === 'campTitle') {
    const el = document.getElementById('titleCount');
    if (el) el.textContent = e.target.value.length;
  }
});

// Live Preview
function updatePreview() {
  const title = document.getElementById('campTitle')?.value || '';
  const hook = document.getElementById('campHook')?.value || '';
  const type = State.selectedType || '';
  const color = State.selectedColor;
  const preview = document.getElementById('livePreview');

  if (!preview) return;

  if (!title && !hook) {
    preview.innerHTML = '<div class="preview-placeholder"><p>Start filling in the form to see your campaign preview here...</p></div>';
    return;
  }

  const audience = document.getElementById('campAudience')?.value || '';
  const typeEmoji = type === 'viral-hook' ? '🪝' : type === 'meme-ad' ? '😂' : type === 'video-concept' ? '🎬' : type === 'campaign-concept' ? '🚀' : '⚡';

  preview.innerHTML = `
    <div class="preview-camp-image" style="background:linear-gradient(135deg,${color}33,${color}55);font-size:3.5rem;display:flex;align-items:center;justify-content:center;padding:32px;border-radius:12px 12px 0 0">
      ${typeEmoji}
    </div>
    ${type ? `<div class="preview-camp-type" style="display:inline-block;margin:10px 0 4px;padding:3px 10px;border-radius:20px;font-size:0.7rem;font-weight:700;text-transform:uppercase;background:${color}22;color:${color}">${TYPE_LABELS[type]}</div>` : ''}
    <div class="preview-camp-title" style="font-size:1rem;font-weight:700;margin:6px 0;line-height:1.4">${title || 'Your Campaign Title'}</div>
    <div class="preview-camp-hook" style="font-size:0.82rem;color:var(--text2);font-style:italic;margin-bottom:8px">"${hook || 'Your viral hook will appear here...'}"</div>
    ${audience ? `<div style="font-size:0.75rem;color:var(--text3)">🎯 ${audience}</div>` : ''}
    ${State.tags.length ? `<div style="margin-top:8px">${State.tags.map(t=>`<span class="tag">#${t}</span>`).join('')}</div>` : ''}
    <div style="margin-top:12px;padding-top:12px;border-top:1px solid var(--border);display:flex;gap:10px;font-size:0.8rem;color:var(--text3)">
      <span>🔥 0 votes</span><span>👁️ 0 views</span><span>🔗 0 shares</span>
    </div>
  `;
}

// ─── Utility ──────────────────────────────────────────────────
function getTimeAgo(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
}

function initCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    observer.observe(el);
  });
}

function initObservers() {
  document.querySelectorAll('.section-block, .hero-stats, .steps-grid, .analytics-grid').forEach(el => {
    observer.observe(el);
  });
  initCounters();
}

function updateLiveCounter() {
  State.liveCount = Math.floor(Math.random() * 80) + 40;
  const el = document.getElementById('liveCount');
  if (el) el.textContent = State.liveCount;
}

// ─── Theme Toggle ─────────────────────────────────────────────
function toggleTheme() {
  State.isDark = !State.isDark;
  document.body.classList.toggle('light-mode', !State.isDark);
  const icon = document.getElementById('themeIcon');
  if (icon) {
    icon.className = State.isDark ? 'fas fa-moon' : 'fas fa-sun';
  }
  showToast(State.isDark ? 'Dark mode on 🌙' : 'Light mode on ☀️', 'info');
}

// ─── Mobile Menu ──────────────────────────────────────────────
function toggleMobileMenu() {
  const navLinks = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (!navLinks) return;
  navLinks.classList.toggle('open');
  hamburger?.classList.toggle('active');
}

// ─── Open Create with pre-selected type ───────────────────────
function openCreateWithType(type) {
  showSection('create');
  // After transition, select the type
  setTimeout(() => {
    const el = document.querySelector(`.type-option[onclick*="${type}"]`);
    if (el) selectType(type, el);
  }, 200);
}

// ─── Format Text (description toolbar) ───────────────────────
function formatText(style) {
  const ta = document.getElementById('campDesc');
  if (!ta) return;
  const start = ta.selectionStart;
  const end = ta.selectionEnd;
  const selected = ta.value.substring(start, end);

  if (style === 'bold') {
    const wrapped = `**${selected || 'bold text'}**`;
    ta.value = ta.value.substring(0, start) + wrapped + ta.value.substring(end);
  } else if (style === 'italic') {
    const wrapped = `_${selected || 'italic text'}_`;
    ta.value = ta.value.substring(0, start) + wrapped + ta.value.substring(end);
  } else if (style === 'emoji') {
    const emojis = ['🔥','🚀','💡','⚡','🎯','💎','✨','🏆','💥','🌟'];
    const pick = emojis[Math.floor(Math.random() * emojis.length)];
    ta.value = ta.value.substring(0, start) + pick + ta.value.substring(end);
  }
  updatePreview();
  updateDescCount();
}

// ─── AI Suggest ───────────────────────────────────────────────
function aiSuggest() {
  const btn = document.querySelector('.toolbar-btn[onclick="aiSuggest()"]');
  if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Thinking...'; btn.disabled = true; }

  const suggestions = [
    "What if your brand disappeared tomorrow — would anyone notice? Make them notice. Make them care. Make them tell the story for you.",
    "Stop selling the product. Start selling the transformation. Show the before and after that no competitor dares to show.",
    "The most powerful ad you can run right now costs ₹0. It's the truth about your customer that nobody else is brave enough to say.",
    "Gen Z doesn't buy products. They buy identities. The brands winning right now aren't louder — they're realer.",
    "Your competitor is spending lakhs on ads. You're spending zero. That's your advantage — authenticity can't be bought.",
  ];
  const pick = suggestions[Math.floor(Math.random() * suggestions.length)];

  setTimeout(() => {
    const ta = document.getElementById('campDesc');
    if (ta && !ta.value.trim()) {
      ta.value = pick;
    } else if (ta) {
      ta.value += '\n\n' + pick;
    }
    updatePreview();
    updateDescCount();
    if (btn) { btn.innerHTML = '<i class="fas fa-magic"></i> AI Boost'; btn.disabled = false; }
    showToast('AI suggestion added! ✨', 'success');
  }, 1200);
}

// ─── File Upload ──────────────────────────────────────────────
function allowDrop(e) {
  e.preventDefault();
  document.getElementById('uploadZone')?.classList.add('dragover');
}

function dragLeave() {
  document.getElementById('uploadZone')?.classList.remove('dragover');
}

function handleDrop(e) {
  e.preventDefault();
  dragLeave();
  const file = e.dataTransfer?.files[0];
  if (file && file.type.startsWith('image/')) processFile(file);
}

function handleFile(e) {
  const file = e.target.files[0];
  if (file) processFile(file);
}

function processFile(file) {
  if (file.size > 10 * 1024 * 1024) { showToast('File too large. Max 10MB.', 'error'); return; }
  State.uploadedFile = file;
  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.getElementById('uploadPreview');
    const content = document.getElementById('uploadZone')?.querySelector('.upload-content');
    if (preview) {
      preview.innerHTML = `
        <div style="position:relative;display:inline-block">
          <img src="${e.target.result}" style="max-width:100%;max-height:200px;border-radius:8px;display:block"/>
          <button onclick="clearUpload()" style="position:absolute;top:-8px;right:-8px;background:#ef4444;border:none;color:white;border-radius:50%;width:24px;height:24px;cursor:pointer;font-size:14px">×</button>
        </div>`;
      preview.style.display = 'block';
    }
    if (content) content.style.display = 'none';
    showToast('Image uploaded! 📸', 'success');
  };
  reader.readAsDataURL(file);
}

function clearUpload() {
  State.uploadedFile = null;
  const preview = document.getElementById('uploadPreview');
  const content = document.getElementById('uploadZone')?.querySelector('.upload-content');
  if (preview) { preview.innerHTML = ''; preview.style.display = 'none'; }
  if (content) content.style.display = '';
  const fi = document.getElementById('fileInput');
  if (fi) fi.value = '';
}

// ─── Preview Device Toggle ────────────────────────────────────
function setPreviewDevice(device, btn) {
  const pd = document.getElementById('previewDevice');
  if (pd) {
    pd.className = `preview-device ${device}`;
  }
  document.querySelectorAll('.pdt-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

// ─── Generate Review (Step 3) ─────────────────────────────────
function generateReview() {
  const title = document.getElementById('campTitle')?.value.trim() || '';
  const hook = document.getElementById('campHook')?.value.trim() || '';
  const desc = document.getElementById('campDesc')?.value.trim() || '';
  const type = State.selectedType || '';
  const industry = document.getElementById('campIndustry')?.value || '';
  const audience = document.getElementById('campAudience')?.value.trim() || '';
  const color = State.selectedColor;

  // Render review card
  const reviewEl = document.getElementById('reviewPreview');
  if (reviewEl) {
    const typeEmoji = type === 'viral-hook' ? '🪝' : type === 'meme-ad' ? '😂' : type === 'video-concept' ? '🎬' : '🚀';
    reviewEl.innerHTML = `
      <div style="background:linear-gradient(135deg,${color}22,${color}44);border-radius:12px;padding:20px;margin-bottom:16px;border:1px solid ${color}33">
        <div style="font-size:2.5rem;margin-bottom:10px">${typeEmoji}</div>
        <div style="display:inline-block;padding:3px 10px;border-radius:20px;font-size:0.7rem;font-weight:700;text-transform:uppercase;background:${color}22;color:${color};margin-bottom:10px">${TYPE_LABELS[type] || type}</div>
        <h3 style="font-size:1.1rem;font-weight:700;margin-bottom:8px">${title}</h3>
        <p style="font-style:italic;color:var(--text2);font-size:0.88rem;margin-bottom:8px">"${hook}"</p>
        <p style="font-size:0.82rem;color:var(--text3);line-height:1.6">${desc.substring(0, 200)}${desc.length > 200 ? '...' : ''}</p>
        ${industry ? `<div style="margin-top:10px;font-size:0.78rem;color:var(--text3)">Industry: <strong>${industry}</strong></div>` : ''}
        ${audience ? `<div style="font-size:0.78rem;color:var(--text3)">Audience: <strong>${audience}</strong></div>` : ''}
        ${State.selectedPlatforms.length ? `<div style="font-size:0.78rem;color:var(--text3);margin-top:4px">Platforms: <strong>${State.selectedPlatforms.join(', ')}</strong></div>` : ''}
        ${State.tags.length ? `<div style="margin-top:10px">${State.tags.map(t=>`<span class="tag">#${t}</span>`).join('')}</div>` : ''}
      </div>
    `;
  }

  // Calculate viral score
  let score = 40;
  if (title.length > 20) score += 10;
  if (hook.length > 50) score += 15;
  if (desc.length > 200) score += 10;
  if (State.tags.length >= 3) score += 8;
  if (State.selectedPlatforms.length >= 2) score += 7;
  if (industry) score += 5;
  if (audience) score += 5;
  score = Math.min(score, 98);

  const scoreEl = document.getElementById('viralScoreFill');
  const detailsEl = document.getElementById('vsDetails');
  if (scoreEl) {
    scoreEl.style.width = '0%';
    setTimeout(() => { scoreEl.style.width = score + '%'; scoreEl.style.background = score > 75 ? '#10b981' : score > 55 ? '#f59e0b' : '#ef4444'; }, 100);
  }
  if (detailsEl) {
    const label = score > 75 ? '🔥 High viral potential!' : score > 55 ? '✨ Good — can go further' : '💡 Add more detail to boost your score';
    detailsEl.textContent = `${score}/100 — ${label}`;
  }

  // AI Tips
  const tips = [];
  if (hook.length < 50) tips.push('Make your hook punchier — aim for 80–150 characters that demand attention.');
  if (desc.length < 150) tips.push('Add more depth to your description — bold, vivid ideas get more votes.');
  if (!State.selectedPlatforms.length) tips.push('Select at least 2 platforms — multi-platform campaigns get 3x more reach.');
  if (State.tags.length < 3) tips.push('Add 3–5 tags to help people discover your campaign.');
  if (!audience) tips.push('Define your target audience — specificity makes campaigns more believable.');
  if (tips.length === 0) tips.push('Looks great! Strong campaigns are specific, bold, and visual. You\'re on the right track.');

  const tipsList = document.getElementById('tipsList');
  if (tipsList) {
    tipsList.innerHTML = tips.map(t => `<li style="margin-bottom:6px;font-size:0.85rem;color:var(--text2)">${t}</li>`).join('');
  }
}

// ─── Submit Campaign ──────────────────────────────────────────
function submitCampaign() {
  if (!document.getElementById('termsCheck')?.checked) {
    showToast('Please agree to the contest terms first', 'warning');
    return;
  }

  const title = document.getElementById('campTitle')?.value.trim();
  const hook = document.getElementById('campHook')?.value.trim();
  const desc = document.getElementById('campDesc')?.value.trim();

  if (!title || !hook || !desc) {
    showToast('Please complete all required fields', 'warning');
    return;
  }

  const btn = document.getElementById('submitBtn');
  if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Launching...'; btn.disabled = true; }

  setTimeout(() => {
    const newCampaign = {
      id: `camp_user_${Date.now()}`,
      title,
      hook,
      description: desc,
      type: State.selectedType || 'viral-hook',
      industry: document.getElementById('campIndustry')?.value || 'Other',
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      color: State.selectedColor,
      votes: 0,
      views: 0,
      shares: 0,
      comments: [],
      reactions: { '🔥': 0, '❤️': 0, '🚀': 0, '💯': 0 },
      authorName: State.currentUser?.name || 'Anonymous',
      authorUsername: State.currentUser?.username || 'anonymous',
      authorId: State.currentUser?.id || 'anon',
      tags: [...State.tags],
      platforms: [...State.selectedPlatforms],
      createdAt: new Date().toISOString(),
      votedBy: [],
      viralScore: Math.floor(Math.random() * 20) + 60,
      trending: false,
      featured: false,
    };

    State.campaigns.unshift(newCampaign);

    // Persist user's campaigns in localStorage
    const saved = JSON.parse(localStorage.getItem('vf_my_campaigns') || '[]');
    saved.unshift(newCampaign);
    localStorage.setItem('vf_my_campaigns', JSON.stringify(saved));

    // Reset form
    ['campTitle','campHook','campDesc','campAudience'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.value = '';
    });
    State.selectedType = null;
    State.selectedColor = '#6366f1';
    State.selectedPlatforms = [];
    State.tags = [];
    renderTags();
    document.querySelectorAll('.type-option,.color-swatch,.platform-opt').forEach(el => el.classList.remove('selected','active'));
    document.querySelector('.color-swatch')?.classList.add('active');
    clearUpload();
    currentStep = 1;
    nextStep(1);
    document.getElementById('termsCheck').checked = false;

    if (btn) { btn.innerHTML = '<i class="fas fa-rocket"></i> Launch Campaign!'; btn.disabled = false; }

    Animations.launchConfetti();
    showToast('🚀 Campaign launched! Now share it and get votes!', 'success');

    renderCampaigns();
    renderHomeTrending();
    renderLeaderboard();

    setTimeout(() => showSection('campaigns'), 1800);
  }, 1000);
}

// ─── Profile ──────────────────────────────────────────────────
function renderProfile() {
  const container = document.getElementById('profileContent');
  if (!container) return;

  const user = State.currentUser;
  if (!user) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-state-icon">👤</span>
        <h3>Not logged in</h3>
        <p>Please login to view your profile.</p>
        <button class="btn-primary" onclick="openModal('authModal')" style="margin-top:16px">Login</button>
      </div>`;
    return;
  }

  const myCampaigns = State.campaigns.filter(c => c.authorId === user.id);
  const totalVotes = myCampaigns.reduce((s, c) => s + c.votes, 0);
  const totalViews = myCampaigns.reduce((s, c) => s + (c.views || 0), 0);

  container.innerHTML = `
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-user"></i> My Profile</h1>
    </div>
    <div style="max-width:700px;margin:0 auto">
      <div style="background:var(--surface);border-radius:var(--radius);padding:32px;border:1px solid var(--border);margin-bottom:24px;display:flex;gap:24px;align-items:center;flex-wrap:wrap">
        <div style="width:80px;height:80px;border-radius:50%;background:var(--gradient);display:flex;align-items:center;justify-content:center;font-size:2rem;font-weight:700;flex-shrink:0">
          ${user.name[0].toUpperCase()}
        </div>
        <div>
          <h2 style="font-size:1.4rem;font-weight:700;margin-bottom:4px">${user.name}</h2>
          <div style="color:var(--text3);font-size:0.88rem;margin-bottom:8px">@${user.username} · ${user.email}</div>
          <div style="display:flex;gap:20px;flex-wrap:wrap">
            <div style="text-align:center"><div style="font-size:1.4rem;font-weight:700;color:var(--primary)">${myCampaigns.length}</div><div style="font-size:0.75rem;color:var(--text3)">Campaigns</div></div>
            <div style="text-align:center"><div style="font-size:1.4rem;font-weight:700;color:var(--secondary)">${totalVotes.toLocaleString()}</div><div style="font-size:0.75rem;color:var(--text3)">Votes Earned</div></div>
            <div style="text-align:center"><div style="font-size:1.4rem;font-weight:700;color:var(--success)">${totalViews.toLocaleString()}</div><div style="font-size:0.75rem;color:var(--text3)">Total Views</div></div>
          </div>
        </div>
      </div>
      ${myCampaigns.length === 0 ? `
        <div class="empty-state">
          <span class="empty-state-icon">🚀</span>
          <h3>No campaigns yet</h3>
          <p>Create your first campaign and get on the leaderboard!</p>
          <button class="btn-primary" onclick="showSection('create')" style="margin-top:16px">Create Campaign</button>
        </div>` : `
        <h3 style="margin-bottom:16px;font-weight:700">My Campaigns</h3>
        <div class="campaigns-grid">${myCampaigns.map((c,i) => renderCampaignCard(c, i+1)).join('')}</div>
      `}
    </div>
  `;
}

// ─── My Campaigns ─────────────────────────────────────────────
function renderMyCampaigns() {
  const grid = document.getElementById('myCampaignsGrid');
  if (!grid) return;

  const user = State.currentUser;
  if (!user) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <span class="empty-state-icon">🔒</span>
        <h3>Login to see your campaigns</h3>
        <button class="btn-primary" onclick="openModal('authModal')" style="margin-top:16px">Login</button>
      </div>`;
    return;
  }

  const mine = State.campaigns.filter(c => c.authorId === user.id);
  if (mine.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column:1/-1">
        <span class="empty-state-icon">🚀</span>
        <h3>No campaigns yet</h3>
        <p>Launch your first campaign to appear here.</p>
        <button class="btn-primary" onclick="showSection('create')" style="margin-top:16px">Create Now</button>
      </div>`;
    return;
  }
  grid.innerHTML = mine.map((c, i) => renderCampaignCard(c, i + 1)).join('');
}
// ═══════════════════════════════════════════════════════════════
// NEW FEATURES
// ═══════════════════════════════════════════════════════════════

// ─── Viral Velocity ───────────────────────────────────────────
function calcVelocity(c) {
  const hoursAlive = Math.max(0.5, (Date.now() - new Date(c.createdAt)) / 3600000);
  return (c.votes / hoursAlive).toFixed(1);
}

function getVelocityLabel(vph) {
  const v = parseFloat(vph);
  if (v > 500) return { label: '🔥 On Fire', cls: 'fire' };
  if (v > 100) return { label: '⚡ Hot', cls: 'hot' };
  return { label: '📈 Rising', cls: '' };
}

function renderVelocityList() {
  const el = document.getElementById('velocityList');
  if (!el) return;

  // Score by recent simulated momentum (votes + recency bonus)
  const scored = State.campaigns.map(c => {
    const hoursAlive = Math.max(0.5, (Date.now() - new Date(c.createdAt)) / 3600000);
    const recencyBonus = hoursAlive < 24 ? (24 - hoursAlive) * 50 : 0;
    const vph = c.votes / hoursAlive + recencyBonus;
    return { ...c, vph: vph.toFixed(1) };
  }).sort((a, b) => parseFloat(b.vph) - parseFloat(a.vph)).slice(0, 8);

  el.innerHTML = scored.map((c, i) => {
    const { label, cls } = getVelocityLabel(c.vph);
    return `
      <div class="velocity-row" onclick="openCampaign('${c.id}')">
        <div class="velocity-rank-num">#${i + 1}</div>
        <div class="velocity-emoji">${c.emoji}</div>
        <div class="velocity-info">
          <div class="velocity-title">${c.title}</div>
          <div class="velocity-author">by ${c.authorName} · ${TYPE_LABELS[c.type]}</div>
        </div>
        <div class="velocity-badge lb-velocity ${cls}">
          <span class="vb-arrow">▲</span> ${c.vph} votes/hr
        </div>
        <div class="velocity-total">${c.votes.toLocaleString()} total</div>
      </div>
    `;
  }).join('');
}

// Add velocity to leaderboard rows
function renderLeaderboardWithVelocity(filter = 'all') {
  renderLeaderboard(filter); // existing
  // Patch velocity into each lb-row
  const table = document.getElementById('leaderboardTable');
  if (!table) return;
  const rows = table.querySelectorAll('.lb-row');
  const sorted = [...State.campaigns].sort((a, b) => b.votes - a.votes);
  rows.forEach((row, i) => {
    const c = sorted[i];
    if (!c) return;
    const vph = calcVelocity(c);
    const { label, cls } = getVelocityLabel(vph);
    const existing = row.querySelector('.lb-velocity');
    if (!existing) {
      const vEl = document.createElement('div');
      vEl.className = `lb-velocity ${cls}`;
      vEl.innerHTML = `▲ ${vph}/hr`;
      vEl.title = label;
      row.querySelector('.lb-votes')?.before(vEl);
    }
  });
}

// ─── Live Activity Feed ────────────────────────────────────────
const ACTIVITY_TEMPLATES = [
  (c) => `<span class="ti-highlight">${c.authorName}</span> <span class="ti-action">just launched</span> <span class="ti-highlight">"${c.title.substring(0,35)}..."</span> 🚀`,
  (c) => `<span class="ti-highlight">Someone from ${['Mumbai','Delhi','Bengaluru','Chennai','Hyderabad','Pune'][Math.floor(Math.random()*6)]}</span> <span class="ti-action">voted for</span> <span class="ti-highlight">"${c.title.substring(0,30)}..."</span> 🔥`,
  (c) => `<span class="ti-highlight">"${c.title.substring(0,30)}..."</span> <span class="ti-action">just jumped</span> <span class="ti-highlight">${Math.floor(Math.random()*5)+2} spots</span> on the leaderboard ⬆️`,
  (c) => `<span class="ti-highlight">${Math.floor(Math.random()*8)+3} people</span> <span class="ti-action">are viewing</span> <span class="ti-highlight">"${c.title.substring(0,30)}..."</span> right now 👀`,
  (c) => `<span class="ti-highlight">"${c.title.substring(0,30)}..."</span> <span class="ti-action">was shared on</span> <span class="ti-highlight">${['Twitter','WhatsApp','LinkedIn','Instagram'][Math.floor(Math.random()*4)]}</span> 📤`,
  (c) => `<span class="ti-highlight">${c.authorName}</span> <span class="ti-action">received their</span> <span class="ti-highlight">${Math.floor(Math.random()*500)+100}th vote</span> 🎉`,
];

function buildActivityFeed() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;

  const items = [];
  const pool = [...State.campaigns].sort(() => 0.5 - Math.random()).slice(0, 15);
  pool.forEach(c => {
    const tmpl = ACTIVITY_TEMPLATES[Math.floor(Math.random() * ACTIVITY_TEMPLATES.length)];
    items.push(tmpl(c));
  });

  const all = [...items, ...items];
  track.innerHTML = all.map(html => `
    <div class="ticker-item">
      <span class="ti-emoji">•</span>
      ${html}
    </div>
  `).join('');

  // Only start scroll on first call, not on refreshes
  if (!tickerRAF) {
    startTickerScroll(track);
  }
}

let tickerX = 0;
let tickerPaused = false;
let tickerRAF = null;
let tickerListenersBound = false;

function startTickerScroll(track) {
  if (tickerRAF) cancelAnimationFrame(tickerRAF);
  tickerX = window.innerWidth;

  // Only add listeners once
  if (!tickerListenersBound) {
    const ticker = document.getElementById('activityTicker');
    if (ticker) {
      ticker.addEventListener('mouseenter', () => tickerPaused = true);
      ticker.addEventListener('mouseleave', () => tickerPaused = false);
      tickerListenersBound = true;
    }
  }

  function step() {
    if (!tickerPaused) {
      tickerX -= 2.0;
      const trackWidth = track.scrollWidth / 2;
      if (tickerX < -trackWidth) tickerX = window.innerWidth;
      track.style.transform = `translateX(${tickerX}px)`;
    }
    tickerRAF = requestAnimationFrame(step);
  }
  step();
}

// ─── AI Hook Strength Analyzer ────────────────────────────────
async function analyzeHook() {
  const hook = document.getElementById('campHook')?.value.trim();
  if (!hook || hook.length < 10) {
    showToast('Write your hook first (at least 10 characters)', 'warning');
    return;
  }

  const btn = document.getElementById('analyzeBtn');
  const scoreDisplay = document.getElementById('hookScoreDisplay');
  const feedbackBox = document.getElementById('aiFeedbackBox');

  if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...'; btn.disabled = true; }
  if (feedbackBox) { feedbackBox.style.display = 'none'; }
  if (scoreDisplay) scoreDisplay.style.display = 'none';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a viral marketing expert. Analyze this marketing hook for viral potential and give brutally honest feedback.

Hook: "${hook}"

Respond ONLY with a JSON object (no markdown, no preamble):
{
  "score": <number 0-100>,
  "verdict": "<one punchy sentence verdict>",
  "strengths": ["<strength 1>", "<strength 2>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>"],
  "rewrite": "<one improved version of the hook>",
  "stopRate": "<estimate of % of people who would stop scrolling>"
}`
        }]
      })
    });

    const data = await response.json();
    const raw = data.content?.[0]?.text || '{}';
    let result;
    try { result = JSON.parse(raw.replace(/```json|```/g, '').trim()); }
    catch { throw new Error('Parse failed'); }

    const score = result.score || 0;
    const deg = Math.round((score / 100) * 360);
    const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444';

    // Update score ring
    const ring = document.getElementById('hookScoreRing');
    const numEl = document.getElementById('hookScoreNum');
    const textEl = document.getElementById('hookScoreText');
    if (ring) ring.style.background = `conic-gradient(${color} ${deg}deg, var(--surface3) ${deg}deg)`;
    if (numEl) numEl.textContent = score;
    if (textEl) textEl.innerHTML = `<strong>${result.verdict}</strong><br/>Stop Rate: ${result.stopRate}`;
    if (scoreDisplay) scoreDisplay.style.display = 'flex';

    // Build feedback HTML
    if (feedbackBox) {
      feedbackBox.style.display = 'block';
      feedbackBox.innerHTML = `
        ${result.strengths?.length ? `<div class="ai-section">✅ <strong>Strengths:</strong> ${result.strengths.join(' · ')}</div>` : ''}
        ${result.weaknesses?.length ? `<div class="ai-section">⚠️ <strong>Weaknesses:</strong> ${result.weaknesses.join(' · ')}</div>` : ''}
        ${result.rewrite ? `<div class="ai-section">💡 <strong>Stronger version:</strong> <em>"${result.rewrite}"</em>
          <button onclick="useRewrite(this)" data-text="${result.rewrite.replace(/"/g,'&quot;')}" 
            style="margin-left:8px;padding:3px 10px;font-size:0.75rem;border:1px solid var(--primary);color:var(--primary);background:transparent;border-radius:4px;cursor:pointer">
            Use This ↗
          </button>
        </div>` : ''}
      `;
    }

    showToast(`Hook analyzed! Score: ${score}/100`, score >= 70 ? 'success' : 'info');

  } catch (err) {
    showToast('Analysis failed. Try again.', 'error');
    if (feedbackBox) {
      feedbackBox.style.display = 'block';
      feedbackBox.textContent = 'Could not connect to AI. Check your network.';
    }
  } finally {
    if (btn) { btn.innerHTML = '<i class="fas fa-brain"></i> Analyze Hook Strength (AI)'; btn.disabled = false; }
  }
}

function useRewrite(btn) {
  const text = btn.getAttribute('data-text');
  const ta = document.getElementById('campHook');
  if (ta && text) {
    ta.value = text;
    updatePreview();
    updateHookCount();
    showToast('Hook updated! ✨', 'success');
  }
}

// ─── Share Card Generator ─────────────────────────────────────
function generateShareCard() {
  const c = State.shareTarget;
  if (!c) { showToast('No campaign selected', 'error'); return; }

  const btn = document.getElementById('shareCardBtn');
  if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Generating...'; btn.disabled = true; }

  const canvas = document.getElementById('shareCardCanvas');
  const preview = document.getElementById('shareCardPreview');
  if (!canvas || !preview) return;

  const W = 1080, H = 1080;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Background
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#0a0a14');
  bg.addColorStop(1, '#12121f');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Color accent top strip
  const strip = ctx.createLinearGradient(0, 0, W, 0);
  strip.addColorStop(0, c.color);
  strip.addColorStop(1, c.color + '44');
  ctx.fillStyle = strip;
  ctx.fillRect(0, 0, W, 8);

  // Glow circle
  const glow = ctx.createRadialGradient(W/2, 300, 0, W/2, 300, 400);
  glow.addColorStop(0, c.color + '22');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  // Brand
  ctx.fillStyle = 'rgba(255,255,255,0.3)';
  ctx.font = '700 32px Inter, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('⚡ ViralForge', 60, 70);

  // Type badge
  ctx.fillStyle = c.color + '33';
  roundRect(ctx, 60, 100, 220, 44, 22);
  ctx.fill();
  ctx.fillStyle = c.color;
  ctx.font = '700 22px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText((TYPE_LABELS[c.type] || c.type).toUpperCase(), 170, 128);

  // Emoji
  ctx.font = '160px serif';
  ctx.textAlign = 'center';
  ctx.fillText(c.emoji, W / 2, 380);

  // Title
  ctx.fillStyle = 'white';
  ctx.font = '800 58px Inter, sans-serif';
  ctx.textAlign = 'center';
  wrapText(ctx, c.title, W/2, 480, W - 120, 72);

  // Hook quote
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.font = 'italic 400 34px Inter, sans-serif';
  wrapText(ctx, `"${c.hook}"`, W/2, 660, W - 160, 46, 3);

  // Votes bar
  ctx.fillStyle = c.color + '22';
  roundRect(ctx, W/2 - 280, 820, 560, 80, 16);
  ctx.fill();
  ctx.fillStyle = c.color;
  ctx.font = '800 42px Inter, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`🔥 ${c.votes.toLocaleString()} VOTES`, W/2, 872);

  // Author
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  ctx.font = '400 28px Inter, sans-serif';
  ctx.fillText(`by ${c.authorName}  ·  viralforge.io`, W/2, 960);

  // Bottom border
  const bot = ctx.createLinearGradient(0, H-6, W, H-6);
  bot.addColorStop(0, c.color);
  bot.addColorStop(1, c.color + '44');
  ctx.fillStyle = bot;
  ctx.fillRect(0, H-6, W, 6);

  const dataUrl = canvas.toDataURL('image/png');
  preview.innerHTML = `<img src="${dataUrl}" style="width:100%;border-radius:8px;margin-bottom:8px"/>`;

  const a = document.createElement('a');
  a.href = dataUrl;
  a.download = `viralforge-${c.id}.png`;
  a.click();

  if (btn) { btn.innerHTML = '<i class="fas fa-check"></i> Downloaded!'; }
  setTimeout(() => { if (btn) { btn.innerHTML = '<i class="fas fa-magic"></i> Generate & Download Card'; btn.disabled = false; }}, 2000);
  showToast('Share card downloaded! 🎉', 'success');
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function wrapText(ctx, text, x, y, maxW, lineH, maxLines = 2) {
  const words = text.split(' ');
  let line = '';
  let lines = 0;
  for (let i = 0; i < words.length; i++) {
    const test = line + words[i] + ' ';
    if (ctx.measureText(test).width > maxW && i > 0) {
      ctx.fillText(line.trim(), x, y + lines * lineH);
      line = words[i] + ' ';
      lines++;
      if (lines >= maxLines) { ctx.fillText(line.trim() + '…', x, y + lines * lineH); return; }
    } else { line = test; }
  }
  ctx.fillText(line.trim(), x, y + lines * lineH);
}

// ─── Battle Mode ──────────────────────────────────────────────
State.battle = { a: null, b: null, votesA: 0, votesB: 0, voted: false, history: [] };

function loadNewBattle() {
  const pool = [...State.campaigns].sort(() => 0.5 - Math.random());
  State.battle.a = pool[0];
  State.battle.b = pool[1];
  State.battle.votesA = Math.floor(Math.random() * 30) + 5;
  State.battle.votesB = Math.floor(Math.random() * 30) + 5;
  State.battle.voted = false;
  renderBattle();
}

function renderBattle() {
  const arena = document.getElementById('battleArena');
  if (!arena) return;
  const { a, b, votesA, votesB, voted } = State.battle;
  if (!a || !b) { loadNewBattle(); return; }

  const total = votesA + votesB || 1;
  const pctA = Math.round((votesA / total) * 100);
  const pctB = 100 - pctA;

  arena.innerHTML = `
    ${renderBattleCard(a, 'a', voted, votesA)}
    <div class="battle-vs"><div class="battle-vs-text">VS</div></div>
    ${renderBattleCard(b, 'b', voted, votesB)}
  `;

  const barA = document.getElementById('battleBarA');
  const barB = document.getElementById('battleBarB');
  const lblA = document.getElementById('battleBarLabelA');
  const lblB = document.getElementById('battleBarLabelB');
  if (barA) { barA.style.width = '0'; setTimeout(() => barA.style.width = pctA + '%', 50); }
  if (barB) { barB.style.width = '0'; setTimeout(() => barB.style.width = pctB + '%', 50); }
  if (lblA) lblA.textContent = `${a.title.substring(0,20)}... ${pctA}%`;
  if (lblB) lblB.textContent = `${pctB}% ${b.title.substring(0,20)}...`;
}

function renderBattleCard(c, side, voted, battleVotes) {
  return `
    <div class="battle-card ${voted ? (side === State.battle.winningSide ? 'winner' : 'loser') : ''}" id="battleCard_${side}">
      <div class="battle-card-emoji">${c.emoji}</div>
      <div class="battle-card-type">${TYPE_LABELS[c.type]}</div>
      <div class="battle-card-title">${c.title}</div>
      <div class="battle-card-hook">"${c.hook.substring(0, 120)}${c.hook.length > 120 ? '…' : ''}"</div>
      <div class="battle-card-author">by ${c.authorName} · ${c.votes.toLocaleString()} platform votes</div>
      ${voted
        ? `<div class="battle-vote-count">⚔️ ${battleVotes} battle votes (${Math.round(battleVotes/(State.battle.votesA+State.battle.votesB)*100)}%)</div>`
        : `<button class="battle-vote-btn" onclick="castBattleVote('${side}')">
            <i class="fas fa-bolt"></i> This One is Better!
           </button>`
      }
    </div>
  `;
}

function castBattleVote(side) {
  if (State.battle.voted) return;
  State.battle.voted = true;
  State.battle.winningSide = side;

  if (side === 'a') State.battle.votesA += 1;
  else State.battle.votesB += 1;

  const total = State.battle.votesA + State.battle.votesB;
  const winner = State.battle.votesA >= State.battle.votesB ? State.battle.a : State.battle.b;

  // Record in history
  State.battle.history.unshift({
    a: State.battle.a.title.substring(0, 30),
    b: State.battle.b.title.substring(0, 30),
    winner: winner.title.substring(0, 30),
    pctA: Math.round((State.battle.votesA / total) * 100),
    pctB: Math.round((State.battle.votesB / total) * 100),
  });

  renderBattle();
  renderBattleHistory();
  showToast(`You voted! ${side === 'a' ? State.battle.a.title.substring(0,25) : State.battle.b.title.substring(0,25)}... wins! 🏆`, 'success');

  // Auto next battle after 3s
  setTimeout(() => loadNewBattle(), 3500);
}

function renderBattleHistory() {
  const el = document.getElementById('battleHistoryList');
  if (!el) return;
  el.innerHTML = State.battle.history.slice(0, 5).map(h => `
    <div class="battle-history-item">
      <div style="flex:1">${h.a}... <strong style="color:var(--text3)">vs</strong> ${h.b}...</div>
      <div class="battle-winner-tag">🏆 ${h.winner}...</div>
      <div style="font-size:0.72rem;color:var(--text3)">${h.pctA}% / ${h.pctB}%</div>
    </div>
  `).join('') || '<p style="color:var(--text3);font-size:0.85rem">Cast your first battle vote!</p>';
}


// ═══════════════════════════════════════════════════════════════
// SCROLL STOPPER SIMULATOR
// ═══════════════════════════════════════════════════════════════
State.simulator = { selectedCampaign: null, running: false };

const FILLER_POSTS = [
  { avatar: '😂', user: 'meme.daily', emoji: '😭💀', text: 'When Monday hits different...', likes: '12.4K', comments: '892', color: '#1a1a2e' },
  { avatar: '🍕', user: 'foodie.vibes', emoji: '🍕🔥', text: 'Pizza at 2am just hits different ngl', likes: '8.1K', comments: '234', color: '#1e1a0e' },
  { avatar: '💪', user: 'gym.grind', emoji: '💪⚡', text: 'No days off. No excuses. Just results.', likes: '34.2K', comments: '1.2K', color: '#0e1e16' },
  { avatar: '🎵', user: 'music.drops', emoji: '🎵🎶', text: 'This song has been living in my head rent free', likes: '21.9K', comments: '567', color: '#12102a' },
  { avatar: '🌍', user: 'travel.now', emoji: '🌅✈️', text: 'Jaipur at sunrise. No filter needed.', likes: '45.7K', comments: '2.3K', color: '#1a1000' },
  { avatar: '📱', user: 'tech.talk', emoji: '🤖💡', text: 'AI just replaced 3 of my apps. Thread 🧵', likes: '67.3K', comments: '4.1K', color: '#0a1020' },
];

function initSimulator() {
  const picker = document.getElementById('simPicker');
  if (!picker) return;
  picker.innerHTML = State.campaigns.slice(0, 12).map((c, i) => `
    <div class="sim-pick-item" onclick="selectSimCampaign('${c.id}', this)">
      <div class="sim-pick-emoji">${c.emoji}</div>
      <div>
        <div class="sim-pick-title">${c.title.substring(0, 40)}${c.title.length > 40 ? '…' : ''}</div>
        <div class="sim-pick-author">by ${c.authorName} · ${c.votes} votes</div>
      </div>
    </div>
  `).join('');
}

function selectSimCampaign(id, el) {
  State.simulator.selectedCampaign = State.campaigns.find(c => c.id === id);
  document.querySelectorAll('.sim-pick-item').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
  document.getElementById('simLaunchBtn').disabled = false;
  document.getElementById('simStats').style.display = 'none';
  document.getElementById('simVerdict').style.display = 'none';
  // Reset feed
  const feed = document.getElementById('simFeed');
  if (feed) feed.innerHTML = `<div class="sim-loading"><i class="fas fa-play-circle" style="font-size:2.5rem;color:var(--primary)"></i><p style="color:var(--text2);margin-top:10px">Ready to launch!</p></div>`;
}

function launchSimulator() {
  const c = State.simulator.selectedCampaign;
  if (!c || State.simulator.running) return;
  State.simulator.running = true;

  const feed = document.getElementById('simFeed');
  const btn = document.getElementById('simLaunchBtn');
  if (btn) { btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Simulating...'; btn.disabled = true; }

  let stopCount = 0;
  let totalSimUsers = 0;
  const CAMPAIGN_APPEARS_AT = 3; // after 3 filler posts
  const TOTAL_POSTS = 7;
  const fillers = [...FILLER_POSTS].sort(() => 0.5 - Math.random());

  function showPost(index) {
    if (index >= TOTAL_POSTS) {
      finishSimulation(stopCount, totalSimUsers, c);
      return;
    }

    const isCampaign = index === CAMPAIGN_APPEARS_AT;
    totalSimUsers += Math.floor(Math.random() * 80) + 40;

    if (isCampaign) {
      // Campaign card
      feed.innerHTML = `
        <div class="sim-post campaign" style="background:linear-gradient(180deg,${c.color}22,#0d0d1a)">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <div class="sim-post-avatar" style="background:${c.color}33">${c.authorName[0]}</div>
            <div>
              <div class="sim-post-username">@${c.authorUsername}</div>
              <div style="font-size:0.62rem;color:rgba(255,255,255,0.4)">Sponsored · Just now</div>
            </div>
          </div>
          <div class="sim-post-content">
            <div class="sim-post-emoji">${c.emoji}</div>
            <div style="font-weight:800;font-size:0.9rem;color:white;text-align:center">${c.title}</div>
            <div class="sim-post-text">"${c.hook.substring(0, 100)}${c.hook.length > 100 ? '…' : ''}"</div>
            <div style="background:${c.color};color:white;padding:6px 18px;border-radius:20px;font-size:0.72rem;font-weight:800;margin-top:6px">VOTE NOW ↗</div>
          </div>
          <div class="sim-post-actions">
            <div class="sim-action"><i class="fas fa-heart" style="color:#ef4444"></i><span>${c.votes}</span></div>
            <div class="sim-action"><i class="fas fa-comment" style="color:#06b6d4"></i><span>${c.comments?.length || 0}</span></div>
            <div class="sim-action"><i class="fas fa-share" style="color:#10b981"></i><span>${c.shares || 0}</span></div>
          </div>
          <div class="sim-campaign-ring active"></div>
          <div class="stop-overlay show">🛑 STOPPED SCROLLING!</div>
        </div>
      `;
      // Calculate stop rate for this campaign
      const baseStop = 25 + (c.viralScore * 0.5);
      stopCount = Math.floor((baseStop + Math.random() * 20) / 100 * totalSimUsers);
      setTimeout(() => showPost(index + 1), 2500);
    } else {
      const f = fillers[index % fillers.length];
      feed.innerHTML = `
        <div class="sim-post filler" style="background:linear-gradient(180deg,${f.color},#0a0a14)">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
            <div class="sim-post-avatar" style="background:rgba(255,255,255,0.1)">${f.avatar}</div>
            <div>
              <div class="sim-post-username">${f.user}</div>
              <div style="font-size:0.62rem;color:rgba(255,255,255,0.4)">${Math.floor(Math.random()*59)+1}m ago</div>
            </div>
          </div>
          <div class="sim-post-content">
            <div class="sim-post-emoji">${f.emoji}</div>
            <div class="sim-post-text">${f.text}</div>
          </div>
          <div class="sim-post-actions">
            <div class="sim-action"><i class="fas fa-heart" style="color:#ef4444"></i><span>${f.likes}</span></div>
            <div class="sim-action"><i class="fas fa-comment" style="color:#06b6d4"></i><span>${f.comments}</span></div>
            <div class="sim-action"><i class="fas fa-share" style="color:#10b981"></i><span>${Math.floor(Math.random()*500)}</span></div>
          </div>
        </div>
      `;
      setTimeout(() => showPost(index + 1), 900);
    }
  }

  showPost(0);
}

function finishSimulation(stopCount, totalUsers, c) {
  State.simulator.running = false;
  const btn = document.getElementById('simLaunchBtn');
  if (btn) { btn.innerHTML = '<i class="fas fa-redo"></i> Run Again'; btn.disabled = false; }

  const stopRate = Math.round((stopCount / Math.max(totalUsers, 1)) * 100);
  const engagement = Math.min(98, stopRate + Math.floor(Math.random() * 15));
  const reach = Math.min(99, Math.floor((c.viralScore * 0.6) + Math.random() * 30));

  document.getElementById('simStopRate').textContent = stopRate + '%';
  document.getElementById('simEngagement').textContent = engagement + '%';
  document.getElementById('simReach').textContent = reach + '/100';
  document.getElementById('simStats').style.display = 'grid';

  const vEl = document.getElementById('simVerdict');
  const verdict = stopRate >= 50
    ? `🔥 <strong>High Stop Power!</strong> ${stopRate}% of simulated users stopped for this campaign. This has real viral potential — push it hard on Instagram and Twitter.`
    : stopRate >= 30
    ? `✨ <strong>Decent Hook.</strong> ${stopRate}% stop rate — above average. Sharpen your opening line to push past 50%.`
    : `💡 <strong>Needs more punch.</strong> Only ${stopRate}% stopped. Try leading with a bolder statement or a more surprising visual hook.`;
  vEl.innerHTML = verdict;
  vEl.style.display = 'block';
  showToast(`Simulation done! Stop rate: ${stopRate}%`, stopRate >= 40 ? 'success' : 'info');
}

// ═══════════════════════════════════════════════════════════════
// CAMPAIGN DNA RADAR CHART
// ═══════════════════════════════════════════════════════════════
function drawRadarChart(scores) {
  const canvas = document.getElementById('radarCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = 300, H = 300, cx = 150, cy = 155, R = 110;
  const axes = ['Emotion', 'Clarity', 'Shareability', 'Originality', 'Boldness'];
  const n = axes.length;
  ctx.clearRect(0, 0, W, H);

  // Grid rings
  [0.25, 0.5, 0.75, 1].forEach(t => {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
      const x = cx + R * t * Math.cos(angle);
      const y = cy + R * t * Math.sin(angle);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(99,102,241,0.15)';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  // Axes
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
    ctx.strokeStyle = 'rgba(99,102,241,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Data polygon
  ctx.beginPath();
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const val = scores[i] / 100;
    const x = cx + R * val * Math.cos(angle);
    const y = cy + R * val * Math.sin(angle);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
  grad.addColorStop(0, 'rgba(99,102,241,0.5)');
  grad.addColorStop(1, 'rgba(236,72,153,0.2)');
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = '#6366f1';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Dots
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const val = scores[i] / 100;
    const x = cx + R * val * Math.cos(angle);
    const y = cy + R * val * Math.sin(angle);
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#6366f1';
    ctx.fill();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // Labels
  ctx.font = '700 11px Inter,sans-serif';
  ctx.textAlign = 'center';
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const lx = cx + (R + 22) * Math.cos(angle);
    const ly = cy + (R + 22) * Math.sin(angle);
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.fillText(axes[i], lx, ly + 4);
  }

  // Score labels
  const labels = document.getElementById('dnaLabels');
  if (labels) {
    labels.innerHTML = axes.map((a, i) => `
      <div class="dna-label-pill">
        ${a} <span class="dna-score">${scores[i]}</span>
      </div>`).join('');
  }
}

// ═══════════════════════════════════════════════════════════════
// VIRAL PREDICTION TIMELINE
// ═══════════════════════════════════════════════════════════════
function drawTimeline(c, scores) {
  const canvas = document.getElementById('timelineCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.offsetWidth || 400, H = 220;
  canvas.width = W; canvas.height = H;
  ctx.clearRect(0, 0, W, H);

  const PAD = { t: 20, r: 20, b: 40, l: 50 };
  const iW = W - PAD.l - PAD.r;
  const iH = H - PAD.t - PAD.b;
  const labels = ['Now', '6h', '12h', '1d', '2d', '3d', '7d'];
  const n = labels.length;

  // Simulate growth curves
  const baseVotes = c.votes;
  const viral = scores ? (scores.reduce((s, v) => s + v, 0) / scores.length) : 70;
  const optimistic = labels.map((_, i) => Math.min(baseVotes * Math.pow(1 + 0.15 * (viral / 100), i * 3), baseVotes * 8));
  const realistic = labels.map((_, i) => Math.min(baseVotes * Math.pow(1 + 0.06 * (viral / 100), i * 3), baseVotes * 3));
  const pessimistic = labels.map((_, i) => Math.max(baseVotes * (1 + 0.01 * i), baseVotes));

  const allVals = [...optimistic, ...realistic, ...pessimistic];
  const maxV = Math.max(...allVals) * 1.1 || 1;

  function toXY(i, v) {
    return {
      x: PAD.l + (i / (n - 1)) * iW,
      y: PAD.t + iH - (v / maxV) * iH
    };
  }

  // Grid
  [0.25, 0.5, 0.75, 1].forEach(t => {
    const y = PAD.t + iH - t * iH;
    ctx.beginPath();
    ctx.moveTo(PAD.l, y);
    ctx.lineTo(PAD.l + iW, y);
    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.font = '9px Inter,sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(Math.round(maxV * t).toLocaleString(), PAD.l - 4, y + 3);
  });

  // X labels
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '9px Inter,sans-serif';
  ctx.textAlign = 'center';
  labels.forEach((l, i) => {
    const { x } = toXY(i, 0);
    ctx.fillText(l, x, H - 8);
  });

  // Draw lines
  const curves = [
    { data: optimistic, color: '#10b981', label: 'Best case', dash: [] },
    { data: realistic, color: '#6366f1', label: 'Likely', dash: [] },
    { data: pessimistic, color: '#6b7280', label: 'Slow growth', dash: [4, 4] },
  ];

  curves.forEach(({ data, color, dash }) => {
    ctx.beginPath();
    ctx.setLineDash(dash);
    data.forEach((v, i) => {
      const { x, y } = toXY(i, v);
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    });
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.setLineDash([]);
  });

  // Shaded area between best/worst
  ctx.beginPath();
  optimistic.forEach((v, i) => { const { x, y } = toXY(i, v); i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); });
  for (let i = n - 1; i >= 0; i--) { const { x, y } = toXY(i, pessimistic[i]); ctx.lineTo(x, y); }
  ctx.closePath();
  ctx.fillStyle = 'rgba(99,102,241,0.06)';
  ctx.fill();

  const leg = document.getElementById('timelineLegend');
  if (leg) {
    leg.innerHTML = curves.map(c => `
      <div class="tl-legend-item">
        <div class="tl-dot" style="background:${c.color}"></div>${c.label}
      </div>`).join('');
  }
}

// ═══════════════════════════════════════════════════════════════
// INDIA ATTENTION HEATMAP
// ═══════════════════════════════════════════════════════════════
const INDIA_CITIES = [
  { name: 'Mumbai', x: 142, y: 310, base: 90 },
  { name: 'Delhi', x: 185, y: 168, base: 95 },
  { name: 'Bengaluru', x: 192, y: 410, base: 88 },
  { name: 'Chennai', x: 230, y: 430, base: 82 },
  { name: 'Hyderabad', x: 215, y: 360, base: 80 },
  { name: 'Kolkata', x: 320, y: 245, base: 75 },
  { name: 'Pune', x: 158, y: 325, base: 72 },
  { name: 'Ahmedabad', x: 130, y: 250, base: 68 },
  { name: 'Jaipur', x: 170, y: 200, base: 65 },
  { name: 'Lucknow', x: 245, y: 205, base: 62 },
  { name: 'Surat', x: 122, y: 280, base: 60 },
  { name: 'Chandigarh', x: 185, y: 140, base: 55 },
];

function drawIndiaHeatmap(c) {
  const svg = document.getElementById('indiaMapSvg');
  if (!svg) return;

  const scores = INDIA_CITIES.map(city => {
    const intensity = Math.min(100, city.base + Math.floor(Math.random() * 15) - 7 + (c.viralScore * 0.1));
    return { ...city, intensity };
  });

  // India outline (simplified)
  svg.innerHTML = `
    <defs>
      <radialGradient id="mapBg" cx="50%" cy="50%">
        <stop offset="0%" stop-color="rgba(99,102,241,0.08)"/>
        <stop offset="100%" stop-color="transparent"/>
      </radialGradient>
    </defs>
    <ellipse cx="240" cy="300" rx="200" ry="250" fill="url(#mapBg)" stroke="rgba(99,102,241,0.1)" stroke-width="1"/>
    ${scores.map(city => {
      const r = 8 + (city.intensity / 100) * 18;
      const opacity = 0.3 + (city.intensity / 100) * 0.6;
      const color = city.intensity > 80 ? '#ef4444' : city.intensity > 65 ? '#f59e0b' : '#6366f1';
      return `
        <circle cx="${city.x}" cy="${city.y}" r="${r * 1.8}" fill="${color}" opacity="${opacity * 0.3}" class="city-pulse">
          <animate attributeName="r" values="${r * 1.5};${r * 2.5};${r * 1.5}" dur="${1.5 + Math.random()}s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="${opacity * 0.3};0;${opacity * 0.3}" dur="${1.5 + Math.random()}s" repeatCount="indefinite"/>
        </circle>
        <circle cx="${city.x}" cy="${city.y}" r="${r}" fill="${color}" opacity="${opacity}" class="city-dot"/>
        <text x="${city.x}" y="${city.y - r - 4}" text-anchor="middle" class="city-label">${city.name}</text>
      `;
    }).join('')}
  `;

  const citiesEl = document.getElementById('heatmapCities');
  if (citiesEl) {
    const sorted = [...scores].sort((a, b) => b.intensity - a.intensity).slice(0, 6);
    citiesEl.innerHTML = sorted.map(city => {
      const color = city.intensity > 80 ? '#ef4444' : city.intensity > 65 ? '#f59e0b' : '#6366f1';
      return `<div class="city-pill"><div class="cp-dot" style="background:${color}"></div>${city.name} ${city.intensity}%</div>`;
    }).join('');
  }
}

// ═══════════════════════════════════════════════════════════════
// WHY IT WORKS — AI (Claude API)
// ═══════════════════════════════════════════════════════════════
async function analyzeWhyItWorks(c) {
  const el = document.getElementById('whyContent');
  if (!el) return;
  el.innerHTML = `<div class="why-loading"><i class="fas fa-brain fa-pulse" style="font-size:2rem;color:var(--primary)"></i><p style="margin-top:12px;color:var(--text2)">Claude is analyzing...</p></div>`;

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        messages: [{
          role: 'user',
          content: `You are a world-class viral marketing strategist. Analyze this campaign from a psychology + marketing perspective.

Campaign Title: "${c.title}"
Hook: "${c.hook}"
Type: ${c.type}
Description: "${c.description?.substring(0, 300) || ''}"
Current Votes: ${c.votes}

Respond ONLY with a JSON object (no markdown backticks):
{
  "points": [
    { "icon": "🧠", "title": "Psychology at play", "body": "2 sentences on the psychological trigger" },
    { "icon": "🔥", "title": "Viral mechanic", "body": "2 sentences on why people would share it" },
    { "icon": "🎯", "title": "Audience fit", "body": "2 sentences on who this reaches and why it resonates" }
  ],
  "overallVerdict": "one sharp sentence summary",
  "strength": "strong|medium|weak"
}`
        }]
      })
    });
    const data = await res.json();
    const raw = data.content?.[0]?.text || '{}';
    let result;
    try { result = JSON.parse(raw.replace(/```json|```/g, '').trim()); }
    catch { throw new Error('parse'); }

    el.innerHTML = `
      ${(result.points || []).map(p => `
        <div class="why-point">
          <div class="why-icon">${p.icon}</div>
          <div class="why-text"><strong>${p.title}</strong>${p.body}</div>
        </div>
      `).join('')}
      <div class="why-verdict ${result.strength || 'medium'}">
        ${result.strength === 'strong' ? '🔥' : result.strength === 'medium' ? '✨' : '💡'}
        ${result.overallVerdict}
      </div>
    `;
  } catch {
    el.innerHTML = `<div class="why-point"><div class="why-icon">⚠️</div><div class="why-text">Could not connect to AI. Check your network and try again.</div></div>`;
  }
}

// ═══════════════════════════════════════════════════════════════
// INSIGHTS ORCHESTRATOR
// ═══════════════════════════════════════════════════════════════
function initInsights() {
  const picker = document.getElementById('insightsPicker');
  if (!picker) return;
  picker.innerHTML = State.campaigns.slice(0, 15).map(c => `
    <button class="insights-pick-btn" onclick="loadInsights('${c.id}', this)">
      ${c.emoji} ${c.title.substring(0, 28)}${c.title.length > 28 ? '…' : ''}
    </button>
  `).join('');
}

function loadInsights(id, btn) {
  const c = State.campaigns.find(x => x.id === id);
  if (!c) return;

  document.querySelectorAll('.insights-pick-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  document.getElementById('insightsCta').style.display = 'none';
  document.getElementById('insightsGrid').style.display = 'grid';

  // DNA scores
  const dnaScores = [
    Math.min(98, 50 + (c.votes > 500 ? 25 : 10) + Math.floor(Math.random() * 20)), // Emotion
    Math.min(98, 40 + (c.hook?.length > 80 ? 20 : 5) + Math.floor(Math.random() * 25)), // Clarity
    Math.min(98, 45 + ((c.shares || 0) > 10 ? 20 : 8) + Math.floor(Math.random() * 22)), // Shareability - fixed precedence
    Math.min(98, 55 + Math.floor(Math.random() * 30)), // Originality
    Math.min(98, 50 + Math.floor(c.viralScore * 0.3) + Math.floor(Math.random() * 15)), // Boldness
  ];

  drawRadarChart(dnaScores);
  setTimeout(() => drawTimeline(c, dnaScores), 100);
  drawIndiaHeatmap(c);
  analyzeWhyItWorks(c);
}

// ═══════════════════════════════════════════════════════════════
// ONBOARDING TOUR
// ═══════════════════════════════════════════════════════════════
let obCurrentStep = 0;
const OB_TOTAL = 5;

function showOnboarding() {
  // Only show once per browser session
  if (sessionStorage.getItem('vf_toured')) return;
  const overlay = document.getElementById('onboardingOverlay');
  if (overlay) {
    overlay.style.display = 'flex';
    goToObStep(0);
  }
}

function closeOnboarding() {
  const overlay = document.getElementById('onboardingOverlay');
  if (overlay) {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.3s';
    setTimeout(() => { overlay.style.display = 'none'; overlay.style.opacity = ''; }, 300);
  }
  sessionStorage.setItem('vf_toured', '1');
}

function goToObStep(n, direction = 1) {
  const steps = document.querySelectorAll('.ob-step');
  const dots  = document.querySelectorAll('.ob-dot');
  steps.forEach(s => s.classList.remove('active', 'slide-back'));
  dots.forEach(d => d.classList.remove('active'));

  obCurrentStep = Math.max(0, Math.min(OB_TOTAL - 1, n));

  const target = steps[obCurrentStep];
  if (target) {
    target.classList.add('active');
    if (direction < 0) target.classList.add('slide-back');
  }
  if (dots[obCurrentStep]) dots[obCurrentStep].classList.add('active');

  const label = document.getElementById('obStepLabel');
  const prev  = document.getElementById('obPrev');
  const next  = document.getElementById('obNext');
  if (label) label.textContent = `${obCurrentStep + 1} of ${OB_TOTAL}`;
  if (prev)  prev.style.visibility  = obCurrentStep === 0 ? 'hidden' : 'visible';
  if (next)  next.style.display     = obCurrentStep === OB_TOTAL - 1 ? 'none' : 'flex';
}

function obNav(dir) {
  goToObStep(obCurrentStep + dir, dir);
}


// ═══════════════════════════════════════════════════════════════
// LEADERBOARD RANK-CHANGE ANIMATION
// ═══════════════════════════════════════════════════════════════
let _prevLeaderboardOrder = [];

function renderLeaderboardAnimated() {
  const prevOrder = [..._prevLeaderboardOrder];
  renderLeaderboard();

  const sorted = [...State.campaigns].sort((a, b) => b.votes - a.votes);
  _prevLeaderboardOrder = sorted.map(c => c.id);

  // Animate rank changes
  setTimeout(() => {
    const rows = document.querySelectorAll('.lb-row');
    rows.forEach((row, newRank) => {
      const id = row.getAttribute('data-id');
      if (!id) return;
      const oldRank = prevOrder.indexOf(id);
      if (oldRank === -1 || oldRank === newRank) return;
      const diff = oldRank - newRank;
      if (diff > 0) {
        // Rose up
        row.classList.add('rank-up');
        const badge = document.createElement('span');
        badge.className = 'rank-change-badge up';
        badge.textContent = `▲${diff}`;
        row.appendChild(badge);
        setTimeout(() => { row.classList.remove('rank-up'); badge.remove(); }, 2000);
      }
    });
  }, 300);
}

// ═══════════════════════════════════════════════════════════════
// ANIMATED TAG WORD CLOUD
// ═══════════════════════════════════════════════════════════════
function renderTagCloud() {
  const el = document.getElementById('tagCloud');
  if (!el) return;

  const tagCounts = {};
  State.campaigns.forEach(c => {
    (c.tags || []).forEach(t => {
      tagCounts[t] = (tagCounts[t] || 0) + 1;
    });
  });

  const sorted = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]).slice(0, 24);
  const colors = ['#6366f1','#ec4899','#f59e0b','#10b981','#06b6d4','#ef4444'];

  el.innerHTML = sorted.map(([tag, count], i) => {
    const color = colors[i % colors.length];
    const delay = (i * 0.06).toFixed(2);
    return `
      <span class="tag-cloud-item"
            style="color:${color};animation-delay:${delay}s;opacity:0"
            onclick="searchCampaigns('${tag}');showSection('campaigns')"
            title="${count} campaigns with #${tag}">
        #${tag}
      </span>
    `;
  }).join('');

  setTimeout(() => {
    el.querySelectorAll('.tag-cloud-item').forEach((item, i) => {
      setTimeout(() => {
        item.style.transition = 'opacity 0.4s, transform 0.4s';
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, i * 50);
    });
  }, 100);
}

// ═══════════════════════════════════════════════════════════════
// BRING PEOPLE IN — COUNTER
// ═══════════════════════════════════════════════════════════════
function initBringPeopleIn() {
  const el = document.getElementById('bringPeopleCount');
  if (!el) return;
  let count = 0;
  const target = State.campaigns.reduce((s, c) => s + (c.views || 0), 0);
  Animations.animateCounter(el, target, 2500);

  // Tick up every few seconds
  setInterval(() => {
    count += Math.floor(Math.random() * 5) + 1;
    const cur = parseInt(el.textContent.replace(/,/g, '')) + count;
    el.textContent = cur.toLocaleString();
  }, 4000);
}

// ═══════════════════════════════════════════════════════════════
// EMBED CODE GENERATOR
// ═══════════════════════════════════════════════════════════════
function generateEmbed(id) {
  const c = State.campaigns.find(x => x.id === id);
  if (!c) return;

  const code = `<iframe src="https://viralforge.io/embed/${c.id}" width="400" height="220" frameborder="0" style="border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.3)"></iframe>`;

  // Always use the inline modal
  const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:20px';
    modal.innerHTML = `
      <div style="background:var(--surface);border-radius:16px;padding:28px;max-width:560px;width:100%;border:1px solid var(--border)">
        <h3 style="margin-bottom:12px;font-weight:800">📎 Embed This Campaign</h3>
        <p style="font-size:0.83rem;color:var(--text3);margin-bottom:12px">Copy and paste this code anywhere to embed the campaign card:</p>
        <div style="background:var(--surface3);border-radius:8px;padding:14px;font-family:monospace;font-size:0.78rem;color:var(--text2);word-break:break-all;margin-bottom:14px;border:1px solid var(--border)">${code}</div>
        <div style="display:flex;gap:10px">
          <button class="btn-primary" onclick="navigator.clipboard.writeText(\`${code}\`).then(()=>window.showToast('Embed code copied!','success'))">
            <i class="fas fa-copy"></i> Copy Code
          </button>
          <button class="btn-ghost" onclick="this.closest('div[style*=fixed]').remove()">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}


// ═══════════════════════════════════════════════════════════════
// LIVE VOTE SIMULATION — makes platform feel alive
// ═══════════════════════════════════════════════════════════════
const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat'];
const VOTER_NAMES = ['Aryan', 'Priya', 'Rahul', 'Sneha', 'Vikram', 'Kavya', 'Riya', 'Amit', 'Pooja', 'Ravi', 'Dev', 'Anjali', 'Rohit', 'Nisha'];

function startLiveVoteSimulation() {
  // Every 8-15 seconds, a random campaign gets a simulated vote
  function simulateVote() {
    const delay = Math.floor(Math.random() * 7000) + 8000;
    setTimeout(() => {
      // Pick a random campaign (not Apoorva's to keep hers authentic)
      const pool = State.campaigns.filter(c => c.id !== 'camp_apoorva_featured');
      const c = pool[Math.floor(Math.random() * Math.min(pool.length, 15))];
      if (!c) { simulateVote(); return; }

      // Increment vote silently
      c.votes++;
      c.votedBy = c.votedBy || [];

      // Social proof toast
      const name = VOTER_NAMES[Math.floor(Math.random() * VOTER_NAMES.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      showSocialProofToast(name, city, c);

      // Update UI if on relevant section
      if (State.currentSection === 'home') renderHomeTrending();
      if (State.currentSection === 'leaderboard') renderLeaderboard();
      if (State.currentSection === 'campaigns') renderCampaigns();
      renderVelocityList();

      simulateVote();
    }, delay);
  }
  simulateVote();
}

// Social proof toast — bottom-left popup
function showSocialProofToast(name, city, campaign) {
  const el = document.createElement('div');
  el.className = 'social-proof-toast';
  el.innerHTML = `
    <div class="sp-avatar">${name[0]}</div>
    <div class="sp-text">
      <strong>${name} from ${city}</strong><br/>
      <span>just voted for <em>"${campaign.title.substring(0, 28)}..."</em> 🔥</span>
    </div>
  `;
  document.body.appendChild(el);
  setTimeout(() => el.classList.add('show'), 50);
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 400);
  }, 4000);
}

// ═══════════════════════════════════════════════════════════════
// CREATOR SPOTLIGHT
// ═══════════════════════════════════════════════════════════════
function renderCreatorSpotlight() {
  const el = document.getElementById('spotlightGrid');
  if (!el) return;

  // Aggregate by author
  const creators = {};
  State.campaigns.forEach(c => {
    if (!creators[c.authorId]) {
      creators[c.authorId] = {
        id: c.authorId,
        name: c.authorName,
        username: c.authorUsername,
        campaigns: 0,
        totalVotes: 0,
        totalViews: 0,
        color: c.color,
        emoji: c.emoji,
        topCampaign: c,
      };
    }
    const cr = creators[c.authorId];
    cr.campaigns++;
    cr.totalVotes += c.votes;
    cr.totalViews += (c.views || 0);
    if (c.votes > cr.topCampaign.votes) cr.topCampaign = c;
  });

  const top3 = Object.values(creators)
    .sort((a, b) => b.totalVotes - a.totalVotes)
    .slice(0, 3);

  const crowns = ['👑', '🥈', '🥉'];
  const labels = ['Top Creator', '2nd Place', '3rd Place'];

  el.innerHTML = top3.map((cr, i) => `
    <div class="spotlight-card" style="border-color:${i === 0 ? cr.color : 'var(--border)'}">
      ${i === 0 ? `<div class="spotlight-glow" style="background:${cr.color}22"></div>` : ''}
      <div class="spotlight-crown">${crowns[i]}</div>
      <div class="spotlight-avatar" style="background:linear-gradient(135deg,${cr.color},${cr.color}88)">
        ${cr.name[0]}
      </div>
      <div class="spotlight-name">${cr.name}</div>
      <div class="spotlight-handle">@${cr.username}</div>
      <div class="spotlight-label">${labels[i]}</div>
      <div class="spotlight-stats">
        <div class="sp-stat"><div class="sp-stat-num">${cr.totalVotes.toLocaleString()}</div><div class="sp-stat-label">Total Votes</div></div>
        <div class="sp-stat"><div class="sp-stat-num">${cr.campaigns}</div><div class="sp-stat-label">Campaigns</div></div>
      </div>
      <div class="spotlight-top">
        🏆 Best: <em>"${cr.topCampaign.title.substring(0, 32)}..."</em>
      </div>
    </div>
  `).join('');
}

// ═══════════════════════════════════════════════════════════════
// KEYBOARD SHORTCUTS
// ═══════════════════════════════════════════════════════════════
document.addEventListener('keydown', (e) => {
  // Don't fire when typing in inputs
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

  const shortcuts = {
    'h': () => showSection('home'),
    'c': () => showSection('campaigns'),
    'l': () => showSection('leaderboard'),
    'n': () => showSection('create'),
    'b': () => showSection('battle'),
    's': () => showSection('simulator'),
    'i': () => showSection('insights'),
    '?': () => showKeyboardHelp(),
    'Escape': () => {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      document.querySelectorAll('.keyboard-help-modal').forEach(m => m.remove());
    },
  };

  if (shortcuts[e.key]) {
    e.preventDefault();
    shortcuts[e.key]();
  }
});

function showKeyboardHelp() {
  const existing = document.querySelector('.keyboard-help-modal');
  if (existing) { existing.remove(); return; }

  const modal = document.createElement('div');
  modal.className = 'keyboard-help-modal';
  modal.innerHTML = `
    <div class="kbd-modal-inner">
      <div class="kbd-modal-header">
        <h3><i class="fas fa-keyboard"></i> Keyboard Shortcuts</h3>
        <button onclick="this.closest('.keyboard-help-modal').remove()" style="background:none;border:none;color:var(--text3);cursor:pointer;font-size:1.2rem">×</button>
      </div>
      <div class="kbd-grid">
        ${[
          ['H', 'Home'],
          ['C', 'Campaigns'],
          ['L', 'Leaderboard'],
          ['N', 'New Campaign'],
          ['B', 'Battle Mode'],
          ['S', 'Simulator'],
          ['I', 'Insights'],
          ['?', 'This help'],
          ['Esc', 'Close modals'],
        ].map(([key, label]) => `
          <div class="kbd-row">
            <kbd class="kbd-key">${key}</kbd>
            <span class="kbd-label">${label}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('show'), 20);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

// ═══════════════════════════════════════════════════════════════
// CAMPAIGN COUNTDOWN TIMER
// ═══════════════════════════════════════════════════════════════
function startCountdown() {
  const el = document.getElementById('countdownTimer');
  if (!el) return;

  // Set deadline to 7 days from now
  const deadline = new Date();
  deadline.setDate(deadline.getDate() + 7);
  localStorage.setItem('vf_deadline', deadline.toISOString());

  function tick() {
    const now = new Date();
    const diff = deadline - now;
    if (diff <= 0) { el.textContent = 'Submissions Closed'; return; }

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);

    el.innerHTML = `
      <span class="cd-unit"><span class="cd-num">${d}</span><span class="cd-label">days</span></span>
      <span class="cd-sep">:</span>
      <span class="cd-unit"><span class="cd-num">${String(h).padStart(2,'0')}</span><span class="cd-label">hrs</span></span>
      <span class="cd-sep">:</span>
      <span class="cd-unit"><span class="cd-num">${String(m).padStart(2,'0')}</span><span class="cd-label">min</span></span>
      <span class="cd-sep">:</span>
      <span class="cd-unit"><span class="cd-num">${String(s).padStart(2,'0')}</span><span class="cd-label">sec</span></span>
    `;
  }
  tick();
  setInterval(tick, 1000);
}

// ═══════════════════════════════════════════════════════════════
// SHARE & TRACK — unique referral links
// ═══════════════════════════════════════════════════════════════
function generateTrackableLink(campaignId) {
  const user = State.currentUser;
  const refId = user ? user.username : 'guest';
  const link = `https://viralforge.io/c/${campaignId}?ref=${refId}`;

  // Track in localStorage
  const tracks = JSON.parse(localStorage.getItem('vf_tracks') || '{}');
  if (!tracks[campaignId]) tracks[campaignId] = { clicks: 0, shares: 0, refId };
  tracks[campaignId].shares++;
  localStorage.setItem('vf_tracks', JSON.stringify(tracks));

  return link;
}

function copyTrackableLink(campaignId) {
  const link = generateTrackableLink(campaignId);
  navigator.clipboard.writeText(link).then(() => {
    showToast('🔗 Trackable link copied! Share it anywhere.', 'success');
  });
}




// ═══════════════════════════════════════════════════════════════
// POLISH & FINAL TOUCHES
// ═══════════════════════════════════════════════════════════════

// ─── Enhanced Search with Debounce ────────────────────────────
let _searchTimeout = null;
function searchCampaignsDebounced(val) {
  clearTimeout(_searchTimeout);
  _searchTimeout = setTimeout(() => {
    searchCampaigns(val);
    // Show search count toast for non-empty searches
    if (val.trim().length > 1) {
      const matches = State.campaigns.filter(c =>
        c.title.toLowerCase().includes(val.toLowerCase()) ||
        c.hook.toLowerCase().includes(val.toLowerCase()) ||
        (c.tags || []).some(t => t.toLowerCase().includes(val.toLowerCase()))
      ).length;
      showToast(`Found ${matches} campaigns matching "${val}"`, 'info');
    }
  }, 350);
}

// ─── Vote Button Pulse Ring ────────────────────────────────────
function addVotePulse(btn) {
  if (!btn) return;
  const ring = document.createElement('div');
  ring.style.cssText = `
    position:absolute;inset:-4px;border-radius:inherit;
    border:2px solid var(--primary);
    animation:votePulseRing 0.6s ease forwards;
    pointer-events:none;
  `;
  btn.style.position = 'relative';
  btn.appendChild(ring);
  setTimeout(() => ring.remove(), 600);
  if (!document.getElementById('votePulseStyle')) {
    const s = document.createElement('style');
    s.id = 'votePulseStyle';
    s.textContent = `@keyframes votePulseRing {
      0%   { transform:scale(1); opacity:1; }
      100% { transform:scale(1.6); opacity:0; }
    }`;
    document.head.appendChild(s);
  }
}

// ─── Notification Badge on Campaigns Nav ──────────────────────
function updateCampaignsBadge() {
  const link = document.querySelector('.nav-link[data-section="campaigns"]');
  if (!link) return;
  const existing = link.querySelector('.nav-notif');
  if (existing) existing.remove();
  const newCount = State.campaigns.filter(c => {
    const age = (Date.now() - new Date(c.createdAt)) / 3600000;
    return age < 2;
  }).length;
  if (newCount > 0) {
    const badge = document.createElement('span');
    badge.className = 'nav-notif';
    badge.textContent = newCount;
    link.appendChild(badge);
  }
}

// ─── "Back to Top" button ─────────────────────────────────────
function initBackToTop() {
  const btn = document.createElement('button');
  btn.id = 'backToTop';
  btn.innerHTML = '<i class="fas fa-chevron-up"></i>';
  btn.setAttribute('aria-label', 'Back to top');
  btn.style.cssText = `
    position:fixed;bottom:48px;right:20px;z-index:8000;
    width:42px;height:42px;border-radius:50%;
    background:var(--gradient);border:none;color:white;
    cursor:pointer;font-size:1rem;
    box-shadow:0 4px 16px rgba(99,102,241,0.4);
    opacity:0;transform:translateY(20px);
    transition:opacity 0.3s,transform 0.3s;
    display:flex;align-items:center;justify-content:center;
  `;
  document.body.appendChild(btn);
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 400;
    btn.style.opacity = show ? '1' : '0';
    btn.style.transform = show ? 'translateY(0)' : 'translateY(20px)';
  });
}

// ─── Copy share link in share modal ───────────────────────────
function updateShareModalLink() {
  const el = document.getElementById('trackableLinkDisplay');
  if (!el || !State.shareTarget) return;
  const link = generateTrackableLink(State.shareTarget.id);
  el.textContent = link;
}

// ─── Patch openShare to update trackable link ─────────────────
const _origOpenShare = openShare;
window.openShare = function(id, e) {
  _origOpenShare(id, e);
  setTimeout(updateShareModalLink, 50);
};

// ─── Campaign card "New" badge for recent campaigns ───────────
function isNewCampaign(c) {
  return (Date.now() - new Date(c.createdAt)) < 7200000; // 2 hours
}

// ─── Smooth scroll active nav highlight on scroll ─────────────
function initScrollSpy() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id.replace('Section', '');
        navLinks.forEach(l => {
          l.classList.toggle('active', l.getAttribute('data-section') === id);
        });
      }
    });
  }, { threshold: 0.3 });
  sections.forEach(s => observer.observe(s));
}

// ─── Platform stats ticker (updates every 10s) ────────────────
function startStatsTicker() {
  setInterval(() => {
    const liveEl = document.getElementById('liveCount');
    if (liveEl) {
      const cur = parseInt(liveEl.textContent) || 0;
      const delta = Math.floor(Math.random() * 3) - 1;
      const next = Math.max(1, cur + delta);
      liveEl.textContent = next;
    }
    updateCampaignsBadge();
  }, 10000);
}





// ═══════════════════════════════════════════════════════════════
// CAMPAIGN OF THE DAY
// ═══════════════════════════════════════════════════════════════
function renderCampaignOfDay() {
  const el = document.getElementById('campaignOfDay');
  if (!el) return;
  const c = State.campaigns.find(x => x.id === 'camp_apoorva_featured') || State.campaigns[0];
  if (!c) return;
  el.innerHTML = `
    <div class="cotd-card" onclick="openCampaign('${c.id}')"
         style="background:linear-gradient(135deg,${c.color}12,${c.color}28);
                border:2px solid ${c.color}44;border-radius:var(--radius);
                padding:28px;cursor:pointer;display:flex;gap:24px;
                align-items:center;flex-wrap:wrap;transition:all 0.3s">
      <div style="font-size:4rem;flex-shrink:0">${c.emoji}</div>
      <div style="flex:1;min-width:200px">
        <div style="font-size:0.7rem;font-weight:800;text-transform:uppercase;
                    letter-spacing:2px;color:${c.color};margin-bottom:6px">
          🏅 Campaign of the Day
        </div>
        <div style="font-size:1.15rem;font-weight:800;margin-bottom:6px;line-height:1.3">
          ${c.title}
        </div>
        <div style="font-size:0.84rem;color:var(--text2);font-style:italic;margin-bottom:12px">
          "${c.hook.substring(0, 110)}${c.hook.length > 110 ? '…' : ''}"
        </div>
        <div style="display:flex;gap:16px;flex-wrap:wrap;font-size:0.78rem;color:var(--text3)">
          <span>🔥 ${c.votes.toLocaleString()} votes</span>
          <span>👤 ${c.authorName}</span>
          <span>⭐ Viral Score ${c.viralScore}/100</span>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;flex-shrink:0">
        <button class="btn-primary" onclick="event.stopPropagation();vote('${c.id}',event)"
                style="white-space:nowrap">
          🔥 Vote Now
        </button>
        <button class="btn-ghost" onclick="event.stopPropagation();openShare('${c.id}',event)"
                style="white-space:nowrap;font-size:0.8rem">
          📤 Share
        </button>
      </div>
    </div>
  `;
}

// ═══════════════════════════════════════════════════════════════
// USER RANK BANNER
// ═══════════════════════════════════════════════════════════════
function updateUserRankBanner() {
  const banner = document.getElementById('userRankBanner');
  if (!banner) return;
  if (!State.currentUser) { banner.style.display = 'none'; return; }

  const sorted = [...State.campaigns].sort((a, b) => b.votes - a.votes);
  const myCampaigns = sorted.filter(c => c.authorId === State.currentUser.id);

  if (!myCampaigns.length) {
    banner.style.display = 'block';
    banner.innerHTML = `
      <span>👋 Welcome, <strong>${State.currentUser.name}</strong>! You haven't launched a campaign yet.</span>
      <button class="btn-primary" onclick="showSection('create')"
              style="padding:6px 14px;font-size:0.8rem;white-space:nowrap">
        🚀 Launch Now
      </button>`;
    return;
  }

  const topRank = sorted.findIndex(c => c.authorId === State.currentUser.id) + 1;
  const totalVotes = myCampaigns.reduce((s, c) => s + c.votes, 0);
  banner.style.display = 'block';
  banner.innerHTML = `
    <span>👋 <strong>${State.currentUser.name}</strong> — Your best campaign is
      <strong style="color:var(--primary)">#${topRank}</strong> on the leaderboard
      with <strong>${totalVotes.toLocaleString()}</strong> total votes!</span>
    <button class="btn-primary" onclick="showSection('leaderboard')"
            style="padding:6px 14px;font-size:0.8rem;white-space:nowrap">
      📊 View Board
    </button>`;
}

// ═══════════════════════════════════════════════════════════════
// AUTO MARK TRENDING (top 5 by velocity)
// ═══════════════════════════════════════════════════════════════
function autoMarkTrending() {
  const byVelocity = [...State.campaigns].map(c => {
    const h = Math.max(0.5, (Date.now() - new Date(c.createdAt)) / 3600000);
    return { id: c.id, vph: c.votes / h };
  }).sort((a, b) => b.vph - a.vph);

  byVelocity.forEach((item, i) => {
    const c = State.campaigns.find(x => x.id === item.id);
    if (c) c.trending = i < 5;
  });
}

// ═══════════════════════════════════════════════════════════════
// VOTE FROM CAMPAIGN MODAL — proper live update
// ═══════════════════════════════════════════════════════════════
function voteCampaignModal(id, btn) {
  if (!State.currentUser) {
    showToast('Login to vote!', 'warning');
    openModal('authModal');
    return;
  }
  const c = State.campaigns.find(x => x.id === id);
  if (!c) return;

  if (c.votedBy?.includes(State.currentUser.id)) {
    showToast("You've already voted for this campaign!", 'info');
    return;
  }

  vote(id, null);

  // Update modal button live
  if (btn) {
    btn.innerHTML = `✅ ${c.votes.toLocaleString()} Votes`;
    btn.style.background = 'var(--success)';
    btn.classList.add('voted');
    btn.disabled = true;
  }

  // Update viral score display
  const vs = document.querySelector(`#campaignModal .vs-fill`);
  if (vs) vs.style.width = c.viralScore + '%';

  // Update view count in meta
  const viewMeta = document.querySelector(`#campaignModal .cm-meta`);
  if (viewMeta) {
    const viewSpan = viewMeta.querySelector('span:last-child');
    if (viewSpan) viewSpan.textContent = `👁️ ${c.views?.toLocaleString()} views`;
  }
}

// ═══════════════════════════════════════════════════════════════
// SHARE COUNT TRACKER — increments on share
// ═══════════════════════════════════════════════════════════════
const _origShareOn = shareOn;
window.shareOn = function(platform) {
  const c = State.shareTarget;
  if (c) {
    c.shares = (c.shares || 0) + 1;
    showToast(`Shared on ${platform}! Every share brings more voters 🚀`, 'success');
  }
  _origShareOn(platform);
};

// ═══════════════════════════════════════════════════════════════
// CAMPAIGN DNA QUICK SCORE — inline in modal
// ═══════════════════════════════════════════════════════════════
function getQuickDNA(c) {
  const emotion   = Math.min(98, 45 + (c.votes > 1000 ? 30 : 10) + Math.floor(Math.random() * 15));
  const clarity   = Math.min(98, 40 + (c.hook?.length > 80 ? 25 : 8) + Math.floor(Math.random() * 20));
  const shareability = Math.min(98, 50 + (c.shares > 5 ? 20 : 5) + Math.floor(Math.random() * 20));
  const originality  = Math.min(98, 55 + Math.floor(Math.random() * 30));
  const boldness     = Math.min(98, 50 + (c.viralScore * 0.3) + Math.floor(Math.random() * 15));
  return { emotion, clarity, shareability, originality, boldness };
}

function renderDNAMini(scores) {
  const axes = ['Emotion','Clarity','Share','Original','Boldness'];
  const colors = ['#6366f1','#ec4899','#10b981','#f59e0b','#06b6d4'];
  return `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:10px">
    ${axes.map((a,i) => {
      const val = Object.values(scores)[i];
      const color = colors[i];
      return `<div style="display:flex;flex-direction:column;align-items:center;gap:3px;min-width:50px">
        <div style="width:40px;height:40px;border-radius:50%;background:conic-gradient(${color} ${Math.round(val*3.6)}deg,var(--surface3) 0deg);display:flex;align-items:center;justify-content:center;position:relative">
          <div style="width:28px;height:28px;border-radius:50%;background:var(--surface);display:flex;align-items:center;justify-content:center;font-size:0.7rem;font-weight:800;color:${color}">${val}</div>
        </div>
        <div style="font-size:0.62rem;color:var(--text3);text-align:center">${a}</div>
      </div>`;
    }).join('')}
  </div>`;
}

// ═══════════════════════════════════════════════════════════════
// EXPORT LEADERBOARD — top 10 as text
// ═══════════════════════════════════════════════════════════════
function exportLeaderboard() {
  const sorted = [...State.campaigns].sort((a,b) => b.votes - a.votes).slice(0,10);
  const lines = [
    '🏆 ViralForge Leaderboard — Top 10',
    '━'.repeat(40),
    ...sorted.map((c,i) => `${['🥇','🥈','🥉'][i] || `#${i+1}`} ${c.title}\n   by ${c.authorName} · ${c.votes.toLocaleString()} votes · Viral Score: ${c.viralScore}/100`),
    '━'.repeat(40),
    `Generated: ${new Date().toLocaleString('en-IN')} | viralforge.io`,
  ];
  const text = lines.join('\n');
  navigator.clipboard.writeText(text).then(() => {
    showToast('📋 Leaderboard copied to clipboard!', 'success');
  });
}

// ═══════════════════════════════════════════════════════════════
// MOST CREATIVE badge — top campaign by viralScore
// ═══════════════════════════════════════════════════════════════
function getMostCreativeId() {
  return [...State.campaigns].sort((a,b) => b.viralScore - a.viralScore)[0]?.id;
}

// ═══════════════════════════════════════════════════════════════
// SCROLL TO TOP when switching sections — via nav click patch
// ═══════════════════════════════════════════════════════════════
document.addEventListener('click', (e) => {
  const navLink = e.target.closest('.nav-link, .btn-nav-cta');
  if (navLink) setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 200);
});