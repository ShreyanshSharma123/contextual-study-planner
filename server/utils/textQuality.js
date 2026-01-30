export function isNoisyOCR(text) {
  if (!text) return true;

  const cleaned = text.toLowerCase();

  const watermarkHits =
    (cleaned.match(/scanned by camscanner/g) || []).length;

  const wordCount = cleaned.split(/\s+/).length;

  return watermarkHits > 3 || wordCount < 200;
}
