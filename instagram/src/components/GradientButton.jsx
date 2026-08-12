import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const GradientButton = ({ onPress, title, disabled, style, outline }) => {
  if (outline) {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        disabled={disabled} 
        style={[styles.outlineContainer, style, disabled && styles.disabledOutline]}
      >
        <Text style={[styles.outlineText, disabled && styles.disabledOutlineText]}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity onPress={onPress} disabled={disabled} style={style}>
      <LinearGradient
        colors={disabled ? ['#d3d3d3', '#e0e0e0'] : ['#F77737', '#FCAF45']}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.gradient}
      >
        <Text style={styles.text}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  gradient: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  outlineContainer: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F77737',
  },
  outlineText: {
    color: '#F77737',
    fontSize: 16,
    fontWeight: '600',
  },
  disabledOutline: {
    borderColor: '#d3d3d3',
  },
  disabledOutlineText: {
    color: '#a9a9a9',
  }
});

export default GradientButton;
