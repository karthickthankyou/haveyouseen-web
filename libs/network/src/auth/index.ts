import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth'
import { auth } from '../config/firebase'

export type LoginInfo = {
  email: string
  password: string
}
export type RegisterInfo = LoginInfo & {
  displayName?: string
  photoURL?: string
}
export const login = ({ email, password }: LoginInfo) => {
  return signInWithEmailAndPassword(auth, email, password)
}

export const register = async ({
  email,
  password,
  displayName,
  photoURL,
}: RegisterInfo): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  )
  const { user } = userCredential

  if (displayName && user) {
    await updateProfile(user, { displayName, photoURL })
    await user.reload() // Reload the user's information
  }

  return userCredential
}

export const signOut = async () => {
  await firebaseSignOut(auth)
}

export const resetPassword = (email: string) => {
  const redirectUrl =
    process.env.NEXT_PUBLIC_RESET_PASSWORD_REDIRECT_URL ||
    process.env.NEXT_PUBLIC_API_URL + '/login'
  return sendPasswordResetEmail(auth, email, { url: redirectUrl })
}

export const googleSignIn = async () =>
  signInWithPopup(auth, new GoogleAuthProvider())
