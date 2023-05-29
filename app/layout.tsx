import './globals.css'
import { Inter, Roboto_Slab } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const roboto = Roboto_Slab({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-roboto-slab',
  display: 'swap',
});

export const metadata = {
  title: 'Netflix Clone',
  description: 'Dicover movies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
