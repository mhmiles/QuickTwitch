import React from 'react';
import styles from './App.css'

export default ({ children }) =>  {
  return (
    <div className={styles.app}>
      {children}
      {
        (() => {
          if (process.env.NODE_ENV !== 'production') {
            const DevTools = require('./DevTools'); // eslint-disable-line global-require
            // return <DevTools />;
          }
        })()
      }
    </div>
  );
}
