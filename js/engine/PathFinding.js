// Thuật toán tìm đường BFS (Breadth-First Search) để hỗ trợ Tap-to-Move
export class PathFinding {
  static findPath(start, goal, worldMap) {
    if (!start || !goal || !worldMap) return [];
    if (start.r === goal.r && start.c === goal.c) return [];

    const rows = worldMap.length;
    const cols = worldMap[0].length;

    // Nếu ô đích là vật cản cứng (ngoại trừ ô có thể tương tác)
    const targetTile = worldMap[goal.r][goal.c];
    if (targetTile.solid) return [];

    const queue = [[start]];
    const visited = new Set();
    visited.add(`${start.r},${start.c}`);

    const directions = [
      { r: -1, c: 0 }, // Lên
      { r: 1, c: 0 },  // Xuống
      { r: 0, c: -1 }, // Trái
      { r: 0, c: 1 }   // Phải
    ];

    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];

      // Đã tới đích
      if (current.r === goal.r && current.c === goal.c) {
        // Bỏ điểm bắt đầu, chỉ trả về các bước tiếp theo
        return path.slice(1);
      }

      for (const dir of directions) {
        const nr = current.r + dir.r;
        const nc = current.c + dir.c;
        const key = `${nr},${nc}`;

        if (
          nr >= 0 && nr < rows &&
          nc >= 0 && nc < cols &&
          !visited.has(key)
        ) {
          const tile = worldMap[nr][nc];
          // Có thể đi qua nếu không solid, hoặc chính là ô đích
          if (!tile.solid || (nr === goal.r && nc === goal.c)) {
            visited.add(key);
            queue.push([...path, { r: nr, c: nc }]);
          }
        }
      }
    }

    return []; // Không tìm thấy đường đi
  }
}
