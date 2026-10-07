const API_BASE_URL = "https://himaxym.com/api/v1/data";

function normalizeFamily(value) {
    return value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-");
}

export async function fetchEvents({
    family,
    operator,
    fatal,
    cursor = null,
    limit = 10
}) {
    const params = new URLSearchParams();

    params.set("limit", String(limit));

    if (family.trim()) {
        params.set("family", normalizeFamily(family));
    }

    if (operator.trim()) {
        params.set("operator", operator.trim());
    }

    if (fatal) {
        params.set("fatal", "1");
    }

    if (cursor) {
        params.set("cursor", cursor);
    }

    const response = await fetch(
        `${API_BASE_URL}/events?${params.toString()}`
    );

    if (!response.ok) {
        let message = "Não foi possível carregar os acidentes.";

        try {
            const errorData = await response.json();

            if (errorData?.error?.message) {
                message = errorData.error.message;
            }
        } catch {
            // Keep the default error message.
        }

        throw new Error(message);
    }

    return response.json();
}

export async function fetchEventById(eventId) {
    const encodedId = encodeURIComponent(eventId);

    const response = await fetch(
        `${API_BASE_URL}/events/${encodedId}`
    );

    if (!response.ok) {
        let message = "Não foi possível carregar os detalhes.";

        try {
            const errorData = await response.json();

            if (errorData?.error?.message) {
                message = errorData.error.message;
            }
        } catch {
            // Keep the default error message.
        }

        throw new Error(message);
    }

    return response.json();
}
