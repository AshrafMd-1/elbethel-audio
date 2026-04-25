import React, { createContext, ReactNode, useContext, useState } from 'react'

interface FloatingBarContextType {
	isFloatingBarPresent: boolean
	setIsFloatingBarPresent: (value: boolean) => void
}

const FloatingBarContext = createContext<FloatingBarContextType | undefined>(undefined)

interface FloatingBarProviderProps {
	children: ReactNode
}

export const FloatingBarProvider: React.FC<FloatingBarProviderProps> = ({ children }) => {
	const [isFloatingBarPresent, setIsFloatingBarPresent] = useState<boolean>(false)

	return (
		<FloatingBarContext.Provider value={{ isFloatingBarPresent, setIsFloatingBarPresent }}>
			{children}
		</FloatingBarContext.Provider>
	)
}

export const useFloatingBar = (): FloatingBarContextType => {
	const context = useContext(FloatingBarContext)
	if (!context) {
		throw new Error('useFloatingBar must be used within a FloatingBarProvider')
	}
	return context
}
