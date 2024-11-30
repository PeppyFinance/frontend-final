import { CharacterModal } from "components/BackAlley/Characters/Modal";
import { Character } from "components/BackAlley/Characters/character";
import { BackAlleyChars } from "components/BackAlley/Characters/characterConfig";
import { CharacterId } from "components/BackAlley/Characters/characterIds.type";
import { useMediaQuery } from "hooks/useMediaQuery";
import styled from "styled-components";
import { NavigationArrow } from "./Arrow";
import { useCharacterContext } from "./characterContext";

// import Swiper core and required modules
import SwiperCore from "swiper";
import { Pagination, Parallax } from "swiper/modules";
import {
  Swiper,
  SwiperSlide,
  SwiperSlide as SwiperSlideImport,
} from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { charBackAlley1 } from "./Characters/characterConfig/charBackAlley1";
import { charBackAlley2 } from "./Characters/characterConfig/charBackAlley2";
import { charBackAlley3 } from "./Characters/characterConfig/charBackAlley3";

SwiperCore.use([Parallax, Pagination]);

const BackAlleyContainer = styled.div`
  position: relative;
  display: flex;
  bottom: auto;
  background-image: url("/images/backgrounds/backalley.webp");
  background-size: cover;
  min-height: calc(100vh - 60px);
  background-position: center bottom;
  border: none;
`;

const SliderBackground = styled.div<{ backgroundImage: string }>`
  position: relative;
  background-image: url(${(props) => props.backgroundImage});
  background-size: 2560px;
  background-position: center bottom;
  left: -300px;
  width: 1800px;
  height: 100%;
  overflow: hidden;
`;

const SwiperContainer = styled(Swiper)`
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
  bottom: auto;
`;

const SwiperSlide = styled(SwiperSlideImport)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
`;

export const BackAlley = () => {
  const { characterState, characterDispatch } = useCharacterContext();
  const isDesktop = useMediaQuery("(min-width: 600px)");
  const onClickCharacter = (characterId: CharacterId) => {
    characterDispatch({
      type: "SET_ACTIVE",
      characterId,
    });
  };

  if (isDesktop) {
    return (
      <BackAlleyContainer>
        <CharacterModal />
        {BackAlleyChars.map((props) => (
          <Character
            key={props.id}
            onClick={onClickCharacter}
            isActive={props.id === characterState.character?.id}
            {...props}
          />
        ))}
        <NavigationArrow
          href="/clubentrance"
          display={!characterState.character}
        />
      </BackAlleyContainer>
    );
  }
  return (
    <>
      <SwiperContainer slidesPerView={1} onSlideChange={() => null} parallax>
        <SliderBackground
          backgroundImage="/images/backgrounds/backalley.webp"
          slot="container-start"
          data-swiper-parallax="-45%"
        >
          <CharacterModal />
          <SwiperSlide>
            <Character
              onClick={onClickCharacter}
              isActive={characterState.character?.id === "charBackAlley1"}
              {...charBackAlley1}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Character
              onClick={onClickCharacter}
              isActive={characterState.character?.id === "charBackAlley2"}
              {...charBackAlley2}
            />
          </SwiperSlide>
          <SwiperSlide>
            <Character
              onClick={onClickCharacter}
              isActive={characterState.character?.id === "charBackAlley3"}
              {...charBackAlley3}
            />
          </SwiperSlide>
        </SliderBackground>
      </SwiperContainer>
    </>
  );
};
