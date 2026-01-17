import './globals.css'

export const metadata = {
  title: 'Project Manager Tool - Professional PM Tools Suite',
  description: 'All-in-one project management platform. Access CharterPro, PMO Hub, and more professional tools with a single subscription.',
  keywords: ['project management', 'PMO', 'charter', 'portfolio', 'task tracking', 'SaaS', 'tools'],
  authors: [{ name: 'Project Manager Tool' }],
  openGraph: {
    title: 'Project Manager Tool - Professional PM Tools Suite',
    description: 'All-in-one project management platform with professional tools.',
    url: 'https://projectmanagertool.com',
    siteName: 'Project Manager Tool',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
