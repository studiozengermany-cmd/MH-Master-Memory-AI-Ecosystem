# CONTEXT-SNAPSHOT — MH Master Memory AI Ecosystem

> **HƯẾNG DẪN SỬ DỤNG:** Dán toàn bộ file này vào đầu mỗi phiên làm việc với bất kỳ AI nào.
> File này được cập nhật sau mỗi phiên quan trọng. Nguồn sự thật: GitHub main branch.
> Lần cập nhật gần nhất: 2026-07-21 19:15 ICT | Cập nhật bởi: Notion AI

---

## 1. OWNER

- **Tên:** Minh Hiếu (gọi là Minh Hiếu hoặc producer Minh Hiếu, không dùng HIEU DONALD trừ khi nhắc lịch sử)
- **Email:** admin@studiominhhieu.com / support@studiominhhieu.com (cái nào cũng được)
- **Vai trò:** DJ / Producer 4 năm (~từ 2022), tự học AI + code + xây thương hiệu
- **Địa điểm:** Vĩnh Long, Việt Nam | Google Maps: https://maps.app.goo.gl/bRnmxD1avHDAsAzk6
- **Website:** https://studiominhhieu.com/
- **Triết lý:** Bình dân nhưng chất lượng. AI là cộng sự, không phải kẻ thay thế.
- **Khán giả:** Người bình dân có chí cầu tiến, điều kiện chưa có nhiều — cả dân code lẫn anh em làm nhạc.

**Mạng xã hội:**
- Facebook: https://www.facebook.com/DJ.HieuDonald
- YouTube: https://www.youtube.com/@TheFootprintAudio
- SoundCloud: https://soundcloud.com/djhieudonald
- DiiJam: https://play.diijam.vn/artists/3989
- GitHub: studiozengermany-cmd

**Hồ sơ đầy đủ:** `docs/context/OWNER-PROFILE.md` (SHA hiện tại: `4ebca8ea`)

---

## 2. HỆ SINH THÁI DỰ ÁN (tính đến 2026-07-21)

| Repo | Mục đích | Trạng thái |
|------|----------|------------|
| `MH-Master-Memory-AI-Ecosystem` | Bộ nhớ trung tâm, quy tắc làm việc với AI | 🟢 Hoạt động |
| `studio-minh-hieu` | Website chính thức | 🟡 Đang tối ưu |
| `MH-Quantum-Inspector` | Chrome extension kiểm tra chất lượng | ⚪ Chờ |
| `MH-SAMPLE-FL-2026-` | Quản lý sample FL Studio | 🟡 Alpha |
| `MH---DOWSAMPLE-PRO` | Kiểm tra, phân loại sample | 🟡 Có thể di chuyển file |
| `MH-FileOS` | Tổ chức file an toàn | 🟡 Read-only slice |

---

## 3. QUYẾT ĐỊNH ĐANG HIỆU LỰC

1. **GitHub main = nguồn sự thật duy nhất** — ClickUp chỉ là nháp
2. **Notion AI là điều phối viên bộ nhớ trung tâm** — ghi nhật ký phiên, cập nhật Notion + GitHub
3. **Mọi thay đổi quan trọng phải có bằng chứng** — link commit, link Notion page, hoặc file
4. **Tên chính thức của tool sample là MH Sample FL** — không dùng "SampleGuard FL"
5. **Website `studio-minh-hieu`**: React + TS + Vite + TanStack Router + Supabase + Vercel

---

## 4. TÀI SẢN ĐANG KHÓA

- **Tên thương hiệu:** MINH HIEU STUDIO
- **Trên hero:** "Minh Hieu Studio."
- **Tagline:** "Âm nhạc và công cụ, làm bởi Minh Hiếu."
- **Màu chính đang dùng trên web:** Void-black `#0A0A0A`, Ghost-white `#F5F5F5`, Lavender-pulse `#9984D8`
- **Font chính:** Inter (body), Plus Jakarta Sans (display), Instrument Serif (accent italic)
- **Giọng điệu:** Chuyên nghiệp, trực tiếp, không rưỜm rà

---

## 5. CẤU TRÚC WEBSITE `studio-minh-hieu`

**Routes hiện có:**

