import { FC } from 'react';

import { Logo } from '../logo';
import styles from './header.module.scss';

export const Header: FC = () => {
  return (
    <header className={styles.headerContainer}>
      <a href="/">
        <Logo />
      </a>
    </header>
  );
};
