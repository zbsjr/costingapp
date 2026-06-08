export const fetchSubCategories = async (query = '', category_id = 0) => {
    const config = useRuntimeConfig()

    try {
        const res = await $fetch(`/api/subcategories`, {
            baseURL: config.public.apiBase,
            params: {
                search: query,
                category_id: category_id,
            },
            cache: 'no-cache',
        })
    
        return { data: res, pending: false, error: null }
    } catch(error) {
        return { data: null, pending: false, error: error.data }
    }
}

export const createSubCategory = async (form) => {
    const config = useRuntimeConfig();

    try {
        const res = await $fetch('/api/subcategories', {
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

export const editSubCategory = async (id, item) => {
    const config = useRuntimeConfig()

    try {
        const res = await $fetch(`/api/subcategories/${id}`, {
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

export const deleteSubCategory = async (id) => {
    const config = useRuntimeConfig()

    try {
        const res = await $fetch(`/api/subcategories/${id}`, {
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