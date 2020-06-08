import React, {useMemo, useRef, useState} from "react";
import styled, {css} from 'styled-components';
import {shadow1} from "../theme";
import useClickAway from "../hooks/useClickAway";

interface Dictionary<T> {
    [Key: string]: T;
}

interface Props {
    options : Dictionary<string>,
    placeholder ?: string,
    tabIndex ?: number,
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
    
    ${(props : OptionProps) => props.selected && `
        font-weight: bold;
        background-color : #f6f6f6;
    `};
    
    &:hover {
        background-color : #f0f0f0;
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
    position : relative;
    

    &::after {
        content : "🔎";
        font-size : 20px;
        float : right;
        line-height: 18px;
        opacity: .7;
    }
`

const SearchInput = styled.input`
    border: none;
    font-size : inherit;
    color : inherit;
    padding: 5px 10px;
    position : absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
`

// TODO render <Options> above or below <Select> based on available space + sizing
// TODO styling with props (theming)
// TODO accessibility
// TODO code-splitting - reusability
export const Select : React.FC<Props> = (props) => {
    const {children, options, placeholder = "vælg", tabIndex = 0} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<string | null>(null);
    const [query, setQuery] = useState("");

    const optionsRef = useRef<HTMLDivElement>(null);
    const selectorRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    const hide = () => setOpen(false);
    useClickAway([optionsRef, selectorRef], hide);

    const matchingOptions : Dictionary<string> = useMemo(() => {
        if (!query) return options;
        const result : Dictionary<string> = {};
        const q =query.toUpperCase();
        Object.keys(options).forEach(key => {
            if (options[key].toUpperCase().includes(q)) result[key] = options[key];
        });
        return result;
    }, [query, options]);

    const arrowNav = (key : string) => {
        if (!open) return;
        const optionKeys = Object.keys(matchingOptions);
        let index = !selected ? -1 : optionKeys.indexOf(selected);
        if (key === "ArrowDown") index = (index + 1) % optionKeys.length;
        else if (index < 1) index = optionKeys.length - 1;
        else index = (index - 1) % optionKeys.length;
        setSelected(optionKeys[index]);
    }

    const keyPressHandler = (e : any) => {
        const {key, keyCode} = e;
        if(["ArrowDown", "ArrowUp"].includes(key)) return arrowNav(key);
        if(key === "Escape") return hide();
        if(key === "Enter") return toggleOpen();
    }

    const toggleOpen = () => {
        console.log("toggleOpen");
        console.log(open, searchInputRef.current);
        if(!open && searchInputRef.current){
            console.log("hey");
            searchInputRef.current.focus();
        }
        else if(open && searchInputRef.current) searchInputRef.current.blur();
        setOpen(p => !p);
    }
    const toggleSelection = (key : string) => {
        setSelected(key);
        setOpen(false);
    }

    const selectedLabel = selected ? options[selected] : null;

    return (
        <Wrapper>
            {children && <label style={{paddingLeft: 10}}>{children}</label>}
            <Selector tabIndex={tabIndex} onClick={() => setOpen(true)} ref={selectorRef} onKeyDown={keyPressHandler}>
                {
                    <SearchInput style={{zIndex : open ? 2 : -1}} ref={searchInputRef} placeholder={selectedLabel || placeholder} value={query} onChange={e => setQuery(e.target.value)}/>
                }
                {
                    selectedLabel || placeholder
                }
            </Selector>
            {open &&
                <Options ref={optionsRef}>
                    {Object.keys(matchingOptions).map((key, i) => (
                        <Option selected={key === selected} data-value={options[key]} key={i} color={'primary'} onClick={() => toggleSelection(key)}>
                            {matchingOptions[key]}
                        </Option>
                    ))}
                </Options>
            }
        </Wrapper>
    );
}
