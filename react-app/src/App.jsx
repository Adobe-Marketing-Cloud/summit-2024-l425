import './App.css';
import React, { useEffect } from 'react';

import { usePageBySlug } from './api/usePersistedQueries.js';
import ContentFragment from './components/util/ContentFragment.js';
import Footer from './components/structure/Footer.jsx';
import Header from './components/structure/Header.jsx';

function App() {
  useEffect(() => { 
    document.head.insertAdjacentHTML('beforeend', 
      '');
  }, []);

  var gqlParams = {};
  const params = new URLSearchParams(document.location.search);
  if (params.get('variation')) {
    gqlParams['variation'] = params.get('variation');
  }

  const { page } = usePageBySlug('home', gqlParams);
  if (!page) {
    return <div>loading...</div>;
  }

  return (
    <main className="app">
      <Header />
      
      <main>
        <ContentFragment cf={page} />
      </main>

      <Footer />
    </main>
  );
}

export default App;
