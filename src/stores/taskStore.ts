import { v4 as uuid } from 'uuid'
import { create } from 'zustand'
import type { Task } from '@/types/Task'

export interface Filters {
  status?: Task['status']
  category?: string
  started?: Date
  finished?: Date
}

interface TaskStore {
  tasks: Task[]
  filters: Filters

  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateTask: (id: string, updates: Partial<Task>) => void
  deleteTask: (id: string) => void

  toggleTaskStatus: (id: string) => void

  setFilter: (filter: Filters) => void
  clearFilter: () => void
  taskFilters: () => Task[]
}

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  filters: {},

  addTask: (task) => {
    const newTask: Task = {
      ...task,
      id: uuid(),
      createdAt: new Date(),
    }

    set((state) => ({
      tasks: [...state.tasks, newTask],
    }))
  },

  updateTask: (id, updates) => {
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              ...updates,
              updatedAt: new Date(),
              finishAt:
                updates.status === 'concluída' && !task.finishAt
                  ? new Date()
                  : task.finishAt,
            }
          : task
      ),
    }))
  },

  deleteTask: (id) => {
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    }))
  },

  toggleTaskStatus: (id) => {
    set((state) => {
      const updatedTasks = state.tasks.map((task) => {
        if (task.id !== id) {
          return task
        }

        const currentStatus = task.status

        let nextStatus: "pendente" | "em andamento" | "concluída"

        if (currentStatus === "pendente") {
          nextStatus = "em andamento"
        } else if (currentStatus === "em andamento") {
          nextStatus = "concluída"
        } else {
          nextStatus = "pendente"
        }

        return {
          ...task,
          status: nextStatus,
          updatedAt: new Date(),
          finishAt: nextStatus === "concluída" && !task.finishAt ? new Date() : task.finishAt
        }

      }) 

      return {
        tasks: updatedTasks
      }
    })
  }

  setFilter: (filter) => set({ filters: filter }),

  clearFilter: () => set({ filters: {} }),

  taskFilters: () => {
    const { tasks, filters } = get()

    return tasks.filter((t) => {
      const matchStatus = filters.status
        ? t.status === filters.status
        : true

      const matchCategory = filters.category
        ? t.category === filters.category
        : true

      const matchStarted = filters.started
        ? new Date(t.createdAt) >= filters.started
        : true

      const matchFinished =
        filters.finished && t.finishAt
          ? new Date(t.finishAt) <= filters.finished
          : true

      return matchStatus && matchCategory && matchStarted && matchFinished
    })
  },
}))
