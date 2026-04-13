import { useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ChevronDown, FileJson, FileCode2, FileText, Blocks, X } from 'lucide-react'

// 定義假檔案的結構
type FileType = 'java' | 'json' | 'md'

interface CodeFile {
  id: string
  name: string
  type: FileType
  icon: React.ReactNode
  content: React.ReactNode
}

export default function IdeTerminal() {
  const [sidebarOpen] = useState(true)
  const [activeFileId, setActiveFileId] = useState<string>('about.java')
  const [openFiles, setOpenFiles] = useState<string[]>(['about.java', 'skills.json', 'projects.md'])

  // 程式碼高亮顏色設定 (VS Code 一暗風格)
  const colors = {
    keyword: '#569CD6',    // blue
    variable: '#9CDCFE',   // light blue
    function: '#DCDCAA',   // yellow
    string: '#CE9178',     // orange
    number: '#B5CEA8',     // light green
    comment: '#6A9955',    // green
    type: '#4EC9B0',       // teal
    tag: '#569CD6',        // blue
    attr: '#9CDCFE',       // light blue
  }

  // 檔案內容定義
  const files: Record<string, CodeFile> = {
    'about.java': {
      id: 'about.java',
      name: 'About.java',
      type: 'java',
      icon: <FileCode2 size={15} color={colors.keyword} />,
      content: (
        <div className="font-mono text-[14px] leading-relaxed">
          <div><span style={{ color: colors.comment }}>/**</span></div>
          <div><span style={{ color: colors.comment }}> * REX - System Analyst & Java Full Stack Engineer</span></div>
          <div><span style={{ color: colors.comment }}> * 專注於後端架構設計、系統分析與全端開發</span></div>
          <div><span style={{ color: colors.comment }}> */</span></div>
          <div className="mt-2"><span style={{ color: colors.keyword }}>public class</span> <span style={{ color: colors.type }}>RexDeveloper</span> <span style={{ color: colors.keyword }}>implements</span> <span style={{ color: colors.type }}>Developer</span> {'{'}</div>
          <br />
          <div className="pl-6"><span style={{ color: colors.keyword }}>private final</span> <span style={{ color: colors.type }}>String</span> <span style={{ color: colors.variable }}>email</span> = <span style={{ color: colors.string }}>"rexrex10050@gmail.com"</span>;</div>
          <div className="pl-6"><span style={{ color: colors.keyword }}>private final</span> <span style={{ color: colors.type }}>String</span> <span style={{ color: colors.variable }}>location</span> = <span style={{ color: colors.string }}>"Taiwan"</span>;</div>
          <br />
          <div className="pl-6"><span style={{ color: colors.keyword }}>public</span> <span style={{ color: colors.type }}>void</span> <span style={{ color: colors.function }}>introduce</span>() {'{'}</div>
          <div className="pl-12"><span style={{ color: colors.type }}>System</span>.out.<span style={{ color: colors.function }}>println</span>(<span style={{ color: colors.string }}>"Hello, I'm Rex!"</span>);</div>
          <div className="pl-12"><span style={{ color: colors.type }}>System</span>.out.<span style={{ color: colors.function }}>println</span>(<span style={{ color: colors.string }}>"I specialize in Java, Spring Boot, and modern Web tech."</span>);</div>
          <div className="pl-6">{'}'}</div>
          <br />
          <div className="pl-6"><span style={{ color: colors.keyword }}>public</span> <span style={{ color: colors.type }}>String</span> <span style={{ color: colors.function }}>contact</span>() {'{'}</div>
          <div className="pl-12"><span style={{ color: colors.keyword }}>return</span> <span style={{ color: colors.keyword }}>this</span>.<span style={{ color: colors.variable }}>email</span>;</div>
          <div className="pl-6">{'}'}</div>
          <div>{'}'}</div>
        </div>
      )
    },
    'skills.json': {
      id: 'skills.json',
      name: 'skills.json',
      type: 'json',
      icon: <FileJson size={15} color={colors.function} />,
      content: (
        <div className="font-mono text-[14px] leading-relaxed">
          <div>{'{'}</div>
          <div className="pl-6"><span style={{ color: colors.variable }}>"backend"</span>: {'['}</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"Java"</span>,</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"Spring Boot"</span>,</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"Spring Security"</span>,</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"JPA / Hibernate"</span></div>
          <div className="pl-6">{'],'}</div>
          
          <div className="pl-6 mt-2"><span style={{ color: colors.variable }}>"frontend"</span>: {'['}</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"React"</span>,</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"TypeScript"</span>,</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"Tailwind CSS"</span>,</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"Vite"</span></div>
          <div className="pl-6">{'],'}</div>

          <div className="pl-6 mt-2"><span style={{ color: colors.variable }}>"database_and_tools"</span>: {'['}</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"MySQL"</span>,</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"PostgreSQL"</span>,</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"Redis"</span>,</div>
          <div className="pl-12"><span style={{ color: colors.string }}>"Docker"</span></div>
          <div className="pl-6">{']'}</div>
          <div>{'}'}</div>
        </div>
      )
    },
    'projects.md': {
      id: 'projects.md',
      name: 'projects.md',
      type: 'md',
      icon: <FileText size={15} color={colors.keyword} />,
      content: (
        <div className="font-mono text-[14px] leading-relaxed">
          <div><span style={{ color: colors.keyword }}># Featured Projects</span></div>
          <br />
          <div><span style={{ color: colors.type }}>## React + Vite UI Design Gallery</span></div>
          <div><span style={{ color: colors.comment }}>&gt; A portfolio demonstrating multiple ultra-modern design variations.</span></div>
          <div className="mt-1">- <span style={{ color: colors.variable }}>Tech Stack</span>: React, TypeScript, Tailwind, Framer Motion</div>
          
          <br />
          <div><span style={{ color: colors.type }}>## Spring Boot Authentication API Server</span></div>
          <div><span style={{ color: colors.comment }}>&gt; Full backend solution featuring JWT, RBAC permissions, and comprehensive error handling.</span></div>
          <div className="mt-1">- <span style={{ color: colors.variable }}>Tech Stack</span>: Java 21, Spring Boot 3, MapStruct, Swagger/OpenAPI</div>
          
          <br />
          <div><span style={{ color: colors.type }}>## System Analysis & Design Blog Series</span></div>
          <div><span style={{ color: colors.comment }}>&gt; Comprehensive tutorials on translating requirements into architectural specs.</span></div>
          <div className="mt-1">- <span style={{ color: colors.variable }}>Includes</span>: UML sequence diagrams, ER diagrams, RESTful practices</div>
        </div>
      )
    }
  }

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
    <div className="min-h-screen bg-[#1E1E1E] text-[#CCCCCC] flex flex-col font-sans overflow-hidden">
      {/* 頂部標題列 (Title Bar) */}
      <header className="h-9 flex items-center justify-between px-4" style={{ background: '#323233', borderBottom: '1px solid #1E1E1E' }}>
        <div className="flex items-center gap-3">
          <Link to="/" className="text-[#CCCCCC] hover:text-white transition-colors cursor-pointer group flex items-center gap-1.5" title="回到首頁">
            <ArrowLeft size={15} className="group-hover:-translate-x-0.5 transition-transform" />
          </Link>
          <div className="w-px h-4 bg-[#555]" />
          <span className="text-[12px] flex items-center gap-2 text-[#CCCCCC]">
            <Blocks size={14} color="#007ACC" />
            File
          </span>
          <span className="text-[12px] text-[#CCCCCC]">Edit</span>
          <span className="text-[12px] text-[#CCCCCC]">View</span>
          <span className="text-[12px] text-[#CCCCCC]">Run</span>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 text-[12px] text-[#999999] flex items-center gap-2">
          Rex-Portfolio - Visual Studio Code
        </div>
        <div className="flex items-center gap-3 opacity-50">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* 左側邊欄 (Sidebar Explorer) */}
        {sidebarOpen && (
          <div className="w-64 flex-shrink-0 flex flex-col" style={{ background: '#252526', borderRight: '1px solid #1E1E1E' }}>
            <div className="h-9 flex items-center px-4 text-[11px] font-semibold tracking-wider text-[#CCCCCC]">
              EXPLORER
            </div>
            
            <div className="flex flex-col">
              {/* Folder Header */}
              <div className="flex items-center gap-1 px-1 py-1 hover:bg-[#2A2D2E] cursor-pointer text-[#CCCCCC]">
                <ChevronDown size={16} />
                <span className="text-[13px] font-bold">REX-PORTFOLIO</span>
              </div>
              
              {/* 專案檔案清單 */}
              <div className="flex flex-col mt-1">
                {Object.values(files).map((file) => (
                  <div
                    key={file.id}
                    className={`flex items-center gap-1.5 px-4 h-6 cursor-pointer text-[13px] transition-colors ${
                      activeFileId === file.id ? 'bg-[#37373D] text-white' : 'hover:bg-[#2A2D2E] text-[#CCCCCC]'
                    }`}
                    onClick={() => handleFileClick(file.id)}
                  >
                    <span className="w-4 h-4 flex items-center justify-center relative translate-y-[1px]">
                       {file.icon}
                    </span>
                    {file.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 編輯器主要區域 */}
        <div className="flex-1 flex flex-col bg-[#1E1E1E] overflow-hidden">
          {/* 分頁 (Tabs) */}
          <div className="h-9 flex bg-[#252526] overflow-x-auto scrollbar-hide">
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
                      isActive ? 'bg-[#1E1E1E] text-white border-t border-t-[#007ACC]' : 'bg-[#2D2D2D] text-[#969696] hover:bg-[#2B2B2B] border-t border-t-transparent'
                    }`}
                    onClick={() => setActiveFileId(fileId)}
                  >
                    <span className="shrink-0">{file.icon}</span>
                    <span className="text-[13px] truncate select-none flex-1">{file.name}</span>
                    <button
                      className={`p-0.5 rounded flex-shrink-0 hover:bg-[#444] transition-colors ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                      onClick={(e) => handleCloseFile(e, fileId)}
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* 程式碼內容區 / 行號 */}
          <div className="flex-1 overflow-auto flex relative isolate pb-10">
            {activeFileId && files[activeFileId] ? (
              <>
                {/* 行號區 */}
                <div className="py-4 px-4 text-right select-none font-mono text-[14px]" style={{ color: '#858585', minWidth: '48px' }}>
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div key={i} className="leading-relaxed opacity-50">{i + 1}</div>
                  ))}
                </div>
                {/* 內容區 */}
                <div className="py-4 pr-4 overflow-x-auto flex-1">
                  <motion.div
                    key={activeFileId}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    {files[activeFileId].content}
                  </motion.div>
                </div>
              </>
            ) : (
              // 無開啟檔案的空狀態
              <div className="flex-1 flex flex-col items-center justify-center text-[#666] select-none">
                <Blocks size={64} className="mb-4 opacity-20" />
                <p className="text-xl mb-2">IDE Portfolio Mode</p>
                <p className="text-[13px] mb-8">Select a file from the explorer to view context</p>
                <div className="flex flex-col gap-2 items-center text-[13px]">
                  <p>Show All Commands <span className="ml-4 py-0.5 px-1.5 rounded bg-[#333]">Ctrl+Shift+P</span></p>
                  <p>Go to File <span className="ml-4 py-0.5 px-1.5 rounded bg-[#333]">Ctrl+P</span></p>
                </div>
              </div>
            )}
          </div>
          
          {/* 底部狀態列 (Status Bar) */}
          <div className="h-[22px] flex-shrink-0 w-full flex justify-between items-center px-3 text-[11px] text-white" style={{ background: '#007ACC' }}>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1"><ArrowLeft size={12} className="rotate-45" /> master*</span>
              <span>&#x21bb;</span>
              <span className="flex items-center gap-1"><X size={12} /> 0</span>
              <span className="flex items-center gap-1">⚠ 0</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Ln 1, Col 1</span>
              <span>Spaces: 2</span>
              <span>UTF-8</span>
              <span>LF</span>
              <span>{activeFileId && files[activeFileId] ? files[activeFileId].type.toUpperCase() : 'Ready'}</span>
              <span>Prettier</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
