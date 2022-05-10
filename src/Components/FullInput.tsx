import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@mui/material';

export type FullInputPropsType = {
    callBack: (newTitle: string) => void
}

export const FullInput = (props: FullInputPropsType) => {

    let [title, setTitle] = useState('')
    let [error, setError] = useState<boolean>(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === 'Enter') {
            addTask();
        }
    }
    const addTask = () => {
        let newTitle = title.trim();
        if (newTitle !== '') {
            props.callBack(newTitle);
            setTitle('');
        } else {
            setError(true);
        }
    }

    return (
        <div>
            {/*<input value={title}*/}
            {/*       onChange={onChangeHandler}*/}
            {/*       onKeyPress={onKeyPressHandler}*/}
            {/*       className={error ? "error" : ""}*/}
            {/*/>*/}
            <TextField id="outlined-basic"
                       label={error ? 'Title is required' : `Text`}
                       variant="outlined"
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       size='small'
                       error={error}
                       helperText={'Title is required'}
            />
            {/*<button onClick={addTask}>+</button>*/}
            <Button onClick={addTask} color={'primary'}
                    variant="contained"
                    style={{maxWidth: '39px', maxHeight: '39px', minWidth: '39px', minHeight: '39px'}}
            >+</Button>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    );
}
