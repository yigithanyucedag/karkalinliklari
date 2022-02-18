import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

interface IDropdown {
  label: string;
  items: { index: number; label: string; func: any }[];
  onClick: (index: number) => void;
}

export default function Dropdown({ label, items, onClick }: IDropdown) {
  return (
    <Menu as="div" className="relative inline-block text-left z-10">
      <div>
        <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 bg-sky-500 text-sm font-medium text-white hover:bg-sky-400 focus:outline-none">
          {label}
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute overflow-hidden right-0 mt-2 w-56 rounded-md shadow-lg dark:bg-slate-800 bg-gray-100 focus:outline-none">
          <div>
            {items.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <div
                    onClick={() => onClick(item.index)}
                    className={classNames(
                      active
                        ? "dark:bg-slate-700 dark:text-slate-100 bg-gray-200 text-gray-800"
                        : "dark:text-slate-400 text-gray-600",
                      "block px-4 py-3 text-sm font-medium cursor-pointer focus:outline-none"
                    )}
                  >
                    {item.label}
                  </div>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
