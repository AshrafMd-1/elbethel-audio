import React, { createContext, ReactNode, useContext, useState } from 'react'

interface LanguageContextType {
	isTelugu: boolean
	toggleLanguage: () => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
	const [isTelugu, setIsTelugu] = useState(false)

	const toggleLanguage = () => setIsTelugu((prev) => !prev)

	return (
		<LanguageContext.Provider value={{ isTelugu, toggleLanguage }}>
			{children}
		</LanguageContext.Provider>
	)
}

export const useLanguage = () => {
	const context = useContext(LanguageContext)
	if (!context) {
		throw new Error('useLanguage must be used within a LanguageProvider')
	}
	return context
}
