// Hệ thống EventBus (Publish/Subscribe) để các module giao tiếp độc lập
export class EventBus {
  static listeners = {};

  static on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
    // Trả về hàm hủy đăng ký
    return () => this.off(event, callback);
  }

  static off(event, callback) {
    if (!this.listeners[event]) return;
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  static emit(event, data) {
    if (!this.listeners[event]) return;
    this.listeners[event].forEach(callback => {
      try {
        callback(data);
      } catch (err) {
        console.error(`Lỗi khi xử lý sự kiện [${event}]:`, err);
      }
    });
  }

  static clear() {
    this.listeners = {};
  }
}
