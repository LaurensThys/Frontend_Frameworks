import {IUser} from '../models/IUser.ts'
import {faker} from '@faker-js/faker'
import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query'


//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export const useGetUser = (): UseQueryResult<IUser, Error> => {
    return useQuery({
        queryKey: ['user'],
        queryFn: getUser,
    })
}

export const useLogin = (): UseMutationResult<IUser, Error, LoginParams, void> => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: login,
        onSuccess: (user) => {
            queryClient.setQueryData(['user'], user)
        },
    })
}

export const useLogout= (): UseMutationResult<void, Error, void, void> => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: logout,
        onSuccess: async () => {
            await queryClient.invalidateQueries(['user'])
        },
    })
}


//endregion


//region API functions

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

interface LoginParams {
    email: string
    password: string
}

const login = async ({email}: LoginParams): Promise<IUser> => {
    if (email === 'cypressAccount[JOUW NAAM HIER]@testing.com') {
        throw new Error('Invalid email address!')
    }

    const user = {
        email,
        id: faker.string.uuid(),
    }

    localStorage.user = JSON.stringify(user)
    return user
}

const logout = async (): Promise<void> => {
    localStorage.removeItem('user')
}

const getUser = async (): Promise<IUser | null> => {
    return localStorage.user ? JSON.parse(localStorage.user) : null
}

//endregion
