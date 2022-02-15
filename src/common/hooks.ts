import { useState, useEffect } from 'react';
import { PlainObject, ResData } from 'types/type';

/**
 * fetch data
 * @param fetch function 
 */
export const useFetch: <T = PlainObject>(fetch: () => Promise<ResData<PlainObject>>) => [boolean, T, (arg: any) => void] = fetch => {
    const [isFetching, setFetching] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        (async () => {
            setFetching(true);
            const res = await fetch();
            if (res.code == 0 && res.data) setData(res.data);
            setFetching(false);
        })();
    }, [fetch]);

    return [isFetching, data, setData];
}