window.addEventListener('load', () => {
  (function() {
    const fileUpload = document.querySelector('#hs-file-upload-to-destroy');
    const destroy = document.querySelector('#hs-destroy-file-upload');
    const autoInit = document.querySelector('#hs-auto-init-file-upload');

    destroy.addEventListener('click', () => {
      const {element} = HSFileUpload.getInstance(fileUpload, true);

      element.destroy();

      destroy.setAttribute('disabled', 'disabled');
      autoInit.removeAttribute('disabled');
    });

    autoInit.addEventListener('click', () => {
      HSFileUpload.autoInit();

      autoInit.setAttribute('disabled', 'disabled');
      destroy.removeAttribute('disabled');
    });
  })();
});