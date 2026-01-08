const COMPANY_ID = "URdGUj"; // e.g. "VrkyU9"
const KLAVIYO_EVENT_NAME = "Loaded Shopify Localization - MM";
const KLAVIYO_REVISION = "2025-10-15";

function safeAtob(value) {
	try {
		return atob(value);
	} catch (_) {
		return null;
	}
}

async function getKxFromSessionStorage() {
	const encoded = await browser.sessionStorage.getItem("_kx");
	if (!encoded) return null;

	const decoded = safeAtob(encoded);
	if (!decoded || !decoded.includes(".")) return null;

	return decoded;
}

async function getKxFromKlaIdCookie() {
	const raw = await browser.cookie.get("__kla_id");
	if (!raw) return null;

	const decoded = safeAtob(raw);
	if (!decoded) return null;

	try {
		const parsed = JSON.parse(decoded);
		const exchangeId = parsed?.$exchange_id;
		return exchangeId || null;
	} catch (_) {
		return null;
	}
}

async function getKlaviyoKx() {
	return (await getKxFromSessionStorage()) || (await getKxFromKlaIdCookie());
}

function buildKlaviyoPayload(kx, properties) {
	return {
		data: {
			type: "event",
			attributes: {
				metric: {
					data: {
						type: "metric",
						attributes: { name: KLAVIYO_EVENT_NAME },
					},
				},
				profile: {
					data: {
						type: "profile",
						attributes: { _kx: kx },
					},
				},
				properties,
			},
		},
	};
}

async function postToKlaviyo(payload) {
	const endpoint = `https://a.klaviyo.com/client/events/?company_id=${encodeURIComponent(COMPANY_ID)}`;

	return fetch(endpoint, {
		method: "POST",
		keepalive: true,
		headers: {
			accept: "application/vnd.api+json",
			"content-type": "application/vnd.api+json",
			revision: KLAVIYO_REVISION,
			"X-Klaviyo-API-Source": "shopify-custom-pixel",
			"X-Klaviyo-User-Agent": "mm-shopify-custom-pixel",
		},
		body: JSON.stringify(payload),
	});
}

analytics.subscribe("mm:shopify_localization_loaded", async (event) => {
	try {
		const properties = event && event.customData && typeof event.customData === "object" ? event.customData : {};

		const kx = await getKlaviyoKx();
		if (!kx) return;

		const payload = buildKlaviyoPayload(kx, properties);
		await postToKlaviyo(payload);
	} catch (_) {
		// keep silent in production; add console.error if debugging
	}
});
