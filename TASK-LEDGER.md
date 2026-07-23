# TASK LEDGER — Sổ ký tác vụ lớn

> Chỉ đọc mục **Đang làm / Chờ duyệt** khi bắt đầu phiên. Lịch sử dài nằm trong `logs/MILESTONES.md`.

## Phân biệt việc nhỏ và việc lớn

**Việc nhỏ** chỉ khi đồng thời thỏa tất cả:

- Tier 0 hoặc Tier 1; chỉ đọc hoặc tối đa 1 file trong phạm vi đã giao.
- Không đổi hành vi, dữ liệu, kiến trúc hay tài sản đã khóa.
- Không commit, push, deploy, phát sinh chi phí hoặc ghi ra hệ thống bên ngoài.
- Một AI làm trong một phiên và không có cờ `master`.

**Việc lớn** nếu có ít nhất một dấu hiệu ngược lại, thuộc Tier 2/3, không chắc cách phân loại, hoặc có cờ `master`.

## Cờ `master`

- Nhận cờ khi một dòng bắt đầu bằng `/master`, `- master` hoặc `• master` (không phân biệt hoa thường).
- Cờ này buộc AI lưu ngay tác vụ hiện tại vào sổ trước hành động tiếp theo, dù tác vụ vốn nhỏ.
- Nếu Task ID phù hợp đã có, cập nhật đúng entry đó; không tạo bản ghi trùng.
- Phải lưu ngắn: đang làm gì, đã làm gì, file/phạm vi, trạng thái, bằng chứng và bước tiếp theo.
- Cờ `master` cho phép cập nhật và đồng bộ riêng `TASK-LEDGER.md` cùng Milestone lên Master Memory; không tự cấp quyền sửa sản phẩm, xóa, deploy hoặc phát sinh chi phí.
- Nếu bị khóa hoặc không thể đồng bộ an toàn, báo `MASTER CHƯA ĐỒNG BỘ`; không được nói đã lưu.

## Luật

1. AI chính ghi Task ID, tên AI/agent, model nếu biết, thời gian, mục tiêu, phạm vi, Risk Tier và trạng thái trước khi ghi file.
2. Nếu có subagent, AI chính ghi tên và phần việc của từng subagent; không để nhiều agent cùng sửa sổ.
3. Làm xong phần thi công phải đổi trạng thái thành `CHỜ ANH DUYỆT` và thêm bằng chứng.
4. `OK, LÀM ĐI` là quyền bắt đầu, không phải nghiệm thu. Chỉ xác nhận rõ như `OK DUYỆT`, `NGHIỆM THU` hoặc `ANH XÁC NHẬN HOÀN THÀNH` mới được ghi `HOÀN THÀNH — ĐÃ DUYỆT`.
5. Chưa có xác nhận nghiệm thu thì tác vụ vẫn chưa hoàn thành, dù build/test đã đạt.
6. Khi được duyệt, ghi thời gian và nguyên văn câu duyệt; đồng thời chốt Milestone mang cùng Task ID.
7. Chỉ giữ tối đa 5 tác vụ vừa duyệt trong file này; lịch sử cũ tra bằng Task ID trong `logs/MILESTONES.md`.

## Trạng thái hợp lệ

`ĐANG LÀM` · `BỊ CHẶN` · `CHỜ ANH DUYỆT` · `HOÀN THÀNH — ĐÃ DUYỆT` · `ĐÃ HỦY`

## Mẫu ký

```text
### <TASK-ID>
- AI/Agent:
- Model:
- Dự án / workspace:
- Bắt đầu:
- Mục tiêu:
- Phạm vi:
- Risk Tier:
- Trạng thái:
- Kết thúc thi công:
- Đã thay đổi:
- Bằng chứng:
- Chủ sở hữu duyệt:
- Thời gian duyệt:
- Còn dở / rủi ro:
```

## Đang làm / Chờ duyệt

### TASK-20260723-1138-GEMINI-GLOBAL-SETUP

- AI/Agent: ChatGPT/Codex
- Model: GPT-5
- Dự án / workspace: Antigravity global `C:\Users\Minh Hieu Producer\.gemini` và Codex global `C:\Users\Minh Hieu Producer\.codex`
- Bắt đầu: 2026-07-23 11:38 ICT
- Mục tiêu: Cài cùng một kỷ luật làm việc ngắn, chặn vượt phạm vi và lưu bằng chứng thay đổi cho Antigravity lẫn Codex.
- Phạm vi: Global rules/config/hooks của `.gemini` và `.codex`; workflow `/master`; mirror GitHub trong `.gemini\antigravity`
- Risk Tier: Tier 2 — thay đổi cấu hình AI toàn cục và đồng bộ GitHub
- Trạng thái: CHỜ ANH DUYỆT
- Kết thúc thi công: 2026-07-23 12:29 ICT
- Đã thay đổi: Giữ bootstrap Master Memory và `/master`; thêm Codex `SessionStart` tự sync GitHub và chỉ nạp tóm tắt ngắn; thêm scope guard + evidence log cho cả hai; Codex chuyển sang `workspace-write`; giữ nguyên DCG; khóa read-only chín file luật/hook.
- Bằng chứng: Ma trận thực thi cho phép đường dẫn trong dự án và từ chối đường dẫn ngoài dự án, `..\`, ổ khác, nhiều workspace; trước/sau hash đúng; Codex bootstrap sync đúng commit và trả 775 ký tự; JSON/TOML/PowerShell hợp lệ; `codex doctor` báo 0 warn, 0 fail.
- Chủ sở hữu duyệt: Chưa
- Thời gian duyệt:
- Còn dở / rủi ro: Cần mở task/cửa sổ mới để hai ứng dụng nạp cấu hình; Codex sẽ yêu cầu review/trust chính xác hook mới theo cơ chế bảo mật chính thức. Log là bằng chứng kỹ thuật, không phải nhật ký chống sửa tuyệt đối.

### TASK-20260723-1118-CODEX-TASK-LEDGER

- AI/Agent: ChatGPT/Codex
- Model: GPT-5
- Dự án / workspace: MH Master Memory
- Bắt đầu: 2026-07-23 11:18 ICT
- Mục tiêu: Tạo sổ ký bắt buộc, phân loại việc nhỏ/lớn và hỗ trợ cờ cưỡng bức lưu `master`.
- Phạm vi: `TASK-LEDGER.md`, `AGENTS.md`, `AI-BOOTSTRAP.md`, `GEMINI.md`, `LOVABLE.md`, `README.md`, `logs/MILESTONES.md`
- Risk Tier: Tier 2 — thay đổi luật chung và push GitHub `main`
- Trạng thái: CHỜ ANH DUYỆT
- Kết thúc thi công: 2026-07-23 11:34 ICT
- Đã thay đổi: Tạo sổ ký; nối vào các điểm vào AI; thêm tiêu chí nhỏ/lớn và cờ `/master`, `- master`, `• master`.
- Bằng chứng: Commit `9047a82` cho bản đầu; cờ `/master` của chủ sở hữu; diff đúng 7 file và `git diff --check` đạt.
- Chủ sở hữu duyệt: Chưa
- Thời gian duyệt:
- Còn dở / rủi ro: Chờ Đặng Minh Hiếu nghiệm thu; Gemini toàn cục trong `.gemini` chưa được nối.

## Vừa được duyệt

_(Tối đa 5 tác vụ; mới nhất ở trên.)_
