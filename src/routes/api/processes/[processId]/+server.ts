// import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
export const GET: RequestHandler = ({ url, params }) => {
	console.log('srver', url, params);
	return new Response(JSON.stringify({ hello: 1 }));
};
