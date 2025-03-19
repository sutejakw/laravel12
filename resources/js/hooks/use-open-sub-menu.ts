import { useEffect, useState } from 'react';

type NavigationItem = {
  name: string;
  current: boolean;
  subs: Array<{
    name: string;
    link: string;
  }>;
};

type NavigationGroup = {
  title: string;
  menu: NavigationItem[];
};

export default function useOpenSubMenu(navigations: NavigationGroup[]) {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  useEffect(() => {
    const initialOpenMenuIndex = navigations.reduce<number | null>((acc, nav, navIdx) => {
      const menuIdx = nav.menu.findIndex((menu) => menu.current);
      if (menuIdx !== -1 && nav.menu[menuIdx].subs.length > 0 && navIdx !== 0) {
        return menuIdx;
      }
      return acc;
    }, null);

    setOpenMenuIndex(initialOpenMenuIndex);
  }, [navigations]);

  const handleMenuClick = (index: number) => {
    setOpenMenuIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return {
    openMenuIndex,
    handleMenuClick,
  };
}
