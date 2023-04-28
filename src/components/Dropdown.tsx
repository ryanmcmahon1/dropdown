import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../close.svg";

interface InputOption {
  value: string;
  label: string;
}

interface Option extends InputOption {
  selected?: boolean;
}

interface DropdownProps {
  options: Array<InputOption>;
  placeholder?: string;
  multiple?: boolean;
}

const Dropdown = ({
  options,
  placeholder,
  multiple,
}: DropdownProps): React.ReactElement => {
  const [selected, setSelected] = useState<Array<Option>>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const selectRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLInputElement>(null);

  // closes menu if user clicks outside of select
  // useEffect(() => {
  //   function handleExternalClick(e: any) {
  //     if (selectRef.current && !selectRef.current.contains(e.target)) {
  //       setShowMenu(false);
  //     }
  //   }

  //   window.addEventListener("click", handleExternalClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleExternalClick);
  //   };
  // });

  const handleMenuItemClick = (option: Option): void => {
    if (multiple) {
      if (selected.map((item) => item.value).includes(option.value)) {
        option.selected = false;
        setSelected(selected.filter((item) => item.value !== option.value));
      } else {
        option.selected = true;
        setSelected([...selected, option]);
      }
    } else {
      if (selected.length > 0) {
        selected[0].selected = false;
      }
      option.selected = true;
      setSelected([option]);
    }
  };

  const SelectItem = ({ option }: { option: Option }): React.ReactElement => {
    return (
      <StyledSelectItem multiple={multiple!} key={option.value}>
        {option.label}
        {multiple && (
          <CloseIcon
            height="12px"
            width="12px"
            onClick={(e) => {
              e.stopPropagation();
              console.log("clicked on close icon");
              option.selected = false;
              setSelected(
                selected.filter((item) => item.value !== option.value)
              );
              setShowMenu(false);
            }}
          />
        )}
      </StyledSelectItem>
    );
  };

  const SelectItems = (): React.ReactElement => {
    if (selected.length > 0) {
      return (
        <>
          {selected.map((option: Option) => {
            return <SelectItem option={option} key={option.value} />;
          })}
        </>
      );
    }

    return <StyledSelectItem multiple={false}>{placeholder}</StyledSelectItem>;
  };

  const MenuItem = ({ option }: { option: Option }): React.ReactElement => {
    return (
      <StyledMenuItem
        key={option.value}
        onClick={() => {
          console.log("clicked on menu item");
          handleMenuItemClick(option);
          if (!multiple) {
            setShowMenu(false);
          }
        }}
        style={option.selected ? { backgroundColor: "#63A1EB" } : {}}
      >
        {multiple && (
          <input type="checkbox" checked={option.selected} readOnly />
        )}
        {option.label}
      </StyledMenuItem>
    );
  };

  return (
    <>
      <Select
        onClick={(e) => {
          e.preventDefault();
          setShowMenu(!showMenu);
          console.log("clicked on select");
        }}
        ref={selectRef}
      >
        <SelectItems />
      </Select>
      {showMenu && (
        <Menu ref={menuRef}>
          {options.map((option: Option) => {
            return <MenuItem option={option} key={option.value} />;
          })}
        </Menu>
      )}
    </>
  );
};

const Select = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  padding: 8px;
  cursor: pointer;
`;

interface StyledSelectItemProps {
  multiple: boolean;
}

const StyledSelectItem = styled.div<StyledSelectItemProps>`
  padding: 4px;
  border: ${(props) => (props.multiple ? "1px solid gray" : "none")};
  border-radius: ${(props) => (props.multiple ? "12px" : "")};
`;

const Menu = styled.div`
  border: 1px solid black;
  max-height: 200px;
  overflow-y: scroll;
`;

const StyledMenuItem = styled.div`
  cursor: pointer;
  padding: 8px;
  &:hover {
    background-color: #accef7;
  }
`;

export default Dropdown;
