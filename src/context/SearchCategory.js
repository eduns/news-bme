import React, { useState, createContext, useContext } from 'react';

const SearchCategoryContext = createContext();

export default function SearchProvider({ children }) {
    const [searchCategory, setSearchCategory] = useState('ALL');

    return (
        <SearchCategoryContext.Provider value={{ searchCategory, setSearchCategory }}>
            {children}
        </SearchCategoryContext.Provider>
    )
}

export function useSearchCategory() {
    const context = useContext(SearchCategoryContext);
    const { searchCategory, setSearchCategory } = context;
    return { searchCategory, setSearchCategory }
}