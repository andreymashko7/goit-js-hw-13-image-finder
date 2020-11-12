import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { info, error } from '@pnotify/core';

function searchError() {
  error({
    text: 'Error no results found',
    delay: 1500,
  });
  loadMoreBtn.hide();
}

function emptyInput() {
  info({
    text: 'Please enter some search keyword',
    delay: 1500,
  });
}

export { emptyInput, searchError };
