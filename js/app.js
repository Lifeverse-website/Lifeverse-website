// MINING CALCULATOR
const form = document.getElementById("miningForm");

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const hashrate = Number(document.getElementById("hashrate").value) * 1000000;
    const difficulty = Number(document.getElementById("difficulty").value);
    const blockReward = Number(document.getElementById("blockReward").value);
    const blockTime = Number(document.getElementById("blockTime").value);

    const networkHash = (difficulty * Math.pow(2, 32)) / blockTime;
    const share = hashrate / networkHash;
    const blocksPerDay = 86400 / blockTime;

    const dailyCoin = blocksPerDay * blockReward * share;

    document.getElementById("dailyCoin").innerText = dailyCoin.toFixed(4);
    document.getElementById("dailyRevenue").innerText = "$" + (dailyCoin * 0.1).toFixed(2);
  });
}

// FORM SUCCESS MESSAGE
const params = new URLSearchParams(window.location.search);
const msg = document.getElementById("successMsg");

if (params.get("success") === "true") {
  msg.innerText = "Message sent successfully.";
}
