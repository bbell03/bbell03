// components/Layout.js
import Head from 'next/head';
import Nav from './nav1';

const Layout = ({ children, title }) => {
  return (
    <div class = "h-screen font-mono">
      <Nav/>
    </div>
  )
}

export default Layout