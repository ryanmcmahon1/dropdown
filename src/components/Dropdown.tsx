import React, { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "../close.svg";
import { ReactComponent as ArrowIcon } from "../down-arrow.svg";

interface InputOption {
  value: string;
  label: string;
}

interface Option extends InputOption {
  selected?: boolean;
}

interface DropdownProps {
  // Array of objects containing value, label
  options: Array<InputOption>;
  // Optional placeholder text
  placeholder?: string;
  // Controls if multiple options can be selected
  multiple?: boolean;
  // Triggers whenever selected value changes (can be used to track selected values in parent component)
  onChange?: (updatedValue: Array<Option>) => void;
}

const Dropdown = ({
  options,
  placeholder,
  multiple,
  onChange,
}: DropdownProps): React.ReactElement => {
  const [selected, setSelected] = useState<Array<Option>>([]);
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const selectRef = useRef<HTMLInputElement>(null);

  const optionsMemo: Array<Option> = useMemo(
    () => structuredClone(options),
    [options]
  );

  // closes menu if user clicks outside of select
  useEffect(() => {
    function handleExternalClick(e: any) {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    }

    window.addEventListener("click", handleExternalClick);
    return () => {
      document.removeEventListener("mousedown", handleExternalClick);
    };
  });

  const handleMenuItemClick = (option: Option): void => {
    let updatedSelected: Array<Option> = [];

    if (multiple) {
      if (selected.map((item) => item.value).includes(option.value)) {
        option.selected = false;
        updatedSelected = selected.filter(
          (item) => item.value !== option.value
        );
        if (selected.length <= 1) {
          setShowMenu(false);
        }
      } else {
        option.selected = true;
        updatedSelected = [...selected, option];
      }
    } else {
      if (selected.length > 0) {
        selected[0].selected = false;
      }
      option.selected = true;
      updatedSelected = [option];
    }

    setSelected(updatedSelected);
    if (onChange) {
      onChange(updatedSelected);
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
            style={{ marginLeft: "8px", cursor: "pointer" }}
            onClick={(e) => {
              e.stopPropagation();
              option.selected = false;
              const updatedSelected = selected.filter(
                (item) => item.value !== option.value
              );
              setSelected(updatedSelected);
              if (onChange) {
                onChange(updatedSelected);
              }
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
        onClick={(e) => {
          e.stopPropagation();
          handleMenuItemClick(option);
          if (!multiple) {
            setShowMenu(false);
          }
        }}
        style={option.selected ? { backgroundColor: "#57A4FE" } : {}}
      >
        {multiple && (
          <input type="checkbox" checked={option.selected} readOnly />
        )}
        {option.label}
      </StyledMenuItem>
    );
  };

  return (
    <StyledDiv>
      <Select
        onClick={(e) => {
          e.stopPropagation();
          setShowMenu(!showMenu);
        }}
        ref={selectRef}
      >
        <SelectContainer>
          <SelectItems />
        </SelectContainer>
        <ArrowIcon
          height="18px"
          width="18px"
          style={{ cursor: "pointer", minWidth: "18px", marginLeft: "8px" }}
        />
      </Select>
      {showMenu && (
        <Menu>
          {multiple && (
            <StyledMenuItem
              style={{ fontWeight: "600", backgroundColor: "lightgray" }}
              onClick={(e) => {
                let updatedSelected: Array<Option> = [];
                if (optionsMemo.length === selected.length) {
                  optionsMemo.forEach((option) => (option.selected = false));
                } else {
                  e.stopPropagation();
                  optionsMemo.forEach((option) => (option.selected = true));
                  updatedSelected = optionsMemo;
                }

                setSelected(updatedSelected);
                if (onChange) {
                  onChange(updatedSelected);
                }
              }}
            >
              {optionsMemo.length === selected.length
                ? "Deselect all"
                : "Select all"}
            </StyledMenuItem>
          )}
          <hr style={{ margin: "0px" }} />
          {optionsMemo.map((option: Option) => {
            return <MenuItem option={option} key={option.value} />;
          })}
        </Menu>
      )}
    </StyledDiv>
  );
};

const Select = styled.div`
  border: 1px solid black;
  border-radius: 4px;
  padding: 8px;
  max-height: 400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  overflow-y: scroll;
  user-select: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

interface StyledSelectItemProps {
  multiple: boolean;
}

const StyledSelectItem = styled.div<StyledSelectItemProps>`
  padding: 8px;
  margin: ${(props) => (props.multiple ? "2px" : "0px")};
  width: fit-content;
  border: ${(props) => (props.multiple ? "1px solid gray" : "none")};
  border-radius: ${(props) => (props.multiple ? "12px" : "")};
  cursor: default;
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

const StyledDiv = styled.div`{
  display: flex;
  flex-direction: column;
  padding: 8px;
  width: 100%;
`;

export default Dropdown;
