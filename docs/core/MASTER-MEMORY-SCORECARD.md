# KHUNG TÀU — Master Memory & Scorecard đa AI (Minh Hiếu)

> **Mục đích:** Một "khung tàu" cố định để mọi AI (ChatGPT, Claude, Gemini, Notion AI…) cùng ghi cột mốc vào một chỗ, để anh đối chiếu năng lực giữa các phiên/các AI và giảm sai lầm cho anh xuống thấp nhất.
> **Lõi đặt tại:** GitHub main (nguồn sự thật duy nhất). ClickUp chỉ là nháp — không phải nguồn đối chiếu.
> **Nguyên tắc:** Đánh giá bằng trải nghiệm thật + bằng chứng. Sai được, nhưng phải học ra và không lặp lại.

---

## Cách dùng khung này (đọc 30 giây)

1. **Mỗi phiên làm việc**, trước khi kết thúc, AI phải xuất ra **1 Milestone entry** theo mẫu bên dưới.
2. Entry đó dán vào **Master Memory Log** (mục II) — nối tiếp, không xóa cái cũ.
3. Khi anh muốn đối chiếu, chấm vào **Scorecard** (mục III) theo luật bất khả xâm phạm.
4. Định kỳ (tuần/khi anh yêu cầu), tổng kết thành **Review** (mục IV) để xem đang lên hay lùi.

---

# I. Mẫu Milestone Entry (đơn vị chuẩn)

Mọi AI xuất đúng format này, không mỗi con một kiểu:

```
### [YYYY-MM-DD HH:MM] — <Tên AI> — <Dự án>
- Mục tiêu phiên: <làm gì>
- Đã làm: <liệt kê cụ thể>
- Trạng thái: Tested / Untested / Một phần (ghi rõ phần nào)
- Bằng chứng: <log / ảnh / file / commit / lệnh chạy>
- Còn dở / rủi ro: <ghi thật, không giấu>
- Bước tiếp theo đề xuất: <1-3 gạch đầu dòng>
- Lưu ý cho AI sau: <cảnh báo / tài sản đã khóa / đừng đụng gì>
```

**Quy tắc cứng:** không ghi "hoàn thành 100%" nếu chưa có bằng chứng. Chưa test thì ghi Untested. Không bịa.

---

# II. Master Memory Log (dòng thời gian cột mốc)

> Nối tiếp từ trên xuống, mới nhất ở trên cùng. Không xóa entry cũ — đó là timeline.

### [2026-07-21 18:33] — Notion AI — MH Master Memory AI Ecosystem

- **Mục tiêu phiên:** Tiếp nhận vai trò điều phối Master Memory; audit toàn bộ hệ thống; bắt đầu nâng cấp
- **Đã làm:**
  - Đọc toàn bộ repo: AGENTS, AI-BOOTSTRAP, AI-ROLES, DECISION-OS, SCORECARD, PRODUCT-UI-STANDARD, OWNER-PROFILE, MILESTONES
  - Xác định 9 lỗ hổng cần giải quyết
  - Tạo Notion Hub page (MH Master Memory — Notion AI Hub) trong Projects
  - Tạo `CONTEXT-SNAPSHOT.md` tại root repo
  - Tạo 4 boot prompts: `BOOT-NOTION-AI.md`, `BOOT-CHATGPT.md`, `BOOT-CLAUDE.md`, `BOOT-ANTIGRAVITY.md`
  - Cập nhật file Scorecard này: chốt GitHub main = nguồn duy nhất, thêm entry hôm nay
  - Đang tạo `CONTEXT.md` adapter cho repo `studio-minh-hieu`
- **Trạng thái:** Một phần — các file cốt lõi đã tạo; còn OWNER-PROFILE (cần owner trả lời 10 câu hỏi)
- **Bằng chứng:** Commit `c81db8c` (CONTEXT-SNAPSHOT), commit `4440dd2` (boot prompts), commit này (Scorecard), Notion Hub page
- **Còn dở / rủi ro:** 10 câu hỏi OWNER-PROFILE chưa có câu trả lời → AI vẫn thiếu context quan trọng về owner
- **Bước tiếp theo đề xuất:**
  1. Anh trả lời 10 câu hỏi trong `docs/context/OWNER-PROFILE.md`
  2. Notion AI cập nhật `CONTEXT-SNAPSHOT.md` sau khi có câu trả lời
  3. Kích hoạt lại thói quen điền Scorecard sau mỗi phiên
- **Lưu ý cho AI sau:** `CONTEXT-SNAPSHOT.md` là file đọc đầu tiên. Boot prompts đã có trong root repo. Notion AI là điều phối viên chính — không AI nào tự commit lên GitHub trừ khi được phép.

