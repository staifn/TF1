import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const App = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [helloWorldDisplay, setHelloWorldDisplay] = useState<boolean>(false)
  const [animated, setAnimated] = useState<boolean>(false)

  const toggleHelloWorld = useCallback((display: boolean) => {
    Animated.timing(fadeAnim, {
      toValue: display ? 1 : 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setAnimated(false);
        setHelloWorldDisplay(display);
      }
    });
  }, [fadeAnim])

  const handlePress = useCallback(() => {
    if (animated) {
      return;
    }

    setAnimated(true);

    if (helloWorldDisplay) {
      toggleHelloWorld(false);
    } else {
      toggleHelloWorld(true);
    }
  }, [helloWorldDisplay, toggleHelloWorld]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Animated.View style={[{ opacity: fadeAnim }]}>
          <Text style={styles.helloWord}>Hello TF1 !</Text>
        </Animated.View>
        <Button
          title={helloWorldDisplay ? "Press to say good bye TF1" : "Press to say hello TF1" }
          onPress={handlePress}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  helloWord: {
    color: 'red',
    fontSize: 60,
  },
});

export default App;
