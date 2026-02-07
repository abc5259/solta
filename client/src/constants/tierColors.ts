import type { TierGroup } from "../types/types";

export const TIER_GROUP_COLORS: Record<TierGroup, string> = {
  NONE: "hsl(142, 76%, 45%)",
  UNRATED: "hsl(0, 0%, 50%)",
  BRONZE: "hsl(30, 70%, 45%)",
  SILVER: "hsl(210, 15%, 60%)",
  GOLD: "hsl(45, 100%, 50%)",
  PLATINUM: "hsl(175, 60%, 55%)",
  DIAMOND: "hsl(200, 100%, 65%)",
  RUBY: "hsl(350, 85%, 55%)",
};

// Tier 코드 (B1, S1 등)를 TierGroup으로 변환
export function getTierGroupFromTier(tier: string): TierGroup {
  const firstChar = tier[0]?.toUpperCase();
  switch (firstChar) {
    case "B":
      return "BRONZE";
    case "S":
      return "SILVER";
    case "G":
      return "GOLD";
    case "P":
      return "PLATINUM";
    case "D":
      return "DIAMOND";
    case "R":
      return "RUBY";
    default:
      return "NONE";
  }
}

// HSL을 RGB로 변환 (배경색으로 사용하기 위해)
export function hslToRgb(hsl: string): string {
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return "#999";
  
  const h = parseInt(match[1]) / 360;
  const s = parseInt(match[2]) / 100;
  const l = parseInt(match[3]) / 100;
  
  let r, g, b;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
}
