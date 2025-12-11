import { createContext, useState, ReactNode, useContext } from 'react';
import { Purchase } from 'types/purchase';

interface FilterContextType {
  lista: Purchase[];
  setLista: React.Dispatch<React.SetStateAction<Purchase[]>>;
  dateFrom: Date | null;
  setDateFrom: React.Dispatch<React.SetStateAction<Date | null>>;
  dateTo: Date | null;
  setDateTo: React.Dispatch<React.SetStateAction<Date | null>>;
}

const FilterContext = createContext<FilterContextType | null>(null);

interface FilterProviderProps {
  children: ReactNode;
}

function FilterProvider({ children }: FilterProviderProps) {
  const [lista, setLista] = useState<Purchase[]>([]);
  const [dateFrom, setDateFrom] = useState<Date | null>(null);
  const [dateTo, setDateTo] = useState<Date | null>(null);

  return (
    <FilterContext.Provider value={{ lista, setLista, dateFrom, setDateFrom, dateTo, setDateTo }}>
      {children}
    </FilterContext.Provider>
  );
}

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext debe ser usado dentro de un FilterProvider');
  }
  return context;
};
export { FilterContext, FilterProvider, useFilterContext };