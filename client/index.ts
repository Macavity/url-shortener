type TMethod = 'POST' | 'GET';

const apiUrl = 'http://localhost:3000';

function apiClient(
  method: TMethod,
  endpoint: string,
  body: unknown = null,
): Promise<IShortUrl | ErrorResponse> {
  const headers = { 'Content-Type': 'application/json' };
  const config = {
    method,
    headers,
  } as RequestInit;

  if (body) {
    config.body = JSON.stringify(body);
  }

  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.ok) {
        return await response.json();
      } else {
        const errorData = await response.json();

        return Promise.reject({
          statusCode: errorData.statusCode,
          message: errorData.message,
        });
      }
    });
}

async function callEncode(original: string) {
  return apiClient('POST', 'short-url/encode', {
    original,
  });
}

const submitButton = document.getElementById('submitButton');
const errorWrapper = document.getElementById('errorWrapper');
const successWrapper = document.getElementById('successWrapper');
const shortUrlResult = document.getElementById(
  'shortUrlResult',
) as HTMLAnchorElement;

if (submitButton) {
  submitButton.addEventListener('click', async () => {
    errorWrapper.style.display = 'none';
    successWrapper.style.display = 'none';

    const inputUrl = document.getElementById('originalUrl') as HTMLInputElement;

    callEncode(inputUrl.value)
      .then((shortUrl: IShortUrl) => {
        shortUrlResult.innerText = shortUrl.short;
        shortUrlResult.href = shortUrl.short;
        successWrapper.style.display = 'block';
      })
      .catch((error: ErrorResponse) => {
        console.error(error);
        errorWrapper.innerText = Array.isArray(error.message)
          ? error.message.join('<br>')
          : error.message;
        errorWrapper.style.display = 'block';
      });
  });
}
