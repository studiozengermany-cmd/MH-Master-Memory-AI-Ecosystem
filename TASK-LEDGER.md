# TASK LEDGER — Sổ ký tác vụ lớn

> Chỉ đọc mục **Đang làm / Đã thi công** khi bắt đầu phiên. Lịch sử dài nằm trong `logs/MILESTONES.md`.

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
3. Làm xong phần được giao phải đổi trạng thái thành `ĐÃ THI CÔNG` và thêm bằng chứng; không bắt chủ sở hữu xác nhận lại chỉ để đóng hàng chờ.
4. Chỉ dùng `CHỜ QUYẾT ĐỊNH` khi thiếu một lựa chọn thật có thể thay đổi kết quả, phạm vi, chi phí hoặc rủi ro; phải ghi đúng câu hỏi còn thiếu.
5. Khi đủ bằng chứng phù hợp với tiêu chí hoàn thành, AI được ghi `HOÀN THÀNH — ĐÃ KIỂM CHỨNG`. Build/test kỹ thuật không thay thế kiểm thử trải nghiệm nếu tác vụ có giao diện hoặc luồng người dùng.
6. Nếu Đặng Minh Hiếu yêu cầu một cổng duyệt riêng cho tác vụ cụ thể, mới ghi và tuân thủ cổng đó; không suy rộng thành luật chờ mặc định.
7. Chỉ giữ tối đa 5 tác vụ vừa hoàn thành trong file này; lịch sử cũ tra bằng Task ID trong `logs/MILESTONES.md`.

## Trạng thái hợp lệ

