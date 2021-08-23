import React from 'react';



interface IFormInputProps {
    [key: string]: any;
    name: string;
    label: string;
    className: string;
    isValid: boolean;
    
    handleChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

const FormInput: React.FC<IFormInputProps> = ({name, handleChange, label, className, isValid, ...otherProps}) => (
    <div className={"form-floating "  + (className ? className : "")}>
        <input
            id={name}
            name={name}
            onChange={handleChange}
            className={"form-control " + (isValid ? "" : " is-invalid ")}
            placeholder={label}
            {...otherProps}/>
        <label htmlFor={name}>{label}</label>
    </div>
);

export default FormInput;
