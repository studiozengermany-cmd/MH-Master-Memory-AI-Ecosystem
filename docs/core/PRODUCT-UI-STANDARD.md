# TIÊU CHUẨN SẢN PHẨM & GIAO DIỆN — Đặng Minh Hiếu

> **Trạng thái:** Nguyên tắc lõi bắt buộc đọc đối với mọi AI tham gia làm ứng dụng, website, extension hoặc giao diện trong hệ sinh thái Minh Hiếu.

## 1. Quan điểm nền tảng

Chức năng tốt là **nghĩa vụ mặc định của người làm sản phẩm**. Đó không phải lý do để xin người dùng bỏ qua một giao diện kém.

Người dùng không có trách nhiệm đọc code, hiểu backend mạnh đến đâu hoặc thông cảm cho quá trình kỹ thuật bên trong. Điểm tiếp xúc đầu tiên của họ là giao diện và trải nghiệm trực quan. Chỉ trong vài giây, giao diện đã trả lời thay sản phẩm:

- Người làm có chuyên nghiệp và nghiêm túc không?
- Sản phẩm có đáng tin không?
- Người làm có tôn trọng khách hàng, người xem và người sử dụng không?
- Người dùng có muốn tiếp tục mở và sử dụng sản phẩm không?

Vì vậy, giao diện không phải lớp trang trí đặt lên sau cùng. Giao diện là một phần của chất lượng sản phẩm, của niềm tin và của sự tôn trọng người dùng.

## 2. Quy tắc đánh giá sản phẩm

Một sản phẩm có backend hoặc code rất tốt nhưng giao diện khó nhìn, cẩu thả, thiếu cấu trúc hoặc không tạo được niềm tin vẫn bị xem là **không đạt**.

Đối với Đặng Minh Hiếu, nếu giao diện không vừa mắt và không thể hiện đúng mức độ nghiêm túc của sản phẩm, sản phẩm có thể bị loại ngay trước khi chức năng bên trong có cơ hội được trải nghiệm.

Hai lớp chất lượng phải cùng tồn tại:

1. **Chức năng chạy tốt:** đúng mục tiêu, ổn định, an toàn, có bằng chứng kiểm thử.
2. **Giao diện đạt chuẩn:** trực quan, có cơ cấu rõ, nhất quán, dễ dùng, có chất lượng thị giác và đúng thiết kế đã duyệt.

Không lớp nào được dùng để bù hoặc biện minh cho lớp còn lại.

## 3. MVP không đồng nghĩa với giao diện làm tạm

MVP được phép:

- ít tính năng hơn;
- phạm vi nhỏ hơn;
- chưa có các chức năng mở rộng;
- tập trung vào một luồng sử dụng chính.

MVP không được phép:

- dùng giao diện sơ sài chỉ để “có cái bấm”;
- tự chọn font, màu, logo hoặc bố cục tùy tiện;
- dùng placeholder, thành phần giả hoặc trạng thái thiếu;
- mang giao diện generic, template rẻ tiền hoặc “AI aesthetic” đại trà;
- hứa rằng giao diện kém hiện tại sẽ được sửa đẹp sau để xin duyệt chức năng.

> **MVP là ít tính năng nhưng phần đã xuất hiện phải có chất lượng sản phẩm thật. Nhanh về phạm vi không có nghĩa cẩu thả về trải nghiệm.**

Nếu chỉ làm thử kỹ thuật hoặc proof-of-concept không có giao diện, phải gọi đúng tên là thử nghiệm kỹ thuật. Không được trình bày nó như một sản phẩm đã sẵn sàng cho người dùng.

## 4. Thiết kế đã duyệt là tài sản khóa

Khi dự án đã có ảnh tham chiếu, UI plan, design system, prototype hoặc giao diện được Đặng Minh Hiếu duyệt:

