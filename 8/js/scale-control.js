const SCALE_STEP = 25;
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const onClickSmaller = () => {
  if (parseFloat(scaleControlValue.value) > 25) {
    scaleControlValue.value = `${parseFloat(scaleControlValue.value) - SCALE_STEP}%`;
    const dataToReduce = parseFloat(scaleControlValue.value) / 100;
    imgUploadPreview.style.transform = `scale(${dataToReduce})`;
  }
};

const onClickBigger = () => {
  if (parseFloat(scaleControlValue.value) < 100) {
    scaleControlValue.value = `${parseFloat(scaleControlValue.value) + SCALE_STEP}%`;
    const dataToIncrease = parseFloat(scaleControlValue.value) / 100;
    imgUploadPreview.style.transform = `scale(${dataToIncrease})`;
  }
};

export {onClickBigger, onClickSmaller};
