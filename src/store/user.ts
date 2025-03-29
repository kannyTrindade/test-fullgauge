import axios from 'axios';
import { create } from 'zustand';

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

type User = { 
    id?: string,
    first_name: string,
    last_name: string,
    register_on: string
}

type UserStore = {
    users : User[];
    filteredResults: User[];
    addUser: (first_name: string, last_name: string) => void;
    removeUser: (id: string) => void;
    editUser: (id: string, first_name: string, last_name: string) => void;
    genericSearch: (search: string) => void;
    resetSearch: () => void;
    listUsers: () => void;
    apiError: string | null | unknown;
    isLoading: boolean;
    
}

export const useUserStore = create<UserStore>((set, get) =>({
    users: [],
    filteredResults: [],
    apiError: null,
    isLoading: false,
    addUser: async (first_name: string, last_name: string) => {
        const users = await get().users;
        const lastItem = [...users].pop();
        const registerDate = getDate();
        const payLoad = {
            'first_name': first_name,
            'last_name': last_name,
            'register_on': registerDate
        }
        try{
            set({ isLoading: true })
            const response = await axios.post(`http://localhost:3000/users`, payLoad)
            .then(function (response) {
                const updatedUsers = [...users, response.data];
                set((state) => ({
                    users: {
                      ...users,
                      'id': response.data.id,
                      'first_name': first_name,
                      'last_name': last_name,
                      'register_on': registerDate
                    }
                  }))
                  set({ users: updatedUsers, filteredResults: updatedUsers});
            });
        }catch(error){
            set({ apiError: error })
        }finally{
            set({ isLoading: false })
        }
    },
    removeUser: async (id: string) => {
        const users= get().users;
        try{
            set({ isLoading: true })
            const response = await axios.delete(`http://localhost:3000/users/${id}`)
            .then(function (response) {
                const updatedUsers = users.filter(user => user.id !== id)
                set({ users: updatedUsers, filteredResults: updatedUsers});
            });
        }catch(error){
            set({ apiError: error })
        }finally{
            set({ isLoading: false })
        }
    },
    genericSearch: (genericSearch: string) => {
        let search = genericSearch.toLocaleLowerCase();
        const { users } = get();
        if(search.length == 0){
            set({filteredResults : users})
            return;
        }
        const filter = users.filter((user) =>
            
            user.first_name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || user.last_name.toLocaleLowerCase().includes(search) || user.register_on.toLocaleLowerCase().includes(search)
        );
        set({filteredResults: filter});     
    },
    resetSearch: () => {
        const users = get().users;
        set({filteredResults: users});
    },
    listUsers: async () => {
        try{
            set({ isLoading: true })
            const response = await axios.get('http://localhost:3000/users')
            .then(function (response) {
                set({ users: response.data, filteredResults: response.data});
            });
        }catch(error){
            set({ apiError: error })
        }finally{
            set({ isLoading: false })
        }
    },
    
    editUser: async (id: string, first_name: string, last_name: string) => {
        const users = get().users;
        const payLoad = {
            'id': id,
            'first_name': first_name,
            'last_name': last_name,
        }
        try{
            set({ isLoading: true })
            const response = await axios.patch(`http://localhost:3000/users/${id}`, payLoad)
            .then(function (response) {
                const updatedUsers = users?.map((user) => {
                    if (user.id == id) {
                        return {
                            ...user, 
                            'id': id,
                            'first_name': first_name,
                            'last_name': last_name,
                        };
                    }
                    else {
                        return user;
                    }
                });
                set({ users: updatedUsers, filteredResults: updatedUsers});
            });
        }catch(error){
            set({ apiError: error })
        }finally{
            set({ isLoading: false })
        }
    },
}))