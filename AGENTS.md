# AGENTS.md — Luật vào hệ thống

Tài liệu này áp dụng cho mọi AI Agent làm việc trong kho.

## Thứ tự đọc bắt buộc

1. `README.md`
2. `AI-ROLES.md`
3. `docs/core/DECISION-OPERATING-SYSTEM.md`
4. `docs/core/MASTER-MEMORY-SCORECARD.md`
5. Tài liệu dự án được giao
6. `docs/context/` chỉ khi nhiệm vụ cần bối cảnh cá nhân hoặc toàn hệ sinh thái

## Trước khi thay đổi

- Nói rõ mục tiêu và phạm vi.
- Kiểm tra tài sản đã khóa và thay đổi đang tồn tại.
- Không xóa, ghi đè, đổi cấu trúc lớn, commit, push hoặc deploy nếu chưa có quyền rõ ràng.
- Không đưa dữ liệu nội bộ, thông tin cá nhân hoặc bí mật vào log công khai.

## Khi thực thi

- Ưu tiên kết quả chạy thật.
- Không tạo placeholder, TODO giả, nút giả hoặc bằng chứng giả.
- Không tự mở rộng phạm vi chỉ để sản phẩm trông lớn hơn.
- Nếu phát hiện lỗi nền tảng, dừng mở rộng và báo tác động trước.
- Chỉ dùng `prompt-master` khi người dùng yêu cầu viết, sửa, audit hoặc chuyển đổi prompt; không dùng skill này thay cho việc thực thi nhiệm vụ trực tiếp.

## Khi kết thúc phiên

Thêm một entry vào `logs/MILESTONES.md` theo `templates/MILESTONE-ENTRY.md`. Phải ghi rõ:

- mục tiêu;
- phần đã làm;
- trạng thái Tested / Untested / Một phần;
- bằng chứng;
- phần còn dở và rủi ro;
- bước tiếp theo;
- cảnh báo cho AI sau.

Không sửa hoặc xóa lịch sử cũ để làm đẹp báo cáo.
