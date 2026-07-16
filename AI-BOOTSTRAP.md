# AI Bootstrap — Codex, Claude, Antigravity và Lovable

## Mục tiêu

Anh không phải dán lại toàn bộ prompt ở mỗi phiên. Mỗi công cụ được cấu hình một lần để đọc đúng điểm vào; sau đó anh chỉ giao nhiệm vụ cụ thể.

## Điều kiện bắt buộc

- AI phải được mở trong repository local hoặc được cấp quyền đọc repository GitHub Private.
- Một đường dẫn GitHub Private không tự cấp quyền truy cập.
- Repository sản phẩm giữ mã nguồn của sản phẩm. MH Master Memory chỉ giữ luật, bối cảnh, quyết định và cột mốc liên dự án.

## Codex

Mở Codex tại thư mục gốc repository. Codex tự đọc `AGENTS.md`. Sau đó chỉ cần giao nhiệm vụ.

## Claude Code

Mở Claude Code tại thư mục gốc repository. `CLAUDE.md` tự nhập `AGENTS.md`, vì vậy không cần dán lại luật chung.

## Google Antigravity

Thêm repository thành Project/Workspace và chạy agent trong thư mục gốc. `GEMINI.md` dẫn agent về `AGENTS.md` và tài liệu lõi.

## Lovable

Lovable làm việc trong project sản phẩm và đồng bộ với repository sản phẩm tương ứng. Dán nội dung `LOVABLE.md` một lần vào **Project Settings → Knowledge**; sau đó bổ sung riêng mục tiêu, user journey, route và design system của sản phẩm đó.

Không kết nối Lovable trực tiếp với repository MH Master Memory để sinh giao diện.

## Câu giao việc ngắn dùng hằng ngày

```text
Đọc bộ nhớ và luật của dự án đang mở, kiểm tra hiện trạng trước, rồi thực hiện nhiệm vụ sau: <nhiệm vụ>. Không đụng phần ngoài phạm vi. Kết thúc bằng trạng thái kiểm thử và bằng chứng.
```

## Khi chuyển sang một repository sản phẩm

Mỗi repository sản phẩm nên có adapter ngắn tại root, trỏ về luật trung tâm và ghi thêm các quy tắc riêng của chính sản phẩm. Không sao chép toàn bộ hồ sơ nội bộ sang mọi repository.
