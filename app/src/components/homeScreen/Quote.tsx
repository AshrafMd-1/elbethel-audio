import { StyleSheet, Text, View } from 'react-native'
import { colors, fontSize } from '@/constants/tokens'
import React from 'react'
import QuoteBox from '@/components/homeScreen/QuoteBox'

const Quote = () => {
	return (
		<View>
			<Text style={styles.title}>Verse of the day</Text>
			<QuoteBox />
		</View>
	)
}

const styles = StyleSheet.create({
	title: {
		fontSize: fontSize.lg,
		color: colors.text,
		fontWeight: 'bold',
	},
})

export default Quote
