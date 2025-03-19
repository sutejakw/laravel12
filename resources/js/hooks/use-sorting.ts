import { Dispatch, SetStateAction } from 'react';

type SortOrder = 'asc' | 'desc' | null;

type SortParams = {
  col: string;
  sort?: SortOrder;
};

const useSorting = (initialParams: SortParams, setParams: Dispatch<SetStateAction<SortParams>>) => {
  const sort = (column: string) => {
    setParams((prevParams) => ({
      ...prevParams,
      col: column,
      sort: prevParams.sort === 'asc' ? 'desc' : 'asc',
    }));
  };

  return { sort };
};

export default useSorting;
