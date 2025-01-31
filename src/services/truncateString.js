export default function truncateString(str, max = 200) {
  if (str.length <= max) return str;

  let shortStr = str.slice(0, max);
  const lastSpaceIdx = shortStr.lastIndexOf(' ');
  shortStr = shortStr.slice(0, lastSpaceIdx);

  return `${shortStr}...`;
}
