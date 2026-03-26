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

export async function onRequestPost(context) {
  const input = await context.request.json();
  const result = calculateMiningEstimate(input);

  return Response.json({ ok: true, result });
}
