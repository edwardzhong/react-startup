import React, { useRef } from 'react'
import { useList } from '@/store/hooks'
import styled from 'styled-components'
import { blue, nowrap } from '@/mixin'

export const Header = styled.h1`
    text-align:center;
    font-size:30px;
`;

export const Form = styled.div`
    display:flex;
    width:200px;
    align-items: center;
    margin:10px auto;
`;

export const InputText = styled.input`
    display: block;
    border:1px solid #eee;
    outline: none;
    height:24px;
    padding: 4px;
    margin-right:10px;
    border-radius: 4px;
    font-size: 14px;
    &:focus{
        background-color:hsl(60,80%,90%);
    }`;

export const ListContainer = styled.ul`
    display:flex;
    flex-flow:column nowrap;
    width:200px;
    margin:20px auto;
`;

export const ListItem = styled.li`
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:4px;
    height:30px;
    font-size:16px;
    color:${blue};
    cursor:pointer;
    &:hover {
        opacity:.6;
    }
    span {
        width:120px;
        ${nowrap}
    }
`;

export const Button = styled.button`
    display: block;
    padding: 6px 10px;
    background-color: hsl(200,100%,50%);
    color:#fff;
    border-width:0;
    border-radius: 5px;
    font-size: 14px;
    margin: 10px 0;
    outline: none;
    cursor: pointer;
    &:hover{
        background-color: ${blue};
    }`;

const Home = () => {
    const [list, addFn, removeHandler] = useList();
    const inputRef = useRef(null);
    const addHandler = () => {
        const input = inputRef.current;
        const val = input.value.trim();
        if (!val) {
            alert('name is null or empty');
            return;
        }
        addFn(val);
        input.value = '';
    };

    return <>
        <Header>Hello React</Header>
        <Form>
            <InputText ref={ inputRef } />
            <Button onClick={ addHandler }>Add</Button>
        </Form>
        <ListContainer>
            {
                list.map(l => <ListItem key={ l.id }>
                    <span>{ l.name }</span>
                    <Button onClick={ () => removeHandler(l.id) }>Delete</Button>
                </ListItem>)
            }
        </ListContainer>
    </>
}
export default Home
