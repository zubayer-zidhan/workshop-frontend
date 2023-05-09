import './globals.css'


export const metadata = {
  title: 'Book A Workshop',
  description: 'Book a workshop.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  )
}
