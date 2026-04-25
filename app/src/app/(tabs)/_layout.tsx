import { colors, fontSize } from '@/constants/tokens'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { Tabs } from 'expo-router'
import { FloatingPlayer } from '@/components/FloatingPlayer'

const TabsNavigation = () => {
	return (
		<>
			<Tabs
				screenOptions={{
					tabBarActiveTintColor: colors.primary,
					tabBarLabelStyle: {
						fontSize: fontSize.xs,
						fontWeight: '500',
					},
					tabBarStyle: {
						position: 'absolute',
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						borderTopWidth: 0,
						height: 'auto',
						paddingTop: 0,
						backgroundColor: colors.background,
					},
				}}
			>
				<Tabs.Screen
					name="(home)/index"
					options={{
						title: 'Home',
						headerShown: false,
						tabBarIcon: ({ color }) => <MaterialIcons name="home-filled" size={24} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="library/index"
					options={{
						title: 'Library',
						headerShown: false,
						tabBarIcon: ({ color }) => (
							<MaterialIcons name="library-music" size={22} color={color} />
						),
					}}
				/>
				<Tabs.Screen
					name="setting/index"
					options={{
						title: 'Setting',
						headerShown: false,
						tabBarIcon: ({ color }) => <Ionicons name="settings-sharp" size={22} color={color} />,
					}}
				/>
				<Tabs.Screen
					name="individualScreens/MainFolder"
					options={{
						href: null,
						title: 'MainFolder',
						headerShown: false,
					}}
				/>
				<Tabs.Screen
					name="individualScreens/ChapterFolder"
					options={{
						href: null,
						title: 'ChapterFolder',
						headerShown: false,
					}}
				/>
				<Tabs.Screen
					name="individualScreens/AlbumsFolder"
					options={{
						href: null,
						title: 'AlbumsFolder',
						headerShown: false,
					}}
				/>
			</Tabs>
			<FloatingPlayer
				style={{
					position: 'absolute',
					left: 8,
					right: 8,
					bottom: 55,
				}}
			/>
		</>
	)
}

export default TabsNavigation
