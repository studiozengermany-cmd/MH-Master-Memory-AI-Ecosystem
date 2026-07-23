# 📋 BẢNG ĐỐI CHIẾU TIẾN ĐỘ — <TÊN DỰ ÁN>

> Cập nhật lần cuối: `<YYYY-MM-DD HH:mm GMT+7>`  
> Nguồn: `<plan/audit/task ID>` · Agent cập nhật: `<AI/agent>`

## Quy ước trạng thái

| Ký hiệu | Ý nghĩa |
|---|---|
| ⬜ | Chưa làm |
| 🟨 | Đang làm |
| 🟦 | Đã thi công, có bằng chứng kỹ thuật |
| 🟪 | Chờ nghiệm thu chuỗi — chỉ khi chủ sở hữu yêu cầu |
| 🔍 | Chờ/đang review độc lập |
| 🟥 | Review có lỗi, cần sửa |
| 🟩 | Reviewer đạt và chủ sở hữu đã chốt hoàn thành |

## 🔴 Nhóm 1 — Ưu tiên 1: Critical

| STT | Tác vụ | File liên quan | Loại | Trạng thái |
|---:|---|---|---|---|
| 01 | `<tác vụ>` | `<file>` | `<loại>` | ⬜ CHƯA LÀM |

## 🟡 Nhóm 2 — Ưu tiên 2: Sprint tới

| STT | Tác vụ | File liên quan | Loại | Trạng thái |
|---:|---|---|---|---|
| 02 | `<tác vụ>` | `<file>` | `<loại>` | ⬜ CHƯA LÀM |

## 🟢 Nhóm 3 — Ưu tiên 3: Cải thiện chất lượng

| STT | Tác vụ | File liên quan | Loại | Trạng thái |
|---:|---|---|---|---|
| 03 | `<tác vụ>` | `<file>` | `<loại>` | ⬜ CHƯA LÀM |

## 📊 Tiến độ tổng

| Nhóm | Tổng | Xong | Còn lại |
|---|---:|---:|---:|
| 🔴 Ưu tiên 1 | `<n>` | `<n>` | `<n>` |
| 🟡 Ưu tiên 2 | `<n>` | `<n>` | `<n>` |
| 🟢 Ưu tiên 3 | `<n>` | `<n>` | `<n>` |
| **TỔNG** | **`<n>`** | **`<n>`** | **`<n>`** |

## 🔍 Cổng nghiệm thu & review

| Mục | Giá trị |
|---|---|
| Trạng thái chuỗi | `<Đang thi công / Chờ nghiệm thu / Đang review / Đã chốt>` |
| AI thi công | `<agent/model/task>` |
| AI review độc lập | `<agent/model/task hoặc Chưa chỉ định>` |
| Phạm vi review | `<commit/diff/file>` |
| Kết quả | `<CHƯA REVIEW / PASS / FAIL>` |
| Bằng chứng | `<test/log/report/commit>` |
| Chủ sở hữu chốt | `<câu chốt + thời gian hoặc Chưa>` |

## 📝 Luật cập nhật

1. Kế hoạch được chốt rồi người dùng yêu cầu lập bảng → tạo/cập nhật bảng này.
2. Không tự thêm hoặc bỏ tác vụ; thay đổi phạm vi phải ghi nguồn.
3. Không tự chuyển sang 🟪, 🔍 hoặc 🟩.
4. Chỉ 🟩 mới được tính vào cột `Xong`.
5. Giữ lịch sử lỗi review; không sửa bảng để che vòng làm trước.
