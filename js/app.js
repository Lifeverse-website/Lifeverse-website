const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const miningForm = document.getElementById('miningForm');
const contactForm = document.getElementById('contactForm');
const statusNode = document.getElementById('contactStatus');

document.getElementById('year').textContent = new Date().getFullYear();

menuToggle?.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

function calculateMiningEstimate(values) {
  const hashrate = Number(values.hashrate) * 1_000_000;
  const difficulty = Number(values.difficulty);
  const blockReward = Number(values.blockReward);
  const blockTime = Number(values.blockTime);
  const power = Number(values.power);
  const electricity = Number(values.electricity);
  const coinPrice = Number(values.coinPrice);
  const poolFee = Number(values.poolFee) / 100;

  const networkHashrate = (difficulty * Math.pow(2, 32)) / blockTime;
  const minerShare = networkHashrate > 0 ? hashrate / networkHashrate : 0;
  const blocksPerDay = 86400 / blockTime;
  const dailyCoin = Math.max(blocksPerDay * blockReward * minerShare * (1 - poolFee), 0);
  const dailyRevenue = dailyCoin * coinPrice;
  const dailyPower = (power / 1000) * 24 * electricity;
  const dailyNet = dailyRevenue - dailyPower;

  return { dailyCoin, dailyRevenue, dailyPower, dailyNet };
}

function renderMiningResults(result) {
  document.getElementById('dailyCoin').textContent = result.dailyCoin.toFixed(4);
  document.getElementById('dailyRevenue').textContent = `$${result.dailyRevenue.toFixed(2)}`;
  document.getElementById('dailyPower').textContent = `$${result.dailyPower.toFixed(2)}`;
  document.getElementById('dailyNet').textContent = `$${result.dailyNet.toFixed(2)}`;
}

if (miningForm) {
  const startup = {
    hashrate: document.getElementById('hashrate').value,
    difficulty: document.getElementById('difficulty').value,
    blockReward: document.getElementById('blockReward').value,
    blockTime: document.getElementById('blockTime').value,
    power: document.getElementById('power').value,
    electricity: document.getElementById('electricity').value,
    coinPrice: document.getElementById('coinPrice').value,
    poolFee: document.getElementById('poolFee').value
  };

  renderMiningResults(calculateMiningEstimate(startup));

  miningForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
      hashrate: document.getElementById('hashrate').value,
      difficulty: document.getElementById('difficulty').value,
      blockReward: document.getElementById('blockReward').value,
      blockTime: document.getElementById('blockTime').value,
      power: document.getElementById('power').value,
      electricity: document.getElementById('electricity').value,
      coinPrice: document.getElementById('coinPrice').value,
      poolFee: document.getElementById('poolFee').value
    };

    renderMiningResults(calculateMiningEstimate(data));

    try {
      const response = await fetch('/api/mining', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        const payload = await response.json();
        renderMiningResults(payload.result);
      }
    } catch (error) {
      console.warn('Falling back to local calculator.', error);
    }
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    statusNode.textContent = 'Sending...';

    const data = {
      name: contactForm.elements.name.value,
      email: contactForm.elements.email.value,
      subject: contactForm.elements.subject.value,
      message: contactForm.elements.message.value
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const payload = await response.json();
      statusNode.textContent = payload.message || 'Message sent.';

      if (response.ok) {
        contactForm.reset();
      }
    } catch (error) {
      statusNode.textContent = 'Contact endpoint not connected yet. Keep the form for design now or attach email service later.';
    }
  });
}
