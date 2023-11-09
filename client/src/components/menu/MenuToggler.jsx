import './MenuToggler.css';
import { useState } from 'react';
import Menu from './Menu';

export default function MenuToggler() {
  const [burgerClass, setBurgerClass] = useState('burger-bar clicked');
  const [menuClass, setMenuClass] = useState('menu visible');
  const [isMenuClicked, setIsMenuClicked] = useState(false);

  const updateMenu = () => {
    if (!isMenuClicked) {
      setBurgerClass('burger-bar unclicked');
      setMenuClass('menu hidden');
    } else {
      setBurgerClass('burger-bar clicked');
      setMenuClass('menu visible');
    }
    setIsMenuClicked(!isMenuClicked);
  };

  return (
    <>
      <div className='menu-toggler-container'>
        <nav className='burger-menu'>
          <div className="burger-menu" onClick={updateMenu}>
            <div className={burgerClass}></div>
            <div className={burgerClass}></div>
            <div className={burgerClass}></div>
          </div>
        </nav>
        <div className={menuClass}>
          <Menu chatsClicked={updateMenu}/>
        </div>
      </div>
    </>
  );
}
