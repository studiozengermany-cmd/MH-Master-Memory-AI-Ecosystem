# STATE — Điểm khởi đầu duy nhất

> **Đọc file này TRƯỚC bất kỳ file nào khác, kể cả trước `AGENTS.md`.**
> Đây không phải tài liệu luật — đây là ảnh chụp hiện trạng, phải rẻ để đọc (dưới 1 phút) và luôn mới nhất.
> Mọi AI phải cập nhật file này ở cuối phiên, cùng lúc với việc ghi Milestone. Không cập nhật STATE = phiên chưa xong.

* * *

## 0. Vì sao file này tồn tại

Sự cố **MH-Dowsample Extension (2026-07-17)** xảy ra vì ba nguồn — local, GitHub `main`, Lovable — đã lệch nhau mà không AI nào dừng lại để xác minh trước khi hành động. `DECISION-OPERATING-SYSTEM.md` và `MASTER-MEMORY-SCORECARD.md` là luật và lịch sử — chúng dài, không AI nào cưỡng lại việc lười đọc hết trước khi làm. STATE.md là câu trả lời rẻ tiền cho câu hỏi bắt buộc: **"hiện trạng thật là gì, ngay lúc này?"**

* * *

## 1. Nguồn sự thật hiện tại theo dự án

> Mọi dự án có từ 2 nơi lưu code/thiết kế trở lên PHẢI có dòng ở đây. Nếu dòng nào bỏ trống hoặc nghi ngờ sai — đó tự động là Tier 3 theo `RISK-TIERS.md`: dừng và hỏi trước khi làm bất cứ gì.

| Dự án | Local | GitHub `main` | Công cụ thiết kế (Lovable/khác) | Nguồn được coi là chuẩn | Lần đối chiếu gần nhất |
| --- | --- | --- | --- | --- | --- |
| _(điền)_ | _(có/không, đường dẫn)_ | _(có/không, nhánh)_ | _(có/không, project)_ | _(local / GitHub / Lovable)_ | _(YYYY-MM-DD)_ |

* * *

## 2. Bảng trạng thái toàn hệ sinh thái

> Cập nhật mỗi khi có Milestone mới liên quan đến dự án đó. Trạng thái dùng đúng 8 mức trong `DECISION-OPERATING-SYSTEM.md` §2.4.

| Dự án | Trạng thái | Cập nhật gần nhất | Số ngày chưa động tới | Cờ |
| --- | --- | --- | --- | --- |
| _(tên dự án)_ | _(Ý tưởng/Đang định hình/Đang làm/Đang kiểm chứng/Dùng được/Bảo trì/Tạm dừng/Đã đóng)_ | _(YYYY-MM-DD)_ | _(số)_ | _(xem quy tắc cờ bên dưới)_ |

**Quy tắc cờ tồn đọng (bắt buộc, không tự miễn):**
- Quá **14 ngày** không cập nhật và trạng thái không phải *Bảo trì/Tạm dừng/Đã đóng* → gắn cờ 🟡 **CẦN QUYẾT ĐỊNH** — AI đầu phiên tiếp theo phải hỏi thẳng chủ sở hữu: Làm ngay / Làm thử nhỏ / Tạm hoãn / Dừng (theo đúng 4 lựa chọn ở Decision OS §3.2). Không được tự âm thầm bỏ qua.
- Quá **30 ngày** ở cờ 🟡 mà chưa có quyết định → nâng thành 🔴 **NGUY CƠ TRÔI DỰ ÁN** — AI đầu tàu bắt buộc đưa việc này lên đầu báo cáo phiên, trước cả nhiệm vụ được giao.

* * *

## 3. Việc đang chờ chủ sở hữu quyết định (Tier 2 trở lên)

> Danh sách ngắn, không phải lịch sử. Việc nào đã quyết xong thì xóa khỏi đây, không giữ lại.

| Việc | Dự án | Tier rủi ro | Vì sao chờ | Ai đề xuất | Ngày đưa lên |
| --- | --- | --- | --- | --- | --- |
| _(điền)_ | | | | | |

* * *

## 4. Tài sản đã khóa (tổng hợp, tham chiếu nhanh)

> Không thay thế danh sách chi tiết trong từng dự án — chỉ là danh sách "đừng đụng" để AI liếc qua trong 5 giây trước khi làm bất cứ gì.

| Tài sản | Dự án | Vì sao khóa | Khóa từ ngày |
| --- | --- | --- | --- |
| _(điền)_ | | | |

* * *

## 5. Quy tắc cập nhật file này

1. Đây là ảnh chụp, không phải nhật ký — sửa đè lên dòng cũ, không cộng dồn vô hạn như `MILESTONES.md`.
2. Không AI nào được tự xóa mục ở phần 3 hoặc phần 4 trừ khi chính hành động đó đã được chủ sở hữu xác nhận xong.
3. Nếu một AI phát hiện phần 1 (nguồn sự thật) sai hoặc lệch với thực tế — dừng ngay, không sửa STATE.md trước, báo cáo hiện trạng lệch cho chủ sở hữu trước, rồi mới cập nhật.
4. File này không cần đẹp, không cần văn phong — chỉ cần đúng và mới.

* * *

**Cập nhật lần cuối:** _(YYYY-MM-DD HH:MM)_ · **Bởi:** _(tên AI)_
