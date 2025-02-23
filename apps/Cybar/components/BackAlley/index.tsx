import { CharacterModal } from "components/BackAlley/Characters/Modal";
import { Character } from "components/BackAlley/Characters/character";
import { BackAlleyChars } from "components/BackAlley/Characters/characterConfig";
import { CharacterId } from "components/BackAlley/Characters/characterIds.type";
import { useMediaQuery } from "hooks/useMediaQuery";
import styled from "styled-components";
import { NavigationArrow } from "./Arrow";
import { charBackAlley1 } from "./Characters/characterConfig/charBackAlley1";
import { charBackAlley2 } from "./Characters/characterConfig/charBackAlley2";
import { charBackAlley3 } from "./Characters/characterConfig/charBackAlley3";
import { useCharacterContext } from "./characterContext";

// import Swiper core and required modules
import { Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide as SwiperSlideImport } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

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
  height: 100%;
  background-image: url(${(props) => props.backgroundImage});
  background-size: 2560px;
  position: absolute;
  left: -300px;
  top: 0;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center;
  background-position: center bottom;
  width: 1800px;
  overflow: hidden;
`;

const SwiperContainer = styled(Swiper)`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
  bottom: auto;
`;

// TODO: is flex needed?
const SwiperSlide = styled(SwiperSlideImport)`
  display: flex;
  width: 100vw;
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
      <SwiperContainer
        initialSlide={1}
        modules={[Pagination, Parallax]}
        slidesPerView={1}
        onSlideChange={() => null}
        parallax
      >
        <CharacterModal />
        <SliderBackground
          data-swiper-parallax-x="-45%"
          slot="container-start"
          backgroundImage="/images/backgrounds/backalley.webp"
        />
        <SwiperSlide>
          <Character
            onClick={onClickCharacter}
            isActive={characterState.character?.id === "charBackAlley1"}
            {...charBackAlley1}
            {...charBackAlley1.mobilePositions}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Character
            onClick={onClickCharacter}
            isActive={characterState.character?.id === "charBackAlley2"}
            {...charBackAlley2}
            {...charBackAlley2.mobilePositions}
          />
        </SwiperSlide>
        <SwiperSlide>
          <Character
            onClick={onClickCharacter}
            isActive={characterState.character?.id === "charBackAlley3"}
            {...charBackAlley3}
            {...charBackAlley3.mobilePositions}
          />
          <NavigationArrow
            isDesktop={false}
            href="/clubentrance"
            display={!characterState.character}
          />
        </SwiperSlide>
      </SwiperContainer>
    </>
  );
};
