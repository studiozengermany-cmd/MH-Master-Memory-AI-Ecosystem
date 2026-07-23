# Master Memory Log

> Mới nhất ở trên cùng. Chỉ thêm entry; không xóa lịch sử cũ.

### [2026-07-23 12:45] — ChatGPT/Codex — TASK-20260723-1138-GEMINI-GLOBAL-SETUP — Tổng kết `/MASTER`

- Mục tiêu phiên: Đối chiếu toàn bộ việc từ đầu ngày và xác định chính xác phần đã xong.
- Đã làm: Xác nhận ba lớp đã được cài: Task Ledger + cờ `/master`; Antigravity global cho bản thường và IDE; Codex nằm trong ChatGPT. Sửa mô tả cũ để không coi Codex là ứng dụng độc lập và không còn báo Gemini chưa được nối.
- Trạng thái: Một phần — file, hook, sandbox, kiểm thử script và GitHub đã xong; chưa có bằng chứng giao diện sau khi nạp lại ứng dụng và trust hook Codex.
- Bằng chứng: Chín file điều khiển tồn tại và read-only; Codex dùng `workspace-write`; mirror sạch tại commit `85cf420`; tiến trình Antigravity và Codex đều được mở trước lần cài; config Codex mới chỉ có trust hash của DCG cũ.
- Còn dở / rủi ro: Phải mở lại Antigravity/IDE và mở task Codex mới; review/trust các hook Codex mới một lần. Không được gọi 100% trước bằng chứng này.
- Bước tiếp theo đề xuất: Nạp lại hai ứng dụng; chạy một thử nghiệm trong giao diện với file ngoài workspace; nếu DENY và log xuất hiện thì xin chủ sở hữu nghiệm thu hai Task ID.
- Lưu ý cho AI sau: Codex ở đây là Codex trong ChatGPT Workspace. Không tải context dài; mỗi sản phẩm một workspace/cửa sổ; log kỹ thuật không chống sửa tuyệt đối.

### [2026-07-23 12:29] — ChatGPT/Codex — TASK-20260723-1138-GEMINI-GLOBAL-SETUP — Mở rộng sang Codex

