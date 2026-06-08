export const fetchCategories = async (query = '') => {
    const config = useRuntimeConfig();

    try {
        const res = await $fetch(`/api/categories`, {
            baseURL: config.public.apiBase,
            params: {
                search: query,
            },
            cache: 'no-cache',
        })
    
        return { data: res, pending: false, error: null }
    } catch(error) {
        return { data: null, pending: false, error: error.data }
    }
}

export const createCategory = async (form) => {
    const config = useRuntimeConfig();

    try {
        const res = await $fetch('/api/categories', {
            baseURL: config.public.apiBase,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'POST',
            body: form,
            cache: 'no-cache',
        })

        return { data: res, pending: false, error: null }
    } catch(error) {
        return { data: null, pending: false, error: error.data }
    }
}

export const editCategory = async (id, item) => {
    const config = useRuntimeConfig()

    try {
        const res = await $fetch(`/api/categories/${id}`, {
            baseURL: config.public.apiBase,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'PUT',
            body: item,
            cache: 'no-cache',
        })

        return { data: res, pending: false, error: null }
    } catch(error) {
        return { data: null, pending: false, error: error.data }
    }
}

export const deleteCategory = async (id) => {
    const config = useRuntimeConfig()

    try {
        const res = await $fetch(`/api/categories/${id}`, {
            baseURL: config.public.apiBase,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: 'DELETE',
            cache: 'no-cache',
        })

        return { data: res, pending: false, error: null }
    } catch(error) {
        return { data: null, pending: false, error: error.data }
    }
}