import React, { createContext, useContext, useState, useCallback } from "react";

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    rating: null,
    serviceType: null,
    price: null,
  });

  const applyFilters = useCallback((newFilters) => {
    setFilters(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      rating: null,
      serviceType: null,
      price: null,
    });
  }, []);

  const filterVendors = useCallback(
    (vendors) => {
      if (!vendors || vendors.length === 0) return vendors;

      return vendors.filter((vendor) => {
        // Filter by rating
        if (filters.rating && vendor.rating < filters.rating) {
          return false;
        }

        // Filter by service type
        if (
          filters.serviceType &&
          vendor?.vendorOnboarding?.serviceType !== filters.serviceType
        ) {
          return false;
        }

        // Filter by price (if implemented)
        // if (filters.price && vendor.price > filters.price) {
        //   return false;
        // }

        return true;
      });
    },
    [filters]
  );

  return (
    <FilterContext.Provider
      value={{
        filters,
        applyFilters,
        resetFilters,
        filterVendors,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
