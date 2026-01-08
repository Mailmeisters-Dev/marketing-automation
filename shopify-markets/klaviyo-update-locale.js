import { Profiles } from 'klaviyo'

export const handler = async (event, profile, context) => {
  try {
    const profileId = profile?.data?.id;
    const eventProps = event?.data?.attributes?.event_properties || {};
    const customerLocale = eventProps['Customer Locale']; // e.g. 'de-DE'

    if (!profileId || !customerLocale) {
      console.log('Missing profile ID or Customer Locale');
      return;
    }

    const language = customerLocale.split('-')[0].toUpperCase(); // e.g. 'DE' from 'de-DE'
    const country = customerLocale.split('-')[1].toUpperCase(); // e.g. 'DE' from 'de-DE'

    const propsToUpdate = {
      'Config - Detected Language': language,
      'Config - Detected Country': country,
      'Config - Detected Locale': customerLocale
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
    console.log(`Updated profile ${profileId} with locale info:\n`, propsToUpdate);
  } catch (err) {
    console.error('Error updating Klaviyo profile:', err);
  }
};