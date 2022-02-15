import { atom } from 'recoil'

export const generateID = (name?: string) => (name || 'id_') + Math.round(Math.random() * 1000000);
const randomStr = (num: number) => new Array(num).fill('').map(() => String.fromCharCode(48 + Math.floor(Math.random() * 66))).join('');

export const listAtom = atom({
    key: 'list',
    default: new Array(4).fill('').map(() => ({
        id: generateID(),
        name: randomStr(8)
    }))
});