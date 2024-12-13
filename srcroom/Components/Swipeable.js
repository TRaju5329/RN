import React, { useEffect, useRef, useState } from "react";
import { Swipeable } from "react-native-gesture-handler";

const SwipeableItem = ({
    children,
    renderRightButtons,
    itemKey,
    containerStyle,
    closeKey,
    onOpen,
}) => {

    const [item, setItem] = useState(itemKey)

    useEffect(() => {
        if (closeKey === item) {
            return
        }else{
            closeSwipable()
        }
    }, [closeKey])

    const swipeableRef = useRef()

    const closeSwipable = () => {
        swipeableRef?.current?.close()
    }
    return (
        <Swipeable
            containerStyle={containerStyle}
            ref={swipeableRef}
            onSwipeableWillOpen={onOpen}
            friction={1.3}
            renderRightActions={renderRightButtons}
            overshootFriction={20}
        >
            {children}
        </Swipeable>
    );
};

export default SwipeableItem;