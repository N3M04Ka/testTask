import { useState } from "react";
import {
    FlatList,
    type NativeScrollEvent,
    type NativeSyntheticEvent,
    useWindowDimensions,
    View,
} from "react-native";

import BankCardView from "@/components/cards/BankCardView";
import { bankCards, type BankCard } from "@/constants/cards";

const carouselItems: readonly (BankCard | null)[] = [...bankCards, null];
const cardGap = 12;

type CardCarouselProps = {
    onCardSelect: (index: number) => void;
};

export default function CardCarousel({ onCardSelect }: CardCarouselProps) {
    const { width, fontScale } = useWindowDimensions();
    const [activeIndex, setActiveIndex] = useState(0);
    const pagePadding = width / 24;
    const cardWidth = (width - pagePadding * 2) * 0.83;
    const cardHeight = Math.max(232, 232 * fontScale);
    const interval = cardWidth + cardGap;

    function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
        const index = Math.max(0, Math.min(
            carouselItems.length - 1,
            Math.round(event.nativeEvent.contentOffset.x / interval),
        ));
        if (index === activeIndex) return;
        setActiveIndex(index);
        if (index < bankCards.length) onCardSelect(index);
    }

    return (
        <View className="w-full">
            <FlatList
                horizontal
                data={carouselItems}
                keyExtractor={(item) => item?.id ?? "add-card"}
                renderItem={({ item }) => (
                    <View style={{ width: cardWidth, height: cardHeight }}>
                        <BankCardView card={item} />
                    </View>
                )}
                ItemSeparatorComponent={CardSeparator}
                contentContainerStyle={{
                    paddingLeft: pagePadding,
                    paddingRight: width - pagePadding - cardWidth,
                }}
                style={{ flexGrow: 0 }}
                snapToInterval={interval}
                snapToAlignment="start"
                decelerationRate="fast"
                disableIntervalMomentum
                onScroll={handleScroll}
                scrollEventThrottle={32}
                showsHorizontalScrollIndicator={false}
            />
            <View
                accessible
                accessibilityLabel={`Элемент ${activeIndex + 1} из ${carouselItems.length}`}
                className="mt-4 flex-row items-center justify-center gap-2"
            >
                {carouselItems.map((item, index) => (
                    <View
                        key={item?.id ?? "add-card"}
                        className="h-1.5 rounded-full"
                        style={{
                            width: activeIndex === index ? 20 : 6,
                            backgroundColor: activeIndex === index ? "#FF5D15" : "#00000020",
                        }}
                    />
                ))}
            </View>
        </View>
    );
}

function CardSeparator() {
    return <View style={{ width: cardGap }} />;
}
