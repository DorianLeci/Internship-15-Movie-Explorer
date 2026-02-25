import { NavLink } from 'react-router-dom';
import { AppPaths } from '../../routes/paths';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const navItems = [
    { label: 'Home', path: AppPaths.HOME },
    { label: 'Movies', path: AppPaths.MOVIES },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Movie Explorer</h1>
        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `${styles.link}  ${isActive ? styles.active : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className={styles.main}>{children}</main>
    </div>
  );
};
