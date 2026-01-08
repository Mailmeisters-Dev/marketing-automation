import { Profiles } from 'klaviyo';

export const handler = async (event, profile, context) => {
  try {
    const profileId = profile?.data?.id;
    const eventProps = event?.data?.attributes?.event_properties || {};

    // Use the Localization object from event properties
    const loc = eventProps.Localization || {};

    const rawLanguage = loc.language; // e.g. "en"
    const rawCountry = loc.country;   // e.g. "US"
    const rawCurrency = loc.currency; // e.g. "EUR"

    if (!profileId) {
      console.log('Missing profile ID');
      return;
    }

    if (!rawLanguage || !rawCountry || !rawCurrency) {
      console.log('Missing required Localization fields', {
        language: rawLanguage,
        country: rawCountry,
        currency: rawCurrency
      });
      return;
    }

    const language = String(rawLanguage).trim().toUpperCase(); // "EN"
    const country = String(rawCountry).trim().toUpperCase();   // "US"
    const currency = String(rawCurrency).trim().toUpperCase(); // "EUR"
    const locale = `${language.toLowerCase()}-${country}`;     // "en-US"

    const propsToUpdate = {
      'Config - Detected Language': language,
      'Config - Detected Country': country,
      'Config - Detected Currency': currency,
      'Config - Detected Locale': locale
    };

    const updateBody = {
      data: {
        type: 'profile',
        id: profileId,
        attributes: {
          properties: propsToUpdate
        }
      }
    };

    await Profiles.updateProfile(profileId, updateBody);
    console.log(`Updated profile ${profileId} with detected localization:\n`, propsToUpdate);
  } catch (err) {
    console.error('Error updating Klaviyo profile:', err);
  }
};