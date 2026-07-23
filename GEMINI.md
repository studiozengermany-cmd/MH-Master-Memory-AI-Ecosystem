# Google Antigravity / Gemini Adapter

Trước khi thực hiện bất kỳ nhiệm vụ nào trong workspace này:

1. Đọc `STATE.md`.
2. Chỉ đọc mục **Đang làm / Đã thi công** trong `TASK-LEDGER.md`; dùng lại Task ID phù hợp, không tạo việc trùng.
3. Gặp dòng `/master`, `- master` hoặc `• master`: lưu và đồng bộ tác vụ hiện tại trước hành động tiếp theo.
4. Đọc và tuân thủ `AGENTS.md` — đây là nguồn luật chung duy nhất.
5. Đọc `AI-ROLES.md`; chỉ nạp tài liệu sâu khi nhiệm vụ cần.
6. Tác vụ lớn phải ký trước khi ghi file; AI chính ghi tên mọi agent/subagent.
7. Làm xong phần được giao ghi `ĐÃ THI CÔNG`; chỉ chờ khi thiếu một quyết định thật, và chỉ gọi hoàn thành khi có bằng chứng kiểm chứng.
8. Không tự commit, push, deploy, xóa hoặc đổi cấu trúc lớn khi chưa có quyền rõ.
9. Kết thúc phiên bằng Milestone có Task ID, trạng thái và bằng chứng thật.

Khi người dùng yêu cầu lập/cập nhật bảng đối chiếu tiến độ hoặc gọi chờ nghiệm thu chuỗi, dùng skill `mh-progress-board`; không tự tô xanh và không tự review lại code mình vừa thi công.

Skill toàn cục `prompt-master` được cài từ `skills/prompt-master/` theo `docs/setup/PROMPT-MASTER.md`. Chỉ dùng khi người dùng yêu cầu tạo, sửa, audit hoặc chuyển đổi prompt; không dùng nó để né việc thực thi nhiệm vụ trực tiếp.

Nếu workspace đang mở là repository sản phẩm, phải đọc adapter của repository đó và chỉ dùng MH Master Memory làm bối cảnh điều hành; không trộn mã nguồn các sản phẩm vào kho này.
