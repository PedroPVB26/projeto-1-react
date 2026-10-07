import {
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField
} from "@mui/material";

function SearchForm({ filters, onFilterChange, onSearch, loading }) {
    function handleSubmit(event) {
        event.preventDefault();
        onSearch();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Stack
                className="search-form"
                direction={{ xs: "column", md: "row" }}
                spacing={2}
            >
                <TextField
                    label="Família da aeronave"
                    placeholder="Ex.: boeing-737"
                    value={filters.family}
                    onChange={(event) =>
                        onFilterChange("family", event.target.value)
                    }
                    fullWidth
                />

                <TextField
                    label="Operador"
                    placeholder="Ex.: GOL"
                    value={filters.operator}
                    onChange={(event) =>
                        onFilterChange("operator", event.target.value)
                    }
                    fullWidth
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={filters.fatal}
                            onChange={(event) =>
                                onFilterChange(
                                    "fatal",
                                    event.target.checked
                                )
                            }
                        />
                    }
                    label="Somente fatais"
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    className="search-button"
                >
                    {loading ? "Buscando..." : "Buscar"}
                </Button>
            </Stack>
        </form>
    );
}

export default SearchForm;