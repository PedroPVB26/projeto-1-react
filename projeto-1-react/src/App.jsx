import { useReducer } from "react";

import { Alert, Button, Container, Stack, Typography } from "@mui/material";

import SearchForm from "./components/SearchForm";
import AccidentList from "./components/AccidentList";
import AccidentDialog from "./components/AccidentDialog";

import {
    fetchEventById,
    fetchEvents
} from "./api/aviationApi";

import {
    aviationReducer,
    initialState
} from "./reducer/aviationReducer";

import "./App.css";

function App() {
    const [state, dispatch] = useReducer(
        aviationReducer,
        initialState
    );

    async function handleSearch(cursor = null) {
        const isAppending = Boolean(cursor);

        dispatch({
            type: "FETCH_START",
            append: isAppending
        });

        try {
            const data = await fetchEvents({
                ...state.filters,
                cursor
            });

            dispatch({
                type: "FETCH_SUCCESS",
                payload: data,
                append: isAppending
            });
        } catch (error) {
            dispatch({
                type: "FETCH_ERROR",
                error:
                    error instanceof Error
                        ? error.message
                        : "Erro desconhecido."
            });
        }
    }

    async function handleDetails(eventId) {
        dispatch({
            type: "DETAIL_START"
        });

        try {
            const data = await fetchEventById(eventId);

            dispatch({
                type: "DETAIL_SUCCESS",
                payload: data
            });
        } catch (error) {
            dispatch({
                type: "DETAIL_ERROR",
                error:
                    error instanceof Error
                        ? error.message
                        : "Erro desconhecido."
            });
        }
    }

    function handleFilterChange(field, value) {
        dispatch({
            type: "SET_FILTER",
            field,
            value
        });
    }

    function handleCloseDetails() {
        dispatch({
            type: "CLOSE_DETAILS"
        });
    }

    return (
        <div className="app">
            <header className="hero">
                <Container maxWidth="lg">
                    <Stack spacing={1}>
                        <Typography
                            variant="h3"
                            component="h1"
                            className="hero-title"
                        >
                            ✈ Aviation Accidents
                        </Typography>

                        <Typography
                            variant="h6"
                            className="hero-subtitle"
                        >
                            Consulte ocorrências aeronáuticas
                            através de uma API pública.
                        </Typography>
                    </Stack>
                </Container>
            </header>

            <main>
                <Container
                    maxWidth="lg"
                    className="main-container"
                >
                    <section className="search-section">
                        <Typography
                            variant="h5"
                            component="h2"
                        >
                            Pesquisar ocorrências
                        </Typography>

                        <SearchForm
                            filters={state.filters}
                            onFilterChange={handleFilterChange}
                            onSearch={() => handleSearch()}
                            loading={state.loading}
                        />
                    </section>

                    {state.error &&
                        state.events.length > 0 && (
                            <Alert
                                severity="error"
                                className="section-alert"
                            >
                                {state.error}
                            </Alert>
                        )}

                    <section className="results-section">
                        <Typography
                            variant="h5"
                            component="h2"
                            className="section-title"
                        >
                            Resultados
                        </Typography>

                        <AccidentList
                            events={state.events}
                            loading={state.loading}
                            error={state.error}
                            onDetails={handleDetails}
                        />

                        {state.nextCursor && (
                            <div className="load-more-container">
                                <Button
                                    variant="outlined"
                                    disabled={state.loading}
                                    onClick={() =>
                                        handleSearch(
                                            state.nextCursor
                                        )
                                    }
                                >
                                    {state.loading
                                        ? "Carregando..."
                                        : "Carregar mais"}
                                </Button>
                            </div>
                        )}
                    </section>
                </Container>
            </main>

            <footer className="footer">
                <Container maxWidth="lg">
                    <Typography variant="body2">
                        Dados fornecidos pela FlightFinder
                        Aviation Safety Data API.
                    </Typography>
                </Container>
            </footer>

            <AccidentDialog
                open={
                    state.detailLoading ||
                    Boolean(state.selectedEvent) ||
                    Boolean(state.detailError)
                }
                event={state.selectedEvent}
                loading={state.detailLoading}
                error={state.detailError}
                onClose={handleCloseDetails}
            />
        </div>
    );
}

export default App;