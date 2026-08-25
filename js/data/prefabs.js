// =========================================================
// THƯ VIỆN PREFAB TỔNG HỢP & ENGINE BLUEPRINT (KINH THÀNH BẮC KINH)
// =========================================================

import { TILE_LEGEND } from './tileLegend.js';

export { TILE_LEGEND };
export * from './prefabs/palacePrefabs.js';
export * from './prefabs/yamenPrefabs.js';
export * from './prefabs/mansionPrefabs.js';
export * from './prefabs/marketPrefabs.js';
export * from './prefabs/gatePrefabs.js';

// =========================================================
// HÀM ENGINE "DÁN" PREFAB & QUÉT VÙNG (STAMP & FILL)
// =========================================================

export function stampPrefab(grid, startR, startC, prefabArray, zone = null) {
  for (let r = 0; r < prefabArray.length; r++) {
    const rowStr = prefabArray[r];
    for (let c = 0; c < rowStr.length; c++) {
      const char = rowStr[c];
      const template = TILE_LEGEND[char] || TILE_LEGEND[' '];

      const targetR = startR + r;
      const targetC = startC + c;

      if (grid[targetR] && grid[targetR][targetC]) {
        const currentTile = grid[targetR][targetC];
        grid[targetR][targetC] = {
          ...currentTile,
          type: template.type,
          icon: template.icon,
          name: template.name,
          solid: template.solid,
          css: template.css,
          interact: template.interact ? { ...template.interact } : null,
          zone: zone || currentTile.zone
        };

        // Tự động gán farmId cho các ô đất ruộng
        if (template.isFarm) {
          const farmId = `farm_${targetR}_${targetC}`;
          grid[targetR][targetC].farmId = farmId;
          grid[targetR][targetC].interact = { type: 'farm', farmId };
        }
      }
    }
  }
}

export function fillAreaChar(grid, r1, c1, r2, c2, char, zone = null) {
  const template = TILE_LEGEND[char] || TILE_LEGEND[' '];
  for (let r = Math.max(0, r1); r <= Math.min(grid.length - 1, r2); r++) {
    for (let c = Math.max(0, c1); c <= Math.min(grid[0].length - 1, c2); c++) {
      const currentTile = grid[r][c];
      grid[r][c] = {
        ...currentTile,
        type: template.type,
        icon: template.icon,
        name: template.name,
        solid: template.solid,
        css: template.css,
        interact: template.interact ? { ...template.interact } : null,
        zone: zone || currentTile.zone
      };
    }
  }
}
