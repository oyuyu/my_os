import React, { createRef } from 'react';
import styles from './index.less';

const Son = () => {
  return <div>child</div>;
};

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>666</h1>
    </div>
  );
}
