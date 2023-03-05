import { component$, useBrowserVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import Swiper, { Autoplay } from "swiper";
import type { SwiperOptions } from "swiper";
interface ImageItems {
  src: string;
  alt: string;
}

const firstGrid: Array<ImageItems> = [
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677905872/dongwontuna/cloud_flower_b09xvx",
    alt: "cloudFlower",
  },
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677905873/dongwontuna/plant_d0nr8q",
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
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677909435/dongwontuna/treehoust_cbnk5d",
    alt: "treeCity",
  },
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677916854/dongwontuna/island_lqml8z",
    alt: "island",
  },
];
const thirdGrid: Array<ImageItems> = [
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677918031/dongwontuna/tree_wmrdwz",
    alt: "JapanTree",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677909576/dongwontuna/sunset_uwgbwi",
    alt: "sunset",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677917024/dongwontuna/papercut_uvceqh",
    alt: "paperCutBird",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677917529/dongwontuna/blondeMan_txwr0f",
    alt: "blondeMan",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677918257/dongwontuna/lovelyWoman_uz5qrc",
    alt: "LovelyWoman",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677918258/dongwontuna/structure_fdirbv.png",
    alt: "bigStructure",
  },
];
const fourthGrid: Array<ImageItems> = [
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677905873/dongwontuna/pastel_tree_deswod",
    alt: "pastel_tree",
  },
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677917529/dongwontuna/isfahan_pt0wpk",
    alt: "isfahan",
  },
];
const fifthGrid: Array<ImageItems> = [
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677905872/dongwontuna/cat_lczscz",
    alt: "cat",
  },
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677914893/dongwontuna/cat2_tuzvuz",
    alt: "cat2",
  },
  {
    src: "",
    alt: "",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677917529/dongwontuna/terminator_nhzwxs",
    alt: "terminator",
  },
  {
    src: "",
    alt: "",
  },
];
const sixthGrid: Array<ImageItems> = [
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677905872/dongwontuna/doggy_c4dlem",
    alt: "Doggy",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677905873/dongwontuna/reflect_ball_wgo0mh",
    alt: "reflect",
  },
  {
    src: "https://res.cloudinary.com/dfd9pdmuf/image/upload/w_640,f_auto/v1677909575/dongwontuna/man_clscxx",
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

  const nav = useNavigate();
  return (
    <div class="mainSite">
      <div class="textWrapper">
        <p>
          To be a World Class
          <br />
          Fullstack Engineer
        </p>
        <button
          onClick$={() => nav("/works/frontend")}
          class=" ml-10 mt-20 border-[1px] border-black p-5 rounded-[10px] text-2xl"
        >
          Check My Works
        </button>
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
                          loading="eager"
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          srcSet=""
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
                          loading="eager"
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          srcSet=""
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
                          loading="eager"
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          srcSet=""
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
                          loading="eager"
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          srcSet=""
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
                          loading="eager"
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          srcSet=""
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
                          loading="eager"
                          layout="fullWidth"
                          height={500}
                          style={{ height: "100%" }}
                          src={item.src}
                          srcSet=""
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
