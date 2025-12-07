export const useApi = () => {
    const config = useRuntimeConfig()
    const baseURL = 'https://d483f0abf821.ngrok-free.app/api'

    const fetchItems = async () => {
        try {
        const response = await $fetch(`${baseURL}/Items`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
        return response
        } catch (error) {
        console.error('Error fetching items:', error)
        throw error
        }
    }

    const fetchCategories = async () => {
        try {
        const response = await $fetch(`${baseURL}/Categories`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
        return response
        } catch (error) {
        console.error('Error fetching items:', error)
        throw error
        }
    }

    const fetchCategoriesById = async (id: any) => {
        try {
        const response = await $fetch(`${baseURL}/Categories/${id}`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
        return response
        } catch (error) {
        console.error('Error fetching items:', error)
        throw error
        }
    }

    const fetchLocations = async () => {
        try {
        const response = await $fetch(`${baseURL}/Locations`, {
            method: 'GET',
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
        return response
        } catch (error) {
        console.error('Error fetching items:', error)
        throw error
        }
    }

    const createItem = async (itemData: any) => {
        try {
        const response = await $fetch(`${baseURL}/Items`, {
            method: 'POST',
            body: itemData,
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
        return response
        } catch (error) {
        console.error('Error fetching items:', error)
        throw error
        }
    }

    const createLocation = async (itemData: any) => {
        try {
        const response = await $fetch(`${baseURL}/Locations`, {
            method: 'POST',
            body: itemData,
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
        return response
        } catch (error) {
        console.error('Error fetching items:', error)
        throw error
        }
    }

    const deleteItem = async (id: number) => {
        try {
        const response = await $fetch(`${baseURL}/Items/${id}`, {
            method: 'DELETE',
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
        return response
        } catch (error) {
        console.error('Error deleting item:', error)
        throw error
        }
    }

    const updateItem = async (id: number, itemData: any) => {
        try {
        const response = await $fetch(`${baseURL}/Items/${id}`, {
            method: 'PUT',
            body: itemData,
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        })
        return response
        } catch (error) {
        console.error('Error updating item:', error)
        throw error
        }
    }

    return {
        fetchCategoriesById,
        createLocation,
        fetchItems,
        fetchCategories,
        fetchLocations,
        createItem,
        deleteItem,
        updateItem,
    }
}