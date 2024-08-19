import React, {useEffect, useRef} from 'react';
import FuzzyFindView from "./views/FuzzyFindView";
import {BFZF_IS_OPENED, teardown} from "./hooks/listeners";

function App() {
  const hasRunRef = useRef(false);
  useEffect(() => {
    if (hasRunRef.current) return;
    hasRunRef.current = true;

    if (localStorage.getItem(BFZF_IS_OPENED) !== 'true') {
      localStorage.setItem(BFZF_IS_OPENED, 'true');
    } else {
      window.close();
    }

    teardown();
  }, []);

  return (
    <FuzzyFindView/>
  );
}

export default App;
