export const fetchProjects = async (query = '', project_id = 0) => {
    const config = useRuntimeConfig()

    try {
        const res = await $fetch(`/api/projects`, {
            baseURL: config.public.apiBase,
            params: {
                search: query,
                product_id: project_id,
            },
            cache: 'no-cache'
        })

        return { data: res, pending: false, error: null }
    } catch(error) {
        return { data: null, pending: false, error: error.data }
    }
}

export const createProject = async (form) => {
    const config = useRuntimeConfig()
        
    try {
        const res = await $fetch(`/api/projects`, {
            baseURL: config.public.apiBase,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: form,
            method: 'POST',
            cache: 'no-cache',
        })

        return { data: res, pending: false, error: null }
    } catch(error) {
        return { data: null, pending: false, error: error.data }
    }
}

export const updateProject = async (form, id) => {
    const config = useRuntimeConfig()
        
    try {
        const res = await $fetch(`/api/projects/${id}`, {
            baseURL: config.public.apiBase,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: form,
            method: 'PUT',
            cache: 'no-cache',
        })

        return { data: res, pending: false, error: null }
    } catch(error) {
        return { data: null, pending: false, error: error.data }
    }
}

export const deleteProject = async (id) => {
    const config = useRuntimeConfig()

    try {
        const res = await $fetch(`/api/projects/${id}`, {
            baseURL: config.public.apiBase,
            method: 'DELETE',
            cache: 'no-cache'
        })

        return { data: res, pending: false, error: null }
    } catch(error) {
        return { data: null, pending: false, error: error.data }
    }
}