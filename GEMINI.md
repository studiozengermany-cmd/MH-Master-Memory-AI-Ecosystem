# Google Antigravity / Gemini Adapter

Trước khi thực hiện bất kỳ nhiệm vụ nào trong workspace này:

1. Đọc và tuân thủ `AGENTS.md` — đây là nguồn luật chung duy nhất.
2. Đọc `AI-ROLES.md` — Antigravity là môi trường thi công chính nhưng vẫn chịu quy tắc một người viết.
3. Đọc `docs/core/DECISION-OPERATING-SYSTEM.md`.
4. Chỉ nạp tài liệu trong `docs/context/` khi nhiệm vụ thực sự cần.
5. Xác nhận phạm vi, tài sản đã khóa và tiêu chí hoàn thành trước khi sửa.
6. Không tự commit, push, deploy, xóa hoặc thay đổi cấu trúc lớn khi chưa có quyền rõ ràng.
7. Kết thúc phiên bằng Milestone Entry có trạng thái Tested / Untested / Một phần và bằng chứng thật.

Skill toàn cục `prompt-master` được cài từ `skills/prompt-master/` theo `docs/setup/PROMPT-MASTER.md`. Chỉ dùng khi người dùng yêu cầu tạo, sửa, audit hoặc chuyển đổi prompt; không dùng nó để né việc thực thi nhiệm vụ trực tiếp.

Nếu workspace đang mở là repository sản phẩm, phải đọc adapter của repository đó và chỉ dùng MH Master Memory làm bối cảnh điều hành; không trộn mã nguồn các sản phẩm vào kho này.
