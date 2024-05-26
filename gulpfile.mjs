import pkg from "gulp";
const { src, dest, series } = pkg;
import webp from "gulp-sharp-optimize-images";
// import clean from "gulp-clean";

function imgTask() {
  return src("img/**/*")
    .pipe(
      webp({
        webp: {
          quality: 80,
          lossless: false,
        },
      })
    )
    .pipe(dest("public/images"));
}
export const compressImage = series(imgTask);
export default series(compressImage);
