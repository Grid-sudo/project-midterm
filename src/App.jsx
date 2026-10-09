import { useEffect, useState } from 'react';

const pages = ['start', 'practice', 'feedback', 'complete'];
const labels = ['Start', 'Practice', 'Feedback', 'Complete'];

function currentPage(pathname) {
  const page = pathname.replace(/^\/+|\/+$/g, '');
  return pages.includes(page) ? page : 'start';
}

export default function App() {
  const [page, setPage] = useState(() => currentPage(window.location.pathname));
  const [example, setExample] = useState('');
  const [error, setError] = useState('');
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    if (!pages.some((item) => `/${item}` === window.location.pathname)) {
      window.history.replaceState({}, '', '/start');
    }
    const handlePopState = () => setPage(currentPage(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  function navigate(next) {
    window.history.pushState({}, '', `/${next}`);
    setPage(next);
    setError('');
  }

  function startLesson() {
    setExample('');
    setRetrying(false);
    navigate('practice');
  }

  function checkExample(event) {
    event.preventDefault();
    if (!example.trim()) {
      setError('Enter a fictional example to continue.');
      return;
    }
    setError('');
    navigate(retrying ? 'complete' : 'feedback');
  }

  function tryAgain() {
    setExample('');
    setError('');
    setRetrying(true);
    navigate('practice');
  }

  function finishLesson() {
    setExample('');
    setError('');
    navigate('complete');
  }

  function restart() {
    setExample('');
    setError('');
    setRetrying(false);
    navigate('start');
  }

  const index = pages.indexOf(page);

  return (
    <main className="canvas">
      <article className="screen-frame" aria-label={`${labels[index]} screen`}>
        <div className="screen-surface">
          <div className="screen-topline">
            <span className="screen-step"><b>{String(index + 1).padStart(2, '0')}</b> {labels[index]}</span>
            <span className="app-wordmark">PassEdu</span>
          </div>

          {page === 'start' && <section className="screen-content start-content">
            <h1>Keywise</h1>
            <p className="copy">Practice safer<br />password habits.</p>
            <button className="primary-button" onClick={startLesson}>Start lesson</button>
            <p className="note">No real passwords</p>
          </section>}

          {page === 'practice' && <section className="screen-content practice-content">
            <h1>Try a fictional<br />example</h1>
            <form onSubmit={checkExample} noValidate>
              <label htmlFor="fictional-example" className="sr-only">Fictional example</label>
              <input id="fictional-example" type="password" value={example}
                onChange={(event) => { setExample(event.target.value); setError(''); }}
                onPaste={(event) => event.preventDefault()} autoComplete="off" spellCheck="false"
                placeholder="e.g. sample phrase" />
              <p className="warning">Use made-up text only</p>
              {error && <p className="error" role="alert">{error}</p>}
              <button type="submit" className="primary-button">Check example</button>
            </form>
          </section>}

          {page === 'feedback' && <section className="screen-content feedback-content">
            <h1>This example is<br />easy to guess</h1>
            <p className="copy">Common words and personal details can make a password predictable.</p>
            <button className="suggestion-button" onClick={tryAgain}>Try a longer unique passphrase</button>
          </section>}

          {page === 'complete' && <section className="screen-content complete-content">
            <h1>Lesson complete</h1>
            <p className="copy">You practiced choosing a stronger, unique example.</p>
            <span className="success-mark" aria-label="Completed">✓</span>
            <button className="continue-button" onClick={restart}>Continue learning</button>
          </section>}
        </div>
      </article>
    </main>
  );
}
