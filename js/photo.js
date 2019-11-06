'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var PREVIEW_HEIGHT = '70px';
  var PREVIEW_WIDTH = '70px';

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var accommodationFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var accommodationPreview = document.querySelector('.ad-form__photo');

  var fileUploadHandler = function (chosen, resulted) {
    var file = chosen.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        if (!resulted.querySelector('img')) {
          var newImg = document.createElement('img');
          newImg.style.width = PREVIEW_WIDTH;
          newImg.style.height = PREVIEW_HEIGHT;
          newImg.src = reader.result;

          resulted.appendChild(newImg);
        } else {
          resulted.querySelector('img').src = reader.result;
        }
      });

      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function () {
    fileUploadHandler(avatarChooser, avatarPreview);
  });

  accommodationFileChooser.addEventListener('change', function () {
    fileUploadHandler(accommodationFileChooser, accommodationPreview);
  });
})();
