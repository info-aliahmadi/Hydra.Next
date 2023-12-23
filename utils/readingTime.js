export default function readingTime(text) {
  if (text === null || text === '' || text === undefined) return false;
  const wpm = 225;
  const words = text.trim().split(/\s+/).length;
  const time = Math.ceil(words / wpm);
  return time;
}
