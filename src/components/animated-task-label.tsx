import React, { useEffect, memo } from 'react';
import { Pressable, Text, HStack, Box } from 'native-base';
import Animated,{
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  interpolateColor
} from 'react-native-reanimated';

interface Props {
  strikethrough: boolean
  textColor: string
  inactiveTextColor: string
  onPress?: () => void
  children?: React.ReactNode
}

const AnimatedBox = Animated.createAnimatedComponent(Box)
const AnimatedHStack = Animated.createAnimatedComponent(HStack)
const AnimatedText = Animated.createAnimatedComponent(Text)

const AnimatedTaskLabel = memo((props: Props) => {
  const { strikethrough, textColor, inactiveTextColor, onPress, children } =props;
  const hstackOffset = useSharedValue(0);

  const hstackAnimatedStyle = useAnimatedStyle(
    () => ({
      transform: [{ translateX: hstackOffset.value}]
    })
  , [strikethrough])
  
  const textColorProgress = useSharedValue(0);
  const textColorAnimatedStyle = useAnimatedStyle(
    () => ({
      color: interpolateColor(
        textColorProgress.value,
        [0,1],
        [textColor, inactiveTextColor]
      )
    }),
    [strikethrough, textColor, inactiveTextColor])

    const strikethroughWidth = useSharedValue(0);
    const strikethroughAnimatedStyle = useAnimatedStyle(
      () => ({
        width: `${strikethroughWidth.value * 100}%`,
        borderBottomColor: interpolateColor(
          textColorProgress.value,
          [0,1],
          [textColor, inactiveTextColor]
        )
      }),
      [strikethrough, textColor, inactiveTextColor])

      useEffect(() => {
        const easing = Easing.out(Easing.quad)
        if (strikethrough) {
          hstackOffset.value = withSequence(
            withTiming(4, {duration: 200, easing}),
            withTiming(0, {duration: 200, easing})
          )
          strikethroughWidth.value = withTiming(1, {duration: 400, easing})
          textColorProgress = withDelay(
            1000,
            withTiming(1, {duration: 400, easing})
          )
        } else {
          strikethroughWidth.value = withTiming(0, {duration: 400, easing})
          textColorProgress.value= withTiming(0, {duration: 400, easing})
        }
      })
      return (
        <Pressable onPress={onPress}>
          <AnimatedHStack alignItems="center" style={hstackAnimatedStyle}>
            <AnimatedText
              fontSize={19}
              noOfLines={1}
              isTruncated
              px={1}
              style={[textColorAnimatedStyle]}
            >
              {children}
            </AnimatedText>
            <AnimatedBox
              position="absolute"
              h={1}
              borderBottomWidth={1}
              style={[strikethroughAnimatedStyle]}
            />
          </AnimatedHStack>
        </Pressable>
      )

    })


export default AnimatedTaskLabel