<template>
    <div>
        <div class="w-full max-w-4xl mx-auto mt-8">
            <div class="flex justify-between items-center mb-4">
                <h2 class="text-xl font-bold text-gray-800">Product sub-categories</h2>
                <span class="text-sm text-gray-500">{{ subCategoryRecords?.length || 0 }} Items Total</span>
            </div>

            <div class="flex justify-between items-center gap-2 mb-4">
                <select 
                    id="category_id_filter"
                    v-model="search_by_category_id"
                    class="w-full rounded-lg border px-3.5 py-2 text-sm transition-all duration-150 focus:outline-none focus:ring-2 appearance-none bg-no-repeat bg-right border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-100 shadow-sm"
                    @change="searchByCategoryId"
                >
                    <option value="" selected>Filter by category</option>
                    <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.category_title }}</option>
                </select>

                <input type="text" v-model="searchQuery" class="w-full rounded-lg border px-3.5 py-2 text-sm text-gray-900 transition-all duration-150 focus:outline-none focus:ring-2' border-gray-300 focus:border-indigo-500 focus:ring-indigo-100 shadow-sm" placeholder="Search sub-categories..." />
            </div>
    
            <div class="overflow-hidden bg-white border border-gray-200 rounded-xl shadow-sm">
                <table class="min-w-full divide-y divide-gray-200 text-left">
                    <thead class="bg-gray-50">
                        <tr>
                        <th scope="col" class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">ID</th>
                        <th scope="col" class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Category</th>
                        <th scope="col" class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Sub-category Title</th>
                        <th scope="col" class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500">Created At</th>
                        <th scope="col" class="px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-500 text-right">Actions</th>
                        </tr>
                    </thead>
        
                    <tbody v-if="pending" class="divide-y divide-gray-200 bg-white">
                        <tr v-for="n in 3" :key="'skeleton-' + n" class="animate-pulse">
                            <td class="px-6 py-4"><div class="h-4 w-6 bg-gray-200 rounded"></div></td>
                            <td class="px-6 py-4"><div class="h-4 w-6 bg-gray-200 rounded"></div></td>
                            <td class="px-6 py-4"><div class="h-4 w-48 bg-gray-200 rounded"></div></td>
                            <td class="px-6 py-4"><div class="h-4 w-24 bg-gray-200 rounded"></div></td>
                            <td class="px-6 py-4 text-right"><div class="h-4 w-16 bg-gray-200 rounded ml-auto"></div></td>
                        </tr>
                    </tbody>
                    <tbody class="divide-y divide-gray-200 bg-white">
                        <tr v-if="!pending && (!subCategoryRecords || subCategoryRecords.length === 0)">
                            <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                                <svg class="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                                </svg>
                                <p class="text-base font-medium text-gray-900">No sub-categories found</p>
                                <p class="text-sm text-gray-400 mt-0.5">Get started by creating a brand new sub-category above.</p>
                            </td>
                        </tr>
            
                        <tr 
                            v-else-if="!pending"
                            v-for="item in subCategoryRecords" 
                            :key="item.id" 
                            class="hover:bg-gray-50 transition-colors duration-150"
                        >
                            <td class="px-6 py-4 text-sm font-medium text-gray-400 whitespace-nowrap">
                                #{{ item.id }}
                            </td>
                            <td class="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                {{ item.category.category_title }}
                            </td>
                            <td class="px-6 py-4 text-sm font-semibold text-gray-900 whitespace-nowrap">
                                {{ item.sub_category_title }}
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                {{ formatDate(item.created_at) }}
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap space-x-3">
                                <button 
                                    @click="populateForm(item)" 
                                    class="text-indigo-600 hover:text-indigo-900 focus:outline-none transition cursor-pointer"
                                >
                                    Edit
                                </button>
                                <button 
                                    @click="handleDelete(item.id)" 
                                    class="text-red-600 hover:text-red-900 focus:outline-none transition cursor-pointer"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="w-full max-w-4xl mx-auto mt-6 bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div class="mb-5">
              <h3 class="text-lg font-bold text-gray-900">{{ subCategoryForm.sub_category_id != 0 ? 'Update Sub-category' : 'Create New Sub-category' }}</h3>
              <p class="text-sm text-gray-500">Add a unique identifier for grouping products together.</p>
            </div>
        
            <form @submit.prevent="subCategoryForm.sub_category_id != 0 ? handleUpdate() : handleSubmit()" class="space-y-4">
              <div class="flex flex-col gap-1.5 max-w-md">
                <input type="hidden" v-model="subCategoryForm.sub_category_id" />

                <div class="mb-1">
                    <label for="category_id" class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                        Category
                    </label>

                    <select 
                        id="category_id"
                        v-model="subCategoryForm.category_id"
                        :class="[
                        'w-full rounded-lg border px-3.5 py-2 text-sm transition-all duration-150 focus:outline-none focus:ring-2 appearance-none bg-no-repeat bg-right',
                        validationErrors.category_id 
                            ? 'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-200' 
                            : 'border-gray-300 text-gray-900 focus:border-indigo-500 focus:ring-indigo-100 shadow-sm'
                        ]"
                        :disabled="isSubmitting"
                    >
                        <option value="" disabled selected hidden>Select a category...</option>
                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.category_title }}</option>
                    </select>

                    <div v-if="validationErrors.category_id" class="flex items-center gap-1.5 mt-1 text-red-600">
                        <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span class="text-xs font-medium">
                          {{ validationErrors.category_id[0] }}
                        </span>
                      </div>
                </div>

                <div>
                    <label for="category_title" class="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Sub-category Title
                    </label>
                    
                    <input 
                    id="category_title"
                    v-model="subCategoryForm.sub_category_title"
                    type="text" 
                    placeholder="e.g., Electronics, Home Decor..."
                    :class="[
                        'w-full rounded-lg border px-3.5 py-2 text-sm text-gray-900 transition-all duration-150 focus:outline-none focus:ring-2',
                        validationErrors.sub_category_title 
                        ? 'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-200' 
                        : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-100 shadow-sm'
                    ]"
                    :disabled="isSubmitting"
                    />
                </div>

                <div v-if="validationErrors.sub_category_title" class="flex items-center gap-1.5 mt-1 text-red-600">
                  <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span class="text-xs font-medium">
                    {{ validationErrors.sub_category_title[0] }}
                  </span>
                </div>
              </div>
        
              <button v-if="subCategoryForm.sub_category_id != 0" type="button" @click="cancelUpdate" class="me-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50">
                <span>Cancel</span>
              </button>
              <button 
                type="submit" 
                :disabled="isSubmitting"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
              >
                <svg v-if="isSubmitting" class="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                
                <span>
                    {{ subCategoryForm.sub_category_id != 0 ? isSubmitting ? 'Updating...' : 'Update Sub-category' : isSubmitting ? 'Saving...' : 'Save Sub-category' }}
                </span>
              </button>
            </form>
          </div>
    </div>
