import React, { ChangeEvent, FC } from 'react';

interface NumberInputProps {
    name: string;
    value: string;
    className: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Componente to validate number in input type text
const NumberInput: FC<NumberInputProps> = ({ value, onChange, name, className, placeholder }) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value.replace(/[^0-9]/g, '');
        onChange({ ...event, target: { ...event.target, name, value: newValue } });
    };

    return (
        <input type="text" name={name} className={className} placeholder={placeholder} value={value} onChange={handleInputChange} />
    );
};

export default NumberInput;
