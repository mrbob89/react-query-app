export default async function fetchWithError(url, options) {
    const respoonse = await fetch(url, options);

    if (respoonse.status === 200) {
        const result = await respoonse.json();

        if (result.error) {
            throw new Error(result.error);
        }

        return result
    }

    throw new Error(`Error ${response.status}: ${response.statusText}`);
}