</template>

<script setup>
const errorToast = useToast()
const validationErrors = ref({})
const pending = ref(true)
const isSubmitting = ref(false)
const searchQuery = ref('')
const search_by_category_id = ref('')
const subCategoryRecords = ref([])
const subCategoryForm = reactive({
    'category_id': 0,
    'sub_category_id': 0,
    'sub_category_title': '',
})

const searchByCategoryId = async () => {
    pending.value = true;
    validationErrors.value = {}; 
    subCategoryForm.category_id = 0
    subCategoryForm.sub_category_title = ''
    const {data: newData, loading, error} = await fetchSubCategories(searchQuery.value, search_by_category_id.value)
    pending.value = loading
    subCategoryRecords.value = newData
}

const debounceSearchQuery = refDebounced(searchQuery, 500)
watch(debounceSearchQuery, async (newQuery) => {
    pending.value = true;
    validationErrors.value = {}; 
    subCategoryForm.category_id = 0
    subCategoryForm.sub_category_title = ''
    const {data: newData, loading, error} = await fetchSubCategories(newQuery, search_by_category_id.value)
    subCategoryRecords.value = newData
    pending.value = loading
})

const formatDate = (dateString) => {
  if (!dateString) return '---';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

// Fetch categories
const { data: categories } = await fetchCategories();

// Fetch sub-categories
const { data: sub_categories, loading } = await fetchSubCategories();
subCategoryRecords.value = sub_categories
pending.value = loading

// Create new category
const handleSubmit = async () => {
    pending.value = true
    validationErrors.value = {}; 
    isSubmitting.value = true

    const newData = {
        category_id: subCategoryForm.category_id,
        sub_category_title: subCategoryForm.sub_category_title
    }

    const { data, loading, error: submitError } = await createSubCategory(newData);
    pending.value = loading
    isSubmitting.value = false

    if (submitError) {
        if (submitError.errors) {
            validationErrors.value = submitError.errors;
        } else {
            errorToast.error({ title: 'Error!', message: submitError.message || 'Something went wrong' })
        }
        return;
    }

    subCategoryForm.category_id = ''
    subCategoryForm.sub_category_title = ''
    subCategoryRecords.value = [data, ...subCategoryRecords.value]
}

// Edit category
const populateForm = async (item) => {
    validationErrors.value = {}; 
    subCategoryForm.sub_category_id = item.id
    subCategoryForm.category_id = item.category_id
    subCategoryForm.sub_category_title = item.sub_category_title
}

const handleUpdate = async () => {
    pending.value = true
    validationErrors.value = {}; 
    isSubmitting.value = true

    const editedData = {
        category_id: subCategoryForm.category_id,
        sub_category_title: subCategoryForm.sub_category_title
    }

    const { data, loading, error: submitError } = await editSubCategory(subCategoryForm.sub_category_id, editedData);
    pending.value = loading
    isSubmitting.value = false

    if (submitError) {
        if (submitError.errors) {
            validationErrors.value = submitError.errors;
        } else {
            errorToast.error({ title: 'Error!', message: submitError.message || 'Something went wrong' })
        }
        return;
    }

    subCategoryForm.sub_category_id = 0
    subCategoryForm.category_id = ''
    subCategoryForm.sub_category_title = ''

    subCategoryRecords.value = subCategoryRecords.value.map((item) => {
        if(item.id === data.id) {
            return data
        }

        return item
    })
}

// Cancel edit
const cancelUpdate = () => {
    subCategoryForm.sub_category_id = 0
    subCategoryForm.category_id = ''
    subCategoryForm.sub_category_title = ''
}

// Delete category
const handleDelete = async (id) => {
    pending.value = true
    if(confirm(`Are you sure you want to delete this record #${id}?`)) {
        const { data, loading } = await deleteSubCategory(id);
        pending.value = loading
        errorToast.success({ title: 'Deleted!', message: `Record #${id} successfully deleted` })

        subCategoryRecords.value = subCategoryRecords.value.filter((item) => item.id !== id)
    }
}
</script>