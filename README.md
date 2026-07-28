# Game Acc Shop — Demo

Mục tiêu: demo hệ thống "admin-addable provider + webhook-ready".

Quick start:
1. Sao chép nội dung file vào một folder, thêm `.env` theo `.env.example`.
2. `npm install`
3. `npx prisma generate`
4. `npm run prisma:migrate`
5. `npm run prisma:seed`
6. `npm run dev`
7. Mở `http://localhost:3000` và `http://localhost:3000/admin/providers`.

Ghi chú:
- Admin email/mật khẩu mặc định lấy từ `.env`.
- Webhook demo: POST JSON tới `/api/webhook/demo-provider` (payload demo).
- Provider credentials được encrypt bằng CRYPTO_KEY. Thay CRYPTO_KEY bằng chuỗi 32 ký tự mạnh trên production.
- Việc hiển thị / release acc tới order history chưa hoàn thiện — đây là scaffold ban đầu để test provider-add flow.
- Để deploy lên Vercel: import project, set env vars trong Vercel dashboard, deploy.

Tiếp theo mình sẽ:
- Hoàn thiện UI lịch sử đơn hàng (khi order paid → hiển thị acc cho user).
- Thêm tính năng Wallet + mapping provider → order.
- Thêm audit logs và masking dữ liệu nhạy cảm trong UI.
- Viết test cho webhook handler và ví dụ payload mẫu.

Nếu bạn muốn mình deploy demo public lên Vercel và/hoặc tạo repository GitHub:
- Gửi cho mình: permission để tạo repo (owner/repo) OR mình sẽ gửi zip mà bạn tự upload.
- Nếu muốn mình deploy: cho mình biết bạn muốn deploy public demo (mình sẽ cung cấp link) hoặc bạn deploy theo hướng dẫn.

An toàn & pháp lý:
- Đây là demo kỹ thuật; trước khi hoạt động thực tế, bạn cần:
  - Kiểm tra Terms of Service của game.
  - Chuẩn bị hợp đồng với aggregator để xử lý thẻ cào.
  - Bảo mật DB + HTTPS + backup + 2FA admin.

Liên hệ:
Mình sẽ tiếp tục triển khai các phần còn lại theo timeline bạn chọn (hoàn thiện order-history release, wallet, tests). Nếu OK, mình sẽ:
- Hoàn thiện chức năng order -> release acc & wallet trong 24–48h,
- Sau đó gửi hướng dẫn deploy + demo link (nếu bạn muốn mình deploy).

Trạng thái hiện tại: scaffold code + seed script đã sẵn. Chỉ cần bạn confirm để mình tiếp tục hoàn thiện và (tuỳ bạn) deploy.