| Route | Tên | Trong nav? |
|---|---|---|
| `/` | Trang Chủ | ✅ |
| `/am-nhac` | Âm Nhạc | ✅ |
| `/tu-lieu` | Tư Liệu | ✅ |
| `/du-an` | Dự Án | ✅ |
| `/ghi-chu` | Ghi Chú | ✅ |
| `/gioi-thieu` | Giới Thiệu | ✅ |
| `/dang-nhap` | Đăng Nhập | ✅ (button) |
| `/lien-he` | Liên Hệ | ❌ Không có trong nav |

**Components chính:**
- `SiteBackground`, `IntroLoader`, `ScrollProgress`, `PageTransition`
- `TopNav` (floating island pill nav)
- `ChatBubble`, `Magnetic`, `Reveal`, `SplitText`, `StagGroup`
- `LanguageSwitcher` (VI/EN)
- `SampleGuardCard` (tên cũ), `StudioMinhHieuCard`

**Issues đã audit (2026-07-21):**
1. README mô tả HTML/CSS/JS + GitHub Pages — sai toàn bộ, thực tế là React/Vite/Vercel
2. `PrinciplesSection` dựng sẵn nhưng bị bỏ qua (không render trong Home)
3. `/lien-he` tồn tại nhưng không có trong nav
4. `sampleguard-card.tsx` vẫn dùng tên cũ
5. `.env` có trong repo (cần kiểm tra gitignore)
6. Thiếu `og:image` / `twitter:image` cho social sharing
7. Font load 4 fonts song song — chưa tối ưu
8. `error_report.md` trong root — có lỗi chưa giải quyết

---

## 6. AI ĐANG HOẠT ĐỘNG

| AI | Vai trò | Điểm vào |
|----|---------|----------|
| **Notion AI** | Điều phối viên bộ nhớ, ghi nhật ký, quản lý Notion | Notion workspace Studiominhhieu |
| **ChatGPT** | Copywriting, brainstorm, nội dung dài | Dán `CONTEXT-SNAPSHOT.md` vào đầu phiên |
| **Claude** | Phân tích kỹ thuật, code review | Dán `CONTEXT-SNAPSHOT.md` vào đầu phiên |
| **AntiGravity** | *(vai trò chưa xác định rõ)* | Dán `CONTEXT-SNAPSHOT.md` vào đầu phiên |

---

## 7. NHẬT KÝ CÁC PHIÊN GẦN NHẤT

### [2026-07-21] — Notion AI — Phiên khởi động Hub + xây dựng bộ nhớ
**Đã làm:**
- Audit repo Master Memory (9 lỗ hổng) → tạo Notion Hub
- Tạo CONTEXT-SNAPSHOT.md, 4 boot prompts, SCORECARD update
- Tạo CONTEXT.md cho `studio-minh-hieu` và `MH-Quantum-Inspector`
- Hoàn thiện toàn bộ OWNER-PROFILE.md (tên, mạng xã hội, địa chỉ, khán giả, website audit)
- Audit sơ bộ website `studio-minh-hieu` — tìm 8 issues

**Bằng chứng commit:**
- `c81db8c` CONTEXT-SNAPSHOT
- `4440dd2` 4 boot prompts
- `48900c8` SCORECARD
- `9b4c26d` CONTEXT studio-minh-hieu
- `feb26b0` CONTEXT MH-Quantum-Inspector
- `9b27325`, `eb23684`, `e928e43`, `996ad50` OWNER-PROFILE (4 lần update)
- `ed23206` địa chỉ doanh nghiệp + SoundCloud + DiiJam

**Notion Hub:** Workspace Studiominhhieu — 🧠 MH Master Memory — Notion AI Hub

---

## 8. CẢNH BÁO HIỆN TẠI

⚠️ **README `studio-minh-hieu` hoàn toàn lỗi thời** — mô tả HTML/CSS/JS nhưng code là React/TS/Vite
⚠️ **`.env` trong repo** — kiểm tra xem có bị commit sensitive vars không
⚠️ **`PrinciplesSection` bị bỏ qua** — component được viết xong nhưng không được render
⚠️ **`/lien-he` không có trong nav** — trang liên hệ bị giấu
⚠️ **`sampleguard-card.tsx` dùng tên cũ** — phải đổi thành MH Sample FL

---

*File này do Notion AI tạo và duy trì. Cập nhật sau mỗi phiên làm việc quan trọng.*
