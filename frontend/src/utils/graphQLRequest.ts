import {API_BACKEND_URL} from "../constants/constants.ts";

export async function graphQLRequest(query: string, variables?: Record<string, any>) {
    const response = await fetch(`${API_BACKEND_URL}/graphql`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({query, variables}),
    });

    const result = await response.json();

    if (result.errors) {
        throw new Error(result.errors.map((err: { message: any; }) => err.message).join(', '));
    }

    return result.data;
}