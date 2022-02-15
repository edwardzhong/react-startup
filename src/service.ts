import { get, post } from './common/request'
import { PlainObject, ResData } from 'types/type';

type Res<T> = Promise<ResData<T>>;
type PromiseFn<P, T> = (arg: P) => Res<T>;

export const login: PromiseFn<{ name: string; password: string }, PlainObject> = arg => post('/login', arg)
export const getList: PromiseFn<PlainObject, PlainObject[]> = arg => get('/list', arg)