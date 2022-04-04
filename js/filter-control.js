const CHROME_EFFECT = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return value;
    }
  }
};

const SEPIA_EFFECT = {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return value;
    }
  }
};

const MARVIN_EFFECT = {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  format: {
    to: function (value) {
      return `${value}%`;
    },
    from: function (value) {
      return value;
    }
  }
};

const BLUR_EFFECT = {
  range: {
    min: 0,
    max: 3,
  },
  start: 3,
  step: 0.1,
  format: {
    to: function (value) {
      return `${value.toFixed(1)}px`;
    },
    from: function (value) {
      return value;
    }
  }
};

const BRIGHTNESS_EFFECT = {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return value;
    }
  }
};


const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelValue = document.querySelector('.effect-level__value');

const arrayOfFilterClass = [
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--heat',
  'effects__preview--phobos',
  'effects__preview--none',
];

const filterParams = {
  'chrome': {
    'filterName': 'grayscale',
    'filterParameter': CHROME_EFFECT,
  },
  'sepia': {
    'filterName': 'sepia',
    'filterParameter': SEPIA_EFFECT,
  },

  'marvin':
    {
      'filterName': 'invert',
      'filterParameter': MARVIN_EFFECT,
    },
  'phobos':
    {
      'filterName': 'blur',
      'filterParameter': BLUR_EFFECT,
    },
  'heat':
    {
      'filterName': 'brightness',
      'filterParameter': BRIGHTNESS_EFFECT,
    },
};

let currentFilter = 'none';

const onRadioChange = () => {

  effectsList.addEventListener('change', (evt) => {
    currentFilter = evt.target.closest('input[type=radio]').value;
    for (let i = 0; i < arrayOfFilterClass.length; i++) {
      imgUploadPreview.classList.remove(arrayOfFilterClass[i]);
    }
    imgUploadPreview.classList.add(`effects__preview--${currentFilter}`);
    if (evt.target.classList.contains('effects__radio') && currentFilter !== 'none') {
      effectLevelSlider.style = 'display: block';
      effectLevelSlider.noUiSlider.updateOptions(filterParams[currentFilter]['filterParameter']);
    } else {
      effectLevelSlider.style = 'display: none';
      imgUploadPreview.style = 'effect: none';
    }
  });
};

noUiSlider.create(effectLevelSlider, {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
});

effectLevelSlider.noUiSlider.on('update', () => {
  if (currentFilter !== 'none') {
    imgUploadPreview.style.filter = `${filterParams[currentFilter]['filterName']}(${effectLevelSlider.noUiSlider.get()})`;
    effectLevelValue.value = parseFloat(effectLevelSlider.noUiSlider.get());
  }
});

export { onRadioChange };
