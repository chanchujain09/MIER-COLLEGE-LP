/**
 * Google Picker and GSI (Google Identity Services) Utility
 * Supports dynamic script loading, OAuth token retrieval, and multi-format document picking.
 */

let gapiLoaded = false;
let gsiLoaded = false;

/**
 * Dynamically injects Google API scripts and resolves when fully loaded and initialized.
 */
export function loadGoogleScripts(onLoaded: () => void, onError: (err: string) => void) {
  if (gapiLoaded && gsiLoaded) {
    onLoaded();
    return;
  }

  let errorOccurred = false;
  const triggerError = (msg: string) => {
    if (!errorOccurred) {
      errorOccurred = true;
      onError(msg);
    }
  };

  const checkLoaded = () => {
    if (gapiLoaded && gsiLoaded) {
      onLoaded();
    }
  };

  // Load old-school Google API loader (GAPI) and request Picker module
  if (!gapiLoaded) {
    const existingGapi = document.getElementById('google-api-script');
    if (existingGapi) {
      // Already injected, wait for callback
    } else {
      const script = document.createElement('script');
      script.id = 'google-api-script';
      script.src = 'https://apis.google.com/js/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        try {
          // @ts-ignore
          if (window.gapi) {
            // @ts-ignore
            window.gapi.load('picker', {
              callback: () => {
                gapiLoaded = true;
                checkLoaded();
              },
              onerror: () => triggerError('Failed to load Google Picker module via gapi.load()'),
              timeout: 10000,
            });
          } else {
            triggerError('gapi loaded, but window.gapi is undefined');
          }
        } catch (e: any) {
          triggerError(e.message || 'Error occurred starting GAPI client');
        }
      };
      script.onerror = () => triggerError('Network request to apis.google.com/js/api.js failed');
      document.body.appendChild(script);
    }
  } else {
    checkLoaded();
  }

  // Load new-school Google Identity Services library (GSI)
  if (!gsiLoaded) {
    const existingGsi = document.getElementById('google-gsi-script');
    if (existingGsi) {
      // Already injected
    } else {
      const script = document.createElement('script');
      script.id = 'google-gsi-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        gsiLoaded = true;
        checkLoaded();
      };
      script.onerror = () => triggerError('Network request to accounts.google.com/gsi/client failed');
      document.body.appendChild(script);
    }
  } else {
    checkLoaded();
  }
}

/**
 * Uses Google Identity Services to request an access token containing Google Drive scope permissions.
 */
export function requestGoogleAccessToken(
  clientId: string,
  callback: (token: string, error?: string) => void
) {
  // @ts-ignore
  if (!window.google || !window.google.accounts || !window.google.accounts.oauth2) {
    callback('', 'Google Identity Services script is not initialized yet.');
    return;
  }

  try {
    // @ts-ignore
    const client = window.google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.metadata.readonly',
      callback: (response: any) => {
        if (response.error) {
          callback('', response.error_description || response.error);
        } else if (response.access_token) {
          callback(response.access_token);
        } else {
          callback('', 'No authorization token returned.');
        }
      },
    });
    
    // Explicitly ask for consent to show the popup permissions form
    client.requestAccessToken({ prompt: 'consent' });
  } catch (err: any) {
    console.error('GIS Authorize Exception:', err);
    callback('', err.message || 'Authorization failed.');
  }
}

/**
 * Launches the official Google Picker UI overlay with customized file filter scopes
 */
export function showGooglePicker(
  accessToken: string,
  onSelected: (file: any) => void,
  onCancel?: () => void
) {
  // @ts-ignore
  if (!window.google || !window.google.picker) {
    console.error('Picker script not loaded');
    return;
  }

  // Resolve best origin string for preview iframe environment
  const pickerOrigin =
    // @ts-ignore
    window.location.ancestorOrigins && window.location.ancestorOrigins.length > 0
      // @ts-ignore
      ? window.location.ancestorOrigins[window.location.ancestorOrigins.length - 1]
      : window.location.origin;

  try {
    // @ts-ignore
    const docsView = new window.google.picker.DocsView(window.google.picker.ViewId.DOCS);
    // Allow users to submit PDFs, standard educational images, or text spreadsheets/documents
    docsView.setMimeTypes(
      'application/pdf,image/*,application/vnd.google-apps.document,application/vnd.google-apps.spreadsheet,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    // @ts-ignore
    const picker = new window.google.picker.PickerBuilder()
      // @ts-ignore
      .addView(docsView)
      .setOAuthToken(accessToken)
      .setCallback((data: any) => {
        // @ts-ignore
        if (data.action === window.google.picker.Action.PICKED) {
          const file = data.docs[0];
          onSelected({
            id: file.id,
            name: file.name,
            mimeType: file.mimeType,
            url: file.url || `https://drive.google.com/file/d/${file.id}/view`,
            sizeBytes: file.sizeBytes || null,
            iconUrl: file.iconUrl || '',
          });
          // @ts-ignore
        } else if (data.action === window.google.picker.Action.CANCEL) {
          if (onCancel) onCancel();
        }
      })
      .setOrigin(pickerOrigin)
      .build();

    picker.setVisible(true);
  } catch (err) {
    console.error('Error creating Google Picker:', err);
  }
}
