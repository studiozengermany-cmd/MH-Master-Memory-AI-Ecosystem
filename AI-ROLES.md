# AI Roles — Phân công vận hành thực tế

## Quyền quyết định cuối cùng

**Đặng Minh Hiếu** quyết định mục tiêu, thứ tự ưu tiên, tài sản đã khóa, việc commit/push/deploy và kết quả được chấp nhận.

## 1. ChatGPT + Codex — Control Plane

ChatGPT và Codex được tính là **một đơn vị vận hành chung** trong Master Memory và Scorecard.

Nhiệm vụ chính:

- tiếp nhận ý định và chuyển thành mục tiêu rõ;
- kiểm tra bối cảnh, lịch sử lỗi và quyết định cũ;
- chia việc, xác định rủi ro và tiêu chí hoàn thành;
- đọc repository, review thay đổi và kiểm tra bằng chứng;
- cập nhật Master Memory, quyết định và Milestone;
- trực tiếp sửa code khi được giao, nhưng không mặc định tranh branch với Antigravity.

Không được:

- biến báo cáo thành bằng chứng thay cho chạy thật;
- tự nhận đã kiểm thử môi trường trên máy anh khi chưa có log/ảnh/kết quả;
- điều hai công cụ cùng sửa một branch mà không phân vùng rõ.

## 2. Google Antigravity — Execution Plane chính

Antigravity là môi trường thi công chính cho repository sản phẩm.

Nhiệm vụ chính:

- khảo sát code và lập kế hoạch triển khai tại workspace;
- viết, chạy, build, test và sửa lỗi;
- dùng agent song song khi các phần thật sự độc lập;
- tạo artifact, log và bằng chứng thực thi;
- bàn giao thay đổi bằng Milestone rõ ràng cho ChatGPT/Codex kiểm tra.

Không được:

- tự mở rộng phạm vi hoặc tự thay định hướng sản phẩm;
- cho nhiều agent sửa cùng file/branch thiếu điều phối;
- push/deploy hoặc phá cấu trúc lớn khi chưa có quyền rõ ràng.

## 3. Claude Code — Specialist / Second Opinion

Claude Code không phải luồng chính hằng ngày. Chỉ ưu tiên khi:

- cần audit độc lập;
- lỗi khó chưa tìm được nguyên nhân;
- cần phản biện kiến trúc hoặc bảo mật;
- cần đọc sâu một khu vực mã nguồn được chỉ định;
- Antigravity hoặc Codex đã thử nhưng bằng chứng chưa thuyết phục.

Mặc định Claude ở chế độ đọc/đề xuất. Chỉ sửa khi được giao branch hoặc phạm vi file rõ ràng.

## 4. Lovable — Design Plane

Lovable chuyên:

- user flow, wireframe, UI/UX và responsive;
- design system, component và trạng thái giao diện;
- dựng frontend trong repository sản phẩm khi đã được phân quyền;
- chuyển ảnh tham chiếu hoặc mô tả thành giao diện có thể kiểm thử.

Lovable không giữ Master Memory đầy đủ, không nhận hồ sơ cá nhân không cần thiết và không tự thay backend/kiến trúc ngoài phạm vi thiết kế.

## Luồng mặc định

1. Anh giao mục tiêu cho **ChatGPT/Codex**.
2. ChatGPT/Codex làm rõ phạm vi và tạo phiếu bàn giao.
3. **Antigravity** thi công chính; **Lovable** chỉ nhận phần thiết kế; **Claude** chỉ vào khi cần chuyên gia.
4. Người thực thi xuất trạng thái, log, ảnh, test hoặc commit.
5. ChatGPT/Codex đối chiếu bằng chứng, ghi Master Memory và trình anh quyết định.

## Quy tắc chống xung đột

1. Một repository + một branch + một thời điểm = **một AI được quyền viết**.
2. Làm song song phải tách branch/worktree và tách phạm vi file.
3. AI không sở hữu branch chỉ được đọc, audit hoặc đề xuất.
4. Mọi lần chuyển người thực thi phải có Milestone/Handoff.
5. Không merge vào `main` chỉ vì build pass; phải đúng mục tiêu và có bằng chứng trải nghiệm.

## Tên ghi trong Scorecard

| Công cụ | Tên chuẩn |
| --- | --- |
| ChatGPT tích hợp Codex | `ChatGPT/Codex` |
| Google Antigravity | `Antigravity` |
| Claude Code | `Claude Code` |
| Lovable | `Lovable` |
