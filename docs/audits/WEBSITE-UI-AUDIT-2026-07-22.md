# WEBSITE UI AUDIT — studiominhhieu.com

> **Ngày audit:** 22/07/2026  
> **Phạm vi:** Giao diện website đang chạy tại `https://studiominhhieu.com/` và giao diện mới trong repository `studiozengermany-cmd/studio-minh-hieu`.  
> **Mục tiêu:** Chỉ ghi nhận lỗi và độ lệch so với baseline đã xác nhận; không tự thiết kế lại.

## Kết luận thẳng

- **Bản đang chạy trên domain:** khoảng **35%** so với mục tiêu giao diện đã đặt ra.
- **Bản mới trong repository:** khoảng **70% về độ hoàn thiện thị giác**, nhưng chưa đạt để xem là hoàn thành vì chưa đồng bộ lên domain, còn lỗi mobile và còn lệch baseline nhận diện.
- Lỗi lớn nhất hiện tại không phải thiếu hiệu ứng, mà là **website đang chạy và source mới đang kể hai giao diện, hai cấu trúc và hai phiên bản thương hiệu khác nhau**.

## Lỗi mức Critical

### 1. Domain đang chạy bản cũ, không phải giao diện mới trong repository

Bản live vẫn dùng tiêu đề `MINH HIEU STUDIO — Music, Archive & Experiments`, bố cục one-page, tên `SampleGuard FL` và nội dung archive cũ. Source mới đã chuyển sang React/TanStack, nhiều route riêng, hệ sinh thái MH và tên `MH Sample FL`.

**Tác động:** mọi cải tiến giao diện trong repository hiện chưa có giá trị đối với người truy cập domain chính.

### 2. Mobile navigation của source mới có nguy cơ vỡ chắc chắn

Thanh điều hướng mới đặt cố định ở trên, chứa 7 mục điều hướng, nút đổi ngôn ngữ và nút Đăng nhập trong một hàng ngang. Không có hamburger, không có chế độ mobile, không wrap và không scroll ngang. `overflow-x: hidden` ở `html, body` chỉ che phần tràn thay vì xử lý nó.

**Tác động:** trên màn hình điện thoại, mục điều hướng sẽ bị cắt, chồng hoặc không thể truy cập đầy đủ.

### 3. Source mới không giữ baseline Hero 3D đã khóa

Baseline yêu cầu giữ Hero 3D, logo và tên MINH HIEU STUDIO. Source mới hiện dùng hero chữ lớn, bloom tím và animation text; không còn cấu trúc Hero 3D đã khóa.

**Tác động:** giao diện có thể đẹp hơn về mặt template, nhưng đã đổi tài sản nhận diện cốt lõi mà baseline yêu cầu giữ nguyên.

### 4. Không có bottom dock đúng baseline

Baseline ghi rõ dock nhỏ ở đáy màn hình, có tab tròn nổi ở giữa. Source mới thay bằng floating island navigation ở phía trên.

**Tác động:** cấu trúc điều hướng thực tế không khớp thiết kế đã xác nhận.

## Lỗi mức High

### 5. Trang chủ đang ưu tiên “công cụ và nguyên tắc” hơn “Minh Hiếu, âm nhạc và tư liệu thật”

Homepage mới chỉ gồm Hero, hệ sinh thái 5 dự án, tám nguyên tắc và CTA cuối. Không có preview nhạc thật, ảnh biểu diễn thật hoặc tư liệu DJ nổi bật ngay trên homepage.

**Tác động:** người mới vào dễ hiểu đây là website developer-tools/AI hơn là không gian nghề nghiệp lâu dài của DJ/Producer.

### 6. Visual language vẫn mang dấu hiệu AI/SaaS template

Các dấu hiệu gồm floating pill navigation, lavender glow, giant serif italic, intro loader, cursor aurora, magnetic buttons, scroll progress, page transition và chat bubble nổi.

**Tác động:** từng thành phần riêng có độ bóng, nhưng tổng thể dễ giống landing page AI cao cấp hơn một nhận diện riêng của MINH HIEU STUDIO.

### 7. Có quá nhiều lớp hiệu ứng cạnh tranh cùng lúc

Source mới chạy đồng thời intro overlay, animated hero bloom, split text, magnetic hover, cursor aurora, page transition, reveal/stagger, scroll progress và chat bubble.

