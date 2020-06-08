import React, {useRef, useState} from "react";
import styled, {css} from 'styled-components';
import {shadow1} from "../theme";
import useClickAway from "../hooks/useClickAway";
import useKeyPress from "../hooks/useKeyPress";

interface Dictionary<T> {
    [Key: string]: T;
}

interface Props {
    options : Dictionary<JSX.Element | string>,
    placeholder ?: string,
}

interface OptionProps {
    selected: boolean;
    color : string,
    disabled ?: boolean
}

const Wrapper = styled.div`
    max-width: 500px;
`

const Option = styled.div`
    background-color : #ffffff;
    border-radius : 5px;
    padding : 5px 10px;
    cursor : pointer;
    
    ${(props : OptionProps) => props.disabled && css`
       cursor : not-allowed;
       opacity : .8;
    `}
    
    font-weight : ${(props : OptionProps) => props.selected ? 'bold' : 'normal'};
    
    &:hover {
        background-color : #eeeeee;
    }
`

const Options = styled.div`
    box-shadow: ${shadow1};
    border: 1px solid #dddddd;
    border-radius : 5px;
    width : 100%;
    position : relative;
    top : 3px;
`

const Selector = styled.div`
    padding : 5px 10px;
    border: 2px solid #dfdff6;
    border-radius: 5px;
    cursor: pointer;
    
    &::after {
        content : "▾";
        font-size : 28px;
        float : right;
        line-height: 12px;
        opacity: .7;
    }
`

export const Select : React.FC<Props> = (props) => {
    const {children, options, placeholder = "vælg"} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | null>(null);

    const optionsRef = useRef<HTMLDivElement>(null);
    const selectorRef = useRef<HTMLDivElement>(null);
    const hide = () => setOpen(false);

    useClickAway([optionsRef, selectorRef], hide);
    useKeyPress(hide, ["Escape", "Enter"]);

    const arrowNav = (key : string) => {
        const optionKeys = Object.keys(options);
        let index = !selected ? -1 : optionKeys.indexOf(selected);
        if (key === "ArrowDown") index = (index + 1) % optionKeys.length;
        else if (index < 1) index = optionKeys.length - 1;
        else index = (index - 1) % optionKeys.length;
        setSelected(optionKeys[index]);
    }
    useKeyPress(arrowNav, ["ArrowDown", "ArrowUp"])

    const toggleOpen = () => setOpen(p => !p);
    const toggleSelection = (key : string) => {
        setSelected(key);
        setOpen(false);
    }

    const selectedLabel = selected ? options[selected] : null;

    return (
        <Wrapper>
            {children && <label style={{paddingLeft: 10}}>children</label>}
            <Selector onClick={toggleOpen} ref={selectorRef}>
                {selectedLabel || placeholder}
            </Selector>
            {open &&
                <Options ref={optionsRef}>
                    {Object.keys(options).map((key, i) => (
                        <Option selected={key === selected} data-value={options[key]} key={i} color={'primary'} onClick={() => toggleSelection(key)}>
                            {options[key]}
                        </Option>
                    ))}
                </Options>
            }
        </Wrapper>
    );
}
