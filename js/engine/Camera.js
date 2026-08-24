// Quản lý khung nhìn Camera Virtual Viewport
export class Camera {
  constructor(viewportCols = 15, viewportRows = 11, maxCols = 36, maxRows = 36) {
    this.viewportCols = viewportCols;
    this.viewportRows = viewportRows;
    this.maxCols = maxCols;
    this.maxRows = maxRows;

    this.startCol = 0;
    this.startRow = 0;
  }

  // Cập nhật tọa độ khung nhìn tâm bám theo vị trí nhân vật
  update(playerPos) {
    const halfC = Math.floor(this.viewportCols / 2);
    const halfR = Math.floor(this.viewportRows / 2);

    let startC = playerPos.c - halfC;
    let startR = playerPos.r - halfR;

    // Giới hạn không vượt quá viền bản đồ
    startC = Math.max(0, Math.min(startC, this.maxCols - this.viewportCols));
    startR = Math.max(0, Math.min(startR, this.maxRows - this.viewportRows));

    this.startCol = startC;
    this.startRow = startR;

    return {
      startRow: this.startRow,
      endRow: this.startRow + this.viewportRows,
      startCol: this.startCol,
      endCol: this.startCol + this.viewportCols
    };
  }

  // Kiểm tra 1 tọa độ có đang nằm trong tầm nhìn không
  isVisible(r, c) {
    return (
      r >= this.startRow &&
      r < this.startRow + this.viewportRows &&
      c >= this.startCol &&
      c < this.startCol + this.viewportCols
    );
  }
}
