import React from "react";
import "./App.css";
import Dropdown from "./components/Dropdown";

function App() {
  const dropdownOptions = [
    { value: "george", label: "George Washington" },
    { value: "john1", label: "John Adams" },
    { value: "tom", label: "Thomas Jefferson" },
    { value: "james1", label: "James Madison" },
    { value: "james2", label: "James Monroe" },
    { value: "john2", label: "John Quincy Adams" },
    { value: "andrew1", label: "Andrew Jackson" },
    { value: "martin", label: "Martin Van Buren" },
    { value: "william1", label: "William Henry Harrison" },
    { value: "john3", label: "John Tyler" },
    { value: "james3", label: "James K. Polk" },
    { value: "zach", label: "Zachary Taylor" },
    { value: "millard", label: "Millard Fillmore" },
    { value: "frank", label: "Franklin Pierce" },
    { value: "james4", label: "James Buchanan" },
    { value: "abe", label: "Abraham Lincoln" },
    { value: "andrew2", label: "Andrew Johnson" },
    { value: "ulysses", label: "Ulysses S. Grant" },
    { value: "hayes", label: "Rutherford B. Hayes" },
    { value: "james5", label: "James Garfield" },
    { value: "chester", label: "Chester A. Arthur" },
    { value: "grover", label: "Grover Cleveland" },
    { value: "ben", label: "Benjamin Harrison" },
    { value: "william2", label: "William McKinley" },
    { value: "teddy", label: "Theodore Roosevelt" },
    { value: "william3", label: "William Howard Taft" },
    { value: "wilson", label: "Woodrow Wilson" },
    { value: "warren", label: "Warren G. Harding" },
    { value: "calvin", label: "Calvin Coolidge" },
    { value: "herb", label: "Herbert Hoover" },
    { value: "fdr", label: "Franklin Roosevelt" },
    { value: "harry", label: "Harry S. Truman" },
    { value: "dwight", label: "Dwight D. Eisenhower" },
    { value: "jfk", label: "John F. Kennedy" },
    { value: "lbj", label: "Lyndon B. Johnson" },
    { value: "nixon", label: "Richard Nixon" },
    { value: "ford", label: "Gerald R. Ford" },
    { value: "carter", label: "Jimmy Carter" },
  ];

  return (
    <div className="App">
      <Dropdown options={dropdownOptions} placeholder="Select..." multiple />
      <Dropdown options={dropdownOptions} placeholder="Select..." />
    </div>
  );
}

export default App;
