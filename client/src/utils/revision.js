export function calculateNextRevision(score, total) {
  const percent = (score / total) * 100;
  const today = new Date();

  if (percent >= 80) today.setDate(today.getDate() + 7);
  else if (percent >= 50) today.setDate(today.getDate() + 3);
  else today.setDate(today.getDate() + 1);

  return today.toISOString();
}
