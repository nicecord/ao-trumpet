<script lang="ts">
	import { goto } from '$app/navigation';
	import { jwkToAddress } from '$lib/wallet';
	import { wallets } from '$lib/stores/wallet';
	let readJsonWalletOk = true;

	async function handleGenerateWallet() {
		const response = await fetch('/api/wallets/generations', {
			method: 'post'
		});

		if (!response.ok) {
			console.log('something is going wrong');
			return;
		}

		const wallet = await response.json();
		const blob = new Blob([JSON.stringify(wallet)], { type: 'text/json' });
		const url = URL.createObjectURL(blob);

		// Create a link element
		const link = document.createElement('a');
		link.href = url;

		// Set the file name for the download
		link.setAttribute('download', 'aos.json');

		// Trigger a click event on the link to initiate the download
		document.body.appendChild(link);
		link.click();

		// Cleanup: remove the link and revoke the URL
		document.body.removeChild(link);
		URL.revokeObjectURL(url);
	}

	async function handleUseWalletFile(event: Event) {
		readJsonWalletOk = true;
		const input = event.target as HTMLInputElement;
		const file = input?.files?.[0];

		if (file) {
			const reader = new FileReader();
			reader.onload = async (event) => {
				const contents = event.target?.result as string;
				try {
					const walletJwt = JSON.parse(contents);
					const address = await jwkToAddress(walletJwt);
					if (!$wallets.find((w) => w.address === address)) {
						$wallets = [
							...$wallets,
							{ address, type: 'jwt', nickname: address, active: false, content: walletJwt }
						];
					}
					goto(`/wallets/${address}/configure`);
				} catch (e) {
					readJsonWalletOk = false;
					console.error('fail to read json wallet', e);
				}
			};

			reader.readAsText(file);
		}
	}
</script>

<h1>wallet</h1>
<button on:click={handleGenerateWallet}> generate a new wallet</button>
<label class="border border-gray-300" for="walletInput"> upload json wallet</label>
{#if !readJsonWalletOk}
	<p>fail to read json wallet</p>
{/if}
<input hidden on:change={handleUseWalletFile} type="file" id="walletInput" accept=".json" />
