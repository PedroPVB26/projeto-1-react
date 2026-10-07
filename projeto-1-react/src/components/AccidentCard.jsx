import {
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Stack,
    Typography
} from "@mui/material";

function AccidentCard({ event, onDetails }) {
    const isFatal = event.fatalities_total > 0;

    return (
        <Card className="accident-card">
            <CardContent>
                <Stack spacing={1.5}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        gap={1}
                    >
                        <Typography variant="h6">
                            {event.family_slug ||
                                event.type_icao ||
                                "Aeronave não informada"}
                        </Typography>

                        <Chip
                            label={isFatal ? "Fatal" : "Não fatal"}
                            color={isFatal ? "error" : "default"}
                            size="small"
                        />
                    </Stack>

                    <Typography variant="body2">
                        <strong>Data:</strong>{" "}
                        {event.event_date || "Não informada"}
                    </Typography>

                    <Typography variant="body2">
                        <strong>País:</strong>{" "}
                        {event.country_iso || "Não informado"}
                    </Typography>

                    <Typography variant="body2">
                        <strong>Tipo ICAO:</strong>{" "}
                        {event.type_icao || "Não informado"}
                    </Typography>

                    <Typography variant="body2">
                        <strong>Operador:</strong>{" "}
                        {event.operator || "Não informado"}
                    </Typography>

                    <Typography variant="body2">
                        <strong>Registro:</strong>{" "}
                        {event.registration || "Não informado"}
                    </Typography>

                    <Typography variant="body2">
                        <strong>Fatalidades:</strong>{" "}
                        {event.fatalities_total ?? 0}
                    </Typography>
                </Stack>
            </CardContent>

            <CardActions>
                <Button
                    size="small"
                    variant="outlined"
                    onClick={() => onDetails(event.id)}
                >
                    Ver detalhes
                </Button>
            </CardActions>
        </Card>
    );
}

export default AccidentCard;