import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '英区留学生美签办理助手',
  description: '专为英区留学生设计的美国签证申请全程图文引导工具',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
