export const useApi = () => {
    const config = useRuntimeConfig()
    const baseURL = 'https://03c45a0d90a3.ngrok-free.app/api'

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

    return {
        fetchCategoriesById,
        createLocation,
        fetchItems,
        fetchCategories,
        fetchLocations,
        createItem,
    }
}