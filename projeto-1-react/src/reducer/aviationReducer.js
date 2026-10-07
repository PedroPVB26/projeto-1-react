export const initialState = {
    filters: {
        family: "",
        operator: "",
        fatal: false
    },

    events: [],

    loading: false,
    error: null,

    selectedEvent: null,
    detailLoading: false,
    detailError: null,

    nextCursor: null
};

export function aviationReducer(state, action) {
    switch (action.type) {
        case "SET_FILTER": {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    [action.field]: action.value
                }
            };
        }

        case "FETCH_START": {
            return {
                ...state,
                loading: true,
                error: null,
                events: action.append ? state.events : []
            };
        }

        case "FETCH_SUCCESS": {
            return {
                ...state,
                loading: false,
                error: null,
                events: action.append
                    ? [...state.events, ...action.payload.data]
                    : action.payload.data,
                nextCursor: action.payload.next_cursor ?? null
            };
        }

        case "FETCH_ERROR": {
            return {
                ...state,
                loading: false,
                error: action.error,
                nextCursor: null
            };
        }

        case "DETAIL_START": {
            return {
                ...state,
                selectedEvent: null,
                detailLoading: true,
                detailError: null
            };
        }

        case "DETAIL_SUCCESS": {
            return {
                ...state,
                selectedEvent: action.payload,
                detailLoading: false,
                detailError: null
            };
        }

        case "DETAIL_ERROR": {
            return {
                ...state,
                detailLoading: false,
                detailError: action.error
            };
        }

        case "CLOSE_DETAILS": {
            return {
                ...state,
                selectedEvent: null,
                detailError: null
            };
        }

        default:
            throw new Error(`Unknown action: ${action.type}`);
    }
}