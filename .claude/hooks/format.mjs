// Hook PostToolUse: format otomatis file yang baru diedit Claude dengan Prettier.
// Dipanggil oleh .claude/settings.json. Tidak pernah menggagalkan proses kerja Claude.
import { execSync } from 'node:child_process';
import { existsSync } from 'node:fs';

const FORMATTABLE = /\.(tsx?|jsx?|css|json|md|html)$/i;

let raw = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => (raw += chunk));
process.stdin.on('end', () => {
  try {
    const input = JSON.parse(raw || '{}');
    const filePath = input?.tool_input?.file_path;

    if (!filePath || !FORMATTABLE.test(filePath) || !existsSync(filePath)) {
      process.exit(0);
    }

    execSync(`npx --no-install prettier --write "${filePath}"`, {
      stdio: 'ignore',
      shell: true,
    });
  } catch {
    // Prettier belum terinstall atau gagal: abaikan, jangan hentikan Claude.
  }
  process.exit(0);
});
