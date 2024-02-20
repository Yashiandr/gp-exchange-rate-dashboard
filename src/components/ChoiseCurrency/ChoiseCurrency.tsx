import React from 'react';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';


type Props = {
    charPoint: string | null,
    setCharPoint: React.Dispatch<React.SetStateAction<any>>;
    charCurrencies: Array<string>
}

export const ChoiceCurrency: React.FC<Props> =  ({ charPoint, setCharPoint, charCurrencies }) => {
    const handleChange = (event: any) => {
        setCharPoint(event.value);
    }

    return (
        <ChoiceGroup
            value={charPoint}
            onChange={handleChange}
            size='xs'
            items={charCurrencies}
            getItemLabel={(value: string) => value}
            style={{
                position: 'absolute',
                top: '.5rem',
                right: '.5rem',
            }}
            name="ChoiceCurrency"
        />
    );
};