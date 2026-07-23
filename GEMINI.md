# Google Antigravity / Gemini Adapter

Trước khi thực hiện bất kỳ nhiệm vụ nào trong workspace này:

1. Đọc `STATE.md`.
2. Chỉ đọc mục **Đang làm / Chờ duyệt** trong `TASK-LEDGER.md`; dùng lại Task ID phù hợp, không tạo việc trùng.
3. Đọc và tuân thủ `AGENTS.md` — đây là nguồn luật chung duy nhất.
4. Đọc `AI-ROLES.md`; chỉ nạp tài liệu sâu khi nhiệm vụ cần.
5. Tác vụ lớn phải ký trước khi ghi file; AI chính ghi tên mọi agent/subagent.
6. Làm xong ghi `CHỜ ANH DUYỆT`; chưa có câu nghiệm thu rõ thì không được gọi là hoàn thành.
7. Không tự commit, push, deploy, xóa hoặc đổi cấu trúc lớn khi chưa có quyền rõ.
8. Kết thúc phiên bằng Milestone có Task ID, trạng thái và bằng chứng thật.

Skill toàn cục `prompt-master` được cài từ `skills/prompt-master/` theo `docs/setup/PROMPT-MASTER.md`. Chỉ dùng khi người dùng yêu cầu tạo, sửa, audit hoặc chuyển đổi prompt; không dùng nó để né việc thực thi nhiệm vụ trực tiếp.

Nếu workspace đang mở là repository sản phẩm, phải đọc adapter của repository đó và chỉ dùng MH Master Memory làm bối cảnh điều hành; không trộn mã nguồn các sản phẩm vào kho này.
