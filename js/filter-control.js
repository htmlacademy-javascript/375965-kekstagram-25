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

const EFFECT_CHROME = 'chrome';
const EFFECT_SEPIA = 'sepia';
const EFFECT_MARVIN = 'marvin';
const EFFECT_PHOBOS = 'phobos';
const EFFECT_HEAT = 'heat';
const EFFECT_NONE = 'none';

const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const effectsContainerElement = document.querySelector('.effects__list');
const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
const effectLevelValueInputElement = document.querySelector('.effect-level__value');

const arrayOfFilterClass = [
  'effects__preview--chrome',
  'effects__preview--sepia',
  'effects__preview--marvin',
  'effects__preview--heat',
  'effects__preview--phobos',
  'effects__preview--none',
];

const filterParams = {
  [EFFECT_CHROME]: {
    'filterName': 'grayscale',
    'filterParameter': CHROME_EFFECT,
  },
  [EFFECT_SEPIA]: {
    'filterName': 'sepia',
    'filterParameter': SEPIA_EFFECT,
  },
  [EFFECT_MARVIN]:
    {
      'filterName': 'invert',
      'filterParameter': MARVIN_EFFECT,
    },
  [EFFECT_PHOBOS]:
    {
      'filterName': 'blur',
      'filterParameter': BLUR_EFFECT,
    },
  [EFFECT_HEAT]:
    {
      'filterName': 'brightness',
      'filterParameter': BRIGHTNESS_EFFECT,
    },
};

let currentFilter = EFFECT_NONE;

const onRadioChange = () => {

  effectsContainerElement.addEventListener('change', (evt) => {
    currentFilter = evt.target.closest('input[type=radio]').value;
    for (let i = 0; i < arrayOfFilterClass.length; i++) {
      imgUploadPreviewElement.classList.remove(arrayOfFilterClass[i]);
    }
    imgUploadPreviewElement.classList.add(`effects__preview--${currentFilter}`);
    if (evt.target.classList.contains('effects__radio') && currentFilter !== EFFECT_NONE) {
      effectLevelSliderElement.style = 'display: block';
      effectLevelSliderElement.noUiSlider.updateOptions(filterParams[currentFilter]['filterParameter']);
    } else {
      effectLevelSliderElement.style = 'display: none';
      imgUploadPreviewElement.style = 'effect: none';
    }
  });
};

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: 1,
    max: 3,
  },
  start: 3,
  step: 0.1,
  connect: 'lower',
});

effectLevelSliderElement.noUiSlider.on('update', () => {
  if (currentFilter !== EFFECT_NONE) {
    imgUploadPreviewElement.style.filter = `${filterParams[currentFilter]['filterName']}(${effectLevelSliderElement.noUiSlider.get()})`;
    effectLevelValueInputElement.value = parseFloat(effectLevelSliderElement.noUiSlider.get());
  }
});

const resetFilter = () => {
  effectLevelSliderElement.style = 'display: none';
  imgUploadPreviewElement.style = 'effect: none';
  effectLevelSliderElement.noUiSlider.set(0);
};

export { onRadioChange, resetFilter };