---

### [2026-07-15 21:28] — ClickUp Brain — Hệ thống bộ nhớ trung tâm

- Mục tiêu phiên: Chốt kiến trúc "nguồn mẹ" + dựng khung Master Memory & Scorecard.
- Đã làm: Tạo Doc hồ sơ tổng hợp; lưu nguyên tắc làm việc vào bộ nhớ; dựng khung tàu này.
- Trạng thái: Một phần — khung đã tạo (Tested: doc mở được); cơ chế đồng bộ AI ngoài chưa dựng.
- Bằng chứng: Doc này + Doc hồ sơ tổng hợp trong Personal List.
- Còn dở / rủi ro: Chưa có repo GitHub cho bản public; chưa có boot prompt mẫu để dán vào AI ngoài.
- Bước tiếp theo đề xuất: (1) Duyệt/gọt khung này. (2) Dựng boot prompt. (3) Tách bản public/private.
- Lưu ý cho AI sau: Lõi đặt ở GitHub (đã chuyển từ ClickUp). Không đứa nào được tự đổi cấu trúc khung khi chưa được anh duyệt.

_(Entry mới thêm phía trên dòng này)_

---

# III. Scorecard đối chiếu (chấm theo luật bất khả xâm phạm)

> Mỗi phiên chấm theo 6 tiêu chí. Mỗi tiêu chí: ✅ đạt · ⚠️ một phần · ❌ vi phạm. Ghi ngắn lý do ở cột Ghi chú.

| Tiêu chí | Ý nghĩa |
|---|---|
| 1. Chất lượng thật | Có trải nghiệm/chạy thật, không chỉ vỏ bọc code |
| 2. Trung thực | Ghi đúng Tested/Untested, không nói quá, có bằng chứng |
| 3. Đúng mục tiêu | Không tự đổi mục tiêu, không tự cắt scope |
| 4. Tôn trọng tài sản đã khóa | Không phá Hero/repo đã duyệt, không xóa/ghi đè bừa |
| 5. Chủ động đúng lúc | Hỏi khi mơ hồ, chạy trước một bước, không chờ lệnh từng việc |
| 6. Kết nối hệ sinh thái | Tính được dự án này ghép với dự án khác |

| Ngày | AI | Dự án | 1 | 2 | 3 | 4 | 5 | 6 | Ghi chú |
|---|---|---|---|---|---|---|---|---|---|
| 2026-07-21 | Notion AI | Master Memory | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Audit đủ 9 lỗ hổng; tạo Hub, CONTEXT-SNAPSHOT, 4 boot prompts; chốt GitHub = nguồn duy nhất |
| 2026-07-15 | Brain | Bộ nhớ TT | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | Nói thật giới hạn "dán link là xong"; chốt kiến trúc rõ |

---

# IV. Review định kỳ (lên hay lùi)

> Khi anh yêu cầu tổng kết, điền vào đây. Mục tiêu: thấy xu hướng, không phải đếm điểm.

**Mẫu:**

```
## Review tuần <từ ngày – đến ngày>
- AI làm tốt nhất: <tên> — vì sao (dẫn entry cụ thể)
- Lỗi lặp lại cần chặn: <mô tả>
- Tiến bộ so với tuần trước: <lên/lùi ở tiêu chí nào>
- Điều chỉnh khung/luật (nếu cần): <thay đổi gì>
```

---

# V. Luật bất khả xâm phạm (bản rút gọn — dán cho mọi AI)

1. Chất lượng > số lượng. Không KPI. Thà ít mà anh trải nghiệm được thật.
2. Đánh giá bằng trải nghiệm + bằng chứng. Code vỏ bọc = thua ngay.
3. Ghi rõ Tested/Untested. Không nói "100%" khi thiếu bằng chứng. Không bịa.
4. Không xóa/ghi đè, không lệnh nguy hiểm khi chưa được phép. Tối đa ~3 lệnh rồi dừng kiểm tra.
5. Không đụng tài sản đã khóa (Hero 3D, repo đã duyệt). Chỉ audit khi anh yêu cầu hoặc có lỗi cụ thể.
6. Mơ hồ hoặc tỷ lệ thành công thấp → hỏi thẳng, không đoán.
7. Sai thì nhận rõ, sửa dứt điểm bằng hành động, không vòng vo, không lặp lại.
8. Luôn tính kết nối giữa các dự án trong cùng hệ sinh thái.

---

*Khung này là cố định. Muốn sửa cấu trúc phải được anh duyệt. AI chỉ được THÊM entry/score, không được đổi luật.*