**Tác động:** hiệu ứng không còn đóng vai trò “tín hiệu” mà bắt đầu trở thành một lớp giao diện thường trực; làm giảm độ tập trung và tăng cảm giác trình diễn.

### 8. Nút Đăng nhập chiếm ưu tiên sai trong điều hướng chính

Nút Đăng nhập có nền lavender nổi bật nhất nav, trong khi website được xác định là không gian âm nhạc, archive và công cụ cá nhân; đăng nhập không phải luồng công khai quan trọng nhất.

**Tác động:** làm website giống một SaaS/app đang bán dịch vụ và đẩy các mục Âm nhạc, Tư liệu, Dự án xuống vai trò phụ.

### 9. Bản live vẫn là một trang dài phẳng

Các mục Home, About, Music, Projects, Archive, Notes và Contact trên domain hiện tại vẫn dẫn trong cùng một trang dài. Baseline yêu cầu các vùng/tab rõ, tab đang mở nổi bật và nội dung có quan hệ logic.

**Tác động:** người dùng phải cuộn qua nhiều khối chữ; website chưa tạo cảm giác một hệ thống nội dung hoàn chỉnh.

### 10. Tên sản phẩm trên live site đã lỗi thời

Domain vẫn dùng `SampleGuard FL`, trong khi nguồn chuẩn đã chốt tên hiện tại là `MH Sample FL`.

**Tác động:** nhận diện website, GitHub và hồ sơ AWS không thống nhất.

## Lỗi mức Medium

### 11. Contact UI của live site chưa đạt mục tiêu chống spam

Live site hiển thị trực tiếp `admin@studiominhhieu.com` nhiều lần và không có form liên hệ công khai đúng baseline.

**Tác động:** tăng nguy cơ spam và làm phần liên hệ giống footer tĩnh hơn một luồng liên hệ hoàn chỉnh.

### 12. Độ tương phản của nhiều nhãn phụ trong source mới quá thấp

Nhiều thành phần dùng `text-ash-gray/40`, `text-lavender-pulse/30`, `/40` hoặc `/50` trên nền đen. Đây là mức opacity thấp đối với chữ nhỏ 11–13px.

**Tác động:** khó đọc trên màn hình kém, ngoài trời và với người có thị lực yếu; không phù hợp mục tiêu WCAG 2.2 AA.

### 13. Mobile hero dùng cỡ chữ cố định quá lớn

H1 dùng `68px` ngay từ mobile và chỉ tăng lên `104px` ở desktop, không dùng `clamp()` hoặc breakpoint nhỏ hơn.

**Tác động:** tiêu đề có nguy cơ xuống dòng gắt, tạo khối đầu trang quá cao hoặc mất cân đối trên màn hình 320–390px.

### 14. Global letter-spacing âm áp lên toàn bộ body

`html, body` dùng `letter-spacing: -0.03em`, sau đó áp cho cả paragraph, input, nav và tiếng Việt.

**Tác động:** chữ tiếng Việt nhỏ có thể bị sít, giảm độ đọc và làm UI thiếu thoáng.

### 15. Intro loader tạo độ trễ không cần thiết

Lần đầu mỗi session, website che toàn màn hình khoảng 1,5 giây trước khi người dùng thấy nội dung.

**Tác động:** tạo cảm giác tải chậm dù nội dung đã sẵn sàng; hiệu ứng thương hiệu chưa đủ giá trị để biện minh cho độ trễ.

### 16. Homepage lặp thông điệp phòng thủ quá nhiều

Thông điệp `Bằng chứng trước tuyên bố`, `Không phóng đại`, trạng thái và nguyên tắc xuất hiện ở meta, footer, section nguyên tắc và closing CTA.

**Tác động:** thương hiệu nói nhiều về việc không làm sai hơn là cho người xem thấy ngay âm nhạc, con người và tác phẩm thật.

## Trạng thái sau audit

- **Chức năng:** Chưa kiểm thử đầy đủ trên domain mới.
- **Giao diện live:** Sai phiên bản / chưa đồng bộ source mới.
- **Giao diện source mới:** Chưa duyệt; còn lỗi responsive và lệch baseline.
- **Trải nghiệm mobile:** Chưa đạt do cấu trúc navigation.
- **Tài sản khóa:** Hero 3D và bottom dock chưa được giữ trong source mới.
