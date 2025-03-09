// src/services/index.js
import api from './api';
import authService from './auth.service';
import reportService from './report.service';
import dashboardService from './dashboard.service';
import adminService from './admin.service';
import notificationService from './notification.service';
import chatService from './chat.service';
import uploadService from './upload.service';

// Export semua service agar bisa diimport dengan mudah
export {
  api,
  authService,
  reportService,
  dashboardService,
  adminService,
  notificationService,
  chatService,
  uploadService
};