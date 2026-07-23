# TASK LEDGER — Sổ ký tác vụ lớn

> Chỉ đọc mục **Đang làm / Chờ duyệt** khi bắt đầu phiên. Lịch sử dài nằm trong `logs/MILESTONES.md`.

## Khi nào bắt buộc ký

Ký trước khi làm nếu có ít nhất một điều kiện:

- Tác vụ thuộc Tier 2 hoặc Tier 3.
- Sửa từ 2 file thật trở lên, hoặc đổi hành vi, dữ liệu hay kiến trúc.
- Có commit, push, deploy, chi phí hoặc ghi ra hệ thống bên ngoài.
- Có nhiều agent, kéo dài qua nhiều phiên, hoặc được chủ sở hữu đánh dấu là quan trọng.

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

### TASK-20260723-1118-CODEX-TASK-LEDGER

- AI/Agent: ChatGPT/Codex
- Model: GPT-5
- Dự án / workspace: MH Master Memory
- Bắt đầu: 2026-07-23 11:18 ICT
- Mục tiêu: Tạo sổ ký bắt buộc cho tác vụ lớn và nối vào các điểm vào AI.
- Phạm vi: `TASK-LEDGER.md`, `AGENTS.md`, `AI-BOOTSTRAP.md`, `GEMINI.md`, `LOVABLE.md`, `README.md`, `logs/MILESTONES.md`
- Risk Tier: Tier 2 — thay đổi luật chung và push GitHub `main`
- Trạng thái: CHỜ ANH DUYỆT
- Kết thúc thi công: 2026-07-23 11:21 ICT
- Đã thay đổi: Tạo sổ ký và nối quy tắc vào các điểm vào của Codex, Gemini, Claude qua `AGENTS.md`, và Lovable.
- Bằng chứng: Diff đúng 7 file; kiểm tra liên kết và `git diff --check` đạt.
- Chủ sở hữu duyệt: Chưa
- Thời gian duyệt:
- Còn dở / rủi ro: Chờ Đặng Minh Hiếu nghiệm thu; Gemini toàn cục trong `.gemini` chưa được nối.

## Vừa được duyệt

_(Tối đa 5 tác vụ; mới nhất ở trên.)_