- phải đọc trước khi code;
- phải lấy đó làm baseline;
- không tự đổi font, màu, logo, bố cục, khoảng cách, hiệu ứng hoặc ngôn ngữ hình ảnh;
- không tự thay bằng gu của AI hoặc template khác;
- không phá cấu trúc đã duyệt để “làm lại cho hiện đại hơn”;
- chỉ thay đổi ngoài baseline khi có yêu cầu hoặc phê duyệt rõ ràng.

Nếu chưa có thiết kế riêng cho dự án, AI phải làm rõ cơ cấu giao diện và hướng trực quan trước khi xây phần UI đáng kể. Không được tự suy ra một bảng màu hay phong cách chung từ dự án khác.

**Lưu ý:** Tài liệu này khóa tiêu chuẩn chất lượng, không khóa một bảng màu hoặc font duy nhất cho toàn hệ sinh thái. Yêu cầu hiện tại và thiết kế riêng của từng dự án luôn quyết định phong cách cụ thể.

## 5. Cổng kiểm soát UI bắt buộc

Trước khi làm giao diện, AI phải xác định:

1. Sản phẩm này là thử nghiệm kỹ thuật, công cụ dùng nội bộ hay sản phẩm đưa cho người dùng?
2. Bản thiết kế hoặc ảnh tham chiếu nào đã được duyệt?
3. Cấu trúc màn hình, luồng chính và các trạng thái cần có là gì?
4. Những tài sản nào đã khóa và tuyệt đối không được tự đổi?
5. Bằng chứng trực quan nào sẽ dùng để Đặng Minh Hiếu duyệt?

Trước khi báo hoàn thành UI, phải kiểm tra tối thiểu:

- trạng thái mặc định, trống, đang xử lý, thành công và lỗi;
- nội dung dài hoặc dữ liệu nhiều;
- kích thước cửa sổ/màn hình mục tiêu;
- hành vi của các nút và luồng chính.

Build pass hoặc unit test không phải bằng chứng giao diện đạt chuẩn. Phải có kiểm tra trực quan và trải nghiệm thao tác thật.

## 6. Điều AI không được làm

- Không hiểu chữ “nhanh” thành quyền làm giao diện tạm bợ.
- Không lấy backend tốt để phản biện khi người dùng chê giao diện.
- Không tự cho rằng giao diện chỉ là lớp vỏ phụ.
- Không ép người dùng phải khám phá chất lượng code trước khi được thấy một sản phẩm tử tế.
- Không đưa bản UI chưa đạt rồi chuyển gánh nặng cài đặt, ráp nối hoặc sửa thiết kế lại cho Đặng Minh Hiếu.
- Không chấm sản phẩm “dùng được” nếu luồng chạy nhưng giao diện khiến người dùng không muốn sử dụng.

## 7. Cách AI phải báo cáo

Chất lượng chức năng và chất lượng giao diện phải được báo cáo riêng:

```text
Chức năng: Tested / Untested / Một phần — bằng chứng
Giao diện: Đã duyệt / Chưa duyệt / Sai baseline — bằng chứng trực quan
Trải nghiệm người dùng: Đạt / Chưa đạt — luồng đã thao tác thật
```

Không dùng điểm kỹ thuật backend để nâng điểm giao diện. Không dùng giao diện đẹp để che chức năng giả hoặc lỗi.

## 8. Nguyên tắc rút gọn cho mọi AI

> Chức năng tốt là nghĩa vụ mặc định. Giao diện là điểm tiếp xúc đầu tiên, quyết định niềm tin và thể hiện mức độ tôn trọng người dùng. MVP được phép ít tính năng nhưng không được cẩu thả về UI. Thiết kế đã duyệt là tài sản khóa. Nếu giao diện không đạt, sản phẩm chưa đạt dù code bên trong tốt đến đâu.

---

**Nguồn xác nhận:** Đặng Minh Hiếu trực tiếp giải thích ngày 17/07/2026.  
**Phạm vi áp dụng:** Mọi sản phẩm có giao diện trong hệ sinh thái MINH HIEU STUDIO.
