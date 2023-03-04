import { component$, useBrowserVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import Swiper, { Autoplay } from "swiper";
import type { SwiperOptions } from "swiper";
interface ImageItems {
  src: string;
  alt: string;
}

const firstGrid: Array<ImageItems> = [
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677905872/cloud_flower_b09xvx.png",
    alt: "cloudFlower",
  },
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677905873/plant_d0nr8q.png",
    alt: "plant",
  },
  {
    src: "",
    alt: "",
  },
];
const secondGrid: Array<ImageItems> = [
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677909435/treehoust_cbnk5d.png",
    alt: "treeCity",
  },
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677916854/island_lqml8z.png",
    alt: "island",
  },
];
const thirdGrid: Array<ImageItems> = [
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677918031/tree_wmrdwz.png",
    alt: "JapanTree",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677909576/sunset_uwgbwi.png",
    alt: "sunset",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677917024/papercut_uvceqh.png",
    alt: "paperCutBird",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677917529/blondeMan_txwr0f.png",
    alt: "blondeMan",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677918257/lovelyWoman_uz5qrc.png",
    alt: "LovelyWoman"
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677918258/structure_fdirbv.png",
    alt:"bigStructure"
  }
];
const fourthGrid: Array<ImageItems> = [
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677905873/pastel_tree_deswod.png",
    alt: "pastel_tree",
  },
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677917529/isfahan_pt0wpk.png",
    alt: "isfahan",
  },
];
const fifthGrid: Array<ImageItems> = [
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677905872/cat_lczscz.png",
    alt: "cat",
  },
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677914893/cat2_tuzvuz.png",
    alt: "cat2",
  },
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677917529/terminator_nhzwxs.png",
    alt: "terminator",
  },
  {
    src: "",
    alt: "",
  },
];
const sixthGrid: Array<ImageItems> = [
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677905872/doggy_c4dlem.png",
    alt: "Doggy",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677905873/reflect_ball_wgo0mh.png",
    alt: "reflect",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/v1677909575/man_clscxx.png",
    alt: "man",
  },
];
export default component$(() => {
  useBrowserVisibleTask$(() => {
    const SwiperOptions: SwiperOptions = {
      direction: "vertical",
      slidesPerView: 1,
      navigation: false,
      autoplay: { delay: 4000, disableOnInteraction: false },
      simulateTouch: false,
      loop: true,
    };
    Swiper.use([Autoplay]);
    new Swiper(".swiper", SwiperOptions);
  });

  return (
    <div class="mainSite">
      <div class="textWrapper">
        <p>
          To be a World Class
          <br />
          Fullstack Engineer
        </p>
        <Link
          class="ml-[60px] block mt-10 cursor-pointer"
          href="/works/frontend"
        >
          <button class="border-[1px] border-black p-5 rounded-[10px] text-2xl">
            Check My Works
          </button>
        </Link>
      </div>
      <div class="gridWrapper">
        <div class="firstItem container">
          <div class="swiper h-full">
            <div class="swiper-wrapper">
              {firstGrid.map((item: ImageItems, index) => {
                return (
                  <>
                    {item.src === "" ? (
                      <div class="swiper-slide"></div>
                    ) : (
                      <div class="swiper-slide" key={`frsl${index}`}>
                        <Image
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          alt={item.alt}
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div class="secondItem container">
          <div class="swiper h-full">
            <div class="swiper-wrapper">
              {secondGrid.map((item: ImageItems, index) => {
                return (
                  <>
                    {item.src === "" ? (
                      <div class="swiper-slide"></div>
                    ) : (
                      <div class="swiper-slide" key={`frsl${index}`}>
                        <Image
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          alt={item.alt}
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div class="thirdItem container">
          <div class="swiper h-full">
            <div class="swiper-wrapper">
              {thirdGrid.map((item: ImageItems, index) => {
                return (
                  <>
                    {item.src === "" ? (
                      <div class="swiper-slide"></div>
                    ) : (
                      <div class="swiper-slide" key={`frsl${index}`}>
                        <Image
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          alt={item.alt}
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div class="fourthItem container">
          <div class="swiper h-full">
            <div class="swiper-wrapper">
              {fourthGrid.map((item: ImageItems, index) => {
                return (
                  <>
                    {item.src === "" ? (
                      <div class="swiper-slide"></div>
                    ) : (
                      <div class="swiper-slide" key={`frsl${index}`}>
                        <Image
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          alt={item.alt}
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div class="fifthItem container">
          <div class="swiper h-full">
            <div class="swiper-wrapper">
              {fifthGrid.map((item: ImageItems, index) => {
                return (
                  <>
                    {item.src === "" ? (
                      <div class="swiper-slide"></div>
                    ) : (
                      <div class="swiper-slide" key={`frsl${index}`}>
                        <Image
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          alt={item.alt}
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div class="sixthItem container">
          <div class="swiper h-full">
            <div class="swiper-wrapper">
              {sixthGrid.map((item: ImageItems, index) => {
                return (
                  <>
                    {item.src === "" ? (
                      <div class="swiper-slide"></div>
                    ) : (
                      <div class="swiper-slide" key={`frsl${index}`}>
                        <Image
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          alt={item.alt}
                        />
                      </div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
