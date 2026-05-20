import { useEffect } from 'react';
import CanvasBg from './components/CanvasBg';
import Nav from './components/Nav';
import Manifest from './components/Manifest';
import Operator from './components/Operator';
import Craft from './components/Craft';
import Work from './components/Work';
import Signal from './components/Signal';

export default function App() {
  // is-ready на <body> запускает CSS-driven reveal-line анимации
  useEffect(() => {
    const t = setTimeout(() => document.documentElement.classList.add('is-ready'), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <CanvasBg />
      <Nav />
      <main id="content">
        <Manifest />
        <Operator />
        <Craft />
        <Work />
        <Signal />
      </main>
    </>
  );
}
