import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
const Header = component$(() => {
  return (
    <>
      <header class="header">
        <Link href="/">
          <div class="logodiv">
            <Image
              layout="constrained"
              width={200}
              height={200}
              src="https://res.cloudinary.com/dfd9pdmuf/image/upload/w_512,f_auto/v1677865569/dongwontuna/TunaCompress_bmaa13"
              srcSet=""
              alt="TunaLogo"
            />
          </div>
        </Link>
        <div class="menu">
          <Link href="/works/frontend">
            <div class="item">Works</div>
          </Link>
          <Link href="/skills/staticLang">
            <div class="item">Skills</div>
          </Link>
          <Link href="/dreams">
            <div class="item">Dreams</div>
          </Link>
        </div>
        <div class="personalLinks">
          <Link target="_blank" href="https://www.instagram.com/higasihara_/">
            <div class="item">
              <Image
                layout="constrained"
                width={50}
                height={50}
                src="https://res.cloudinary.com/dfd9pdmuf/image/upload/w_50,f_auto/v1677865766/dongwontuna/instagram_bhtla1"
                srcSet=""
                alt="InstagramLink"
              />
            </div>
          </Link>
          <Link target="_blank" href="https://github.com/DongwonTTuna">
            <div class="item">
              <Image
                layout="constrained"
                width={50}
                height={50}
                src="https://res.cloudinary.com/dfd9pdmuf/image/upload/w_50,f_auto/v1677865766/dongwontuna/github_ierqcd"
                srcSet=""
                alt="GithubLink"
              />
            </div>
          </Link>
          <Link target="_blank" href="https://t.me/DongwonTTuna">
            <div class="item">
              <Image
                layout="constrained"
                width={50}
                height={50}
                src="https://res.cloudinary.com/dfd9pdmuf/image/upload/w_50,f_auto/v1677865767/dongwontuna/telegram_whkmrc"
                srcSet=""
                alt="TelegramLink"
              />
            </div>
          </Link>
        </div>
      </header>
    </>
  );
});

export default Header;
