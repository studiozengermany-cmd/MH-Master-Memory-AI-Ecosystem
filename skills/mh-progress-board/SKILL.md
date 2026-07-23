---
name: mh-progress-board
description: Lập và cập nhật bảng đối chiếu tiến độ theo nhóm ưu tiên, cổng nghiệm thu theo chuỗi và review code độc lập. Dùng khi Đặng Minh Hiếu nói “lập bảng đối chiếu”, “lập bảng tiến độ”, “cập nhật bảng đối chiếu”, “chờ nghiệm thu”, hoặc yêu cầu theo dõi một kế hoạch/audit đã chốt.
---

# Bảng đối chiếu tiến độ

## Quy trình

1. Chỉ tạo bảng khi người dùng yêu cầu; không tự tạo chỉ vì vừa lập plan.
2. Lấy đúng tác vụ, file, nhóm ưu tiên và phạm vi từ plan/audit đã chốt; không thêm việc ngoài danh sách.
3. Dùng `PROGRESS-BOARD.md` ở gốc dự án nếu người dùng chưa chỉ định file. Nếu file đã có, cập nhật đúng file đó; không tạo bản trùng.
4. Dùng mẫu `assets/PROGRESS-BOARD-TEMPLATE.md`; giữ bảng nhiệm vụ, bảng tổng và quy tắc cập nhật.
5. Cập nhật cùng một bảng sau mỗi thay đổi trạng thái và tính lại số liệu. Cột `Xong` chỉ đếm 🟩.

## Trạng thái bắt buộc

- ⬜ `CHƯA LÀM`: chưa thi công.
- 🟨 `ĐANG LÀM`: đang sửa.
- 🟦 `ĐÃ THI CÔNG`: AI thi công đã làm xong và có bằng chứng kỹ thuật; chưa tính là `Xong`.
- 🟪 `CHỜ NGHIỆM THU CHUỖI`: chỉ dùng khi Đặng Minh Hiếu yêu cầu rõ; không hỏi duyệt từng hàng.
- 🔍 `CHỜ/ĐANG REVIEW ĐỘC LẬP`: một AI khác hoặc task khác đang review read-only.
- 🟥 `REVIEW CÓ LỖI`: reviewer phát hiện vấn đề; ghi ngắn lỗi và đưa hàng liên quan về trạng thái cần sửa.
- 🟩 `HOÀN THÀNH`: reviewer độc lập đạt và Đặng Minh Hiếu chốt `OK`, `HOÀN THÀNH` hoặc câu tương đương. Ghi ngày.

Không tự đổi sang 🟪, 🔍 hoặc 🟩. Đây là cổng nghiệm thu riêng chỉ tồn tại khi người dùng chủ động gọi.

## Review độc lập

- Reviewer không được là chính agent/task vừa thi công.
- AI thi công không được tự review hoặc tự đóng vai reviewer độc lập cho chính thay đổi của mình.
- Review mặc định chỉ đọc: đối chiếu diff, phạm vi, lỗi, bảo mật, test và bằng chứng; không sửa code nếu chưa được giao.
- Ghi reviewer, thời gian, phạm vi, kết quả `PASS/FAIL` và bằng chứng trong mục **Cổng nghiệm thu & review**.
- `FAIL` không xóa lịch sử; cập nhật hàng lỗi và vòng sửa tiếp theo trong cùng bảng.

## Kết quả trả về

Sau mỗi lần cập nhật, trả ngắn:

- file bảng;
- số `Tổng / Xong / Còn lại`;
- trạng thái cổng nghiệm thu/review;
- bước kế tiếp duy nhất.
