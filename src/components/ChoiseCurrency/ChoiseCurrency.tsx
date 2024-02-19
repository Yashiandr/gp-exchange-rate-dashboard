import React from 'react';
import { ChoiceGroup } from '@consta/uikit/ChoiceGroup';


type Props = {
    value: string | null,
    setValue: React.Dispatch<React.SetStateAction<any>>;
    items: Array<string>
}

export const ChoiceCurrency: React.FC<Props> =  ({ value, setValue, items }) => {
    return (
        <ChoiceGroup
            value={value}
            onChange={({ value }) => setValue(value)}
            size={'xs'}
            items={items}
            getItemLabel={(item: string) => item}
            multiple={false}
            style={{
                alignSelf: 'flex-start',
            }}
            name="ChoiceCurrency"
        />
    );
};