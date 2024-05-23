import type { PageLoad } from './$types';
export const load: PageLoad = async ({ fetch, params }) => {
	const response = await fetch(`/api/processes/${params.processId}`);
	const data = await response.json();
	return data;
};
