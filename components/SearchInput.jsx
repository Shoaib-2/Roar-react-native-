import { View,TextInput, Image, Alert } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { icons} from '../constants'
import { TouchableOpacity } from 'react-native'
import { router, usePathname } from 'expo-router'

const SearchInput = ({initialQuery}) => {
    const pathname = usePathname()
    const [query, setquery] = useState(initialQuery || '')
  return (
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput 
      className="text-base mt-0.5 text-white flex-1 font-pregular"
      value={query}
      placeholder="Search for Cracking Videos"
      placeholderTextColor="#CDCDE0"
      onChangeText={(e) => setquery(e)}
      />
      <TouchableOpacity onPress={() => {
        if(!query) {
          return Alert.alert('Missing Query', "Please input something to search across the vastness of the databse")
        }
        if(pathname.startsWith('/search')) router.setParams({query}) 
        else router.push(`/search/${query}`)
      }}>
        <Image 
        source={icons.search}
         className="w-6 h-6"
         resizeMode='contain'
        />

      </TouchableOpacity>
      </View>
  )
}

export default SearchInput