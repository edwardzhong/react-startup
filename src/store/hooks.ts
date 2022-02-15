import produce from 'immer'
import { useRecoilState } from 'recoil'
import { generateID, listAtom } from './atoms'

type ListItem = { id: string; name: string };

type UseList = () => [ListItem[], (name: string) => void, (id: string) => void]
export const useList: UseList = () => {
    const [list, setList] = useRecoilState<ListItem[]>(listAtom);

    const add = (name: string) => {
        setList(produce(list, draft => {
            draft.push({ id: generateID(), name });
        }))
    };

    const remove = (id: string) => {
        setList(produce(list, draft => {
            const i = draft.findIndex(d => d.id == id);
            if (i > -1) draft.splice(i, 1);
        }))
    };

    return [list, add, remove];
}