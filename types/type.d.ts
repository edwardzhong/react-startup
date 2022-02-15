type PlainObject = { [P: string]: any };

interface ResData<T> {
    code: number;
    msg?: string;
    data?: T;
}

type AxiosFn = (url: string, param?: any) => Promise<ResData<any>>;

export {
    PlainObject,
    AxiosFn,
    ResData,
}