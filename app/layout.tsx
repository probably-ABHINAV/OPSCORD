import type { Metadata } from 'next';
import './globals.css';
import './response.css';
export const metadata: Metadata = {title:'OpsCord — Incident Intelligence',description:'Evidence-based incident investigation across your stack.',icons:{icon:'/favicon.svg',shortcut:'/favicon.svg'}};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
