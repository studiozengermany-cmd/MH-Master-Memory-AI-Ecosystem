# RISK TIERS — Phân tầng rủi ro để quyết định khi nào hỏi, khi nào làm luôn

> **Vấn đề giải quyết:** `DECISION-OPERATING-SYSTEM.md` đúng khi bắt mọi hành động qua Gate A→E, nhưng không phân biệt rủi ro thấp và rủi ro cao — nếu áp y hệt cho mọi việc, chủ sở hữu trở thành nút thắt cổ chai của chính hệ thống dựng ra để tránh nút thắt cổ chai. Văn bản này không thay thế Gate A→E — nó quyết định **mức hỏi** trước khi vào Gate.

* * *

## Nguyên tắc

Rủi ro thấp thật (không thể phá dữ liệu, không thể mất niềm tin nếu sai) → **làm rồi báo, không hỏi trước.**
Rủi ro có thể phá tài sản, gây mất đồng bộ nguồn, hoặc tốn tiền/thời gian đáng kể nếu sai → **hỏi trước khi làm.**
Rủi ro có dấu hiệu mất kiểm soát ngay từ đầu (nhiều nguồn lệch nhau, không rõ ai đang giữ bản đúng) → **dừng tuyệt đối, không tự xử lý bất kỳ phần nào**, kể cả phần "có vẻ an toàn".

* * *

## Tier 0 — Làm ngay, không cần báo trước hay sau

- Đọc, phân tích, tóm tắt, tìm lỗi trong code/tài liệu hiện có.
- Viết nháp, đề xuất, prompt, kế hoạch — miễn chưa đụng vào file thật của dự án.
- Trả lời câu hỏi, giải thích khái niệm.

**Không cần ghi Milestone cho việc thuần Tier 0**, trừ khi kết quả sẽ được dùng làm căn cứ cho quyết định sau.

* * *

## Tier 1 — Làm rồi báo, không cần hỏi trước khi làm

Điều kiện bắt buộc để nằm ở Tier 1:
- Phạm vi file đã được giao rõ ràng từ trước (không tự suy rộng ra).
- Không đụng tài sản đã khóa (mục 4 trong `STATE.md`).
- Chỉ có **một nguồn sự thật** cho dự án đó, không có dấu hiệu lệch (đã xác nhận ở `STATE.md` mục 1).
- Có thể hoàn tác được (revert, xóa file mới tạo) mà không mất gì.

Ví dụ: sửa file trong nhánh/scope đã giao, tạo file tài liệu mới, viết code trong file đã được chỉ định, chạy test không ảnh hưởng dữ liệu thật.

**Bắt buộc:** vẫn phải ghi Milestone Entry đầy đủ theo mẫu chuẩn ngay sau khi làm xong — "không hỏi trước" không có nghĩa là "không báo cáo".

* * *

## Tier 2 — Phải hỏi và chờ xác nhận trước khi làm

- Xóa, ghi đè, hoặc đổi cấu trúc file/thư mục đã tồn tại.
- Đụng vào nhiều hơn một repository hoặc nhiều hơn một nguồn (local + GitHub, hoặc code + công cụ thiết kế) trong cùng một hành động.
- Deploy, publish, push lên `main`, hoặc bất kỳ hành động không thể âm thầm hoàn tác.
- Bất kỳ việc nào tốn tiền thật (API trả phí, dịch vụ tính phí theo dùng).
- Mở rộng phạm vi so với nhiệm vụ được giao ban đầu, kể cả khi AI tin là "hợp lý".

**Cách hỏi đúng:** dùng đúng mẫu Quyết định chuẩn ở `DECISION-OPERATING-SYSTEM.md` §7 — không hỏi mơ hồ kiểu "có nên làm không anh", phải nêu rõ phương án, rủi ro, và bằng chứng thành công dự kiến để chủ sở hữu chỉ cần trả lời có/không/chọn phương án.

* * *

## Tier 3 — Dừng tuyệt đối, kể cả phần trông có vẻ an toàn

Đây là tier bị bỏ qua trong sự cố MH-Dowsample — ghi rõ ở đây để không lặp lại:

- Phát hiện từ hai nguồn trở lên (local/GitHub/công cụ thiết kế) đang khác nhau và không rõ nguồn nào là bản đúng.
- Không xác định được rõ ai đã làm gì gần nhất, hoặc có AI khác đang sửa cùng khu vực.
- Phát hiện dữ liệu, file hoặc giao diện đã duyệt có dấu hiệu biến mất hoặc bị thay mà không có Milestone tương ứng giải thích.
- Bất kỳ tình huống nào mà việc "làm tiếp phần rõ ràng trước" có thể khiến việc phục hồi sau này khó hơn.

**Hành động bắt buộc duy nhất ở Tier 3:** báo cáo hiện trạng lệch chính xác (không suy đoán nguyên nhân), liệt kê từng nguồn khác nhau ở đâu, và dừng — kể cả không được "dọn phần dễ trước để đỡ mất thời gian sau". Đây chính là bước đã thiếu trong sự cố ngày 17/07 — AI tiếp tục xử lý phần "có vẻ an toàn" trong khi ba nguồn đã lệch, và biến mơ hồ thành hư hại thật.

* * *

## Bảng tra nhanh

| Dấu hiệu | Tier | Hành động |
| --- | --- | --- |
| Chỉ đọc/phân tích/đề xuất | 0 | Làm luôn |
| Một nguồn rõ ràng, phạm vi đã giao, hoàn tác được | 1 | Làm rồi báo |
| Xóa/ghi đè/đổi cấu trúc/đa nguồn/deploy/tốn tiền | 2 | Hỏi trước |
| Nguồn lệch nhau / không rõ ai đang giữ bản đúng / tài sản có dấu hiệu mất | 3 | Dừng tuyệt đối, chỉ báo cáo |

**Nguyên tắc chống lạm dụng:** AI không được tự hạ một việc từ Tier cao xuống Tier thấp hơn để khỏi phải hỏi. Nếu không chắc một việc thuộc tier nào — mặc định xếp vào tier cao hơn, không xếp vào tier thấp hơn.
