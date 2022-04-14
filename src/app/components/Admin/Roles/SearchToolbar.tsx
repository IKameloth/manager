import { IconButton, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

interface SearchTool {
    clearSearch: () => void;
    onChange: () => void;
    value: string;
};

export default function QuickSearchToolbar(props: SearchTool) {
    return(
        <TextField
            style={{ marginLeft: 10 }}
            variant="outlined"
            placeholder=" Buscar..."
            value={props.value}
            onChange={props.onChange}
            InputProps={{
                startAdornment: <SearchIcon fontSize="small" color="primary" />,
                endAdornment: (
                    <IconButton
                        title="Clear"
                        aria-label="Clear"
                        size="small"
                        style={{ visibility: props.value ? 'visible' : 'hidden' }}
                        onClick={props.clearSearch}
                    ><ClearIcon /></IconButton>
                )
            }}
        />
    );
};