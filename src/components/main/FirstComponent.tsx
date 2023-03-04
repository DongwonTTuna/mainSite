import { component$, useBrowserVisibleTask$ } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";
import Swiper, { Autoplay } from "swiper";

const firstGrid: { [value: string]: string } = {};

export default component$(() => {
  useBrowserVisibleTask$(() => {
    Swiper.use([Autoplay]);
  });

  return (
    <div class="mainSite">
      <div class="textWrapper">
        <p>
          To be a World Class
          <br />
          Fullstack Engineer
        </p>
      </div>
      <div class="gridWrapper">
        <div class="firstItem">
          <Image
            layout="fullWidth"
            height={360}
            style={{ height: "100%" }}
            src="https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677905872/cloud_flower_b09xvx.png"
          />
        </div>
        <div class="secondItem"></div>
        <div class="thirdItem">
          <Image
            layout="fullWidth"
            height={1000}
            style={{ height: "100%" }}
            src="https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677905872/fall_tree_hndqqi.png"
          />
        </div>
        <div class="fourthItem"></div>
        <div class="fifthItem">
          <Image
            layout="fullWidth"
            height={430}
            style={{ height: "100%" }}
            src="https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677905872/cat_lczscz.png"
          />
        </div>
        <div class="sixthItem">
          <Image
            layout="fullWidth"
            height={560}
            style={{ height: "100%" }}
            src="https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677905872/doggy_c4dlem.png"
          />
        </div>
      </div>
    </div>
  );
});
