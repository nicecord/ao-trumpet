<script ts="lang">
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
</script>

<h1>wallet</h1>
<button on:click={handleGenerateWallet}> generate a new wallet</button>
