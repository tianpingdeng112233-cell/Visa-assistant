import { redirect } from 'next/navigation'

// 旧路径重定向到新动态路由 /ds160/1
export default function OldStep1Redirect() {
  redirect('/ds160/1')
}
