import { Alert, Box, CircularProgress, Typography } from "@mui/material";

import AccidentCard from "./AccidentCard";

function AccidentList({
    events,
    loading,
    error,
    onDetails
}) {
    if (loading && events.length === 0) {
        return (
            <Box className="state-container">
                <CircularProgress />
                <Typography>
                    Carregando acidentes...
                </Typography>
            </Box>
        );
    }

    if (error && events.length === 0) {
        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    if (!loading && events.length === 0) {
        return (
            <Box className="state-container">
                <Typography variant="h6">
                    Nenhum resultado
                </Typography>

                <Typography color="text.secondary">
                    Realize uma pesquisa para consultar acidentes.
                </Typography>
            </Box>
        );
    }

    return (
        <>
            {error && (
                <Alert
                    severity="error"
                    className="section-alert"
                >
                    {error}
                </Alert>
            )}

            <div className="accident-grid">
                {events.map((event) => (
                    <AccidentCard
                        key={event.id}
                        event={event}
                        onDetails={onDetails}
                    />
                ))}
            </div>
        </>
    );
}

export default AccidentList;