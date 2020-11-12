import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

function onOpenModal(evt) {
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  const bigImageShow = `<img src= ${evt.target.dataset.source}>`;
  const instance = basicLightbox.create(bigImageShow);
  instance.show();
}

export { onOpenModal };
