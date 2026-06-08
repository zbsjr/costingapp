<template>
    <div class="w-full max-w-4xl mx-auto mt-6 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <!-- Table Header Details -->
        <div class="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 class="text-lg font-bold text-gray-900">Project Costings</h3>
            <p class="text-sm text-gray-500">View, manage, and track calculated production costs and selling prices.</p>
          </div>
          <div>
            <NuxtLink to="/projects" class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-gray-800 active:scale-[0.98]">
              <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>New Project</span>
            </NuxtLink>
          </div>
        </div>
      
        <!-- Responsive Table Wrapper -->
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th scope="col" class="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Project Name
                </th>
                <th scope="col" class="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">
                  Markup (%)
                </th>
                <th scope="col" class="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider text-right">
                  Total COGS
                </th>
                <th scope="col" class="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider text-right">
                  Total SRP
                </th>
                <th scope="col" class="px-6 py-3.5 text-xs font-semibold text-gray-700 uppercase tracking-wider text-center">
                  Actions
                </th>
              </tr>
            </thead>
            
            <tbody v-if="pending" class="divide-y divide-gray-200 bg-white">
              <tr v-for="n in 4" :key="'skeleton-' + n" class="animate-pulse">
                  <td class="px-6 py-4"><div class="h-4 w-48 bg-gray-200 rounded"></div></td>
                  <td class="px-6 py-4"><div class="h-4 w-20 bg-gray-200 rounded"></div></td>
                  <td class="px-6 py-4"><div class="h-4 w-20 bg-gray-200 rounded"></div></td>
                  <td class="px-6 py-4"><div class="h-4 w-20 bg-gray-200 rounded"></div></td>
                  <td class="px-6 py-4 text-right"><div class="h-4 w-16 bg-gray-200 rounded ml-auto"></div></td>
              </tr>
            </tbody>
            <tbody class="divide-y divide-gray-200 bg-white">

              <tr v-if="!pending && (!allProjects || allProjects.length === 0)">
                <td colspan="4" class="px-6 py-12 text-center text-gray-500">
                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                    </svg>
                    <p class="text-base font-medium text-gray-900">No products found</p>
                    <p class="text-sm text-gray-400 mt-0.5">Get started by creating a brand new product.</p>
                </td>
              </tr>
              <tr v-else-if="!pending" v-for="proj in allProjects" :key="proj.id" class="hover:bg-gray-50/70 transition-colors duration-100">
                <td class="px-6 py-4">
                  <div class="text-sm font-semibold text-gray-900">{{ proj.project_name }}</div>
                  <div class="text-xs text-gray-400">{{ proj.project_category[0].category_title }}</div>
                </td>
                <td class="px-6 py-4 text-center">
                  <span class="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
                    {{ proj.markup_percentage }}%
                  </span>
                </td>
                <td class="px-6 py-4 text-right text-sm font-medium text-gray-600">
                  Php {{ proj.total_cogs }}
                </td>
                <td class="px-6 py-4 text-right text-sm font-bold text-gray-900">
                    Php {{ proj.total_srp }}
                </td>
                <td class="px-6 py-4 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <!-- Edit Button -->
                    <NuxtLink :to="`/projects/${proj.id}`" title="Edit Project" class="p-1.5 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-all active:scale-95">
                      <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </NuxtLink>
                    <!-- Delete Button -->
                    <button @click="handleDelete(proj.id)" title="Delete Project" class="p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all active:scale-95">
                      <svg class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>
        
        <!-- Optional: Static Pagination Footer -->
        <!-- <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div class="text-xs font-medium text-gray-500">
            Showing <span class="font-semibold text-gray-900">1</span> to <span class="font-semibold text-gray-900">2</span> of <span class="font-semibold text-gray-900">2</span> results
          </div>
          <div class="flex items-center gap-2">
            <button class="px-3 py-1.5 text-xs font-semibold text-gray-400 bg-white border border-gray-200 rounded-md cursor-not-allowed" disabled>Previous</button>
            <button class="px-3 py-1.5 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-md hover:bg-gray-50 active:scale-95 transition-all">Next</button>
          </div>
        </div> -->
    </div>      
</template>

<script setup>
const pending = ref(true)
const allProjects = ref([])

const { data: projects, loading } = await fetchProjects()
pending.value = loading
allProjects.value = projects

// Delete record
const handleDelete = async (id) => {
    pending.value = true
    if(confirm(`Are you sure you want to delete this record #${id}?`)) {
        const { data, loading } = await deleteProject(id);
        pending.value = loading
        errorToast.success({ title: 'Deleted!', message: `Record #${id} successfully deleted` })

        allProjects.value = allProjects.value.filter((item) => item.id !== id)
    }
}
</script>