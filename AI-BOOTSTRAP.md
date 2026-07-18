# AI Bootstrap — ChatGPT/Codex, Antigravity, Claude và Lovable

## Mục tiêu

Anh không phải dán lại toàn bộ prompt ở mỗi phiên. Mỗi công cụ được cấu hình một lần để đọc đúng điểm vào; sau đó anh chỉ giao nhiệm vụ cụ thể.

## Điều kiện bắt buộc

- AI phải được mở trong repository local hoặc được cấp quyền đọc repository GitHub Private.
- Một đường dẫn GitHub Private không tự cấp quyền truy cập.
- Repository sản phẩm giữ mã nguồn của sản phẩm. MH Master Memory chỉ giữ luật, bối cảnh, quyết định và cột mốc liên dự án.
- Mọi AI giao tiếp hoặc nhận việc trực tiếp từ Đặng Minh Hiếu phải đọc `docs/context/OWNER-PROFILE.md`, đặc biệt mục G, trước khi gom yêu cầu, viết prompt hoặc thực thi.
- Khi có kết nối GitHub, phải kiểm tra bản `main` mới nhất trước khi dựa vào Master Memory. Cuối ngày hoặc cuối phiên có thông tin mới đã xác nhận, bổ sung vào hồ sơ hiện có, thêm Milestone và đưa bản cập nhật lên GitHub; không tạo một bộ nhớ trùng.

Đọc `AI-ROLES.md` trước khi giao việc để biết công cụ nào là người thực thi và công cụ nào chỉ được kiểm tra.

## ChatGPT + Codex

Được xem là **một đầu não chung**, không chấm thành hai AI tách biệt. ChatGPT tiếp nhận ý định, lập luận và điều phối; Codex đọc repository, thực thi hoặc kiểm tra khi được giao. Mở Codex tại thư mục gốc repository để tự đọc `AGENTS.md`.

## Claude Code

Claude Code là công cụ dùng ít hơn, ưu tiên cho audit, phản biện độc lập, phân tích lỗi khó hoặc nhiệm vụ chuyên biệt. Mở tại thư mục gốc repository; `CLAUDE.md` tự nhập `AGENTS.md`. Project skill `prompt-master` đã nằm trong `.claude/skills/`.

## Google Antigravity

Antigravity là **môi trường thi công chính**. Thêm repository thành Project/Workspace và chạy agent trong thư mục gốc. `GEMINI.md` dẫn agent về `AGENTS.md`, vai trò và tài liệu lõi. Cài `prompt-master` toàn cục theo `docs/setup/PROMPT-MASTER.md` để dùng được ngoài repository này.

## Prompt Master dùng chung

Nguồn chuẩn nằm tại `skills/prompt-master/`. Trên Windows, chạy một lần `scripts/install-prompt-master-windows.ps1` để cài cùng bản đó cho Claude Code và Google Antigravity. ChatGPT/Codex dùng skill cá nhân cùng tên đã được cài riêng.

Skill này chỉ xử lý yêu cầu prompt engineering. Nó không phải luật điều hành chung và không được phép ghi đè `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, quyền hạn hoặc quy tắc bảo mật.

## Lovable

Lovable làm việc trong project sản phẩm và đồng bộ với repository sản phẩm tương ứng. Dán nội dung `LOVABLE.md` một lần vào **Project Settings → Knowledge**; sau đó bổ sung riêng mục tiêu, user journey, route và design system của sản phẩm đó.

Không kết nối Lovable trực tiếp với repository MH Master Memory để sinh giao diện.

## Quy tắc một người viết

Trong cùng thời điểm, mỗi repository/branch chỉ có một AI được quyền sửa. AI khác mặc định đọc và kiểm tra; nếu phải làm song song thì dùng branch hoặc worktree riêng. Không để Antigravity, Codex, Claude và Lovable cùng ghi vào một branch.

## Câu giao việc ngắn dùng hằng ngày

```text
Đọc bộ nhớ và luật của dự án đang mở, kiểm tra hiện trạng trước, rồi thực hiện nhiệm vụ sau: <nhiệm vụ>. Không đụng phần ngoài phạm vi. Kết thúc bằng trạng thái kiểm thử và bằng chứng.
```

## Khi chuyển sang một repository sản phẩm

Mỗi repository sản phẩm nên có adapter ngắn tại root, trỏ về luật trung tâm và ghi thêm các quy tắc riêng của chính sản phẩm. Không sao chép toàn bộ hồ sơ nội bộ sang mọi repository.
