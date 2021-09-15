import {useContext, createContext, SetStateAction} from "react";

export const HeroScrollContext = createContext({
    isHeroScrolled: true,
    setHeroScrolled: (isHeroScrolled: boolean) => {}
})

export const useHeroScroll = () => useContext(HeroScrollContext)