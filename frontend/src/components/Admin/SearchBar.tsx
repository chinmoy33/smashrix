import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder = "Search...", value, onChange }) => {
  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        className="input input-bordered w-full pl-10"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral/60" />
    </div>
  );
};

export default SearchBar;
