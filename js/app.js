const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const miningForm = document.getElementById('miningForm');
const contactForm = document.getElementById('contactForm');
const statusNode = document.getElementById('contactStatus');
const yearNode = document.getElementById('year');

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navMenu.classList.toggle('open');
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function calculateMiningEstimate(values) {
  const hashrate = Number(values.hashrate) * 1_000_000;
  const difficulty = Number(values.difficulty);
  const blockReward = Number(values.blockReward);
  const blockTime = Number(values.blockTime);
  const power = Number(values.power);
  const electricity = Number(values.electricity);
  const coinPrice = Number(values.coinPrice);
  const poolFee = Number(values.poolFee) / 100;

  const networkHashrate = difficulty > 0
    ? (difficulty * Math.pow(2, 32)) / blockTime
    : 0;

  const minerShare = networkHashrate > 0 ? hashrate / networkHashrate : 0;
  const blocksPerDay = 86400 / blockTime;
  const dailyCoin = Math.max(blocksPerDay * blockReward * minerShare * (1 - poolFee), 0);
  const dailyRevenue = dailyCoin * coinPrice;
  const dailyPower = (power / 1000) * 24 * electricity;
  const dailyNet = dailyRevenue - dailyPower;

  return {
    dailyCoin,
    dailyRevenue,
    dailyPower,
    dailyNet
  };
}

function renderMiningResults(result) {
  const dailyCoin = document.getElementById('dailyCoin');
  const dailyRevenue = document.getElementById('dailyRevenue');
  const dailyPower = document.getElementById('dailyPower');
  const dailyNet = document.getElementById('dailyNet');

  if (dailyCoin) dailyCoin.textContent = result.dailyCoin.toFixed(4);
  if (dailyRevenue) dailyRevenue.textContent = `$${result.dailyRevenue.toFixed(2)}`;
  if (dailyPower) dailyPower.textContent = `$${result.dailyPower.toFixed(2)}`;
  if (dailyNet) dailyNet.textContent = `$${result.dailyNet.toFixed(2)}`;
}

if (miningForm) {
  const initialData = {
    hashrate: document.getElementById('hashrate')?.value || 0,
    difficulty: document.getElementById('difficulty')?.value || 0,
    blockReward: document.getElementById('blockReward')?.value || 0,
    blockTime: document.getElementById('blockTime')?.value || 60,
    power: document.getElementById('power')?.value || 0,
    electricity: document.getElementById('electricity')?.value || 0,
    coinPrice: document.getElementById('coinPrice')?.value || 0,
    poolFee: document.getElementById('poolFee')?.value || 0
  };

  renderMiningResults(calculateMiningEstimate(initialData));

  miningForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = {
      hashrate: document.getElementById('hashrate')?.value || 0,
      difficulty: document.getElementById('difficulty')?.value || 0,
      blockReward: document.getElementById('blockReward')?.value || 0,
      blockTime: document.getElementById('blockTime')?.value || 60,
      power: document.getElementById('power')?.value || 0,
      electricity: document.getElementById('electricity')?.value || 0,
      coinPrice: document.getElementById('coinPrice')?.value || 0,
      poolFee: document.getElementById('poolFee')?.value || 0
    };

    const result = calculateMiningEstimate(data);
    renderMiningResults(result);
  });
}

if (contactForm && statusNode) {
  const params = new URLSearchParams(window.location.search);

  if (params.get('sent') === 'success') {
    statusNode.textContent = 'Message sent successfully.';
  }
}
