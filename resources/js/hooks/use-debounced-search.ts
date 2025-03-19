import usePrevious from '@/hooks/use-previous.js';
import { router } from '@inertiajs/react';
import _ from 'lodash';
import { useEffect, useMemo, useState } from 'react';

type ParamsValue = string | number | boolean | null | undefined | ParamsValue[] | { [key: string]: ParamsValue };

type UseDebounceParams<T extends Record<string, ParamsValue>> = {
  url: string;
  initialParams: T;
  initialTimeDebounce?: number;
};

const useDebouncedSearch = <T extends Record<string, ParamsValue>>({ url, initialParams, initialTimeDebounce = 50 }: UseDebounceParams<T>) => {
  const [params, setParams] = useState<T>(initialParams);
  const [timeDebounce, setTimeDebounce] = useState(initialTimeDebounce);
  const prevParams = usePrevious(params);

  const debouncedSearch = useMemo(() => {
    const fn = _.debounce((params: T) => {
      const cleanedParams = _.pickBy(params) as Record<string, ParamsValue>;
      router.get(url, cleanedParams, {
        replace: true,
        preserveScroll: true,
        preserveState: true,
        queryStringArrayFormat: 'indices',
      });
    }, timeDebounce);

    return fn;
  }, [timeDebounce, url]);

  useEffect(() => {
    if (prevParams) {
      debouncedSearch(params);
    }
    return () => {
      debouncedSearch.cancel(); // clean up debounce on unmount or before re-run
    };
  }, [params, prevParams, debouncedSearch]);

  return { params, setParams, setTimeDebounce };
};

export default useDebouncedSearch;
