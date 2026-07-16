# Prompt Master — Cài đặt đa nền tảng

## Mục đích

`prompt-master` biến yêu cầu thô thành một prompt gọn, rõ phạm vi, có tiêu chí hoàn thành và phù hợp với công cụ đích. Skill chỉ kích hoạt cho công việc viết, sửa, audit hoặc chuyển đổi prompt; nó không chen vào mọi cuộc trò chuyện hay nhiệm vụ lập trình thông thường.

## Nguồn chuẩn

Nguồn dùng chung nằm tại:

```text
skills/prompt-master/
├── SKILL.md
├── LICENSE
└── references/
    ├── patterns.md
    └── templates.md
```

Bản này đã được chuẩn hóa từ nguồn MIT `prompt-master`: bỏ khẳng định cứng theo phiên bản model, thêm ranh giới quyền hạn, bảo vệ bí mật, điều kiện dừng và hướng dẫn riêng cho ChatGPT/Codex, Claude Code, Google Antigravity và Lovable.

Hai kho RAR trong nguồn tham khảo không phải gói cài đặt. Không nhập hàng loạt skill từ đó vào hệ thống.

## ChatGPT và Codex

Skill cá nhân đã được cài dưới tên `prompt-master`. Gọi trực tiếp bằng `$prompt-master` hoặc yêu cầu rõ: “dùng Prompt Master để viết/sửa prompt này”.

## Claude Code trong repository này

Bản project skill đã có tại `.claude/skills/prompt-master/`. Claude Code mở từ repository root sẽ phát hiện skill. Có thể gọi:

```text
/prompt-master <yêu cầu cần chuyển thành prompt>
```

## Cài toàn cục cho Claude Code và Google Antigravity trên Windows

Từ PowerShell tại repository root, chạy một lần:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\install-prompt-master-windows.ps1
```

Script sao chép nguồn chuẩn vào:

- Claude Code: `%USERPROFILE%\.claude\skills\prompt-master\`
- Google Antigravity: `%USERPROFILE%\.gemini\config\skills\prompt-master\`

Sau khi cài, mở phiên mới nếu công cụ đang chạy chưa nhận skill mới. Khi cập nhật nguồn chuẩn, chạy lại cùng lệnh để đồng bộ bản mới.

## Cách dùng đúng

Ví dụ:

```text
Dùng Prompt Master. Viết cho anh một prompt Claude Code để sửa lỗi upload bị kẹt, chỉ được sửa worker gửi ZIP, không đổi luồng tải, phải có test và điều kiện dừng sau hai lần thất bại.
```

Không cần gọi skill khi anh muốn AI trực tiếp sửa lỗi hoặc thực thi công việc. Khi đó hãy giao nhiệm vụ thẳng theo luật của repository.
