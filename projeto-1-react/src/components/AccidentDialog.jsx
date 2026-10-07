import {
    Alert,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    Link,
    Stack,
    Typography
} from "@mui/material";

function AccidentDialog({
    open,
    event,
    loading,
    error,
    onClose
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                Detalhes da ocorrência
            </DialogTitle>

            <DialogContent dividers>
                {loading && (
                    <div className="dialog-loading">
                        <CircularProgress />
                    </div>
                )}

                {!loading && error && (
                    <Alert severity="error">
                        {error}
                    </Alert>
                )}

                {!loading && event && (
                    <Stack spacing={2}>
                        <Typography variant="h6">
                            {event.family_slug ||
                                event.type_icao ||
                                "Aeronave não informada"}
                        </Typography>

                        <Divider />

                        <Typography>
                            <strong>Data:</strong>{" "}
                            {event.event_date || "Não informada"}
                        </Typography>

                        <Typography>
                            <strong>Tipo da ocorrência:</strong>{" "}
                            {event.occurrence_type ||
                                "Não informado"}
                        </Typography>

                        <Typography>
                            <strong>Severidade:</strong>{" "}
                            {event.severity || "Não informada"}
                        </Typography>

                        <Typography>
                            <strong>País:</strong>{" "}
                            {event.country_iso ||
                                "Não informado"}
                        </Typography>

                        <Typography>
                            <strong>Tipo ICAO:</strong>{" "}
                            {event.type_icao ||
                                "Não informado"}
                        </Typography>

                        <Typography>
                            <strong>Família:</strong>{" "}
                            {event.family_slug ||
                                "Não informada"}
                        </Typography>

                        <Typography>
                            <strong>Matrícula:</strong>{" "}
                            {event.registration ||
                                "Não informada"}
                        </Typography>

                        <Typography>
                            <strong>Operador:</strong>{" "}
                            {event.operator ||
                                "Não informado"}
                        </Typography>

                        <Typography>
                            <strong>Fatalidades:</strong>{" "}
                            {event.fatalities_total ?? 0}
                        </Typography>

                        {event.sources?.length > 0 && (
                            <>
                                <Divider />

                                <Typography variant="h6">
                                    Fontes
                                </Typography>

                                <Stack spacing={1.5}>
                                    {event.sources.map(
                                        (source, index) => (
                                            <div
                                                key={`${source.source}-${index}`}
                                            >
                                                <Typography>
                                                    <strong>
                                                        Fonte:
                                                    </strong>{" "}
                                                    {source.attribution ||
                                                        source.source}
                                                </Typography>

                                                <Typography variant="body2">
                                                    <strong>
                                                        Licença:
                                                    </strong>{" "}
                                                    {source.license ||
                                                        "Não informada"}
                                                </Typography>

                                                {source.url && (
                                                    <Link
                                                        href={source.url}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        Ver fonte original
                                                    </Link>
                                                )}
                                            </div>
                                        )
                                    )}
                                </Stack>
                            </>
                        )}
                    </Stack>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default AccidentDialog;