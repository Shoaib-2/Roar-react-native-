import { Alert, Image, ScrollView, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import { useState } from 'react'
import Button from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'

const SignIn = () => {
  const {setUser, setisLoggedIn} = useGlobalContext()
  const [form, setform] = useState({
    email: '',
    password: '' 
  })

  const [isSubmitting, setisSubmitting] = useState(false)

  const submit = async () => {
    if(!form.email || !form.password) {
      Alert.alert('Error', 'Please fill in the details in all fields')
    }
    setisSubmitting(true);
    try {
      signIn(form.email, form.password)
        // set it to global state later.
        const result = await getCurrentUser();
        setUser(result)
        setisLoggedIn(true)
        router.replace('/home')
    } catch (error) {
      Alert.alert('Error', error.message)
    } finally{
      setisSubmitting(false)
    }
   }

  return (
   <SafeAreaView className="bg-primary h-full">
    <ScrollView>
      <View className="w-full justify-center min-h-[84vh] px-4 px-6">
        <Image source={images.logo}
          resizeMode='contain' className="w-[115px] h-[35px]"
        />
        <Text className="text-xl text-white text-semibold mt-10 font-psemibold">
          Log into Roar
        </Text>
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
            Don't Have an Account ?
          </Text>
          <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign Up</Link>
        </View>  
      </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default SignIn

