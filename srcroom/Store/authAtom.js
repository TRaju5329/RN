import AsyncStorage from "@react-native-async-storage/async-storage"
import { atom } from "jotai";
import { atomWithStorage, createJSONStorage, loadable } from "jotai/utils"

//Auth Token Atom
const storage = createJSONStorage(() => AsyncStorage)

const content = {};

export const authAtom = atomWithStorage('auth', content, storage)

export const loadableAuthAtom = loadable(authAtom)

export const updateAuthAtom = atom(null, async (get, set, payload) => {
    set(authAtom, payload)
    // ...
})

//userId
export const userIdAtom = atom(null)


