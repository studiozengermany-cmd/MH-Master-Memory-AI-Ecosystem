# Master Memory Log

> Mới nhất ở trên cùng. Chỉ thêm entry; không xóa lịch sử cũ.

### [2026-07-16] — ChatGPT/Codex — Prompt Master đa nền tảng

- Mục tiêu phiên: Chuẩn hóa nguồn `prompt-master` và triển khai cùng một lõi cho ChatGPT/Codex, Claude Code và Google Antigravity.
- Đã làm: Loại bỏ khẳng định cứng theo phiên bản model; thêm ranh giới quyền hạn, bảo vệ bí mật, điều kiện dừng; cài skill cá nhân cho ChatGPT/Codex; thêm project skill cho Claude Code; thêm bộ cài Windows cho Claude Code và Antigravity; ghi hướng dẫn sử dụng.
- Trạng thái: Một phần — lõi skill đã qua validator và bản ChatGPT/Codex đã được cài; bộ cài Claude Code/Antigravity chưa được chạy trên máy Windows của anh.
- Bằng chứng: `skills/prompt-master/`, `.claude/skills/prompt-master/`, `scripts/install-prompt-master-windows.ps1`, `docs/setup/PROMPT-MASTER.md`.
- Còn dở / rủi ro: Cần chạy bộ cài một lần trên máy anh và mở phiên mới để xác nhận Antigravity nhận skill.
- Bước tiếp theo đề xuất: Chạy script Windows; thử một yêu cầu `/prompt-master` trên Claude Code và một yêu cầu Prompt Master trên Antigravity.
- Lưu ý cho AI sau: Hai gói RAR chỉ là nguồn tham khảo; không cài hàng loạt hoặc trộn nội dung chưa kiểm định vào lõi.

### [2026-07-16] — ChatGPT/Codex — Phân công đa AI

- Mục tiêu phiên: Chia vai trò theo công cụ anh đang sử dụng thực tế.
- Đã làm: Chốt Antigravity là môi trường thi công chính; ChatGPT/Codex là một đầu não điều phối; Claude Code là chuyên gia dự phòng; Lovable phụ trách thiết kế; thêm quy tắc một người viết.
- Trạng thái: Tested — tài liệu đã tạo và kiểm tra định dạng; chưa kiểm thử cấu hình trên máy anh.
- Bằng chứng: `AI-ROLES.md`, `AI-BOOTSTRAP.md` và các adapter tại root.
- Còn dở / rủi ro: Chưa cài adapter vào từng repository sản phẩm trên máy anh.
- Bước tiếp theo đề xuất: Chọn repository sản phẩm đầu tiên và thiết lập luồng Antigravity ↔ ChatGPT/Codex.
- Lưu ý cho AI sau: Không xem ChatGPT và Codex là hai đơn vị cạnh tranh; không để nhiều AI cùng ghi một branch.

### [2026-07-16] — Codex — MH Master Memory

- Mục tiêu phiên: Định danh và dựng khung kho nội bộ cho hệ điều hành trí nhớ đa AI.
- Đã làm: Chốt tên, viết README, chuẩn hóa cấu trúc tài liệu lõi, thêm luật Agent, bảo mật và mẫu ghi chép.
- Trạng thái: Một phần — cấu trúc tài liệu đã tạo; chưa xác nhận kho remote GitHub.
- Bằng chứng: Các file trong kho này.
- Còn dở / rủi ro: Chưa có cơ chế đồng bộ tự động hoặc phân quyền máy đọc được.
- Bước tiếp theo đề xuất: Tạo kho GitHub Private; đẩy commit nền; xác định nguồn dữ liệu chuẩn khi đồng bộ.
- Lưu ý cho AI sau: Không chuyển Public và không tự sửa luật lõi khi chưa được Đặng Minh Hiếu duyệt.
