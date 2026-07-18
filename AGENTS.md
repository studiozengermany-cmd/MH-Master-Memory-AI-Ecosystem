# AGENTS.md — Luật vào hệ thống

Tài liệu này áp dụng cho mọi AI Agent làm việc trong kho.

## Thứ tự đọc bắt buộc

1. `README.md`
2. `AI-ROLES.md`
3. `docs/context/OWNER-PROFILE.md`, đặc biệt mục G về cách làm việc
4. `docs/core/DECISION-OPERATING-SYSTEM.md`
5. `docs/core/PRODUCT-UI-STANDARD.md` nếu nhiệm vụ có ứng dụng, website, extension hoặc giao diện
6. `docs/core/MASTER-MEMORY-SCORECARD.md`
7. Tài liệu dự án được giao
8. Các tài liệu khác trong `docs/context/` chỉ khi nhiệm vụ cần thêm bối cảnh cá nhân hoặc toàn hệ sinh thái

## Trước khi thay đổi

- Nói rõ mục tiêu và phạm vi.
- Khi có kết nối GitHub, kiểm tra `origin/main` mới nhất để không làm việc từ bộ nhớ cũ.
- Kiểm tra tài sản đã khóa và thay đổi đang tồn tại.
- Không xóa, ghi đè, đổi cấu trúc lớn, commit, push hoặc deploy nếu chưa có quyền rõ ràng.
- Không đưa dữ liệu nội bộ, thông tin cá nhân hoặc bí mật vào log công khai.

## Khi thực thi

- Ưu tiên kết quả chạy thật.
- Không tạo placeholder, TODO giả, nút giả hoặc bằng chứng giả.
- Không tự mở rộng phạm vi chỉ để sản phẩm trông lớn hơn.
- Nếu phát hiện lỗi nền tảng, dừng mở rộng và báo tác động trước.
- Không được dùng sự thận trọng, giới hạn quyền hạn hoặc câu “không tự ý làm” làm lý do đứng ngoài vấn đề hay đẩy toàn bộ trách nhiệm giải quyết ngược lại cho chủ sở hữu. Phải tiếp tục xử lý mọi phần an toàn đã rõ, cùng chủ sở hữu tìm hướng giải quyết và hỏi ngắn gọn đúng phần còn thiếu.
- Khi chưa thể thực hiện ngay, phản hồi bắt buộc phải có: vấn đề đã hiểu, phương án ưu tiên, phần AI có thể làm ngay và câu hỏi/quyền cần bổ sung. Không kết thúc ở việc nói “chưa làm gì” hoặc chỉ liệt kê điều AI sẽ không làm, trừ khi chủ sở hữu yêu cầu dừng hoàn toàn.
- Khi lời nói của chủ sở hữu mang tính cảm thán hoặc còn mơ hồ trong một công việc đang diễn ra, phải giữ mạch bối cảnh, xác nhận ý định nếu cần và chủ động đề xuất cách xử lý; không tự biến nó thành một yêu cầu không liên quan.
- Nếu AI hiểu sai hoặc gây lỗi, xin lỗi chỉ là bước đầu. Phải nhận đúng tác động, sửa phần có thể sửa, đưa ra cách giải quyết tiếp theo và ghi biện pháp ngăn tái diễn khi lỗi có nguy cơ lặp lại.
- Chỉ dùng `prompt-master` khi người dùng yêu cầu viết, sửa, audit hoặc chuyển đổi prompt; không dùng skill này thay cho việc thực thi nhiệm vụ trực tiếp.
- Với sản phẩm có UI, chức năng tốt và giao diện đạt chuẩn là hai cổng độc lập. Không dùng chữ “nhanh” hoặc “MVP” để biện minh cho giao diện làm tạm; thiết kế đã duyệt là tài sản khóa.
- Mã nguồn đang có, build pass hoặc báo cáo của AI trước không tự động có nghĩa là chủ sở hữu đã duyệt kết quả.
- Khi người dùng yêu cầu “gom”, phải hợp nhất toàn bộ yêu cầu thành một bản cuối ngắn và nhất quán; không phát hành chuỗi prompt vá theo từng câu sửa.
- Nếu có thuật ngữ hoặc biểu mẫu tiếng Anh, phải giải thích bằng tiếng Việt để chủ sở hữu hiểu trước khi quyết định.

## Khi kết thúc phiên

Thêm một entry vào `logs/MILESTONES.md` theo `templates/MILESTONE-ENTRY.md`. Phải ghi rõ:

- mục tiêu;
- phần đã làm;
- trạng thái Tested / Untested / Một phần;
- bằng chứng;
- phần còn dở và rủi ro;
- bước tiếp theo;
- cảnh báo cho AI sau.

Không sửa hoặc xóa lịch sử cũ để làm đẹp báo cáo.

Nếu trong phiên có xác nhận, sửa sai, quyết định hoặc sở thích mới từ Đặng Minh Hiếu:

- bổ sung vào tài liệu hiện có phù hợp; không tạo hồ sơ trùng;
- thêm Milestone mới;
- loại bỏ hoặc đánh dấu thông tin cũ đã bị thay thế để AI sau không tiếp tục dùng;
- đẩy bản cập nhật Master Memory lên GitHub bằng branch/PR an toàn trong ngày khi có quyền và kết nối;
- không tạo commit rỗng nếu không có thông tin mới đã xác nhận.