`ĐANG LÀM` · `BỊ CHẶN` · `ĐÃ THI CÔNG` · `CHỜ QUYẾT ĐỊNH` · `HOÀN THÀNH — ĐÃ KIỂM CHỨNG` · `ĐÃ HỦY`

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
- Kết quả kiểm chứng:
- Thời gian chốt:
- Còn dở / rủi ro:
```

## Đang làm / Đã thi công

_Không có tác vụ mở._

## Vừa hoàn thành

### TASK-20260723-1311-PROGRESS-BOARD-SKILL

- AI/Agent: ChatGPT/Codex
- Model: GPT-5
- Dự án / workspace: MH Master Memory, Antigravity global, Codex trong ChatGPT và Claude Code
- Bắt đầu: 2026-07-23 13:11 ICT
- Mục tiêu: Cài skill bắt buộc lập bảng đối chiếu tiến độ khi Đặng Minh Hiếu yêu cầu, có cổng nghiệm thu theo chuỗi và review code độc lập.
- Phạm vi: Skill nguồn trong Master Memory; bản cài Codex/Antigravity/Claude; adapter global và `mh-check-tong-the`; Task Ledger/Milestone.
- Risk Tier: Tier 2 — thay đổi quy trình dùng chung và push GitHub `main`
- Trạng thái: HOÀN THÀNH — ĐÃ KIỂM CHỨNG
- Kết thúc thi công: 2026-07-23 13:15 ICT
- Đã thay đổi: Tạo skill `mh-progress-board`, template chuẩn, bảy trạng thái, cổng nghiệm thu chuỗi và review độc lập; cài cho Codex, Antigravity thường/IDE và Claude; nối vào luật chung cùng `mh-check-tong-the`.
- Bằng chứng: `quick_validate.py` đạt ở bốn vị trí; ba file skill có SHA-256 giống nhau giữa nguồn và ba bản cài; không còn TODO; kiểm tra đủ ⬜ 🟨 🟦 🟪 🔍 🟥 🟩 và luật AI thi công không tự review.
- Kết quả kiểm chứng: Skill hợp lệ, các bản cài đồng nhất và chỉ kích hoạt cổng nghiệm thu khi chủ sở hữu yêu cầu rõ; Đặng Minh Hiếu xác nhận nguyên văn `ok /master`.
- Thời gian chốt: 2026-07-23 13:15 ICT
- Còn dở / rủi ro: Ứng dụng đang mở có thể cần task/conversation mới để nhận skill mới.

### TASK-20260723-1138-GEMINI-GLOBAL-SETUP

- AI/Agent: ChatGPT/Codex
- Model: GPT-5
- Dự án / workspace: Antigravity global `C:\Users\Minh Hieu Producer\.gemini` và Codex trong ChatGPT `C:\Users\Minh Hieu Producer\.codex`
- Bắt đầu: 2026-07-23 11:38 ICT
- Mục tiêu: Cài cùng một kỷ luật làm việc ngắn, chặn vượt phạm vi và lưu bằng chứng thay đổi cho Antigravity lẫn Codex.
- Phạm vi: Global rules/config/hooks của `.gemini` và `.codex`; workflow `/master`; mirror GitHub trong `.gemini\antigravity`
- Risk Tier: Tier 2 — thay đổi cấu hình AI toàn cục và đồng bộ GitHub
- Trạng thái: HOÀN THÀNH — ĐÃ KIỂM CHỨNG
- Kết thúc thi công: 2026-07-23 12:29 ICT
- Đã thay đổi: Giữ bootstrap Master Memory và `/master`; thêm Codex `SessionStart` tự sync GitHub và chỉ nạp tóm tắt ngắn; thêm scope guard + evidence log cho cả hai; Codex chuyển sang `workspace-write`; giữ nguyên DCG; khóa read-only chín file luật/hook; bộ đọc bỏ qua task đã đóng.
- Bằng chứng: Ma trận thực thi cho phép đường dẫn trong dự án và từ chối đường dẫn ngoài dự án, `..\`, ổ khác, nhiều workspace; trước/sau hash đúng; Codex bootstrap sync đúng commit và trả 775 ký tự; JSON/TOML/PowerShell hợp lệ; `codex doctor` báo 0 warn, 0 fail.
- Kết quả kiểm chứng: Cấu hình, script, sandbox, ma trận ALLOW/DENY, hash trước/sau, đồng bộ GitHub và context ngắn đều đạt; Đặng Minh Hiếu ra lệnh `/MASTER` chốt sổ để chuyển việc khác.
- Thời gian chốt: 2026-07-23 12:53 ICT
- Còn dở / rủi ro: Không còn việc thi công mở. Lần mở ứng dụng tiếp theo vẫn phải nạp cấu hình và Codex review/trust hook theo cơ chế bảo mật chính thức.

### TASK-20260723-1118-CODEX-TASK-LEDGER

- AI/Agent: ChatGPT/Codex
- Model: GPT-5
- Dự án / workspace: MH Master Memory
- Bắt đầu: 2026-07-23 11:18 ICT
- Mục tiêu: Tạo sổ ký bắt buộc, phân loại việc nhỏ/lớn và hỗ trợ cờ cưỡng bức lưu `master`.
- Phạm vi: `TASK-LEDGER.md`, `AGENTS.md`, `AI-BOOTSTRAP.md`, `GEMINI.md`, `LOVABLE.md`, `README.md`, `logs/MILESTONES.md`
- Risk Tier: Tier 2 — thay đổi luật chung và push GitHub `main`
- Trạng thái: HOÀN THÀNH — ĐÃ KIỂM CHỨNG
- Kết thúc thi công: 2026-07-23 11:34 ICT
- Đã thay đổi: Tạo sổ ký; nối vào các điểm vào AI; thêm tiêu chí nhỏ/lớn và cờ `/master`, `- master`, `• master`; bỏ hàng chờ duyệt mặc định theo chỉ dẫn mới nhất.
- Bằng chứng: Commit `9047a82` cho bản đầu; cờ `/master` của chủ sở hữu; diff đúng phạm vi; các adapter đã nối; luật trạng thái mới được đối chiếu toàn hệ thống.
- Kết quả kiểm chứng: Sổ, cờ và các điểm vào hoạt động theo cùng một quy tắc; không còn trạng thái chờ cũ trong phần luật hiện hành.
- Thời gian chốt: 2026-07-23 12:48 ICT
- Còn dở / rủi ro: Không.

_(Tối đa 5 tác vụ; mới nhất ở trên.)_
