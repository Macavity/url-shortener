import { ApiService } from './api.service';

const submitButton = document.getElementById('submitButton');

if (submitButton) {
  submitButton.addEventListener('click', async () => {
    const inputUrl = document.getElementById('originalUrl');
    const shortUrl = await ApiService.callEncode(
      inputUrl.getAttribute('value'),
    );
    console.log({ shortUrl });
  });
}
