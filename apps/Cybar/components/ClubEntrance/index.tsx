import { ClubEntranceChars } from "@symmio/frontend-sdk/state/character/characters";
import { Character as CharacterType } from "@symmio/frontend-sdk/state/character/types";
import { DefaultContainer } from "components/App/AccountData/MyAccount/styles";
import { Character } from "components/Characters/character";
import { useMediaQuery } from "hooks/useMediaQuery";
import styled from "styled-components";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Parallax } from "swiper/modules";
import { Swiper, SwiperSlide as SwiperSlideImport } from "swiper/react";
import { NavigationArrow } from "./Arrow";

const ClubEntranceContainer = styled(DefaultContainer)`
  position: relative;
  bottom: auto;
  background-image: url("/images/backgrounds/clubentrance.webp");
  background-size: cover;
  min-height: calc(100vh - 60px);
  background-position: center bottom;
  border: none;
`;

const SwiperContainer = styled(Swiper)`
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
  bottom: auto;
`;

const SwiperSlide = styled(SwiperSlideImport)`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
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

const CharactersContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 0 20px;
`;

export const ClubEntrance = () => {
  const isDesktop = useMediaQuery("(min-width: 600px)");

  // Group characters into sets of 3
  const characterGroups: CharacterType[][] = [];
  for (let i = 0; i < ClubEntranceChars.length; i += 3) {
    characterGroups.push(ClubEntranceChars.slice(i, i + 3));
  }

  if (isDesktop) {
    return (
      <ClubEntranceContainer>
        {ClubEntranceChars.map((props) => (
          <Character key={props.id} {...props} isActive={false} />
        ))}
        <NavigationArrow href="/" display />
      </ClubEntranceContainer>
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
        <SliderBackground
          data-swiper-parallax-x="-45%"
          slot="container-start"
          backgroundImage="/images/backgrounds/clubentrance.webp"
        />
        {characterGroups.map((group, groupIndex) => (
          <SwiperSlide key={`group-${groupIndex}`}>
            <CharactersContainer>
              {group.map((props) => (
                <Character
                  key={props.id}
                  {...props}
                  isActive={false}
                  {...props.mobilePositions}
                />
              ))}
            </CharactersContainer>
            {groupIndex === characterGroups.length - 1 && (
              <NavigationArrow href="/" display />
            )}
          </SwiperSlide>
        ))}
      </SwiperContainer>
    </>
  );
};
