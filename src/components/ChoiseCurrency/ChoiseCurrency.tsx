import React from 'react';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';


type Props = {
    charPoint: string | null,
    setCharPoint: React.Dispatch<React.SetStateAction<any>>;
    charCurrencies: Array<string>
}

export const ChoiceCurrency: React.FC<Props> =  ({ charPoint, setCharPoint, charCurrencies }) => {
    return (
        <ChoiceGroup
            value={charPoint}
            onChange={({ value }) => setCharPoint(value)}
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