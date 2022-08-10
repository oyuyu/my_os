// const downloadImg = (url) => {
//   const a = document.createElement('a');
//   a.download = '图片';

//   const img = new Image();
//   img.src = url;
//   //  设置crossOrigin属性 解决图片跨域报错
//   img.setAttribute('crossOrigin', 'anonymous');
//   // 图片加载完立即执行
//   /**
//    * onload不会执行的情况
//    * 手机对上传的图片有大小限制 图片过大不会触发    解决:先将图片进行压缩
//    */
//   img.onload = () => {
//     a.href = imageToBase64(img);
//     a.click();
//   };
// };

// const imageToBase64 = (image) => {
//   const canvas = document.createElement('canvas');
//   const width = image.width;
//   const height = image.height;
//   canvas.width = width;
//   canvas.height = height;
//   canvas.getContext('2d')?.drawImage(image, 0, 0, width, height);

//   // 获取后缀名
//   const suffix = image.split('.').pop();

//   return canvas.toDataURL('image/' + suffix, 1);
// };

// // 4000172354837/65ucdx4l0X2viyxxX65tqjoija

export default () => {};
