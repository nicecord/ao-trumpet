import { writable } from 'svelte/store';
export function createPersistentStore<T>(key: string, initialValue: T) {
	const isLocalstorageAvaiable = typeof window !== 'undefined' && window['localStorage'];
	const storedValue = isLocalstorageAvaiable ? localStorage.getItem(key) : undefined;
	const initial = storedValue ? JSON.parse(storedValue) : initialValue;
	const store = writable<T>(initial);
	store.subscribe((value) => {
		if (isLocalstorageAvaiable) {
			localStorage.setItem(key, JSON.stringify(value));
		}
	});

	return store;
}
