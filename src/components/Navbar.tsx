import { useState } from 'react'
import type { NavItem } from '../types/ProductType';

const dropdownContent: Record<Exclude<NavItem, null>, string[]> = {
  'Коллабы': ['Дропы 2025', 'Дропы 2024', 'Дропы 2023'],
  'Мужское': ['Футболки', 'Худи', 'Шарфы', 'Обувь'],
  'Женское': ['Футболки', 'Худи', 'Шарфы', 'Платья', 'Обувь'],
};

export const Navbar = () => {
  const [activeItem, setActiveItem] = useState<NavItem>(null);

  return (
    <div className="relative z-40 w-full">
      <nav
        className="flex px-8 py-4 text-black text-md z-30 justify-between w-full"
        onMouseDownCapture={() => setActiveItem(null)}
      >
        {(['Коллабы', 'Мужское', 'Женское'] as Exclude<NavItem, null>[]).map((item) => (
          <div
            key={item}
            className="cursor-pointer hover:text-gray-300"
            onMouseEnter={() => setActiveItem(item)}
          >
            {item}
          </div>
        ))}
      </nav>

      {activeItem && (
        <div
          className="fixed top-24 left-0 w-full h-[200px] bg-white shadow-xl z-50" // Устанавливаем fixed для "парящего" меню
          onMouseLeave={() => setActiveItem(null)}
        >
          <div className="flex justify-center items-start h-full pt-5">
            <div className="flex flex-row space-y-4 text-black text-sm space-x-4">
              {dropdownContent[activeItem].map((link, i) => (
                <div key={i} className="font-medium hover:underline cursor-pointer">
                  {link}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
