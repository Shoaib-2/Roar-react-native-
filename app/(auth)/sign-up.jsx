import { Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import Button from '../../components/CustomButton'
import { Link } from 'expo-router'

const SignUp = () => {

  const [form, setform] = useState({
    userName: '',
    email: '',
    password: '' 
  })

  const [isSubmitting, setisSubmitting] = useState(false)

 const submit = () => {

 }
  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView>
      <View className="w-full justify-center min-h-[84vh] px-4 px-6">
        <Image source={images.logo}
          resizeMode='contain' className="w-[115px] h-[35px]"
        />
        <Text className="text-xl text-white text-semibold mt-10 font-psemibold">
          Sign Up to Roar
        </Text>
        <FormField 
        title="Username"
        value={form.userName}
        handleChangeText={(e) => setform({
          ...form,
          userName: e })}
          otherStyles ="mt-10"
        />

        <FormField 
        title="Email"
        value={form.email}
        handleChangeText={(e) => setform({
          ...form,
          email: e })}
          otherStyles ="mt-7"
          keyboardType="email-address"
        />

        <FormField 
        title="Password"
        value={form.password}
        handleChangeText={(e) => setform({
          ...form,
          password: e })}
          otherStyles ="mt-7"
        />
        <Button 
        title="Sign In"
        handlePress={submit}
        containerStyles="mt-7"
        isLoading={isSubmitting}
        />
        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Have an account already ?
          </Text>
          <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>Sign in</Link>
        </View>  
      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default SignUp



