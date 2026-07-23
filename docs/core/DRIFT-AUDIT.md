# DRIFT AUDIT — Kiểm tra định kỳ để phát hiện sai lệch trước khi thành thiệt hại

> **Vấn đề giải quyết:** `MASTER-MEMORY-SCORECARD.md` chấm điểm sau khi AI đã tự báo cáo — nhưng sự cố MH-Dowsample cho thấy vấn đề thật không nằm ở chỗ AI chấm điểm thấp, mà ở chỗ **không ai kiểm tra lại cho đến khi hậu quả đã xảy ra**. File này không thay luật, không thay Scorecard — nó là một routine kiểm tra ngược, chạy định kỳ, để bắt sai lệch khi còn rẻ để sửa.

Không sửa cấu trúc `MASTER-MEMORY-SCORECARD.md` — file đó đã khóa. Đây là lớp bổ sung, đứng độc lập.

* * *

## Khi nào chạy Drift Audit

- Bắt buộc: mỗi 7 ngày một lần, hoặc mỗi 10 Milestone Entry mới, tùy cái nào đến trước.
- Bắt buộc: ngay trước khi bắt đầu công việc trên một dự án đã không được động tới quá 14 ngày (dự án đang gắn cờ 🟡 trong `STATE.md`).
- Bắt buộc: ngay sau khi phát hiện bất kỳ sự cố Tier 2/3 nào theo `RISK-TIERS.md`.

* * *

## Quy trình kiểm tra (AI đầu tàu thực hiện, không phải AI vừa làm việc đó)

### Bước 1 — Đối chiếu 3 nguồn
Với mỗi dự án có nhiều nguồn (mục 1 trong `STATE.md`): xác minh lại local/GitHub/công cụ thiết kế có thật sự khớp với những gì `STATE.md` đang ghi. Không tin lời AI trước đó nói "đã đồng bộ" — kiểm tra trực tiếp.

### Bước 2 — Rà lại các claim "Tested"
Chọn ngẫu nhiên tối thiểu 2 Milestone Entry gần nhất có ghi trạng thái *Tested*. Với mỗi entry: bằng chứng liệt kê có thật sự tồn tại và mở được không? Nếu bằng chứng là "báo cáo mô phỏng" hoặc không truy xuất được — hạ trạng thái entry đó xuống *Untested* ngay trong log (không xóa entry cũ, ghi thêm dòng đính chính), và đây tự động là vi phạm tiêu chí 2 (Trung thực) trong Scorecard.

### Bước 3 — Rà cờ tồn đọng
Quét bảng trạng thái trong `STATE.md` — dự án nào đang 🟡/🔴 mà chưa có quyết định ghi nhận? Nếu có, đây là việc phải đưa lên đầu báo cáo phiên kế tiếp, trước nhiệm vụ được giao.

### Bước 4 — Rà tài sản khóa
Danh sách tài sản khóa (mục 4 `STATE.md`) — có tài sản nào đã bị đụng vào (file thay đổi, giao diện khác đi) mà không có Milestone Entry tương ứng giải thích lý do? Nếu có — đây là vi phạm nghiêm trọng, ghi ngay theo mẫu lỗi ở `DECISION-OPERATING-SYSTEM.md` §5, bất kể AI nào gây ra.

### Bước 5 — Ghi kết quả
Dùng đúng mẫu bên dưới, dán vào cuối `MASTER-MEMORY-SCORECARD.md` mục IV (Review định kỳ) — không tạo file rời, để không phình thêm số nơi phải đọc.

* * *

## Mẫu ghi kết quả Drift Audit

```plain
## Drift Audit — <YYYY-MM-DD>
- Người chạy audit: <tên AI>
- Dự án được kiểm: <danh sách>
- Bước 1 (đối chiếu nguồn): Khớp / Lệch — <chi tiết nếu lệch>
- Bước 2 (rà claim Tested): <số entry kiểm tra> / <số entry phải đính chính> — <chi tiết>
- Bước 3 (cờ tồn đọng): <dự án nào đang treo, đã đưa lên quyết định chưa>
- Bước 4 (tài sản khóa): Nguyên vẹn / Có đụng chưa giải thích — <chi tiết>
- Hành động ngay: <việc phải làm trước khi tiếp tục công việc khác>
- Không phát hiện gì bất thường: <có/không>
```

* * *

## Nguyên tắc

1. Drift Audit không phải để trừng phạt — mục đích duy nhất là bắt sai lệch sớm, rẻ, trước khi nó thành thiệt hại như sự cố 17/07.
2. Một AI không được tự audit chính công việc mình vừa làm trong cùng phiên đó — phải để phiên sau hoặc AI khác kiểm tra.
3. Nếu ba lần Drift Audit liên tiếp không phát hiện gì, không có nghĩa dừng chạy — tần suất chỉ được giảm khi chủ sở hữu quyết định.
4. Kết quả audit là dữ liệu để đối chiếu ở tiêu chí 2 (Trung thực) trong Scorecard — không phải kênh riêng.
