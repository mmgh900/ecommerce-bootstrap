import React from 'react';


interface IFormSelectProps {
    [key: string]: any;
    
    className: string;
    isValid: boolean;
    label: string;
    options: Array<{
        name: string;
        id: number;
    }>

    handleChange(event: React.ChangeEvent<HTMLSelectElement>): void;
}

const FormSelect: React.FC<IFormSelectProps> = ({
                                                  options,
                                                  label,
                                                  name,
                                                  handleChange,
                                                  className,
                                                  isValid,
                                                  ...otherProps
                                              }) => (
    <div className="form-floating">
        <select
            className={"form-select " + (isValid ? null : "is-invalid ") + (className ? className : null)}
            id={name}
            name={name}
            onChange={handleChange}
            {...otherProps}>
            {
                options.map((item) => (
                    <option value={item.name} data-index={item.id} key={item.id}>{item.name}</option>
                ))
            }
        </select>
        <label htmlFor="province">{label}</label>
    </div>
);

export default FormSelect;