import { useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ArrowLeft,
  ChevronDown,
  FileJson,
  FileCode2,
  FileText,
  Blocks,
  X,
  GitBranch,
  RefreshCw,
  AlertTriangle,
} from 'lucide-react'
import { profile, skillGroups, projects } from '@/data/profile'

/* ─── 程式碼高亮顏色設定（VS Code Dark+ 風格） ─── */
const COLORS = {
  keyword: '#569CD6', // blue
  variable: '#9CDCFE', // light blue
  function: '#DCDCAA', // yellow
  string: '#CE9178', // orange
  comment: '#6A9955', // green
  type: '#4EC9B0', // teal
  punct: '#CCCCCC', // 預設前景
} as const

type TokenColor = keyof typeof COLORS
type FileType = 'java' | 'json' | 'md'

/** 一行程式碼：indent 為縮排層級，node 為 null 代表空行 */
interface CodeLine {
  indent?: number
  node: ReactNode
}

interface CodeFile {
  id: string
  name: string
  type: FileType
  icon: ReactNode
  lines: CodeLine[]
}

/* ─── 語法高亮 helper ─── */
function Tok({ c, children }: { c: TokenColor; children: ReactNode }) {
  return <span style={{ color: COLORS[c] }}>{children}</span>
}

const LINK_CLASS =
  'cursor-pointer underline decoration-dotted underline-offset-4 hover:decoration-solid hover:brightness-125 transition-[filter] rounded-sm focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#007ACC]'

/** 程式碼中的可點連結：站內路由用 to，外部連結用 href */
function CodeLink({
  c,
  to,
  href,
  label,
  children,
}: {
  c: TokenColor
  to?: string
  href?: string
  label: string
  children: ReactNode
}) {
  if (to) {
    return (
      <Link to={to} aria-label={label} className={LINK_CLASS} style={{ color: COLORS[c] }}>
        {children}
      </Link>
    )
  }
  const external = href?.startsWith('http') ?? false
  return (
    <a
      href={href}
      aria-label={label}
      className={LINK_CLASS}
      style={{ color: COLORS[c] }}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
    </a>
  )
}

/* ─── Java：由 profile 產生 About.java ─── */
function javaField(name: string, value: ReactNode): CodeLine {
  return {
    indent: 1,
    node: (
      <>
        <Tok c="keyword">private final</Tok> <Tok c="type">String</Tok> <Tok c="variable">{name}</Tok> ={' '}
        {value};
      </>
    ),
  }
}

function javaPrintln(text: string): CodeLine {
  return {
    indent: 2,
    node: (
      <>
        <Tok c="type">System</Tok>.out.<Tok c="function">println</Tok>(<Tok c="string">"{text}"</Tok>);
      </>
    ),
  }
}

function buildAboutJava(): CodeLine[] {
  const comment = (text: string, indent = 0): CodeLine => ({
    indent,
    node: <Tok c="comment">{text}</Tok>,
  })
  return [
    comment('/**'),
    comment(` * ${profile.name} - ${profile.titleEn}`),
    comment(` * ${profile.title}`),
    comment(' *'),
    ...profile.intro.map((line) => comment(` * ${line}`)),
    comment(' */'),
    {
      node: (
        <>
          <Tok c="keyword">public class</Tok> <Tok c="type">RexDeveloper</Tok>{' '}
          <Tok c="keyword">implements</Tok> <Tok c="type">Developer</Tok> {'{'}
        </>
      ),
    },
    { node: null },
    javaField('name', <Tok c="string">"{profile.name}"</Tok>),
    javaField(
      'email',
      <CodeLink c="string" href={`mailto:${profile.email}`} label={`Send email to ${profile.email}`}>
        "{profile.email}"
      </CodeLink>,
    ),
    javaField('location', <Tok c="string">"{profile.location}"</Tok>),
    javaField(
      'github',
      <CodeLink
        c="string"
        href={profile.githubUrl}
        label={`${profile.name} on GitHub (opens in new tab)`}
      >
        "{profile.githubUrl}"
      </CodeLink>,
    ),
    { node: null },
    {
      indent: 1,
      node: (
        <>
          <Tok c="keyword">public</Tok> <Tok c="type">void</Tok> <Tok c="function">introduce</Tok>() {'{'}
        </>
      ),
    },
    javaPrintln(`Hello, I'm ${profile.name}!`),
    javaPrintln(profile.titleEn),
    ...profile.intro.map((line) => comment(`// ${line}`, 2)),
    { indent: 1, node: '}' },
    { node: null },
    {
      indent: 1,
      node: (
        <>
          <Tok c="keyword">public</Tok> <Tok c="type">String</Tok> <Tok c="function">contact</Tok>() {'{'}
        </>
      ),
    },
    {
      indent: 2,
      node: (
        <>
          <Tok c="keyword">return</Tok> <Tok c="keyword">this</Tok>.<Tok c="variable">email</Tok>;
        </>
      ),
    },
    { indent: 1, node: '}' },
    { node: '}' },
  ]
}

