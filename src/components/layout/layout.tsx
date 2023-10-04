import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/footer'

export type LayoutProps = {
  children: any;
  showHalf?: boolean;
  showFull?: boolean;
  className?: boolean
};

const Layout = ({
  children,
  showHalf = true,
  showFull = true,
  className = false
}: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <div className="content">{children}</div>
      <Footer showHalf={showHalf} showFull={showFull} className={className} />
    </div>
  );
};

export default Layout