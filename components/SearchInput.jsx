import { View, Text, TextInput, Image } from 'react-native'
import React from 'react'
import { useState } from 'react'
import { icons} from '../constants'
import { TouchableOpacity } from 'react-native'

const SearchInput = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
    const [showPassword, setshowPassword] = useState(false)
  return (
      <View className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput 
      className="text-base mt-0.5 text-white flex-1 font-pregular"
      value={value}
      placeholder="Search for Cracking Videos"
      placeholderTextColor="#7b7b8b"
      onChangeText={handleChangeText}
      secureTextEntry={title === 'Password' && !showPassword}
      />
      <TouchableOpacity>
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