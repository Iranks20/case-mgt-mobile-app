import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../src/components/screens/LoginScreen';
import SignUpScreen from '../../src/components/screens/SignupScreen';
import ForgotPassword from '../../src/components/screens/ForgotPassword';
import Dashboard from '../../src/components/screens/Dashboard';
import ReportingPage from '../../src/components/screens/ReportingPage';
import ViewPage from '../../src/components/screens/ViewPage';
import ViewDetails from '../../src/components/screens/ViewDetails';
import VerifyOtp from '../../src/components/screens/VerifyOtp';
import ChangePassword from '../../src/components/screens/ChangePassword';
import DashboardHeader from '../../src/components/screens/DashboardHeader';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{
            title: 'Login',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="SignUp" 
          component={SignUpScreen} 
          options={{
            title: 'Sign Up',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPassword} 
          options={{
            title: 'Forgot Password',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="Dashboard" 
          component={Dashboard} 
          options={{
            header: (props) => <DashboardHeader {...props} />, // Use the custom header component
          }} 
        />
        <Stack.Screen 
          name="ReportingPage" 
          component={ReportingPage} 
          options={{
            title: 'Reporting Page',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="ViewPage" 
          component={ViewPage} 
          options={{
            title: 'View Page',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }} 
        />
        <Stack.Screen 
          name="ViewDetails" 
          component={ViewDetails} 
          options={({ route }) => ({
            title: route.params.title,
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })} 
        />
        <Stack.Screen 
          name="VerifyOtp" 
          component={VerifyOtp}
          options={({ route }) => ({
            title: 'Verify OTP',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })} 
        />
        <Stack.Screen 
          name="ChangePassword" 
          component={ChangePassword}
          options={({ route }) => ({
            title: 'Change Password',
            headerStyle: {
              backgroundColor: 'red',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