- Mục tiêu phiên: Áp cùng quy tắc phạm vi, bằng chứng và Master Memory cho Antigravity thường, Antigravity IDE và Codex.
- Đã làm: Cài Codex `SessionStart` tự sync mirror GitHub và chỉ nạp tóm tắt task ngắn; cài scope guard + evidence log cho `.gemini` và `.codex`; giữ DCG; chuyển Codex sang `workspace-write`; thêm luật không lách hook bằng terminal; khóa read-only chín file điều khiển.
- Trạng thái: Một phần — cấu hình và script đã qua ma trận thực thi; ứng dụng cần task/cửa sổ mới để nạp; Codex cần review/trust hook mới theo cơ chế chính thức.
- Bằng chứng: Trong dự án ALLOW; ngoài dự án, `..\`, ổ khác và nhiều workspace DENY; hash trước/sau thay đổi đúng; Codex bootstrap sync đúng commit và trả 775 ký tự; JSON/TOML/PowerShell hợp lệ; `codex doctor` có 0 warn, 0 fail; backup `J:\_codex_backups\ai-global-guards\20260723-121957-before-install`.
- Còn dở / rủi ro: Không tự giả mạo trust hash của Codex; log kỹ thuật vẫn có thể bị người có quyền máy sửa; mỗi sản phẩm vẫn phải mở một cửa sổ/workspace riêng.
- Bước tiếp theo đề xuất: Mở task Codex mới và cửa sổ Antigravity mới; review/trust đúng hai hook Codex một lần; thử một lệnh đọc ngoài dự án để thấy DENY thật.
- Lưu ý cho AI sau: Không gộp nhiều dự án vào một workspace; không dùng terminal để vòng qua scope guard; chỉ đọc context ngắn từ Task Ledger/State trước khi cần tài liệu sâu.

### [2026-07-23 11:44] — ChatGPT/Codex — TASK-20260723-1138-GEMINI-GLOBAL-SETUP

- Mục tiêu phiên: Thiết lập Antigravity toàn cục đọc bộ nhớ ngắn, tự sync GitHub an toàn và hỗ trợ workflow `/master`.
- Đã làm: Tạo `.gemini/GEMINI.md`; chuyển `hooks.json` sang schema Antigravity 2.0 và giữ `dcg`; tạo hook sync/inject lần gọi đầu; tạo workflow global `/master`; clone mirror GitHub vào vùng app data; khóa read-only bốn file điều khiển.
- Trạng thái: Một phần — script, JSON, Git sync và giới hạn context đã được test; chưa gọi model/credit để kiểm thử giao diện Antigravity thật.
- Bằng chứng: Hook PowerShell 5 exit 0; commit mirror khớp `origin/main`; lần đầu inject 2.041 ký tự có đúng Task ID, lần sau inject 0; backup `J:\_codex_backups\.gemini\20260723-114019-before-global-setup`.
- Còn dở / rủi ro: Conversation Antigravity đang mở có thể giữ context cũ; local Master Memory tại `J:` vẫn dirty và không được dùng làm mirror tự động.
- Bước tiếp theo đề xuất: Mở conversation Antigravity mới; xác nhận global rule và workflow `/master` xuất hiện mà không dùng thêm tài liệu dài.
- Lưu ý cho AI sau: Nguồn chuẩn là GitHub `main`; không tự ghi đè global rule/hook/workflow; sync chỉ fast-forward, lỗi thì báo `MASTER MEMORY NOT SYNCED`.

### [2026-07-23 11:32] — ChatGPT/Codex — TASK-20260723-1118-CODEX-TASK-LEDGER — Cờ master

- Mục tiêu phiên: Bổ sung cách phân biệt việc nhỏ/lớn và cờ cưỡng bức lưu tác vụ theo yêu cầu trực tiếp của Đặng Minh Hiếu.
- Đã làm: Quy định việc nhỏ chỉ khi mọi điều kiện an toàn đều đạt; nếu không chắc thì là việc lớn; nhận `/master`, `- master`, `• master` làm cờ buộc lưu và đồng bộ tác vụ hiện tại trước bước tiếp theo.
- Trạng thái: Một phần — nội dung và diff đã được kiểm tra; Task ID vẫn chưa được chủ sở hữu nghiệm thu.
- Bằng chứng: Cờ `/master` trong yêu cầu ngày 2026-07-23 và diff của cùng Task ID.
- Còn dở / rủi ro: Gemini toàn cục trong `.gemini` chưa được nối; cờ chỉ có hiệu lực với AI đọc bản Master Memory mới.
- Bước tiếp theo đề xuất: Push GitHub `main`, rồi chờ chủ sở hữu nghiệm thu Task ID.
- Lưu ý cho AI sau: Cờ `master` buộc lưu tác vụ, nhưng không tự cấp quyền sửa sản phẩm, xóa, deploy hoặc phát sinh chi phí.

### [2026-07-23 11:18] — ChatGPT/Codex — TASK-20260723-1118-CODEX-TASK-LEDGER

- Mục tiêu phiên: Tạo sổ ký bắt buộc để mọi AI/agent đăng ký tác vụ lớn và không tự tuyên bố hoàn thành trước khi Đặng Minh Hiếu nghiệm thu.
- Đã làm: Tạo `TASK-LEDGER.md`; nối vào `AGENTS.md`, `AI-BOOTSTRAP.md`, `GEMINI.md`, `LOVABLE.md` và README; phân biệt quyền bắt đầu với xác nhận hoàn thành.
- Trạng thái: Một phần — nội dung và liên kết đã được kiểm tra; tác vụ vẫn phải giữ `CHỜ ANH DUYỆT` sau khi thi công.
- Bằng chứng: Task ID `TASK-20260723-1118-CODEX-TASK-LEDGER`, diff Git và commit của phiên.
- Còn dở / rủi ro: Quy tắc chỉ có hiệu lực với AI đọc bản GitHub/local mới; cấu hình Gemini toàn cục trong `C:\Users\Minh Hieu Producer\.gemini` chưa được nối.
- Bước tiếp theo đề xuất: Sau khi chủ sở hữu nghiệm thu, cập nhật Task ID thành `HOÀN THÀNH — ĐÃ DUYỆT`; sau đó nối Gemini toàn cục bằng adapter ngắn.
- Lưu ý cho AI sau: `OK, LÀM ĐI` chỉ cấp quyền thi công. Chưa có câu nghiệm thu rõ thì không được ghi hoàn thành.

### [2026-07-23 11:10] — ChatGPT/Codex — Bổ sung State, Risk Tiers và Drift Audit

- Mục tiêu phiên: Thêm lớp hiện trạng, phân tầng rủi ro và kiểm tra sai lệch định kỳ vào Master Memory.
- Đã làm: Thêm `STATE.md`, `docs/core/RISK-TIERS.md`, `docs/core/DRIFT-AUDIT.md`; nối thứ tự đọc trong `AI-BOOTSTRAP.md` và README; giữ nguyên cấu trúc `MASTER-MEMORY-SCORECARD.md`.
- Trạng thái: Một phần — nội dung và liên kết tài liệu đã được kiểm tra; cơ chế đồng bộ tự động giữa GitHub và các máy chưa được triển khai.
- Bằng chứng: Diff Git của sáu file trong nhánh xuất bản và commit của phiên.
- Còn dở / rủi ro: `STATE.md` vẫn là mẫu chưa điền dữ liệu dự án; local không tự nhận thay đổi từ GitHub nếu chưa pull/sync.
- Bước tiếp theo đề xuất: Điền nguồn sự thật hiện tại vào `STATE.md`; cấu hình từng AI đọc bản local đã cập nhật trước khi làm việc.
- Lưu ý cho AI sau: Đọc `STATE.md` trước mọi file khác; không sửa cấu trúc `MASTER-MEMORY-SCORECARD.md`; nếu nguồn lệch hoặc không rõ người đang viết thì xử lý theo Tier 3.

### [2026-07-18 17:09] — ChatGPT/Codex — Trách nhiệm đồng hành giải quyết vấn đề

- Mục tiêu phiên: Loại bỏ cách xử lý trong đó AI vin vào sự thận trọng hoặc câu “không tự ý làm” để đứng ngoài vấn đề và đẩy trách nhiệm điều phối ngược lại cho Đặng Minh Hiếu.
- Đã làm: Bổ sung xác nhận trực tiếp vào `docs/context/OWNER-PROFILE.md`; thêm luật bắt buộc vào `AGENTS.md`; cập nhật vai trò ChatGPT/Codex trong `AI-ROLES.md`; quy định AI phải giữ mạch bối cảnh, làm phần an toàn đã rõ, đề xuất phương án ưu tiên, hỏi đúng điểm còn thiếu và sửa sai bằng hành động thay vì chỉ xin lỗi.
- Trạng thái: Tested — đã cập nhật tài liệu vận hành và sẽ kiểm tra diff/lỗi khoảng trắng; đây là thay đổi Master Memory, không phải kiểm thử sản phẩm.
- Bằng chứng: `docs/context/OWNER-PROFILE.md`, `AGENTS.md`, `AI-ROLES.md` và diff Git của phiên.
- Còn dở / rủi ro: Quy tắc chỉ có hiệu lực với AI đọc bản Master Memory mới nhất; chất lượng thực tế phải tiếp tục được chứng minh qua cách xử lý các nhiệm vụ sau.
- Bước tiếp theo đề xuất: Đồng bộ thay đổi lên GitHub `main`; ở nhiệm vụ kế tiếp, áp dụng ngay bằng cách chủ động đưa hướng giải quyết thay vì chỉ liệt kê giới hạn.
- Lưu ý cho AI sau: Không bắt anh Hiếu tự làm project manager cho AI. Thận trọng là để bảo vệ dữ liệu và quyết định, không phải lý do bỏ mặc; nếu phải dừng ở điểm rủi ro thì vẫn phải đưa phương án, làm phần an toàn và hỏi tối thiểu để mở khóa.

### [2026-07-18 15:31] — ChatGPT/Codex — Chuẩn hóa cách AI làm việc với Minh Hiếu

- Mục tiêu phiên: Bổ sung các xác nhận mới nhất vào Master Memory sẵn có trên GitHub để các AI khác không lặp lại lỗi cũ.
- Đã làm: Bổ sung trực tiếp vào `docs/context/OWNER-PROFILE.md`; cập nhật `AGENTS.md`, `AI-BOOTSTRAP.md`, `LOVABLE.md` và `README.md`; sửa thông tin cũ từng hiểu MinhLyTeam như nhãn cộng tác và từng khóa sai toàn bộ Hero; ghi rõ website do một mình Đặng Minh Hiếu thực hiện, `Collab spec` phải bị loại bỏ, MinhLyTeam không nằm trong Hero, cùng các sở thích giao diện và quy tắc prompt đã xác nhận ngày 18/07/2026; thêm quy trình kiểm tra GitHub trước khi làm và cập nhật Master Memory trong ngày khi có thông tin mới.
- Trạng thái: Tested — đã đối chiếu nội dung mới với các xác nhận trực tiếp trong phiên, kiểm tra diff và lỗi khoảng trắng; đây là thay đổi tài liệu, không phải kiểm thử website.
- Bằng chứng: `docs/context/OWNER-PROFILE.md`, `AGENTS.md`, `AI-BOOTSTRAP.md`, `LOVABLE.md`, `README.md` và diff Git của phiên.
- Còn dở / rủi ro: Các AI chỉ nhận quy tắc mới sau khi thay đổi được nhập vào nhánh chính và chúng đọc bản GitHub mới nhất; từng repository sản phẩm vẫn cần adapter riêng nếu không đọc trực tiếp Master Memory.
- Bước tiếp theo đề xuất: Đưa thay đổi lên GitHub; sau khi được nhập vào nhánh mặc định, cấu hình từng AI đọc `AGENTS.md` hoặc adapter tương ứng trước khi nhận việc.
- Lưu ý cho AI sau: Dùng tiếng Việt và giải thích tiếng Anh; không sửa prompt theo từng câu rời; “gom” nghĩa là một bản cuối ngắn, thống nhất và có hành động; build pass hoặc giao diện đang tồn tại không đồng nghĩa đã được duyệt; không tái đưa nội dung chủ sở hữu đã bác bỏ trở lại sản phẩm.

### [2026-07-17] — ChatGPT/Codex — Tiêu chuẩn sản phẩm và giao diện

- Mục tiêu phiên: Lưu quan điểm trực tiếp của Đặng Minh Hiếu về vai trò của UI và chất lượng sản phẩm để mọi AI sau đọc được.
- Đã làm: Tạo `docs/core/PRODUCT-UI-STANDARD.md`; bổ sung vào thứ tự đọc bắt buộc; khóa nguyên tắc “MVP ít tính năng nhưng không được cẩu thả về UI”; tách bằng chứng chức năng, giao diện và trải nghiệm người dùng.
- Trạng thái: Tested — tài liệu đã được tạo và kiểm tra định dạng; chưa áp dụng thử vào một dự án UI mới.
- Bằng chứng: `docs/core/PRODUCT-UI-STANDARD.md`, `AGENTS.md`, `README.md`, `docs/core/DECISION-OPERATING-SYSTEM.md`.
- Còn dở / rủi ro: Các repository sản phẩm cũ chưa chắc đã trỏ đến tiêu chuẩn mới này.
- Bước tiếp theo đề xuất: Khi mở từng repository sản phẩm, thêm adapter ngắn trỏ về tiêu chuẩn UI chung và design baseline riêng của dự án đó.
- Lưu ý cho AI sau: Không áp một palette/font chung cho mọi dự án; phải dùng yêu cầu hiện tại và thiết kế riêng đã duyệt. Không dùng backend tốt để bù cho UI chưa đạt.

### [2026-07-17 17:33] — ChatGPT/Codex — Sự cố điều phối MH-Dowsample Extension

- Mục tiêu phiên: Review giao diện Lovable, viết prompt giao việc đúng phạm vi và bảo vệ bản extension đang dùng.
- Đã làm: ChatGPT/Codex đã trộn ba nhiệm vụ review, viết prompt và thực thi; đồng thời để ba nguồn local, GitHub `main` và Lovable phát triển lệch nhau. AI đã hướng Lovable loại bỏ phần preview nhưng sau đó chỉ dẫn sai rằng không cần khôi phục `PopupView.tsx`, lấy popup production cũ từ `main` và đóng gói lại. AI còn khẳng định sai icons tồn tại trên GitHub vì nhầm file local chưa commit với file remote.
- Trạng thái: Một phần — đã xác minh và ghi nhận sự cố; chưa thực hiện phục hồi sản phẩm theo yêu cầu dừng thao tác của chủ sở hữu.
- Bằng chứng: `origin/main` chỉ có `extension/manifest.json`, `popup.html`, `popup.css`, `popup.js`; bốn file này khác các file trong working tree local. Báo cáo Lovable xác nhận đã xóa source preview/giao diện và đóng ZIP từ popup cũ. Các quy tắc bị vi phạm được đối chiếu tại `AGENTS.md`, `AI-ROLES.md`, `LOVABLE.md`, `docs/core/DECISION-OPERATING-SYSTEM.md` và `skills/prompt-master/SKILL.md`.
- Tác động lên chủ sở hữu: Mất thời gian, rối nguồn sự thật, lo ngại mất giao diện đã duyệt, giảm niềm tin và làm gián đoạn sinh hoạt cá nhân.
- Nguyên nhân gốc: Không đi qua Gate A để hỏi khi mục tiêu và nguồn code còn mơ hồ; không phân biệt review với implementation; không giữ Lovable trong Design Plane; không xác minh remote trước khi đưa dữ kiện vào prompt; không thiết lập một nguồn sự thật và một người viết duy nhất.
- Còn dở / rủi ro: Repo local còn thay đổi chưa commit; GitHub `main` vẫn là extension cũ; project Lovable đã thay đổi source; chưa có một bản production thống nhất và chưa kiểm thử end-to-end trên Windows/Brave.
- Bước tiếp theo đề xuất: Không tự phục hồi. Chờ chủ sở hữu chọn nguồn cần giữ; trước mọi hành động phải chụp hiện trạng/backup, xác nhận chính xác phạm vi file và xin duyệt kế hoạch phục hồi.
- Lưu ý cho AI sau: `review` mặc định là đọc và báo cáo, không sửa. Khi người dùng yêu cầu prompt, chỉ trả prompt. Nếu local, remote và công cụ thiết kế khác nhau thì dừng và hỏi nguồn nào là chuẩn. Không xóa hoặc hướng công cụ khác xóa component chưa phân loại. Lovable chỉ xử lý Design Plane trừ khi chủ sở hữu giao rõ phạm vi khác. Không tuyên bố sản phẩm dùng được dựa trên typecheck/build/test mô phỏng; cần bằng chứng trải nghiệm thật.

### [2026-07-16] — ChatGPT/Codex — Prompt Master đa nền tảng

- Mục tiêu phiên: Chuẩn hóa nguồn `prompt-master` và triển khai cùng một lõi cho ChatGPT/Codex, Claude Code và Google Antigravity.
- Đã làm: Loại bỏ khẳng định cứng theo phiên bản model; thêm ranh giới quyền hạn, bảo vệ bí mật, điều kiện dừng; cài skill cá nhân cho ChatGPT/Codex; thêm project skill cho Claude Code; thêm bộ cài Windows cho Claude Code và Antigravity; ghi hướng dẫn sử dụng.
- Trạng thái: Một phần — lõi skill đã qua validator và bản ChatGPT/Codex đã được cài; bộ cài Claude Code/Antigravity chưa được chạy trên máy Windows của anh.
- Bằng chứng: `skills/prompt-master/`, `.claude/skills/prompt-master/`, `scripts/install-prompt-master-windows.ps1`, `docs/setup/PROMPT-MASTER.md`.
- Còn dở / rủi ro: Cần chạy bộ cài một lần trên máy anh và mở phiên mới để xác nhận Antigravity nhận skill.
- Bước tiếp theo đề xuất: Chạy script Windows; thử một yêu cầu `/prompt-master` trên Claude Code và một yêu cầu Prompt Master trên Antigravity.
- Lưu ý cho AI sau: Hai gói RAR chỉ là nguồn tham khảo; không cài hàng loạt hoặc trộn nội dung chưa kiểm định vào lõi.

### [2026-07-16] — ChatGPT/Codex — Phân công đa AI

- Mục tiêu phiên: Chia vai trò theo công cụ anh đang sử dụng thực tế.
- Đã làm: Chốt Antigravity là môi trường thi công chính; ChatGPT/Codex là một đầu não điều phối; Claude Code là chuyên gia dự phòng; Lovable phụ trách thiết kế; thêm quy tắc một người viết.
- Trạng thái: Tested — tài liệu đã tạo và kiểm tra định dạng; chưa kiểm thử cấu hình trên máy anh.
- Bằng chứng: `AI-ROLES.md`, `AI-BOOTSTRAP.md` và các adapter tại root.
- Còn dở / rủi ro: Chưa cài adapter vào từng repository sản phẩm trên máy anh.
- Bước tiếp theo đề xuất: Chọn repository sản phẩm đầu tiên và thiết lập luồng Antigravity ↔ ChatGPT/Codex.
- Lưu ý cho AI sau: Không xem ChatGPT và Codex là hai đơn vị cạnh tranh; không để nhiều AI cùng ghi một branch.

### [2026-07-16] — Codex — MH Master Memory

- Mục tiêu phiên: Định danh và dựng khung kho nội bộ cho hệ điều hành trí nhớ đa AI.
- Đã làm: Chốt tên, viết README, chuẩn hóa cấu trúc tài liệu lõi, thêm luật Agent, bảo mật và mẫu ghi chép.
- Trạng thái: Một phần — cấu trúc tài liệu đã tạo; chưa xác nhận kho remote GitHub.
- Bằng chứng: Các file trong kho này.
- Còn dở / rủi ro: Chưa có cơ chế đồng bộ tự động hoặc phân quyền máy đọc được.
- Bước tiếp theo đề xuất: Tạo kho GitHub Private; đẩy commit nền; xác định nguồn dữ liệu chuẩn khi đồng bộ.
- Lưu ý cho AI sau: Không chuyển Public và không tự sửa luật lõi khi chưa được Đặng Minh Hiếu duyệt.
