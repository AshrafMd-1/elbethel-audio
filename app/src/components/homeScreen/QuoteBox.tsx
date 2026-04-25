import { StyleSheet, Text, View } from 'react-native'
import quotes from '@/assets/data/quote.json'
import { colors, fontSize } from '@/constants/tokens'

const getDailyQuote = () => {
	const date = new Date()
	const dateKey = `${date.getFullYear()}${date.getMonth() + 1}${date.getDate()}`
	const index = parseInt(dateKey, 10) % quotes.length
	return quotes[index]
}

const QuoteBox = () => {
	const quote = getDailyQuote()

	return (
		<View style={styles.container}>
			<Text style={styles.quoteText}>{quote[1]}</Text>
			<Text style={styles.authorText}>- {quote[0]}</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.backgroundMuted,
		padding: 16,
		marginTop: 10,
		borderRadius: 10,
	},
	quoteText: {
		color: colors.primary,
		fontSize: fontSize.base,
		fontWeight: 'bold',
	},
	authorText: {
		color: colors.text,
		textAlign: 'right',
		fontSize: fontSize.sm,
		marginTop: 4,
	},
})

export default QuoteBox
