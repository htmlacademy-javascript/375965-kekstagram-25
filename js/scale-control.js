import { clip } from './util.js';

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const scaleControlValueElement = document.querySelector('.scale__control--value');

const updatePreviewScale = (delta) => {
  const imgUploadPreviewElement = document.querySelector('.img-upload__preview img');
  const newScale = clip(parseInt(scaleControlValueElement.value, 10) + delta, SCALE_MIN, SCALE_MAX);
  scaleControlValueElement.value = `${newScale}%`;
  const dataToReduce = newScale / 100.0;
  imgUploadPreviewElement.style.transform = `scale(${dataToReduce})`;
};

const onClickSmaller = () => updatePreviewScale(-SCALE_STEP);
const onClickBigger = () => updatePreviewScale(SCALE_STEP);

export {onClickBigger, onClickSmaller};
