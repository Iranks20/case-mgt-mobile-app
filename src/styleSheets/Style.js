import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 70,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
    height: 70,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeIconContainer: {
    position: 'absolute',
    top: '50%',
    right: 10,
    transform: [{ translateY: -10 }],
    zIndex: 1,
    paddingLeft: 10,
  },
  
  signUp: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  forgotPassword: {
    fontSize: 16,
    color: '#888',
    marginBottom: 10,
  },
  phoneInputContainer: {
    width: '100%',
    height: 80,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    justifyContent: 'center',
  },
  phoneInput: {
     width: '100%',
    // marginLeft: 10,
    fontSize: 16,
  },
});
