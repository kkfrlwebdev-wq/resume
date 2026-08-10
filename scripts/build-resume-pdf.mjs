import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import process from 'node:process'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const resumeHtml = resolve(projectRoot, 'public', 'resume.html')
const resumePdf = resolve(projectRoot, 'public', 'resume.pdf')

const browserCandidates = [
  process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
].filter(Boolean)

const browserPath = browserCandidates.find((candidate) => existsSync(candidate))

if (!browserPath) {
  throw new Error('Chrome або Edge не знайдено. Встановіть CHROME_PATH і повторіть команду.')
}

execFileSync(
  browserPath,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--run-all-compositor-stages-before-draw',
    `--print-to-pdf=${resumePdf}`,
    pathToFileURL(resumeHtml).href,
  ],
  { cwd: projectRoot, stdio: 'inherit' },
)

process.stdout.write(`PDF створено: ${resumePdf}\n`)
