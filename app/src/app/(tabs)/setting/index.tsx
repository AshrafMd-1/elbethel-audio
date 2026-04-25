import {
	// Alert,
	Linking,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	// TextInput,
	// TouchableOpacity,
	View,
} from 'react-native'
// import { useState } from 'react'
import { defaultStyles } from '@/styles'
import { colors, screenPadding } from '@/constants/tokens'
import { useLanguage } from '@/context/LanguageContext'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { useFloatingBar } from '@/context/FloatingBarContext'
import Header from '@/components/Header'

const About = () => {
	// const [title, setTitle] = useState('')
	// const [issueText, setIssueText] = useState('')
	const { isTelugu, toggleLanguage } = useLanguage()
	const bottom = useBottomTabBarHeight()
	const { isFloatingBarPresent } = useFloatingBar()

	// const handleReportIssue = async () => {
	// 	if (!title.trim() || !issueText.trim()) {
	// 		Alert.alert('Error', 'Please enter both title and issue description.')
	// 		return
	// 	}
	//
	// 	try {
	// 		const response = await fetch('https://arorium.serv00.net/issue', {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify({ title, issue: issueText }),
	// 		})
	//
	// 		if (response.ok) {
	// 			Alert.alert('Success', 'Issue reported successfully!')
	// 			setTitle('')
	// 			setIssueText('')
	// 		} else {
	// 			Alert.alert('Error', 'Failed to submit issue. Please try again.')
	// 		}
	// 	} catch {
	// 		Alert.alert('Error', 'An error occurred while submitting the issue.')
	// 	}
	// }

	return (
		<>
			<Header />

			<View
				style={{
					...defaultStyles.container,
					paddingHorizontal: screenPadding.horizontal,
					paddingBottom: isFloatingBarPresent ? bottom + 10 : bottom,
				}}
			>
				<ScrollView contentContainerStyle={st.scrollContainer}>
					<Text
						style={[
							st.sectionTitle,
							{
								marginTop: 0,
							},
						]}
					>
						App Details
					</Text>
					<Text style={st.detailText}>Version: 1.0.0</Text>
					<Text style={st.detailText}>Last Updated: Feb 08, 2025</Text>

					<Text style={st.sectionTitle}>Preferences</Text>
					<View style={st.row}>
						<Text style={st.preferenceText}>{'తెలుగు'}</Text>
						<Switch
							trackColor={{ false: colors.textMuted, true: colors.textMuted }}
							thumbColor={isTelugu ? colors.primary : '#f4f3f4'}
							onValueChange={toggleLanguage}
							style={{ marginLeft: 'auto' }}
							value={isTelugu}
						/>
					</View>

					{/*<Text style={st.sectionTitle}>Report an Issue</Text>*/}
					{/*<TextInput*/}
					{/*	style={st.input}*/}
					{/*	placeholder="Enter your title..."*/}
					{/*	placeholderTextColor="#888"*/}
					{/*	value={title}*/}
					{/*	onChangeText={setTitle}*/}
					{/*/>*/}
					{/*<TextInput*/}
					{/*	style={[st.input, { minHeight: 100 }]}*/}
					{/*	placeholder="Describe your issue..."*/}
					{/*	placeholderTextColor="#888"*/}
					{/*	multiline*/}
					{/*	value={issueText}*/}
					{/*	onChangeText={setIssueText}*/}
					{/*/>*/}
					{/*<TouchableOpacity style={st.button} onPress={handleReportIssue}>*/}
					{/*	<Text style={st.buttonText}>Submit Issue</Text>*/}
					{/*</TouchableOpacity>*/}

					<Text
						style={[
							st.sectionTitle,
							{
								textAlign: 'center',
								fontSize: 18,
								marginTop: '100%',
							},
						]}
					>
						Developed By{' '}
						<Text
							style={st.linkText}
							onPress={() =>
								Linking.openURL('https://www.linkedin.com/in/ashraf-mohammed-75932823a/')
							}
						>
							Ashraf MD
						</Text>
					</Text>
				</ScrollView>
			</View>
		</>
	)
}

const st = StyleSheet.create({
	scrollContainer: {
		paddingBottom: 50,
	},
	heading: {
		fontSize: 26,
		fontWeight: 'bold',
		color: colors.primary,
		marginBottom: 8,
		textAlign: 'center',
	},
	subheading: {
		fontSize: 16,
		color: colors.text,
		marginBottom: 20,
		textAlign: 'center',
	},
	sectionTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		color: colors.text,
		marginTop: 30,
	},
	detailText: {
		fontSize: 16,
		color: colors.textMuted,
		marginTop: 5,
	},
	preferenceText: {
		fontSize: 16,
		color: colors.textMuted,
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 10,
	},
	input: {
		backgroundColor: '#222',
		color: '#fff',
		fontSize: 16,
		padding: 12,
		marginTop: 10,
		borderRadius: 8,
		textAlignVertical: 'top',
	},
	button: {
		backgroundColor: colors.primary,
		padding: 12,
		marginTop: 10,
		borderRadius: 8,
		alignItems: 'center',
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	footer: {
		fontSize: 18,
		color: '#aaa',
		textAlign: 'center',
		marginTop: 10,
	},
	linkText: {
		color: '#1e90ff',
		textDecorationLine: 'underline',
		fontWeight: 'bold',
	},
})

export default About
