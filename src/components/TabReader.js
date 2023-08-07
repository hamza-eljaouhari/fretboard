import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formElement: {
        flex: '1 0 21%',
        margin: '10px'
    }
}));

function TabReader(){
    const [tabs, setTabs] = useState('tabs tabs tabs 000 111');
    const classes = useStyles();

    const readTabs = () => {
        var tuning = tabs.match('/^(\n)*[a-zA-Z]{1}/');
    }

    return (
        <section>
            <TextareaAutosize
                minRows="8"
                aria-label="Tabs reader"
                value={tabs}
            />
            <Button
                className={classes.formElement}
                variant="contained"
                color="primary"
                size="medium"
                onClick={readTabs}
            >
                Read tabss 
            </Button>
        </section>
    );
}

export default TabReader;