/* ─── JSON：把 { key: string[] } 渲染成帶高亮的行 ─── */
function buildJsonLines(data: { key: string; values: string[] }[]): CodeLine[] {
  const lines: CodeLine[] = [{ node: '{' }]
  data.forEach((entry, i) => {
    lines.push({
      indent: 1,
      node: (
        <>
          <Tok c="variable">"{entry.key}"</Tok>: [
        </>
      ),
    })
    entry.values.forEach((value, j) => {
      lines.push({
        indent: 2,
        node: (
          <>
            <Tok c="string">"{value}"</Tok>
            {j < entry.values.length - 1 ? ',' : ''}
          </>
        ),
      })
    })
    lines.push({ indent: 1, node: i < data.length - 1 ? '],' : ']' })
  })
  lines.push({ node: '}' })
  return lines
}

/* ─── Markdown：標題、引言、清單、連結 ─── */
function mdListItem(label: string, value: ReactNode): CodeLine {
  return {
    node: (
      <>
        - <Tok c="variable">**{label}**</Tok>: {value}
      </>
    ),
  }
}

function MdLink({
  text,
  url,
  to,
  href,
  label,
}: {
  text: string
  url: string
  to?: string
  href?: string
  label: string
}) {
  return (
    <CodeLink c="string" to={to} href={href} label={label}>
      [{text}]({url})
    </CodeLink>
  )
}

function buildProjectsMd(): CodeLine[] {
  const lines: CodeLine[] = [{ node: <Tok c="keyword"># Projects</Tok> }]
  projects.forEach((p) => {
    const repoName = p.href.replace('https://github.com/', '')
    lines.push(
      { node: null },
      { node: <Tok c="type">## {p.title}</Tok> },
      { node: <Tok c="comment">&gt; {p.desc}</Tok> },
      { node: null },
      mdListItem('Tags', p.tags.join(', ')),
      mdListItem(
        'Repo',
        <MdLink
          text={repoName}
          url={p.href}
          href={p.href}
          label={`${p.title} GitHub repository (opens in new tab)`}
        />,
      ),
      mdListItem(
        'Page',
        <MdLink text={p.to} url={p.to} to={p.to} label={`Open the ${p.title} page on this site`} />,
      ),
    )
  })
  return lines
}

/* ─── 檔案定義（內容皆由 src/data/profile.ts 產生） ─── */
const files: Record<string, CodeFile> = {
  'about.java': {
    id: 'about.java',
    name: 'About.java',
    type: 'java',
    icon: <FileCode2 size={15} color={COLORS.keyword} />,
    lines: buildAboutJava(),
  },
  'skills.json': {
    id: 'skills.json',
    name: 'skills.json',
    type: 'json',
    icon: <FileJson size={15} color={COLORS.function} />,
    lines: buildJsonLines(skillGroups.map((g) => ({ key: g.labelEn, values: g.skills }))),
  },
  'projects.md': {
    id: 'projects.md',
    name: 'projects.md',
    type: 'md',
    icon: <FileText size={15} color={COLORS.keyword} />,
    lines: buildProjectsMd(),
  },
}

/** 帶行號的程式碼檢視：行號跟著實際行數走，長行自動換行（行號對齊該行第一列） */
function CodeView({ lines }: { lines: CodeLine[] }) {
  return (
    <div className="font-mono text-[14px] leading-relaxed py-4 pr-4">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span
            className="w-14 flex-shrink-0 pr-4 text-right select-none opacity-50"
            style={{ color: '#858585' }}
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <span
            className="flex-1 min-w-0 whitespace-pre-wrap break-words"
            style={{ paddingLeft: `${(line.indent ?? 0) * 1.5}rem` }}
          >
            {line.node ?? ' '}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function IdeTerminal() {
  const [activeFileId, setActiveFileId] = useState<string>('about.java')
  const [openFiles, setOpenFiles] = useState<string[]>(['about.java', 'skills.json', 'projects.md'])

  const activeFile: CodeFile | undefined = activeFileId ? files[activeFileId] : undefined

  const handleFileClick = (fileId: string) => {
    setActiveFileId(fileId)
    if (!openFiles.includes(fileId)) {
      setOpenFiles([...openFiles, fileId])
    }
  }

  const handleCloseFile = (e: React.MouseEvent, fileId: string) => {
    e.stopPropagation()
    const newFiles = openFiles.filter((id) => id !== fileId)
    setOpenFiles(newFiles)
    if (activeFileId === fileId) {
      setActiveFileId(newFiles.length > 0 ? newFiles[newFiles.length - 1] : '')
    }
  }

  return (
    <div className="h-screen bg-[#1E1E1E] text-[#CCCCCC] flex flex-col font-sans overflow-hidden">
      {/* 頂部標題列 (Title Bar) */}
      <header
        className="relative h-9 flex-shrink-0 flex items-center justify-between px-4"
        style={{ background: '#323233', borderBottom: '1px solid #1E1E1E' }}
      >
        <div className="flex items-center gap-3">
          <Link
            to="/gallery"
            className="text-[#CCCCCC] hover:text-white transition-colors cursor-pointer group flex items-center gap-1.5 text-[12px]"
            title="返回設計實驗室"
            aria-label="返回設計實驗室"
          >
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
            <span className="hidden sm:inline">Gallery</span>
          </Link>
          <div className="w-px h-4 bg-[#555]" />
          <span className="text-[12px] flex items-center gap-2 text-[#CCCCCC]">
            <Blocks size={14} color="#007ACC" />
            File
          </span>
          <span className="text-[12px] text-[#CCCCCC] hidden sm:inline">Edit</span>
          <span className="text-[12px] text-[#CCCCCC] hidden sm:inline">View</span>
          <span className="text-[12px] text-[#CCCCCC] hidden sm:inline">Run</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-[12px] text-[#999999] hidden md:flex items-center gap-2">
          Rex-Portfolio - Visual Studio Code
        </div>
        <div className="flex items-center gap-3 opacity-50" aria-hidden="true">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 左側邊欄 (Sidebar Explorer) */}
        <div
          className="w-40 sm:w-64 flex-shrink-0 flex flex-col"
          style={{ background: '#252526', borderRight: '1px solid #1E1E1E' }}
        >
          <div className="h-9 flex items-center px-4 text-[11px] font-semibold tracking-wider text-[#CCCCCC]">
            EXPLORER
          </div>

          <div className="flex flex-col">
            {/* Folder Header */}
            <div className="flex items-center gap-1 px-1 py-1 text-[#CCCCCC]">
              <ChevronDown size={16} />
              <span className="text-[13px] font-bold">REX-PORTFOLIO</span>
            </div>

            {/* 專案檔案清單 */}
            <div className="flex flex-col mt-1">
              {Object.values(files).map((file) => (
                <button
                  type="button"
                  key={file.id}
                  className={`flex items-center gap-1.5 px-4 h-6 cursor-pointer text-[13px] text-left transition-colors ${
                    activeFileId === file.id
                      ? 'bg-[#37373D] text-white'
                      : 'hover:bg-[#2A2D2E] text-[#CCCCCC]'
                  }`}
                  onClick={() => handleFileClick(file.id)}
                >
                  <span className="w-4 h-4 flex items-center justify-center relative translate-y-[1px]">
                    {file.icon}
                  </span>
                  {file.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 編輯器主要區域 */}
        <div className="flex-1 min-w-0 flex flex-col bg-[#1E1E1E] overflow-hidden">
          {/* 分頁 (Tabs) */}
          <div className="h-9 flex-shrink-0 flex bg-[#252526] overflow-x-auto scrollbar-hide">
            <AnimatePresence initial={false}>
              {openFiles.map((fileId) => {
                const file = files[fileId]
                const isActive = activeFileId === fileId
                return (
                  <motion.div
                    key={fileId}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0, overflow: 'hidden' }}
                    className={`group flex items-center min-w-[120px] max-w-[200px] h-full px-3 gap-2 cursor-pointer border-r border-[#1E1E1E] ${
                      isActive
                        ? 'bg-[#1E1E1E] text-white border-t border-t-[#007ACC]'
                        : 'bg-[#2D2D2D] text-[#969696] hover:bg-[#2B2B2B] border-t border-t-transparent'
                    }`}
                    onClick={() => setActiveFileId(fileId)}
                  >
                    <span className="shrink-0">{file.icon}</span>
                    <span className="text-[13px] truncate select-none flex-1">{file.name}</span>
                    <button
                      type="button"
                      aria-label={`Close ${file.name}`}
                      className={`p-0.5 rounded flex-shrink-0 cursor-pointer hover:bg-[#444] transition-colors ${
                        isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 focus-visible:opacity-100'
                      }`}
                      onClick={(e) => handleCloseFile(e, fileId)}
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* 程式碼內容區（含行號） */}
          {/* key 讓切換檔案時捲動位置歸零 */}
          <div key={activeFileId} className="flex-1 overflow-auto flex relative isolate pb-10">
            {activeFile ? (
              <motion.div
                key={activeFile.id}
                className="flex-1 min-w-0"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <CodeView lines={activeFile.lines} />
              </motion.div>
            ) : (
              // 無開啟檔案的空狀態
              <div className="flex-1 flex flex-col items-center justify-center text-[#666] select-none">
                <Blocks size={64} className="mb-4 opacity-20" />
                <p className="text-xl mb-2">IDE Portfolio Mode</p>
                <p className="text-[13px] mb-8">Select a file from the explorer to view context</p>
                <div className="flex flex-col gap-2 items-center text-[13px]">
                  <p>
                    Show All Commands <span className="ml-4 py-0.5 px-1.5 rounded bg-[#333]">Ctrl+Shift+P</span>
                  </p>
                  <p>
                    Go to File <span className="ml-4 py-0.5 px-1.5 rounded bg-[#333]">Ctrl+P</span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 底部狀態列 (Status Bar) */}
          <div
            className="h-[22px] flex-shrink-0 w-full flex justify-between items-center px-3 text-[11px] text-white overflow-hidden whitespace-nowrap"
            style={{ background: '#007ACC' }}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <GitBranch size={12} /> main
              </span>
              <RefreshCw size={11} />
              <span className="flex items-center gap-1">
                <X size={12} /> 0
              </span>
              <span className="flex items-center gap-1">
                <AlertTriangle size={11} /> 0
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline">Ln 1, Col 1</span>
              <span className="hidden sm:inline">Spaces: 2</span>
              <span className="hidden sm:inline">UTF-8</span>
              <span className="hidden sm:inline">LF</span>
              <span>{activeFile ? activeFile.type.toUpperCase() : 'Ready'}</span>
              <span className="hidden sm:inline">Prettier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
